import React from "react";
import { Button, Label, TextInput, Card } from "flowbite-react";

function UserFormCard() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-lg">
        <Card className="flex justify-center items-center border-2 border-gray-300 rounded-lg bg-white shadow-lg p-8">
          <img src="/nebulon_cover.png" alt="Nebulon Logo" />
            <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
              <div className="block mt-8">
                <Label htmlFor="name1" value="Nome" className="font-bold" />
                <div className="border-2 rounded-lg shadow-inner">
                  <TextInput id="email1" type="email" required />
                </div>
              </div>
            <div className="block">
              <Label htmlFor="Email1" value="E-mail" className="font-bold" />
              <div className="border-2 rounded-lg shadow-inner">
                <TextInput id="password1" type="password" required />
              </div>
            </div>
            <div className="block ">
              <Label htmlFor="codVendedor" value="Cód Vendedor" className="font-bold" />
              <div className="border-2 rounded-lg shadow-inner mb-6">
                <TextInput id="password1" type="password" required />
              </div>
            </div>
              <Button type="submit" className="bg-purple-800 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded-lg">
                Criar Usuário
              </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}

export default UserFormCard;
