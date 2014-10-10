// Depedencies
var colors = require('colors');
var fs = require('fs');
var mkpath = require('mkpath');
var program = require('commander');

// This function create a file with the code to create a new AngularJS
// module with the specified name, description and dependencies
module.exports = function (name, dependencies, description) {
  var path = program.path || './front/modules/' + name.toLowerCase()
  var desc = description || 'Description';
  var deps = dependencies || '';
  var file, res;

  if (deps !== '') {
    deps = deps.split(', ').join('\', \'');
  }

  mkpath.sync(path);

  file = [
    '/**',
    ' * ',
    ' * ' + name + ' Module',
    ' * ' + desc,
    ' * ',
    ' */',
    '',
    '(function() {',
    '  angular.module(\'' + name + '\', [\'' + deps + '\'])',
    '})();'
  ];

  file = file.join('\n');

  res = fs.writeFileSync(path + '/' + name.toLowerCase() + '.js', file);

  if (res) throw res;

  console.log(colors.green('Module ' + name + ' created.'));
  return;
};