module.exports = function(){

    app.get('/', function(req, res) {
        res.render('index');
    });

    app.get('/login', function(req, res) {
        res.render('login');
    });
	app.post('/login', require(process.cwd() + '/assets/API/auth')());

    app.get('/private/', app.checkAuth('/login'), function(req, res) {
        res.render('private');
    });

    require(process.cwd() + '/assets/API')('/api');
}
