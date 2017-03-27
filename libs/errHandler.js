module.exports = function(res, err, data, callback){
    if (callback) {
        callback(err, data);
    }
    else {
        if (!data) {
            res.statusCode = 404;
            return res.send({status: 'Not found'});
        }
        if (!err) {
            res.statusCode = 200;
            return res.send({status: 'OK', result: data});
        }
        else {
            res.statusCode = 500;
            return res.send({status: 'Server error', error: err});
        }
    }
};
