import { StoreOptions } from 'vuex'
import settings from "@/settings"

export default <StoreOptions<{[name:string]:any}>>{
    namespaced: true,
    state: {
        ...settings
    }
}
