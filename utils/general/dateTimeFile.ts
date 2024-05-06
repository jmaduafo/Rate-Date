import moment from 'moment'

const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
]

const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
]

export function futureTimeFromNow(endDate: Date) {
    var now = moment(new Date());
    var end = moment(endDate)
    var duration = moment.duration(now.diff(end));
    var days = duration.asDays();

    return days
}

export function scheduleFormat(sch: Date) {
    const date = new Date(sch)
    const scheduleDate = months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear()

    let minutes;

    if (date.getMinutes() < 10) {
        minutes = '0' + date.getMinutes()
    } else {
        minutes = date.getMinutes()
    }
    const scheduleTime = date.getHours() + ':' + minutes

    return scheduleDate + ' ' + scheduleTime
}

export function chartCount(sch: Date) {
    const date = new Date(sch)
    const thisDay = new Date()

    const year = date.getFullYear()
    const thisYear = thisDay.getFullYear()
    
    const month  = months[date.getMonth()]


    return 
}