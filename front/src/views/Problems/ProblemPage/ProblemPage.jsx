import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { 
    languages,
} from 'utils/db';
import { ProblemDetail } from 'views/Problems/ProblemPage/ProblemDetail';
import { FourOhFour } from 'views/FourOhFour/FourOhFour';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { ROUTES } from 'utils/routes';


export function ProblemPage() {
    // Get problem title from URL parameters
    const { problemSlug } = useParams();

    const [ problem, setProblem ] = useState(null);
    const [ languagesSupported, setLanguagesSupported ] = useState([]);
    const [ selectedLanguage, setSelectedLanguage ] = useState(null);
    const [ languageData, setLanguageData ] = useState(null);
    const [ codeSnippet, setCodeSnippet ] = useState('');

    // Get problem based on slug
    const init = async () => {
        console.log(`Fetching http://localhost:3000${ROUTES.PROBLEM}/${problemSlug}`);
        const response = await fetch(`http://localhost:3000${ROUTES.PROBLEM}/${problemSlug}`, {
            method: "GET",
        });
        console.log("response:", response);
        const json = await response.json();
        console.log("response JSON:", json);

        if (!response.ok) {
            return <FourOhFour />;
        } else {
            // Set problem
            setProblem(json.problem);
        }
    };

    useEffect( () => {
        init();
    }, []);

    useEffect( () => {
        console.log("problem updated:", problem);
        if (problem) {
            // Get and set supported languages
            const initialLanguagesSupported = languages.filter( l => Object.keys(problem.dataByLanguage).includes(l.slug) );
            setLanguagesSupported(initialLanguagesSupported);
        }
    }, [problem]);

    useEffect( () => {
        console.log("languagesSupported updated:", languagesSupported);
        if (languagesSupported.length > 0) {
            // Set initial selected language
            const initialSelectedLanguage = languages.find(l => l.slug === languagesSupported[0].slug);
            setSelectedLanguage(initialSelectedLanguage);
        }
    }, [languagesSupported]);

    useEffect( () => {
        console.log("selectedLanguage updated:", selectedLanguage);
        if (problem && problem.dataByLanguage && selectedLanguage) {
            // Set language data
            setLanguageData(problem.dataByLanguage[selectedLanguage.slug]);
        }
    }, [selectedLanguage]);

    useEffect( () => {
        console.log("languageData updated:", languageData);
        if (languageData) {
            // Set code snippet
            setCodeSnippet(languageData.starterCode);
        }
    }, [languageData]);

    useEffect( () => {
        console.log("codeSnippet updated:", codeSnippet);
    }, [codeSnippet]);


    const validLanguageIsSelected = Boolean(selectedLanguage) && Object.keys(selectedLanguage).length > 0

    const handleLanguageChange = (e) => {
        let newLanguage = languagesSupported.find(lang => lang.name === e.target.value);
        console.log('new selectedLanguage:', newLanguage);
        setSelectedLanguage(newLanguage);
        let newLanguageData = problem.dataByLanguage[newLanguage.slug]
        console.log('new languageData:', newLanguageData);
        setLanguageData(newLanguageData);
        console.log('new codeSnippet:', newLanguageData.starterCode);
        setCodeSnippet(newLanguageData.starterCode);
    };

    const handleCodeChange = (e) => {
        setCodeSnippet(e.target.value);
        console.log('User just typed: ', e.target.value);
    };

    const handleRunCode = () => {
        console.log(`User clicked 'Run'`);
        alert("TODO: run this code in containerized environment and display output")
    };

    const handleSubmitCode = async () => {
        console.log(`User clicked 'Submit'`);
        const submission = {
            problemId: problem.problemId,
            language: selectedLanguage,
            code: codeSnippet
        };
        const jsonbody = JSON.stringify(submission);
        console.log(`Fetching http://localhost:3000${ROUTES.SUBMIT_CODE}`);
        const response = await fetch(`http://localhost:3000${ROUTES.SUBMIT_CODE}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token')
            },
            body: jsonbody
        });
        console.log("response:", response);
        const json = await response.json();
        console.log("response (JSON):", json);

        if (!response.ok) {
            alert(`There was some trouble submitting your code. Try again later, and make sure you're logged in.`);
        } else {
            // Set problem
            alert(`Your code's status: ${json.status}`);
        }
    };

    return (!problem ? <FourOhFour /> : (
        <Container>
            <Row style={{display: "flex"}}>
                <Col md={6}>
                    {/* Left side */}
                    {/* Display problem details */}
                    <ProblemDetail {...problem} />
                </Col>
                <Col md={6} >
                    {/* Right side */}
                    {/* Display language dropdown */}
                    <Form style={{display: 'inline-block'}}>
                        <Form.Group as={Row} >
                            <Col sm={9}>
                                <Form.Label>Select Language:</Form.Label>
                            </Col>
                            <Col sm={9}>
                                <Form.Control as={'select'} value={selectedLanguage ? selectedLanguage.name : ''} onChange={handleLanguageChange}>
                                    <>
                                    {languagesSupported.map((language, index) => (
                                        <option key={language.slug} name={language.name}>{language.name}</option>
                                    ))}
                                    </>
                                </Form.Control>
                            </Col>
                        </Form.Group>
                    </Form>
                    {/* Display function stub textbox */}
                    <Form.Control as="textarea" placeholder={""} value={codeSnippet} rows={10} style={{height: "79%", fontFamily: 'Courier', fontSize: '14px'}} onChange={handleCodeChange} />
                    {/* Display Run and Submit buttons */}
                    <br />
                    <Button variant="primary" onClick={handleRunCode} disabled={!validLanguageIsSelected}>Run</Button>
                    {' '}
                    <Button variant="success" onClick={handleSubmitCode} disabled={!validLanguageIsSelected}>Submit</Button>
                </Col>
            </Row>
        </Container>
    ));
}
