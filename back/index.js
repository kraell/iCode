const express = require('express')
const app = express()
const port = 3000
const crypto = require('crypto')
const { auth } = require('./middleware');
const JWT_SECRET = "secret";
var jwt = require('jsonwebtoken');
let USER_ID_COUNTER = 1;
const cors = require("cors");
app.use(cors());
app.use(express.json()); // Middleware to parse JSON requests

const USERS = [
    // {
    //     userId: 1,
    //     email: "keegan1@gmail.com",
    //     password: "123pass",
    //     is_admin: false
    // }
];

const PROBLEMS = [
    {
        problemId: 0,
        title: "Two Sum",
        difficulty: "Easy",
        acceptanceRate: 0.422110284,
        description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. \n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice. \n\nYou can return the answer in any order.",
        examples: [
            {
                input: "nums = [0,1,2,3,4], target = 9",
                output: "[0,1]",
                explanation: "Because nums[0] + nums[1] == 9, we return [0,1]."
            },
            {
                input: "nums = [3,2,4], target = 6",
                output: "[1,2]",
                explanation: "Because nums[1] + nums[2] == 6, we return [1,2]."
            },
            {
                input: "nums = [3,3], target = 6",
                output: "[0,1]",
                explanation: "Because nums[0] + nums[1] == 9, we return [0,1]."
            }
        ],
        constraints: [
            "2 <= nums.length <= 10^4",
            "-10^9 <= nums[i] <= 10^9",
            "-10^9 <= target <= 10^9",
            "Only one valid answer exists."
        ],
        hints: [
            "here is a hint",
            "here is another hint"
        ],
        numAcceptedSubmissions: 10,
        numTotalSubmissions: 20,
        dataByLanguage: {
            "js": {
                starterCode: "/**\n * @param {number[]} nums\n * @param {number} target\n * @return"
            },
            "py": {
                starterCode: "beep boop i am python code"
            },
            "cpp": {
                starterCode: "✦ ⑨ ✹ ❻ ◻ ◻ ⇨ 🖫 ◻ ♓ ★ 📬"
            }
        }
    },
    {
        problemId: 1,
        title: "title1",
        difficulty: "Medium",
        acceptanceRate: 0.322110284,
        description: "In this example you have to blah blah blah",
        examples: [
            {
                input: "[ 0, 1, 2, 3, 4 ]",
                output: "4",
                explanation: "As you can see, this is arbitrary because I'm making it up so i can use this as an exercise"
            },
            {
                input: "[ 'x', 'y', 'z' ]",
                output: "null",
                explanation: "As you can see, this is arbitrary because I'm making it up so i can use this as an exercise"
            }
        ],
        constraints: [
            "here is constraint #1: 1 <= n < 2",
            "another constraint here=D"
        ],
        hints: [
            "here is a hint",
            "here is another hint"
        ],
        numAcceptedSubmissions: 10,
        numTotalSubmissions: 20,
        dataByLanguage: {}
    },
    {
        problemId: 2,
        title: "title2",
        difficulty: "Hard",
        acceptanceRate: 0.122110284,
        description: "In this example you have to blah blah blah",
        examples: [
            {
                input: "[ 0, 1, 2, 3, 4 ]",
                output: "4",
                explanation: "As you can see, this is arbitrary because I'm making it up so i can use this as an exercise"
            },
            {
                input: "[ 'x', 'y', 'z' ]",
                output: "null",
                explanation: "As you can see, this is arbitrary because I'm making it up so i can use this as an exercise"
            }
        ],
        constraints: [
            "here is constraint #1: 1 <= n < 2",
            "another constraint here=D"
        ],
        hints: [
            "here is a hint",
            "here is another hint"
        ],
        numAcceptedSubmissions: 10,
        numTotalSubmissions: 20,
        dataByLanguage: {}
    }
];

const SUBMISSIONS = [

];


function generateRandomToken(length) {
    return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
}


// Basic health check endpoint. Does nothing.
app.get('/', (req, res) => {
    res.json({
        msg: "hello world"
    })
})


