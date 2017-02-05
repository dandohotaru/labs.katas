var MenuComponent = (function (loader) {

    var init = function () {

        return loader.load(["/home/menu.component.hbs"])
            .then(function ([template]) {
                var render = Handlebars.compile(template);
                var view = render();
                $("#menuId").html(view);
            })
            .catch(function (error) {
                console.error(error);
            });

    };

    return {
        init: init
    };

});