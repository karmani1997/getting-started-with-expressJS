const express = require('express')
const app = express()
const port = 3000

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

let users = [{
    id: 1,
    name: 'Mehtab',}, 
    {
    id: 2,
    name: 'Maqi',}, 
    {
    id: 3,
    name: 'Hamza'}, 
    {
    id: 4,
    name: 'Hanan'}]

app.get('/',(req, res) =>{
    res.send('Hello World!')
})


app.get('/users', (req, res) => {
    res.send( users)
})

app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    console.log({id})
    const user = users.find((user) => user.id==id);
    console.log(user)
    res.send(user);
})

app.post('/users', (req, res) => {

    const user = req.body
    console.log(user)
    users.push(user)
    res.send(users)
})


app.delete('/users/:id', (req, res) => {
    const id = req.params.id
    users = users.filter(user => user.id != id)
    res.send(users)
})

app.listen(port, () => {
    console.log(`app is listening on port ${port}`)
})