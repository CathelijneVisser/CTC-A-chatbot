//import express en .env
import express from "express"
import dotenv from 'dotenv'

//activeer .env
dotenv.config()

//maak een nieuwe express app
const server = express()

//views en public instellen
server.use(express.static("public"))
server.set("view engine", "ejs")
server.set("views", "./views")

//stel afhandeling van formulieren in
server.use(express.json())
server.use(express.urlencoded({ extended: true }))

//routes 

//index - get

server.get("/", (request, response) => {
    let urlSmartzones = `${process.env.API_URL}/smartzones`
  fetchJson(urlSmartzones).then((data) => {
    response.render("index", {smartzones: data.smartzones})
    })
  })

//book - get

server.get("/book", (request, response) => {
  let urlSmartzones = `${process.env.API_URL}/smartzones`
  fetchJson(urlSmartzones).then((smartzones) => {
    let id = request.query.id
    let url = `${process.env.API_URL}/reservations?id=${id}`
    let time = request.query.time
    fetchJson(url).then((reservations) => {
      let data = {smartzones: smartzones, reservations: reservations}
      response.render("book", {smartzones: data.smartzones.smartzones, selectedSmartzoneId: id, time: time})
    })
  })
})

//book - post

server.post('/book', (request, response) => {
  const url = `${process.env.API_URL}/reservations`
  request.body.timeStart = request.body.dateStart + 'T' + request.body.timeStart + ':00Z';
  request.body.timeEnd = request.body.dateEnd + 'T' + request.body.timeEnd + ':00Z';

  postJson(url, request.body).then((data) => {
    let newReservation = { ... request.body }

    if (data.data.id.length > 0) {
      response.redirect('/book?reservationPosted=true') 
    } else {
      const errorMessage = data.message + "Some fields are not filled in (correctly)."
      const newData = { error: errorMessage, values: newReservation }
      
      let urlSmartzones = `${process.env.API_URL}/smartzones`
        fetchJson(urlSmartzones).then((smartzones) => {
          let id = request.query.id
          let time = request.query.time
          let url = `${process.env.API_URL}/reservations?id=${id}`
          fetchJson(url).then((reservations) => {
            let data = {smartzones: smartzones, reservations: reservations, newData}
            response.render("book", {smartzones: data.smartzones.smartzones, selectedSmartzoneId: id, time: time})
          })
        })
    }
  })
})


//poortnummer instellen
server.set("port", 8000)

//start de server
server.listen(server.get("port"), () => {
  console.log(`Application started on http://localhost:${server.get("port")}`)
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

/**
 * postJson() is a wrapper for the experimental node fetch api. It fetches the url
 * passed as a parameter using the POST method and the value from the body paramater
 * as a payload. It returns the response body parsed through json.
 * @param {*} url the api endpoint to address
 * @param {*} body the payload to send along
 * @returns the json response from the api endpoint
 */
export async function postJson(url, body) {
  return await fetch(url, {
    method: "post",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .catch((error) => error)
}