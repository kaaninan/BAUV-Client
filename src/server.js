const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const history = require('connect-history-api-fallback')

const app = express()

app.use(bodyParser.json())

app.get('/api', (req, res) => res.send('Hello World!'))
app.use(
	history({
		verbose: true
	})
)
app.use('/', express.static(path.join(__dirname, '../dist')))
console.log(path.join(__dirname, '../dist'))

var port = process.env.PORT || 5050
app.listen(port)
console.log('Server Started: http://localhost:' + port)
