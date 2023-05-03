/**
 * 
 * @param value 
 * @returns {string|number}
 */
export const factorialFunction = (value:string):string|number => {
    if(value === "0") return "1";
    else if(value === "1") return "1";
    else{
        let temp = parseInt(value)
        let sum = 1;
        while(temp!==0){
            sum *= temp;
            temp--;
        }
        return sum;
    }
}
