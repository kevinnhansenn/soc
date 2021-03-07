import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express()

app.use(bodyParser.json())
app.use(cors())

const port = 3001
const httpServer = http.createServer(app)
const options = {
    cors: {
        origin: 'http://localhost:3000'
    }
}
const io = new Server(httpServer, options)

io.of('/student').on('connection', (socket) => {
    console.log(`Student connection has been established: ${socket.id}`)

    /*
        TIMELINE:

        [CLIENT - INSTRUCTOR] emit CREATE_ROOM
        [SERVER - INSTRUCTOR] intercept CREATE_ROOM -> return status

        [CLIENT - STUDENT] emit JOIN_ROOM
        [SERVER - STUDENT] intercept JOIN_ROOM -> Check room exist -> return status

        [SERVER - STUDENT] emit INFORM_INSTRUCTOR
        [CLIENT - INSTRUCTOR] intercept STUDENT_JOIN_ROOM -> Update view

        List of events to intercept:
            - JOIN_ROOM
                - REQ: room_name
                - RES: status
             -

         List of events to emit:
             -
     */

    socket.on('JOIN_ROOM', (room) => {
        socket.join(room)
    })
})

io.of('/instructor').on('connection', (socket) => {
    console.log(`Instructor connection has been established: ${socket.id}`)

    /*
        List of events to intercept:
             - STUDENT_JOIN_ROOM
                - RES: Student Name

         List of events to emit:
             - CREATE_ROOM
                - REQ: room_name
                - RES: status
             - PUBLISH_QUESTION
                -
     */
})

app.get('/', (req, res) => {
    res.send('GET REQUEST to backend server should not be allowed')
})

app.post('/instructorLogin', (req, res) => {
    const room = Math.floor(Math.random() * 100000)
    const { username, password } = req.body
    if (!username || !password) return res.status(400).send('Invalid Credentials')

    res.status(200).send({ room })
})

httpServer.listen(port, () => {
    console.log(`App is running on port ${port}`)
})
