module.exports = function(url){

	var route = app.express.Router();

	route.get('/education/:text', function(req, res) {
        API.suggest.education(req.params.text, function(data){
            app.errHandler(res, null, data);
        });
	});

    route.get('/companies/:text', function(req, res) {
        API.suggest.companies(req.params.text, function(data){
            app.errHandler(res, null, data);
        });
	});

    route.get('/speciality/:text', function(req, res) {
        API.suggest.speciality(req.params.text, function(data){
            app.errHandler(res, null, data);
        });
	});

    route.get('/skills/:text', function(req, res) {
        API.suggest.skills(req.params.text, function(data){
            app.errHandler(res, null, data);
        });
	});

    route.get('/positions/:text', function(req, res) {
        API.suggest.positions(req.params.text, function(data){
            app.errHandler(res, null, data);
        });
	});

    route.get('/city/:text', function(req, res) {
        API.suggest.city(req.params.text, function(data){
            app.errHandler(res, null, data);
        });
	});

	route.get('/vacancy/:text', function(req, res) {
        API.suggest.vacancy(req.params.text, function(data){
            app.errHandler(res, null, data);
        });
	});

	app.use(url, app.checkAuth(), route);
};
