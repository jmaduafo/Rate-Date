export function isBirthday(birthday: string) {
    const yourBirthday = new Date(birthday)
    const today = new Date()

    const yourDate = yourBirthday.getDate() + yourBirthday.getMonth()
    const date = today.getDate() + today.getMonth()

    if (yourDate === date) {
        return true
    } else {
        return false
    }
}