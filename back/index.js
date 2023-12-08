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
app.use(express.json());

const USERS = [
    // {
    //     userId: 1,
    //     email: "keegan1@gmail.com",
    //     password: "123pass",
    //     is_admin: true
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
    },
    {
        problemId: 3,
        title: "title3",
        difficulty: "Easy",
        acceptanceRate: 0.422110284,
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
        problemId: 4,
        title: "title4",
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
        problemId: 5,
        title: "title5",
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
    // {
    //     time: 12412.312,
    //     userId: 1,
    //     problemId: 0,
    //     language: "py",
    //     code: "yeet this code is perfect",
    //     status: "REJ",
    // },
    // {
    //     time: 12444.23122,
    //     userId: 1,
    //     problemId: 0,
    //     language: "py",
    //     code: "do re mi python code 4ever except nope, this is wrong",
    //     status: "ACC",
    // },
];


function generateRandomToken(length) {
    return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
}

function sanitizeTitleForURL(title) {
    if (!title) {
        return ""
    }
    // Replace spaces with hyphens and convert to lowercase
    // SYKE: do not capitalize words until we figure out some way to know which
    // ones were NOT capitalized in the original title
    // print("title given for URL:", title.replace(/\s+/g, '-').toLowerCase()) // TODO: figure out why this line in particular causes the print dialog prompt to show up in Chrome
    return title.replace(/\s+/g, '-');//.toLowerCase();
}

function desanitizeTitleFromURL(title) {
    // Replace hyphens with spaces and capitalize words
    // SYKE: do not capitalize words until we figure out some way to know which
    // ones were NOT capitalized in the original title
    return title.replace(/-/g, ' ');//.replace(/\b\w/g, word => word.toUpperCase());
}


// Basic health check endpoint. Does nothing.
app.get('/', (req, res) => {
    res.json({
        msg: "hello world"
    })
})


// Unauthenticated endpoint, open to world.
app.get('/problemset/all', (req, res) => {
    console.log('[/problemset/all]');
    // Return the client all the questions in the PROBLEMS array
    // NOTE: Only need certain data for problems list
    const filteredProblems = PROBLEMS.map(p => ({
        problemId: p.problemId,
        title: p.title,
        difficulty: p.difficulty,
        acceptanceRate: p.acceptanceRate,
    }));

    res.json({
        problems: filteredProblems
    })
});


// Return all data on problem with the given slug
app.get('/problems/:problemSlug', (req, res) => {
    console.log('[/problems/:problemSlug] req.params =', req.params);
    const problemSlug = req.params.problemSlug;
    const problemTitle = desanitizeTitleFromURL(problemSlug);
    const problem = PROBLEMS.find(p => p.title == problemTitle);
    if (!problem) {
        return res.status(411).json({});
    }
    res.json({
        problem
    })
});


app.get('/me', auth, (req, res) => {
    console.log('[/signup]');
    const user = USERS.find(u => u.userId == req.userId);
     // Don't want to return password in plaintext
    const { password, ...user_without_password } = user;
    res.json({
        user: user_without_password
    })
})


app.post('/signup', (req, res) => {
    console.log('[/signup] req.body =', req.body);
    // Decode body, which should have email and password
    const email = req.body.email;
    const password = req.body.password;

    if (USERS.find(u => u.email === email)) {
        // User already exists
        return res.status(403).json({
            msg: "Email already registered"
        });
    }

    // Save user
    const user = { email, password, userId: USER_ID_COUNTER++ };
    USERS.push(user);

    // Get user object without password
    const { password: userPassword, ...user_without_password } = user;

    return res.json({
        msg: "Success",
        user: user_without_password
    });
});


app.post('/login', (req, res) => {
    console.log('[/login] req.body =', req.body);
    // Decode body, which should have email and password
    const email = req.body.email;
    const password = req.body.password;

    // Check if user with given email and password exist
    const user = USERS.find(user => user.email === email);

    if (!user) {
        // If user does not exist, return a 401 status code to client
        return res.status(403).json({
            msg: `User with email address '${email}' not found`
        });
    }

    if (user.password !== password) {
        return res.status(403).json({
            msg: "Incorrect password"
        });
    }

    const token = jwt.sign(
        {
            userId: user.userId,
        }, 
        JWT_SECRET
    );
    
    return res.json({ token });
});


app.get('/submissions/:problemId', auth, (req, res) => {
    console.log('[/submissions/:problemId] req.body =', req.body);
    const userId = req.userId; // Provided by auth middleware
    const problemId = parseInt(req.params.problemId); // Assuming the problem's ID is provided as a query parameter
    const submissions = SUBMISSIONS.filter(s => s.problemId === problemId && s.userId === req.userId);

    console.log('[/submissions/:problemId] req.userId =', req.userId);
    console.log('[/submissions/:problemId] req.params.problemId =', req.params.problemId);

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


app.post('/submit', auth, (req, res) => {
    console.log('[/submit] req.body =', req.body);
    // Let the logged-in user submit a problem, randomly accept or reject the solution
    const problemId = req.body.problemId;
    const language = req.body.language;
    const code = req.body.code;

    const newSubmission = {
        problemId,
        language,
        code,
        userId: req.userId,
        // status: "REJ"
    };
    
    const isCorrect = Math.random() < 0.5;
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


app.post('/run', auth, (req, res) => {
    console.log('[/run] req.body =', req.body);
    // Let the logged-in user test a problem, randomly accept or reject the solution
    const problemId = req.body.problemId;
    const language = req.body.language;
    const code = req.body.code;
    const tests = req.body.tests;

    const newSubmission = {
        problemId,
        language,
        code,
        userId: req.userId,
        // status: "REJ"
    };
    
    const isCorrect = Math.random() < 0.5;
    if (isCorrect) {
        newSubmission.status = "ACC";
    } else {
        newSubmission.status = "REJ";
    }

    // Return the status of the submission to the client
    return res.json({ 
        status: newSubmission.status
    });
});


////////////////////////////////////////////////////////////////////////////////

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
