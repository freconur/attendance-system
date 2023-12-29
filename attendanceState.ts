export const attendanceState = (attendance: string | undefined) => {
  if(attendance){
    if (attendance[1].toString() === "7") {
      console.log('attendance0',attendance[0])
      console.log('attendance1',attendance[1])
      return true
    } else {
      return false
    }
  }
}