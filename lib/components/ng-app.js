// Depedencies
var colors = require('colors');
var fs = require('fs');
var mkpath = require('mkpath');
var program = require('commander');
var S = require('string');

var ngModule = require(__dirname + '/ng-module');



function init(err, res) {
  if (err) throw err;

  ngModule(err, res, './front');
}



function addDeps(err, res) {
  if (err) throw err;
  var file, line, deps;

  // check if folder exist
  mkpath.sync('./front');

  // read file
  file = fs.readFileSync('./front/core.js', 'utf8');

  // split file
  file = file.split('\n');

  // save line
  line = file[8];

  // if the module have deps added a comma before new deps
  if (line.search('[]') !== -1)  {
    deps = '\'' + res.dependencies.split(', ').join('\', \'') + '\'' + ']';

    line = line.replace('[]', deps);
  } else {
    deps = ', \'' + res.dependencies.split(', ').join('\', \'') + '\'' + ']';

    line = line.replace(']', deps);
  }

console.log(line);
return;
  // update line
  file[8] = line;

  // join file
  file = file.join('\n');

  // update file
  res = fs.writeFileSync('./front/core.js', file);

  // if we have an error throw it
  if (res) throw res;

  // show a message
  console.log(colors.green('Dependencies added to application module.'));

  return true;
}



module.exports = {
  init: init,
  addDeps: addDeps
};