// Unauthenticated endpoint, open to world.
app.get('/problems', (req, res) => {
    // Return the client all the questions in the PROBLEMS array
    // NOTE: Only need certain data for problems list
    const filteredProblems = PROBLEMS.map(p => ({
        problemproblemId: p.problemId,
        title: p.title,
        difficulty: p.difficulty,
        acceptanceRate: p.acceptanceRate,
    }));

    res.json({
        problems: filteredProblems
    })
});


// Return all data on problem with the given ID
app.get('/problems/:id', (req, res) => {
    const id = req.params.id;
    const problem = PROBLEMS.find(p => p.problemId == id);
    if (!problem) {
        return res.status(411).json({});
    }
    res.json({
        problem
    })
});


app.get('/me', auth, (req, res) => {
    const user = USERS.find(u => u.userId == req.userId);
     // Don't want to return password in plaintext
    const { password, ...user_without_password } = user;
    res.json({
        user: user_without_password
    })
})


app.post('/signup', (req, res) => {
    // Decode body, which should have email and password
    console.log('[/signup] req.body =', req.body)
    const email = req.body.email;
    const password = req.body.password;
    if (USERS.find(u => u.email === email)) {
        return res.status(403).json({
            msg: "Email already registered"
        });
    }

    USERS.push({
        email, password, userId: USER_ID_COUNTER++
    });

    return res.json({
        msg: "Success"
    });
});


app.get('/login', (req, res) => {
    // Decode body, which should have email and password
    console.log('[/login] req.body =', req.body)
    const email = req.body.email;
    const password = req.body.password;

    // Check if user with given email and password exist
    const user = USERS.find(user => user.email === email);

    if (!user) {
        // If user does not exist, return a 401 status code to client
        return res.status(403).json({
            msg: "User not found"
        });
    }

    if (user.password !== password) {
        return res.status(403).json({
            msg: "Incorrect password"
        });
    }

    // If password is correct, return back 200 status code to client
    // Also send back a token (any random string with do for now)
    // const token = generateRandomToken(264);
    const token = jwt.sign({
        id: user.id
    }, JWT_SECRET);
    
    return res.json({ token });
});


app.get('/submissions/:problemId', auth, (req, res) => {
    console.log('[/submissions/:problemId] req.body =', req.body);
    const userId = req.userId; // Provided by auth middleware
    const problemId = req.params.problemId; // Assuming the problem's ID is provided as a query parameter
    const submissions = SUBMISSIONS.filter(s => s.problemId === problemId && s.userId === req.userId);

    console.log('[/submissions/:problemId] req.userId =', req.userId);
    console.log('[/submissions/:problemId] req.query.problemId =', req.query.problemId);

    // Error check
    // This is somewhat intensive so only do it if submissions comes up empty
    if (!submissions.length) {
        const users = USERS.filter(u => u.userId === userId);
        if (!users.length) {
            return res.status(501).json({ 
                msg: "Error: Invalid userId in request: " + userId
            });
        }
        const problems = PROBLEMS.filter(p => p.problemId === problemId);
        if (!problems.length) {
            return res.status(403).json({ 
                msg: "Error: user does not have any submissions for this problem!"
            });
        }
    }

    // Return the user's submissions for this problem (empty if invalid user/problem?)
    res.json({ 
        submissions: submissions 
    });
});


app.post('/submissions', auth, (req, res) => {
    // Let the user submit a problem, randomly accept or reject the solution
    const isCorrect = Math.random() < 0.5;
    const problemId = req.body.problemId;
    const submission = req.body.submission;

    const newSubmission = {
        submission,
        problemId,
        userId: req.userId,
        // status: "REJ"
    };
    if (isCorrect) {
        newSubmission.status = "ACC";
    } else {
        newSubmission.status = "REJ";
    }

    // Store the submission in the SUBMISSIONS array above
    SUBMISSIONS.push(newSubmission);

    // Return the status of the submission to the client
    return res.json({ 
        status: newSubmission.status
    });
});


// TODO:
// Create a route that lets an admin add a new problem
// ensure that only admins can do that


////////////////////////////////////////////////////////////////////////////////

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
