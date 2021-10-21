import './Login.css';
import { Form, Button, Container } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useState, useContext } from 'react';
import UserContext from '../../contexts/UserContext';


const Login = () => {
    const{submitLogin, loginError, user} = useContext(UserContext);
    const[disableSubmit, setDisableSubmit] = useState(true);

    const validate = values => {
        const errors = {};
    
        if (!values.email) {
          errors.email = 'Requerido';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
          errors.email = 'Email inválido';
        }
    
        if (!values.password) {
            errors.password = 'Requerido';
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
            submitLogin(values.email, values.password)
        },
    });

    return(
        <Container className='formContainer'>
            <Form className='loginForm' onSubmit={(e) => {e.preventDefault(); formik.handleSubmit(e)}}>
                {
                    loginError&&
                    <div className='formAlert'>Email o Contraseña incorrectos</div>
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
                        <p>Contraseña</p>
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
                    <span className='formAlert'>Ya hay una sesión iniciada</span>
                    :
                    <Button
                        type='submit'
                        variant={disableSubmit?'dark':'none'}
                        disabled={disableSubmit}
                    >
                        Iniciar Sesión
                    </Button>
                }
            </Form>
        </Container>
    )
}

export default Login;