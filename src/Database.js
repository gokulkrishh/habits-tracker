import Dexie from 'dexie'
import 'dexie-observable'

const db = new Dexie('habits')
db.version(1).stores({
  habits: '++id,name,time,reminders,notes,done,steaks,created,deleted'
})

export default db
