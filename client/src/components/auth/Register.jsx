import { gql, useMutation } from '@apollo/client';
import React, {useState} from 'react';
import {Button, Form} from 'semantic-ui-react'

const Register = (props) => {
    const [errors, setErrors] = useState({});

    const [values, setValues] = useState({
        username:'',
        email:'',
        password:'',
        confirmPassword:''
    });

    const [addUser, {loading}] = useMutation(REGISTER_USER, {
        update(proxy, res){
            props.history.push('/');
        },
        onError(err){
            console.log(err.graphQLErrors[0].extensions.exception.errors);
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables:values
    })

    const onChange = (e)=>{
        setValues({...values, [e.target.name]:e.target.value});
    }

    const onSubmit = e =>{
        e.preventDefault();
        addUser();
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

const REGISTER_USER = gql`
mutation register(
    $username:String!
    $email:String!
    $password:String!
    $confirmPassword:String!
){
    register(
        registerInput:{
            username:$username
            email:$email
            password:$password
            confirmPassword:$confirmPassword
        }
    ){
        id email username createdAt token
    }
}
`
 
export default Register;