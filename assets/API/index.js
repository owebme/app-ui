module.exports = function(url){

	// Global API
	require('./controllers')(url);

	// Initialize
	app.get(url + '/data/init', app.checkAuth(), require('./data/init')());

	// Samples
	require('./samples')(url + '/samples');

	// Autosuggest
	require('./suggest')(url + '/suggest');

}
