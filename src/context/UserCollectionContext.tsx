import { createContext, useEffect, useState } from "react";

export const UserCollectionContext = createContext({
    userCollection: [] as number[],
    setUserCollection: (arr: number[]) => {},
    username: "User",
    setUsername: (name: string) => {}
});
export const capacity = 30

export function UserCollectionProvider({children}: {children: React.ReactNode}) {
    const [userCollection, setUserCollection] = useState<number[]>([]);
    const [username, setUsername] = useState<string>("User");

    // fetch user collection from local storage on mount
    useEffect(() => {
        const storedCollection = localStorage.getItem("userCollection");
        const storedUsername = localStorage.getItem("username");

        if (storedCollection) {
            setUserCollection(JSON.parse(storedCollection));
        }
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    // save user collection to local storage on change
    useEffect(() => {
        if (userCollection.length > 0) {
            localStorage.setItem("userCollection", JSON.stringify(userCollection));
        } else {
            // if userCollection is empty, remove it from local storage
            localStorage.removeItem("userCollection");
        }
    }, [userCollection]);

    // save username to local storage when it changes
    useEffect(() => {
        if (username !== "User") {
            localStorage.setItem("username", username);
        }
        if (username === "") {
            setUsername("User");
        }
    }, [username]);

    return (<>
        <UserCollectionContext.Provider value={{userCollection, setUserCollection, username, setUsername}}>
            {children}
        </UserCollectionContext.Provider>
    </>
    );
  }