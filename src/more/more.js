var colcade = new Colcade('.grid', {
    columns: '.grid-col',
    items: '.grid-item'
});

document.querySelector('.load-more-button').onclick = function () {
    colcade.append([
        makeItem(), makeItem(), makeItem(), makeItem(), makeItem(),
        makeItem(), makeItem(), makeItem(), makeItem(), makeItem()
    ]);
};

function makeItem() {
    var item = document.createElement('div');
    item.classList.add('grid-item');
    item.classList.add('card');
    var height = Math.floor(Math.random() * 400 + 200);
    item.innerHTML = '<img src="http://lorempixel.com/400/' + height + '" />';
    return item;
}
