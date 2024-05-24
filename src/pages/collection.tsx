import Artwork from "@/components/Artwork";
import Layout from "@/components/Layout";
import Username from "@/components/Username";
import { UserCollectionContext } from "@/context/UserCollectionContext";
import { Typography } from "@material-tailwind/react";
import { useContext } from "react";

export default function CollectionPage() {
    /* @ts-ignore */
    const {userCollection, setUserCollection} = useContext(UserCollectionContext);

    return (
        <Layout>
            {/* @ts-ignore
            <Typography variant="h1" className="m-7">
                User Collection
            </Typography>

            {/* Artwork */}
            {/* { !userCollection.length ? <>Collection Empty</> :(
                <div className=" w-1/2 h-1/3">
                    {userCollection.map((id: string) => {
                        return <Artwork key={id} id={id}/>
                    })}
                </div>
            )} */} 

            

            <Username />
            
            <div className="p-6 w-full h-fit flex flex-col justify-start items-stretch overflow-y-hidden bg-gradient-to-r from-white to-red-900 from-red text-white font-semibold py-2 px-4 rounded-2xl">

            { !userCollection.length ? <>Collection Empty</> :(
                <div className="w-full p-12">
                    {userCollection.map((id: string) => {
                        return <Artwork key={id} id={id}/>
                    })}
                </div>
            )}
            </div>

        </Layout>
    )
}