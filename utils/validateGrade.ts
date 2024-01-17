export const valiteGrade = (grade:string) => {
  if(grade === "1ro"){
    // return {grade:1}
    return "1"
  }
  if(grade === "2do"){
    // return {grade:2}
    return "2"
  }
  if(grade === "3ro"){
    // return {grade:3}
    return "3"
  }
  if(grade === "4to"){
    // return {grade:4}
    return "4"
  }
  if(grade === "5to"){
    // return {grade:5}
    return "5"
  }
  if(grade === "6to"){
    // return {grade:6}
    return "6"
  }
  if(grade === "1ro sec."){
    // return {grade:7}
    return "7"
  }
  if(grade === "2do sec."){
    // return {grade:8}
    return "8"
  }
  if(grade === "3ro sec."){
    // return {grade:9}
    return "9"
  }
  if(grade === "4to sec."){
    // return {grade:10}
    return "10"
  }
  if(grade === "5to sec."){
    // return {grade:11}
    return "11"
  }
}

export const convertGrade = (grade:string) => {
if(grade === "1") return "1ro"
if(grade === "2") return "2do"
if(grade === "3") return "3ro"
if(grade === "4") return "4to"
if(grade === "5") return "5to"
if(grade === "6") return "6to"
if(grade === "7") return "1ro sec."
if(grade === "8") return "2ro sec."
if(grade === "9") return "3ro sec."
if(grade === "10") return "4to sec."
if(grade === "11") return "5to sec."
}