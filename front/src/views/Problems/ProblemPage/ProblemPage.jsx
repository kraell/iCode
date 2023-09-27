import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { 
    problems1,
    problems2, 
    languages,
} from 'utils/db';
import { ProblemDetail } from 'views/Problems/ProblemPage/ProblemDetail';
import { FourOhFour } from 'views/FourOhFour/FourOhFour';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';


export function ProblemPage(props) {
    // Get *this* problem based on props passed
    const all_problems = problems1.concat(problems2);
    const this_problem = all_problems.find(problem => problem.title === props.problemTitle);
    if (!this_problem) {
        console.log("Can't find a problem with title:", props.problemTitle)
        return <FourOhFour />;
    }
    // Only allow user to pick from languages supported by this problem
    const languagesSupported = languages.filter( languageObj => Object.keys(this_problem.dataByLanguage).includes(languageObj.slug) )
    console.log("languagesSupported:", languagesSupported);
    // Establish whether or not this problem has any supported languages
    let languageSlug = null;
    if (Object.keys(this_problem.dataByLanguage).length > 0) {
        languageSlug = Object.keys(this_problem.dataByLanguage)[0]
    }
    // Initialize state for this problem's view
    const [selectedLanguage, setSelectedLanguage] = useState(
        Boolean(languageSlug) ? languages.find(lang => lang.slug === languageSlug) : {}
    );
    const [languageData, setLanguageData] = useState(
        Boolean(languageSlug) ? this_problem.dataByLanguage[languageSlug] : {}
    );
    const [codeSnippet, setCodeSnippet] = useState(
        Boolean(languageSlug) ? languageData.starterCode : ""
    );
    console.log("selectedLanguage:", selectedLanguage)
    const validLanguageIsSelected = Boolean(selectedLanguage) && Object.keys(selectedLanguage).length > 0

    const handleLanguageChange = (e) => {
        let newLanguage = languagesSupported.find(lang => lang.name === e.target.value);
        console.log('newLanguage:', newLanguage);
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
                    <Button variant="primary" onClick={props.handleRunClick} disabled={!validLanguageIsSelected}>Run</Button>{' '}
                    <Button variant="success" onClick={props.handleSubmitClick} disabled={!validLanguageIsSelected}>Submit</Button>
                </Col>
            </Row>
        </Container>
    );
}
ProblemPage.propTypes = {
    problemTitle: PropTypes.string.isRequired,
};