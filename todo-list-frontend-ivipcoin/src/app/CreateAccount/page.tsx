'use client'
import { useContext, useState } from "react";
import FormUser from "../components/FormUser";
import { IUserWithToken } from "../types/IUser";
import { Context } from "@/contextAPI/Context";
import { useRouter } from "next/navigation";
import '../globals.css'

const CreateAccount = () => {
  const { setUserInfo } = useContext(Context);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleUser = (email: string, password: string) => {
    fetch('http://localhost:8000/users', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
      .then((response) => response.json())
      .then(((data: any) => {
        setUserInfo(data);
        if (data.message) {
          setErrorMessage(data.message);
          return;
        } else {
          setUserInfo(data);
          router.push('/TaskList');
        }
      }));



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