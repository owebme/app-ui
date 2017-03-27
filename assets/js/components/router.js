(function(app, $, $dom, EV, _){

    app.define("router");

    app.router = {

        base: "#/",

        url: null,

        section: null,

        init: function(){

            riot.route = window.route;

            riot.route('/', function(){
                Router.routes.users();
            });

            riot.route('/samples/*', function(section){
                Router.routes.samples(section);
            });

            riot.route('/orders', function(){
                Router.routes.orders();
            });

            riot.route('/payments', function(){
                Router.routes.payments();
            });

            $dom.window.on('hashchange', function(e){
                Router.setUrl();
            });

            riot.route.base(this.base);
            riot.route.start(true);
        },

        routes: {
            init: function(){
                $Nav = new Baobab([
                    {
                        url: "/",
                        section: "users",
                        title: "Пользователи"
                    },
                    {
                        url: "/samples/all",
                        section: "samples",
                        title: "Образцы резюме",
                        items: [
                            {
                                url: "/samples/all",
                                section: "all",
                                title: "Все резюме"
                            },
                            {
                                url: "/samples/preready",
                                section: "ready",
                                title: "Обработанные"
                            },
                            {
                                url: "/samples/ready",
                                section: "ready",
                                title: "Готовые"
                            },
                            {
                                url: "/samples/public",
                                section: "public",
                                title: "Опубликованные"
                            }
                        ]
                    },
                    {
                        url: "/orders",
                        section: "orders",
                        title: "Заказы"
                    },
                    {
                        url: "/payments",
                        section: "payments",
                        title: "Оплаты"
                    }
                ]);
            },
            users: function(){
                Router.section = "users";
                Router.mount('section-users');
            },
            samples: function(section){
                Router.section = "samples";
                Router.mount('section-samples-' + section);
            },
            orders: function(){
                Router.section = "orders";
                Router.mount('section-orders');
            },
            payments: function(){
                Router.section = "payments";
                Router.mount('section-payments');
            }
        },

        setUrl: function(){
            Router.url = Router.getUrl();
        },

        getUrl: function(){
            return location.hash.match(/#(.+)/)[1];
        },

        nav: function(url){
            riot.route(url);
        },

        mount: function(tag){
            if (Router.url){
                $Loader.show().then(function(){
                    var section = riot.mount("section-content", tag)[0];
                    section.one("updated", function(){
                        $Sections.header.section.update();
                        $Loader.hide();
                    });
                    section.update();
                });
            }
            else {
                Router.setUrl();
                var section = riot.mount("section-content", tag)[0];
                section.one("updated", function(){
                    $Sections.header.section.update();
                    $afterlag.run(function(){
                        app.$dom.body
                        .removeClass("appLoading")
                        .addClass("isLoading");
                    }, {
                        timeout: 1000
                    });
                });
                section.update();
            }
        }
    };

    var Router = app.router;

    Router.routes.init();

    $Router = app.router;

})(app, $$, app.$dom, app.events, app.utils);
