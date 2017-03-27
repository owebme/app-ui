module.exports = function(){

	var API = {};

    var handlerRequest = function(method, text, callback){
        if (!text || text && text.length < 2){
            callback({
				items: []
			});
            return;
        }
        app.req({
            url: app.config.get('hh:api') + "/suggests/" + method + "?text=" + encodeURIComponent(text),
            headers: {
                'User-Agent': 'request'
            },
            timeout: 3000,
        }, function (err, response, data) {
            callback(JSON.parse(data));
        })
	};

    API.education = function(text, callback){
        handlerRequest("educational_institutions", text, function(data){
            callback(data);
        });
    };

    API.companies = function(text, callback){
        handlerRequest("companies", text, function(data){
            callback(data);
        });
    };

    API.speciality = function(text, callback){
        handlerRequest("fields_of_study", text, function(data){
            callback(data);
        });
    };

    API.skills = function(text, callback){
        handlerRequest("skill_set", text, function(data){
            callback(data);
        });
    };

    API.positions = function(text, callback){
        handlerRequest("positions", text, function(data){
            callback(data);
        });
    };

    API.city = function(text, callback){
        handlerRequest("areas", text, function(data){
            callback(data);
        });
    };

    API.vacancy = function(text, callback){
        handlerRequest("vacancy_search_keyword", text, function(data){
            callback(data);
        });
    };

    return API;
};
