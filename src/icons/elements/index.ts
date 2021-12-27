import { h,VNode } from "vue";
import htm from "htm"
const html = htm.bind(h)

type Element = {
    [name:string]: VNode | VNode[]
}

// 注意使用 html``
const elements:Element = {
    "element-dashboard": html`<svg t="1639367765453" class="icon" viewBox="0 0 1064 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2085" width="200" height="200"><path d="M1029.825829 639.009994a33.216994 33.216994 0 0 1-33.216994-33.217995V418.78003a33.216994 33.216994 0 1 1 66.433989 0v187.012969a33.216994 33.216994 0 0 1-33.216995 33.217995z m-329.848945 384.656936a33.216994 33.216994 0 0 1-16.607997-62.11599l161.767973-93.340984a33.216994 33.216994 0 1 1 33.217994 57.46599l-161.768973 93.339985a33.216994 33.216994 0 0 1-16.608997 4.650999z m-336.823944 0a33.216994 33.216994 0 0 1-16.608998-4.317999l-161.767973-93.340985a33.216994 33.216994 0 1 1 33.216995-57.46599l161.768973 93.339984A33.216994 33.216994 0 0 1 363.15294 1023.99993zM33.303994 639.009994A33.216994 33.216994 0 0 1 0.087 605.791999V418.78003a33.216994 33.216994 0 0 1 66.434989 0v187.012969a33.216994 33.216994 0 0 1-33.217995 33.217995z m168.412973-478.329921a33.216994 33.216994 0 0 1-16.940998-60.45599l162.099973-95.001984a33.216994 33.216994 0 0 1 33.217995 57.465991l-162.099973 93.672984a33.216994 33.216994 0 0 1-16.276997 4.317999z m660.02989 0a33.216994 33.216994 0 0 1-16.609997-4.318999l-162.099973-93.672984a33.216994 33.216994 0 1 1 33.216994-57.465991l162.099973 95.001984a33.216994 33.216994 0 0 1-16.607997 62.11599z" fill="#050505" p-id="2086"></path><path d="M699.312884 1023.99993a33.216994 33.216994 0 0 1-29.895995-18.601997 153.795974 153.795974 0 0 0-276.035954 0 33.216994 33.216994 0 0 1-59.45999-29.231995 220.230963 220.230963 0 0 1 395.287934 0A33.216994 33.216994 0 0 1 699.312884 1023.99993zM531.564912 171.972071A218.902964 218.902964 0 0 1 332.260945 48.737092a33.216994 33.216994 0 1 1 61.11999-29.563995 152.799975 152.799975 0 0 0 138.183977 86.365985A152.799975 152.799975 0 0 0 669.749889 19.173097a33.216994 33.216994 0 1 1 59.78999 29.231995 218.569964 218.569964 0 0 1-197.974967 123.567979z m485.637919 280.022954a220.230963 220.230963 0 0 1-182.69497-342.802943 33.216994 33.216994 0 0 1 55.139991 37.202994 153.795974 153.795974 0 0 0 132.869978 239.49696 33.216994 33.216994 0 0 1 33.217995 33.217994 33.216994 33.216994 0 0 1-33.217995 33.216995z m-816.149864 478.66192a33.216994 33.216994 0 0 1-27.570996-51.818991A153.795974 153.795974 0 0 0 35.297994 639.673994 33.216994 33.216994 0 0 1 0.088 608.449999a33.216994 33.216994 0 0 1 30.890995-35.542994 219.899963 219.899963 0 0 1 205.615966 109.617982 218.569964 218.569964 0 0 1-7.971999 232.520961 33.216994 33.216994 0 0 1-27.569995 15.611997zM46.589992 451.996025h-15.279997a33.216994 33.216994 0 1 1 4.649999-66.434989 153.795974 153.795974 0 0 0 138.184977-239.16496 33.216994 33.216994 0 1 1 54.476991-37.202994 218.902964 218.902964 0 0 1 7.971999 232.520961A218.569964 218.569964 0 0 1 46.589992 451.996025z m815.486865 478.66192a33.216994 33.216994 0 0 1-27.569996-14.614997 220.230963 220.230963 0 0 1 199.303967-342.470943 33.216994 33.216994 0 1 1-4.317999 66.433989A153.795974 153.795974 0 0 0 891.309852 879.171954a33.216994 33.216994 0 0 1-29.231995 51.485991zM531.564912 701.125984A189.006969 189.006969 0 1 1 720.57188 512.120015a189.006969 189.006969 0 0 1-189.006968 189.006969z m0-311.246949a122.57198 122.57198 0 1 0 122.571979 122.57298 122.57198 122.57198 0 0 0-122.571979-122.57298z" fill="#050505" p-id="2087"></path></svg>`
    ,"element-dianzan": html`<svg class="icon" style="width: 1em;height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1198"><path d="M598.354747 67.542626c-48.148687 0-90.130101 32.905051-98.960808 79.437576 0 0-14.312727 72.882424-21.798787 99.090101-12.308687 43.196768-55.363232 90.944646-86.522829 106.188283-23.531313 11.636364-110.99798 11.765657-116.350707 11.765656H155.707475c-32.762828 0-59.384242 26.479192-59.384243 59.384243v475.022222c0 32.762828 26.479192 59.384242 59.384243 59.384242h548.033939c88.126061 0 163.025455-64.452525 176.135758-151.647676l45.873131-305.713132c10.834747-71.809293-44.8-136.274747-117.423838-136.274747H673.254141s20.066263-66.469495 30.228687-178.669899c5.081212-56.837172-35.167677-110.99798-94.280404-117.152323-3.620202-0.54303-7.227475-0.814545-10.847677-0.814546zM333.705051 898.288485V421.533737c38.917172-2.534141 66.999596-8.016162 83.574949-16.316767 43.726869-21.669495 99.633131-81.040808 117.281616-143.088485 7.899798-27.681616 21.39798-96.155152 23.001212-104.184243 3.47798-17.92 20.596364-31.159596 40.649697-31.159596 1.603232 0 3.206465 0.129293 4.822627 0.271516 28.211717 2.947879 43.326061 29.698586 41.32202 52.686868-9.360808 103.912727-27.823838 166.503434-28.082425 166.904243l-23.130505 76.489697h215.182223c17.519192 0 33.564444 7.356768 45.071515 20.596363 11.507071 13.239596 16.316768 30.228687 13.640404 47.618586L821.294545 797.052121c-8.830707 58.569697-58.181818 101.094141-117.423838 101.094142h-370.165656v0.142222z m-177.997576 0v-475.022222h118.626262v475.022222H155.707475z m0 0" p-id="1199"></path></svg>`
    ,"element-pinglun": html`<svg class="icon" style="width: 1em;height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2420"><path d="M850.879104 96.41591l-676.303067 0c-60.681034 0-110.049418 49.367361-110.049418 110.049418l0 446.200388c0 60.681034 49.367361 110.049418 110.049418 110.049418l90.307795 0L396.936381 931.129846c3.793396 4.838192 9.598612 7.66354 15.746636 7.66354s11.952216-2.825348 15.746636-7.66354l132.052548-168.414711 290.396903 0c60.681034 0 110.049418-49.367361 110.049418-110.049418L960.928522 206.465329C960.928522 145.784294 911.561162 96.41591 850.879104 96.41591zM920.91111 652.665717c0 38.614459-31.416524 70.030983-70.030983 70.030983L550.744419 722.6967c-6.147 0-11.952216 2.825348-15.745612 7.66354L412.683017 886.356107l-122.31579-155.995867c-3.792373-4.838192-9.597589-7.66354-15.745612-7.66354l-100.045577 0c-38.614459 0-70.030983-31.416524-70.030983-70.030983L104.545054 206.465329c0-38.614459 31.416524-70.030983 70.030983-70.030983l676.303067 0c38.614459 0 70.030983 31.416524 70.030983 70.030983L920.910087 652.665717zM272.621051 344.526731c-44.132126 0-80.035848 35.903721-80.035848 80.035848 0 44.132126 35.903721 80.036871 80.035848 80.036871s80.035848-35.904745 80.035848-80.036871C352.655875 380.430452 316.752154 344.526731 272.621051 344.526731zM272.621051 464.582037c-22.065552 0-40.017412-17.951861-40.017412-40.018436 0-22.065552 17.952884-40.017412 40.017412-40.017412 22.065552 0 40.017412 17.951861 40.017412 40.017412C312.638463 446.629153 294.686602 464.582037 272.621051 464.582037zM512.727571 344.526731c-44.132126 0-80.035848 35.903721-80.035848 80.035848 0 44.132126 35.903721 80.036871 80.035848 80.036871 44.132126 0 80.035848-35.904745 80.035848-80.036871C592.763418 380.430452 556.859697 344.526731 512.727571 344.526731zM512.727571 464.582037c-22.065552 0-40.017412-17.951861-40.017412-40.018436 0-22.065552 17.951861-40.017412 40.017412-40.017412 22.065552 0 40.017412 17.951861 40.017412 40.017412C552.746006 446.629153 534.793122 464.582037 512.727571 464.582037zM752.836137 344.526731c-44.131103 0-80.035848 35.903721-80.035848 80.035848 0 44.132126 35.904745 80.036871 80.035848 80.036871s80.035848-35.904745 80.035848-80.036871C832.871985 380.430452 796.96724 344.526731 752.836137 344.526731zM752.836137 464.582037c-22.066575 0-40.017412-17.951861-40.017412-40.018436 0-22.065552 17.951861-40.017412 40.017412-40.017412s40.017412 17.951861 40.017412 40.017412C792.853549 446.629153 774.902712 464.582037 752.836137 464.582037z" p-id="2421"></path></svg>`
    ,"element-jvbao": html`<svg class="icon" style="width: 1.1005859375em;height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1127 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3261"><path d="M1108.468296 824.890547C1159.055032 910.219597 1097.227863 1024 990.429373 1024L130.432879 1024C29.258031 1024-32.574625 910.219597 18.012112 824.890547L450.825613 68.266574C473.306472 22.754136 518.276424 0 563.240888 0 608.209469 0 653.173934 22.754136 675.660283 68.266574L1108.468296 824.890547 1108.468296 824.890547 1108.468296 824.890547 1108.468296 824.890547ZM1020.384123 877.110641 1019.583053 875.735153 586.77504 119.111177 583.854223 113.62523C580.333998 106.500274 573.244216 102.4 563.240888 102.4 553.240806 102.4 546.151071 106.500212 542.636068 113.61633L539.710577 119.111663 106.096287 877.110641C95.301134 895.319767 109.937021 921.6 130.432879 921.6L990.429373 921.6C1016.30634 921.6 1031.298263 895.520476 1020.384123 877.110641L1020.384123 877.110641 1020.384123 877.110641 1020.384123 877.110641ZM558.08319 307.2C532.482248 307.2 512 322.819385 512 342.344809L512 579.251379C512 598.776801 532.482248 614.4 558.08319 614.4L568.321812 614.4C593.922749 614.4 614.4 598.776801 614.4 579.251379L614.4 342.344809C614.4 322.819385 593.922749 307.2 568.321812 307.2L558.08319 307.2 558.08319 307.2 558.08319 307.2 558.08319 307.2ZM512 766.885176C512 780.001705 517.522432 793.032632 526.999818 802.305669 536.477199 811.577487 549.797038 816.975247 563.200625 816.975247 576.602962 816.975247 589.927798 811.577487 599.405184 802.305669 608.882565 793.032632 614.4 780.001705 614.4 766.885176 614.4 753.772319 608.882565 740.741391 599.405184 731.469573 589.927798 722.19776 576.602962 716.8 563.200625 716.8 549.797038 716.8 536.477199 722.19776 526.999818 731.469573 517.522432 740.741391 512 753.772319 512 766.885176L512 766.885176 512 766.885176 512 766.885176Z" p-id="3262"></path></svg>`
    ,"element-qrcode": html`<svg class="icon" style="width: 1em;height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1382"><path d="M384 64l-249.6 0c-51.2 0-89.6 41.6-89.6 89.6l0 227.2c0 51.2 41.6 89.6 89.6 89.6l249.6 0c51.2 0 89.6-41.6 89.6-89.6l0-227.2C473.6 105.6 435.2 64 384 64zM428.8 380.8c0 25.6-19.2 44.8-44.8 44.8l-249.6 0c-25.6 0-44.8-19.2-44.8-44.8l0-227.2c0-25.6 19.2-44.8 44.8-44.8l249.6 0c25.6 0 44.8 19.2 44.8 44.8L428.8 380.8zM192 192l134.4 0 0 134.4-134.4 0 0-134.4ZM377.6 544l-243.2 0c-48 0-86.4 38.4-86.4 89.6l0 220.8c0 48 38.4 89.6 86.4 89.6l243.2 0c48 0 86.4-38.4 86.4-89.6l0-220.8C467.2 582.4 425.6 544 377.6 544zM422.4 851.2c0 25.6-19.2 44.8-44.8 44.8l-243.2 0c-25.6 0-44.8-19.2-44.8-44.8l0-220.8c0-25.6 19.2-44.8 44.8-44.8l243.2 0c25.6 0 44.8 19.2 44.8 44.8L422.4 851.2zM192 668.8l131.2 0 0 131.2-131.2 0 0-131.2ZM633.6 470.4l249.6 0c51.2 0 89.6-41.6 89.6-89.6l0-227.2c0-51.2-41.6-89.6-89.6-89.6l-249.6 0c-51.2 0-89.6 41.6-89.6 89.6l0 227.2C544 432 585.6 470.4 633.6 470.4zM588.8 153.6c0-25.6 19.2-44.8 44.8-44.8l249.6 0c25.6 0 44.8 19.2 44.8 44.8l0 227.2c0 25.6-19.2 44.8-44.8 44.8l-249.6 0c-25.6 0-44.8-19.2-44.8-44.8L588.8 153.6zM700.8 192l134.4 0 0 134.4-134.4 0 0-134.4ZM572.8 716.8l137.6 0c12.8 0 22.4-9.6 22.4-22.4l0-137.6c0-12.8-9.6-22.4-22.4-22.4l-137.6 0c-12.8 0-22.4 9.6-22.4 22.4l0 137.6C550.4 707.2 560 716.8 572.8 716.8zM886.4 563.2l0 38.4c0 12.8 12.8 25.6 25.6 25.6l38.4 0c12.8 0 25.6-12.8 25.6-25.6l0-38.4c0-12.8-12.8-25.6-25.6-25.6l-38.4 0C899.2 537.6 886.4 547.2 886.4 563.2zM582.4 944l48 0c12.8 0 22.4-9.6 22.4-22.4l0-48c0-12.8-9.6-22.4-22.4-22.4l-48 0c-12.8 0-22.4 9.6-22.4 22.4l0 48C560 934.4 569.6 944 582.4 944zM944 704l-99.2 0c-16 0-28.8 12.8-28.8 28.8l0 44.8-48 0c-19.2 0-32 12.8-32 32l0 99.2c0 16 12.8 28.8 28.8 28.8l179.2 3.2c16 0 28.8-12.8 28.8-28.8l0-179.2C972.8 716.8 960 704 944 704z" p-id="1383"></path></svg>`
}

export default elements