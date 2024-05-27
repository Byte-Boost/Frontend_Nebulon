import Swal from "sweetalert2"

export const successAlert = (text: string, log: string, cb: Function=()=>{})=>{
    Swal.fire({
      title: 'Sucesso',
      text: text,
      icon: 'success',
      showConfirmButton: false,
      timer: 1750,
      timerProgressBar: true,
    })
    console.log(log)
    cb()
  }
export const failureAlert = (log: string, cb:Function=()=>{})=>{
    Swal.fire({
        title: 'Oops!',
        text: `Algo de errado aconteceu :(`,
        icon: 'error',
        showConfirmButton: false,
        timer: 1750,
    });
    console.log(log)
    cb()
}