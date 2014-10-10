var ngModule = require('../lib/ng-module.js');
var fs = require('fs');

describe('Create a new AngularJS\'s module', function () {
  var module = {
    name: 'Test',
    dependencies: 'ngRoute, ngSanitize',
    description: 'Test module'
  }

  var result = fs.readFileSync('test/templates/module.js', 'utf8');

  it('should create a file and be equal to the template', function () {
    expect(ngModule(null, module))
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