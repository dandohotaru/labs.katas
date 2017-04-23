var Builder = (function () {

    function brick(height) {
        var element = document.createElement('div');
        element.classList.add('grid-item');
        element.classList.add('card');
        element.style.height = height + "px";
        element.innerHTML = '<img src="http://lorempixel.com/300/' + height + '" title=' + height + ' />';
        return element;
    };

    function wall(counter) {
        var bricks = [];
        for (var index = 0; index < counter; index++) {
            var height = Math.floor(Math.random() * 300 + 100);
            bricks.push(brick(height));
        }
        return bricks;
    };

    return {
        wall: wall
    }
});