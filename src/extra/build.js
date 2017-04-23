var Builder = (function () {

    function brick(hue, letter) {
        var element = document.createElement('div');
        element.classList.add('grid-item');
        element.classList.add('card');
        element.classList.add('size-' + letter);
        element.style.background = 'hsl(' + hue + ', 90%, 50%)';
        return element;
    }

    function wall(counter) {
        var colors = [30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360];
        var colorIndex = Math.floor(Math.random() * 12);
        var hue = colors[colorIndex];

        var letters = ['a', 'b', 'c'];

        var bricks = [];
        for (var index = 0; index < counter; index++) {
            var letterIndex = Math.floor(Math.random() * 3);
            var letter = letters[letterIndex];
            bricks.push(brick(hue, letter));
        }

        return bricks;
    }

    return {
        wall: wall
    }

});