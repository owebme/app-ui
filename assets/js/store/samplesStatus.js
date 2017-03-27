$store.samples.status = _.extend(new Baobab([
    {
        _id: "1",
        title: "Новый"
    },
    {
        _id: "2",
        title: "Обработанный"
    },
    {
        _id: "3",
        title: "Готовый"
    },
    {
        _id: "4",
        title: "Опубликованный"
    }
]), {
    getTitleById: function(id){
        return $store.samples.status.get({'_id': id}, 'title');
    }
});
