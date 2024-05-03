export function getZodiac(birthday: string) {
    const newBirth = birthday.split('-').slice(0, 2).join('-')

    let zodiac;

    if (newBirth >= '03-21' && newBirth <= '04-19') {
        zodiac = 'aries'
    }
    else if (newBirth >= '04-20' && newBirth <= '05-20') {
        zodiac = 'taurus'
    }
    else if (newBirth >= '05-21' && newBirth <= '06-20') {
        zodiac = 'gemini'
    }
    else if (newBirth >= '06-21' && newBirth <= '07-22') {
        zodiac = 'cancer'
    }
    else if (newBirth >= '07-23' && newBirth <= '08-22') {
        zodiac = 'leo'
    }
    else if (newBirth >= '08-23' && newBirth <= '09-22') {
        zodiac = 'virgo'
    }
    else if (newBirth >= '09-23' && newBirth <= '10-22') {
        zodiac = 'libra'
    }
    else if (newBirth >= '10-23' && newBirth <= '11-21') {
        zodiac = 'scorpio'
    }
    else if (newBirth >= '11-22' && newBirth <= '12-21') {
        zodiac = 'sagittarius'
    }
    else if (newBirth >= '12-22' && newBirth <= '01-19') {
        zodiac = 'capricorn'
    }
    else if (newBirth >= '01-20' && newBirth <= '02-18') {
        zodiac = 'aquarius'
    }
    else if (newBirth >= '02-19' && newBirth <= '03-20') {
        zodiac = 'pisces'
    }

    return zodiac
}

export function getZodiacImage(zodiac: string) {    

    if (zodiac === 'aries') {
        zodiac = 'aries'
    }
    else if (zodiac === 'taurus') {
        zodiac = 'taurus'
    }
    else if (zodiac === 'gemini') {
        zodiac = 'gemini'
    }
    else if (zodiac === 'cancer') {
        zodiac = 'cancer'
    }
    else if (zodiac === 'leo') {
        zodiac = 'leo'
    }
    else if (zodiac === 'virgo') {
        zodiac = 'virgo'
    }
    else if (zodiac === 'libra') {
        zodiac = 'libra'
    }
    else if (zodiac === 'scorpio') {
        zodiac = 'scorpio'
    }
    else if (zodiac === 'sagittarius') {
        zodiac = 'sagittarius'
    }
    else if (zodiac === 'capricorn') {
        zodiac = 'capricorn'
    }
    else if (zodiac === 'aquarius') {
        zodiac = 'aquarius'
    }
    else if (zodiac === 'pisces') {
        zodiac = 'pisces'
    }

    return zodiac


}