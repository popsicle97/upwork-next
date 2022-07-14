import { ReactElement } from "react";

export default function Layout({ children }: { children: ReactElement }) {

    return (
        <div>
            <header>
                <nav className='text-center'>
                    <h1 className="text-3xl">Toy Stores</h1>
                    <div className="my-4 space-x-4  [&>a]:p-2 [&>a]:rounded-sm">
                        <a className="bg-blue-100 text-blue-500 hover:cursor-pointer" href="/">Toys</a>
                        <a className="bg-blue-100 text-blue-500 hover:cursor-pointer">Manage Toys</a>
                    </div>
                </nav>
            </header>

            <main>
                {children}
            </main>
        </div>

    )
}