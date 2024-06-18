import { UserCollectionContext } from "@/context/UserCollectionContext";
import { Button, Input, Typography } from "@material-tailwind/react"
import { useContext, useEffect, useState } from "react"

export default function Username() {
    const [editing, setEditing] = useState(false);
    const [value, setValue] = useState("");
    const {username, setUsername} = useContext(UserCollectionContext);
    
    return (            
        <div className="w-full flex flex-row mb-5 justify-center items-center text-center">

            {editing ? 
                <form className="m-2"  onSubmit={() => {
                    setUsername(value);
                    setEditing(false);
                }}>
                    <Input size="lg" variant="outlined" label="Name" value={value} onChange={(e) => setValue(e.target.value)} crossOrigin={undefined}/> 
                </form>
                : <>
                    <Typography variant="h1" className="m-7">
                        {username}&#39;s Collections
                    </Typography> 
                </>
            }
            <Button onClick={(e) => {setEditing(!editing)}} >{editing ? "Cancel" : "Edit Name"} </Button>

        </div>
    )
}