'use client';
import SignIn,{FormContainer} from "./login/SignIn";
import { useState } from "react";
import SignUp from "./login/Signup";

export default function Home() {
  const [isSignIn, setIsSignIn] = useState(true);
  const toggleAuthMode = () => {
    setIsSignIn((prev) => !prev);
  };

  return (
    <FormContainer>
      {isSignIn ? <SignIn onClick={toggleAuthMode}/> : <SignUp onClick={toggleAuthMode}/>}
    </FormContainer>
  );
}
