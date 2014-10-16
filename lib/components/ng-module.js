// Depedencies
var colors = require('colors');
var fs = require('fs');
var mkpath = require('mkpath');
var program = require('commander');
var S = require('string');



module.exports = function (err, res, path) {
  if (err) throw err;

  // get the data
  var name  = res.name;
  var fName = (path) ? 'core' : res.name;
  var path  = program.path || path || './front/modules/' + name.toLowerCase();
  var desc  = res.description || 'Description';
  var deps  = (res.dependencies) ? '\'' + res.dependencies.split(', ').join('\', \'') + '\'' : '';
  var file, res;

  mkpath.sync(path);

  // get the content of the template file
  file = fs.readFileSync(__dirname + '/templates/module.js', 'utf8');

  // replace the module name, description and dependencies
  file = S(file).replaceAll('@name', name).s;
  file = S(file).replaceAll('@description', desc).s;
  file = S(file).replaceAll('@deps', deps).s;

  // create file
  res = fs.writeFileSync(path + '/' + fName.toLowerCase() + '.js', file);

  // if we have an error throw it
  if (res) throw res;

  // show a message
  if (path) {
    console.log(colors.green('Application ' + name + ' initialized.'));
  } else {
    console.log(colors.green('Module ' + name + ' created.'));
  }

  return true;
};