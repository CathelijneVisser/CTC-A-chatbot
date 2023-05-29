import * as path from 'path'

import { Server } from 'socket.io'
import { createServer, request } from 'http'
import express, { response } from 'express'
import dotenv from 'dotenv'
import { Configuration, OpenAIApi } from 'openai'

dotenv.config()

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)


const server = express()
const http = createServer(server)
const ioServer = new Server(http, {
  connectionStateRecovery: {
    maxDisconnectionDuration: 2 * 60 * 1000,
    skipMiddlewares: true,
  },
})



//views en public instellen
server.use(express.static(path.resolve('public')))
server.set('view engine', 'ejs')
server.set('views', './views')

//stel afhandeling van formulieren in
server.use(express.json())
server.use(express.urlencoded({ extended: true }))

//routes 

//index - get

server.get('/', (request, response) => {
  let urlSmartzones = `${process.env.API_URL}/smartzones`
  let pageTitle = "Smartzone's"
  fetchJson(urlSmartzones).then((data) => {
    response.render('index', { smartzones: data.smartzones, pageTitle: pageTitle })
  })
})

//manage - get

server.get('/manage', (request, response) => {
  let urlSmartzones = `${process.env.API_URL}/smartzones`
  let pageTitle = "Manage"
  fetchJson(urlSmartzones).then((data) => {
    response.render('manage', { smartzones: data.smartzones, pageTitle: pageTitle })
  })
})

//book - get

server.get('/book', (request, response) => {
  let urlSmartzones = `${process.env.API_URL}/smartzones`
  fetchJson(urlSmartzones).then((smartzones) => {
    let pageTitle = "Reserve"
    let id = request.query.id
    let url = `${process.env.API_URL}/reservations?id=${id}`
    let time = request.query.time
    fetchJson(url).then((reservations) => {
      let data = { smartzones: smartzones, reservations: reservations }
      response.render('book', { smartzones: data.smartzones.smartzones, selectedSmartzoneId: id, time: time, pageTitle: pageTitle })
    })
  })
})

//book - post

server.post('/book', (request, response) => {
  const url = `${process.env.API_URL}/reservations`
  request.body.timeStart = request.body.dateStart + 'T' + request.body.timeStart + ':00Z';
  request.body.timeEnd = request.body.dateEnd + 'T' + request.body.timeEnd + ':00Z';

  postJson(url, request.body).then((data) => {
    let newReservation = { ...request.body }

    if (data.data.id.length > 0) {
      response.redirect('/book?reservationPosted=true')
    } else {
      const errorMessage = data.message + 'Some fields are not filled in (correctly).'
      const newData = { error: errorMessage, values: newReservation }

      let urlSmartzones = `${process.env.API_URL}/smartzones`
      fetchJson(urlSmartzones).then((smartzones) => {
        let id = request.query.id
        let time = request.query.time
        let url = `${process.env.API_URL}/reservations?id=${id}`
        fetchJson(url).then((reservations) => {
          let data = { smartzones: smartzones, reservations: reservations, newData }
          response.render('book', { smartzones: data.smartzones.smartzones, selectedSmartzoneId: id, time: time })
        })
      })
    }
  })
})


//Chatbot
let conversationHistory = []
const historySize = 20

ioServer.on('connection', (client) => { //als er connectie gemaakt word
  console.log(`user ${client.id} connected`)
  client.emit('history', conversationHistory)  //history ophalen
  client.on('message', async (message, callback) => { //als er iets binnenkomt
    try {
      while (conversationHistory.length > historySize) {   //als history vol zit
        conversationHistory.shift()  //history legen
      }
      conversationHistory.push({ role: 'user', content: message })  //zet binnenkoment message in history
      const completion = await openai.createChatCompletion({   //ai aanroepen
        model: 'gpt-3.5-turbo',
        messages: conversationHistory,  //history aan ai vragen
      })
      const response = completion.data.choices[0].message.content //ai data meegeven aan response
      conversationHistory.push({ role: 'assistant', content: response })  //ai response naar history
      console.log(response)
      client.emit('message', response)  //ai message naar client sturen
      callback()
    } catch (error) { //als er een error is
      console.error(error.response.data)
      callback('Error: Unable to connect to the chatbot') //error naar client sturen
    }
  })

  client.on('disconnect', () => {
    console.log(`user ${client.id} disconnected`)
  })
})





//poortnummer instellen
server.set('port', process.env.PORT || 8000)

//start de server
http.listen(server.get('port'), '0.0.0.0', () => {
  console.log(`Application started on http://localhost:${server.get('port')}`)
})

/**
 * Wraps the fetch api and returns the response body parsed through json
 * @param {*} url the api endpoint to address
 * @returns the json response from the api endpoint
 */
async function fetchJson(url) {
  return await fetch(url)
    .then((response) => response.json())
    .catch((error) => error)
}


export async function postJson(url, body) {
  return await fetch(url, {
    method: 'post',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => response.json())
    .catch((error) => error)
}