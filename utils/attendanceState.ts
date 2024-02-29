export const attendanceState = (attendance?: string) => {
  if(attendance){
    if (attendance[0].toString() === "0" && attendance[1].toString() === "7") {
      return true
    } else if (attendance[0].toString() === "0" && attendance[1].toString() === "6") {
      return true
    } else {
      return false
    }
  }
}