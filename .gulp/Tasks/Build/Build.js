var base = require('./../../Base');

module.exports = function()
{

    function Command(res)
    {
        console.log('\033[36mStarting to build module:\033[37m',res.Component+" using "+res.Build+" runtime");
        global.gulp.config.Tasks.Build.builds[res.Build](res);
    }

    return base
    .task('Build')
    .command(Command)
    .call();
}