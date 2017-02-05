var RoutingConfig = (function (router, notifier, loader) {

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

    var mappings = [];

    var builders = [
        { name: "home", build: () => new HomeComponent(loader, notifier) },
        { name: "dragons", build: () => new DragonsComponent(loader, notifier) },
        { name: "breweries", build: () => new BreweriesComponent(loader, notifier) },
        { name: "beers", build: () => new BeersComponent(loader, notifier) },
    ];

    function resolve(name) {
        // ToDo: Refactor tired logic

        var mapping = mappings.find(p => p.name == name);
        if (mapping == null) {
            var builder = builders.find(p => p.name == name);
            if (builder == null)
                throw "Make sure there is mapping defined for " + name;

            var component = builder.build();
            component.init().then(function(){
                router.updatePageLinks();
            });
            mappings.push({ name, component });
            return component;
        }
        else {
            var component = mapping.component;
            component.init().then(function(){
                router.updatePageLinks();
            });
            return component;
        }
    }

    function init() {

        router
            .notFound((query) => {
                router.navigate("dragons");
            })
            .on(() => {
                resolve("home");
            })
            .on({
                "dragons": (params, query) => {
                    resolve("dragons");
                }
            })
            .on({ // Breweries
                "breweries": (params, query) => {
                    resolve("breweries");
                },
                "breweries/search": (params, query) => {
                    resolve("breweries").search(query);
                },
                "breweries/:breweryId": (params, query) => {
                    resolve("breweries").details(params);
                },
                "breweries/:breweryId/beers": (params, query) => {
                    resolve("breweries").beers(params);
                },
                "breweries/:breweryId/beers/:beerId": (params, query) => {
                    resolve("breweries").beer(params);
                },
            })
            .on({ // Beers
                "beers": (params, query) => {
                    resolve("beers");
                },
                "beers/search": (params, query) => {
                    resolve("beers").search(query);
                },
                "beers/:beerId": (params, query) => {
                    resolve("beers").details(params);
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