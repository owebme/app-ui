$store.samples = _.extend(new Baobab([]),
    {
        dataTable: function($, data, callback){
        return {
            data: data,
            rowId: "_id",
            pageLength : 10,
            stateSave: true,
            stateSaveParams: function(settings, data){
                data.search.search = "";
            },
            autoWidth: false,
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
                            return '<span style="background-image:url('+ value +')" class="dataTable__photo"></span>';
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
                }
            ],
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
            initComplete: function(){
                setTimeout(function(){
                    callback();
                }, 5);
            }
        }}
    }
);
