var fs = require('fs')

module.exports = {
  commands:{
    Component: {
      cmd: {
        short: "-c",
        long: "--component"
      },
      prompt: {
        type: "list",
        message: "Which module would you like to build?",
        choices: function(){
          return fs.readdirSync(global.gulp.base).filter(function(file){
            return (fs.statSync(global.gulp.base+"/"+file).isDirectory() && global.gulp.config.ignore.indexOf(file) === -1);
          });
        }
      },
      action:'Build'
    },
    Build: {
      cmd: {
        short: '-b',
        long: '--builds'
      },
      prompt: {
        type:"list",
        message: "Please choose a build library to use",
        choices: function(){
          return Object.keys(global.gulp.config.Tasks.Build.builds);
        }
      },
      action:'end'
    }
  },
  builds:fs.readdirSync(global.gulp.global+"/Builds")
  .map(function(build){
    return {name:build.replace('.js',''),lib:require(global.gulp.global+"/Builds/"+build)};
  })
  .concat((function(){
    var localBuilds = [];
    try{
      localBuilds = fs.readdirSync(global.gulp.local+"/Builds").map(function(build){
        return {name:build.replace('.js','').toLowerCase(),lib:require(global.gulp.local+"/Builds/"+build)};
      });
    }
    catch(e){

    }
    return localBuilds;
  }()))
  .reduce(function(Obj,build){
    Obj[build.name] = build.lib;
    return Obj;
  },{})
}
