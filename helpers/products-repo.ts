import { Toy } from '../interfaces/Toy';
import { userRepo } from './users-repo';


const toys = new Promise((resolve) => import('../data/MOCK.json').then((toy) => resolve(toy.default)));

interface PurchaseInfo {
    id: number,
    serial_no: string,
    previous_owner: string,
    purchase_price: string,
    purchase_owner: string,
    purchase_date: string,
    purchase_type: string,
}


export const toysRepo = {

    getAll: () => toys,
    getById,
    publish,
    purchase,
    trade,
    mergeOwner,
    displayFigureHistory,
    displayOwnerHistory,
}

function getById(id: number) {
    return new Promise((resolve) => {
        toys.then((parsedToys: any) => {
            resolve(parsedToys.find((toy: Toy) => toy.id == id))
        })
    })
}

async function publish() {

    return
}

async function purchase(toy: Toy) {
    const currentUser = userRepo.getLocalUser();

    if (currentUser) {
        const purchaseInfo: PurchaseInfo = {
            id: toy.id,
            serial_no: toy.serial_no,
            previous_owner: toy.owner ? toy.owner : 'None',
            purchase_price: toy.price,
            purchase_owner: currentUser,
            purchase_date: new Date().toLocaleString(),
            purchase_type: 'purchase'
        }

        const response = await fetch('/api/product', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(purchaseInfo)
        })

        if (response.status === 200) {
            return console.log('Product purchased successfully')
        } else {
            return console.log('Encountered problems to purchasing product')
        }

    } else {
        console.log("Error in getting local user....");
    }

}

async function trade(toy: Toy) {
    const currentUser = userRepo.getLocalUser();

    if (currentUser) {
        const purchaseInfo: PurchaseInfo = {
            id: toy.id,
            serial_no: toy.serial_no,
            previous_owner: toy.owner ? toy.owner : 'None',
            purchase_price: toy.price,
            purchase_owner: currentUser,
            purchase_date: new Date().toLocaleString(),
            purchase_type: 'trade'
        }

        const response = await fetch('/api/product', {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(purchaseInfo)
        })

        if (response.status === 200) {
            return console.log('Product purchased successfully')
        } else {
            return console.log('Encountered problems to purchasing product')
        }

    } else {
        console.log("Error in getting local user....");
    }
}

function mergeOwner() {
    return new Promise((resolve) => {
        toys.then((parsedToys: any) => {
            resolve(parsedToys.map((toy: Toy) => {
                let arr = toy.owner.split(',')
                toy.owner = arr[arr.length - 1]
            }))
        })
    })
}

function displayFigureHistory() {

}

function displayOwnerHistory() {

}
