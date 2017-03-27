var config          = require('./libs/config'),
    log             = require('./libs/log')(module),
    express         = require('express'),
    http            = require('http'),
    request         = require('request'),
    url             = require('url'),
    path            = require('path'),
    fs              = require('fs'),
    swig            = require('swig'),
    favicon         = require('serve-favicon'),
    logger          = require('morgan'),
    bodyParser      = require('body-parser'),
    cookieParser    = require('cookie-parser'),
    session         = require('express-session'),
    memoryStore     = session.MemoryStore,
    cachify         = require('connect-cachify'),
    underscore      = require('underscore'),
    device          = require('express-device'),
    redis           = require('redis');

global.app = express();
app.express = express;
app.req = request;
app.config = config;
app.async = require('async');
app.db = require('./libs/db/mongoose')(log, config);
app.mysql = require('./libs/db/mysql')(log, config);
app.redis = redis.createClient();
app.log = log;
app.errHandler = require('./libs/errHandler');
app.utils = require('./libs/utils');
app.utils.fs = fs;
app.utils.url = url;
underscore.extend(app.utils, underscore);
app.moment = require('moment');
app.moment.locale('ru');
app.utils.moment = app.moment;

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + (process.env.NODE_ENV == "production" ? "/views/production" : "/views"));
swig.setDefaults({ cache: false });
app.set('view cache', false);
app.swig = swig;

app.use(favicon(path.join(__dirname, '/', 'favicon.ico')));
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json({limit: '2mb'}));
app.use(bodyParser.urlencoded({ limit: '2mb', extended: false }));
app.use(device.capture());
app.use(session({
    secret: config.get('session:secret'),
	key: config.get('session:key'),
    cookie: config.get('session:cookie'),
    store: new memoryStore(),
    resave: true,
    saveUninitialized: true
}));
app.use(cachify.setup([
    '/assets/css/style.css'
    ], {
        root: path.join(__dirname, '/'),
        prefix: 'v'
    }
));
app.use(express.static(path.join(__dirname, '/')));

app.checkAuth = require('./router/checkAuth');

app.use(function(req, res, next) {
    var device = {
        ua: req.headers['user-agent'],
        type: req.device.type,
        isMobile: req.device.type.match(/tablet|phone/) ? true : false
    };
    req.appClient = {
        utils: app.utils,
        device: device,
        user: req.session.user,
        isServer: true
    };

    if (process.env.NODE_ENV == "production"){
        req.account = req.session.user;
        req.accountId = req.session.user ? app.utils.ObjectId(req.session.user.accountID) : null;
    }
    else {
        req.accountId = app.utils.ObjectId('588658bf07f3cad6d6f3aaa1');
    }
    req.device.type = req.query.debug ? req.query.debug : req.device.type;
    req.clientIP = app.utils.getClientAddress(req);
    next();
});

require('./router')();

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  app.log.error('Internal error(%d): %s', (err.status || 500), err.message);
  res.status(err.status || 500);
  res.render('error', {
    message: err.status || "Error",
    error: {
        status: err.message
    }
  });
});

http.createServer(app).listen(config.get('port'), function(){
	app.log.info('Express server listening on port ' + config.get('port'));
});
