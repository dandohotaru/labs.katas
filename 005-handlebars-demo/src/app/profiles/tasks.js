var TasksComponent = (function (loader) {

    var init = function () {
        return loader.load(["/app/profiles/tasks.hbs", "/api/tasks.json"])
            .then(function ([view, tasks]) {
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