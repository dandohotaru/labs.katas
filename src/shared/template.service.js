var TemplateService = (function () {

    function load(urls) {
        var valid = urls instanceof Array;
        if (!valid)
            throw "the urls are expected to be an array of urls";

        var promises = urls.map(url => {
            if (!url.includes(".hbs"))
                throw "The url cannot be handled: " + url;

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
        });

        return Promise.all(promises);
    };

    return {
        load: load,
    }
});