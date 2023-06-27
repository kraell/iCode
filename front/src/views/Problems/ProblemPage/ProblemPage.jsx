import { PropTypes } from 'prop-types';
import { 
    problems1,
    problems2, 
} from 'utils/db';
import { ProblemDetail } from 'views/Problems/ProblemPage/ProblemDetail';
import { FourOhFour } from 'views/FourOhFour/FourOhFour';


export function ProblemPage(props) {
    const problemTitle = (props.problemTitle);
    // const problemId = Number(props.problemId);
    const all_problems = problems1.concat(problems2);
    const this_problem = all_problems.find(problem => problem.title === props.problemTitle);
    if (!this_problem) {
        return <FourOhFour />;
    }
    return (
        <>
        <ProblemDetail {...this_problem} />
        </>
    );
}
ProblemPage.propTypes = {
    problemTitle: PropTypes.string.isRequired,
};