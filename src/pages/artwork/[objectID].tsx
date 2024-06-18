import Layout from "@/components/Layout";
import { Button, Card, CardBody, CardHeader, IconButton, Typography } from "@material-tailwind/react";
import { useContext, useEffect, useState } from "react";
import Image from 'next/image';
import { UserCollectionContext, capacity } from "@/context/UserCollectionContext";
import { useRouter } from "next/router";
import Link from "next/link";
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from "@heroicons/react/16/solid";
import { ObjectIDContext } from "@/context/ObjectIDContext";

export default function ArtworkPage() {
    const router = useRouter();
    const id = Number(router.query.objectID as string) || 1;

    // array of objects id strings stored in global context
    const { userCollection, setUserCollection } = useContext(UserCollectionContext);
    const { objectIDs } = useContext(ObjectIDContext);

    // data is the object fetched from met api
    const [data, setData] = useState({}) as any;
    const [loading, setLoading] = useState(true);
    
    // is this id present in the user collection
    const [isPresent, setPresent] = useState(false);
    console.log('id',  id);
    // fetch artwork data on mount
    useEffect(() => {
        let isMounted = true;
        async function fetchData() {
            const res = await fetch(`/api/artwork/${id}`);
            const data = await res.json();
            if(isMounted) {
                setData(data);
                setLoading(false);
            }
            userCollection.includes(id.toString()) ? 
                setPresent(true) : setPresent(false)
        }
        fetchData();

        return () => {isMounted = false}
    }, [id, setUserCollection, userCollection])

    const toggleCollection = () => {
        // add id to user collection if it's not already present and there is room
        if(userCollection.length < capacity && !userCollection.includes(id.toString())){
            setUserCollection([...userCollection, id.toString()]);
            setPresent(true);
        }
        // remove id from user collection if it's present
        else if(userCollection.includes(id.toString())){
            setUserCollection(userCollection.filter((item: string) => item !== id.toString()));
            setPresent(false);
        }
    }

    const clickLeft = () => {
        const index = objectIDs.indexOf(id.toString());
        if(index > 1) {
            router.push(`/artwork/${objectIDs[index-1]}`);
    }
    
    const clickRight = () => {
        const index = objectIDs.indexOf(id.toString());
        if(index < objectIDs.length - 2) {
            router.push(`/artwork/${objectIDs[index+1]}`);
    }
    
    return (
        <Layout title={data.objectID}> 
            {!loading && ( <>
                
                <Card className="w-full h-full flex flex-col justify-center  items-center m-12">
                    <CardHeader className="w-fit h-fit flex justify-center">
                        <Image src={data.primaryImage || data.primaryImageSmall || "/n-a.jpg"} alt={data.title || "no alt text available"} width={500} height={500} style={{objectFit: "contain"}}/>
                    </CardHeader>

                    <CardBody className="w-full p-10 flex flex-col justify-between items-center overflow-scroll text-ellipsis">
                        <div className="w-full flex flex-row justify-center items-center">
                            <Typography variant="small" className="m-2">
                                Title
                            </Typography>
                            
                            <Typography variant="h3" className="m-2">
                                {data.title || "N/A"}
                            </Typography>

                        </div>
                        <div className="w-full flex flex-row justify-center items-center">
                            <Typography variant="small" className="m-2">
                                Artist Name
                            </Typography>
                            
                            <Typography variant="h5" className="m-2">
                                {data.artistDisplayName || "N/A"}
                            </Typography>
                        </div>
                        <div className="w-full flex flex-row justify-center items-center">
                            <Typography variant="small" className="m-2">
                                Artist Bio
                            </Typography>
                            
                            <Typography variant="h6" className="m-2">
                                {data.artistDisplayBio || "N/A"}
                            </Typography>
                        </div>
                        <div className="w-full flex flex-row justify-center items-center">
                            <Typography variant="small" className="m-2">
                                Artist Nationality
                            </Typography>
                            

                            <Typography variant="h6" className="m-2">
                                {data.artistNationality || "N/A"}
                            </Typography>
                        </div>

                        <div className="w-full flex flex-row justify-center items-center">

                            <Typography variant="small" className="m-2">
                                Department
                            </Typography>


                            <Typography variant="h6" className="m-2">
                                {data.department || "N/A"}
                            </Typography>
                            
                        </div>
                        <div className="w-full flex flex-row justify-center items-center">

                            <Typography variant="small" className="m-2">
                                Medium
                            </Typography>


                            <Typography variant="h6" className="m-2">
                                {data.medium || "N/A"}
                            </Typography>
                            
                        </div>

                        <div className="w-full flex flex-row justify-center items-center">

                            <Typography variant="small" className="m-2">
                                Begin-End Date
                            </Typography>


                            <Typography variant="h6" className="m-2">
                                {`${data.objectBeginDate || "N/A"} - ${data.objectEndDate || "N/A"}`}
                            </Typography>
                        </div>

                        <div className="w-full flex flex-row justify-center items-center">

                            <Typography variant="small" className="m-2">
                                Gallery Number
                            </Typography>


                            <Typography variant="h6" className="m-2">
                                {data.GalleryNumber || "N/A"}
                            </Typography>
                        </div>

                        <div className="w-full flex flex-row justify-center items-center">

                            <Typography variant="small" className="m-2">
                                Accesion Number
                            </Typography>


                            <Typography variant="h6" className="m-2">
                                {data.accesionNumber || "N/A"}
                            </Typography>
                        </div>





                        <Typography variant="h6" className="m-2">
                            {data.isHighlight ? "This work is a MET Highlight" : "This work is not a MET Highlight"}
                        </Typography>


                        <Link href={data.objectURL} className="m-2 text-blue-500 underline hover:text-purple-200 ">View on MET</Link>

                        <Button size="lg" ripple={true} onClick={toggleCollection}>{!isPresent ? "Add to Collection" : "Remove from Collection"}</Button>
                    </CardBody>
                </Card>
            </>
            )}
            <div className="w-full flex justify-between">
                <IconButton color="white" onClick={clickLeft}><ArrowLeftCircleIcon className="w-full h-full"/></IconButton>
                <IconButton color="white" onClick={clickRight}><ArrowRightCircleIcon className="w-full h-full"/></IconButton>
            </div>
        </Layout>
    )
}