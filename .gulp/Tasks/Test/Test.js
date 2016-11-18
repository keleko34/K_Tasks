var base = require('./../../Base');

module.exports = function()
{
    function Command(res)
    {
        console.log('\033[36mStarting to test module:\033[37m',res.Component+" using "+res.Test+" runtime");
        global.gulp.config.Tasks.Test.tests[res.Test](res);
    }

    return base
    .task('Test')
    .command(Command)
    .call();
}