var TasksComponent = (function (loader) {

    var init = function () {
        return loader.load(["/app/profiles/tasks.hbs", "/api/tasks.json"])
            .then(function ([template, tasks]) {
                var view = Handlebars.compile(template);
                var html = view(tasks);
                return html;
            })
            .catch(function (error) {
                console.error(error);
            });
    };

    return {
        init: init
    }
});