import "./dashboard.css"

export default function dashboard() {


  return (
    <>
        <div className="dashboard">
            <h3 className='h3'>Dashboard</h3>
        </div>

        <form className="form">

            <input id="titleName"
                name="title"
                placeholder="Title"
            />

            <textarea className="textArea"
                name="content"
                placeholder="Take a note..."
                rows= "2"
            />
            <button>
                Enter
            </button>
        </form>
            
    </>
  )
}
