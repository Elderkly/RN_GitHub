
export default class ArrayUtil {
    /*
        判断数组是否一致
    */
    static isEqual (arr1,arr2) {
        if (!(arr1 && arr2)) return  false
        if (arr1.length !== arr2.length) return false
        for (let x in arr2) {
            if (JSON.stringify(arr2[x]) !== JSON.stringify(arr1[x])) return false
        }
        return true
    }
}