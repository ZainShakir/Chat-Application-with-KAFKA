const {Client} = require('pg')

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "12345",
    database: "Chat_app"
})

module.exports = client