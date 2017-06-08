import moment from 'moment';

export function hello(compiler) {
    var time = moment().format();
    console.log(time);
    return `Hello there ${compiler} (${time})`;
}