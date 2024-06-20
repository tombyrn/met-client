import { Button, Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";
import { useContext, useEffect, useState } from "react";
import Image from 'next/image';
import { UserCollectionContext, UserCollectionProvider, capacity } from "@/context/UserCollectionContext";
import { useRouter } from "next/router";

export default function Artwork({id}: {id: number}) {
    const router = useRouter();

    // array of objects id strings stored in global context
    const {userCollection, setUserCollection} = useContext(UserCollectionContext);

    // data is the object fetched from met api
    const [data, setData] = useState({}) as any;
    const [loading, setLoading] = useState(true);
    
    // is this id present in the user collection
    const [present, setPresent] = useState(userCollection.length > 50 || userCollection.includes(id)); 

    // fetch artwork data on mount
    useEffect(() => {
        async function fetchData() {
            const res = await fetch(`/api/artwork/${id}`);
            const data = await res.json();
            setData(data);
            setLoading(false);
        }
        fetchData();
    }, [id])

    const toggleCollection = () => {
        // add id to user collection if it's not already present and there is room
        if(userCollection.length < capacity && !userCollection.includes(id)){
            setUserCollection([...userCollection, id]);
            setPresent(true);
        }
        // remove id from user collection if it's present
        else if(userCollection.includes(id)){
            setUserCollection(userCollection.filter((item: number) => item !== id))
            setPresent(false);
        }
    }

    return (
        <> 
            {!loading && ( <>

                <Card shadow={false} className={`w-full flex flex-row justify-center text-center m-6 p-1 ${data.isHighlight && "border-2 border-yellow-700"}`}>

                    <CardHeader className="w-2/5 flex justify-center m-0 shrink-0 rounded-r-none hover:bg-gray-200" onClick={() => router.push(`/artwork/${id}`)}>
                        <Image src={data.primaryImage || "/n-a.png"} alt={data.title || "no alt text available"} fill={true} style={{objectFit: "contain"}} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"/>
                    </CardHeader>

                    <CardBody className="w-auto m-0 p-10 flex flex-col justify-between items-center">
                        <div className="w-full grid grid-cols-2 gap-4 justify-center items-center">
                            <Typography variant="small" className="m-2 text-right">
                                Title
                            </Typography>
                            
                            <Typography variant="h3" className="m-2 text-center">
                                {data.title || "N/A"}
                            </Typography>

                            <Typography variant="small" className="m-2 text-right">
                                Artist Name
                            </Typography>
                            
                            <Typography variant="h5" className="m-2 text-center">
                                {data.artistDisplayName || "N/A"}
                            </Typography>

                            <Typography variant="small" className="m-2 text-right">
                                Department
                            </Typography>
                        
                            <Typography variant="h6" className="m-2 text-center">
                                {data.department || "N/A"}
                            </Typography>

                            <Typography variant="small" className="m-2 text-right">
                                Medium
                            </Typography>
                        
                            <Typography variant="h6" className="m-2 text-center">
                                {data.medium || "N/A"}
                            </Typography>
                        </div>

                        <Button size="lg" className="mt-2" ripple={true} onClick={toggleCollection}>{!present ? "Add to Collection" : "Remove from Collection"}</Button>
                    </CardBody>
                </Card>
            </>
            )}
        </>
    )
}