#!/usr/bin/env node
var program = require('commander');
var prompt  = require('prompt');

// Create module
var ngModule     = require(__dirname + '/lib/ng-module');
var ngController = require(__dirname + '/lib/ng-controller');
var ngDirective  = require(__dirname + '/lib/ng-directive');
var ngRoute      = require(__dirname + '/lib/ng-route');
var ngState      = require(__dirname + '/lib/ng-state');

program
  .version('0.5.1')
  .option('--path [path]', 'set path to create the file');

// Create module
program
  .command('module')
  .description('Create a new AngularJS\'s module')
  .action(function() {
    prompt.start();
    prompt.get({
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
    }, ngModule);
  });

// Create controller
program
  .command('controller')
  .description('Create a controller for specified module')
  .action(function() {
    prompt.start();
    prompt.get({
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
    }, ngController);
  });

// Create directive
program
  .command('directive')
  .description('Create a directive for specified module')
  .action(function() {
    prompt.start();
    prompt.get({
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
          message: 'Controller must be only letters, spaces, or dashes',
          required: true
        },
        template: {
          description: 'Assigned template',
          type: 'string',
          pattern: /^[a-zA-Z\s\-\.]+$/,
          message: 'Template must be only letters, spaces, or dashes'
        },
        description: {
          description: 'Description of the directive',
          type: 'string',
          pattern: /^[a-zA-Z\s\-]+$/,
          message: 'Description must be only letters, spaces, or dashes',
          required: false
        }
      }
    }, ngDirective);
  });

// Create route
program
  .command('route')
  .description('Add a new route to the indicated module')
  .action(function (){
    prompt.start();
    prompt.get({
      properties: {
        module: {
          description: 'Module name related',
          type: 'string',
          pattern: /^[a-zA-Z\s\-\.]+$/,
          message: 'Module name must be only letters, spaces, or dashes',
          required: true
        },
        route: {
          description: 'Route',
          type: 'string',
          pattern: /^[a-zA-Z\:\_\/]+$/,
          message: 'Route must be only letters, :, _ and /',
          required: true
        },
        template: {
          description: 'Route template',
          type: 'string',
          pattern: /^[a-zA-Z\s\-\.]+$/,
          message: 'Template must be only letters, spaces, or dashes',
          required: true
        },
        controller: {
          description: 'Assigned controller',
          type: 'string',
          pattern: /^[a-zA-Z\s\-\.]+$/,
          message: 'Controller must be only letters, spaces, or dashes',
          required: false
        }
      }
    }, ngRoute);
  });

// Create state
program
  .command('state')
  .description('Add a new state to the indicated module')
  .action(function (){
    prompt.start();
    prompt.get({
      properties: {
        module: {
          description: 'Module name related',
          type: 'string',
          pattern: /^[a-zA-Z\s\-\.]+$/,
          message: 'Module name must be only letters, spaces, or dashes',
          required: true
        },
        state: {
          description: 'State',
          type: 'string',
          pattern: /^[a-zA-Z\:\_\/\.]+$/,
          message: 'State must be only letters, :, _ and /',
          required: true
        },
        url: {
          description: 'Url',
          type: 'string',
          pattern: /^[a-zA-Z\:\_\/]+$/,
          message: 'Route must be only letters, :, _ and /',
          required: true
        }
        template: {
          description: 'State template',
          type: 'string',
          pattern: /^[a-zA-Z\s\-\.]+$/,
          message: 'Template must be only letters, spaces, or dashes',
          required: true
        },
        controller: {
          description: 'Assigned controller',
          type: 'string',
          pattern: /^[a-zA-Z\s\-\.]+$/,
          message: 'Controller must be only letters, spaces, or dashes',
          required: false
        }
      }
    }, ngState);
  });

program.parse(process.argv);