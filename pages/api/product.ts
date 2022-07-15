// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next'
import { toysRepo } from '../../helpers/products-repo';
import { Toy } from '../../interfaces/Toy';

const RECORD_DATA = './data/RECORD.json';
const MOCK_DATA = './data/MOCK.json';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const writeToRecord = (data: Toy | Toy[]) => {
        fs.writeFileSync(RECORD_DATA, JSON.stringify(data));
    }

    const writeToMock = (data: Toy[]) => {
        try {
            fs.writeFileSync(MOCK_DATA, JSON.stringify(data));
            return { status: true }
        } catch (error) {
            return { status: false, error: error }
        }
    }

    const readMockFile = () => {
        const data = fs.readFileSync(MOCK_DATA);
        const parsedData = JSON.parse(data.toString());
        return parsedData
    }

    const readRecordFile = () => {
        const data = fs.readFileSync(RECORD_DATA);
        const parsedData = JSON.parse(data.toString());
        return parsedData
    }

    if (req.method === "POST") {
        const parsedBody = req.body

        try {
            //First get the record data 
            const data = fs.readFileSync(RECORD_DATA);

            //Check if record data file is empty, if it is then populate data in array
            if (data.byteLength === 0) {
                return writeToRecord([parsedBody])
            }


            const parsedData = JSON.parse(data.toString());
            parsedData.push(parsedBody)
            writeToRecord(parsedData)
            res.status(200).json({ message: "Saved successfully" });

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
                if ((toy.owner == "") || toy.owner == "None") {
                    toy.owner = parsedBody.purchase_owner
                } else {
                    toy.owner = toy.owner + "," + parsedBody.purchase_owner
                }
            }
            return toy
        })
        console.log('Updated toys', updatedToys)
        writeToMock(updatedToys);


    } else {
        const parsedData = readMockFile();
        res.status(200).json({ data: parsedData })
    }

}
