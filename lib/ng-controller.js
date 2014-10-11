// Depedencies
var colors = require('colors');
var fs = require('fs');
var mkpath = require('mkpath');
var program = require('commander');
var S = require('string');



module.exports = function (err, res) {
  if (err) throw err;

  // get the data
  var module = res.module;
  var name   = res.name;
  var path   = program.path || './front/modules/' + module.toLowerCase()
  var desc   = res.description;
  var deps   = res.dependencies;
  var params = res.dependencies;
  var moduleFile, file, res;

  if (deps !== '') {
    deps = '\'' + deps.split(', ').join('\', \'') + '\'';
  }

  moduleFile = fs.existsSync(path);

  if (fs.existsSync(path)) {
    // get the content for a new module
    moduleFile = fs.readFileSync(path + '/' + module.toLowerCase() + '.js', 'utf8');
  } else {
    // get the content for a new module
    moduleFile = fs.readFileSync(__dirname + '/templates/module.js', 'utf8');

    // replace the module name
    moduleFile = S(moduleFile).replaceAll('@name', module).s;
    moduleFile = S(moduleFile).replaceAll('@description', 'Module description').s;
    moduleFile = S(moduleFile).replaceAll('@deps', '').s;
  }

  // get the content of the template file
  file = fs.readFileSync(__dirname + '/templates/controller.js', 'utf8');

  // replace the module name, description and dependencies
  file = S(file).replaceAll('@name', name).s;
  file = S(file).replaceAll('@module', module).s;
  file = S(file).replaceAll('@description', desc).s;
  file = S(file).replaceAll('@deps', deps).s;
  file = S(file).replaceAll('@params', params).s;

  moduleFile = moduleFile.split('\n');

  // put controller in the module
  moduleFile[moduleFile.length-2] = moduleFile[moduleFile.length-2] + '\n' + file;

  file = moduleFile.join('\n');

  // create path if doesn't exist
  mkpath.sync(path);

  // create file
  res =  fs.writeFileSync(path + '/' + module.toLowerCase() + '.js', file);

  if (res) throw res;

  if (fs.existsSync(path)) {
    console.log(colors.green('Added controller ' + name + ' to module ' + module));
  } else {
    console.log(colors.green('Module ' + module + ' with the controller ' + name + ' created'));

  }
  return true;
};