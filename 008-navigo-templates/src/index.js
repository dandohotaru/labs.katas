
$(() => {

  var notifier = new NotificationService();
  var loader = new TemplateService();
  var router = new Navigo(null, false);
  var routes = new RoutingConfig(router, notifier, loader);
  routes.init();

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

