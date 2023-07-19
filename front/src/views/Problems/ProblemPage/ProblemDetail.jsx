import React from 'react';
import { PropTypes } from 'prop-types';
import { Difficulty } from 'views/Problems/ProblemDifficulty';

export function ProblemDetail({
    id,
    title,
    difficulty,
    description,
    examples,
    constraints,
    numAcceptedSubmissions,
    numTotalSubmissions,
    acceptanceRate,
}) {
    return (
        <div 
            className="problem-detail"
            style={{
                textAlign: 'left',
                margin: 10,
            }}
        >
            <h1>{title}</h1>
            <Difficulty level={difficulty} />
            <p><br/>{description}</p>
            <Examples examples={examples} />
            <br/>
            <Constraints constraints={constraints} />
            <br/>
            <Statistics 
                numAcceptedSubmissions={numAcceptedSubmissions}
                numTotalSubmissions={numTotalSubmissions}
                acceptanceRate={acceptanceRate}
            >
            </Statistics>
        </div>
    )
}
ProblemDetail.propTypes = {
    title: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    examples: PropTypes.arrayOf(Object).isRequired,
    constraints: PropTypes.arrayOf(Object).isRequired,
    numAcceptedSubmissions: PropTypes.number.isRequired,
    numTotalSubmissions: PropTypes.number.isRequired,
    acceptanceRate: PropTypes.number.isRequired,
}


function Examples({ examples }) {
    return (
        <div className='examples'>
            {examples.map((example, index) => (
                <div key={index}>
                    <br/>
                    <b>Example {index+1}:</b>
                    <div
                        className='example'
                        style={{
                            fontFamily: 'Courier',
                            backgroundColor: 'lightgray',
                            padding: "1%",
                            borderRadius: 10
                        }}
                    >
                        {/* Display example content */}
                        <div><b>Input:</b> {example.input}</div>
                        <div><b>Output:</b> {example.output}</div>
                        <div><b>Explanation:</b> {example.explanation}</div>
                    </div>
                </div>
            ))}
        </div>
    )
}
Examples.propTypes = {
    examples: PropTypes.arrayOf(Object).isRequired,
}


function Constraints({ constraints }){
    return(
        <div className='constraints'>
            <b>Constraints:</b>
            <ul>
                {constraints.map((constraint, index) => (
                    <li
                        key={index}
                        className='constraint'
                    >
                        <p
                            style={{
                                display: 'inline-block',
                                fontFamily: 'Courier',
                                backgroundColor: 'lightgray',
                                padding: "0.2%",
                                margin: 5,
                                borderRadius: 5
                            }}
                        >
                            {constraint}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    )
}
Constraints.propTypes = {
    constraints: PropTypes.arrayOf(Object).isRequired,
}


function Statistics({ 
    numAcceptedSubmissions,
    numTotalSubmissions,
    acceptanceRate,
}) {
    let acRateAsPercentage = (acceptanceRate * 100).toFixed(1);
    return (
        <>
        <p>
            Accepted: <b>{numAcceptedSubmissions}</b> | Submissions: <b>{numTotalSubmissions}</b> | Acceptance Rate: <b>{acRateAsPercentage}%</b>
        </p>
        </>
    )
 }
 Statistics.propTypes = {
    numAcceptedSubmissions: PropTypes.number.isRequired,
    numTotalSubmissions: PropTypes.number.isRequired,
    acceptanceRate: PropTypes.number.isRequired,
 }
