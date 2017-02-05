var RoutingConfig = (function (router, notifier, loader) {

    var mappings = [];

    var builders = [
        { name: "menu", build: () => new MenuComponent(router, loader) },
        { name: "home", build: () => new HomeComponent(router, loader, notifier) },
        { name: "dragons", build: () => new DragonsComponent(router, loader, notifier) },
        { name: "breweries", build: () => new BreweriesComponent(router, loader, notifier) },
        { name: "beers", build: () => new BeersComponent(router, loader, notifier) },
        { name: "search", build: () => new SearchComponent(router, loader, notifier) },
        { name: "account", build: () => new AccountComponent(router, loader, notifier) },
    ];

    function resolve(name) {
        // ToDo: Refactor tired logic

        var mapping = mappings.find(p => p.name == name);
        if (mapping == null) {
            var builder = builders.find(p => p.name == name);
            if (builder == null)
                throw "Make sure there is mapping defined for " + name;

            var component = builder.build();
            component.init();
            mappings.push({ name, component });
            return component;
        }
        else {
            var component = mapping.component;
            component.init();
            return component;
        }
    }

    function init() {

        router
            .notFound((query) => {
                router.navigate("dragons");
            })
            .on(() => {
                resolve("menu");
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
                    resolve("search").search(query);
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
                    resolve("account").action(params, query);
                }
            })
            .resolve();
    }

    return {
        init: init
    };

});