


function recorrerCadena(cadena) {
  for (i = 0; i < cadena.length; i++) {
    console.log(cadena[i]);
  }
}

function recorrerGramatica(cadena) {
  index = 0
  res = ""

  if ('f' === cadena[index]) index++
  else return "se esperaba un for"
  if ('o' === cadena[index]) index++
  else return "se esperaba un for"
  if ('r' === cadena[index]) index++
  else return "se esperaba un for"

  if ('(' === cadena[index]) index++
  else return "se esperaba un ("


  if ('a' === cadena[index] || 'b' === cadena[index] || 'c' === cadena[index] || 'd' === cadena[index] || 'e' === cadena[index] || 'f' === cadena[index] || 'g' === cadena[index] || 'h' === cadena[index] || 'i' === cadena[index] || 'j' === cadena[index] || 'k' === cadena[index] || 'l' === cadena[index] || 'm' === cadena[index] || 'n' === cadena[index] || 'o' === cadena[index] || 'p' === cadena[index] || 'q' === cadena[index] || 'r' === cadena[index] || 's' === cadena[index] || 't' === cadena[index] || 'u' === cadena[index] || 'v' === cadena[index] || 'w' === cadena[index] || 'x' === cadena[index] || 'y' === cadena[index] || 'z' === cadena[index]) {
    index++;
    do {
      //valida indentificador:
      if ('a' === cadena[index] || 'b' === cadena[index] || 'c' === cadena[index] || 'd' === cadena[index] || 'e' === cadena[index] || 'f' === cadena[index] || 'g' === cadena[index] || 'h' === cadena[index] || 'i' === cadena[index] || 'j' === cadena[index] || 'k' === cadena[index] || 'l' === cadena[index] || 'm' === cadena[index] || 'n' === cadena[index] || 'o' === cadena[index] || 'p' === cadena[index] || 'q' === cadena[index] || 'r' === cadena[index] || 's' === cadena[index] || 't' === cadena[index] || 'u' === cadena[index] || 'v' === cadena[index] || 'w' === cadena[index] || 'x' === cadena[index] || 'y' === cadena[index] || 'z' === cadena[index]
        || '0' === cadena[index] || '1' === cadena[index] || '2' === cadena[index] || '3' === cadena[index] || '4' === cadena[index] || '5' === cadena[index] || '6' === cadena[index] || '7' === cadena[index] || '8' === cadena[index] || '9' === cadena[index]
      ) index++
      else {
        /*espacio*/if (' ' === cadena[index]) { index++; break }
        else { return "se esperaba un identificador válido" }
      }
    } while (1)

    /*espacio*/if (' ' === cadena[index]) { index++; }

    if ('=' === cadena[index]) { index++ }
    else { return "se esperaba un '='" }

    /*espacio*/if (' ' === cadena[index]) { index++; }

    /* Se espera identificador o valor numérico*/


  } else {
    if (';' === cadena[index]) {
      index++
    } else {
      return "se esperaba indentificador válido o ';'"
    }
  }




  return "[" + index + "] " + res
}




function tokenFor(pCadena, pIndex) {
  let cadena = pCadena;
  let index = pIndex;
  let token = ["for"];

  for (i = 0; i < token[0].length; i++) { // recorre el token
    if (token[0][i] === cadena[index]) { // compara el token válido con la cadena
      index++;
    } else {
      return -1; // retorna -1 si la cadena no fue válida para el token
    }
  }

  if (cadena[index] != " " && cadena[index] != "(") { // valida que solo sea for y no más
    return -1;
  }

  return index; // retorna la posición si la cadena fue válida para el token
}

function tokenEspacios(pCadena, pIndex) {
  let cadena = pCadena;
  let index = pIndex;

  do {
    if (" " === cadena[index]) {
      index++;
    } else {
      break;
    }
  } while (1);

  return index;
}

function tokenParentesisApertura(pCadena, pIndex) {
  let cadena = pCadena;
  let index = pIndex;

  if ("(" === cadena[index]) { // valida (
    index++;
  } else {
    return -1;
  }

  return index;
}

function tokenParentesisCierre(pCadena, pIndex) {
  let cadena = pCadena;
  let index = pIndex;

  if (")" === cadena[index]) { // valida (
    index++;
  } else {
    return -1;
  }

  return index;
}

