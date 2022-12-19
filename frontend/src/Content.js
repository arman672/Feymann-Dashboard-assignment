import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Content = () => {

    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [contents, setContents] = useState([])
    const [next, setNext] = useState(false)

    const [understanding, setUnderstanding] = useState({})


    let nextPage=()=>{
        if (title.trim().length === 0) alert("Title cannot be empty")
        else if (body.trim().length === 0)  alert("Content cannot be empty")
        else{
            let bodyArray = body.split(/[,}?.{;/)(:|-]+/)
            let filterArr = []
            for (let txt of bodyArray) {
                if (txt.trim().length !== 0) filterArr.push(txt.trim())
            }
            setContents(filterArr)
            setNext(true)
        }
    }

    let selectRating=(data, block)=>{
        understanding[block] = data
        setUnderstanding(understanding)
    }

    let navigate = useNavigate()
    const submitButton = async () => {
        let username = await localStorage.getItem("name")
        let user = JSON.parse(username)
        let data = { title, body, user, understanding }
        console.log(data);
        await fetch("http://localhost:4000/createContent", {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json()
                .then((response) => {
                    console.log(response);
                    if (response.status === true) {
                        alert(response.message)
                        navigate("/dashboard")

                    } else {
                        alert(response.message)
                    }
                }))
    }
    function submitAction(x) {
        x.preventDefault()
    }

  return (
    <div>
       {
        !next ? 
              <>
                  <div className="Content">
                      <h1>Write Your Content Below</h1>
                      <form className="form" onSubmit={submitAction}>
                          <div className="title">
                              <input type="text" placeholder="Title"
                                  value={title} onChange={(e) => setTitle(e.target.value)} />
                          </div>
                          <div className="body">
                                  <textarea placeholder="Start writing your content here" rows="8"
                                  value={body} onChange={(e) => setBody(e.target.value)}></textarea>
                          </div>
                          <div className="submit">
                              <button onClick={nextPage} type="submit" className="submit Button">{"Continue"}</button>
                          </div>
                      </form>
                  </div>
              </>
                :
             <div>

                      <div className="container">
                              <div className="h3">
                                  <h3>Please select your level of level of understanding from each block</h3>
                              </div>
                      </div>

              {contents.map(content =>
                  <>
                        <div className="contents">
                              <label>{content}</label>
                              <select class="select" value={understanding.content} onChange={e => selectRating(e.target.value, content)}>
                                  <option value='0'>Select...</option>
                                  <option value="4">UNDERSTOOD</option>
                                  <option value="3">SOMEWHAT UNDERSTOOD</option>
                                  <option value="2">NOT CLEAR</option>
                                  <option value="1">WHAT RUBBISH</option>
                              </select>
                      </div>
                  </>
              )}

                      <div>
                          <button onClick={submitButton} class="button" type="button">Calculate Percentage</button>
                      </div>

             </div> 
            }
    </div>
  )
}

export default Content