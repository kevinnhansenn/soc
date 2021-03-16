import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import bodyParser from 'body-parser'
import cors from 'cors'
import _ from 'lodash'

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
const studentIO = io.of('/student')
const instructorIO = io.of('/instructor')

interface Choice {
    id: string,
    answer: string,
    isAnswer: boolean
}

interface Question {
    id: string,
    question: string,
    choices: Choice[]
}

interface Room {
    id: string,
    host: string,
    participants: string[]
    question?: Question[]
}

const genId = () => Math.floor(Math.random() * 100000).toString()

const activeRooms: Room[] = []

studentIO.on('connection', (socket) => {
    socket.on('REGISTERED', ({ username, room }) => {
        const roomFound = activeRooms.find(activeRoom => activeRoom.id === room)
        if (!roomFound) return socket.disconnect()

        socket.join(room)
        instructorIO.to(room).emit('STUDENT_JOIN', username)

        socket.on('ANSWER_THE_QUESTION', (choice: Choice) => {
            instructorIO.to(room).emit('UPDATE_SCOREBOARD', username, choice)
        })
    })
})

instructorIO.on('connection', (socket) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    socket.on('REGISTERED', ({ username, room }) => {
        const roomFound = activeRooms.find(activeRoom => activeRoom.id === room)
        if (!roomFound) return socket.disconnect()

        socket.join(room)
        socket.on('START_SESSION', (callback) => {
            studentIO.to(room).emit('SESSION_HAS_STARTED')
            callback()
        })

        socket.on('POST_QUESTION', (question, choices, callback) => {
            const questionSet = {
                id: genId(),
                question,
                choices
            }

            roomFound.question.push(questionSet)
            instructorIO.to(room).emit('UPDATE_PROGRESS', roomFound)
            studentIO.to(room).emit('QUESTION_HAS_BEEN_POSTED', questionSet)
            callback()
        })

        socket.on('FINISH_SESSION', (callback) => {
            studentIO.to(room).emit('SESSION_HAS_ENDED')
            callback()
        })
    })
})

app.get('/', (req, res) => {
    res.send('GET REQUEST to backend server should not be allowed')
})

app.post('/studentLogin', (req, res) => {
    const { room, username } = req.body

    const roomFound = activeRooms.find(activeRoom => activeRoom.id === room)

    if (!roomFound) return res.status(400).send('Invalid room number')

    roomFound.participants.push(username)

    res.status(200).send({ room: roomFound })
})

app.post('/instructorLogin', (req, res) => {
    const room = genId()
    const { username, password } = req.body
    if (!username || !password) return res.status(400).send('Invalid Credentials')
    activeRooms.push({
        id: room,
        host: username,
        participants: [],
        question: []
    })
    res.status(200).send({ room })
})

httpServer.listen(port, () => {
    console.log(`App is running on port ${port}`)
})
