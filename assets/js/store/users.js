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
            autoWidth: true,
            order: [[ 4, "desc" ]],
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
                            return '<img src="http://192.168.1.64:3000'+ value +'" class="dataTable__photo" onerror="this.remove()">';
                        }
                        else {
                            return '<div class="dataTable__photo__blank"></div>';
                        }
                    },
                },
                {
                    targets: 2,
                    data: 'name',
                    defaultContent: "",
                    className: "col-title",
                    render: function(value, type, row){
                        if (value && value.length){
                            return '<span class="text-truncate">'+ value +'</span>';
                        }
                        else {
                            return value;
                        }
                    }
                },
                {
                    targets: 3,
                    data: null,
                    className: "col-activity",
                    orderable: false,
                    searchable: false,
                    render: function(value, type, row){
                        return '';
                    }
                },
                {
                    targets: 4,
                    data: null,
                    className: "col-resume",
                    orderable: false,
                    searchable: false,
                    render: function(value, type, row){
                        return '';
                    }
                },
                {
                    targets: 5,
                    data: 'init.device',
                    className: "col-device",
                    searchable: false,
                    render: function(value, type, row){
                        return '<div class="dataTable__device" data-device="' + value + '"></div>';
                    }
                },
                {
                    targets: 6,
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
                    targets: 7,
                    data: 'balance',
                    className: "col-balance",
                    orderable: false,
                    searchable: false,
                    render: function(value, type, row){
                        return value + ' ₽';
                    }
                },
                {
                    targets: 8,
                    data: 'init.location.city',
                    className: "col-city",
                    orderable: false
                },
                {
                    targets: 9,
                    data: 'create',
                    className: "col-date",
                    orderable: false,
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
