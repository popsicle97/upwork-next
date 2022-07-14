// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next'
import { Toy } from '../../interfaces/Toy';



export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    if (req.method === "POST") {

        const writeToFile = (data: Toy | Toy[]) => {
            fs.writeFileSync('./RECORD.json', JSON.stringify(data));
        }

        try {
            const data = fs.readFileSync('./RECORD.json');

            if (data.byteLength === 0) {
                return writeToFile([JSON.parse(req.body)])
            }

            const parsedData = JSON.parse(data.toString());
            parsedData.push(JSON.parse(req.body))
            writeToFile(parsedData)

        } catch (error: any) {
            if (error.code === "ENOENT") {
                writeToFile(JSON.parse(req.body))
            }
            console.error(error)

            return res.status(404).json({ message: "Failed to save" })
        }

        res.status(200).json({ message: "Saved successfully" });

        // console.log("Check read ", parsedData);

        // parsedData.push(toy)



    } else {
        const data = fs.readFileSync('./MOCK.json');
        const parsedData = JSON.parse(data.toString());
        res.status(200).json({ data: parsedData })
    }

}
