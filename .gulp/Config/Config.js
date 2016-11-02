var fs = require('fs');

module.exports = {
  Tasks: fs.readdirSync(__dirname+"/Tasks").map(function(folder){
    return require(__dirname+'/Tasks/'+folder+'/'+folder);
  }),
  ignore:[
        "test",
        "bower_components",
        "node_modules",
        ".gulp",
        ".git"
    ]
}
