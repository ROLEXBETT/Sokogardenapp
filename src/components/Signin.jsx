import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';


const Signin = () => {

  //Define the two hooks for capturing /store the user input
const[email, setEmail] = useState("");
const[password, setPassword] = useState("");

//Declare the three additiomal hooks
const [loading, setLoading] = useState("");
const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

  //below we have the useNavigate hook to redirect us to another page on successful login/singin
  const navigate = useNavigate()

  // below is the function to handle the signin action
  const handleSubmit = async (e) =>{
    // prevent the site from loading
    e.preventDefault()

    //update the loading hook with message
    setLoading("Please wait while we authenticate your account...")

    try{
    //create a formdata object that wikll hold the emaol and the bpassword
    const formdata = new FormData()

    //Insert/append the email and the password on the formData created.
    formdata.append("email", email);
    formdata.append("password", password)

    //Interact with axios module that will help you connect to the https protocal as you pass in your URL and the data.
    const response = await axios.post("https://rolexbett.alwaysdata.net/api/signin", formdata);

    // set the loading hook back to default
    setLoading("");

    // Check whether the user exist as part of your response from the API
    if (response.data.user){
      //if user is there, definetly the details entered during signin are correct
      // setSuccess("Login successful")

       // Store user details in local storage
    localStorage.setItem("user", JSON.stringify(response.data.user));

      // it is successful, let a person get redirected to another page
      navigate("/");
    
    }
    else{
      //user is not found,that the credentials entered on the form are incorrect
      setError("Login Failed. Please try again...")
    }
  }
    catch(error){
      //set loading back to default
      setLoading("")

      //Update the error , hook with a message
      setError("Ooops, something went wrong. Try again..")

    }

  }
  return (
    <div className='row justify-content-center mt-4'>
      <div className="col-md-6 card shadow p-4">
        <h1 className="text-primary">signin</h1>
        <h5 className="text-info">{loading} </h5>
        <h3 className="text-success">{success}</h3>
        <h4 className="text-danger">{error}</h4>

        <form onSubmit={handleSubmit}>
          <input type="email" 
          placeholder='Enter the email address here...'
          className='form-control'
          required 
          value={email}
          onChange={(e) => setEmail(e.target.value)}/> <br />

          {/* {email} */}

          <input type="password" 
          placeholder='Enter the password here...'
          className='form-control'
          required 
          value={password}
          onChange={(e) => setPassword(e.target.value)}/> <br />

          {/* {password} */}

          <input type="submit" 
          value="Signin"
          className='btn btn-primary'/> <br /><br />

          Don't have an account? <Link to={'/signup'}>Register</Link>
        </form>
      </div>
      
    </div>
  )
}

export default Signin;
