var fs = require('fs')

module.exports = {
      commands:{
        Type:{
          cmd:{
            short:'-t',
            long:'--type'
          },
          prompt:{
            type:'list',
            message:'What type of template would You like to create?',
            choices:function(){
              return fs.readdirSync('./.gulp/Tasks/Create/Templates');
            }
          },
          action:function(v){
            if(v === 'Section'){
              return 'Components';
            }
            else if(v === 'Pages'){
              return 'Sections';
            }
            return 'Name';
          }
        },
        Components:{
          prompt:{
            type:'list',
            message:'Which Component would you like to add?',
            choices:function(values){
              return fs.readdirSync('./src/Components').filter(function(k,i){
                return (!values.Components ? true : values.Components.indexOf(k) < 0)
              }).concat('none');
            }
          },
          action:function(v,values){
            if(fs.readdirSync('./src/Components').filter(function(k,i){return (values.Components.indexOf(k) < 0)}).length === 0 || v === 'none'){
              return 'Name';
            }
            return 'Components';
          },
          store:'array'
        },
        Sections:{
          prompt:{
            type:'list',
            message:'Which Section would you like to add?',
            choices:function(values){
              return fs.readdirSync('./src/Sections').filter(function(k,i){
                return (!values.Sections ? true : values.Sections.indexOf(k) < 0)
              }).concat('none');
            }
          },
          action:function(v,values){
            if(fs.readdirSync('./src/Sections').filter(function(k,i){return (values.Sections.indexOf(k) < 0)}).length === 0 || v === 'none'){
              return 'Name';
            }
            return 'Sections';
          },
          store:'array'
        },
        Name:{
          cmd:{
            short:'-n',
            long:'--name'
          },
          prompt:{
            type:'input',
            message:'What would You like to name this?'
          },
          action:'Description'
        },
        Description:{
          cmd:{
            short:'-d',
            long:'--desc'
          },
          prompt:{
            type:'input',
            message:'Please write a brief description of this element'
          },
          action:'Author'
        },
        Author:{
          cmd:{
            short:'-a',
            long:'--auth'
          },
          prompt:{
            type:'input',
            message:'Initial Author of this Element?'
          },
          action:'end'
        }
      },
      onFinished:function(res){
        if(res.Type === 'Components' || res.Type === 'Sections'){
          console.log(process.argv);
          //gulp.runTask('Build');
        }
      },
      src:'src'
    }
