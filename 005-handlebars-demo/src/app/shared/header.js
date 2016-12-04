var HeaderComponent = (function (loader) {

    var build = function () {
        return loader.load(["/app/shared/header.hbs", "/api/notificatios.json"])
            .then(function ([view, notifications]) {
                var context = {
                    user: {
                        firstName: "John",
                        lastName: "Doe"
                    },
                    notifications: notifications
                };
                var html = view(context);
                return html;
            }).catch(function (error) {
                console.error(error);
            });
    };

    return {
        build: build
    }
});