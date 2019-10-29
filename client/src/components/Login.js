import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth"

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
const [state, setState] = useState({username: 'Lambda School', password: 'i<3Lambd4'});


const handleChange = event => {
  setState(
    {...state, //spread in current state
    [event.target.name]: event.target.value}
    //^^ this means the name that you give the input will go here and the value will be what the use has finished typing in on submit of the form.
  );
}; //end of handle change



const login = event => {
  event.preventDefault(); //MAKE SURE THIS IS NEEDED //needed
  axiosWithAuth()
  .post("/login", state) //directing to login passing in state
  .then(response =>{
    // console.log("response inside post", response);
    localStorage.setItem("token", response.data.payload); //setting toke to local storage
    props.history.push("/protected") //this redirects to protected route after successful token retrival.
  })
  .catch(error=> ("error in login axios post", error));
}//Closing my login func




  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      {/* flex wrap this if you get done in time. */}
        <form onSubmit={login}>
            Username:
            <input
            type="text"
            name="username"
            value={state.username}
            onChange={handleChange}
            />
            Password:
            <input
            type="text"
            name="password"
            value={state.password}
            onChange={handleChange}
            />
            <button>Get in there!</button>
        </form>
        
    </>
  );
};

export default Login;
