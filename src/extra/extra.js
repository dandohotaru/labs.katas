var colcade = new Colcade('.grid', {
    columns: '.grid-col',
    items: '.grid-item'
});

function getItem() {
    var item = document.createElement('div');
    item.classList.add('grid-item');
    var letter = 'abc'[Math.floor(Math.random() * 3)];
    item.classList.add('grid-item-' + letter);
    return item;
}

function getItems() {
    var items = [getItem(), getItem(), getItem()];
    var hue = [330, 0, 30, 180, 210][Math.floor(Math.random() * 5)];
    items.forEach(function (item) {
        item.style.background = 'hsl(' + hue + ', 90%, 50%)';
    });
    return items;
}

document.querySelector('.append-button').onclick = function () {
    colcade.append(getItems());
}

document.querySelector('.prepend-button').onclick = function () {
    colcade.prepend(getItems());
}