var app = app || {};

app.define = function (namespace) {
    var parts = namespace.split("."),
        parent = app,
        i;

    if (parts[0] == "app") {
        parts = parts.slice(1);
    }

    for (i = 0; i < parts.length; i++) {

        if (typeof parent[parts[i]] == "undefined") {
            parent[parts[i]] = {};
        }

        parent = parent[parts[i]];
    }
    return parent;
}

app.tag = function(name){
    if (window.riot){
        return _.filter(riot.vdom, function(tag){
            if (tag.root.nodeName.toLowerCase() == name){
                return tag;
            }
        })[0];
    }
}

window.Store = window.store || {};

window.$store = {};