function tokenPuntoYComa(pCadena, pIndex) {
  let cadena = pCadena;
  let index = pIndex;

  if (";" === cadena[index]) { // valida ;
    index++;
  } else {
    return -1
  }

  return index;
}

function tokenIdentificador(pCadena, pIndex) {
  let cadena = pCadena;
  let index = pIndex;
  let indexAux = index;
  let tokenAbecedario = ["abcdefghijklmnopqrstuvwxyz"];
  let tokenNumeros = ["0123456789"];

  for (i = 0; i < tokenAbecedario[0].length; i++) { // recorre el token para encontrar una letra
    if (tokenAbecedario[0][i] === cadena[index]) {
      indexAux++;
      break;
    }
  }

  if (indexAux > index) { // si encontró una letra (inicio de un identificador válido)
    index = indexAux;

    do { // evalúa la cadena con letras y números para un identificador válido
      for (i = 0; i < tokenAbecedario[0].length; i++) { // evalúa abecedario
        if (tokenAbecedario[0][i] === cadena[index]) {
          index++;
          break;
        }
      }

      for (j = 0; j < tokenNumeros[0].length; j++) { // evalúa números
        if (tokenNumeros[0][j] === cadena[index]) {
          index++;
          break;
        }
      }

      if (i >= tokenAbecedario[0].length && j >= tokenNumeros[0].length) { // si no encontró más letras ni números        
        break;
      }
    } while (true);

  } else { // encontró un caracter no válido en la primera letra del identificador, o no es un identificador
    return -1;
  }
  return index;
}

function tokenValorIdentificador(pCadena, pIndex) {
  let cadena = pCadena
  let index = pIndex
  let indexAux = 0

  indexAux = tokenIdentificador(cadena, index);
  if (indexAux == -1) { // si encontró un identificador no válido o un valor numérico u otra cosa
    indexAux = tokenValorEntero(cadena, index);
    if (indexAux > index) { // si encontró un valor entero
      index = indexAux;
    } else {
      index = -1;
    }
  } else {
    index = indexAux; // identificador válido
  }

  return index;
}

function tokenSimboloIgual(pCadena, pIndex) {
  let cadena = pCadena;
  let index = pIndex;

  if ("=" === cadena[index]) { // valida =
    index++;
  } else {
    return -1;
  }

  return index;
}

function tokenValorEntero(pCadena, pIndex) {
  let cadena = pCadena;
  let index = pIndex;
  let tokenNumeros = ["0123456789"];

  do {
    for (i = 0; i < tokenNumeros[0].length; i++) { // evalúa números
      if (tokenNumeros[0][i] === cadena[index]) {
        index++;
        break;
      }
    }

    if (i >= tokenNumeros[0].length) { // si no encontró más números
      break;
    }
  } while (true);

  return index;
}

function tokenNegacion(pCadena, pIndex) {
  let cadena = pCadena;
  let index = pIndex;

  if ("!" === cadena[index]) { // valida !
    index++;
  } else {
    return -1;
  }

  return index;
}

function tokenOperadorRelacional(pCadena, pIndex) {
  let cadena = pCadena;
  let index = pIndex;
  let indexAux = index;
  let tokenOpRel = ["==", ">=", "<=", "!="];
  let aux;

  for (i = 0; i < tokenOpRel.length; i++) { // recorre el token para encontrar una letra
    aux = 0;
    for (j = 0; j < tokenOpRel[i].length; j++) { // recorre el token para 
      if (tokenOpRel[i][j] === cadena[indexAux]) {
        aux++;
        indexAux++;
      }
    }
    if (aux == 2) {
      index = indexAux;
      break;
    } else {
      index = -1;
    }
  }

  return index;

  // if(indexAux > index) {
  //   return indexAux;
  // } else {
  //   return
  // }
}

