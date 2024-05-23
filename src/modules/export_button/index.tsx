import jsonToCSV from "@/scripts/dataUtils/jsonToCSV";
import { jsonToExcel } from "@/scripts/dataUtils/jsonToXLSX";
import { Modal } from "flowbite-react";
import { useState } from "react";


const ExportButton = ({jsonData, filename }:{jsonData : any[], filename:string}) =>{
    const [downloadType, setDownloadType] = useState(0 as number)
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const closeModal = () => {
        setModalIsOpen(false);
    };
    const download = () => {
        switch (downloadType) {
        case 0:
            const url_xlsx = jsonToExcel(jsonData);
            const a = document.createElement('a');
            a.href = url_xlsx;
            a.download = filename + '.xlsx';
            a.click();
            break;
        case 1:
            const url_csv = jsonToCSV(jsonData);
            const c = document.createElement('a');
            c.href = url_csv;
            c.download = filename + '.csv';
            c.click();
            break;
        default:
            break;
        } 
    }
    return(     
        <div className="p-2 rounded-md flex cursor-pointer shadow-xl bg-purple-500 text-white fixed right-4 bottom-4" onClick={() => setModalIsOpen(true)}>
            <img src="/download.png" width={35} className="inline invert"/>
            <span className="text-xl">Exportar</span>
            <Modal  className="bg-black bg-opacity-30 grid place-content-center" size={'xl'} show={modalIsOpen} onClose={closeModal} dismissible>
                <Modal.Body className='bg-slate-100 rounded-lg'>
                    <div className="p-10">
                        <h1 className='text-3xl mb-4'>Exportar como</h1>
                        <select className="rounded-lg block w-full p-2.5 min-w-52 "  name="downloadType" id="downloadType" onChange={() => {setDownloadType(parseInt((document.getElementById('downloadType') as HTMLSelectElement).value))}}>
                        <option value={0}>XLSX</option>
                        <option value={1}>CSV</option>
                        </select> 

                        <button className='bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline block mx-auto mt-4  min-w-52' onClick={download}>Baixar</button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}
export default ExportButton;