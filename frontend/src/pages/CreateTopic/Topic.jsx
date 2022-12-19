import "./topic.css"
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function Topic(props) {

  const [blocks, setBlocks] = useState([])

  const [next, setNext] = useState(false)

  const [understanding, setUnderstanding] = useState({})

    const [note, setNote] = useState({ //title and body
        title: "",
        content: ""
    });

    let nextPage=(event)=>{
          let bodyArray = note.content.split(/[,}?.{;/)(:|-]+/)
         
          let filterArr = []
          for (let txt of bodyArray) {
              if (txt.trim().length !== 0) filterArr.push(txt.trim())
          }
          setBlocks(filterArr)
          setNext(true)
  }

  let selectRating=(data, block)=>{
    // setRating(data)
    understanding[block] = data
    setUnderstanding(understanding)
    // console.log(understanding);
}

    function submitNote(event) {

        setNote({
          title: "",
          content: ""
        });
        event.preventDefault();
    }

    
    function handleChange(event) { //title body
        const { name, value } = event.target;
    
        setNote(prevNote => {
          return {
            ...prevNote,
            [name]: value
          };
        });
      }



      const  handleSubmit = async () => {
        console.log("called")
        let title= note.title
        let body = note.content
        let user = test
        let data = { title, body, user, understanding }
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
                    } else {
                        alert(response.message)
                    }
                }))
    }

  return (
    <>
    
    {

    !next ? 
    <>
    <div className="topic">
        <h3 className='h3'>Write Your Content</h3>
    </div>

    <form className="form">

        <input id="titleName"
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
        />

        <textarea className="textArea"
            name="content"
            onChange={handleChange}
            value={note.content}
            placeholder="Take a note..."
            rows= "2"
        />

        <button onClick={nextPage}>
            Next
        </button>
    </form>   
    </>
    : 
    <>
    <div className="topic">
        <h3 className='h3'>slect your understanding</h3>
    </div>
    <div className="understanding">
        <h3 className="blocks">Your Blocks</h3>
        <h3 className="yourUnderstanding">Your Understanding</h3>
    </div>

    {blocks.map(x =>
                  <div className='mt-2 bg-light container'>
                      <div className="card">
                          
                              <label className="form-label" >{x}</label>
                              <select class="form-select-sm" value={understanding.x} onChange={e => selectRating(e.target.value, x)}>
                                  <option value='0'>Select...</option>
                                  <option value="4">UNDERSTOOD</option>
                                  <option value="3">SOMEWHAT UNDERSTOOD</option>
                                  <option value="2">NOT CLEAR</option>
                                  <option value="1">WHAT RUBBISH</option>
                              </select>
                      </div>
                  </div>
              )}
    

    <button onClick={handleSubmit}>submit</button>
    </>
}



</>
  )
}
