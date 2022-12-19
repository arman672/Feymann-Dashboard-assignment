import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './style.css'

const Home = () => {

  useEffect(() => { clearLocalStorage() }, [])
  window.onpopstate = () => {
    navigate("/");
  }
    const [username, setUsername] = useState("")
    let navigate = useNavigate()

    const  submitButton = async ()=>{
        await fetch("http://localhost:4000/enterDashboard",{
          method:'post',
          body:JSON.stringify({username}),
          headers:{
            'Content-Type' : 'application/json'
          }
        })
          .then(res => res.json()
            .then((response) => {
              console.log(response);
              if (response.status === true) {
                localStorage.setItem("name", JSON.stringify(username))
                navigate("/dashboard")

              } else {
                alert(response.message)
              }
            }))
    }

    let createUser = () =>{
      navigate("/createuser")
    }

    function submitAction(e) {
        e.preventDefault()
    }

  let clearLocalStorage =()=>{
    localStorage.clear()
  }

  return (
    <div>
      <div class="h3">
          <h3>Feynman Dashboard</h3>
      </div>
      <div >
        <div>
          <form onSubmit={submitAction}>
            <div>
              <label>Enter your username: </label>
              <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
              <button onClick={submitButton} type="button" className="button">Continue</button>
              <button onClick={createUser} type="button" className="button">Create User</button>
            </div>
          </form>
        </div>
      </div>
     
      
</div>
  )
}

export default Home