var TasksComponent = (function (loader) {

    var build = function () {
        return loader.load(["/app/shared/tasks.hbs", "/api/tasks.json"])
            .then(function ([view, tasks]) {
                var html = view(tasks);
                return html;
            })
            .catch(function (error) {
                console.error(error);
            });
    };

    return {
        build: build
    }
});