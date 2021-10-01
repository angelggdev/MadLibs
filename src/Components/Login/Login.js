import {React} from 'react';

const Login = () => {

    return(
        <div>
            <form>
                <label for='email'>Email</label>
                <input type='email' name='email'/>
                <label for='password'>Password</label>
                <input type='password' name='password'/>
                <input type='submit'/>
            </form>
        </div>
    )
}

export default Login;