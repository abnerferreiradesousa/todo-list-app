'use client'
import { useRouter } from "next/navigation";
import FormUser from "./components/FormUser";
import { useContext, useState } from "react";
import { Context } from "@/contextAPI/Context";
import { TODO_API_URI } from "./global";
import './globals.css';


export default function Home() {
  const { setUserInfo } = useContext(Context);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();

  const handleUser = async (email: string, password: string) => {
    try {
      const response = await fetch(`${TODO_API_URI}/users/login`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data: any = await response.json();

      if (data.message) {
        setErrorMessage(data.message);
      } else {
        setUserInfo({
          ...data,
          user: { email }
        });
        localStorage.setItem('userInfo', JSON.stringify({
          email,
          token: data.token
        }));
        router.push('/TaskList');
      }
    } catch (error: any) {
      console.error('Error while logging in:', error);
      setErrorMessage('Tente novamente mais tarde! ' + error.message);
    }
  }

  return (
    <div>
      <FormUser
        title="Sign in"
        buttonText="Login"
        linkText="Don't have an account yet?"
        linkPath="/CreateAccount"
        handleUser={handleUser}
        errorMessage={errorMessage}
      />
    </div>
  );
}
