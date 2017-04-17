var HeaderComponent = (function (loader) {

    var init = function (user) {
        return loader.load(["/app/layout/header.hbs", "/api/notificatios.json"])
            .then(function ([template, notifications]) {
                
                var context = {
                    user: {
                        firstName: user.firstName,
                        lastName: user.lastName
                    },
                    notifications: notifications
                };
                
                var view = Handlebars.compile(template);
                var html = view(context);
                return html;
            }).catch(function (error) {
                console.error(error);
            });
    };

    return {
        init: init
    }
});