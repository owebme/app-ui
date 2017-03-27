var mysql = require('mysql');

module.exports = function(log, config){

	var connection = mysql.createConnection(config.get('mysql'));

	connection.connect(function(err) {
		if (err) {
			log.error('Connection MySQL error:', err.message);
		}
		else {
			log.info("Connected to MySQL!");
		}
	});

	return connection;
}
