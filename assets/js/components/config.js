app.config = {
    domain: null,
    api: '/api',
    request: {
        active: true,
        settings: function(){
            return {
                loader: true,
                notify: true
            }
        }
    },
    changeStyles: false
};
