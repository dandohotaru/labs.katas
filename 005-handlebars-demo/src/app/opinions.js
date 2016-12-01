$(document).ready(function () {

    var headerLoader = $.get("/app/shared/header.hbs");
    var menuLoader = $.get("/app/shared/menu.hbs");
    var footerLoader = $.get("/app/shared/footer.hbs");
    var notificationsLoader = $.getJSON("/api/notificatios.json");
    var themesLoader = $.getJSON("/api/themes.json");
    var commissionsLoader = $.getJSON("/api/commissions.json");
    var opinionsLoader = $.getJSON("/api/opinions.json");

    $.when(headerLoader, menuLoader, footerLoader, notificationsLoader, themesLoader, commissionsLoader, opinionsLoader)
        .done(function (headerResult, menuResult, footerResult, notificationsResult, themesResult, commissionsResult, opinionsResult) {

            // Header
            var notificationsData = notificationsResult[0];
            var headerPartial = $($.parseHTML(headerResult[0])).filter("#header-partial").html();
            var headerTemplate = Handlebars.compile(headerPartial);
            var headerMarkup = headerTemplate({
                user: {
                    firstName: "John",
                    lastName: "Doe"
                },
                notifications: notificationsData
            });
            $("#header").html(headerMarkup);

            // Menu
            var themesData = _.map(themesResult[0].themes, function (p) {
                return {
                    id: p.id,
                    name: p.name,
                    counter: p.subthemes.length,
                    url: "opinions/cards.html?themeId=" + p.id
                };
            });
            var commissionsData = _.map(commissionsResult[0], function (p) {
                return {
                    name: p.name,
                    counter: Math.floor((Math.random() * 100) + 1),
                    url: "browse/cards.html?commission=" + p.name
                };
            });
            var menuHtml = $($.parseHTML(menuResult[0])).filter("#menu-partial").html();
            var menuTemplate = Handlebars.compile(menuHtml);
            $("#menu").html(menuTemplate({
                themes: themesData,
                commissions: commissionsData,
            }));

            // Filters
            var themesFilters = _.map(themesResult[0].themes, function (p) {
                return {
                    id: p.id,
                    name: p.name,
                    subthemes: _.map(p.subthemes, function(s){
                        return {
                            id: s.id,
                            name: s.name,
                        }
                    })
                };
            });
            var filtersSource = $("#themes-filters-template").html();
            var filtersTemplate = Handlebars.compile(filtersSource);
            var filtersMarkup = filtersTemplate({
                themes: themesFilters,
            });
            $("#filters").html(filtersMarkup);

            // Content
            var parse = function(date){
                var actual = new Date(date);
                var output = actual.getDate() + "/" +  (actual.getMonth() + 1) + "/" + actual.getFullYear();
                return output;
            };

            var sorted = _.sortBy(opinionsResult[0].opinions, function(p){
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
            var cardSource   = $("#opinion-card-template").html();
            var cardTemplate = Handlebars.compile(cardSource);
            var cardMarkup = cardTemplate({
                cards: opinionsData,
            });
            $("#cards").html(cardMarkup);



            // Footer
            var footerHtml = $($.parseHTML(footerResult[0])).filter("#footer-partial").html();
            var footerTemplate = Handlebars.compile(footerHtml);
            $("#footer").html(footerTemplate({
                lastUpdate: "30th of November 2016"
            }));

            $('.grid').colcade({
                columns: '.grid-col',
                items: '.grid-item'
            });

        }).fail(function (error) {
            console.error(error);
        });

    

});


