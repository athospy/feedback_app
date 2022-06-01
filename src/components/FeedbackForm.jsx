import Card from "./shared/Card"
import {useState, useContext, useEffect} from 'react'
import Button from "./shared/Button"
import RatingSelect from "./RatingSelect"
import FeedbackContext from "../context/FeedbackContext"


function FeedbackForm() {
  const [text, setText]=useState('')
  const [isButtonDisabled, setIsButtonDisabled]=useState(true)
  const [message, setMessage]=useState('')
  const [rating, setRating]=useState(10)
  const {addFeedback, feedbackEdit, updateFeedback} = useContext(FeedbackContext)

  useEffect(()=>{
    if(feedbackEdit.edit === true){
      setIsButtonDisabled(false)
      setText(feedbackEdit.item.text);
      setMessage(feedbackEdit.item.message);
      setRating(feedbackEdit.item.rating);
    }
  }, [feedbackEdit])



  const handleTextChange = (e) => {
    if( text === '' ){
      setIsButtonDisabled(true);
      setMessage(null)
    }
    else if( text !== '' && text.trimEnd().length<10 ){
      setIsButtonDisabled(true);
      setMessage('type at least 10 characters')
    }
    else{
      setIsButtonDisabled(false);
      setMessage(null)
    }
    setText(e.target.value)
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    if(text.trim().length > 10){
      const newFeedback={
        text,
        rating
      }
      if(feedbackEdit.edit === true){
        updateFeedback(feedbackEdit.item.id, newFeedback);
      }
      else{
        addFeedback(newFeedback)
      }
      setText('')
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate your service with us?</h2>
        <RatingSelect select={(rating)=>setRating(rating)} />
        <div className="input-group">
          <input onChange={handleTextChange} 
          type="text" 
          placeholder="write a review" 
          value={text}
          />
          <Button type="submit" isDisabled={isButtonDisabled} >Send</Button>
        </div>
        { message && 
        <div className='message'>{message}</div>
        }
      </form>
    </Card>
  )
}

export default FeedbackForm
