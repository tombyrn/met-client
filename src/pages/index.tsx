import Artwork from "@/components/Artwork";
import Layout from "@/components/Layout";
import MetLogo from "@/components/MetLogo";
import { NewspaperIcon, CircleStackIcon, HomeModernIcon } from "@heroicons/react/16/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { Typography } from "@material-tailwind/react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Landing() {
  const router = useRouter();
  return (
    <Layout title="The MET Archive" main>
      <div className="flex flex-row items-center">
        <HomeModernIcon title="Visit The MET" className="mr-6 w-7 h-7 text-black hover:text-gray-500 hover:scale-110 hover:mr-8" onClick={() => window.open("https://www.metmuseum.org")}/>
        <CircleStackIcon title="Your Collection" className="w-7 h-7 text-black hover:text-gray-500 hover:scale-110 hover:mr-2 hover:ml-2" onClick={() => router.push(`/collection`)}/>
        <MetLogo main/>
        <NewspaperIcon title="Random Collection" className="w-7 h-7 text-black hover:text-gray-500 hover:scale-110 hover:mr-2 hover:ml-2" onClick={() => router.push(`/page/1`)}/>
        <MagnifyingGlassIcon title="Search" className="ml-6 w-7 h-7 text-black hover:text-gray-500 hover:scale-110 hover:ml-8" onClick={() => router.push(`/search`)}/>
      </div>
    </Layout>
  );
}