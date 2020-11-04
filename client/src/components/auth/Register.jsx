import React, {useState, useContext} from 'react';
import { useMutation } from '@apollo/client';
import {Form} from 'semantic-ui-react'

import {AuthContext} from "../../context/authContext";
import {useForm} from "../../util/customHooks";
import {REGISTER_USER_MUTATION} from "../../util/gql/gqlMutations";
import SubmitBtn from './SubmitBtn';

const Register = (props) => {
    const initState = {
        username:'',
        email:'',
        password:'',
        confirmPassword:''
    }
    const [errors, setErrors] = useState({});
    const {values, onChange, onSubmit} = useForm(handleRegister, initState);
    const {login:authContextLogin} = useContext(AuthContext)
    // Destructure function that will fire off the mutation and loading variable
    // useMutation(Mutation that we declared, Object that contains options)
    const [registerUser, {loading}] = useMutation(REGISTER_USER_MUTATION,
        {
        // Callback when mutation finishes
        update(proxy, {data:{register:userData}}){
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

    function handleRegister (){
        registerUser();
    }
    return ( 
        <div className="ui container" style={{width:600}}>
            <Form onSubmit={onSubmit} noValidate className={loading ? "loading": ''}>
                <h1>Register</h1>
                <Form.Input
                label="Username"
                placeholder="Username.."
                name="username"
                type="text"
                error={errors.username}
                value={values.username}
                onChange={onChange}/>
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
                <Form.Input
                label="Repeat Password"
                placeholder="Repeat Password.."
                name="confirmPassword"
                type="password"
                error={errors.confirmPassword}
                value={values.confirmPassword}
                onChange={onChange}/>
                <SubmitBtn/>
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

export default Register;