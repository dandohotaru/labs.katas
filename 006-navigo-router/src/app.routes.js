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
            .on("breweries", () => {
                load("breweries");
            })
            .on("beers", (params, query) => {
                load("beers");
            })
            .on("settings", (params, query) => {
                notifier.warning("Context not implemented, falling back to homepage");
                router.navigate("/");
            })
            .on("account", (params, query) => {
                load("account");
            })
            .on({
                "book/:id/note/:noteId": (params, query) => {
                    var message = JSON.stringify(params)
                    notifier.info(message);
                },
                "book/:id": (params, query) => {
                    var message = JSON.stringify(params)
                    notifier.info(message);
                },
                "book*": (params, query) => {
                    var message = JSON.stringify(query)
                    notifier.info(message);
                },
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