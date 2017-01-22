var RoutingConfig = (function (notifier) {

    var router = new Navigo(null, false);

    function load(context) {

        var options = ["home", "breweries", "beers", "account"];

        options.filter(item => item != context).forEach(item => {
            $(`#${item}Panel`).hide();
            $(`#${item}Menu`).removeClass("active");
        });

        options.filter(item => item == context).forEach(item => {
            $(`#${item}Panel`).show();
            $(`#${item}Menu`).addClass("active");
        });
    }

    function init() {

        router
            .on(() => {
                load("home");
            })
            .on({ // Breweries
                "breweries": (params, query) => {
                    var data = {
                        breweries: "all",
                    };
                    notifier.info(data);
                    load("breweries");
                },
                "breweries/search": (params, query) => {
                    var data = {
                        breweries: "search",
                        by: query,
                    };
                    notifier.info(data);
                    load("breweries");
                },
                "breweries/:breweryId": (params, query) => {
                    var data = {
                        brewery: params.breweryId,
                    };
                    notifier.info(data);
                    load("breweries");
                },
                "breweries/:breweryId/beers": (params, query) => {
                    var data = {
                        brewery: params.breweryId,
                        beers: "all",
                    };
                    notifier.info(data);
                    load("breweries");
                },
                "breweries/:breweryId/beers/:beerId": (params, query) => {
                    var data = {
                        brewery: params.breweryId,
                        beer: params.beerId,
                    };
                    notifier.info(data);
                    load("breweries");
                },
            })
            .on({ // Beers
                "beers": (params, query) => {
                    var data = {
                        beers: "all",
                    };
                    notifier.info(data);
                    load("beers");
                },
                "beers/search": (params, query) => {
                    var data = {
                        beers: "search",
                        by: query,
                    };
                    notifier.info(data);
                    load("beers");
                },
                "beers/:beerId": (params, query) => {
                    var data = {
                        beer: params.beerId,
                    };
                    notifier.info(data);
                    load("beers");
                },
            })
            .on("settings", (params, query) => {
                notifier.warning("Context not implemented, falling back to homepage");
                router.navigate("/");
            })
            .on("search", (params, query) => {
                notifier.info(query);
            })
            .on("account", (params, query) => {
                load("account");
                notifier.success("Let's assume your account is not needed at this stage");
            })
            .notFound((query) => {
                notifier.error("There is no handler for given route");
            })
            .resolve();
    }

    return {
        init: init
    };

});