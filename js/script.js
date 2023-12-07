
function cambiarDiv() {
  // Obtén el contenedor principal
  var container = document.querySelector('.container-middle');

  // Crea un nuevo textarea con la clase 'for-dinamico'
  var nuevoTextarea = document.createElement('textarea');
  nuevoTextarea.className = 'for-dinamico';
  nuevoTextarea.rows = 5; // Establece el número de filas según tus necesidades
  nuevoTextarea.cols = 40; // Establece el número de columnas según tus necesidades
  // nuevoTextarea.value = 'Nuevo contenido dinámico...';

  // Agrega el nuevo textarea al contenedor
  container.replaceChild(nuevoTextarea, document.querySelector('.for'));

  document.querySelector('.container-terminal').style.display = 'block';

  document.querySelector('.container-button').style.display = 'none';

}

function cargarGramatica() {
  var input = document.createElement('input');
  input.type = 'file';

  input.addEventListener('change', function () {
    var file = input.files[0];

    if (file) {
      var reader = new FileReader();

      reader.onload = function (e) {
        var contenido = e.target.result;
        // Muestra el contenido del archivo en el textarea
        document.querySelector('.for-dinamico').value = contenido;

      };

      reader.readAsText(file);
    }
  });

  // Abre el cuadro de diálogo para seleccionar un archivo
  input.click();
}

function cargarEjemplo() {
  var input = document.createElement('input');
  input.type = 'file';

  input.addEventListener('change', function () {
    var file = input.files[0];

    if (file) {
      var reader = new FileReader();

      reader.onload = function (e) {
        var contenido = e.target.result;

        var contenidoSinSaltos = eliminarSaltosDeLinea(contenido);

        // Muestra el contenido del archivo en el textarea
        document.querySelector('.for-dinamico').value = contenido;

        analizarSintaxis(contenidoSinSaltos)

      };

      reader.readAsText(file);
    }
  });

  // Abre el cuadro de diálogo para seleccionar un archivo
  input.click();
}

function eliminarSaltosDeLinea(texto) {
  // Utiliza una expresión regular para eliminar saltos de línea
  return texto.replace(/(\r\n|\n|\r)/gm, "");
}

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

