module.exports = function() {

	return function(req, res, next){

		app.async.parallel({

			users: function(callback){
				app.db.collection('accounts').find({},{
					plan: 1,
					login: 1,
					balance: 1,
					photo: 1,
					name: 1,
					gender: 1,
					init: 1,
					create: 1,
					metrika: 1
				})
				.toArray(function(err, data){
					if (data){
						app.utils.each(data, function(item){
							if (item.metrika && item.metrika.length){
								item.metrika = item.metrika[item.metrika.length - 1];
							}
						})
					}
					app.errHandler(res, err, data, callback);
				});
			},

			samples: function(callback){
				app.db.collection('samples').find()
				.toArray(function(err, data){
					app.errHandler(res, err, data, callback);
				});
			},

			jptestStat: function(callback){
				app.db.collection('jptestStat').find()
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
