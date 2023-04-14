exports.numberWithComas = (x) => {
   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
exports.agregarEspacios = (num) => {
  // Convertir el número a una cadena y formatearlo con toLocaleString()
  let numFormateado = num.toLocaleString('en-US');
  // Reemplazar todas las comas con espacios en blanco
  numFormateado = numFormateado.replace(/,/g, ' ');
  // Retornar el número formateado con espacios
  return numFormateado;
}