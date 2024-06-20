import Artwork from "@/components/Artwork";
import Layout from "@/components/Layout";
import Username from "@/components/Username";
import { UserCollectionContext } from "@/context/UserCollectionContext";
import { Typography } from "@material-tailwind/react";
import { useContext } from "react";

export default function CollectionPage() {

    const {userCollection, setUserCollection} = useContext(UserCollectionContext);

    return (
        <Layout title="Your Collection">

            <Username />
            
            <div className="p-6 w-full h-fit flex flex-col justify-start items-stretch ">

            { !userCollection.length ? <>Collection Empty</> :(
                <div className="w-full p-12">
                    {userCollection.map((id, index) => {
                        return <Artwork key={index} id={id}/>
                    })}
                </div>
            )}
            </div>

        </Layout>
    )
}