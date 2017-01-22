
$(() => {

  var notifier = new NotificationService();
  var router = new Navigo(null, false);
  var routes = new RoutingConfig(notifier, router);
  routes.init();
  
  $("#searchForm").on("submit", function (e) {
      var term = $("#searchBox").val();
      router.navigate(`/search?q=${term}`);
      e.preventDefault();
      return false;
  });


})

