import Artwork from "@/components/Artwork";
import { ObjectIDContext, shuffle } from "@/context/ObjectIDContext";
import { Button, ButtonGroup, IconButton, Input, Typography } from "@material-tailwind/react";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { ArrowLeftIcon, ArrowPathIcon, ArrowRightIcon, CircleStackIcon } from '@heroicons/react/24/outline';
import Layout from "@/components/Layout";

export const PAGE_SIZE = 10;

export default function Page() {
    const router = useRouter();

    // get objectids and total from global context
    const {objectIDs, total, shuffledIDs, setShuffledIDs} = useContext(ObjectIDContext);
    const [IDs, setIDs] = useState<string[]>(shuffledIDs); // array of objectIDs to be used for all pages
    const [searchTerm, setSearchTerm] = useState('');
    
    const pageNo = Number(router.query.pageNo as string) || 1;
    const [active, setActive] = useState(pageNo); // for active pagination number
    const [artworkData, setArtworkData] = useState<string[]>([]); // array of 10 objectIDs to be fetched by the Artwork components


    // slices objectIDs array to get the new artworkData for the page
    useEffect(() => {
        const itemIndex = (pageNo-1) * PAGE_SIZE;
        setArtworkData(IDs.slice(itemIndex, itemIndex + PAGE_SIZE))
        setActive(pageNo);
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

    const getItemProps = (index: number) => ({
        className: active === index ? "bg-gray-100 text-gray-900" : "",
        onClick: () => setActive(index),
    });

    const next = () => {
        router.push(`/page/${pageNo+1}`)
        setActive(active + 1);
    };
     
      const prev = () => {
        router.push(`/page/${pageNo-1}`)
        setActive(active - 1);
      };

    return (
        <Layout title="Random Collection">
            
            <div className="w-full flex flex-row mb-5 justify-center items-center text-center">
                {/* Page Title */}
                <Typography variant="h5" className="h-1/6">Page {pageNo}</Typography>
            
                {/* Search Bar */}
                <div className="m-5 max-w-[200px]">
                    <Input variant="outlined" label="Search" onChange={(e) => setSearchTerm(e.target.value)} crossOrigin={undefined}/>
                </div>

                {/* Refresh Button */}
                <IconButton size="lg" className="rounded" color="white" title="Refresh Collection" onClick={() => setShuffledIDs(shuffle(objectIDs))}>
                    <ArrowPathIcon className="m-0 p-0 w-full h-full"/>
                </IconButton>
            </div>
            
            {/* Artwork */}
            <div className="p-6 w-full h-fit flex flex-col justify-start items-stretch overflow-y-scroll">
                {artworkData && artworkData.map((id) => {
                    return <Artwork key={id} id={id}/>
                })}
            </div>

            {/* Pagination */}

        <div className="flex items-center gap-8 mb-5">
            <IconButton
                size="sm"
                variant="outlined"
                onClick={prev}
                disabled={pageNo === 1}
            >
                <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
            </IconButton>
            <Typography color="gray" className="font-normal">
                Page <strong className="text-gray-900">{active}</strong> of{" "}
                <strong className="text-gray-900">{total}</strong>
            </Typography>
            <IconButton
                size="sm"
                variant="outlined"
                onClick={next}
                disabled={pageNo === 10}
            >
                <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
            </IconButton>
        </div>

        </Layout>
    );
}