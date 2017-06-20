const express = require('express')
const bodyParser = require('body-parser')
const userCtrl = require('./userCtrl')

const port = 3000;
const app = express()

app.use(bodyParser.json())

//get requests
app.get('/api/users', userCtrl.getUsers)
app.get('/api/users/:id', userCtrl.getUserById)
app.get('/api/admins', userCtrl.getAdmins)
app.get('/api/nonadmins', userCtrl.getNonAdmins)
app.get('/api/user_type/:type', userCtrl.getUsersByType)

//put requests
app.put('/api/users/:id', userCtrl.updateUserById)

//post requests
app.post('/api/users', userCtrl.addUser)

//delete requests
app.delete('/api/users/:id', userCtrl.deleteUserById)

app.listen(port, function() {
	console.log('Listening on port',port)
})