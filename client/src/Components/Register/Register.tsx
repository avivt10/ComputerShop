import "./Register.css";
import CloseIcon from "@mui/icons-material/Close";
import {useState} from "react";
import DoneSharpIcon from "@mui/icons-material/DoneSharp";
import { useAuthContext } from "./../../Shared/context/auth-context";
import { register } from './../../services/user.service';
import Swal from 'sweetalert2'


export type RegisterProps = {
  switchToLogin: () => void;
  onClose: () => void;
};

function Register({ switchToLogin, onClose }: RegisterProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValidFirstName, setIsValidFirstName] = useState(false);
  const [isValidLastName, setIsValidLastName] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const { setIsLogin, setUserName, setToken,setRole } = useAuthContext();
  
  const onFirstNameChanged = (value:string) => {
    setFirstName(value);
    const regexFirstName = /^[a-zA-Z\s]{2,10}$/;
    const isValid = regexFirstName.test(value);
    setIsValidFirstName(isValid);
  }

  const onLastNameChanged = (value:string) => {
    setLastName(value);
    const regexLastName = /^[a-zA-Z\s]{2,10}$/;
    const isValid = regexLastName.test(value);
    setIsValidLastName(isValid);
  }


  const onEmailChanged = (value:string) => {
    setEmail(value);
    const regexEmail = new RegExp("[a-z0-9]+@[a-z]+.[.]{1}[a-z]{2,3}");
    const isValid = regexEmail.test(value);
    setIsValidEmail(isValid);
  }
  const onPasswordChanged = (value: string) => {
    setPassword(value);
    const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    const isValid = regexPassword.test(value);
    setIsValidPassword(isValid);
  };

  const sendDataToServer = async () => {
    const data = {
      firstName: firstName,
      lastName: lastName,
      role:"user",
      email: email,
      password: password,
    };
    try {
       const res = await register(data)
      if (res) {
        setRole(res.role);
        window.localStorage.setItem("token", res.token);
        setToken(res.token);
        setIsLogin(true);
        setUserName(firstName);
        onClose();
        Swal.fire(
          'Good job!',
          'Registration has been successfully completed!',
          'success'
        )
            }
    } catch (error: any) {
      alert(error.response.data.message);
    }
  };

  const createUser = () => {
    const isValidAll =
      isValidFirstName && isValidLastName && isValidEmail && isValidPassword;
    isValidAll ? sendDataToServer() : 
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Register failed!',
    })
  };

  return (
    <div className="register-main-container">
      <button onClick={onClose} className="close-button">
        <CloseIcon />
      </button>
      <div className="register-form-container">
        <h1 style={{ textAlign: "center" }}> Register</h1>
        <h4 className="text-form-h4"> First Name</h4>
        <div style={{ display: "flex" }}>
          <input
            className="login-input"
            type="text"
            placeholder="First Name"
            onChange={(e) => onFirstNameChanged(e.target.value)}
          />
          {isValidFirstName ? (
            <DoneSharpIcon style={{ color: "#4caf50", marginTop: "5px" }} />
          ) : (
            <CloseIcon style={{ color: "red",marginTop:"5px" }} />
          )}
        </div>

        <h4 className="text-form-h4"> Last Name</h4>
        <div style={{ display: "flex" }}>
          <input
            className="login-input"
            type="text"
            placeholder="Last Name"
            onChange={(e) => onLastNameChanged(e.target.value)}
          />

          {isValidLastName ? (
            <DoneSharpIcon style={{ color: "#4caf50", marginTop: "5px" }} />
          ) : (
            <CloseIcon style={{ color: "red",marginTop:"5px"}} />
          )}
        </div>
        <h4 className="text-form-h4"> Email </h4>
        <div style={{ display: "flex" }}>
          <input
            className="login-input"
            type="text"
            placeholder="Email"
            onChange={(e) => onEmailChanged(e.target.value)}
          />
          {isValidEmail ? (
            <DoneSharpIcon style={{ color: "#4caf50", marginTop: "5px" }} />
          ) : (
            <CloseIcon style={{ color: "red",marginTop:"5px" }} />
          )}
        </div>
        <h4 className="text-form-h4"> Password</h4>
        <div style={{ display: "flex" }}>
          <input
            className="register-input"
            type="password"
            placeholder="Password"
            onChange={(e) => onPasswordChanged(e.target.value)}
          />
          {isValidPassword ? (
            <DoneSharpIcon style={{ color: "#4caf50", marginTop: "5px" }} />
          ) : (
            <CloseIcon style={{ color: "red",marginTop:"5px" }} />
          )}
        </div>
        <button className="button-register" onClick={createUser}>
          {" "}
          Register{" "}
        </button>
        <button className="button-backToLogin" onClick={switchToLogin}>
          {" "}
          Back To Login{" "}
        </button>
      </div>
    </div>
  );
}

export default Register;
