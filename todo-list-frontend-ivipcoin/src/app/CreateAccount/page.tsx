'use client'
import { useContext, useState } from "react";
import FormUser from "../components/FormUser";
import { Context } from "@/contextAPI/Context";
import { useRouter } from "next/navigation";
import '../globals.css'
import { TODO_API_URI } from "../global";

const CreateAccount = () => {
  const { setUserInfo } = useContext(Context);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();

  const handleUser = async (email: string, password: string) => {
    setErrorMessage("");

    try {
      const response = await fetch(`${TODO_API_URI}/users`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

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
      setErrorMessage('Um erro ocorreu ao tentar criar suas conta. Tente novamente mais tarde.');
    }
  }

  return (
    <div>
      <FormUser
        title="Registre-se"
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
