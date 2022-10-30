import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';

const emailReducer = (state, action) => {
  if (action.type == 'Email_Input') {
    return { value: action.val, isValid: action.val.includes("@") }

  }
  if (action.type == 'Input_Blur') {
    return { value: state.value, isValid: state.value.includes("@") }

  }
  return { value: '', isValid: false }
}
const paswordReducer = (state, action) => {
  if (action.type == 'Password_Input') {
    return { value: action.val, isValid: action.val.length > 6 }

  }
  if (action.type == 'Input_Blur') {
    return { value: state.value, isValid: state.value.length > 6 }

  }
  return { value: '', isValid: false }

}
const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [enteredCollege, setEnteredCollege] = useState('')
  const [collegeIsValid, setCollegeIsValid] = useState()
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '',
    isValid: null
  })
  const [passwordState, dispatchPassword] = useReducer(paswordReducer, {
    value: '',
    isValid: null
  })
  // useEffect(() => {
  //   setFormIsValid(
  //     enteredPassword.trim().length > 6 && enteredEmail.includes('@') && enteredCollege.trim().length > 0
  //   );
  // }, [enteredPassword, enteredCollege, enteredEmail])
  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmail({ type: 'Email_Input', val: event.target.value })

    setFormIsValid(
      event.target.value.includes('@') && passwordState.isValid && enteredCollege.trim().length > 0
    );
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({ type: 'Password_Input', val: event.target.value })
    setFormIsValid(
      passwordState.isValid && emailState.isValid && enteredCollege.trim().length > 0
    );


  };
  const collegeChangeHandler = (event) => {
    setEnteredCollege(event.target.value)
    setFormIsValid(
      passwordState.isValid && emailState.isValid && event.target.value.trim().length > 0
    );
  }

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.isValid);
    dispatchEmail({ type: 'Input_Blur' })
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: 'Input_Blur' })
    // setPasswordIsValid(enteredPassword.trim().length > 6);
  };
  const validateCollegeHandler = () => {
    setCollegeIsValid(enteredCollege.trim().length > 0)
  }

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };


  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input id='email' type='email' label='E-Mail' isValid={emailState.isValid} value={emailState.value} onChange={emailChangeHandler} onBlur={validateEmailHandler} />
        <Input id='password' type='password' label='password' isValid={passwordState.isValid} value={passwordState.value} onChange={passwordChangeHandler} onBlur={validatePasswordHandler} />
        {/* <div
          className={`${classes.control} ${emailState.isValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div> */}
        {/* <div
          className={`${classes.control} ${passwordIsValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div> */}
        <Input id='college' type='text' label='college' isValid={collegeIsValid} value={enteredCollege} onChange={collegeChangeHandler} onBlur={validateCollegeHandler} />

        {/* <div
          className={`${classes.control} ${passwordIsValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="college">College Name</label>
          <input
            type="text"
            id="college"
            value={enteredCollege}
            onChange={collegeChangeHandler}
            onBlur={validateCollegeHandler}
          />
        </div> */}
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
