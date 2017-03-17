var fs = require('fs');

module.exports = {
  firstCommand:'Name',
  commands:{
    Name:{
      cmd:{
        short:'-n',
        long:'--name'
      },
      prompt:{
        type:'list',
        message:'What is the name of the component you would like to build?',
        choices:function(){
          return fs.readdirSync(global.gulp.local+"/app/components");
        }
      },
      action:'Channel'
    },
    Channel:{
      cmd:{
        short:'-c',
        long:'--channel'
      },
      prompt:{
        type:'list',
        message:'What channel would You like to build?',
        choices:['qa','stage','prod']
      }
    },
    action:'end'
  }
}
