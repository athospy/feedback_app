import { createContext, useState, useEffect } from "react";

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [feedback, setFeedback] = useState([])

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false
  })

  useEffect( ()=>{
    fetchFeedback();
  }, [] )


  //fetch feedback
  const fetchFeedback = async () =>{
    const response = await fetch(`/feedback?_sord=id&_order=desc`)
    const data = await response.json()
    setFeedback(data)
    setIsLoading(false)
  }

  //set item to be updated
  const editFeedback = (item)=>{
    setFeedbackEdit({
      item,
      edit: true
    })
  }

  const handleDelete=async(id)=>{
    if( window.confirm('Quiere borrar?') ){
      await fetch(`/feedback/${id}`, {
        method: 'delete',
      })

      const newFeedback = feedback.filter((item)=>{
        return item.id !== id
      })
      setFeedback(newFeedback)
    }

  }

  const addFeedback = async(newFeedback)=>{
    const response = await fetch(`/feedback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newFeedback)
    })

    const data =  await response.json()
    setFeedback([data, ...feedback])
  }

  const updateFeedback = async (id, updItem)=>{
    //console.log(id, updItem);
    const response=await fetch(`/feedback/${id}`, {
      method: 'PUT',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updItem)
    })

    const data =  await response.json()

    setFeedback(feedback.map((item)=>{
      if(item.id === id){
        return {...item, ...data}
      }
      return item
    }))
  }



  return <FeedbackContext.Provider
    value={{
      feedback,
      feedbackEdit,
      editFeedback,
      handleDelete,
      addFeedback,
      updateFeedback,
      isLoading
    }}
  >
    {children}
  </FeedbackContext.Provider>
}

export default FeedbackContext