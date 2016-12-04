$(document).ready(function () {

  var loader = new Loader();

  // Header
  var user = {
    firstName: "John",
    lastName: "Doe"
  };
  var header = new HeaderComponent(loader);
  header.init(user).then(function (html) {
    $("#header").html(html);
  });

  // Menu
  var menu = new MenuComponent(loader);
  menu.init().then(function (html) {
    $("#menu").html(html);
  });

  // Footer
  var footer = new FooterComponent(loader);
  footer.init().then(function (html) {
    $("#footer").html(html);
  });

  // Content
  $('[data-toggle="left-canvas"]').click(function () {
    $('.row-offcanvas').toggleClass('active')
  });
});