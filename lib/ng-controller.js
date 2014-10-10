// Depedencies
var colors = require('colors');
var fs = require('fs');
var mkpath = require('mkpath');
var program = require('commander');

// This function create a file with the code to create a new AngularJS
// module with the specified name, description and dependencies
module.exports = function (module, name, dependencies, description) {
  var path  = program.path || './front/modules/' + module.toLowerCase()
  var fn    = module.toLowerCase() + '.' + name.toLowerCase() + '.js';
  var desc  = description || 'Description';
  var deps  = dependencies || '$scope';
  var deps2 = dependencies || '$scope';
  var file, res;

  if (deps !== '') {
    deps = '\'' + deps.split(', ').join('\', \'') + '\'';
  }

  mkpath.sync(path);

  file = [
    '/**',
    ' * ',
    ' * ' + name +' Controller',
    ' * ' + desc,
    ' * ',
    ' */',
    '',
    '(function() {',
    '  angular.module(\'' + module + '.' + name + '\', [])',
    '    .controller(\'' + name + '\', [' + deps + ', function (' + deps2 + ') {',
    '      // code',
    '    }])',
    '})();'
  ];

  file = file.join('\n');

  res =  fs.writeFileSync(path + '/' + fn + '.js', file);

  if (res) throw res;

  console.log(colors.green('Module ' + module + '.' + name + ' with the controller ' + name + ' created.'));
  return;
};