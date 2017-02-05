
$(() => {

  var notifier = new NotificationService();
  var loader = new TemplateService();
  var router = new Navigo(null, false);
  var routes = new RoutingConfig(router, notifier, loader);
  routes.init();

})

