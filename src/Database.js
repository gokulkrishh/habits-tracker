import Dexie from 'dexie'

const db = new Dexie('habits')
db.version(1).stores({
  habits: '++id,name,time,reminders,notes,done,streak,created,isDeleted'
})

export default db
