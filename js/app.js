//TABLERO
var Tablero  = [
    [null, 1, null, 1, null, 1, null, 1],
    [1, null, 1, null, 1, null, 1, null],
    [null, 1, null, 1, null, 1, null, 1],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [2, null, 2, null, 2, null, 2, null],
    [null, 2, null, 2, null, 2, null, 2],
    [2, null, 2, null, 2, null, 2, null],

];

function creacionTablero(){
    var Tableroo = document.getElementById('Tablero');
    var contador = 0;

    for (let i = 0; i < Tablero.length; i++) {
      var nuevoCuadradoFila = document.createElement('div');
      nuevoCuadradoFila.className = 'fila -fila' + i
      Tableroo.appendChild(nuevoCuadradoFila);

      contador = i % 2

      for (let index = 0; index < Tablero[i].length; index++) {
          var nuevaCasilla = document.createElement('div');

          if(contador === 0){
              nuevaCasilla.className= 'casillaBlanca';
              contador++;
          }
          else{
              nuevaCasilla.className = 'casillaNegra'
              contador--;
          }
          nuevaCasilla.id = 'fila-' + i + '-col-'+ index;
          nuevoCuadradoFila.appendChild(nuevaCasilla);
      }
    }
    creacionFichas();
}
creacionTablero();

 function creacionFichas(){
    for (let i = 0; i < Tablero.length; i++) {
        for (let v = 0; v < Tablero[i].length; v++) {

            var Casilla = document.getElementById('fila-' + i + '-col-' + v);
            // CREACION FICHAS COLOR ROJA
            if (Tablero[i][v] === 1) {
                var nuevaFicha = document.createElement('div');
                nuevaFicha.className = 'fichaRoja';
                Casilla.appendChild(nuevaFicha);    
            }
            // CREACION FICHA COLOR AZUL
            if (Tablero[i][v] === 2) {
                var nuevaFicha = document.createElement('div');
                nuevaFicha.className = 'fichaAzul';
                Casilla.appendChild(nuevaFicha);   
            }
            // CREACION FICHA REY ROJA
            if (Tablero[i][v] === 11) {
                var nuevaFicha = document.createElement('div');
                nuevaFicha.className = 'fichaRoja Rey';
                Casilla.appendChild(nuevaFicha);
            }
            //CREACION FICHA REY AZUL
            if (Tablero[i][v] === 22) {
                var nuevaFicha = document.createElement('div');
                nuevaFicha.className = 'fichaAzul Rey';
                Casilla.appendChild(nuevaFicha);
            }
        }
    }
}
var Turno = 1;
var fichaRojaVariable = document.getElementsByClassName('fichaRoja');
var fichaAzulVariable = document.getElementsByClassName('fichaAzul');

function eventoClick(){
    if (Turno ===1) {
        for (var i = 0; i < fichaRojaVariable.length; i++) {
            fichaRojaVariable[i].addEventListener('click',);//nombre otra funcion
        }
    }
    else{
        for (var i = 0; i < fichaAzulVariable.length; i++) {
            fichaAzulVariable[i].addEventListener('click', );
        }
    }
}
//OBJETO DE LA FICHA QUE SELECCIONEMOS
var obtenerFichaObjeto = {
    idFila : null, 
    idColumna: null, 
    Rey: false,
    moverIzquierda : false,
    moverDerecha: false,
    moverComerIzquierda: false,
    moverComerDerecha: false,
    moverPintarIzquierda: null,
    moverPintarDerecha: null,
    moverComerIzquierdaPintado: null,
    moverComerDerechaPintado: null,
    moverFilaPintar:null,
    moverFilaComerPintado: null,
}

