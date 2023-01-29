import { useState } from "react";
import Register from "../Register/Register";
import "./Login.css";
import CloseIcon from "@mui/icons-material/Close";
import { useAuthContext } from "../../Shared/context/auth-context";
import { login } from "../../services/user.service";
import Swal from 'sweetalert2'
import { ClipLoader } from "react-spinners";


export type LoginProps = {
  onClose: () => void;
};
const Login = ({ onClose }: LoginProps) => {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const {setIsLogin,setUserName,setToken,setUserId} = useAuthContext();

  const handleSwitchToRegister = () => {
    setIsRegisterMode(!isRegisterMode);
  };

      const sendToLogin = async()=>{
      try{
        const res = await login(email,password);
        if(res)
        {
            window.localStorage.setItem("userData",JSON.stringify({ token : res.token,
              firstName : res.firstName,id:res.id}))
            setToken(res.token)
            setUserName(res.firstName)
            setUserId(res.id)
            setIsLogin(true)
            onClose()
            Swal.fire(
              'Good job!',
              'Login success!',
              'success'
            )
        }
      
      }catch{

      }
  }

  const checkValidation = ()=> {
   
      if(!email || !password)
      {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'missing parameters!',
        })
      }
      else
      {
        sendToLogin()
      }

  }

  if (isRegisterMode) {
    return (
      <div>
        <Register
          switchToLogin={() => setIsRegisterMode(false)}
          onClose={onClose}
        />
      </div>
    );
  }
  return (
    <div className="login-main-container">
      <button onClick={onClose} className="close-button">
        <CloseIcon />
      </button>
      <div className="login-form-container">
        <h1 style={{ textAlign: "center" }}> Login </h1>
        <h4 className="text-form-h4"> Email Address</h4>
        <input className="login-input" type="text" placeholder="Email" onChange={(e)=> setEmail(e.target.value)}/>
        <h4 className="text-form-h4"> Password</h4>
        <input className="login-input" type="password" placeholder="Password" onChange={(e)=> setPassword(e.target.value)}/>
        <button className="button-submit-login" onClick={checkValidation}> Login </button>
        <button className="continued-register" onClick={handleSwitchToRegister}>
          Register
        </button>
      </div>
    </div>
  );
};

export default Login;
