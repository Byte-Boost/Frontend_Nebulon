import '@/app/globals.css'
import ClientTableRow from '@/modules/client_table_row';
import Navbar from '@/modules/navbar';
import Sidebar from '@/modules/sidebar';
import { Table } from 'flowbite-react';
export default function Clients() {

  
  const data = fetch('', {
    method: 'GET'
})


  return (
    <main>
        <Navbar/>
        <div className='flex flex-row'>
        <Sidebar/>
          <div className='w-full p-8'>
            <div className='container-c'>
              <div className='container-table'>
                <Table className=" rounded-lg bg-violet-300">
                  <Table.Head className='w-full text-left text-lg'>
                    <Table.HeadCell>Nome Fantasia</Table.HeadCell>
                    <Table.HeadCell>Razão Social</Table.HeadCell>
                    <Table.HeadCell>CNPJ</Table.HeadCell>
                    <Table.HeadCell>Contato</Table.HeadCell>
                  </Table.Head>
                  <Table.Body className="px-6 py-4 group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg">
                    <ClientTableRow nomefantasia={'Lorem'} razaosocial={'ipsum'} cnpj={'dolor'} contato={'sit amet'} />
                    <ClientTableRow nomefantasia={'Lorem'} razaosocial={'ipsum'} cnpj={'dolor'} contato={'sit amet'} />
                    <ClientTableRow nomefantasia={'Lorem'} razaosocial={'ipsum'} cnpj={'dolor'} contato={'sit amet'} />
                    <ClientTableRow nomefantasia={'Lorem'} razaosocial={'ipsum'} cnpj={'dolor'} contato={'sit amet'} />
                    <ClientTableRow nomefantasia={'Lorem'} razaosocial={'ipsum'} cnpj={'dolor'} contato={'sit amet'} />
                    <ClientTableRow nomefantasia={'Lorem'} razaosocial={'ipsum'} cnpj={'dolor'} contato={'sit amet'} />
                    <ClientTableRow nomefantasia={'Lorem'} razaosocial={'ipsum'} cnpj={'dolor'} contato={'sit amet'} />
                    <ClientTableRow nomefantasia={'Lorem'} razaosocial={'ipsum'} cnpj={'dolor'} contato={'sit amet'} />
                    <ClientTableRow nomefantasia={'Lorem'} razaosocial={'ipsum'} cnpj={'dolor'} contato={'sit amet'} />                    
                  </Table.Body>
                </Table>
              </div>
            </div>            
          </div>
        </div>
    </main>
  );
}
