const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const app = express()

// // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

//  parse application/json
app.use(bodyParser.json())

const PORT = 8080
const HTTP_OK = 200
const CONTENT_TYPE_JSON = 'application/json'
const FILE_NAME = 'result.json'
app.post('/config', function (request, response) {
    const data = request.body
    const datasFromForm = JSON.stringify(data, null, 4)
    fs.writeFileSync(FILE_NAME, datasFromForm)
})
app.get('/', function (request, response) {
    response.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON })
    response.end(fs.readFile(FILE_NAME))
})
app.listen(PORT, function () {
    console.log('Server listening on: http://localhost:%s', PORT)
})
