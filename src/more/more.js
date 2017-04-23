var builder = null;
var colcade = null;

document.addEventListener("DOMContentLoaded", function (event) {
    builder = new Builder();
    
    colcade = new Colcade('.grid', {
        columns: '.grid-col',
        items: '.grid-item'
    });

    colcade.append(builder.wall(5));
});

document.querySelector('.load-button').onclick = function (event) {
    if (colcade)
        colcade.append(builder.wall(5));
};

document.querySelector('.reset-button').onclick = function (event) {
    if (colcade)
        colcade.reload();
};

