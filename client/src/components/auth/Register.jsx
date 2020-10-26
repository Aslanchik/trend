import { gql, useMutation } from '@apollo/client';
import React, {useState} from 'react';
import {Button, Form} from 'semantic-ui-react'

import {useForm} from "../../util/customHooks";

const Register = (props) => {
    const initState = {
        username:'',
        email:'',
        password:'',
        confirmPassword:''
    }
    const [errors, setErrors] = useState({});
    const {values, onChange, onSubmit} = useForm(handleRegister, initState);

    // Destructure function that will fire off the mutation and loading variable
    // useMutation(Mutation that we declared, Object that contains options)
    const [registerUser, {loading}] = useMutation(REGISTER_USER,
        {
        // Callback when mutation finishes
        update(proxy, res){
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
                error={errors.username ? true: false}
                value={values.username}
                onChange={onChange}/>
                <Form.Input
                label="Email"
                placeholder="Email.."
                name="email"
                type="email"
                error={errors.email ? true: false}
                value={values.email}
                onChange={onChange}/>
                <Form.Input
                label="Password"
                placeholder="Password.."
                name="password"
                type="password"
                error={errors.password ? true: false}
                value={values.password}
                onChange={onChange}/>
                <Form.Input
                label="Repeat Password"
                placeholder="Repeat Password.."
                name="confirmPassword"
                type="password"
                error={errors.confirmPassword ? true: false}
                value={values.confirmPassword}
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

// Declare mutation
const REGISTER_USER = gql`
# First we declare which mutation we are sending and what types of variable are we sending
mutation register(
    $username:String!
    $email:String!
    $password:String!
    $confirmPassword:String!
){
    # Second we specify what data is sent and assigning the data into the registerInput type
    register(
        registerInput:{
            username:$username
            email:$email
            password:$password
            confirmPassword:$confirmPassword
        }
    ){
        # Third we specify what data we want to get back from the request
        id email username createdAt token
    }
}
`
 
export default Register;