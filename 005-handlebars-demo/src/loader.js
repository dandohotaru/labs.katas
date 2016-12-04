var Loader = (function () {

    function hbs(url) {
        var promise = new Promise(function (resolve, reject) {
            $.get(url)
                .done(function (html) {
                    var template = Handlebars.compile(html);
                    resolve(template);
                })
                .fail(reject);
        });

        return promise;
    };

    function json(url) {
        var promise = new Promise(function (resolve, reject) {
            $.getJSON(url)
                .done(resolve)
                .fail(reject);
        });

        return promise;
    };

    function bind(url, context) {

        var promise = new Promise(function (resolve, reject) {
            $.get(url)
                .done(function (schema) {
                    var template = Handlebars.compile(schema);
                    var html = template(context);
                    resolve(html);
                })
                .fail(reject);
        });

        return promise;
    };

    function load(urls) {
        var valid = urls instanceof Array;
        if (!valid)
            throw "the urls are expected to be an array of urls";

        var promises = _.map(urls, function (url) {
            if (_.includes(url, ".hbs"))
                return hbs(url);
            if (_.includes(url, ".json"))
                return json(url);
            throw "The url cannot be handled: " + url;
        });

        return Promise.all(promises);
    };

    return {
        bind: bind,
        load: load,   
    }
});