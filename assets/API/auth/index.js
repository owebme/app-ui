module.exports = function(app) {

	return function(req, res, next){

		var login = req.body.login,
			password = req.body.password,
			logined = req.body.logined;

		if (!login || !password) return res.sendStatus(401);

		var unAuth = function(logined){
			if (logined) res.sendStatus(401);
			else res.send({status: 'error'});
		};

		app.db.collection('accounts').findOne({
			"login": login
		}, function(err, user){
			if (err) {
				return next(err);
			}
			else {
				if (user){
					if (user.password !== app.utils.cryptoPass(password)){
						unAuth(logined);
					}
					else {
						if (logined){
							user.accountID = user._id;
							req.session.user = user;
							req.session.user.hash = app.utils.cryptoHash(user.login, user.password, user.accountID);
							res.redirect('/private/');
						}
						else {
							res.send({status: 'OK'});
						}
					}
				}
				else {
					unAuth(logined);
				}
			}
		});
	}
};
