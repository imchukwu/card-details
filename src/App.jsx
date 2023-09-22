import './App.css'
import desktop from './images/bg-main-desktop.png'
import mobile from './images/bg-main-mobile.png'
import creditback from './images/bg-card-back.png'
import ImageChange from './Components/ImageChange'
import check from './images/icon-complete.svg'
import cardlogo from './images/card-logo.svg'
import { useState } from 'react'

function App() {
  const [creditCardNumber, setCreditCardNumber] = useState('0000 0000 0000 0000');
  const [creditCardHolder, setCreditCardHolder] = useState('Jane Appleseed');
  const [creditCardMonth, setCreditCardMonth] = useState('00');
  const [creditCardYear, setCreditCardYear] = useState('00');
  const [creditCardCVC, setCreditCardCVC] = useState('123');
  const [creditCardNumberError, setCreditCardNumberError] = useState('');
  const [creditCardHolderError, setCreditCardHolderError] = useState('');
  const [creditCardMonthError, setCreditCardMonthError] = useState('');
  const [creditCardYearError, setCreditCardYearError] = useState('');
  const [creditCardCVCError, setCreditCardCVCError] = useState('');
  const [submit, setSubmit] = useState(false);


  
  const handleCreditCardHolderChange = (e) => {
    const inputValue = e.target.value;
    const sanitizedInput = inputValue.replace(/[^a-zA-Z ]/g, '');
    if (!inputValue) {
      setCreditCardHolderError('Can\'t be Blank');
      return;
    }
    setCreditCardHolderError('');
    setCreditCardHolder(sanitizedInput);
  };
  const handleCreditCardYearChange = (e) => {
    const inputValue = e.target.value;
    if (!inputValue) {
      setCreditCardYearError('Can\'t be Blank');
      return;
    }
    setCreditCardYear(inputValue);
    setCreditCardYearError(false);
  };
  const handleCreditCardMonthChange = (e) => {
    const inputValue = e.target.value;
        if (!inputValue) {
      setCreditCardMonthError('Can\'t be Blank');
      return; // Exit the function to prevent further processing
    }
  
    const cleanedInput = inputValue.replace(/\D/g, '');
  
    const validMonth = Math.min(Math.max(parseInt(cleanedInput, 10), 1), 12);
  
    const formattedMonth = validMonth < 10 ? `0${validMonth}` : validMonth.toString();
  
    setCreditCardMonthError('');
  
    setCreditCardMonth(formattedMonth);
  };
  
  
  const handleCreditCardCVCChange = (e) => {
    const inputValue = e.target.value;
    setCreditCardCVC(inputValue);

    // Validate the credit card number format and set an error message
    const cardNumberRegex = /^[0-9]*$/; // Only allow digits (0-9)

    if (!cardNumberRegex.test(inputValue)) {
      setCreditCardCVCError('Wrong format, numbers only');
    } else 
    if (inputValue === '') {
      setCreditCardCVCError('Can\'t be Blank');
    }else if (inputValue.length !== 3) {
      setCreditCardCVCError('Wrong format');
    } else {
      setCreditCardCVCError(''); // Clear the error message if the credit card number is valid
    }
  };

  const handleCreditCardNumberChange = (e) => {
    const inputValue = e.target.value;
    setCreditCardNumber(inputValue);

    // Validate the credit card number format and set an error message
    const cardNumberRegex = /^[0-9]*$/; // Only allow digits (0-9)

    if (!cardNumberRegex.test(inputValue)) {
      setCreditCardNumberError('Wrong format, numbers only');
    } else if (inputValue.length !== 16) {
      setCreditCardNumberError('Wrong format');
    } else {
      setCreditCardNumberError(''); // Clear the error message if the credit card number is valid
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmit(true);
  };

  return (
    <div className="page">
      <div className="left">
        <div className='credit'>
          <div className='front'>
            <div className='card-content'>
              <img src={cardlogo} alt="Card Logo"/>
              <div className='card-details'>
                <h1> {creditCardNumber} </h1>
                <div className='details'>
                  <p>{creditCardHolder}</p>
                  <p> {creditCardMonth}/{creditCardYear}</p>
                </div>
              </div>
            </div>
          </div>
          <img src={creditback} alt="Credit Card Back" className='back'/>
          <div className='card-back'>
            <p>{creditCardCVC}</p>
          </div>
        </div>
        <ImageChange smallImageSrc={mobile} largeImageSrc={desktop}/>
      </div>
      {submit ? (
        <div className='right' style={{display:"flex", flexDirection:"column", gap:"1rem"}}>
          <img src={check}/>
          <h1 style={{fontSize:"28px", fontFamily:"Space Grotesk", textTransform:"uppercase",color:'rgba(33, 9, 47, 1)'}}>Thank You</h1>
          <p style={{fontSize:"18px", fontFamily:"Space Grotesk",color:'rgba(143, 134, 148, 1)'}}>We've added your card details</p>
         <a href='/'><button>Confirm</button></a>
        </div>
      ) : (
        <div className='right'>
          <div onSubmit={handleSubmit}>
          <form>
          <div className='form-item'>
            <label>Cardholder Name</label>
            <input type='text' placeholder='e.g. Jane Appleseed' onChange={handleCreditCardHolderChange}/>
            {<p className='error'>{creditCardHolderError}</p>}
          </div>
          <div className='form-item'>
            <label> Card Number</label>
            <div>
            <input
  type='text'
  placeholder='e.g. 1234 5678 9123 0000'
  minLength={16}
  maxLength={16}
  onChange={handleCreditCardNumberChange}
  style={creditCardNumberError?{border:"1px solid red"}:{}}
/>            {<p className='error'>{creditCardNumberError}</p>}
       
            </div>
         
          </div>
          <div className='date-cvc'>
            <div className='date'>
              <label>Exp. Date (MM/YY)</label>
              <div className="dates">
                <div>
                <input type='numbers' placeholder='MM' required onChange={handleCreditCardMonthChange} minLength={1} maxLength={2}  style={creditCardMonthError?{border:"1px solid red"}:{}}/>
                
                </div>
                <input type='numbers' placeholder='YY' onChange={handleCreditCardYearChange} minLength={2} maxLength={2} style={creditCardYearError?{border:"1px solid red"}:{}}/>
              </div>
            </div>
            <div className='cvc' style={{display:"flex",flexDirection:"column", justifyContent:"center"}}>
              <label> CVC</label>
              <input type='text' placeholder=' e.g. 123'  minLength={3} maxLength={3} onChange={handleCreditCardCVCChange}
              style={creditCardCVCError?{border:"1px solid red"}:{}}/>
             
            </div>
          </div>
          <div className='date-cvc' style={{marginTop:"-2vh"}}>
          {<p className='error'>{creditCardMonthError||creditCardYearError}</p>}
          {<p className='error'style={{marginLeft:"6.5vw"}} >{creditCardCVCError}</p>}
          </div>
          <button type="submit" onSubmit={handleSubmit}>Confirm</button>
          </form>
        </div>
        </div>
      )}
    </div>
  );
}

export default App;
