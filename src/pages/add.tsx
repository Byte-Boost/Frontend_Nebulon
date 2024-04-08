import '@/app/globals.css'
import Navbar from '@/modules/navbar';
import Sidebar from '@/modules/sidebar';
export default function Products() {
  return (
    <main>
        <Navbar/>
        <div className='flex flex-row'>
        <Sidebar/>
          <div className='w-full p-14'>
            <div className='container p-14'>
                <div className='flex items-center flex-col justify-center'>
                    <label className='label-p m-6' htmlFor='file'>Selecionar arquivo</label>
                    <input className='inp-p' type="file" placeholder="Upload versão XL" name="file" id='file' required/>
                    <button className='btn-p-send'>
                        Enviar
                    </button>
                </div>
            </div>
          </div>
        </div>
    </main>
  );
}
