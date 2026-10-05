import { openDB, type IDBPDatabase } from "idb"
import { useCallback } from "react";

import { CombineZero } from "@/shared/util/combineZero";

const DB_NAME = String(import.meta.env.VITE_INDEXED_DB_NAME);
const VERSION = Number(import.meta.env.VITE_INDEXED_DB_VERSION);
const STORE_NAME = String(import.meta.env.VITE_INDEXED_DB_STORE_NAME);

const days = ["일", "월", "화", "수", "목", "금", "토"];

function GetDB() : Promise<IDBPDatabase> {
    return openDB(DB_NAME, VERSION, {
        upgrade(db) {
            if(db.objectStoreNames.contains(STORE_NAME)) {
                db.deleteObjectStore(STORE_NAME);
            }
            db.createObjectStore(STORE_NAME, {keyPath : "mbti"})
        }
    })
}

function CreateTestDate() : string {
    const time = new Date();

    const year = time.getFullYear();
    const month = CombineZero(time.getMonth()+1);
    const date = CombineZero(time.getDate());

    const day = days[time.getDay()];

    const hours = CombineZero(time.getHours());
    const min = CombineZero(time.getMinutes());

    
    return `${year}.${month}.${date} (${day}) ${hours}:${min}`
}

export const useIndexedDBHook = () => {

    async function GetLatestTestResult() {
        const db = await GetDB();
        const latest = await db.getAll(STORE_NAME)

        return latest?.at(-1)??null
    }

    const SetLatestTestResult = useCallback(async (item : LATEST_ITEM_PARAMS) => {

        if(!item) return console.log("item undefined",item);

        const db = await GetDB();

        await db.clear(STORE_NAME);
        await db.put(STORE_NAME,{
            ...item,
            testDate : CreateTestDate()
        });

    }, []);

    return { GetLatestTestResult, SetLatestTestResult }
}
