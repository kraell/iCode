import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { 
    problems1,
    problems2, 
    languages,
    codeSnippetStubs,
} from 'utils/db';
import { ProblemDetail } from 'views/Problems/ProblemPage/ProblemDetail';
import { FourOhFour } from 'views/FourOhFour/FourOhFour';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';


export function ProblemPage(props) {
    const problemTitle = (props.problemTitle);
    const all_problems = problems1.concat(problems2);
    const this_problem = all_problems.find(problem => problem.title === props.problemTitle);
    const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
    const [languageData, setLanguageData] = useState(this_problem.dataByLanguage[selectedLanguage.slug]);
    const [codeSnippet, setCodeSnippet] = useState(languageData.starterCode);
    if (!this_problem) {
        return <FourOhFour />;
    }
    console.log(selectedLanguage)

    const handleLanguageChange = (e) => {
        let newLanguage = languages.find(lang => lang.name === e.target.value);
        console.log('Language selected:', newLanguage);
        setSelectedLanguage(newLanguage);
        console.log("selectedLanguage:", selectedLanguage);
        let newLanguageData = this_problem.dataByLanguage[newLanguage.slug]
        setLanguageData(newLanguageData);
        console.log("Setting starter", newLanguage.name, "code:", newLanguageData.starterCode);
        setCodeSnippet(newLanguageData.starterCode);
    };

    const handleCodeChange = (e) => {
        setCodeSnippet(e.target.value);
        console.log('User just typed: ', e.target.value);
    };

    return (
        <Container>
            <Row style={{display: "flex"}}>
                <Col md={6}>
                    {/* Left side */}
                    {/* Display problem details */}
                    <ProblemDetail {...this_problem} />
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
                                <Form.Control as={'select'} value={selectedLanguage.name} onChange={handleLanguageChange}>
                                    <>
                                    {languages.map((language, index) => (
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
                    <Button variant="primary" onClick={props.handleRunClick}>Run</Button>{' '}
                    <Button variant="success" onClick={props.handleSubmitClick}>Submit</Button>
                </Col>
            </Row>
        </Container>
    );
}
ProblemPage.propTypes = {
    problemTitle: PropTypes.string.isRequired,
};