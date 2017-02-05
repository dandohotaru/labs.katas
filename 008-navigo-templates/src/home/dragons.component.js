var DragonsComponent = (function (loader, notifier) {

    var init = function () {

        return loader.load(["/home/dragons.component.hbs"])
            .then(function ([template]) {

                var render = Handlebars.compile(template);
                var view = render();
                $("#templateId").html(view);

                notifier.error("There is no handler for given route");
            })
            .catch(function (error) {
                console.error(error);
            });

    };

    return {
        init: init
    };

});