var utils = require(process.cwd() + '/libs/utils');

module.exports = function(redirect) {

	return function(req, res, next){
		// if (!req.session.user
		// 	|| req.session.user && (!req.session.user.accountID
		// 	|| !utils.cryptoCheck(req.session.user.login, req.session.user.password, req.session.user.accountID, req.session.user.hash))){
		// 		if (redirect){
		// 			return res.redirect(redirect);
		// 		}
		// 		else {
		// 			res.statusCode = 401;
		// 			return res.send({status: 'Unauthorized'});
		// 		}
		// 	}

		next();
	}
};
