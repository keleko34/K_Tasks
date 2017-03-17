var base = require('./../../Base');

module.exports = function()
{
    function Command(res)
    {
      console.log('\033[36mStarting to Create module:\033[37m',res.Template);
      global.gulp.config.Tasks.Create.onFinished(res);
    }

    return base
    .task('Create')
    .command(Command)
    .call();
}
