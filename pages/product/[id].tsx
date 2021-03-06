import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toysRepo } from "../../helpers/products-repo";
import { userRepo } from "../../helpers/users-repo";
import { Toy } from "../../interfaces/Toy";

interface PurchaseInfo {
    id: number,
    serial_no: string,
    previous_owner: string,
    purchase_price: string,
    purchase_owner: string,
    purchase_date: string,
    purchase_type: string,
}


export default function ProductDetail({ toy }: { toy: Toy }) {
    const [purchased, setPurchased] = useState(false);
    const [user, setUser] = useState("");


    useEffect(() => {
        const user = userRepo.getLocalUser()
        if (user) {
            setUser(user)
        }
    }, [])

    console.log(toy.owner.split(",").some(owners => owners == user))

    return (
        <article className="flex flex-col items-center w-full h-full">
            <article className="grid grid-cols-2 border h-full w-[50%]">
                <h1 className="text-2xl m-auto">{toy.name}</h1>
                <section className="flex flex-col text-left py-4 px-2 space-y-4">
                    <span className="bg-green-100 text-green-500 p-2 rounded-md w-fit">{toy.price}</span>
                    <span>Owned by : {toy.owner === user ? toy.owner + "(You)" : toy.owner}</span>
                    <section className="flex flex-col">
                        <label className="bg-gray-100 p-1 rounded-sm">Series</label>
                        <span className="text-sm">{toy.series}</span>
                    </section>
                    <section className="flex flex-col">
                        <label className="bg-gray-100 p-1 rounded-sm">Description</label>
                        <p className="text-sm">{toy.description}</p>
                    </section>
                    <span className="block text-sm mt-4">{toy.date}</span>
                    <button
                        onClick={() => toysRepo.purchase(toy).then(() => setPurchased(true))}
                        className={`${toy.owner.split(",").some(owners => owners == user) ? 'bg-gray-400 text-gray-500' : ''} p-2 rounded-md bg-emerald-400 text-white shadow-sm`}
                        disabled={purchased || toy.owner.split(",").some(owners => owners == user) ? true : false}>
                        {purchased || toy.owner.split(",").some(owners => owners == user) ? 'Purchased' : 'Buy'}
                    </button>
                    {(toy.owner && !toy.owner.split(",").some(owners => owners == user) && toy.series != 'Happy Turtles')
                        ? <button
                            onClick={() => toysRepo.trade(toy)}
                            className="border border-black p-2 rounded-md">
                            Trade
                        </button>
                        : ""
                    }

                    <span className="text-xs text-gray-400">Serial no : {toy.serial_no}</span>
                </section>
            </article>
        </article >

    )
}

export async function getServerSideProps(context: any) {

    const { id } = context.query;

    const toy = await toysRepo.getById(id)
    return {
        props: { toy }
    }
}