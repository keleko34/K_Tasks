var gulp = require('gulp')
  , file = require('gulp-file')
  , fs = require('fs')
  , base = require('./../../Base');

var config = global.gulp.config.Tasks.Create;

module.exports = function(){

  function onFinished(res){
    console.log('Finished Creating \033[36m',res.type,' ',res.Name,'\033[37m You can find it in \033[36m','/'+config.src+'/'+res.Type+'/'+res.Name+'/ \033[37m');
  }

  function Exists(key,res){
    if(res.Type !== undefined && key === 'Name'){
      try
      {
        res.Name = res.Name.toLowerCase();
        var exists = fs.statSync('./'+config.src+'/' + res.Type + '/' + res.Name);
        if(exists){
          console.error('\033[31mThere is already something by the name: \033[37m',res.Name,' in ',res.Type);
          process.exit(1);
        }
      }
      catch(e)
      {
        if(e.code !== 'ENOENT'){
          console.error(e);
          process.exit(1);
        }
      }
    }
  }

  function Command(res){
    var files = fs.readdirSync('./.gulp/Tasks/Create/Templates/'+res.Type),
        len = files.length,
        count = 0;
    files.forEach(function(f,i){
      var template = fs.readFileSync('./.gulp/Tasks/Create/Templates/' + res.Type + '/'+f,'utf8'),
          resKeys = Object.keys(res);

      for(var x=0;x<resKeys.length;x++){
        var k = resKeys[x],
            v = res[k];
        if(typeof v === 'object'){
          if(v.indexOf('none') > -1){
            v.splice(v.indexOf('none'),1);
          }
          /* Regex master skills */

          var repeatReplace = new RegExp("(\\$" + k + "\\[x\\])(\\(([^()]*|\\(([^()]*|\\([^()]*\\))*\\))*\\))",'g'),
              xreplace = new RegExp("(\\$x)",'g');

          /* awesome iterator replacement */
          template = template.replace(repeatReplace,function(a,b,c){
            c = c.substring(1,c.length-1);
            return v.map(function(k,i){
                return c.replace(xreplace,k);
            }).join('');
          });

          for(var i=0;i<v.length;i++){
            var reg = new RegExp("(\\$" + k + "\\[" + i + "\\])",'g');
            template = template.replace(reg,res[k]);
          }
        }
        else{
          var reg = new RegExp("(\\$" + k + ")",'g');
          template = template.replace(reg,res[k]);
          f = f.replace(reg,res[k]);
        }
      }
      template = template.replace(/(\$(.*?)\[x\]\((.*?)\))/g,'');
      template = template.replace(/(\$(.*?)\[(.*?)\])/g,'');
      template = template.replace(/(\$(.*?))/g,'');
      var copy = file('./'+f,template,{src:true})
      .pipe(gulp.dest('./'+config.src+'/'+ res.Type + '/' + res.Name));

      copy.on('end',function(e){
        count += 1;
        if(count >= len)
        {
          onFinished(res);
        }
      })
    });
  };

  return base.task('Create')
  .filter(Exists)
  .command(Command)
  .call();
};
