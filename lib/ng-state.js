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
  var state  = res.state;
  var tplt   = res.template;
  var ctrl   = res.controller;
  var path, moduleFile, file, res, stateFile, subStateFile, stateProvider;

  if (fs.existsSync(path)) {
    moduleFile = fs.readFileSync(path + '/' + module.toLowerCase() + '.js', 'utf8');

    moduleFile = moduleFile.split('\n');

    subStateFile = fs.readFileSync(__dirname + '/templates/sub-state.js', 'utf8');
    subStateFile = S(subStateFile).replaceAll('@state', state).s;
    subStateFile = S(subStateFile).replaceAll('@template', tplt).s;
    subStateFile = S(subStateFile).replaceAll('@controller', ctrl).s;

    stateProvider = moduleFile.indexOf('\t\t\t$stateProvider');

    if (stateProvider === -1) {
      stateFile = fs.readFileSync(__dirname + '/templates/state.js', 'utf8');

      stateFile = S(stateFile).replaceAll('@substate', subStateFile).s;

      moduleFile[moduleFile.length-2] = moduleFile[moduleFile.length-2] + '\n' + stateFile;
    } else {
      moduleFile[stateProvider] = moduleFile[stateProvider] + '\n' + subStateFile;
    }

    file = moduleFile.join('\n');

    mkpath.sync(path);

    res =  fs.writeFileSync(path + '/' + module.toLowerCase() + '.js', file);

    if (res) throw res;

    console.log(colors.green('Added state ' + state + ' to the module ' + module));

    return true;
  } else {
    throw 'The specified module doesn\'t exist.';
  }
};