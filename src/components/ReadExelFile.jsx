import { read, utils } from "xlsx";
import { Input } from "./ui/input";

export default function ReadExelFile({ setDataFromFile }) {
    const handleChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
            const data = new Uint8Array(event.target.result);
            const workbook = read(data, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];

            const jsonData = utils.sheet_to_json(worksheet);
            setDataFromFile(jsonData)

        };

        reader.readAsArrayBuffer(file);
    };
    return <Input type="file" onChange={handleChange} />
}