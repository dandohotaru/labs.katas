var FooterComponent = (function (loader) {

    var build = function () {
        return loader.load(["/app/shared/footer.hbs"])
            .then(function ([view]) {
                var html = view({
                    lastUpdate: "4th of December 2016"
                });
                return html;
            }).catch(function (error) {
                console.error(error);
            });
    };

    return {
        build: build
    }
});