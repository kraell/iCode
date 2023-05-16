const express = require('express')
const app = express()
const port = 3000

const USERS = [];

const QUESTIONS = [
    {
        title: "Two States",
        description: "Given an arra, return the maximum of the array.",
        testCases: [
            {
                input: "[1,2,3,4,5]",
                output: "5"
            }
        ]

    }
];

const SUBMISSIONS = [

]


app.post('/signup', (req, res) => {
    // Add logic to decode body, which should have email and password

    // Store email and password (as is for now) in in the USERS array above (only if the user with the given email doesn't exist)

    // Return back 200 status code to client
    res.send('Hello World from signup!')
})


app.get('/login', (req, res) => {
    // Add logic to decode body, which should have email and password

    // Check if user with given email exists in USERS array
    // Also ensure that password is same

    // If password is same, return back 200 status code to client
    // Also send back a token (any random string with do for now)
    // If the password is not the same, return back 401 status code to client
  res.json({
    name: 'Harriet',
    age: 29
  })
})


app.get('/questions', (req, res) => {
    // return the client all the questions in the QUESTIONS array
  res.send(`
  <html>
  <body>
    <h1 style="color:red">
        Chat
    </h1>
  </body>
  </html>
  `)
})


app.get('/submissions', (req, res) => {
    // return the user's submissions for this problem
    res.send('Hello World from submissions!')
})


app.post("/submissions", (req, res) => {
    // let the user submit a problem, randomly accept or reject the solution
    // Store the submission in the SUBMISSION array
})


// TODO:
// Create a route that lets an admin add a new problem
// ensure that only admins can do that



////////////////////////////////////////////////////////////////////////////////

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
