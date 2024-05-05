import moment from 'moment'

export function futureTimeFromNow(endDate: Date) {
    var now = moment(new Date());
    var end = moment(endDate)
    var duration = moment.duration(now.diff(end));
    var days = duration.asDays();

    return days
}