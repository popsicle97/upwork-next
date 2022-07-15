import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router';
import { toysRepo } from '../helpers/products-repo';
import { Toy } from '../interfaces/Toy';




const ToyCard = (props: Toy) => {
  const router = useRouter();
  return (
    <article onClick={() => router.push(`/product/${props.id}`)} className="flex flex-col bg-white border rounded-md w-40 h-fit py-3 pl-4 m-2 space-y-2 shadow-md hover:cursor-pointer hover:shadow-lg">
      <h2 className="text-xl mt-2">{props.name}</h2>
      <span className="text-xs">{props.series}</span>
      <span className="bg-sky-100 w-fit pr-2 pl-1 mb-2 py-1 rounded-md text-xs text-blue-500">{props.price}</span>
      <p className="text-ellipsis overflow-hidden h-14 text-xs hover:text-clip">{props.description}</p>
      <span className={`${props.owner ? 'bg-green-200' : 'bg-red-200'} text-xs bg-white w-fit p-1 rounded-lg`}>{props.owner ? props.owner : 'None'}</span>
      <span className='text-[8px] text-gray-400 self-end pr-2'>{props.serial_no}</span>
    </article>
  )
}

export default function Home({ data = [] }: { data: (Toy)[] }) {

  return (
    <div>
      <Head>
        <title>Toys Store</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-row flex-wrap justify-center w-full h-full">
        {
          data.map((toy, index) => (
            <ToyCard {...toy} key={index} />
          ))
        }
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const data = await toysRepo.getAll()
  return { props: { data: data } }
}



