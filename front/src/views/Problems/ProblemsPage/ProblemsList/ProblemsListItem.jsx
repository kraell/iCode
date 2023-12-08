import { PropTypes } from 'prop-types';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ROUTES } from 'utils/routes';
import { Link, NavLink } from 'react-router-dom';
import { Difficulty } from 'views/Problems/ProblemDifficulty';
import './ProblemsListItem.css';
import { ProblemPage } from 'views/Problems/ProblemPage/ProblemPage';


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


export function ProblemsListItem(problem) {
    const problemId = problem.problemId;
    const index = problem.index;
    const title = problem.title;
    const difficulty = problem.difficulty;
    const acceptanceRate = problem.acceptanceRate;
    console.log(problemId, difficulty)

    return (
        <>
        <tr key={problemId}>
            <td>
                <NavLink to={`${ROUTES.PROBLEM}/${sanitizeTitleForURL(title)}`} className='nav-link problem'>
                    {problemId+1}. {title}
                </NavLink>
            </td>
            <td><Difficulty level={difficulty} /></td>
            <td>{acceptanceRate}</td>
        </tr>
        {/* <Routes>
            <Route path={ROUTES.PROBLEM} element={<ProblemPage />} />
        </Routes> */}
            
        </>
    )
}
ProblemsListItem.propTypes = {
    problemId: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    acceptanceRate: PropTypes.number.isRequired,
    difficulty: PropTypes.string,
    description: PropTypes.string,
    examples: PropTypes.arrayOf(Object),
};
