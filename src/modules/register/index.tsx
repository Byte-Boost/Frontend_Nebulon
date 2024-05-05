import React, { useState } from "react";
import { Button, Label, TextInput, Card } from "flowbite-react";
import instance from '@/scripts/requests/instance';

interface Seller {
  nome: string;
  cpf: string;
  username: string;
  password: string;
}
const UserFormCard = () => {
  const [user, setUser] = useState<Seller>({
    nome: '',
    cpf: '',
    username: '',
    password: ''
  });
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    instance.post('/account/register',{
      name: user.nome,
      cpf: user.cpf,
      username: user.username,
      password: user.password
    })
    .then(function(response){
      setSuccessMessage("Usuario cadastrado com sucesso!");
      setErrorMessage(null);
      console.log("Seller/user registered")
    })
    .catch(error => {
      setErrorMessage("Erro ao cadastrar. Tente novamente.");
      setSuccessMessage(null);
      console.log("Error registering Seller/user")
    })
  };



  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-lg">
        {/* Mensagem de sucesso */}
        {successMessage && <div className="bg-green-500 text-white px-4 py-2 rounded mb-4"> {successMessage}</div>}
        {/* Mensagem de erro */}
        {errorMessage && <div className="bg-red-500 text-white px-4 py-2 rounded mb-4">{errorMessage}</div>}
        <Card className="flex justify-center items-center border-2 border-gray-300 rounded-lg bg-white shadow-lg p-8">
          <img src="/nebulon_cover.png" alt="Nebulon Logo" />
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>

              <div className="block mt-8">
                <Label htmlFor="name" value="Nome" className="font-bold" />
                <div className="border-2 rounded-lg shadow-inner">
                  <TextInput id="name" type="text" onChange={ (e)=> setUser({...user, nome: e.target.value}) } required />
                </div>
              </div>

              <div className="block">
                <Label htmlFor="cpf" value="CPF" className="font-bold" />
                <div className="border-2 rounded-lg shadow-inner">
                  <TextInput id="cpf" type="text" onChange={ (e)=> setUser({...user, cpf: e.target.value}) } required />
                </div>
              </div>

              <div className="block">
                <Label htmlFor="username" value="Usuário" className="font-bold" />
                <div className="border-2 rounded-lg shadow-inner">
                  <TextInput id="username" type="text" onChange={ (e)=> setUser({...user, username: e.target.value}) } required />
                </div>
              </div>

              <div className="block">
                <Label htmlFor="password" value="Senha" className="font-bold" />
                <div className="border-2 rounded-lg shadow-inner mb-6">
                  <TextInput id="password" type="password" onChange={ (e)=> setUser({...user, password: e.target.value}) } required />
                </div>
              </div>
 
              <Button type="submit" className="bg-purple-800 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded-lg">
                Registrar
              </Button>

          </form>
        </Card>
      </div>
    </div>
  );
}

export default UserFormCard;
