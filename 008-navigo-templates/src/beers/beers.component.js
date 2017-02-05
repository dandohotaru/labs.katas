var BeersComponent = (function (loader, notifier) {

    var init = function () {

        return loader.load(["/beers/beers.component.hbs"])
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
            beers: "search",
            by: query,
        };
        notifier.info(data);
    }

    var details = function (params) {
        var data = {
            beer: params.beerId,
        };
        notifier.info(data);
    }

    return {
        init: init,
        search: search,
        details: details,
    };

});