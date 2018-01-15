'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')

const app = express()

app.set('port', (process.env.PORT || 5000))

//Allows us to process data
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//ROUTES

app.get('/', function(req, res) {
	res.send("Hi I am an ANGERY chatbot") 
})

let token = "EAACBwhJzaosBADZCcOuviGj5iMf0Nj1ejqfUrNZCKONUu6jM50OM1uKvo6A6hgwqLIU4VCXXgGfCmSKMZAJYbZC6bOfCNRbZASogE22Ox6dlU6Jt4AZCGhi2E0IUdatE5fu0GcLYbP9BCevfRdfaLvIZC6sj02CRALSPbHnSIEQpgZDZD"

//Facebook

app.get('/webhook/', function(req, res) {
	if (req.query['hub.verify_token'] == "brianhe12") {
		res.send(req.query['hub.challenge'])
	}
	res.send("Wrong token")
})

app.post('/webhook/', function(req, res) {
	let messaging_events = req.body.entry[0].messaging_events
	for (let i = 0; i < messaging_events.length; i++){
		let event = messaging_events[i]
		let sender = event.sender.id
		if (event.message && event.message.text){
			let text = event.message.text
			sendText(sender, "Text echo: " + text.substring(0,100))
		}
	}
	res.sendStatus(200)
})

//Sends text message
function sendText(sender, text){
	let messageData = {text: text}
	request({
		url: "https://graph.facebook.com/v2.6/me/messages"
		qs : {access_token, token}
		method: "POST",
		json: {
			receipt: {id: sender},
			message: messageData,
		}
	}, function(error, response, body){
		if(error){
			console.log("sending error")
			else if (response.body.error) {
				console.log("response body error")
			}
		}
	}
	})
}

app.listen(app.get('port'), function() {
	console.log("running: port")
})
