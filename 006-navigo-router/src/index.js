
$(() => {

  var notifier = new NotificationService();
  var routes = new RoutingConfig(notifier);
  routes.init();

})

