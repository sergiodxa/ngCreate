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
  .command('module [name] [dependencies] [description]')
  .description('Create a module with the name, description and dependencies')
  .action(ngModule);

// Create controller
program
  .command('controller [module] [name] [dependencies] [description]')
  .description('Create a controller with the name, description and dependencies for the indicated module')
  .action(ngController);

// Create directive
program
  .command('directive [module] [name] [dependencies] [description]')
  .description('Create a directive with the name, description and controller for the indicated module')

program.parse(process.argv);