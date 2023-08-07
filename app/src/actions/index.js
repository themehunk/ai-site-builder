export const addCategory = (cate) =>{
      return { 
        type: "ADD",
        payload:cate
         }
}

export const removeCategory = (cate) =>{
  return { 
    type: "REMOVE",
    payload:cate
   }
}

export const addTrueFalse = (payload) =>{
  return { 
    type: "ACTION",
    payload:payload
     }
}

// installStart use
export const tmplLodaing = (payload) =>{
  return { 
    type: "INSTALL",
    payload:payload
     }
}

// Step Button Clik
export const stepOne = (payload) =>{
  return { 
    type: "STEP1",
    payload:payload
     }
}

export const stepTwo = (payload) =>{
  return { 
    type: "STEP2",
    payload:payload
     }
}

export const stepThree = (payload) =>{
  return { 
    type: "STEP3",
    payload:payload
     }
}

export const stepFour = (payload) =>{
  return { 
    type: "STEP4",
    payload:payload
     }
}