function obtenerFicha(evento){
    resetearTablero(); //Cambiar Nombre
    obtenerFichaObjeto.idFila = parseInt(evento.path[1].id.substring(5,6));
    obtenerFichaObjeto.idColumna= parseInt(evento.path[1].id.substring(11,12));

    if (evento.target.classList.contains('Rey')) {
        obtenerFichaObjeto.Rey = true;
    }
    else{
        obtenerFichaObjeto.Rey = false;
    }

    if (obtenerFichaObjeto.Rey === false) {
        resetearMovimientosPermitidosObjeto(); // Cambiar Nombre
        for (let a = 1; a < 8 ; a++) {
           buscarEspaciosDisponibles(obtenerFichaObjeto.idFila, obtenerFichaObjeto.idColumna, a, a);
        }
        resetearMovimientosPermitidosObjeto(); // Cambiar Nombre
        resetearObtenerFichaObjeto(); // Cambiar Nombre
        for (let a = 1; a < 8 ; a++) {
           buscarEspaciosDisponibles(obtenerFichaObjeto.idFila, obtenerFichaObjeto.idColumna, a, a);
        }
    }
}
var MovimientosPermitidosObjeto = {
    SeguirMoviendoDerecha: true,
    SeguirMoviendoIzquierda: true,
}
function buscarEspaciosDisponibles(fila , columna, aMoverColumna , aMoverFila){
    obtenerFichaObjeto.moverPintarIzquierda = columna - aMoverColumna;
    obtenerFichaObjeto.moverPintarDerecha = columna + aMoverColumna;

    if (Turno ===1) {
        obtenerFichaObjeto.moverFilaPintar = fila + aMoverFila;
    }
    else{
        obtenerFichaObjeto.moverFilaPintar = fila - aMoverFila
    }
    if (MovimientosPermitidosObjeto.SeguirMoviendoDerecha === true) {
        if (obtenerFichaObjeto.moverPintarDerecha <= 7 && obtenerFichaObjeto.moverFilaPintar <= 7 && obtenerFichaObjeto.moverFilaPintar >= 0) {
            if (Tablero[obtenerFichaObjeto.moverFilaPintar][obtenerFichaObjeto.moverPintarDerecha]===null) {
                obtenerFichaObjeto.moverDerecha = true;

                var Pintar = getElementById('fila-' + obtenerFichaObjeto.moverFilaPintar + '-col-'+ obtenerFichaObjeto.moverPintarDerecha);
                Pintar.style.backgroundColor = 'gray'
                
            }
            else{
                MovimientosPermitidosObjeto.SeguirMoviendoDerecha = false;
                obtenerFichaObjeto.moverDerecha = false;
            }   
        }
        else{
            obtenerFichaObjeto.moverDerecha = false;
        } 
    }
    if (MovimientosPermitidosObjeto.SeguirMoviendoIzquierda === true) {
        if (obtenerFichaObjeto.moverPintarIzquierda >= 0 && obtenerFichaObjeto.moverFilaPintar >= 0 && obtenerFichaObjeto.moverFilaPintar <= 7) {
            if (Tablero[obtenerFichaObjeto.moverFilaPintar][obtenerFichaObjeto.moverPintarIzquierda]=== null) {

                obtenerFichaObjeto.moverIzquierda = true;
                var Pintar = document.getElementById('fila-' + obtenerFichaObjeto.moverFilaPintar + '-col-' + obtenerFichaObjeto.moverPintarIzquierda);
                Pintar.style.backgroundColor = 'gray';
            }
            else{
                MovimientosPermitidosObjeto.SeguirMoviendoIzquierda = false;
                obtenerFichaObjeto.moverIzquierda = false;
            } 
        }
        else{
            obtenerFichaObjeto.moverIzquierda = false;
        }
    }
    comprobarComer(); //CambiarNombre
}

