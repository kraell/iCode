import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { ROUTES } from 'utils/routes';


export function LoginForm() {
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
        const jsonbody = JSON.stringify(data);
        console.log(`Sending POST request to http://localhost:3000${ROUTES.LOGIN}`, data);
        const response = await fetch(`http://localhost:3000${ROUTES.LOGIN}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonbody
        });
        console.log(response);
        const json = await response.json();
        localStorage.setItem("token", json.token); // save token for user
        console.log(json);
        if (response.ok) {
            alert(`${email} is now logged in with token: ${json.token}!`)
        } else {
            alert(`[${json.msg}]`)
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
            <Button as='input' type='submit' value='Log in' onClick={handleSubmit} />
        </div>
    )
}