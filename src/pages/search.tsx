import Artwork from "@/components/Artwork";
import Layout from "@/components/Layout";
import { Button, Input, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";

const PAGE_SIZE = 10;

export default function SearchPage() {
    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);
    const [artworkData, setArtworkData] = useState([]);
    const [page, setPage] = useState(1);


    useEffect(() => {
        setArtworkData(results.slice(0, page * PAGE_SIZE));
    }, [results, page])

    // fetch objectIDs and total from the api
    useEffect(() => {
        let isMounted = true;

        async function fetchData() {
            const res = await fetch(`/api/search/${search}`);
            const data = await res.json();

            // if the component is still mounted(return function hasn't executed), update the objectIDs and total
            if(data?.objectIDs && isMounted) {
                setResults(data.objectIDs);
                setPage(1);
            }
        }

        // if there is a search term, fetch the search results, else fetch all objects
        if(search.length)
            fetchData();
        else {
            setResults([]);
        }

        return () => {isMounted = false} // some weird react magic that prevents race condition
    }, [search])

    return (
        <Layout title="Search">
            <div className="m-2 p-4 max-w-1/3 h-1/3 sticky">
                <Input value={search} onChange={(e) => setSearch(e.target.value)} size="lg" label="Search" />
            </div>  
                {/* Artwork */}
                { artworkData.length > 0 &&  (
                    <div className="p-6 w-full h-fit flex flex-col justify-start items-stretch overflow-y-scroll">
                        {artworkData.map((id) => {
                            return <Artwork key={id} id={id}/>
                        })}
                        <Button size="sm" onClick={() => setPage(page + 1)}>Load More</Button>
                    </div>
                )}
        </Layout>
    )
}