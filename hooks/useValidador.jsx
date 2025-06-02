export const useValidador = () => {
  const ValidateType = (event, tipoDado = null) => {
    let tipo = tipoDado ? tipoDado.toLowerCase() : null;
    const keyCode = event.keyCode || event.which;
    const validNumbers = [
      48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102,
      103, 104, 105,
    ];
    const validOthers = [8, 9, 13, 46, 110, 188, 190];
    const validMinus = [109, 189]; // Teclas "-" no teclado numérico e principal
    const isValidNumber = validNumbers.includes(keyCode);
    const isValidOther = validOthers.includes(keyCode);
    const isValidMinus = validMinus.includes(keyCode);

    if (tipo === "integer" || tipo === "float") {
      if (!isValidNumber && !isValidOther) {
        event.preventDefault();
      }
    } else if (tipo === "string") {
      if (isValidNumber) {
        event.preventDefault();
      }
    } else if (tipo === "number") {
      if (!isValidNumber && !isValidOther && !isValidMinus) {
        event.preventDefault();
      }

      if (isValidMinus) {
        const {value, selectionStart} = event.target;
        if (value.includes("-") || selectionStart !== 0) {
          event.preventDefault();
        }
      }
    }
  };

  return {ValidateType};
};
