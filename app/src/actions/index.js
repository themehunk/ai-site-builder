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


export const tmplLodaing = (payload) =>{
  return { 
    type: "INSTALL",
    payload:payload
     }
}
