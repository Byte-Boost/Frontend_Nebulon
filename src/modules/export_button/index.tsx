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
            // const url_pdf = jsonToExcel(jsonData);
            // const b = document.createElement('a');
            // b.href = url_pdf;
            // b.download = filename + '.pdf';
            // b.click();
            // break;
        case 2:
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
        <div>
        <img src="/download.png" onClick={() => setModalIsOpen(true)} width={35} className="cursor-pointer"/>
        <Modal size={'xl'} show={modalIsOpen} onClose={closeModal} dismissible>
            <Modal.Body className="flowbite-modal">
                <div className='grid grid-flow-col'>
                    <div className="inline-block m-4">
                    <label htmlFor="downloadType" className="block mb-2 text-lg font-medium text-gray-900">Exportar</label>
                    <select className="rounded-lg block w-full p-2.5" name="downloadType" id="downloadType" onChange={() => {setDownloadType(parseInt((document.getElementById('downloadType') as HTMLSelectElement).value))}}>
                    <option value={0}>XLSX</option>
                    {/* <option value={1}>PDF</option> */}
                    <option value={2}>CSV</option>
                    </select> 

                    <button className='bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline block mx-auto mt-4' onClick={download}>Baixar</button>
                </div>
                </div>
            </Modal.Body>
        </Modal>
        </div>
        
    );
}
export default ExportButton;