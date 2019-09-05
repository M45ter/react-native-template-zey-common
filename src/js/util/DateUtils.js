import dayjs from 'dayjs';

export default class DateUtils {

    static format(date, template = 'YYYY-MM-DD') {
        return dayjs(date).format(template);
    }

    static formatM(date) {
        return this.format(date, 'YYYY-MM-DD HH:mm');
    }

    static formatS(date) {
        return this.format(date, 'YYYY-MM-DD HH:mm:ss');
    }
}
