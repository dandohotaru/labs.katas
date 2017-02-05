var BreweriesComponent = (function (loader, notifier) {

    var init = function () {

        return loader.load(["/breweries/breweries.component.hbs"])
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
            breweries: "search",
            by: query,
        };
        notifier.info(data);
    }

    var details = function (params) {
        var data = {
            brewery: params.breweryId,
        };
        notifier.info(data);
    }

    var beers = function (params) {
        var data = {
            brewery: params.breweryId,
            beers: "all",
        };
        notifier.info(data);
    }

    var beer = function (params) {
        var data = {
            brewery: params.breweryId,
            beer: params.beerId,
        };
        notifier.info(data);
    }

    return {
        init: init,
        search: search,
        details: details,
        beers: beers,
        beer: beer,
    };

});