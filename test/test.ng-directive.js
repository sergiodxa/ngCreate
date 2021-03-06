var ngDirective = require('../lib/ng-directive.js');
var fs = require('fs');

describe('Create a directive for specified module', function () {
  var directive = {
    module: 'Test',
    name: 'TestDirective',
    restrict: 'E',
    controller: 'TestCtrl',
    template: 'test.html',
    description: 'Test directive'
  }

  var result = fs.readFileSync('test/templates/directive.js', 'utf8');

  it('should create a file and be equal to the template', function () {
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