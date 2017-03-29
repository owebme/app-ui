$store.users = _.extend(new Baobab([]),
    {
        dataTable: function($, self, data, callback){
        return {
            data: data,
            rowId: "_id",
            pageLength : 10,
            stateSave: true,
            stateSaveParams: function(settings, data){
                data.search.search = "";
            },
            stateSaveCallback: function(settings, data) {
                localStorage.setItem('DataTables_users', JSON.stringify(data));
            },
            stateLoadCallback: function(settings) {
                return JSON.parse(localStorage.getItem('DataTables_users'));
            },
            autoWidth: true,
            order: [[ 11, "desc" ]],
            dom: '<"dataTable__filters__top"iCf>rt<"dataTable__filters__bottom"lp>',
            colVis: {
                buttonText: "",
                iOverlayFade: 200,
                exclude: [ 0, 1 ],
                fnLabel: function(i, title, th){
                    return title;
                }
            },
            columnDefs: [
                {
                    targets: 0,
                    data: null,
                    className: "col-check",
                    orderable: false,
                    searchable: false,
                    render: function(value, type, row){
                        return '<span class="dataTable__checkbox"></span>';
                    }
                },
                {
                    targets: 1,
                    data: 'photo',
                    className: "col-photo",
                    orderable: false,
                    searchable: false,
                    render: function(value, type, row){
                        if (value && value.length){
                            return '<div class="pos-rel" data-balloon=" ' + row.login + ' "><img src="http://192.168.1.64:3000'+ value +'" class="dataTable__photo" onerror="this.remove()"></div>';
                        }
                        else {
                            return '<div class="pos-rel" data-balloon=" ' + row.login + ' "><div class="dataTable__photo__blank"></div></div>';
                        }
                    },
                },
                {
                    targets: 2,
                    data: 'name',
                    defaultContent: "",
                    className: "col-title text-truncate"
                },
                {
                    targets: 3,
                    data: "metrika",
                    className: "col-fidelity",
                    orderable: false,
                    searchable: false,
                    render: function(value, type, row){
                        return self.props.get.fidelity(value);
                    }
                },
                {
                    targets: 4,
                    data: "metrika",
                    className: "col-activity",
                    orderable: false,
                    searchable: false,
                    render: function(value, type, row){
                        return self.props.get.activity(value);
                    }
                },
                {
                    targets: 5,
                    data: "metrika",
                    defaultContent: "",
                    className: "col-welcome",
                    orderable: false,
                    searchable: false,
                    render: function(value, type, row){
                        return self.props.get.welcome(value);
                    }
                },
                {
                    targets: 6,
                    data: null,
                    className: "col-resume text-center",
                    orderable: false,
                    searchable: false,
                    render: function(value, type, row){
                        return '2';
                    }
                },
                {
                    targets: 7,
                    data: null,
                    className: "col-visits text-center",
                    orderable: false,
                    searchable: false,
                    render: function(value, type, row){
                        return '1';
                    }
                },
                {
                    targets: 8,
                    data: 'init.device',
                    className: "col-device",
                    orderable: false,
                    searchable: false,
                    render: function(value, type, row){
                        return '<div class="dataTable__device" data-device="' + value + '"></div>';
                    }
                },
                {
                    targets: 9,
                    data: 'plan',
                    className: "col-plan",
                    render: function(value, type, row){
                        if (value == "premium"){
                            return '<span class="text-capitalize c-blue">' + value + '</span>';
                        }
                        else {
                            return '<span class="text-capitalize c-green">' + value + '</span>';
                        }
                    }
                },
                {
                    targets: 10,
                    data: 'balance',
                    className: "col-balance",
                    orderable: false,
                    searchable: false,
                    render: function(value, type, row){
                        return value + ' ₽';
                    }
                },
                {
                    targets: 11,
                    data: 'init.location.city',
                    className: "col-city text-truncate",
                    orderable: false
                },
                {
                    targets: 12,
                    data: 'create',
                    className: "col-date",
                    searchable: false,
                    render: function(value, type, row){
                        if (type === "sort"){
                            return moment(value).unix();
                        }
                        else {
                            return moment(value).format('D/MM');
                        }
                    }
                }
            ],
            language: self.language,
            initComplete: function(){
                setTimeout(function(){
                    callback();
                }, 5);
            }
        }}
    }
);
