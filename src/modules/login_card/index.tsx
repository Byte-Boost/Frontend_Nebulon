import React, { useState } from "react";
import { Button, Checkbox, Label, TextInput, Card } from "flowbite-react";
import Link from "next/link";
import axios from "axios";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";
import cookie from "@boiseitguru/cookie-cutter";
import instance from "@/scripts/requests/instance";

function LoginFormCard() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response =  await instance.post('http://localhost:3200/account/login', {
      username: username,
      password: password,
    }); 
    
    if (response.data.token) {
      console.log(response.data.token)
      cookie.set('token', response.data.token);
      router.push(`/home?authorization=` + response.data.token)
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-lg">
        <Card className="flex justify-center items-center border-2 border-gray-300 rounded-lg bg-white shadow-lg p-8">
          <div>
            <h1 className="text-3xl font-bold text-center mb-2">Login</h1>
          </div>
          <img src="/nebulon_cover.png" alt="Nebulon Logo" className="mb-6 mt-4"/>
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              <div className="block">
                <Label htmlFor="username" value="Usuário" className="font-bold"/>
                <div className="border-2 rounded-lg shadow-inner">
                  <TextInput id="username" type="text" required value={username} onChange={(e) => setUsername(e.target.value)}/>
                </div>
              </div>
            <div className="block">
              <Label htmlFor="password1" value="Senha" className="font-bold"/>
              <div className="border-2 rounded-lg shadow-inner">
                <TextInput id="password1" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
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
        </Card>
      </div>
    </div>
  );
}

export default LoginFormCard;
