var Loader = (function () {

    function loadHbs(url) {
        var promise = new Promise(function (resolve, reject) {
            console.time(url);
            $.get(url)
                .done(function (response) {
                    resolve(response);
                    console.timeEnd(url);
                })
                .fail(reject);
        });

        return promise;
    };

    function loadJson(url) {
        var promise = new Promise(function (resolve, reject) {
            console.time(url);
            $.getJSON(url)
                .done(function (response) {
                    console.timeEnd(url);
                    return resolve(response);
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
                return loadHbs(url);
            if (_.includes(url, ".json"))
                return loadJson(url);
            throw "The url cannot be handled: " + url;
        });

        return Promise.all(promises);
    };

    return {
        load: load,
    }
});