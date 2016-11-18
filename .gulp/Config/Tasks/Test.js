var fs = require('fs')

module.exports = {
  commands:{
    /*Component: {
      cmd: {
        short: "-c",
        long: "--component"
      },
      prompt: {
        type: "list",
        message: "Which module would you like to test?",
        choices: function(){
          return fs.readdirSync(global.gulp.base).filter(function(file){
            return (fs.statSync(global.gulp.base+"/"+file).isDirectory() && global.gulp.config.ignore.indexOf(file) === -1);
          });
        }
      },
      action:'Test'
    },*/
    Test: {
      cmd: {
        short: '-t',
        long: '--tests'
      },
      prompt: {
        type:"list",
        message: "Please choose a test to to run",
        choices: function(){
          return Object.keys(global.gulp.config.Tasks.Test.tests);
        }
      },
      action:'end'
    }
  },
  tests:fs.readdirSync(global.gulp.global+"/Tests")
  .map(function(test){
    return {name:test.replace('.js',''),lib:require(global.gulp.global+"/Tests/"+test)};
  })
  .concat((function(){
    var localTests = [];
    try{
      localBuilds = fs.readdirSync(global.gulp.local+"/Tests").map(function(test){
        return {name:test.replace('.js','').toLowerCase(),lib:require(global.gulp.local+"/Tests/"+test)};
      });
    }
    catch(e){

    }
    return localBuilds;
  }()))
  .reduce(function(Obj,test){
    Obj[test.name] = test.lib;
    return Obj;
  },{}),
  port:8080,
  root:'test'
}
