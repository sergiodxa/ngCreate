// Depedencies
var colors = require('colors');
var fs = require('fs');
var mkpath = require('mkpath');
var program = require('commander');
var S = require('string');
var prompt = require('prompt');



var schema = {
  properties: {
    module: {
      description: 'Module name related',
      type: 'string',
      pattern: /^[a-zA-Z\s\-\.]+$/,
      message: 'Module name must be only letters, spaces, or dashes',
      required: true
    },
    name: {
      description: 'Controller name',
      type: 'string',
      pattern: /^[a-zA-Z\s\-\.]+$/,
      message: 'Name must be only letters, spaces, or dashes',
      required: true
    },
    dependencies: {
      description: 'Controller dependencies',
      type: 'string',
      pattern: /^[a-zA-Z\,\s\$]+$/,
      message: 'Dependencies must be letters or $ and separated by coma and space',
      required: false
    },
    description: {
      description: 'Description of the controller',
      type: 'string',
      pattern: /^[a-zA-Z\s\-]+$/,
      message: 'Description must be only letters, spaces, or dashes',
      required: false
    }
  }
}



// In case the specified module doesn't existe this function
// create it from zero.
function createNew (module, name, path, desc, deps, params) {
  var moduleFile, file;

  // get the content for a new module
  moduleFile = fs.readFileSync('./templates/module.js', 'utf8');

  // replace the module name
  moduleFile = S(moduleFile).replaceAll('@name', module).s;
  moduleFile = S(moduleFile).replaceAll('@description', 'Module description').s;
  moduleFile = S(moduleFile).replaceAll('@deps', '').s;

  // get the content of the template file
  file = fs.readFileSync('./templates/controller.js', 'utf8');

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

  console.log(colors.green('Module ' + module + ' with the controller ' + name + ' created'));

  return true;
}



// in case the specified module exist this function added the
// new controller at the end of the file
function updateExist(module, name, path, desc, deps, params) {

  var moduleFile, file;

  // get the content for a new module
  moduleFile = fs.readFileSync(path + '/' + module.toLowerCase() + '.js', 'utf8');

  // get the content of the template file
  file = fs.readFileSync('./templates/controller.js', 'utf8');

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

  console.log(colors.green('Added controller ' + name + ' to module ' + module));

  return true;
}



// This function create a file with the code to create a new // AngularJS module with the specified name, description and
// dependencies
module.exports = function () {
  prompt.start();

  prompt.get(schema, function (err, res) {
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

    if (moduleFile) {
      updateExist(module, name, path, desc, deps, params);
    } else {
      createNew(module, name, path, desc, deps, params);
    }
  });
};