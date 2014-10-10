var ngDirective = require('../lib/ng-directive.js');
var fs = require('fs');

describe('Create a new AngularJS\'s controller', function () {
  var directive = {
    module: 'Test',
    name: 'TestDirective',
    restrict: 'E',
    controller: 'TestCtrl',
    template: 'test.html',
    description: 'Test directive'
  }
  var result = "/**\n *\n * Test Module\n * Module description\n *\n */\n(function() {\n\t\"use stric\";\n\tangular.module('Test', [])\n\t\t.directive('TestDirective', [function () {\n\t\t\t/**\n\t\t\t *\n\t\t\t * TestDirective Directive\n\t\t\t * Test directive\n\t\t\t *\n\t\t\t */\n\t\t\treturn {\n\t\t\t\tname: 'TestDirective',\n\t\t\t\tcontroller: TestCtrl,\n\t\t\t\treplace: true\n\t\t\t\trestrict: 'E',\n\t\t\t\ttemplateUrl: 'test.html',\n\t\t\t\ttransclude: true\n\t\t\t};\n\t\t}])\n})();";

  it('Complete: should return true', function () {
    expect(ngDirective(null, directive))
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