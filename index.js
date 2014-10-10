#!/usr/bin/env node
var program = require('commander');

// Create module
var ngModule = require('./lib/ng-module');
var ngController = require('./lib/ng-controller');
var ngDirective = require('./lib/ng-directive');

program
  .version('0.3.2')
  .option('--path [path]', 'set path to create the file');

// Create module
program
  .command('module')
  .description('Create a new AngularJS\'s module')
  .action(ngModule);

// Create controller
program
  .command('controller')
  .description('Create a controller for specified module')
  .action(ngController);

// Create directive
program
  .command('directive')
  .description('Create a directive for specified module')
  .action(ngDirective);

program.parse(process.argv);