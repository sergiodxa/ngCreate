var ngController = require('../lib/ng-controller.js');
var fs = require('fs');

describe('Create a new AngularJS\'s controller', function () {
  var controller = {
    module: 'Test',
    name: 'TestCtrl',
    dependencies: '$scope, $rootParams',
    description: 'Test controller'
  }
  var result = "/**\n *\n * Test Module\n * Module description\n *\n */\n(function() {\n\t\"use stric\";\n\tangular.module('Test', [])\n\t\t.controller('TestCtrl', ['$scope', '$rootParams', function ($scope, $rootParams) {\n\t\t\t/**\n\t\t\t *\n\t\t\t * TestCtrl Controller\n\t\t\t * Test controller\n\t\t\t *\n\t\t\t */\n\n\t\t\t// code\n\t\t}])\n})();";

  it('Complete: should return true', function () {
    expect(ngController(null, controller))
      .to.be.true;
    expect(fs.existsSync('front/modules/test/test.js'))
      .to.be.true;
    expect(fs.readFileSync('front/modules/test/test.js', 'utf8'))
      .to.be.equal(result);
  });

  afterEach(function (done) {
    fs.unlinkSync('front/modules/test/test.js');
    fs.rmdirSync('front/modules/test');
    fs.rmdirSync('front/modules');
    fs.rmdirSync('front');
    done();
  })
});