var MenuComponent = (function (loader, router) {

    var init = function () {

        return loader.load(["/home/menu.component.hbs"])
            .then(function ([template]) {
                var render = Handlebars.compile(template);
                var view = render();
                $("#menuId").html(view);

                $("#searchForm").on("submit", function (e) {

                    var term = $("#searchBox").val();
                    if (term) {
                        router.navigate(`/search?q=${term}`);
                    }
                    else {
                        notifier.warning("Make sure a search term is provided");
                    }

                    e.preventDefault();
                    return false;
                });
            })
            .catch(function (error) {
                console.error(error);
            });

    };

    return {
        init: init
    };

});