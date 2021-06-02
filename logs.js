var log = wx.getRealtimeLogManager ? wx.getRealtimeLogManager() : null

export function info() {
  if (!log)
    return
  log.info.apply(log, arguments)
}
export function warn() {
  if (!log)
    return
  log.warn.apply(log, arguments)
}
export function error() {
  if (!log)
    return
  log.error.apply(log, arguments)
}
export function setFilterMsg(msg) {
  if (!log || !log.setFilterMsg)
    return
  if (typeof msg !== 'string')
    return
  log.setFilterMsg(msg)
}
export function addFilterMsg(msg) {
  if (!log || !log.addFilterMsg)
    return
  if (typeof msg !== 'string')
    return
  log.addFilterMsg(msg)
}