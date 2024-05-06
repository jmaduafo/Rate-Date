import Pisces from '@/image/zodiac/pisces.png'
import Aries from '@/image/zodiac/aries.png'
import Scorpio from '@/image/zodiac/scorpio.png'
import Sagittarius from '@/image/zodiac/sagittarius.png'
import Leo from '@/image/zodiac/leo.png'
import Libra from '@/image/zodiac/libra.png'
import Aquarius from '@/image/zodiac/aquarius.png'
import Virgo from '@/image/zodiac/virgo.png'
import Cancer from '@/image/zodiac/cancer.png'
import Capricorn from '@/image/zodiac/capricorn.png'
import Gemini from '@/image/zodiac/gemini.png'
import Taurus from '@/image/zodiac/taurus.png'
import NoBirthday from '@/image/zodiac/birthday-cake.png'
import { StaticImageData } from 'next/image'

export function getZodiac(birthday: string ): string {
    let zodiac = '';

    if (birthday) {
        const newBirth = birthday.split('-').slice(1, 2).join('-')
    
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

    }

    return zodiac
}

export function getZodiacImage(zodiac: string): StaticImageData {    

    if (zodiac === 'aries') {
        return Aries
    }
    else if (zodiac === 'taurus') {
        return Taurus
    }
    else if (zodiac === 'gemini') {
        return Gemini
    }
    else if (zodiac === 'cancer') {
        return Cancer
    }
    else if (zodiac === 'leo') {
        return Leo
    }
    else if (zodiac === 'virgo') {
        return Virgo
    }
    else if (zodiac === 'libra') {
        return Libra
    }
    else if (zodiac === 'scorpio') {
        return Scorpio
    }
    else if (zodiac === 'sagittarius') {
        return Sagittarius
    }
    else if (zodiac === 'capricorn') {
        return Capricorn
    }
    else if (zodiac === 'aquarius') {
        return Aquarius
    }
    else if (zodiac === 'pisces') {
        return Pisces
    }
    else {
        return NoBirthday
    }


}