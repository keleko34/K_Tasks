
var gulp = require('gulp'),
    replace = require('gulp-replace'),
    rename = require('gulp-rename'),
    cssmin = require('gulp-cssmin'),
    config = global.gulp.config;

module.exports = function(res,cb){
  console.log('\033[36mStarting Stage Build\033[37m');

  var _env = config.Tasks.Build.subtasks[res.SubTask],
      _file = './'+config.Build.src+'/' + res.Type + '/'+res.Name+'/'+_env[(res.currentrule-1)]+'/'+res.Name+'.min.js',
      _cssFile = './'+config.Build.src+'/' + res.Type + '/'+res.Name+'/' + res.Name + '.css',
      _currentRule = _env[res.currentrule];

    return gulp.src(_file)
    .pipe(gulp.dest('./'+config.Build.src+'/' + res.Type + '/' + res.Name + '/'  + _currentRule))
    .on('end',cb);
}
