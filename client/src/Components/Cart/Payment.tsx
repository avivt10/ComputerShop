import React, { useState } from "react";
import { useAuthContext } from "../../Shared/context/auth-context";
import "./Payment.css";
import Swal from "sweetalert2";
import DoneSharpIcon from "@mui/icons-material/DoneSharp";
import CloseIcon from "@mui/icons-material/Close";

const Payment = () => {
  const { isLogin,token } = useAuthContext();
  const [isValidCardNumber,setIsValidCardNumber] = useState(false);
  const [isValidMonth,setIsValidMonth] = useState(false);
  const [isValidYear,setIsValidYear] = useState(false);
  const [isValidCvv,setIsValidCvv] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isValidFirstName, setIsValidFirstName] = useState(false);
  const [isValidLastName, setIsValidLastName] = useState(false);
  const [isValidCountry,setIsValidCountry] = useState(false);
  const [isValidCity, setIsValidCity] = useState(false);
  const [isValidZipCode, setIsValidZipCode] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPhone, setIsValidPhone] = useState(false);

  const onFirstNameChanged = (value: string) => {
    setFirstName(value);
    const regexFirstName = /^[a-zA-Z\s]{2,10}$/;
    const isValid = regexFirstName.test(value);
    setIsValidFirstName(isValid);
  };

  const onLastNameChanged = (value: string) => {
    setLastName(value);
    const regexLastName = /^[a-zA-Z\s]{2,10}$/;
    const isValid = regexLastName.test(value);
    setIsValidLastName(isValid);
  };

  const onCountryChanged = (value: string) => {
    setCountry(value);
    const regexCountry = /^[a-zA-Z\s]{2,15}$/;
    const isValid = regexCountry.test(value);
    setIsValidCountry(isValid);
  };


  const onCityChanged = (value: string) => {
    setCity(value);
    const regexCity = /^[a-zA-Z\s]{2,10}$/;
    const isValid = regexCity.test(value);
    setIsValidCity(isValid);
  };

  const onZipCodeChanged = (value: string) => {
    setZipCode(value);
    const regexZipCode = /^[0-9]{2,6}$/;
    const isValid = regexZipCode.test(value);
    setIsValidZipCode(isValid);
  };

  const onEmailChanged = (value: string) => {
    setEmail(value);
    const regexEmail = new RegExp("[a-z0-9]+@[a-z]+.[.]{1}[a-z]{2,3}");
    const isValid = regexEmail.test(value);
    setIsValidEmail(isValid);
  };

  const onPhoneChanged = (value: string) => {
    setPhone(value);
    const regexPhone = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
    const isValid = regexPhone.test(value);
    setIsValidPhone(isValid);
  };


  const checkValidData = () => {
    const isValidAll =
      isValidFirstName &&
      isValidLastName &&
      isValidCity &&
      isValidZipCode &&
      isValidEmail &&
      isValidPhone &&
      isValidCardNumber &&
      isValidMonth &&
      isValidYear &&
      isValidCvv;
      
    isValidAll ? 
    Swal.fire(
      'The purchase was made successfully!',
      'Thank you and goodbye!',
      'success'
    )
    :  Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Purchase failed!',
    })
    setFirstName("")
    setLastName("")
    setCity("")
    setZipCode("")
    setEmail("")
    setPhone("")
    }

  if (isLogin && token) {
    return (
      <div className="payment-container">
        <div className="card-information-main-container">
          <div className="card-information-container">
            <h1 className="h1-style-card"> Card information </h1>
            <h6 className="h6-style-card"> Enter credit card </h6>
            <div className="card-payment-container">
              <img
                className="img-visa"
                src="https://www.electricalexamseminars.com/wp-content/uploads/2014/07/major-Credit-Card-Logos-1024x211.png"
                alt="img-visa-card"
                id="number-card"
              />
              <h5
                style={{
                  marginLeft: "1.2rem",
                  fontSize: "9px",
                  color: "#9e9e9e",
                }}
              >
                {" "}
                Card number{" "}
              </h5>
 
              <input
                type="password"
                placeholder="0000 0000 0000 0000"
                className="inputs-number-card"
                maxLength={16}
                onChange={(e) => setIsValidCardNumber(e.target.value.length === 16)}
              />
              
              <div className="line-under-card-number"></div>

              <div style={{ display: "flex" }}>
                <div>
                  <h5
                    style={{ color: "rgb(158, 158, 158)", marginLeft: "1rem" }}
                  >
                    {" "}
                    Month and year{" "}
                  </h5>
                  <div className="month-and-year-inputs-container">
                    <input
                      placeholder="00"
                      className="inputs-month-and-year"
                      maxLength={2}
                      onChange={(e)=> setIsValidMonth( e.target.value.length === 2)}
                    />
                    <h6 className="h6-payment"> / </h6>
                    <input
                      placeholder="00"
                      className="inputs-month-and-year"
                      maxLength={2}
                      onChange={(e)=> setIsValidYear( e.target.value.length === 2)}
                    />
                  </div>
                </div>

                <div className="cvv-container">
                  <h5 style={{ marginLeft: "1rem" }}> CVV code </h5>
                  <input
                    placeholder="***"
                    className="inputs-cvv"
                    maxLength={3}
                    type="password"
                    onChange={(e)=> setIsValidCvv( e.target.value.length === 3)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="personal-information-main-container">
          <div className="personal-information-container">
            <h1 className="h1-style-personal"> Personal information </h1>
            <div style={{ display: "flex" ,marginLeft:"15px"}}>
              <input
                placeholder="First name"
                value={firstName}
                onChange={(e) => onFirstNameChanged(e.target.value)}
                className="inputs-personal-information"
              />
              {isValidFirstName ? (
                <DoneSharpIcon style={{ color: "#4caf50", marginTop: "9px" }} />
              ) : (
                <CloseIcon style={{ color: "red", marginTop: "15px" }} />
              )}
            </div>
            <div style={{ display: "flex" ,marginLeft:"15px"}}>
              <input
                placeholder="Last name"
                  value={lastName}
                onChange={(e) => onLastNameChanged(e.target.value)}
                className="inputs-personal-information"
              />
              {isValidLastName ? (
                <DoneSharpIcon style={{ color: "#4caf50", marginTop: "9px"}} />
              ) : (
                <CloseIcon style={{ color: "red", marginTop: "15px" }} />
              )}
            </div>
            <div style={{display:"flex",marginLeft:"15px"}}>
              <input 
               placeholder="Country"
               value={country}
               onChange={(e) => onCountryChanged(e.target.value)}
               className="inputs-personal-information"/>
               {
                isValidCountry ?    <DoneSharpIcon style={{ color: "#4caf50", marginTop: "9px" }} />
                :
                <CloseIcon style={{ color: "red", marginTop: "13px" }} />
               }
            </div>
            
            <div style={{ display: "flex",marginLeft:"15px" }}>
              <input
                placeholder="City"
                value={city}
                onChange={(e) => onCityChanged(e.target.value)}
                className="inputs-personal-information"
              />
              {isValidCity ? (
                <DoneSharpIcon style={{ color: "#4caf50", marginTop: "9px" }} />
              ) : (
                <CloseIcon style={{ color: "red", marginTop: "13px" }} />
              )}
            </div>

            <div style={{ display: "flex",marginLeft:"15px" }}>
              <input
                placeholder="Zip code"
                value={zipCode}
                onChange={(e) => onZipCodeChanged(e.target.value)}
                className="inputs-personal-information"
              />
              {isValidZipCode ? (
                <DoneSharpIcon style={{ color: "#4caf50", marginTop: "9px" }} />
              ) : (
                <CloseIcon style={{ color: "red", marginTop: "15px" }} />
              )}
            </div>
            <div style={{ display: "flex",marginLeft:"15px" }}>
              <input
                placeholder="E-mail"
                value={email}
                onChange={(e) => onEmailChanged(e.target.value)}
                className="inputs-personal-information"
              />
              {isValidEmail ? (
                <DoneSharpIcon style={{ color: "#4caf50", marginTop: "9px" }} />
              ) : (
                <CloseIcon style={{ color: "red", marginTop: "15px" }} />
              )}
            </div>
            <div style={{ display: "flex",marginLeft:"15px" }}>
              <input
                placeholder="Phone number"
                value={phone}
                onChange={(e) => onPhoneChanged(e.target.value)}
                className="inputs-personal-information"
              />
              {isValidPhone ? (
                <DoneSharpIcon style={{ color: "#4caf50", marginTop: "9px" }} />
              ) : (
                <CloseIcon style={{ color: "red", marginTop: "15px" }} />
              )}
            </div>
            <button className="button-pay" onClick={checkValidData}>
              Pay
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <div className="must-login-text">You must log in</div>;
};

export default Payment;
