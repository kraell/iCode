import { useState } from "react";


const problems1 = [
    {
        id: 0,
        title: "title",
        difficulty: "Easy",
        acRate: "42%"
    },
    {
        id: 1,
        title: "title1",
        difficulty: "Medium",
        acRate: "32%"
    },
    {
        id: 2,
        title: "title2",
        difficulty: "Hard",
        acRate: "12%"
    }
];
const problems2 = [
    {
        id: 3,
        title: "title3",
        difficulty: "Easy",
        acRate: "42%"
    },
    {
        id: 4,
        title: "title4",
        difficulty: "Medium",
        acRate: "32%"
    },
    {
        id: 5,
        title: "title5",
        difficulty: "Hard",
        acRate: "12%"
    }
];


function App() {

    const [problems, setProblems] = useState(
        [
            {
                id: 0,
                title: "title",
                difficulty: "Easy",
                acRate: "42%"
            },
            {
                id: 1,
                title: "title1",
                difficulty: "Medium",
                acRate: "32%"
            },
            {
                id: 2,
                title: "title2",
                difficulty: "Hard",
                acRate: "12%"
            }
        ]
    );
    
    return (
        <div>
            <input type="text" placeholder="email"></input>
            <input type="text" placeholder="password"></input>
            <button>Sign in</button>
            <div>
                <button>1</button>
                <button>2</button>
            </div>
            <div>
                <ProblemsTable problems={problems} />
            </div>
        </div>
    )
}


function ProblemsTable(props) {

    const problems = props.problems;

    return (
        <table>
            <tbody>
                {problems.map(problem =>
                    <ProblemStatement
                        key={problem.id}
                        title={problem.title}
                        difficulty={problem.difficulty}
                        acRate={problem.acRate}
                    />    
                )}
            </tbody>
        </table>
    )
}


function ProblemStatement(props) {
    const id = props.id;
    const title = props.title;
    const acRate = props.acRate;
    const difficulty = props.difficulty;

    return (
        <tr key={id}>
            <td>
                {title}
            </td>
            <td>
                {difficulty}
            </td>
            <td>
                {acRate}
            </td>
        </tr>
    )
}

export default App
