/**
 * Created by trilo on 5/31/2016.
 */

var express = require('express')
    , stylus = require('stylus')
    , nib = require('nib'),
    cors=require('cors');

var app = express()
function compile(str, path) {
    return stylus(str)
        .set('filename', path)
        .use(nib())
}
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(express.logger('dev'));
app.use(cors());
app.use(stylus.middleware(
    { src: __dirname + '/public'
        , compile: compile
    }
));

app.use(express.static(__dirname + '/public'));
app.get('/', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.render('index',
        { title : 'Home' }
    )
});
app.listen(3000);
