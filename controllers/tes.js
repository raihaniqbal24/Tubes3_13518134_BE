// check date format dd/mm/yyyy
const checkDate = (text) => {
    let isDate = false;
  
    if(text.length === 10 && text[2] === '/' && text[5] === '/'){
      const date = parseInt(text.slice(0,2));
      const month = parseInt(text.slice(3, 5));
      const year = parseInt(text.slice(6));
      
      if(date > 0 && month > 0 && year > 0 && date <= 31 && month <= 12 && !isNaN(date) && !isNaN(month) && !isNaN(year)){
        isDate = true;
      }
    }
  
    return isDate;
  }
  
  // check math, doesnt check for the validity of the expression
  const checkMath = (text) => {
    let isMath = true;
    const numberChar = "0123456789+-/*()?";
  
  
    for(let i = 0; i < text.length ; i++){
      if(text[i] != " " && !numberChar.includes(text[i])){
        isMath = false;
      }
    }
    
    return isMath;
  }
  
  const questionType = (text) => {
    // split the test into word
    const words = text.split(" ");
    let type = 'text';
    
    // if one of the word is date or math, return date or math
    // regardless of other words
    words.forEach(element => {
      if(checkDate(element)){
        type = 'dayFromDate';
      }
      else if (checkMath(element)){
        type = 'calculation';
      }
    });
    return type;
  }

console.log(questionType("halo"));
console.log(questionType("halo world"));
console.log(questionType("20/12/2022"));
console.log(questionType("20/12/2022 hari apa ini?"));
console.log(questionType("20+3/(6-9)"));
console.log(questionType("apa hasil dari 10 + 10?"));