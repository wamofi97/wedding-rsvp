import {create} from "zustand"

export const useWeddingData = create((set) => ({
    datas: [],
    setDatas: (datas) => ({datas}),
    createWedding: async(newWedding) => {
        
    }
}))

