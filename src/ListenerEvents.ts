import { 
    factorialFunction,    
} from "./utils"

var str:string= "0";

let calculateStr:Array<string> = [];

export default class ListenerEvents{

    // it will map corresponding element id to value
    private elementMap = new Map<string,string>([
        ["zero","0"],
        ["one","1"],
        ["two","2"],
        ["three","3"],
        ["four","4"],
        ["five","5"],
        ["six","6"],
        ["seven","7"],
        ["eight","8"],
        ["nine","9"]
    ])

    private textDisplay:HTMLInputElement = document.getElementById("displayStr") as HTMLInputElement;
    private elementFromListener:HTMLElement;
    

    constructor(public elementId:string){
        // this.elementId = elementId;        
        this.textDisplay.value = str;
        this.elementFromListener = document.getElementById(this.elementId) as HTMLElement
    }

 
    // listener callback function that retrun callback : higher order function
    /**
     * 
     * @param callbackfn {Function} callback function
     */
    private listenerFunction(callbackfn:Function){
        this.elementFromListener.addEventListener("click",() => {            
            str = callbackfn();
            this.textDisplay.value = str;            
        })
        this.elementFromListener.addEventListener("keydown",(event) => {            
            event.preventDefault();          
        })

    }

    // Adding events for individual units
    //events for number    
    _listeningNumberEvents = () => {
        this.listenerFunction(() => {
            return str === "0" ? this.elementMap.get(this.elementId)!.toString() : str.concat(this.elementMap.get(this.elementId)!.toString())            
        })              

    }

    //events for arithmetic operators
    _listeningArithmeticEvents(){
        this.listenerFunction(() => {
            calculateStr.push(str,this.elementFromListener.textContent as string)
            return "0";            
        })
    }

    //after equal operator clicks or enter
    _returnArithmeticOperations(){
        this.listenerFunction(() => {
            
            if(calculateStr.length > 0){
                calculateStr.push(str)
                let c = calculateStr.toString().replaceAll(",","")                
                let sum = eval(c)
                const historyText:HTMLElement = document.querySelector(".history-text") as HTMLElement
                historyText.innerText = c + "=" + sum;
                calculateStr = []
                return sum;
            }else{
                let sum = this.textDisplay.value                                
                return eval(sum);
            }
        })
    }

   /**
    *  * Mischelleneous Operation
    * @param s {String}
    */
    _miscOperation(s:string){ 
        this.listenerFunction(() => {            
            if(!isNaN(parseInt(s))) return s;            
            else if(s === "(" || s === "-") return s.concat(str)            
            else{
                let temp = str;
                return temp.concat(s)
            }
        });
    }

    _computeOperation(s:string){
        this.listenerFunction(() => {
            let t:number = Number(str);
            if(s === "absolute"){
                // document.querySelector(".history-text").innerText = this.#textDisplay.value + "=";
                return Math.abs(t);
            }else{

                let m = new Map([
                    ["sineFunction",Math.sin(t)],
                    ["cosineFunction",Math.cos(t)],
                    ["tangentFunction",Math.tan(t)],
                    ["log",Math.log(t)],
                    ["raiseToTen",Math.pow(10,t)],
                    // ["absolute",Math.abs(t)],
                    ["root",Math.sqrt(t)],
                    ["square",Math.pow(t,2)],
                    ["factorial",factorialFunction(t.toString())]
                ])
                return m.get(s);                
            }                       
        });
    }

    _clearOperation(s:string):void{
        this.listenerFunction(() => {
            let temp:string[] | string = str;
            
            if(s === "clear" && temp.length > 1){                
                temp = temp.split("")
                temp.pop();
                temp = temp.toString().replaceAll(",","")            
                return temp;
            }
            if(s === "ce"){
                calculateStr = [];
                return "0"
            }
            else{
                return "0"
            }
        })
    }
}
