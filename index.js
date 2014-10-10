#!/usr/bin/env node
var program = require('commander');
var colors  = require('colors');

// Create module
var ngModule = require('./lib/ng-module');
var ngController = require('./lib/ng-controller');

program
  .version('0.0.0')
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
// program
//   .command('directive')
//   .description('Create a directive for specified module')

program.parse(process.argv);