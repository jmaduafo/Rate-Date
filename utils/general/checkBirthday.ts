export function isBirthday(birthday: string) {
    const yourBirthday = new Date(birthday)
    const today = new Date()

    const yourDate = yourBirthday.getDate().toString() + yourBirthday.getMonth().toString()
    const date = today.getDate().toString() + today.getMonth().toString()

    if (yourDate === date) {
        return true
    } else {
        return false
    }
}