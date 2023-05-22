const express = require('express')
const app = express()
const port = 3000
const crypto = require('crypto')

const USERS = [
    {
        email: "billiejoearmstrong@gmail.com",
        password: "oogabooga",
        is_admin: false
    }
];

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


function generateRandomToken(length) {
    return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
}


app.post('/signup', (req, res) => {
    // Decode body, which should have email and password
    const { email, password } = req.body;

    // Store email and password (as is for now) in the USERS array above (only if the user with the given email doesn't already exist)
    const existingUser = USERS.find(user => user.email === email);
    if (existingUser) {
        return res.status(400).json({ error: 'User already exists. Try logging in instead!' });
    }

    const newUser = { email, password };
    USERS.push(newUser);

    // Return back 200 status code to client
    res.sendStatus(200);
});


app.get('/login', (req, res) => {
    // Decode body, which should have email and password
    const { email, password } = req.body;

    // Check if user with given email and password exist
    const user = USERS.find(user => user.email === email && user.password === password);

    if (!user) {
        // If user does not exist, return a 401 status code to client
        return res.sendStatus(401);
    }

    // If password is correct, return back 200 status code to client
    // Also send back a token (any random string with do for now)
    const token = generateRandomToken(264);
    res.status(200).json({ token });
});


app.get('/questions', (req, res) => {
    // Return the client all the questions in the QUESTIONS array
    res.status(200).json({ questions: QUESTIONS });
});


app.get('/submissions', (req, res) => {
    const userId = req.query.userId; // Assuming the user's ID is provided as a query parameter
    const problemId = req.query.problemId; // Assuming the problem's ID is provided as a query parameter

    // Find the user's submissions for this problem
    const userSubmissions = SUBMISSIONS.filter(submission => submission.userId === userId && submission.problemId === problemId);

    // Return the user's submissions for this problem (empty if invalid user/problem?)
    res.status(200).json({ submissions: userSubmissions });
});


app.post('/submissions', (req, res) => {
    // Let the user submit a problem, randomly accept or reject the solution
    const { userId, problemId, solution } = req.body;

    // Randomly accept or reject the solution
    const isAccepted = Math.random() < 0.5; // Adjust the probability as desired

    // Create a new submission object
    const newSubmission = {
        userId,
        problemId,
        solution,
        isAccepted
    };

    // Store the submission in the SUBMISSIONS array above
    SUBMISSIONS.push(newSubmission);

    // Return the status of the submission to the client
    res.status(200).json({ isAccepted });
});


// TODO:
// Create a route that lets an admin add a new problem
// ensure that only admins can do that


////////////////////////////////////////////////////////////////////////////////

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
