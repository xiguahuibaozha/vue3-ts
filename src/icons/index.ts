import { h } from "vue";
import elements from "./elements/index";
const svgComponents: Icon = {}
const svgs = require.context("./svgs", false, /\.svg$/)

svgs.keys().forEach(key => {
    const svg = svgs(key).default
    svgComponents[svg.id] = {
        render() {
            return h('svg', {}, [
                h('use', {
                    "xlink:href": `#${svg.id}`
                })
            ])
        }
    }
})

const elementComponents: Icon = {}
Object.keys(elements).forEach(item => {
    elementComponents[item] = {
        render() {
            return elements[item]
        }
    }
})

export default {
    ...svgComponents,
    ...elementComponents
}