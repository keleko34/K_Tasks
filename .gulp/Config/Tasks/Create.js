var fs = require('fs');

module.exports = {
  commands:{
      Name:{
          cmd:{
              short:'-n',
              long:'--name'
          },
          prompt:{
              type:'input',
              message:'What would you like to name this task?'
          },
          action:'Template'
      },
      Template:{
          cmd:{
              short:'-t',
              long:'--template'
          },
          prompt:{
              type:'list',
              message:'Which template would you like to create?',
              choices:function(){
                  return [];
              }
          },
          action:'Destination'
      },
      Destination:{
          cmd:{
              short:'-d',
              long:'--destination'
          },
          prompt:{
              type:'list',
              message:'Where would You like this to build to?',
              choices:function(){
                  return [];
              }
          },
          action:'end'
      }
  }

}