#!/usr/bin/env node
var program = require('commander');

// Create module
var commands = require(__dirname + '/lib/commands');

program
  .version('0.5.5')
  .option('--path [path]', 'set path to create the file');

// Init app
program
  .command('app [action]')
  .description('Initialize or modifiy the local application.\n\tPossible actions:\n\tinit: initialize a new app.\n\t\'add dep\': add a new dependencie to the application module.')
  .action(commands.app);

// Create module
program
  .command('module')
  .description('Create a new AngularJS\'s module')
  .action(commands.module);

// Create controller
program
  .command('controller')
  .description('Create a controller for specified module')
  .action(commands.controller);

// Create directive
program
  .command('directive')
  .description('Create a directive for specified module')
  .action(commands.directive);

// Create route
program
  .command('route')
  .description('Add a new route to the specified module')
  .action(commands.route);

// Create state
program
  .command('state')
  .description('Add a new state to the specified module')
  .action(commands.state);

program.parse(process.argv);