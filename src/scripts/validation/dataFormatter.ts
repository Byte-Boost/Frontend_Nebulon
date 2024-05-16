export function formatCPF(v:string){
    v=v.replace(/\D/g,"")                    //Remove tudo o que não é dígito
    v = v.slice(0,11)
    v=v.replace(/(\d{3})(\d)/,"$1.$2")       //Coloca um ponto entre o terceiro e o quarto dígitos
    v=v.replace(/(\d{3})(\d)/,"$1.$2")       //Coloca um ponto entre o terceiro e o quarto dígitos
                                             //de novo (para o segundo bloco de números)
    v=v.replace(/(\d{3})(\d{1,2})$/,"$1-$2") //Coloca um hífen entre o terceiro e o quarto dígitos
    return v
}
export function formatCNPJ(v:string){
  v=v.replace(/\D/g,"")                           //Remove tudo o que não é dígito
  v = v.slice(0,14)
  v=v.replace(/^(\d{2})(\d)/,"$1.$2")             //Coloca ponto entre o segundo e o terceiro dígitos
  v=v.replace(/^(\d{2})\.(\d{3})(\d)/,"$1.$2.$3") //Coloca ponto entre o quinto e o sexto dígitos
  v=v.replace(/\.(\d{3})(\d)/,".$1/$2")           //Coloca uma barra entre o oitavo e o nono dígitos
  v=v.replace(/(\d{4})(\d)/,"$1-$2")              //Coloca um hífen depois do bloco de quatro dígitos
  return v
}
export function formatPhoneNumber(number: string){
  number = number.replace(/\D/g, ''); // Remove tudo que não é dígito
  number = number.slice(0, 11);
  number = number.replace(/^([1-9]{2})/, "($1) "); // Coloca os dois primeiros digitos entre parentesis
  if (number.length < 14) number = number.replace(/^(\(\d{2}\) \d{4})/, "$1-");
  if (number.length == 14) number = number.replace(/^(\(\d{2}\) \d{5})/, "$1-")
  return number;
}