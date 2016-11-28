var base = require('./../../Base')
  , query = require('querystring')
  , fs = require('fs')
  , connect = require('gulp-connect')
  , open = require('open');

var settings = global.gulp,
    config = settings.config,
    ignore = config.ignore,
    builds = fs.readdirSync(settings.base).filter(function(file){
        return (fs.statSync(settings.base+"/"+file).isDirectory() && ignore.indexOf(file) === -1);
    });

module.exports = function()
{
    function route(req,res,next)
    {
        var url = req.url.substring(1,req.url.length);
        if(req.url.substring(0,(req.url.indexOf('?') !== -1 ? req.url.indexOf('?') : req.url.length)) === '/'){
            req.url = '/index.html';
        }
        else if(req.url.indexOf('/') === 0 && req.url.substring(1,req.url.length).indexOf('/') === -1)
        {
            function tryBower(url)
            {
                try
                {
                    var fstat = fs.statSync(settings.base+'/bower_components/'+url);
                    if(fstat.isDirectory())
                    {
                        var main = JSON.parse(fs.readFileSync(settings.base+"/bower_components/"+url+"/bower.json")).main;
                        req.url = "/bower_components/"+url+"/"+main;
                        fs.createReadStream(settings.base+"/bower_components/"+url+"/"+main).pipe(res);
						res.close();
                    }
                    else
                    {
                        tryNode(url);
                    }
                }
                catch(e)
                {
                    tryNode(url);
                }
            }

            function tryNode(url)
            {
                try
                {
                    var fstat = fs.statSync(settings.base+'/node_modules/'+url);
                    if(fstat.isDirectory())
                    {
                        req.url = "/node_modules/"+url+"/"+url+"/"+url+".js";
                        fs.createReadStream(settings.base+"/node_modules/"+url+"/"+url+"/"+url+".js").pipe(res);
						res.close();
                    }
                }
                catch(e)
                {

                }
            }

            tryBower((req.url.indexOf('.') !== -1 ? req.url.substring(1,req.url.indexOf('.')) : req.url.substring(1,req.url.length)));
        }
        else
        {
            for(var x=0,len=builds.length;x<len;x++)
            {
                if(req.url.indexOf(builds[x]))
                {
                    var q = query.parse(req.url.substring((req.url.indexOf('?')+1),req.url.length));
                    if(q.env)
                    {
                        if(q.env.toLowerCase() === 'build')
                        {
                            req.url = '/'+builds[x]+'/Build/'+builds[x]+'.js';
                        }
                        else if(q.env.toLowerCase() === 'min')
                        {
                            req.url = '/'+builds[x]+'/Min/'+builds[x]+'.min.js';
                        }
                    }
                }
            }
        }
        return next();
    }

    function Command(res)
    {
        console.info("\033[36mPress ctrl + o to quickly open the default web page in your default browser\033[37m");
        connect.server({
            root: (res.Root && res.Root.length !== 0 ? res.Root : '.'),
            livereload: false,
            port:(res.Port && res.Port.length !== 0 ? parseInt(res.Port) : 8080),
            middleware:function(connect, opt){
                return [route]
            }
        });

        var stdin = process.stdin;
        stdin.setRawMode(true);
        stdin.resume();
        stdin.setEncoding('utf8');
        stdin.on('data',function(key)
        {
            if(key === '\u000f')
            {
                open('http://localhost:'+res.Port);
            }
            else
            {
                if (key === '\u0003')
                {
                    process.exit();
                }
                process.stdout.write(key);
            }
        });

    }

    return base
    .task('Server')
    .command(Command)
    .call();
}