function tokenOperadorLogico(pCadena, pIndex) {
  let cadena = pCadena;
  let index = pIndex;
  let indexAux = index;
  let tokenOpLog = ["&&", "||"];
  let aux;

  for (i = 0; i < tokenOpLog.length; i++) { // recorre el token para encontrar una letra
    aux = 0;
    for (j = 0; j < tokenOpLog[i].length; j++) { // recorre el token para 
      if (tokenOpLog[i][j] === cadena[indexAux]) {
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
}

function analizarSintaxis(param_cadena) {
  // const cadena = "for (i = 0 ; i==j || i == 0 ; ) { } }"
  let cadena = param_cadena
  let index = 0;
  let indexAux = 0;
  let msgError = "";
  let msgOk = "Todo está OK";
  let isError = false;

  index = tokenEspacios(cadena, index) // evalúa espacios

  index = tokenFor(cadena, index);
  if (index != -1) { // si for válido
    index = tokenEspacios(cadena, index) // evalúa espacios

    index = tokenParentesisApertura(cadena, index);
    if (index != -1) { // si existe '('
      index = tokenEspacios(cadena, index) // evalúa espacios

      indexAux = tokenPuntoYComa(cadena, index);
      if (indexAux != -1) { // si existe ';'
        index = indexAux;
      } else {
        index = tokenIdentificador(cadena, index);
        if (index != -1) { // si identificador válido
          index = tokenEspacios(cadena, index) // evalúa espacios

          indexAux = tokenSimboloIgual(cadena, index);
          if (indexAux != -1) { // si existe '='
            index = indexAux;
            index = tokenEspacios(cadena, index) // evalúa espacios

            indexAux = tokenValorIdentificador(cadena, index);
            if (indexAux != -1) {
              index = indexAux

              index = tokenEspacios(cadena, index) // evalúa espacios

              /** puede seguir más, no solo ';' */

              indexAux = tokenPuntoYComa(cadena, index);
              if (indexAux != -1) { // si existe punto y coma ';'
                index = indexAux;
              } else {
                isError = true
                msgError = "Error: punto y coma. \nSe esperaba ';'"
              }

            } else {
              isError = true
              msgError = 'Error, se esperaba un identificador o valor válido'
            }

          } else {
            isError = true
            msgError = "Error: '='. \nSe esperaba un signo de igualdad"
          }

        } else {
          isError = true
          msgError = "Error: identificador no válido. \nSe esperaba identificador válido"
        }
      }

      // continuación después del exp_ini ;
      if (!isError) {
        index = tokenEspacios(cadena, index) // evalúa espacios

        do {
          isOpLog = false;
          indexAux = tokenNegacion(cadena, index);
          if (indexAux != -1) { // si encontró el !, entonces, evalúa valor o variable
            index = indexAux;

            index = tokenEspacios(cadena, index) // evalúa espacios

            indexAux = tokenValorIdentificador(cadena, index);
            if (indexAux != -1) { // si identificador válido
              index = indexAux
            } else {
              isError = true
              msgError = "Error: identificador no válido. \nSe esperaba identificador válido"
            }

          } else {
            indexAux = tokenValorIdentificador(cadena, index);
            if (indexAux != -1) { // si identificador válido
              index = indexAux
              index = tokenEspacios(cadena, index) // evalúa espacios

              indexAux = tokenOperadorRelacional(cadena, index);
              if (indexAux != -1) { // si existe operador relacional
                index = indexAux;
                index = tokenEspacios(cadena, index); // evalúa espacios

                indexAux = tokenValorIdentificador(cadena, index);
                if (indexAux != -1) {
                  index = indexAux
                  index = tokenEspacios(cadena, index) // evalúa espacios

                  indexAux = tokenOperadorLogico(cadena, index);
                  if (indexAux != -1) {
                    index = indexAux
                    isOpLog = true
                    index = tokenEspacios(cadena, index) // evalúa espacios
                  }

                } else {
                  isError = true
                  msgError = 'Error, se esperaba un identificador o valor válido'
                }
              } else {
                isError = true
                msgError = "Error, se esperaba un operador relacional"
              }
            } else {
              isError = true
              msgError = 'Error, se esperaba un identificador o valor válido'
            }
          }

        } while (isOpLog && !isError)

        if (!isError) {
          indexAux = tokenPuntoYComa(cadena, index);
          if (indexAux != -1) { // si existe ';'
            index = indexAux;

            index = tokenEspacios(cadena, index); // evalúa espacios
          } else {
            isError = true
            msgError = "Error: punto y coma. \nSe esperaba ';'"
          }
        }

      }
    } else {
      msgError = "Error: paréntesis. \n Se esperaba paréntesis de apertura: '('"
    }
  } else {
    msgError = "Error: Palabra reservada no válida. \nSe esperaba un 'for'"
  }

  var miDiv = document.querySelector(".body-terminal");

  if (isError) {

    // Agrega una nueva clase al div
    miDiv.classList.add("isError");

    console.log(msgError)
    msgTerminal = msgError
  } else {

    // Agrega una nueva clase al div
    miDiv.classList.add("isOk");

    console.log(msgOk)
    msgTerminal = msgOk
  }

  console.log(cadena)
  console.log("'" + cadena[index] + "' [" + index + "]")

  var miDiv = document.querySelector(".body-terminal");

  // Agrega texto utilizando textContent
  miDiv.textContent = msgTerminal;
}

function secuencia() {
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

    // // 11. evalúa espacios en blanco
    // index = tokenEspacios(cadena, index);

    // // valor numerico o identi
    // indexAux = tokenValorIdentificador(cadena, index);
    // if (indexAux != -1) {
    //   index = indexAux
    // } else {
    //   console.log('Error, se esperaba un identificador o valor válido')
    // }
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
  cadena = "for(i=0; i >= 10;){}"
  analizarSintaxis(cadena);
}

// main();

// function ejemplosFor() {
//   for(i = 0; i < 15; i++) {
//     a = b;
//   }

//   for(i = 0; i < 15; i++) {
//     a = miVariable + i;
//   }

//   for(indiceAux = indice; indiceAux >= 500; indiceAux--) {
//     a = indiceAux;
//     b = a * (2 * indiceAux);
//   }

//   for(i = 0; i == 10 || i >= a; i++) {
//     a = b + i;
//   }

//   for(i = 0; i < 15 && a != i; i++) {
//     a = mivar * i;
//   }

//   for(j = 0; j = 7; j++) {
//     a = i;
//   }

//   for (i = j; i * 7; i--) {
//     a = 5 * param;
//   }

//   for(10 = i; i != 1; i++) {
//     a = 1;
//     b = 2;
//   }

//   forr (i=0; i==100; i++) {
//     a = b*i;
//   }

//   for (indice = 150; indice > cadena; indice--) {
//     a = indice * 2;
//     b = a - 5 + (3 * indice);
//     mivariable = 300;
//     c += 5;
//     x++;
//     z = a + b + c
//   }
// }