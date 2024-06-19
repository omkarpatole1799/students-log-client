import { redirect } from 'react-router-dom'

function checkTockenExpired() {
    let storedTockenExpiryDate = localStorage.getItem('tockenExpiry')
    console.log(storedTockenExpiryDate,'==storedTockenExpiryDate==')
    let tockenRemainTime = new Date(storedTockenExpiryDate)
    const now = new Date()
    const timeRemaining = tockenRemainTime.getTime() - now.getTime()
    return timeRemaining < 0 ? false : true
}

export function privateRouteLoader() {
    let tocken = localStorage.getItem('tocken')
    if (!tocken || !checkTockenExpired()) {
        // localStorage.clear()
        // return redirect('/login')
        return true
    } else {
        return null
    }
}
export default privateRouteLoader
