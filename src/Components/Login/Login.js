import './Login.css';
import { Form, Button, Container, Spinner } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useState, useContext } from 'react';
import UserContext from '../../contexts/UserContext';


const Login = () => {
    const{submitLogin, loginError, user, isLoggingIn, submitRegister} = useContext(UserContext);
    const[disableSubmit, setDisableSubmit] = useState(true);
    const[register, setRegister] = useState(false);

    const validate = values => {
        const errors = {};
    
        if (!values.email) {
          errors.email = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
          errors.email = 'Invalid email';
        }
    
        if (!values.password) {
            errors.password = 'Required';
        }
    
        if(Object.keys(errors).length === 0 
            && formik.touched.email) {
            setDisableSubmit(false);
        } else {
            setDisableSubmit(true);
        }
      
        return errors;
    };

    const formik = useFormik({
        initialValues: {
          email: '',
          password:''
        },
        validate,
        onSubmit: values => {
            if (!register){
                submitLogin(values.email, values.password);
            } else {
                submitRegister(values.email, values.password);
            }
        },
    });

    return(
        <Container className='formContainer'>
            <Form className='loginForm' onSubmit={(e) => {e.preventDefault(); formik.handleSubmit(e)}}>
                {
                    loginError&&
                    <div className='formAlert'>Invalid email or password</div>
                }
                <Form.Group>
                    <Form.Label>
                        <p>Email</p>
                        {formik.touched.email && formik.errors.email ? (
                            <span className='formAlert'>{formik.errors.email}</span>
                        ) : null}
                    </Form.Label>
                    <Form.Control
                        id='email'
                        name='email'
                        type='text'
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        <p>Password</p>
                        {formik.touched.password && formik.errors.password ? (
                            <span className='formAlert'>{formik.errors.password}</span>
                        ) : null}
                    </Form.Label>
                    <Form.Control 
                        id='password'
                        name='password'
                        type='password'
                        maxLength='10'
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </Form.Group>
                {
                    user?
                    <span className='formAlert'>There's a user signed in already</span>
                    :
                    isLoggingIn?
                    <Spinner animation="grow" />
                    :
                    register?
                    <>
                        <Button
                            type='submit'
                            variant={disableSubmit?'dark':'primary'}
                            disabled={disableSubmit}
                        >
                            Register
                        </Button>
                        <Button variant='none' onClick={() => setRegister(false)} className='loginLink'>Login</Button>
                    </>
                    :
                    <>
                        <Button
                            type='submit'
                            variant={disableSubmit?'dark':'primary'}
                            disabled={disableSubmit}
                        >
                            Login
                        </Button>
                        <Button variant='none' onClick={() => setRegister(true)} className='loginLink'>Register</Button>
                    </>
                }
            </Form>
        </Container>
    )
}

export default Login;