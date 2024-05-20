import React, { useState } from "react";
import { Button, Label, TextInput, Card } from "flowbite-react";
import Swal from 'sweetalert2';
import instance from '@/scripts/requests/instance';
import '@/app/globals.css'
import { formatCPF } from "@/scripts/validation/dataFormatter";



interface Seller {
  name: string;
  cpf: string;
  username: string;
  password: string;
}
const UserFormCard = () => {
  const [user, setUser] = useState<Seller>({
    name: '',
    cpf: '',
    username: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    user.cpf=user.cpf.replace(/\D/g, '');
    
    instance.post('/account/register',{
      name: user.name,
      cpf: user.cpf,
      username: user.username,
      password: user.password
    })
    .then(function(response){
      Swal.fire({
        title: 'Sucesso',
        text: `Vendedor foi deletado com sucesso.`,
        icon: 'success',
        showConfirmButton: false,
        timer: 1750,
        timerProgressBar: true,
      })
      console.log("Seller/user registered successfully")
    })
    .catch(error => {
      Swal.fire({
        title: 'Oops!',
        text: `Algo de errado aconteceu :(`,
        icon: 'error',
        showConfirmButton: false,
        timer: 1750,
      });
      console.log("Error registering Seller/user")
    })
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };


  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-lg">
        <Card className="flex justify-center items-center border-2 border-gray-300 rounded-lg bg-white shadow-lg p-8">
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <h2 className="text-center mb-4 font-bold text-3xl">Cadastro de Vendedores</h2>
            <div className="mb-4">
              <img className="w-min" src="/nebulon_cover.png" alt="Nebulon Logo" />
            </div>

              <div className="block">
                <Label htmlFor="name" value="Nome" className="font-bold" />
                <div className="border-2 rounded-lg shadow-inner">
                  <TextInput id="name" type="text" name="name" value={user.name} onChange={handleChange} required />
                </div>
              </div>

              <div className="block">
                <Label htmlFor="cpf" value="CPF" className="font-bold" />
                <div className="border-2 rounded-lg shadow-inner">
                  <TextInput id="cpf" type="text" name="cpf"value={formatCPF(user.cpf)}  onChange={handleChange} required />
                </div>
              </div>

              <div className="block">
                <Label htmlFor="username" value="Usuário" className="font-bold" />
                <div className="border-2 rounded-lg shadow-inner">
                  <TextInput id="username" type="text" name="username" value={user.username} onChange={handleChange} required />
                </div>
              </div>

              <div className="block">
                <Label htmlFor="password" value="Senha" className="font-bold" />
                <div className="border-2 rounded-lg shadow-inner mb-6">
                  <TextInput id="password" type="password" name="password" value={user.password} onChange={handleChange} required />
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
