module.exports = function() {

	return function(req, res, next){

		app.async.parallel({

			users: function(callback){
				app.db.collection('accounts').find({},{
					plan: 1,
					balance: 1,
					photo: 1,
					name: 1,
					gender: 1,
					init: 1,
					create: 1
				})
				.toArray(function(err, data){
					app.errHandler(res, err, data, callback);
				});
			},

			samples: function(callback){
				app.db.collection('samples').find()
				.toArray(function(err, data){
					app.errHandler(res, err, data, callback);
				});
			},

			jptestStars: function(callback){
				app.db.collection('jptest').find()
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
