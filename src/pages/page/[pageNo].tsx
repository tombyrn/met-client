import Artwork from "@/components/Artwork";
import { ObjectIDContext, shuffle } from "@/context/ObjectIDContext";
import { Button, IconButton, Input, Typography } from "@material-tailwind/react";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { ArrowLeftIcon, ArrowPathIcon, ArrowRightIcon, CircleStackIcon } from '@heroicons/react/24/outline';
import Layout from "@/components/Layout";

export const PAGE_SIZE = 10;

export default function Page() {
    const router = useRouter();

    /* @ts-ignore */
    // get objectids and total from global context
    const {objectIDs, total, shuffledIDs, setShuffledIDs} = useContext(ObjectIDContext);
    const [IDs, setIDs] = useState(shuffledIDs); // array of objectIDs to be used for all pages
    const [searchTerm, setSearchTerm] = useState('');

    const pageNo = Number(router.query.pageNo as string) || 1;
    const [artworkData, setArtworkData] = useState([]); // array of 10 objectIDs to be fetched by the Artwork components


    // slices objectIDs array to get the new artworkData for the page
    useEffect(() => {
        const itemIndex = (Number(pageNo)-1)*PAGE_SIZE;
        setArtworkData(IDs.slice(itemIndex, itemIndex + PAGE_SIZE))
    }, [pageNo, IDs])


    // fetch objectIDs and total from the api
    useEffect(() => {
        let isMounted = true;

        async function fetchData() {
            const res = await fetch(`/api/search/${searchTerm}`);
            const data = await res.json();

            // if the component is still mounted(return function hasn't executed), update the objectIDs and total
            if(data?.objectIDs && isMounted) {
                setIDs(data.objectIDs);
            }
        }

        // if there is a search term, fetch the search results, else fetch all objects
        if(searchTerm.length)
            fetchData();
        else {
            setIDs(shuffledIDs);
        }

        return () => {isMounted = false} // some weird react magic that prevents race condition
    }, [searchTerm, shuffledIDs])

    return (
        <Layout>
            
            <div className="w-full flex flex-row mb-5 justify-center items-center text-center">
                {/* Page Title */}
                {/* @ts-ignore */}
                <Typography variant="h5" className="h-1/6">Page {pageNo}</Typography>
            
                {/* Search Bar */}
                <div className="m-5 max-w-[200px]">
                    {/* @ts-ignore */}
                    <Input variant="outlined" label="Search" onChange={(e) => setSearchTerm(e.target.value)}/>
                </div>

                {/* Refresh Button */}
                {/* @ts-ignore */}
                <IconButton size="lg" className="rounded" color="white" title="Refresh Collection" onClick={() => setShuffledIDs(shuffle(objectIDs))}>
                    <ArrowPathIcon className="m-0 p-0 w-full h-full"/>
                </IconButton>
            </div>
            
            {/* Artwork */}
            <div className="p-6 w-full h-fit flex flex-col justify-start items-stretch border-t-8 border-red-400 overflow-y-scroll">
                {artworkData && artworkData.map((id) => {
                    return <Artwork key={id} id={id}/>
                })}
            </div>

            {/* Buttons */}
            <div className="flex mt-5 bottom-0 sticky">
                {/* @ts-ignore */}
                <IconButton className="mr-5 rounded-full" color="white" onClick={() => router.push(`/page/${pageNo-1}`)} disabled={pageNo === 1}>
                    <ArrowLeftIcon className="w-full h-full"/>
                </IconButton>

                {/* @ts-ignore */}
                <IconButton className="ml-5 rounded-full" color="white" onClick={() => router.push(`/page/${pageNo+1}`)} disabled={pageNo === Math.ceil(total/10)}>
                    <ArrowRightIcon className="w-full h-full"/>
                </IconButton>
            </div>
        </Layout>
    );
}