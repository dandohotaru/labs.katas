
$(document).ready(function () {

    var loader = new Loader();

    // Header
    loader.load(["/app/shared/header.hbs", "/api/notificatios.json"])
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
    loader.load(["/app/shared/menu.hbs", "/api/themes.json", "/api/commissions.json"])
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

    // Content
    loader.load(["/app/shared/article.hbs"])
        .then(function ([view]) {
            var html = view({
                title: "What is Lorem Ipsum?",
                body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
            });
            $("#content").html(html);
        }).catch(function (error) {
            console.error(error);
        });

    // Tasks
    loader.load(["/app/shared/tasks.hbs", "/api/tasks.json"])
        .then(function ([view, tasks]) {
            var html = view(tasks);
            $("#tasks").html(html);
        })
        .catch(function (error) {
            console.error(error);
        });

    // Footer
    loader.load(["/app/shared/footer.hbs"])
        .then(function ([view]) {
            var html = view({
                lastUpdate: "4th of December 2016"
            });
            $("#footer").html(html);
        }).catch(function (error) {
            console.error(error);
        });
});


