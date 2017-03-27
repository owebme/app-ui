module.exports = function() {

	return function(req, res, next){

		app.async.parallel({

			samples: function(callback){
				app.db.collection('samples').find()
				.toArray(function(err, data){
					app.errHandler(res, err, data, callback);
				});
			}
		},

		function(err, data){
			app.errHandler(res, err, data);
		});

	}
};
