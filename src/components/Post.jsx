//import {useParams} from 'react-router-dom'
import {Navigate, useNavigate, Routes, Route} from 'react-router-dom'


function Post() {
  //const params=useParams()
  const status = 200

  const navigate = useNavigate()

  if(status === 404) {
    return <Navigate to='/notfound' />
  }

  const onClick = ()=>{
    console.log('hello');
    navigate('/about')
  }


  return (
    <div>
      {/* <h1>Post id: {params.id} </h1>
      <h1>Post name: {params.name} </h1> */}
      <h1>Post</h1>
      <button onClick={onClick}>Click</button>
      <Routes>
        <Route path='/show' element={<h1>hello</h1>} />
      </Routes>
    </div>
  )
}

export default Post
