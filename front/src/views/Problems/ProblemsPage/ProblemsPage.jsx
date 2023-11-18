import { useEffect, useState } from "react";
import { PropTypes } from 'prop-types';
import { Button, ButtonGroup, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
// import { 
//     problems1,
//     problems2,
// } from 'utils/db';
import { ProblemsList } from "views/Problems/ProblemsPage/ProblemsList/ProblemsList";
import { ROUTES } from "utils/routes";


export function ProblemsPage() {
    const [problems, setProblems] = useState( [] );

    const init = async () => {
        const response = await fetch(`http://localhost:3000${ROUTES.PROBLEMS_ALL}`, {
            method: "GET",
        });

        const json = await response.json();
        setProblems(json.problems);
    };

    useEffect( () => {
        init();
    }, []);
    
    return (
        <div>
            <div>
                <ProblemsList problems={problems} />
            </div>
            {/* <ToggleButtonGroup type="radio" name="page_number" defaultValue={1}>
                <ToggleButton 
                    id="tbg-radio-1"
                    value={1}
                    onClick={ () => {setProblems(problems => problems1)}}
                >
                    1
                </ToggleButton>
                <ToggleButton 
                    id="tbg-radio-2"
                    value={2}
                    onClick={ () => {setProblems(problems => problems2)}}
                >
                    2
                </ToggleButton>
            </ToggleButtonGroup> */}
        </div>
    )
}
