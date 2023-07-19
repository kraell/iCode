import { PropTypes } from 'prop-types';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';


export function CodeBox({
    handleLanguageChange,
    handleCodeChange,
}) {
    return (
        <>
        {/* Display language dropdown */}
        <Form>
            <Form.Group controlId="languageSelect">
              <Form.Label>Select Language:</Form.Label>
              <Form.Control as="select" value={selectedLanguage} onChange={handleLanguageChange}>
                <option value="">Select Language</option>
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                {/* Add more language options */}
              </Form.Control>
            </Form.Group>
          </Form>
          {/* Display function stub textbox */}
          <Form.Control as="textarea" value={functionStub} rows={10} readOnly />
          {/* Display console and parameter textboxes */}
          <div>
            <h3>Console:</h3>
            <div>
              <Form.Control as="textarea" rows={3} placeholder="Parameter 1" />
              <Form.Control as="textarea" rows={3} placeholder="Parameter 2" />
              {/* Add more parameter textboxes as needed */}
            </div>
          </div>
          {/* Display Run and Submit buttons */}
          <Button variant="primary" onClick={handleRunClick}>Run</Button>{' '}
          <Button variant="success" onClick={handleSubmitClick}>Submit</Button>

        </>
    )
}
CodeBox.propTypes = {
    handleLanguageChange: PropTypes,
    handleCodeChange: PropTypes,
}
