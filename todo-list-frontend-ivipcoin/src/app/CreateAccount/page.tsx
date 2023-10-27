'use client'
import { useContext, useState } from "react";
import FormUser from "../components/FormUser";
import { Context } from "@/contextAPI/Context";
import { useRouter } from "next/router";
import '../globals.css'

const CreateAccount = () => {
  const { setUserInfo } = useContext(Context);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();

  const handleUser = async (email: string, password: string) => {
    setErrorMessage("");

    try {
      const response = await fetch('http://localhost:8000/users', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      if (data.message) {
        setErrorMessage(data.message);
      } else {
        setUserInfo(data);
        localStorage.setItem('userInfo', JSON.stringify({
          email,
          token: data.token
        }));
        router.push('/TaskList');
      }
    } catch (error) {
      console.error('Error creating account:', error);
      setErrorMessage('An error occurred while creating the account. Please try again later.');
    }
  }

  return (
    <div>
      <FormUser
        title="Sign up"
        buttonText="Criar Conta"
        linkText="Já possui conta?"
        linkPath="/"
        handleUser={handleUser}
        errorMessage={errorMessage}
      />
    </div>
  )
}

export default CreateAccount;
