import mysql2 from 'mysql2/promise'
const CONNECTION_STRING = {
  host: 'localhost',
  user: 'root',
  port: '3306',
  password: '123456',
  database: 'tikedDb'
}

let db

try {
  db = await mysql2.createConnection(CONNECTION_STRING)
  console.log('conectado con exito')
} catch (error) {
  console.log('no se pudo conectar')
}

export default db
