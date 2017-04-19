var Loader = (function () {

    function brick(height) {
        var element = document.createElement('div');
        element.classList.add('grid-item');
        element.classList.add('card');
        element.innerHTML = '<img src="http://lorempixel.com/400/' + height + '" />';
        return element;
    };

    function build(counter) {
        var bricks = [];
        for (var index = 0; index < counter; index++) {
            var height = Math.floor(Math.random() * 400 + 200);
            bricks.push(brick(height));
            console.log(height);
        }
        return bricks;
    };

    return {
        build: build,
    }
});