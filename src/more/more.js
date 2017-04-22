var loader = new Loader();
var colcade = null;

document.addEventListener("DOMContentLoaded", function (event) {
    colcade = new Colcade('.grid', {
        columns: '.grid-col',
        items: '.grid-item'
    });

    colcade.append(loader.build(5));
});

document.querySelector('.load-button').onclick = function (event) {
    colcade.append(loader.build(5));
};

document.querySelector('.reset-button').onclick = function (event) {
    colcade.reload();
};

