
import * as moment from 'moment';

export function hello(compiler: string): string {
    var time = moment().format();
    console.log(time);
    return `Hello there ${compiler} (${time})`;
}


