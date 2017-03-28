app.fetch.API = function(method){
    return app.fetch.API[method]();
};

app.fetch.API.getDataInit = function(){
    return new Promise(function(resolve, reject){
        app.request('getDataInit').then(function(res){

            $store.users.set(res.users ? res.users : []);
            $store.samples.set(res.samples ? res.samples : []);
            $store.jptestStars.set(res.jptestStars ? res.jptestStars : []);

            console.dir(res.users);

            resolve(res);
        });
    });
};
