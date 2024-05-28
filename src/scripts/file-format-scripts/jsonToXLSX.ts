import {utils , write } from 'xlsx';

export function jsonToExcel(jsonData: any[]): string {
    const worksheet = utils.json_to_sheet(jsonData);
  
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, 'Sheet');
  
    const wbout = write(workbook, {bookType:'xlsx', type: 'binary'});
    
    const buffer = new ArrayBuffer(wbout.length);
    const view = new Uint8Array(buffer);

    for (let i=0; i<wbout.length; i++) view[i] = wbout.charCodeAt(i) & 0xFF;
    const blob = new Blob([view], {type: 'application/octet-stream'});
  
    return URL.createObjectURL(blob);
}   