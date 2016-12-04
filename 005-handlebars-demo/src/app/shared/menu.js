var MenuComponent = (function (loader) {

    var build = function () {
        return loader.load(["/app/shared/menu.hbs", "/api/themes.json", "/api/commissions.json"])
            .then(function ([view, themes, commissions]) {
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