function analizarSintaxis(param_cadena) {
  const cadena = "for(i = 0; i == j){}}"
  let index = 0;
  let indexAux = 0;

  index = tokenEspacios(cadena, index)

  // 1. evalúa: for
  index = tokenFor(cadena, index);
  if (index == -1) {
    console.log("Error: Palabra reservada no válida. \nSe esperaba un 'for'");
  }

  // 2. evalúa espacios en blanco
  index = tokenEspacios(cadena, index);

  // 3. evalúa (
  index = tokenParentesisApertura(cadena, index);
  if (index == -1) {
    console.log("Error: paréntesis. \n Se esperaba paréntesis de apertura: '('");
  }

  // 4. evalúa espacios en blanco
  index = tokenEspacios(cadena, index);

  // 5. evalúa si solo existe punto y coma sin EXP_INICIAL
  indexAux = tokenPuntoYComa(cadena, index);
  if (indexAux != -1) { // encontró punto y coma ';'
    index = indexAux;
  } else {
    // 6. evalúa que exista un identificador
    index = tokenIdentificador(cadena, index);
    if (index == -1) {
      console.log("Error: identificador no válido. \nSe esperaba identificador válido");
    }
  }

  // 7. evalúa espacios en blanco
  index = tokenEspacios(cadena, index);

  // 8. evalúa signo  de igualdad '='
  indexAux = tokenSimboloIgual(cadena, index);
  if (indexAux === -1) {
    console.log("Error: '='. \nSe esperaba un signo de igualdad");
  } else {
    index = indexAux;
  }

  // 9. evalúa espacios en blanco
  index = tokenEspacios(cadena, index);

  // 10. evalúa identificador ó valor numérico
  indexAux = tokenIdentificador(cadena, index);
  if (indexAux == -1) { // encontró un identificador no válido o un valor numérico u otra cosa
    indexAux = tokenValorEntero(cadena, index);
    if (indexAux > index) { // si encontró entero
      index = indexAux;
    } else { // si no encontró entero, por lo tanto, tampoco identificador
      console.log("Error: valor inválido. \nSe esperaba un identificador válido o un número");
      // return
    }
  } else {
    index = indexAux; // identificador válido
  }

  // . evalúa espacios en blanco
  index = tokenEspacios(cadena, index);

  // . evalúa punto y coma
  indexAux = tokenPuntoYComa(cadena, index);
  if (indexAux != -1) { // encontró punto y coma ';'
    index = indexAux;
  } else {
    console.log("Error: punto y coma. \nSe esperaba ';'")
  }

  // 11. evalúa espacios en blanco
  index = tokenEspacios(cadena, index);

  // 12. evalúa negación
  indexAux = tokenNegacion(cadena, index);
  if (indexAux != -1) { // si encontró el !, entonces, evalúa valor o variable
    index = indexAux;
    // valor numerico o identi

  } else {
    // valor numerico o identi
    indexAux = tokenValorIdentificador(cadena, index);
    if (indexAux != -1) {
      index = indexAux
    } else {
      console.log('Error, se esperaba un identificador o valor válido')
    }

    // 11. evalúa espacios en blanco
    index = tokenEspacios(cadena, index);

    // operador
    indexAux = tokenOperadorRelacional(cadena, index);
    if (indexAux != -1) {
      index = indexAux;

      // 11. evalúa espacios en blanco
      index = tokenEspacios(cadena, index);

      // valor numerico o identi
      indexAux = tokenValorIdentificador(cadena, index);
      if (indexAux != -1) {
        index = indexAux
      } else {
        console.log('Error, se esperaba un identificador o valor válido')
      }
    } else {
      console.log("Error, se esperaba un operador relacional");
    }

    // 11. evalúa espacios en blanco
    index = tokenEspacios(cadena, index);

    // valor numerico o identi
    indexAux = tokenValorIdentificador(cadena, index);
    if (indexAux != -1) {
      index = indexAux
    } else {
      console.log('Error, se esperaba un identificador o valor válido')
    }
  }






  /** Pendiente Cierre, solo descomentar */
  // // 9. evalúa paréntesis de cierre
  // indexAux = tokenParentesisCierre(cadena, index);
  // if (indexAux == -1) {
  //   console.log("Error: paréntesis. \n Se esperaba paréntesis de cierre: ')'");
  // } else {
  //   index = indexAux;
  // }



  console.log(cadena);
  console.log("[" + index + "]" + ": '" + cadena[index] + "'");
}

function main() {
  cadena = "for(i=0; i >= 10){}"
  analizarSintaxis(cadena);
}

main();

