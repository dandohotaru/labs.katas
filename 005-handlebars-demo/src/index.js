
$(document).ready(function() {

    var headerLoader = $.get("/app/shared/header.hbs");
    var menuLoader = $.get("/app/shared/menu.hbs");
    var footerLoader = $.get("/app/shared/footer.hbs");
    var notificationsLoader = $.getJSON("/api/notificatios.json");
    var themesLoader = $.getJSON("/api/themes.json");
    var commissionsLoader = $.getJSON("/api/commissions.json");

    $.when(headerLoader, menuLoader, footerLoader, notificationsLoader, themesLoader, commissionsLoader)
        .done(function(headerResult, menuResult, footerResult, notificationsResult, themesResult, commissionsResult) {

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
            var themesData = _.map(themesResult[0].themes, function(p) {
                return {
                    id: p.id,
                    name: p.name,
                    counter: p.subthemes.length,
                    url: "browse/cards.html?themeId=" + p.id
                };
            });
            var commissionsData = _.map(commissionsResult[0], function(p) {
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

            // Content
            var context = {
                title: "What is Lorem Ipsum?", 
                body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
            };
            var source   = $("#entry-template").html();
            var template = Handlebars.compile(source);
            var markup = template(context);
            $("#entry").html(markup);

            // Footer
            var footerHtml = $($.parseHTML(footerResult[0])).filter("#footer-partial").html();
            var footerTemplate = Handlebars.compile(footerHtml);
            $("#footer").html(footerTemplate({
                lastUpdate: "30th of November 2016"
            }));

        }).fail(function(error) {
            console.error(error);
        });
});


