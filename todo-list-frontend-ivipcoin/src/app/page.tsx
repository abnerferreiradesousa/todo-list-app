'use client'
import { useRouter } from "next/navigation";
import FormUser from "./components/FormUser";
import { useContext, useState } from "react";
import { Context } from "@/contextAPI/Context";
import './globals.css'

export default function Home() {
  const { setUserInfo } = useContext(Context);
  const [errorMessage, setErrorMessage] = useState("")
  const router = useRouter();

  const handleUser = (email: string, password: string) => {
    fetch('http://localhost:8000/users/login', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
      .then((response) => response.json())
      .then(((data: any) => {
        if (data.message) {
          setErrorMessage(data.message);
          return;
        }
        setUserInfo({
          ...data,
          user: { email }
        });
        router.push('/TaskList');
      }));
  }

  return (
    <div>
      <FormUser
        title="Sign in"
        buttonText="Login"
        linkText="Ainda não possui conta?"
        linkPath="/CreateAccount"
        handleUser={handleUser}
        errorMessage={errorMessage}
      />
    </div>
  )
}
