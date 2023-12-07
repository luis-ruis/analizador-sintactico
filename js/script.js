
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
  let tokenAbecedario = ["abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMOPQRSTUVWXYZ"];
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
