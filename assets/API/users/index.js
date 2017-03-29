module.exports = function(url){

	var route = app.express.Router();

	route.get('/:id', function(req, res) {
        app.db.collection('accounts').findOne({
            "_id": app.utils.ObjectId(req.params.id)
        },
        function(err, data){
            app.errHandler(res, err, data);
        });
	});

	app.use(url, app.checkAuth(), route);
};
