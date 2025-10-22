
const generateCode = (codlength)=>{
    const number = String(Math.random()).split(".")[1].split("")
    const length = number.length
    let code = ""
    if(!codlength){
        codlength = 4
    }
    for(let i=0;i<codlength; i++){
        code = code + number[length - (i+1)]
    }
    return code;
}

module.exports  = generateCode