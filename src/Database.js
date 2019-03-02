import Dexie from 'dexie'

const db = new Dexie('habits-tracker')
db.version(1).stores({
  habits: '++id,name,time,reminders,notes,done,steaks,created'
})

export default db
