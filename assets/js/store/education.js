$store.education = _.extend(new Baobab([
    {
        _id: "1",
        parent: "0",
        title: {
            en: "Higher",
            ru: "Высшее"
        }
    },
    {
        _id: "2",
        parent: "1",
        title: {
            en: "Bachelor",
            ru: "Бакалавр"
        }
    },
    {
        _id: "3",
        parent: "1",
        title: {
            en: "Master",
            ru: "Магистр"
        }
    },
    {
        _id: "4",
        parent: "1",
        title: {
            en: "Candidate of Sciences",
            ru: "Кандидат наук"
        }
    },
    {
        _id: "5",
        parent: "1",
        title: {
            en: "Doctor of Sciences",
            ru: "Доктор наук"
        }
    },
    {
        _id: "6",
        parent: "0",
        title: {
            en: "Incomplete higher",
            ru: "Неоконченное высшее"
        }
    },
    {
        _id: "7",
        parent: "0",
        title: {
            en: "Vocational secondary",
            ru: "Среднее специальное"
        }
    },
    {
        _id: "8",
        parent: "0",
        title: {
            en: "Secondary",
            ru: "Среднее"
        }
    }
    ]),
    {
        getItems: function(lang){
            return _.map($store.education.get(), function(item){
                return {
                    _id: item._id,
                    parent: item.parent,
                    title: item.title[lang || $store.resume.get("lang")]
                }
            });
        },
        getTitleById: function(id, lang){
            return $store.education.get({"_id": id}, "title", lang || $store.resume.get("lang"));
        }
    }
);
