// Depedencies
var colors = require('colors');
var fs = require('fs');
var mkpath = require('mkpath');
var program = require('commander');
var S = require('string');
var prompt = require('prompt');

var schema = {
  properties: {
    name: {
      description: 'Module name',
      type: 'string',
      pattern: /^[a-zA-Z\s\-]+$/,
      message: 'Name must be only letters, spaces, or dashes',
      required: true
    },
    dependencies: {
      description: 'Module dependencies',
      type: 'string',
      pattern: /^[a-zA-Z\,\s]+$/,
      message: 'Dependencies must be only letters and separated by coma',
      required: false
    },
    description: {
      description: 'Description of the module',
      type: 'string',
      pattern: /^[a-zA-Z\s\-]+$/,
      message: 'Description must be only letters, spaces, or dashes',
      required: false
    }
  }
};

// This function create a file with the code to create a new AngularJS
// module with the specified name, description and dependencies
module.exports = function () {
  prompt.start();

  prompt.get(schema, function (err, res) {
    if (err) throw err;

    // get the data
    var name = res.name;
    var path = program.path || './front/modules/' + name.toLowerCase();
    var desc = res.description || 'Description';
    var deps = res.dependencies || '';
    var file, res;

    if (deps !== '') {
      deps = '\'' + deps.split(', ').join('\', \'') + '\'';
    }

    mkpath.sync(path);

    // get the content of the template file
    file = fs.readFileSync('./templates/module.js', 'utf8');

    // replace the module name, description and dependencies
    file = S(file).replaceAll('@name', name).s;
    file = S(file).replaceAll('@description', desc).s;
    file = S(file).replaceAll('@deps', deps).s;

    // create file
    res = fs.writeFileSync(path + '/' + name.toLowerCase() + '.js', file);

    // if we have an error throw it
    if (res) throw res;

    // show a message
    console.log(colors.green('Module ' + name + ' created.'));

    return;
  });
};