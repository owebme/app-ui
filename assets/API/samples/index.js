module.exports = function(url){

	var route = app.express.Router();

    route.get('/gethh/:id', function(req, res) {
        API.resume.gethh(req.params.id, function(err, data){
            if (data){
                app.db.collection('samples').update({
					"idhh": req.params.id,
					"_status": "1"
				},
					data,
				{
					upsert: true
				},
                function(err, data){
                    app.errHandler(res, err, data);
                });
            }
            else {
                app.errHandler(res, err, data);
            }
        });
	});

	route.put('/', function(req, res) {
		var id = req.body.data._id;
		delete req.body.data._id;

		req.body.data.update = app.utils.moment().format();

		app.db.collection('samples').update({
			"_id": app.utils.ObjectId(id)
		},{
			$set: req.body.data
		},
		function(err, data){
			app.errHandler(res, err, data);
		});
	});

	app.use(url, app.checkAuth(), route);
};
