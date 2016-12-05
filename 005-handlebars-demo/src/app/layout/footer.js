var FooterComponent = (function (loader) {

    var init = function () {
        return loader.load(["/app/layout/footer.hbs"])
            .then(function ([template]) {
                var view = Handlebars.compile(template);
                var html = view({
                    lastUpdate: "4th of December 2016"
                });
                return html;
            }).catch(function (error) {
                console.error(error);
            });
    };

    return {
        init: init
    }
});