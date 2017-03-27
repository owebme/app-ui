app.fetch.API = function(method){
    return app.fetch.API[method]();
};

app.fetch.API.getDataInit = function(){
    return new Promise(function(resolve, reject){
        app.request('getDataInit').then(function(res){

            $store.samples.set(res.samples ? res.samples : []);

            resolve(res);
        });
    });
};
