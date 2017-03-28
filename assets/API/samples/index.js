module.exports = function(url){

	var route = app.express.Router();

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

	route.put('/status', function(req, res) {
		app.db.collection('samples').update({
			"_id": {
				$in: req.body.ids.map(app.utils.ObjectId)
			}
		},{
			$set: {
				"_status": req.body.status
			}
		},{
			multi: true
		},
		function(err, data){
			app.errHandler(res, err, data);
		})
	});

	route.delete('/', function(req, res) {
		app.db.collection('samples').remove({
			"_id": {
				$in: req.body.ids.map(app.utils.ObjectId)
			}
		},{
			multi: true
		},
		function(err, data){
			app.errHandler(res, err, data);
		});
	});

	route.post('/gethh', function(req, res) {
		var result = {
			data: [],
			all: 0,
			update: 0,
			insert: 0,
			errors: 0
		};
		app.async.eachLimit(req.body.ids, 10, function(id, callback){
			API.resume.gethh(id, function(err, resume){
				if (resume){
					resume._status = "all";
					resume._seo = {
						title: null,
						keywords: null,
						description: null,
						text: null
					}					
					app.db.collection('samples').update({
						"idhh": id,
						"_status": "all"
					},
						resume,
					{
						upsert: true
					},
					function(err, data){
						if (data){
							result.all++;
							if (data.result.upserted && data.result.upserted.length){
								result.insert++;
								resume._id = data.result.upserted[0]._id;
							}
							else {
								result.update++;
							}
							result.data.push(resume);
						}
						else {
							result.errors++;
						}
						app.errHandler(res, err, data, callback);
					});
				}
				else {
					result.errors++;
					app.errHandler(res, err, data, callback);
				}
			});
		},
		function(err, data){
			app.errHandler(res, null, result);
		});
	});

	app.use(url, app.checkAuth(), route);
};
