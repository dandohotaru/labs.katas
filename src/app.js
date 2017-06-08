import css from './styles.css';
import _ from 'lodash';

var runWithLodash = function () {
    var array = [1];
    var other = _.concat(array, 2, [3], [[4]]);

    console.log(other);
}

var runWithLambda = function () {
    var array = [1];
    var other = array.concat([2, 3, [4]])
    console.log(other);
}

runWithLodash();
runWithLambda();
