// Dependencies
var prompt  = require('prompt');

var ngModule     = require(__dirname + '/components/ng-module');
var ngController = require(__dirname + '/components/ng-controller');
var ngDirective  = require(__dirname + '/components/ng-directive');
var ngRoute      = require(__dirname + '/components/ng-route');
var ngState      = require(__dirname + '/components/ng-state');
var ngApp        = require(__dirname + '/components/ng-app');


// Command prompt to init and modify the app
function cmdApp(action) {
  // Execute the specified function
  switch (action) {
    case 'init':
      appInit();
      break;
    case 'add deps':
      addDeps();
      break;
    default:
      console.error('Action doesn\'t allowed!');
      break;
  }

  // Initialize a new app
  function appInit() {
    prompt.start();

    prompt.get({
      properties: {
        name: {
          description: 'Application name',
          type: 'string',
          pattern: /^[a-zA-Z\s\-\.]+$/,
          message: 'Name must be only letters, spaces, or dashes',
          required: true
        },
        dependencies: {
          description: 'Module dependencies',
          type: 'string',
          pattern: /^[a-zA-Z\,\s\.]+$/,
          message: 'Dependencies must be only letters and separated by coma',
          required: false
        },
        description: {
          description: 'Description of the module',
          type: 'string',
          pattern: /^[a-zA-Z\s\-\.\:\;\/\_\"\']+$/,
          message: 'Description must be only letters, spaces, dots, slash, underscore, quotes or dashes',
          required: false
        }
      }
    }, ngApp.init);
  }

  // Add a new dependencies to application module
  function addDeps() {
    prompt.start();

    prompt.get({
      properties: {
        dependencies: {
          description: 'Dependencies name (separated by comma)',
          type: 'string',
          pattern: /^[a-zA-Z\,\s\.]+$/,
          message: 'Dependencies must be only letters and separated by coma',
          required: true
        }
      }
    }, ngApp.addDeps);
  }
}



// Command prompt to create a new module
function cmdModule() {
  prompt.start();

  prompt.get({
    properties: {
      name: {
        description: 'Module name',
        type: 'string',
        pattern: /^[a-zA-Z\s\-\.]+$/,
        message: 'Name must be only letters, spaces, or dashes',
        required: true
      },
      dependencies: {
        description: 'Module dependencies',
        type: 'string',
        pattern: /^[a-zA-Z\,\s\.]+$/,
        message: 'Dependencies must be only letters and separated by coma',
        required: false
      },
      description: {
        description: 'Description of the module',
        type: 'string',
        pattern: /^[a-zA-Z\s\-\.\:\;\/\_\"\']+$/,
        message: 'Description must be only letters, spaces, dots, slash, underscore, quotes or dashes',
        required: false
      }
    }
  }, ngModule);
}



// Command prompt to create a new controller
function cmdController () {
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
}



// Command prompt to create a new directive
function cmdDirective () {
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
}



// Command prompt to create a new route
function cmdRoute () {
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
        required: true
      }
    }
  }, ngRoute);
}



// Command prompt to create a new state
function cmdState () {
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
      },
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
        required: true
      }
    }
  }, ngState);
}



// Functions exported
module.exports = {
  app: cmdApp,
  module: cmdModule,
  controller: cmdController,
  directive: cmdDirective,
  route: cmdRoute,
  state: cmdState
};