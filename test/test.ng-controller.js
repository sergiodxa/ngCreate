var ngController = require('../lib/ng-controller.js');
var fs = require('fs');

describe('Create a controller for specified module', function () {
  var controller = {
    module: 'Test',
    name: 'TestCtrl',
    dependencies: '$scope, $rootParams',
    description: 'Test controller'
  }

  var result = fs.readFileSync('test/templates/controller.js', 'utf8');

  it('should create a file and be equal to the template', function () {
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