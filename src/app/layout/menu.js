var MenuComponent = (function (loader) {

    var init = function () {
        return loader.load(["/app/layout/menu.hbs", "/api/themes.json", "/api/commissions.json"])
            .then(function ([template, themes, commissions]) {
                var context = {
                    themes: _.map(themes.themes, function (p) {
                        return {
                            id: p.id,
                            name: p.name,
                            counter: p.subthemes.length,
                            url: "browse/cards.html?themeId=" + p.id
                        };
                    }),
                    commissions: _.map(commissions, function (p) {
                        return {
                            name: p.name,
                            counter: Math.floor((Math.random() * 100) + 1),
                            url: "browse/cards.html?commission=" + p.name
                        };
                    })
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