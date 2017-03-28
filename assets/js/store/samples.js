$store.samples = _.extend(new Baobab([]),
    {
        getItemsByStatus: function(status){
            return _.where($store.samples.get(), {"_status": status});
        },
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
            order: [[ 2, "desc" ]],
            dom: '<"dataTable__filters__top"iCf>rt<"dataTable__filters__bottom"lp>',
            colVis: {
                buttonText: "",
                iOverlayFade: 200,
                exclude: [ 0, 1 ],
                fnLabel: function(i, title, th){
                    if (i === 3) return 'Образование';
                    if (i === 4) return 'Зарплата';
                    if (i === 5) return 'Город';
                    else return title;
                }
            },
            columnDefs: [
                {
                    targets: 0,
                    data: null,
                    className: "col-check",
                    orderable: false,
                    searchable: false,
                    render: function(data, type, row){
                        return '<span class="dataTable__checkbox"></span>';
                    }
                },
                {
                    targets: 1,
                    data: 'photo',
                    className: "col-photo",
                    orderable: false,
                    searchable: false,
                    // visible: false,
                    render: function(value, type, row){
                        if (value && value.length){
                            return '<img src="'+ value +'" class="dataTable__photo" onerror="this.remove()">';
                        }
                        else {
                            return value;
                        }
                    },
                },
                {
                    targets: 2,
                    data: 'post',
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
                    data: 'education.level',
                    defaultContent: "&mdash;",
                    className: "col-education",
                    render: function(value, type, row){
                        if (value){
                            return $store.education.getTitleById(String(value), "ru");
                        }
                    }
                },
                {
                    targets: 4,
                    data: 'salary.amount',
                    defaultContent: "",
                    className: "col-salary",
                    orderable: false,
                    searchable: false,
                    render: function(value, type, row){
                        if (value){
                            return value + " RUR";
                        }
                    }
                },
                {
                    targets: 5,
                    data: 'commons.contacts.city.name',
                    className: "col-city",
                    orderable: false,
                    searchable: true
                },
                // {
                //     targets: 6,
                //     data: 'update',
                //     className: "col-date",
                //     searchable: false,
                //     visible: false,
                //     render: function(data, type, row){
                //         if (type === "sort"){
                //             return moment(data).unix();
                //         }
                //         else {
                //             return moment(data).format('D/MM');
                //         }
                //     }
                // }
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
