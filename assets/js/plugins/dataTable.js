(function(app, $, $dom, EV, _){

    app.define("plugins.dataTable");

    app.plugins.dataTable = function(options){
        this.tag = options.tag;
        this.scope = $(options.scope);
        this.items = options.items;
        this.store = options.store;
        this.propId = options.propId || "_id";
        this.settings = options.settings;
        this.autoupdate = options.autoupdate !== undefined && options.autoupdate || true;
        this.fnShouldRemove = options.shouldRemove;
        this.fnEditItem = options.editItem;
        this.fnSelect = options.select;
        this.fnAfterInit = options.afterInit;
        this.noObservable = false;
        this.props = options.props;
        this.selectList = [];
        this.selectors = {
            editItem: "tr",
            select: "selected",
            reset: "dataTables__reset",
            checkbox: "dataTable__checkbox"
        }
        _.extend(this.selectors, options.selectors || {});
    };

    app.plugins.dataTable.prototype = {

        init: function() {
            var _this = this;

            this.refresh.self = this;
            this.get.self = this;
            this.select.self = this;
            this.search.self = this;

            this.table = this.scope.DataTable(
                this.settings(this.tag, this, this.get.items(), function(){
                    if (_.isFunction(_this.fnAfterInit)){
                        _this.fnAfterInit();
                    }
                    _this.render();
                })
            );

            if (this.autoupdate && this.store) this._observable();
        },

        _observable: function(){
            var _this = this;

            _this.store.on('write', function(e){
                if (!_this.noObservable && e && e.data && e.data.path && e.data.path.length){
                    var item = _this.store.get(e.data.path[0]);
                    if (item) _this.refresh.item(item[_this.propId]);
                }
            });
        },

        render: function(){
            var _this = this;

            this.$elem = $(this.table.context[0].nTable);
            this.$body = this.$elem.find("tbody");

            // Reset search result
            this.$body.on("click", "." + this.selectors.reset, function(){
                _this.search.resetAll();
            });

            // Checked item
            if (_.isFunction(this.fnSelect)){
                this.$body.on("click", "." + this.selectors.checkbox, function(){
                    var $row = $(this).closest("tr"),
                        item = _this.table.row($row[0]).data();

                    if (item){
                        $row.toggleClass(_this.selectors.select);
                        var index = _this.selectList.indexOf(item[_this.propId]);
                        if (index > -1){
                            _this.selectList.splice(index, 1);
                        }
                        else {
                            _this.selectList.push(item[_this.propId]);
                        }
                        _this.fnSelect(_this);
                    }
                });
            }

            if (_.isFunction(this.fnEditItem)){
                this.$body.on("click", this.selectors.editItem, function(e){
                    var item = e.target,
                        cl = item.getAttribute("class");

                    if (!cl || cl && !cl.match(_this.selectors.checkbox)){
                        var item = _this.get.item(this);
                        if (item) _this.fnEditItem(item);
                    }
                });
            }
        },

        search: {
            column: function(num, value){
                this.self.table.column(num).search(value, false, true, true).draw();
            },
            reset: function(){
                this.self.table.columns().search('').draw();
            },
            resetAll: function(){
                this.self.table.search('').columns().search('').draw();
            }
        },

        get: {
            items: function(){
                return _.isFunction(this.self.items) ? this.self.items(this.self) : this.self.items;
            },
            row: function(cursor){
                return this.self.table.row($(cursor).closest("tr")[0]);
            },
            item: function(cursor){
                return this.row(cursor).data();
            },
            id: function(cursor){
                var item = this.item(cursor);
                return item && item[this.self.propId];
            },
            objPropId: function(id){
                var prop = {};
                prop[this.self.propId] = id;
                return prop;
            }
        },

        select: {
            get: function(){
                return this.self.selectList;
            },
            all: function(){
                var self = this.self;

                self.selectList = [];

                self.$body.find("tr").addClass(self.selectors.select).each(function(){
                    self.selectList.push(this.id);
                });
            },
            unset: function(){
                this.self.$body.find("tr").removeClass(this.self.selectors.select);
                this.self.selectList = [];
            }
        },

        refresh: {
            item: function(id){
                var row = this.self.table.row('#' + id);
                if (row && row[0] && row[0].length){
                    var item = this.self.store.get(this.self.get.objPropId(id));
                    if (item){
                        if (this.self.fnShouldRemove && this.self.fnShouldRemove(this.self, item)){
                            row.data(item).remove().draw("page");
                        }
                        else {
                            row.data(item).draw("page");
                        }
                    }
                    else {
                        this.self.$body.find("tr#" + id).remove();
                    }
                }
            },
            all: function(){
                this.self.table.clear().draw();
                this.self.table.rows.add(this.self.get.items()).draw();
            }
        },

        language: {
            "sProcessing":   "Подождите...",
            "sLengthMenu":   "На странице: _MENU_",
            "sZeroRecords":  '<div class="text-center"><h3 class="mb-xs">Нет подходящих результатов</h3><p class="mb-m">попробуйте смягчить условия поиска</p><span class="dataTables__reset btn btn-l btn-primary-hover">Сбросить фильтры</span></div>',
            "sInfo":         '<span class="dataTable__total__records">Записей: <span class="fontWeight-bold">_TOTAL_</span></span>',
            "sInfoEmpty":    '<span class="dataTable__total__records">Записей: <span class="fontWeight-bold">0</span></span>',
            "sInfoFiltered": "",
            "sInfoPostFix":  "",
            "sSearch":       '<span class="dataTable__search__icon"></span>',
            "sUrl":          "",
            "oPaginate": {
                "sFirst": "Первая",
                "sPrevious": "Предыдущая",
                "sNext": "Следующая",
                "sLast": "Последняя"
            },
            "oAria": {
                "sSortAscending":  ": активировать для сортировки столбца по возрастанию",
                "sSortDescending": ": активировать для сортировки столбцов по убыванию"
            }
            // http://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Russian.json
        },

        destroy: function(){
            this.$body.off();
            if (this.store){
                this.store.off('write');
            }
            this.table.destroy();
        }
    }

})(app, $, app.$dom, app.events, app.utils);
