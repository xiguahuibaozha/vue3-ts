import reuqest from '@/util/axios'

export const getMenu = () => {
    return reuqest.get("/getMenu")
}