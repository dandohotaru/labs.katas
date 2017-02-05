var HomeComponent = (function (router, loader, notifier) {

    var init = function () {

        return loader.load(["/home/home.component.hbs"])
            .then(function ([template]) {

                var render = Handlebars.compile(template);
                var view = render({
                    userName: "John Doe"
                });
                $("#templateId").html(view);
                router.updatePageLinks();

                notifier.success("Welcome to a magnificent seven demo");
            })
            .catch(function (error) {
                console.error(error);
            });

    };

    return {
        init: init
    };

});