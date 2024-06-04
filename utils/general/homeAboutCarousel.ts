const about = 'Discover the magic of unexpected connections'


let x = 0

const aboutArray = []

while (x < 30) {
    aboutArray.push(about)
    x++
}

type About = {
    text: string;
    id: number;
}   

export const finalAboutArray : About[] = []

aboutArray.forEach((arr, i) => {
    finalAboutArray.push({ text: arr, id: i})
})


