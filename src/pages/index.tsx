import '@/app/globals.css'
import Head from 'next/head';
import React, { useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import Swal from 'sweetalert2';
import { useRouter } from "next/router";
import cookie from "@boiseitguru/cookie-cutter";
import instance from "@/scripts/requests/instance";
import FormCard from '@/modules/form_card';
import { failureAlert } from '@/scripts/utils/shared';

export default function Login() {
  const router = useRouter();
  const [user, setUser] = useState<{username: string, password: string}>({
    username: '',
    password: ''
  });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await instance.post('http://localhost:3200/account/login', {
      username: user.username,
      password: user.password,
    })
    .then(function(response){
      cookie.set('token', response.data.token);
      router.push(`/home`)
    })
    .catch(error => {
      failureAlert("Couldn't log in!")
    }); 
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <main>
        <Head>
        <title>Nebulon - Login</title>
        </Head>
        <FormCard>
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <h2 className="text-center mb-4 font-bold text-3xl">Realize seu Login</h2>
            <div className="mb-4">
              <img className="w-min" src="/nebulon_cover.png" alt="Nebulon Logo" />
            </div>

            <div>
                <Label htmlFor="username" value="Usuário" className="font-bold"/>
                <div className="border-2 rounded-lg shadow-inner">
                  <TextInput id="username" name="username" type="text" required value={user.username} onChange={handleChange} />
                </div>
            </div>

            <div>
                <Label htmlFor="password1" value="Senha" className="font-bold"/>
                <div className="border-2 rounded-lg shadow-inner">
                  <TextInput id="password1" name="password" type="password" required value={user.password} onChange={handleChange}  />
                </div>
            </div>
            {/* <div className="flex items-center gap-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember">Remember me</Label>
            </div> */}

            <Button type="submit" className="bg-purple-800 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded-lg">
              Entrar
            </Button>
          </form>
        </FormCard>
    </main>
  );
}

