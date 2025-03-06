import { atom } from "recoil";



export const userAtom = atom({
    key: "userAtom",
    default: localStorage.getItem("user-info")
})


