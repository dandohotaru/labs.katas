var AccountComponent = (function (loader, notifier) {

    var init = function () {

        return loader.load(["/account/account.component.hbs"])
            .then(function ([template]) {
                var render = Handlebars.compile(template);
                var view = render();
                $("#templateId").html(view);
            })
            .catch(function (error) {
                console.error(error);
            });

    };

    var action = function (params, query) {
        notifier.success("Let's assume your account is not needed at this stage");
    }

    return {
        init: init,
        action: action,
    };

});