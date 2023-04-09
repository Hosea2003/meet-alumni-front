export function dateDiff(date:Date){
    const today = new Date()
    const diff = today.getTime()-date.getTime()

    const second = Math.floor(diff / 1000)
    if(second <10)return "Now"
    if(second <60)return second+"sec"
    const min = Math.floor(second / 60)
    if(min < 60)return min +"min"
    const hour = Math.floor(min/60)
    if(hour < 24)return hour+"h"
    const day = Math.floor(hour/24)
    if(day<7)return day+"day"
    const week = Math.floor(day/7)
    if(week<52)return week+"w"
    const year = Math.floor(day/365)
    return year+"y"
}