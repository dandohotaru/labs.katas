var RoutingConfig = (function (notifier, router) {

    function load(context) {

        var options = ["home", "breweries", "beers", "search", "account", "dragons"];

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
            .notFound((query) => {
                router.navigate("dragons");
            })
            .on({
                "dragons": (params, query) => {
                    notifier.error("There is no handler for given route");
                    load("dragons");
                }
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
            .on({ // Search
                "search*": (params, query) => {
                    var data = {
                        search: query,
                    };
                    notifier.info(data);
                    load("search");
                }
            })
            .on({ // Settings
                "settings": (params, query) => {
                    notifier.warning("Feature not implemented, falling back to homepage");
                    router.navigate("/");
                }
            })
            .on({ // Account
                "account": (params, query) => {
                    load("account");
                    notifier.success("Let's assume your account is not needed at this stage");
                }
            })
            .resolve();
    }

    return {
        init: init
    };

});