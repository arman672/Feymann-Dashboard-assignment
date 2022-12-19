import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './style.css'

const Dashboard = () => {

    let navigate = useNavigate()

    useEffect(() => { getContent() }, [])

    let [content, setContent] = useState([])

    async function getContent() {
        let username = await localStorage.getItem("name")
        let user = JSON.parse(username)   
        let alldata = await fetch(`http://localhost:4000/getData/${user}`)
        alldata = await alldata.json()
        setContent(alldata.data)
    }

    let Content = () => {
        navigate("/Content")
    }

  return (
      <div className="h3">
          <div>
              <div >
                      <h1>DASHBOARD</h1>
                      <button onClick={Content} class="formBtn" type="button">Add New Content</button>
              </div>

              {
              content.map(x=>
                        <div className='note'>
                            <h1>{x.title}</h1>
                            <p>{x.percentage}</p>
                        </div>
                )}
              </div>
         
    </div>
  )
}

export default Dashboard