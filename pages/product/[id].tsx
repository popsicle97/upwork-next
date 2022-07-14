import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Toy } from "../../interfaces/Toy";

interface PurchaseInfo {
    id: number,
    name: string,
    series: string,
    description: string,
    serial_no: string,
    previous_owner: string,
    purchase_price: string,
    purchase_owner: string,
    purchase_date: string,

}


export default function ProductDetail({ toy }: { toy: Toy }) {
    const [purchased, setPurchased] = useState(false);

    const purchase = async () => {
        const currentUser: string | null = localStorage.getItem('user');
        if (currentUser) {
            const purchaseInfo: PurchaseInfo = {
                id: toy.id,
                name: toy.name,
                series: toy.series,
                description: toy.description,
                serial_no: toy.serial_no,
                previous_owner: toy.owner ? toy.owner : 'None',
                purchase_price: toy.price,
                purchase_owner: currentUser,
                purchase_date: new Date().toLocaleString(),

            }
            const response = await fetch('/api/product', { method: "POST", body: JSON.stringify(purchaseInfo) })
            if (response.status === 200) {
                setPurchased(true)
            }
        }
    }

    useEffect(() => {

    }, [])


    return (
        <article className="flex flex-col items-center w-full h-full">
            <article className="grid grid-cols-2 border h-full w-[50%]">
                <h1 className="text-2xl m-auto">{toy.name}</h1>
                <section className="flex flex-col text-left py-4 px-2 space-y-4">
                    <span className="bg-green-100 text-green-500 p-2 rounded-md w-fit">{toy.price}</span>
                    <span>Owned by : {toy.owner}</span>
                    <section className="flex flex-col">
                        <label className="bg-gray-100 p-1 rounded-sm">Series</label>
                        <span className="text-sm">{toy.series}</span>
                    </section>
                    <section className="flex flex-col">
                        <label className="bg-gray-100 p-1 rounded-sm">Description</label>
                        <p className="text-sm">{toy.description}</p>
                    </section>
                    <span className="block text-sm mt-4">{toy.date}</span>
                    <button onClick={() => purchase()} className={`${purchased ? 'bg-gray-400 text-gray-500' : ''} p-2 rounded-md bg-emerald-400 text-white shadow-sm`} disabled={purchased ? true : false}>{purchased ? 'Purchased' : 'Buy'}</button>
                    <span className="text-xs text-gray-400">Serial no : {toy.serial_no}</span>
                </section>
            </article>
        </article>

    )
}

export async function getServerSideProps(context: any) {

    const { id } = context.query;
    const data = await import('../../MOCK.json');
    const records = await import('../../RECORD.json');
    const toy = data.default.find((toy) => toy.id == id);

    return {
        props: { toy }
    }
}