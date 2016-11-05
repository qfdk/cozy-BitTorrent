var express = require('express');
var router = express.Router();
/*********************** libs *********************/
var torrentStream = require('torrent-stream');
var fs = require('fs');
var url = require('url');
/*************************************************/

router.get('/', function (req, res, next) {
    res.status(200).sendFile('index.html');
});

router.get('/download', function (req, res, next) {
    var params = url.parse(req.url, true).query;
    if ('url' in params) {
        var tmp = params['url'].toString();
        console.log("[info] Download URL: " + tmp);
        var engine = torrentStream(tmp);
        var dir="sasa";
        fs.mkdir(dir, function(err){
        if(!err){
            console.log("[info] dir created.");
        }else{
            console.log("[info] dir not created.");
        }
        });
        engine.on('ready', function () {
            engine.files.forEach(function (file) {
                console.log('filename:', file.name);
                var stream = file.createReadStream();
                var output = fs.createWriteStream(dir+"/"+file.name);
                var result = {
                    'msg': 'downloading',
                    'length': file.length * 1.0
                }
                res.io.sockets.emit('data', JSON.stringify(result));
                stream.on('end', function () {
                    console.log('[info] ->' + file.name + "<- finished.");
                    var result = {
                        'msg': 'finish',
                        'length': '...'
                    }
                    res.io.sockets.emit('data', JSON.stringify(result));
                });
                stream.pipe(output);
            });

        });
    }
});

// Export the router instance to make it available from other files.
module.exports = router;