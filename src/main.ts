import ListenerEvents from "./ListenerEvents"

interface GlobalObjectAssignment{
    numberArray:Array<string>
    arithmeticOperatorArray: Array<string>
    equalOperator:Array<string>
    clearOperator:Array<string>
    miscOperator:Array<string>
    computeOperator:Array<string>
}

interface bindStringObjectAssignment{
    dot:string 
    left_parentheses:string
    right_parentheses:string
    pi:string
    exponential:string
    plus_minus:string
    raiseTo:string
}

function main(){
    
    // Calculate and eventListening for numbers
    const globalObjAssign:GlobalObjectAssignment = {
        numberArray:["one","two","three","four","five","six","seven","eight","nine","zero"],
        arithmeticOperatorArray: ["addition","subtraction","multiply","division","modulo"],
        equalOperator:["equal"],
        clearOperator:["clear","ce","c"],
        miscOperator:["dot","left_parentheses","right_parentheses","pi","exponential","plus_minus","raiseTo"],
        computeOperator:["factorial","sineFunction","cosineFunction","tangentFunction","log","absolute","root","raiseToTen","square"],        
    }

    // Will bind an Object and will return the Object
    const ObjReturn = (x:keyof GlobalObjectAssignment) => {
        let obj = new Array();
        globalObjAssign[x].forEach(i => {
            obj.push(new ListenerEvents(i))            
        })        
        return obj;
    }

    //bind string for equal operator
    // you can add there and will later 
    const bindString:bindStringObjectAssignment = {
        "dot":".",        
        "left_parentheses":"(",
        "right_parentheses":")",
        "pi":"3.142857143",
        "exponential":"2.718281828",
        "plus_minus":"-",
        "raiseTo":"**"
    };

    
    
    // main logic
    for(let x of Object.keys(globalObjAssign)){
    
        switch(x){
            case "numberArray":                
                ObjReturn(x).forEach(x => x._listeningNumberEvents())
                break;
            
            case "arithmeticOperatorArray":
                ObjReturn(x).forEach(i => i._listeningArithmeticEvents())
                break;
    
            case "equalOperator":
                ObjReturn(x).forEach(i => i._returnArithmeticOperations())
                break;
            
            case "miscOperator":
                ObjReturn(x).forEach(i => {                      
                    i._miscOperation(bindString[i.elementId as keyof bindStringObjectAssignment])
                })
                break;

            case "clearOperator":
                ObjReturn(x).forEach(i => {
                    i._clearOperation(i.elementId)
                })
                break;

            case "computeOperator":
                ObjReturn(x).forEach(i => {                    
                    i._computeOperation(i.elementId)
                })
                break;
            
            default:
                break;    
        }            
    }
}    

// invoking main function
main();