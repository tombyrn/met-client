import MetLogo from "@/components/MetLogo";
import { CircleStackIcon, NewspaperIcon } from "@heroicons/react/16/solid";
import { useRouter } from "next/router";
import { ReactNode } from "react";

export default function Layout({children}: {children: ReactNode}) {
    const router = useRouter();
    return (
        <main className="w-full h-full flex min-h-screen flex-col items-stretch justify-start justify-items-stretch justify-self-stretch p-0 m-0">
            <div className="sticky top-0 bg-white z-10 pl-10 pb-3 w-full h-fit flex items-center border-4 border-transparent border-b-red-600">
                <MetLogo/>
                <NewspaperIcon title="Random Collection" className="ml-11 mt-3 w-7 h-7 text-black hover:text-gray-500" onClick={() => router.push(`/page/1`)}/>
                <CircleStackIcon title="Your Collection" className="ml-3 mt-3 w-7 h-7 text-black hover:text-gray-500" onClick={() => router.push(`/collection`)}/>
            </div>
            <div className="w-full h-5/6 flex flex-col justify-start items-center">
                {children}
            </div>
        </main>
    )
}
  
  