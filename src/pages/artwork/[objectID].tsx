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

    const index = objectIDs.indexOf(id);

    // data is the object fetched from met api
    const [data, setData] = useState({}) as any;
    const [loading, setLoading] = useState(true);
    
    // is this id present in the user collection
    const [isPresent, setPresent] = useState(false);

    // fetch artwork data on mount
    useEffect(() => {
        let isMounted = true;
        setLoading(true);

        async function fetchData() {
            const res = await fetch(`/api/artwork/${id}`);
            const data = await res.json();
            if(isMounted) {
                setData(data);
                setLoading(false);
            }
        }
        fetchData();

        return () => {isMounted = false}
    }, [id])

    useEffect(() => {
        userCollection.includes(id) ? 
                setPresent(true) : setPresent(false)
    }, [id, userCollection])

    const toggleCollection = () => {
        // add id to user collection if it's not already present and there is room
        if(userCollection.length < capacity && !userCollection.includes(id)){
            setUserCollection([...userCollection, id]);
            setPresent(true);
        }
        // remove id from user collection if it's present
        else if(userCollection.includes(id)){
            setUserCollection(userCollection.filter((item: number) => item !== id));
            setPresent(false);
        }
    }

    return (
        <Layout title={data.objectID}> 
            {!loading && (
                <>
                <Card className="w-full h-full flex flex-col justify-center  items-center m-12">
                    <CardHeader className="w-fit h-fit flex justify-center">
                        <Image src={data.primaryImage || data.primaryImageSmall || "/n-a.png"} alt={data.title || "no alt text available"} width={500} height={500} style={{objectFit: "contain"}}/>
                    </CardHeader>

                    <CardBody className="w-1/2 p-10 flex flex-col justify-stretch items-center overflow-scroll">
                        <div className="grid grid-cols-2 gap-8 justify-center items-center">
                            <div>
                                <Typography variant="small" className="m-2 text-right">
                                    Title
                                </Typography>
                            </div>
                            
                            <div>
                                <Typography variant="h3" className="m-2 text-left">
                                    {data.title || "N/A"}
                                </Typography>

                            </div>

                            <div>
                                <Typography variant="small" className="m-2 text-right">
                                    Artist Name
                                </Typography>
                            </div>
                            
                            <div>
                                <Typography variant="h5" className="m-2 text-left">
                                    {data.artistDisplayName || "N/A"}
                                </Typography>
                            </div>

                            <div>
                                <Typography variant="small" className="m-2 text-right">
                                    Artist Bio
                                </Typography>
                            </div>
                            
                            <div>
                                <Typography variant="h6" className="m-2 text-left">
                                    {data.artistDisplayBio || "N/A"}
                                </Typography>
                            </div>

                            <div>
                                <Typography variant="small" className="m-2 text-right">
                                    Artist Nationality
                                </Typography>
                            </div>

                            <div>
                                <Typography variant="h6" className="m-2 text-left">
                                    {data.artistNationality || "N/A"}
                                </Typography>
                            </div>

                            <div>
                                <Typography variant="small" className="m-2 text-right">
                                    Department
                                </Typography>
                            </div>

                            <div>
                                <Typography variant="h6" className="m-2 text-left">
                                    {data.department || "N/A"}
                                </Typography>
                            </div>

                            <div>
                                <Typography variant="small" className="m-2 text-right">
                                    Medium
                                </Typography>
                            </div>

                            <div>
                                <Typography variant="h6" className="m-2 text-left">
                                    {data.medium || "N/A"}
                                </Typography>
                            </div>
                            
                            <div>
                                <Typography variant="small" className="m-2 text-right">
                                    Begin-End Date
                                </Typography>
                            </div>

                            <div>
                                <Typography variant="h6" className="m-2 text-left">
                                    {`${data.objectBeginDate || "N/A"} - ${data.objectEndDate || "N/A"}`}
                                </Typography>
                            </div>

                            <div>
                                <Typography variant="small" className="m-2 text-right">
                                    Gallery Number
                                </Typography>
                            </div>

                            <div>
                                <Typography variant="h6" className="m-2 text-left">
                                    {data.GalleryNumber || "N/A"}
                                </Typography>
                            </div>

                            <div>
                                <Typography variant="small" className="m-2 text-right">
                                    Accesion Number
                                </Typography>
                            </div>

                            <div>
                                <Typography variant="h6" className="m-2 text-left">
                                    {data.accesionNumber || "N/A"}
                                </Typography>
                            </div>

                        </div>

                        <Typography variant="h6" className="m-2">
                            {data.isHighlight ? "This work is a MET Highlight" : "This work is not a MET Highlight"}
                        </Typography>

                        <Link href={data.objectURL} className="m-2 text-blue-500 underline hover:text-purple-200 ">View on MET</Link>

                        <Button size="lg" ripple={true} onClick={toggleCollection}>{!isPresent ? "Add to Collection" : "Remove from Collection"}</Button>
                    </CardBody>
                </Card>

                <div className="w-full h-8 mb-5 pr-4 pl-4 flex justify-between">
                    {index > 0 && <Link href={`/artwork/${objectIDs[index-1]}`} className=""><ArrowLeftCircleIcon className="w-full h-full text-black"/></Link>}
                    {index < objectIDs.length-1 && <Link href={`/artwork/${objectIDs[index+1]}`} className=""><ArrowRightCircleIcon className="w-full h-full text-black"/></Link>}
                </div>
            </>)}
            
        </Layout>
    )
}