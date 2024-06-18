import MetLogo from "@/components/MetLogo";
import { CircleStackIcon, NewspaperIcon } from "@heroicons/react/16/solid";
import Head from "next/head";
import { useRouter } from "next/router";
import { ReactNode } from "react";

export default function Layout({children, title, main=false}: {children: ReactNode, title: string, main?: boolean}) {
    const router = useRouter();
    return (
        <>
            <Head><title>{title}</title></Head>
            <div className="w-full h-full flex min-h-screen flex-col items-center justify-center p-0 m-0">
                {!main && 
                    <div className="sticky top-0 bg-white z-10  pb-3 w-full h-fit flex items-center justify-center">
                        <NewspaperIcon title="Random Collection" className="mr-3 mt-6 w-7 h-7 text-black hover:text-gray-500" onClick={() => router.push(`/page/1`)}/>
                        <MetLogo/>
                        <CircleStackIcon title="Your Collection" className="ml-3 mt-6 w-7 h-7 text-black hover:text-gray-500" onClick={() => router.push(`/collection`)}/>
                    </div>
                }
                <div className="w-full h-5/6 flex flex-col justify-center items-center">
                    {children}
                </div>
            </div>
        </>
    )
}
  
  