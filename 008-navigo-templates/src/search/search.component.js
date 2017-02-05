var SearchComponent = (function (loader, notifier) {

    var init = function () {

        return loader.load(["/search/search.component.hbs"])
            .then(function ([template]) {
                var render = Handlebars.compile(template);
                var view = render();
                $("#templateId").html(view);
            })
            .catch(function (error) {
                console.error(error);
            });

    };

    var search = function (query) {
        var data = {
            search: query,
        };
        notifier.info(data);
    }

    return {
        init: init,
        search: search,
    };

});