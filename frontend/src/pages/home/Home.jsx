import "./home.css"

export default function Home() {
  return (
    <>
        <div className="home">
            <h3 className='h3'>Welcoome to feynman dashboard</h3>
        </div>
        <div>
            <form className="form">
                <label className="formLbl">Enter Your UserName Below</label>
                <input className="formText" type= "text" placeholder="userName">
                </input>
                <button type="button" className="formBtn">
                    Enter
                </button>
            </form>
        </div>
    </>
  )
}