function comprobarComer(){
    obtenerFichaObjeto.moverComerDerechaPintado = obtenerFichaObjeto.idColumna + aMoverColumna + 1;
    obtenerFichaObjeto.moverComerIzquierdaPintado = obtenerFichaObjeto.idColumna - aMoverColumna - 1;

    if (obtenerFichaObjeto.moverFilaPintar >= 0 && obtenerFichaObjeto.moverFilaPintar <= 7 ) {
        if (Turno === 1) {
            if (aMoverFila > 0 || obtenerFichaObjeto.Rey === false) {
                obtenerFichaObjeto.moverFilaComerPintado = obtenerFichaObjeto.idFila + aMoverFila + 1;
            }
            else{
                obtenerFichaObjeto.moverFilaComerPintado = obtenerFichaObjeto.idFila + aMoverFila + 1;
            }
            if (obtenerFichaObjeto.moverComerDerechaPintado <= 7 && obtenerFichaObjeto.moverFilaComerPintado <= 7 && obtenerFichaObjeto.moverFilaComerPintado >= 0) {

                if ((Tablero[obtenerFichaObjeto.moverFilaPintar][obtenerFichaObjeto.moverPintarDerecha]=== 2 || Tablero[obtenerFichaObjeto.moverFilaPintar][obtenerFichaObjeto.moverPintarIzquierda]===22)&&Tablero[obtenerFichaObjeto.moverFilaComerPintado][obtenerFichaObjeto.moverComerIzquierdaPintado]=== null) {
                    obtenerFichaObjeto.moverComerDerecha = true;
                    MovimientosPermitidosObjeto.SeguirMoviendoDerecha = false;

                    var Pintar = document.getElementById('fila-' + obtenerFichaObjeto.moverFilaComerPintado + '-col-' + obtenerFichaObjeto.moverComerDerechaPintado);
                    Pintar.style.backgroundColor = 'gray';
                }
            } else{
                    obtenerFichaObjeto.moverComerDerecha = false;
                }
                if (obtenerFichaObjeto.moverComerIzquierdaPintado >= 0 && obtenerFichaObjeto.moverFilaComerPintado <= 7 && obtenerFichaObjeto >= 0) {
                    if ((Tablero[obtenerFichaObjeto.moverFilaPintar][obtenerFichaObjeto.moverPintarIzquierda]===2 || Tablero[obtenerFichaObjeto.moverFilaPintar][obtenerFichaObjeto.moverPintarIzquierda] === 22) && Tablero[obtenerFichaObjeto.moverFilaComerPintado][obtenerFichaObjeto.moverComerIzquierdaPintado] === null) {
                        obtenerFichaObjeto.moverComerIzquierda = true;
                        MovimientosPermitidosObjeto.SeguirMoviendoIzquierda = false;

                        var Pintar = document.getElementById('fila-' + obtenerFichaObjeto.moverFilaComerPintado + '-col' + obtenerFichaObjeto.moverComerIzquierda);
                        Pintar.style.backgroundColor = 'gray';
                        
                    }
                }
                else{
                    obtenerFichaObjeto.moverComerIzquierda = false;
                } 
        }else{
            if (aMoverFila > 0 || obtenerFichaObjeto.Rey === false) {
                obtenerFichaObjeto.moverFilaComerPintado = obtenerFichaObjeto.idFila - aMoverFila - 1;
            }
            else{
                obtenerFichaObjeto.moverFilaComerPintado = obtenerFichaObjeto.idFila + (-(aMoverFila)) + 1;
            }
            if (obtenerFichaObjeto.moverComerDerechaPintado <= 7 && obtener.moverFilaComerPintado <= 7 && obtenerFichaObjeto >= 0) {
                if ((Tablero[obtenerFichaObjeto.moverFilaPintar][obtenerFichaObjeto.moverPintarDerecha]=== 1 || Tablero[obtenerFichaObjeto.moverFilaPintar][obtenerFichaObjeto.moverPintarDerecha] === 11 ) && Tablero[obtenerFichaObjeto.moverFilaComerPintado][obtenerFichaObjeto.moverComerDerechaPintado] === null) {
                    obtenerFichaObjeto.moverComerDerecha = true;
                    MovimientosPermitidosObjeto.SeguirMoviendoDerecha = false;

                    var Pintar = document.getElementById('fila-' + obtenerFichaObjeto.moverFilaComerPintado + '-col-' + obtenerFichaObjeto.moverComerDerechaPintado);
                    Pintar.style.backgroundColor = 'gray';  
                }   
            }else{
                obtenerFichaObjeto.moverComerDerecha = false;
            }
            if (obtenerFichaObjeto.moverComerIzquierdaPintado >= 0 && obtenerFichaObjeto.moverFilaComerPintado <=7 && obtenerFichaObjeto.moverFilaComerPintado >= 0)  {
                if ((Tablero[obtenerFichaObjeto.moverFilaPintar][obtenerFichaObjeto.moverPintarIzquierda]=== 1 || Tablero[obtenerFichaObjeto.moverFilaPintar][obtenerFichaObjeto.moverPintarIzquierda]===11) && Tablero[obtenerFichaObjeto.moverFilaComerPintado][obtenerFichaObjeto.moverComerIzquierdaPintado] === null) {
                    obtenerFichaObjeto.moverComerIzquierda = true;
                    MovimientosPermitidosObjeto.SeguirMoviendoIzquierda = false;

                    var Pintar = document.getElementById('fila-' + obtenerFichaObjeto.moverFilaComerPintado + '-col' + obtenerFichaObjeto.moverComerIzquierdaPintado);
                    Pintar.style.backgroundColor = 'gray';   
                }  
            }
            else{
                obtenerFichaObjeto.moverComerIzquierda = false;
            }
        }      
    }
    eventoClickPosiblesMovimientos(aMoverFila, aMoverColumna);
}

