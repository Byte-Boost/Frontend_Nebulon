import Router from "next/router";

export default function UploadCard({handleChange, onSend, }: {handleChange: any, onSend: any}){
    return (
        <div className='w-full p-14'>
        <div className='bg-slate-100 shadow-2xl rounded-sm py-6 px-6'>
          <h1 className='text-3xl mb-4'>Extrair informações do excel</h1>
          Selecionar arquivo
          <div className='bg-slate-300 border-dashed border-2 border-black h-56 flex items-center flex-col justify-center cursor-pointer'>
            <p>Arraste e solte o arquivo aqui</p>
            <p>ou</p>
            <label className='mt-12 bg-purple-500 hover:bg-purple-600 text-white p-2 cursor-pointer' htmlFor='file'>Escolha um arquivo</label>
            <input className='hidden' type="file" name="file" id='file' required accept='.xlsx' onChange={handleChange}/>
          </div>
            <div className='grid grid-flow-col'>
            <div className="text-left">
              <button className='mt-4' onClick={() => Router.back()}>Voltar</button>
              </div>
            <div className="text-right">
              <button className='mt-4' onClick={onSend}>Upload</button>
              </div>
          </div>
        </div>
      </div>
    );
}