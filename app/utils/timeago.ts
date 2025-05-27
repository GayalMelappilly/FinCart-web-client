import { format } from 'timeago.js'

export const convertTimeago = (timestamp: string) => {
    const timeagoString = format(timestamp)
    return timeagoString
}