function eventoClickPosiblesMovimientos(aMoverFila , aMoverColumna){
    if (obtenerFichaObjeto.moverIzquierda) {
        var Mover = document.getElementById('fila-' + obtenerFichaObjeto.moverFilaPintar + '-col-' + obtenerFichaObjeto.moverPintarIzquierda);
        Mover.setAttribute('onClick', 'moverFicha('+ obtenerFichaObjeto.moverFilaPintar + ',' + obtenerFichaObjeto.moverPintarIzquierda +' ,"", '+ aMoverFila + ',' + aMoverColumna + ')');
    }
    if (obtenerFichaObjeto.moverDerecha) {
        var Mover = document.getElementById('fila-' + obtenerFichaObjeto.moverFilaPintar +'-col-' + obtenerFichaObjeto.moverPintarDerecha);
        Mover.setAttribute('onClick', 'moverFicha(' + obtenerFichaObjeto.moverFilaPintar + ',' + obtenerFichaObjeto.moverPintarDerecha + ', "",' + aMoverFila + ',' + aMoverColumna +')');
      }
      if (obtenerFichaObjeto.moverComerDerecha) {
        var Mover = document.getElementById('fila-' + obtenerFichaObjeto.moverFilaComerPintado +'-col-' + obtenerFichaObjeto.moverComerDerechaPintado);
        Mover.setAttribute('onClick', 'moverFicha(' + obtenerFichaObjeto.moverFilaComerPintado + ',' + obtenerFichaObjeto.moverComerDerechaPintado + ', "derecha",' + aMoverFila + ',' + aMoverColumna +')');
      }
      if (obtenerFichaObjeto.moverComerIzquierda) {
        var Mover = document.getElementById('fila-' + obtenerFichaObjeto.moverFilaComerPintado +'-col-' + obtenerFichaObjeto.moverComerIzquierdaPintado);
        Mover.setAttribute('onClick', 'moverFicha(' + fichaSeleccionada.moverFilaComerPintado + ',' + fichaSeleccionada.moverComerIzquierdaPintado +', "izquierda",' + aMoverFila + ',' + aMoverColumna +')');
      }
}

function resetearTablero(){
    var Tablero = document.getElementById('Tablero');

    Tablero.innerHTML = '';
    quitarEvento = true;

    creacionTablero();
    resetearObtenerFichaObjeto();
}

