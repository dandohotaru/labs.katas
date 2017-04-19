document.addEventListener("DOMContentLoaded", function (event) {
    var colcade = new Colcade('.grid', {
        columns: '.grid-col',
        items: '.grid-item'
    });

    var loader = new Loader();

    colcade.append(loader.build(5));

    document.querySelector('.load-more-button').onclick = function () {
        colcade.append(loader.build(5));
    };
});

