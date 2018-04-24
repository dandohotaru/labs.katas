var Builder = (function () {

    function brick(color, letter) {
        var element = document.createElement('div');
        element.classList.add('grid-item');
        element.classList.add('card');
        element.classList.add('size-' + letter);
        element.style.background = color;
        return element;
    }

    function wall(counter) {
        var bricks = [];

        var colors = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360];
        var colorIndex = Math.floor(Math.random() * colors.length);
        var hue = colors[colorIndex];
        var saturation = "66%";
        var lightness = "50%";
        var color = 'hsl(' + hue + ', ' + saturation + ', ' + lightness + ')';

        for (var index = 0; index < counter; index++) {
            var letters = ['a', 'b', 'c'];
            var letterIndex = Math.floor(Math.random() * letters.length);
            var letter = letters[letterIndex];

            bricks.push(brick(color, letter));
        }

        return bricks;
    }

    return {
        wall: wall
    }

});