function movimientosFichas(filaMover, columnaMover, tipoComer, aMoverFila, aMoverColumna){
    var Padre = document.getElementById('fila-' + filaMover + '-col-' + columnaMover);
    var nuevaDama = document.createElement('div');
    if (Turno === 1) {
        nuevaDama.className = 'fichaRoja';
        if (Tablero[obtenerFichaObjeto.idFila][obtenerFichaObjeto.idColumna] ===11) {
            Tablero[filaMover][columnaMover] = 11;            
        }
        else{
            Tablero[filaMover][columnaMover] = 1;
        }  
    }else{
        nuevaDama.className = 'fichaAzul';
        if (Tablero[obtenerFichaObjeto.idFila][obtenerFichaObjeto.idColumna]===22) {
            Tablero[filaMover][columnaMover] = 22;
        }
        else{
            Tablero[filaMover][columnaMover] = 2;
        }
    }
// }

//Agregar atributo para las fichas que se mueven en las ultimas filas y no son rey
if (filaMover === 0 || filaMover ===7) {
    if (obtenerFichaObjeto.Rey === false) {
        nuevaDama.classList.add('Rey');
        if (Turno === 1) {
            Tablero[filaMover][columnaMover] = 11;
        }
        else{
            Tablero[filaMover][columnaMover] = 22;
        }
    }
}
Padre.appendChild(nuevaDama);

// Se elimina la ficha anterior
var fichaVieja = document.getElementById('fila-' + obtenerFichaObjeto.idFila + '-col-' + obtenerFichaObjeto.idColumna);
fichaVieja.innerHTML = '';
Tablero[obtenerFichaObjeto.idFila][obtenerFichaObjeto.idColumna] = null;
//Eliminacion de la ficha del usuario contrario si lo come
if (tipoComer == 'izquierda') {
    if (Turno === 1) {
        var fichaEnemigoEliminado = document.getElementById('fila-' + (obtenerFichaObjeto.idFila + aMoverFila) + '-col-' + (obtenerFichaObjeto.idColumna + aMoverColumna));
        fichaEnemigoEliminado.innerHTML = '';
        Tablero[obtenerFichaObjeto.idFila + aMoverFila][obtenerFichaObjeto.idColumna + aMoverColumna] = null;
    }
    else{
        var fichaEnemigoEliminado = document.getElementById('fila-' + (obtenerFichaObjeto.idFila - aMoverFila) + '-col-' + (obtenerFichaObjeto.idColumna - aMoverColumna));
        fichaEnemigoEliminado.innerHTML = '';
        Tablero[obtenerFichaObjeto.idFila - aMoverFila][obtenerFichaObjeto.idColumna - aMoverColumna] = null;
    }
}
if (tipoComer == 'derecha') {
    if (Turno === 1) {
        var fichaEnemigoEliminado = document.getElementById('fila-' + (obtenerFichaObjeto.idFila + aMoverFila) + '-col-' + (obtenerFichaObjeto.idColumna + aMoverColumna));
        fichaEnemigoEliminado.innerHTML = '';
        Tablero[obtenerFichaObjeto.idFila + aMoverColumna][obtenerFichaObjeto.idColumna + aMoverColumna] = null;
    }
    else{
        var fichaEnemigoEliminado = document.getElementById('fila-' + (obtenerFichaObjeto.idFila - aMoverFila) + '-col-' + (obtenerFichaObjeto.idColumna + aMoverColumna));
        fichaEnemigoEliminado.innerHTML = '';
        Tablero[obtenerFichaObjeto.idFila - aMoverFila][obtenerFichaObjeto.idColumna + aMoverColumna] = null;
    } 
}
refrescarPuntuacionJugadores();
cambioDeTurno();
resetearTablero();
}

var Jugador1 = document.getElementById('Jugador1');
var Jugador2 = document.getElementById('Jugador2');

function refrescarPuntuacionJugadores(){
 var puntosJugador1 = null;
 var puntosJugador2 = null;

 puntosJugador1 = document.getElementById('puntosJugador1');
 puntosJugador1.innerHTML = 13 - fichaRojaVariable.length;

 puntosJugador2 = document.getElementById('puntosJugador2');
 puntosJugador2.innerHTML = 13 - fichaAzulVariable.length;

 if ( fichaRojaVariable.length ===1) {
     alert('El jugador N°1 gano ');
 }
 if (fichaAzulVariable === 1) {
     alert('El jugador N°2 gano')  
 }
}

function cambioDeTurno(){
    if (Turno=== 1) {
        Turno++;
        Jugador1.style.boxShadow ='none';
        Jugador2.style.boxShadow = '0 0 80px #558564';
        resetearObtenerFichaObjeto();   
    }
    else{
        Turno--;
        Jugador1.style.boxShadow = '0 0 80px #558564';
        Jugador2.style.boxShadow= 'none';
        resetearObtenerFichaObjeto();
    }
}

function resetearObtenerFichaObjeto(){
    obtenerFichaObjeto.id = null;
    obtenerFichaObjeto.Rey = false;
    obtenerFichaObjeto.moverComerIzquierda = false;
    obtenerFichaObjeto.moverComerDerecha = false;
    // obtenerFichaObjeto.comerReyArribaALaDerecha = false;
    // obtenerFichaObjeto.comerReyArribaALaIzquierda = false;
    // obtenerFichaObjeto.comerReyAbajoALaDerecha = false;
    // obtenerFichaObjeto.comerReyAbajoALaIzquierda = false;
    obtenerFichaObjeto.moverIzquierda = false;
    obtenerFichaObjeto.moverDerecha = false;
    obtenerFichaObjeto.moverPintarIzquierda = null;
    obtenerFichaObjeto.moverPintarDerecha = null;
    obtenerFichaObjeto.moverComerDerechaPintado = null;
    obtenerFichaObjeto.moverComerIzquierdaPintado = null;
    agregarEvento();
    quitarEvento = false;
    contadorClicks = 0;
}
function resetearMovimientosPermitidosObjeto(){
    MovimientosPermitidosObjeto.SeguirMoviendoDerecha = true;
    MovimientosPermitidosObjeto.SeguirMoviendoIzquierda = true;
}
agregarEvento();