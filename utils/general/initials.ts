export function getInitials(name: string) {
    const separate = name.split(' ')

    let initials;

    if (separate.length > 1) {
        // Input: Jazzy Jay; Expected output: JJ
        // Input: jazzy jay; Expected output: jj
        initials = separate[0].slice(0, 1) + separate[1].slice(0, 1)
    } else {
        // Input: Landon; Expected output: La
        // Input: landon; Expected output: la
        initials = separate[0].slice(0, 1) + separate[0].slice(1, 2)
    }

    return initials
}