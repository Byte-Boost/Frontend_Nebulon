import { parse } from 'json2csv';

export default function jsonToCSV(jsonData: any[]): string {
    const fields = Object.keys(jsonData[0]);
    const opts = { fields };

    try {
        const csv = parse(jsonData, opts);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        return url;
    } catch (err) {
        console.error(err);
    }

    return ''; // Add a return statement with a default value of an empty string
}
