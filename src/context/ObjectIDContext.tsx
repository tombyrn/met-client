import { createContext, useEffect, useState } from "react";

export const ObjectIDContext = createContext({
    objectIDs: [] as number[], 
    setObjectIDs: (arr: number[]) => {}, 
    total: 0, 
    setTotal: (num: number) => {}, 
    shuffledIDs: [] as number[], 
    setShuffledIDs: (arr: number[]) => {}
});

export function shuffle(arr: any[]) {
    let array = [...arr];
    let currentIndex = array.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
}

export function ObjectIDProvider({children}: {children: React.ReactNode}) {
    const [objectIDs, setObjectIDs] = useState<number[]>([]);
    const [shuffledIDs, setShuffledIDs] = useState<number[]>([]) as any;
    const [total, setTotal] = useState<number>(0);

    useEffect(() => {
        async function fetchData() {
            const res = await fetch(`/api/objects`);
            const data = await res.json();
            setObjectIDs(data.objectIDs.sort((a: number, b: number) => a - b));
            setShuffledIDs(shuffle(data.objectIDs));
            setTotal(data.total);
        }
        fetchData();
    }, [])

    return (<>
        <ObjectIDContext.Provider value={{objectIDs, setObjectIDs, total, setTotal, shuffledIDs, setShuffledIDs}}>
            {children}
        </ObjectIDContext.Provider>
    </>
    );
  }