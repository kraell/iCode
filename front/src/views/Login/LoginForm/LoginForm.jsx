import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';


export function LoginForm() {
    return (
        <div className="w-25">
            <br />
            <FloatingLabel
                controlId='floatingInput'
                label='Email address'
                className='mb-3'
            >
                <Form.Control type='email' placeholder='name@example.com' />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control type="password" placeholder="Password" />
            </FloatingLabel>
            <br />
            <Button as='input' type='submit' value='Log in' />
        </div>
    )
}