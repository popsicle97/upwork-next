// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next'
import { Toy } from '../../interfaces/Toy';



export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const writeToRecord = (data: Toy | Toy[]) => {
        fs.writeFileSync('./RECORD.json', JSON.stringify(data));
    }

    const writeToMock = (data: Toy[]) => {
        try {
            fs.writeFileSync('./MOCK.json', JSON.stringify(data));
            return { status: true }
        } catch (error) {
            return { status: false, error: error }
        }
    }

    const readMockFile = () => {
        const data = fs.readFileSync('./MOCK.json');
        const parsedData = JSON.parse(data.toString());
        return parsedData
    }

    const readRecordFile = () => {
        const data = fs.readFileSync('./RECORD.json');
        const parsedData = JSON.parse(data.toString());
        return parsedData
    }

    if (req.method === "POST") {

        const parsedBody = JSON.parse(req.body);

        try {
            const data = fs.readFileSync('./RECORD.json');

            if (data.byteLength === 0) {
                return writeToRecord([parsedBody])
            }

            const parsedData = JSON.parse(data.toString());
            parsedData.push(parsedBody)
            writeToRecord(parsedData)

        } catch (error: any) {
            if (error.code === "ENOENT") {
                writeToRecord(parsedBody)
            }
            console.error(error)

            return res.status(404).json({ message: "Failed to save" })
        }

        const toys: Toy[] = readMockFile();
        const updatedToys = toys.map((toy) => {
            if (toy.id === parsedBody.id) {
                toy.owner = parsedBody.purchase_owner
            }
            return toy
        })
        console.log('Updated toys', updatedToys)
        writeToMock(updatedToys);

        res.status(200).json({ message: "Saved successfully" });

    } else {
        const parsedData = readMockFile();
        res.status(200).json({ data: parsedData })
    }

}
