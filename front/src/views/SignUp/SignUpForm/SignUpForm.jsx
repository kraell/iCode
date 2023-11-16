import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { ROUTES } from 'utils/routes';


export function SignUpForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        const data = {
            email: email,
            password: password
        };
        console.log(`Sending POST request to http://localhost:3000${ROUTES.SIGNUP}`);
        const response = await fetch(`http://localhost:3000${ROUTES.SIGNUP}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        console.log(response);
        const json = await response.json();
        console.log(json);
        if (response.ok) {
            alert(`[${json.msg}] ${email} is now registered! (Don't forget your password... You can't reset it!)`)
        } else {
            alert(`[${json.msg}] ${email} is already registered! Please log in instead. (Forgot your password? Sorry. You'll have to create a new account.)`)
        }
    };

    return (
        <div className="w-25">
            <br />
            <FloatingLabel
                controlId='floatingInput'
                label='Email address'
                className='mb-3'
            >
                <Form.Control type='email' placeholder='name@example.com' value={email} onChange={handleEmailChange} />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
            </FloatingLabel>
            <br />
            <Button as='input' type='submit' value='Sign up' onClick={handleSubmit} />
        </div>
    )
}