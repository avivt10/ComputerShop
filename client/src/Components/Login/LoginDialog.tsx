import React from "react";
import Login from "./Login";
import "./LoginDialog.css"


export type LoginDialogProps = {
    onClose : () => void;
    open: boolean;
}

const LoginDialog = ({onClose,open} : LoginDialogProps) => {
    if(!open){
        return null;
    }
  return (
    <div className="modal"  >
      <Login onClose={onClose}/>
    </div>
  );
};

export default LoginDialog;
