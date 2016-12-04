$(document).ready(function () {

    var loader = new Loader();

    // Header
    loader.load(["/app/layout/header.hbs", "/api/notificatios.json"])
        .then(function ([view, notifications]) {
            var context = {
                user: {
                    firstName: "John",
                    lastName: "Doe"
                },
                notifications: notifications
            };
            var html = view(context);
            $("#header").html(html);
        }).catch(function (error) {
            console.error(error);
        });

    // Menu
    loader.load(["/app/layout/menu.hbs", "/api/themes.json", "/api/commissions.json"])
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
            $("#menu").html(html);
        }).catch(function (error) {
            console.error(error);
        });

    // Footer
    loader.load(["/app/layout/footer.hbs"])
        .then(function ([view]) {
            var html = view({
                lastUpdate: "4th of December 2016"
            });
            $("#footer").html(html);
        }).catch(function (error) {
            console.error(error);
        });

    // Filters
    loader.load(["/api/themes.json"])
        .then(function ([themes]) {
            var source = $("#themes-filters-template").html();
            var view = Handlebars.compile(source);
            var html = view({
                themes: _.map(themes.themes, function (p) {
                    return {
                        id: p.id,
                        name: p.name,
                        subthemes: _.map(p.subthemes, function (s) {
                            return {
                                id: s.id,
                                name: s.name,
                            }
                        })
                    };
                })
            });
            $("#filters").html(html);
        }).catch(function (error) {
            console.error(error);
        });

    // Opinions
    loader.load(["/api/opinions.json"])
        .then(function ([opinions]) {

            var parse = function (date) {
                var actual = new Date(date);
                var output = actual.getDate() + "/" + (actual.getMonth() + 1) + "/" + actual.getFullYear();
                return output;
            };

            var sorted = _.sortBy(opinions.opinions, function (p) {
                return new Date(p.adoption);
            }).reverse();
            var filtered = _.take(sorted, 100);
            var opinionsData = _.map(filtered, function (p) {
                return {
                    type: p.type,
                    date: parse(p.date),
                    opinionId: p.opinionId,
                    folder: p.folder,
                    activation: parse(p.activation),
                    adoption: parse(p.adoption),
                    status: p.status,
                    short: p.short,
                    title: p.title,
                    url: p.url,
                    rapporteur: p.rapporteur ? p.rapporteur.firstName + " " + p.rapporteur.lastName : null,
                    responsible: p.responsible ? p.responsible.firstName + " " + p.responsible.lastName : null,
                    group: p.politicalGroup ? p.politicalGroup.abbreviation : null

                    // commissions: 
                    //     id: c.bodyId,
                    //     short: c.short,
                    //     abbreviation: c.abbreviation,
                    //     name: c.name
                };
            });

            var source = $("#opinion-card-template").html();
            var view = Handlebars.compile(source);
            var html = view({
                cards: opinionsData
            });
            $("#cards").html(html);

            $('.grid').colcade({
                columns: '.grid-col',
                items: '.grid-item'
            });
        }).catch(function (error) {
            console.error(error);
        });

});