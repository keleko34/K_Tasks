var fs = require('fs');

module.exports = {
  Tasks: fs.readdirSync(__dirname+"/Config/Tasks").map(function(file){
    return require(__dirname+'/Config/Tasks/'+file);
  }),
  ignore:[
        "test",
        "bower_components",
        "node_modules",
        ".gulp",
        ".git"
    ]
}
