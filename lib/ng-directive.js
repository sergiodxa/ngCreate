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
      description: 'Directive name',
      type: 'string',
      pattern: /^[a-zA-Z]+$/,
      message: 'Name must be only letters',
      required: true
    },
    restrict: {
      description: 'Type of element [A,E,C,M]',
      type: 'string',
      pattern: /^[AECM]+$/,
      message: 'Restrict must be one letter from this: A - E - C -M',
      required: true
    },
    controller: {
      description: 'Assigned controller',
      type: 'string',
      pattern: /^[a-zA-Z\s\-\.]+$/,
      message: 'Name must be only letters, spaces, or dashes',
      required: true
    },
    template: {
      description: 'Assigned template',
      type: 'string',
      pattern: /^[a-zA-Z\s\-\.]+$/,
      message: 'Name must be only letters, spaces, or dashes'
    },
    description: {
      description: 'Description of the directive',
      type: 'string',
      pattern: /^[a-zA-Z\s\-]+$/,
      message: 'Description must be only letters, spaces, or dashes',
      required: false
    }
  }
}


// This function create a file with the code to create a new // AngularJS module with the specified name, description and
// dependencies
module.exports = function () {
  prompt.start();

  prompt.get(schema, function (err, res) {
    if (err) throw err;

    // get the data
    var module   = res.module;
    var name     = res.name;
    var path     = program.path || './front/modules/' + module.toLowerCase()
    var desc     = res.description;
    var restrict = res.restrict;
    var ctrl     = res.conroller;
    var tplt     = res.tempalte;
    var moduleFile, file, res;

    if (fs.existsSync(path)) {
      // get the content for the existent module
      moduleFile = fs.readFileSync(path + '/' + module.toLowerCase() + '.js', 'utf8');
    } else {
      // get the content for a new module
      moduleFile = fs.readFileSync('./templates/module.js', 'utf8');

      // replace the module name
      moduleFile = S(moduleFile).replaceAll('@name', module).s;
      moduleFile = S(moduleFile).replaceAll('@description', 'Module description').s;
      moduleFile = S(moduleFile).replaceAll('@deps', '').s;
    }

    // get the content of the template file
    file = fs.readFileSync('./templates/directive.js', 'utf8');

    // replace the module, name, description, restrict, controller and template
    file = S(file).replaceAll('@name', name).s;
    file = S(file).replaceAll('@module', module).s;
    file = S(file).replaceAll('@description', desc).s;
    file = S(file).replaceAll('@restrict', restrict).s;
    file = S(file).replaceAll('@controller', ctrl).s;
    file = S(file).replaceAll('@template', tplt).s;

    // split string for add new line
    moduleFile = moduleFile.split('\n');

    // put directive in the module
    moduleFile[moduleFile.length-2] = moduleFile[moduleFile.length-2] + '\n' + file;

    file = moduleFile.join('\n');

    // create path if doesn't exist
    mkpath.sync(path);

    // create file
    res =  fs.writeFileSync(path + '/' + module.toLowerCase() + '.js', file);

    if (res) throw res;

    if (fs.existsSync(path)) {
      console.log(colors.green('Added directive ' + name + ' to module ' + module));
    } else {
      console.log(colors.green('Module ' + module + ' with the directive ' + name + ' created'));
    }

    return true;
  });
};