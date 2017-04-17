$(document).ready(function () {

    var loader = new Loader();

    // Header
    var user = {
        firstName: "John", 
        lastName: "Doe"
    };
    var header = new HeaderComponent(loader);
    header.init(user).then(function(html) {
        $("#header").html(html);
    });
    
    // Menu
    var menu = new MenuComponent(loader);
    menu.init().then(function(html) {
        $("#menu").html(html);
    });

    // Footer
    var footer = new FooterComponent(loader);
    footer.init().then(function(html) {
        $("#footer").html(html);
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
    loader.load(["/app/opinions/opinion-list.hbs", "/app/opinions/opinion-card.hbs", "/api/opinions.json"])
        .then(function ([listTemplate, cardTemplate, opinions]) {

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
                };
            });

            var view = Handlebars.compile(listTemplate);
            Handlebars.registerPartial("opinion-card", cardTemplate);

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