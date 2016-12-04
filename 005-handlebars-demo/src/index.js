
$(document).ready(function() {

    var loader = new Loader();

    // Header
    var header = new HeaderComponent(loader);
    header.build().then(function(html) {
        $("#header").html(html);
    });

    // Menu
    var menu = new MenuComponent(loader);
    menu.build().then(function(html) {
        $("#menu").html(html);
    });

    // Footer
    var footer = new FooterComponent(loader);
    footer.build().then(function(html) {
        $("#footer").html(html);
    });

    // Content
    var article = new ArticleComponent(loader);
    article.build().then(function(html) {
        $("#article").html(html);
    });

    var tasks = new TasksComponent(loader);
    tasks.build().then(function(html) {
        $("#tasks").html(html);
    });
});


