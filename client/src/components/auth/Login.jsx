import { useMutation } from '@apollo/client';
import React, {useState, useContext} from 'react';
import {Button, Form} from 'semantic-ui-react'

import {AuthContext} from "../../context/authContext"
import {useForm} from "../../util/customHooks";

import {LOGIN_USER_MUTATION} from "../../util/gql/gqlMutations";

const Login = (props) => {
    const [errors, setErrors] = useState({});
    const {values, onChange, onSubmit} = useForm(handleLogin, {email:'', password:''});
    const {login:authContextLogin} = useContext(AuthContext)
    // Destructure function that will fire off the mutation and loading variable
    // useMutation(Mutation that we declared, Object that contains options)
    const [loginUser, {loading}] = useMutation(LOGIN_USER_MUTATION,
        {
        // Callback when mutation finishes
        update(proxy, {data:{login:userData}}){
            authContextLogin(userData);
            props.history.push('/');
        },
        // Callback when mutation fails
        onError(err){
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        // Variables that are used in mutation i.e the data that is being sent
        variables:values
    })

    function handleLogin(){
        loginUser();
    }

    return ( 
        <div className="ui container" style={{width:600}}>
            <Form onSubmit={onSubmit} noValidate className={loading ? "loading": ''}>
                <h1>Login</h1>
                <Form.Input
                label="Email"
                placeholder="Email.."
                name="email"
                type="email"
                error={errors.email}
                value={values.email}
                onChange={onChange}/>
                <Form.Input
                label="Password"
                placeholder="Password.."
                name="password"
                type="password"
                error={errors.password}
                value={values.password}
                onChange={onChange}/>
                <Button type="submit" color="pink">
                    Submit
                </Button>
            </Form>
            {/* If the errors object is not empty display error message in a list */}
            {Object.keys(errors).length > 0 && <div className="ui error message">
                <ul className="list">
                    { Object.values(errors).map(value=>(
                        <li key={value}>{value}</li>
                    ))}
                </ul>
            </div>}
        </div>
     );
}
 
export default Login;