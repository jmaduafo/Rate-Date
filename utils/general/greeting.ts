export function greetings() {
    let timeOfDay;
    
    const date = new Date()
    var hour = date.getHours()

    if (hour >= 0 && hour < 12) {
        timeOfDay = 'morning'
    } else if (hour >= 12 && hour < 17) {
        timeOfDay = 'afternoon'
    } else if (hour >= 17 && hour <= 23) {
        timeOfDay = 'evening'
    }
  
    return timeOfDay
}