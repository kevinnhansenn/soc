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
    const { username, room } = socket.handshake.query
    const roomFound = activeRooms.filter(activeRoom => activeRoom.id === room)
    if (!roomFound.length) return socket.disconnect()
    socket.join(room)

    // Add student to the room
    const _room:Room = roomFound[0]
    _room.participants.push(username)

    socket.on('ANSWER_THE_QUESTION', (questionId, answerId) => {
        const _question = _.find(_room.question, (question) => question.id === questionId)
        const correctAnswer = _.find(_question.choices, (choice) => choice.id === answerId)

        const response = {
            room,
            student: username,
            questionId,
            answerId,
            result: 0
        }

        if (correctAnswer.isAnswer) {
            response.result = 1
        } else {
            response.result = -1
        }

        studentIO.to(room).emit('UPDATE_SCOREBOARD', response)
        instructorIO.to(room).emit('UPDATE_SCOREBOARD', response)
    })
})

instructorIO.on('connection', (socket) => {
    console.log('Connection Established Yay')
    // CREATE_ROOM
    const { username, room } = socket.handshake.query
    socket.join(room)

    const _room: Room = {
        id: room,
        host: username,
        participants: [],
        question: []
    }

    activeRooms.push(_room)

    socket.on('START_SESSION', (callback) => {
        studentIO.to(room).emit('SESSION_HAS_STARTED')
        callback()
    })

    socket.on('POST_QUESTION', (question, callback) => {
        _room.question.push(question)
        studentIO.to(room).emit('QUESTION_HAS_BEEN_POSTED', question)
        callback()
    })

    socket.on('FINISH_SESSION', (callback) => {
        _.filter(activeRooms, activeRoom => activeRoom.id !== room)
        studentIO.to(room).emit('SESSION_HAS_ENDED')
        callback()
    })
})

app.get('/', (req, res) => {
    res.send('GET REQUEST to backend server should not be allowed')
})

app.post('studentLogin', (req, res) => {
    const { room } = req.body

    const roomFound = activeRooms.filter(activeRoom => activeRoom.id === room)

    if (!roomFound.length) return res.status(400).send('Invalid room number')

    res.status(200).send({ room: roomFound })
})

app.post('/instructorLogin', (req, res) => {
    const room = genId()
    const { username, password } = req.body
    if (!username || !password) return res.status(400).send('Invalid Credentials')
    activeRooms.push({
        id: room,
        host: username,
        participants: []
    })
    res.status(200).send({ room })
})

httpServer.listen(port, () => {
    console.log(`App is running on port ${port}`)
})
