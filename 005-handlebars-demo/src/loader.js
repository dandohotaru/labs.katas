var Loader = (function () {

    function load(templateUrl) {
        var promise = new Promise(function (resolve, reject) {
            $.get(templateUrl)
                .done(function (templateHtml) {
                    var template = Handlebars.compile(templateHtml);
                    resolve(template);
                })
                .fail(reject);
        });

        return promise;
    };

    function bind(templateUrl, jsonUrl) {

        var hbs = _.includes(templateUrl, ".hbs");
        var json = _.includes(jsonUrl, ".json");
        var tmp = _.includes(jsonUrl, ".tmp");

        var promisses = [
            load(templateUrl),
            new Promise(function (resolve, reject) {
                $.getJSON(jsonUrl)
                    .done(resolve)
                    .fail(reject);
            })
        ];

        return Promise.all(promisses)
    };

    return {
        load: load,
        bind: bind,
    }
});