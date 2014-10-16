// Depedencies
var colors = require('colors');
var fs = require('fs');
var mkpath = require('mkpath');
var program = require('commander');
var S = require('string');



module.exports = function (err, res) {
  if (err) throw err;

  var module = res.module;
  var path   = program.path || './front/modules/' + module.toLowerCase()
  var route  = res.route;
  var tplt   = res.template;
  var ctrl   = res.controller;
  var path, moduleFile, file, res, routeFile, subRouteFile, routeProvider;

  if (fs.existsSync(path)) {
    moduleFile = fs.readFileSync(path + '/' + module.toLowerCase() + '.js', 'utf8');

    moduleFile = moduleFile.split('\n');

    subRouteFile = fs.readFileSync(__dirname + '/templates/sub-route.js', 'utf8');
    subRouteFile = S(subRouteFile).replaceAll('@route', route).s;
    subRouteFile = S(subRouteFile).replaceAll('@template', tplt).s;
    subRouteFile = S(subRouteFile).replaceAll('@controller', ctrl).s;

    routeProvider = moduleFile.indexOf('\t\t\t$routeProvider');

    if (routeProvider === -1) {
      routeFile = fs.readFileSync(__dirname + '/templates/route.js', 'utf8');

      routeFile = S(routeFile).replaceAll('@subroute', subRouteFile).s;

      moduleFile[moduleFile.length-2] = moduleFile[moduleFile.length-2] + '\n' + routeFile;
    } else {
      moduleFile[routeProvider] = moduleFile[routeProvider] + '\n' + subRouteFile;
    }

    file = moduleFile.join('\n');

    mkpath.sync(path);

    res =  fs.writeFileSync(path + '/' + module.toLowerCase() + '.js', file);

    if (res) throw res;

    console.log(colors.green('Added route ' + route + ' to the module ' + module));

    return true;
  } else {
    throw 'The specified module doesn\'t exist.';
  }
};