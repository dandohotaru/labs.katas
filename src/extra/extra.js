var colcade = null;
var builder = null;

document.addEventListener("DOMContentLoaded", function (event) {
    builder = new Builder();
    
    colcade = new Colcade('.grid', {
        columns: '.grid-col',
        items: '.grid-item'
    });

    colcade.append(builder.wall(4));
});

document.querySelector('.prepend-button').onclick = function () {
    if (colcade)
        colcade.prepend(builder.wall(3));
}

document.querySelector('.append-button').onclick = function () {
    if (colcade)
        colcade.append(builder.wall(3));
}

