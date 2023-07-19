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


export function ProblemsListItem(problem) {
    const id = problem.id;
    const index = problem.index;
    const title = problem.title;
    const acceptanceRate = problem.acceptanceRate;
    const difficulty = problem.difficulty;
    console.log(problem)

    return (
        <>
        <tr key={id}>
            <td>
                <NavLink to={`${ROUTES.PROBLEM}/${title}`} className='nav-link problem'>
                    {id+1}. {title}
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
// ProblemsListItem.propTypes = {
//     id: PropTypes.number.isRequired,
//     index: PropTypes.number.isRequired,
//     title: PropTypes.string.isRequired,
//     acceptanceRate: PropTypes.string.isRequired,
//     difficulty: PropTypes.string.isRequired,
//     description: PropTypes.string,
//     examples: PropTypes.arrayOf(Object),
// };
