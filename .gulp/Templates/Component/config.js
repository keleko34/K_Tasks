var gulp = require('gulp')
  , rename = require('gulp-rename')
  , replace = require('gulp-replace')
  , fs = require('fs')

module.exports = {
  first:'Name',
  commands:{
    Name:{
      cmd:{
          short:'-n',
          long:'--name'
      },
      prompt:{
          type:'input',
          message:'What would you like to call this component?'
      },
      action:'Description'
    },
    Description:{
      cmd:{
          short:'-d',
          long:'--description'
      },
      prompt:{
          type:'input',
          message:'What is the purpose of this component?'
      },
      action:'Author'
    },
    Author:{
      cmd:{
          short:'-a',
          long:'--author'
      },
      prompt:{
          type:'input',
          message:'Who is the author/developer for this component?'
      },
      action:'end'
    }
  },
  onFinished:function(res){
    var dest = "./app/components";

    gulp.src(res.templateFiles)
    .pipe(replace(/(\$Name)/g,res.Name))
    .pipe(replace(/(\$Description)/g,res.Description))
    .pipe(replace(/(\$Author)/g,res.Author))
    .pipe(rename(function (path) {
      path.basename = path.basename.replace(/(\$Name)/g,res.Name);
    }))
    .pipe(gulp.dest(dest+"/"+res.Name))
    .on('end',function(e){
      console.log('\033[36mFinished Creating:\033[37m',res.Name);
    })
  }
}
