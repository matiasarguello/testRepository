var grilla = [
	[1, 2, 3],
	[4, 5, 6],
	[7, 8, 9]
];

var posicionVacia = {
	fila:2,
	columna:2
};

function chequearSiGano(){
	var gano = true;
	var contador = 1;
	for (var i = 0 ; i < grilla.length ; i++) {
		for (var j = 0 ; j < grilla[i].length ; j++) {
			if (grilla[i][j] != contador) {
				gano = false;
			} else {
				contador++;
			}
		}
	}
	return gano;
}

function mostrarCartelGanador(){
	alert("ea ganaste perro");
}

function intercambiarPosiciones(fila1, columna1, fila2, columna2){
	var idPosicionNueva = "imagen" + grilla[fila2][columna2];
	var idPosicionVieja = "imagen" + grilla[fila1][columna1];
	var imagenPosicionNueva = document.getElementById(idPosicionNueva);
	var imagenPosicionVieja = document.getElementById(idPosicionVieja);
	var clonImagenVieja = imagenPosicionVieja.cloneNode();
	var clonImagenNueva = imagenPosicionNueva.cloneNode();
	var elementoPadre = imagenPosicionNueva.parentNode;
	elementoPadre.replaceChild(clonImagenNueva, imagenPosicionVieja);
	elementoPadre.replaceChild(clonImagenVieja, imagenPosicionNueva);
	var auxiliar = grilla[fila2][columna2];
	grilla[fila2][columna2] = grilla[fila1][columna1];
	grilla[fila1][columna1] = auxiliar;
}

function actualizarPosicionVacia(nuevaFila,nuevaColumna){
	posicionVacia.fila = nuevaFila;
	posicionVacia.columna = nuevaColumna;
}

function posicionValida(fila, columna){
	if((fila >= 0)&&(fila <= 2)) {
		if((columna >= 0)&&(columna <= 2)) {
			return true;
		}
	}
	return false;
}

function moverEnDireccion(direccion){

	var nuevaFilaPiezaVacia;
	var nuevaColumnaPiezaVacia;

	// Intercambia pieza blanca con la pieza que está arriba suyo
	if(direccion == 40){
		nuevaFilaPiezaVacia = posicionVacia.fila+1;
		nuevaColumnaPiezaVacia = posicionVacia.columna;
	}
	// Intercambia pieza blanca con la pieza que está abajo suyo
	else if (direccion == 38) {
		nuevaFilaPiezaVacia = posicionVacia.fila-1;
		nuevaColumnaPiezaVacia = posicionVacia.columna;
	}
	// Intercambia pieza blanca con la pieza que está a su izq
	else if (direccion == 39) {
		nuevaFilaPiezaVacia = posicionVacia.fila;
		nuevaColumnaPiezaVacia = posicionVacia.columna+1;
	}
	// Intercambia pieza blanca con la pieza que está a su der
	else if (direccion == 37) {
		nuevaFilaPiezaVacia = posicionVacia.fila;
		nuevaColumnaPiezaVacia = posicionVacia.columna-1;
	}

	// Se chequea si la nueva posición es válida, si lo es, se intercambia 
	if (posicionValida(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia)){
		intercambiarPosiciones(posicionVacia.fila, posicionVacia.columna,
		nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
		actualizarPosicionVacia(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
	}
}

function mezclarPiezas(veces){
	if(veces<=0){return;}
	var direcciones = [40, 38, 39, 37];
	var direccion = direcciones[Math.floor(Math.random()*direcciones.length)];
	moverEnDireccion(direccion);

	setTimeout(function(){
		console.log(veces);
		mezclarPiezas(veces-1);
	},10);
}

function capturarTeclas(){
	document.body.onkeydown = (function(evento) {
		if(evento.which == 40 || evento.which == 38 || evento.which == 39 || evento.which == 37){
			moverEnDireccion(evento.which);
			var gano = chequearSiGano();
			if(gano){
				setTimeout(function(){
					mostrarCartelGanador();  
				},500);
			} 
			evento.preventDefault();
		}
	})
}

function iniciar(){
	mezclarPiezas(300);
	capturarTeclas();
}


iniciar();