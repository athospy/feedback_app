import { createContext, useState } from "react";
import { v4 as uuidv4 } from 'uuid'

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
  const [feedback, setFeedback] = useState([
    {
      id: 1,
      rating: 10,
      text: 'primero test rat 1',
    },
    {
      id: 2,
      rating: 9,
      text: 'segudno test rat 2',
    },
    {
      id: 3,
      rating: 8,
      text: 'terceo test rat 3',
    },
  ])

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false
  })

  //set item to be updated
  const editFeedback = (item)=>{
    setFeedbackEdit({
      item,
      edit: true
    })
  }

  const handleDelete=(id)=>{
    if( window.confirm('Quiere borrar?') ){
      const newFeedback = feedback.filter((item)=>{
        return item.id !== id
      })
      setFeedback(newFeedback)
    }

  }

  const addFeedback=(newFeedback)=>{
    newFeedback.id=uuidv4();
    //console.log(newFeedback);
    //setFeedback(...feedback, newFeedback)
    setFeedback([newFeedback, ...feedback])
  }

  const updateFeedback = (id, updItem)=>{
    //console.log(id, updItem);
    setFeedback(feedback.map((item)=>{
      if(item.id === id){
        return {...item, ...updItem}
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
      updateFeedback
    }}
  >
    {children}
  </FeedbackContext.Provider>
}

export default FeedbackContext