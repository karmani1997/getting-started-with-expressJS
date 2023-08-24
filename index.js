const express = require('express')
const app = express()
const port = 3000
process.env.NODE_ENV='production'

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

const requestLoggingMiddleware = (req, res, next) => {

    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    console.log('Request Headers:', req.headers);
    console.log('Request Body:', req.body);
    next();
};


const responseLoggingMiddleware = (req, res, next) => {
    const originalSend = res.send;
    res.send = function(data) {
      console.log('Response Body:', data);
      originalSend.call(this, data);
    };
    next();
  };

// Middleware function
// const errorMiddleware = (err,req, res, next) => {
//     try {
//       // Some logic that might throw an error
//       //const value = someFunctionThatDoesNotExist(); // This will throw an error
//       console.log('Value***********:', err);
      
//       next(); // Move to the next middleware/route handler
//     } catch (error) {
//       console.error('An error occurred:', error.message);
//       res.status(500).send('Internal Server Error');
//     }
//   };
function errorHandler(err, req, res, next) {
    console.error('An error occurred:', err);
  
    // Set the response status to 500 Internal Server Error
    res.status(500);
  
    // Return a JSON error response
    res.json({
      error: {
        message: err.message || 'An error occurred',
        stack: process.env.NODE_ENV === 'production' ? 'Error details are not available in production.' : err.stack
      }
    });
  }

app.use(requestLoggingMiddleware); 
app.use(responseLoggingMiddleware); 


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
    //console.log({id})
    const user = users.find((user) => user.id==id);
    //console.log(user)
    res.send(user);
})

app.get('/error', (req, res) => {
    //res.send("Error in backend")
    throw new Error('An internal error occured')
})

app.post('/users', (req, res) => {

    const user = req.body
    // console.log(user)
    users.push(user)
    res.send(users)
})


app.delete('/users/:id', (req, res) => {
    const id = req.params.id
    users = users.filter(user => user.id != id)
    res.send(users)
})

app.use(errorHandler);



app.listen(port, () => {
    console.log(`app is listening on port ${port}`)
})