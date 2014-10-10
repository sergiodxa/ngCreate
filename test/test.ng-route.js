var ngRoute = require('../lib/ng-route.js');
var fs = require('fs');

describe('Add a new route to the indicated module', function () {
  var route = {
    module: 'Test',
    route: '/tasks/:id',
    template: 'task-detail.html',
    controller: 'TaskDetailCtrl'
  }

  var result = fs.readFileSync('test/templates/route.js', 'utf8');

  it('should create a file and be equal to the template', function () {
    expect(ngRoute(null, route))
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