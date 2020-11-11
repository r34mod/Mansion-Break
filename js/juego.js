var canvas;
var ctx;
var FPS = 240;

var anchoF = 45;
var altoF = 45;


var nivel = 1;
var jefe;
var protagonista;
var velocidad = 1;
var enemigo=[];

var imagenAntorcha;

var tileMap;

var sonidoMain;
var sonido1;
var sonidoMuerto;
var sonidoPuerta;

sonidoMain = new Howl({
    src: ['sound/Cyberpunk.mp3'],
        loop: true
});

sonido1 = new Howl({
    src: ['sound/efecto2.wav'],
    loop: false
});

sonidoMuerto = new Howl({
    src: ['sound/round_end.wav'],
    loop: false
});

sonidoPuerta = new Howl({
    src: ['sound/door.ogg'],
    loop: false
});

//Y de arriba abajo
//X izq a drch
var escenario = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 3, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 0, 2, 2, 0],
    [0, 2, 1, 2, 0, 2, 0, 2, 0, 0, 0, 2, 2, 2, 0, 2, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 2, 2, 0],
    [0, 0, 0, 2, 2, 2, 0, 2, 2, 2, 2, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 2, 2, 0],
    [0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 2, 0, 0, 2, 2, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 2, 0],
    [0, 2, 2, 0, 2, 0, 2, 2, 2, 2, 2, 0, 2, 2, 0, 0, 2, 0, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 2, 2, 0],
    [0, 0, 2, 2, 2, 2, 2, 0, 0, 2, 0, 0, 2, 0, 1, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 2, 2, 0],
    [0, 0, 2, 0, 0, 0, 2, 2, 0, 2, 2, 2, 2, 0, 2, 0, 2, 0, 0, 0, 0, 0, 2, 0, 2, 0, 2, 2, 1, 2, 0],
    [0, 0, 2, 2, 2, 0, 0, 2, 0, 0, 0, 2, 0, 0, 2, 0, 2, 0, 0, 2, 2, 2, 2, 0, 2, 0, 2, 0, 2, 2, 0],
    [0, 2, 2, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 2, 2, 2, 2, 0, 2, 0, 0, 0, 0, 2, 0, 2, 0, 2, 2, 0],
    [0, 0, 2, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 2, 0, 2, 0, 2, 2, 0],
    [0, 2, 2, 2, 0, 0, 2, 0, 0, 0, 1, 0, 0, 2, 0, 0, 2, 2, 0, 2, 2, 2, 2, 0, 3, 0, 2, 0, 2, 2, 0],
    [0, 2, 0, 0, 0, 0, 2, 0, 0, 2, 2, 2, 2, 2, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 2, 2, 2, 0, 2, 2, 0],
    [0, 2, 0, 2, 0, 0, 2, 0, 0, 2, 0, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 2, 0],
    [0, 2, 2, 2, 2, 0, 2, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 2, 0],
    [0, 0, 2, 0, 0, 0, 2, 2, 2, 2, 0, 2, 2, 2, 0, 0, 0, 2, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 2, 2, 0],
    [0, 2, 2, 0, 4, 2, 2, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 2, 0],
    [0, 2, 2, 0, 0, 0, 2, 0, 0, 2, 2, 2, 2, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 2, 0],
    [0, 0, 2, 2, 2, 0, 2, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 2, 2, 0],
    [0, 0, 0, 0, 2, 0, 2, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 2, 2, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];


var escenario2 = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0],
    [0, 2, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 3, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 0, 2, 2, 0],
    [0, 2, 2, 2, 0, 2, 0, 2, 0, 0, 0, 2, 2, 2, 0, 2, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 2, 2, 0],
    [0, 2, 0, 0, 0, 2, 0, 2, 2, 2, 2, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 2, 2, 0],
    [0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 2, 0, 0, 2, 2, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 2, 0],
    [0, 2, 2, 0, 2, 0, 2, 2, 2, 2, 2, 0, 2, 2, 0, 0, 2, 0, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 2, 2, 0],
    [0, 0, 0, 2, 2, 2, 2, 0, 0, 2, 0, 0, 2, 0, 1, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 2, 2, 0],
    [0, 0, 2, 0, 0, 0, 2, 2, 0, 2, 2, 2, 2, 0, 2, 0, 2, 0, 0, 0, 0, 0, 2, 0, 2, 0, 2, 2, 1, 2, 0],
    [0, 0, 2, 2, 2, 0, 0, 2, 0, 0, 0, 2, 0, 0, 2, 0, 2, 0, 0, 2, 2, 2, 2, 0, 2, 0, 2, 0, 2, 2, 0],
    [0, 2, 2, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 2, 2, 2, 2, 0, 2, 0, 0, 0, 0, 2, 0, 2, 0, 2, 2, 0],
    [0, 0, 2, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 2, 0, 2, 0, 2, 2, 0],
    [0, 2, 2, 2, 0, 0, 2, 0, 0, 0, 1, 0, 0, 2, 0, 0, 2, 2, 0, 2, 2, 2, 2, 0, 2, 0, 2, 0, 2, 2, 0],
    [0, 2, 0, 0, 0, 0, 2, 0, 0, 2, 2, 2, 2, 2, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 2, 2, 2, 0, 2, 2, 0],
    [0, 2, 0, 2, 0, 0, 2, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 2, 0],
    [0, 2, 2, 2, 2, 0, 2, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 2, 0],
    [0, 0, 2, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 2, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 2, 2, 0],
    [0, 2, 2, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 2, 0],
    [0, 2, 2, 0, 0, 0, 2, 0, 0, 2, 2, 2, 2, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 2, 0],
    [0, 0, 2, 2, 2, 0, 2, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 2, 2, 0],
    [0, 0, 0, 0, 2, 0, 2, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 2, 2, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];



var escenario3 = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0],
    [0, 2, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 3, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 0, 2, 2, 0],
    [0, 2, 1, 2, 0, 2, 0, 2, 0, 0, 0, 2, 2, 2, 0, 2, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 2, 2, 0],
    [0, 0, 0, 2, 2, 2, 0, 2, 2, 2, 2, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 2, 2, 0],
    [0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 2, 0, 0, 2, 2, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 2, 0],
    [0, 2, 2, 0, 2, 0, 2, 2, 2, 2, 2, 0, 2, 2, 0, 0, 2, 0, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 2, 2, 0],
    [0, 0, 2, 2, 2, 2, 2, 0, 0, 2, 0, 0, 2, 0, 1, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 2, 2, 0],
    [0, 0, 2, 0, 0, 0, 2, 2, 0, 2, 2, 2, 2, 0, 2, 0, 2, 0, 0, 0, 0, 0, 2, 0, 2, 0, 2, 2, 1, 2, 0],
    [0, 0, 2, 2, 2, 0, 0, 2, 0, 0, 0, 2, 0, 0, 2, 0, 2, 0, 0, 2, 3, 2, 2, 0, 2, 0, 2, 0, 2, 2, 0],
    [0, 2, 2, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 2, 2, 2, 2, 0, 2, 0, 0, 0, 0, 2, 0, 2, 0, 2, 2, 0],
    [0, 0, 2, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 2, 0, 2, 0, 2, 2, 0],
    [0, 2, 2, 2, 0, 0, 2, 0, 0, 0, 1, 0, 0, 2, 0, 0, 2, 2, 0, 2, 2, 2, 2, 0, 2, 0, 2, 0, 2, 2, 0],
    [0, 2, 0, 0, 0, 0, 2, 0, 0, 2, 2, 2, 2, 2, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 2, 2, 2, 0, 2, 2, 0],
    [0, 2, 0, 2, 0, 0, 2, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 2, 0],
    [0, 2, 2, 2, 2, 0, 2, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 2, 0],
    [0, 0, 2, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 2, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 2, 2, 0],
    [0, 2, 2, 0, 4, 2, 2, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 2, 0],
    [0, 2, 2, 0, 0, 0, 2, 0, 0, 2, 2, 2, 2, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 2, 0],
    [0, 0, 2, 2, 2, 0, 2, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 2, 2, 0],
    [0, 0, 0, 0, 2, 0, 2, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 2, 2, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

function dibujaEscenario(){


  for(var y=0;y<21;y++){
    for(var x=0;x<31;x++){
      var tile = escenario[y][x];
      ctx.drawImage(tileMap,tile*32,0,32,32,anchoF*x,altoF*y,anchoF,altoF);
    }
  }
}


function dibujaEscenario2() {


	for (var y = 0; y < 21; y++) {
		for (var x = 0; x < 31; x++) {

			var tile = escenario2[y][x];
			ctx.drawImage(tileMap, tile * 32, 0, 32, 32, anchoF * x, altoF * y, anchoF, altoF);
		}
	}
}

function dibujaEscenario3() {


	for (var y = 0; y < 21; y++) {
		for (var x = 0; x < 31; x++) {

			var tile = escenario3[y][x];
			ctx.drawImage(tileMap, tile * 32, 0, 32, 32, anchoF * x, altoF * y, anchoF, altoF);
		}
	}
}



var niveles = function (nivel) {
	if (nivel == 1) {
		dibujaEscenario();
	}
	if (nivel == 2) {
		dibujaEscenario2();
	}

	if (nivel == 3) {
		dibujaEscenario3();
	}
}


var antorcha = function(x,y){
  this.x = x;
  this.y = y;

  this.retraso = 10;
  this.contador = 0;
  this.fotograma = 0; //0-3


  this.cambiaFotograma = function(){
    if(this.fotograma < 3) {
      this.fotograma++;
    }
    else{
      this.fotograma = 0;
    }

  }


  this.dibuja = function(){

    if(this.contador < this.retraso){
      this.contador++;
    }
    else{
      this.contador = 0;
      this.cambiaFotograma();
    }

    ctx.drawImage(tileMap,this.fotograma*32,64,32,32,anchoF*x,altoF*y,anchoF,altoF);
  }

}




//CLASE ENEMIGO
var malo = function(x,y){
    this.x = x;
    this.y = y;
	this.vidaM = 50;
    this.direccion = Math.floor(Math.random()*4);

    this.retraso = 50;
    this.fotograma = 0;


    this.dibuja = function(){
      ctx.drawImage(tileMap,0,32,32,32,this.x*anchoF,this.y*altoF,anchoF,altoF);
    }

	this.margenes = function (x, y) {
		var colision = false;
		if (nivel == 1) {
			if (escenario[y][x] == 0) {
				colision = true;
			}
		}
		if (nivel == 2) {
			if (escenario2[y][x] == 0) {
				colision = true;
			}

		}
		if (nivel == 3) {
			if (escenario3[y][x] == 0) {
				colision = true;
			}
		}

		return (colision);
	}

    this.compruebaColision = function(x,y,nivel){
        var colisiona = false;
		if (nivel == 1) {
			if (escenario[y][x] == 0) {
				colisiona = true;
			}
		}
		if (nivel == 2) {
			if (escenario2[y][x] == 0) {
				colisiona = true;
			}

		}
		if (nivel == 3) {
			if (escenario3[y][x] == 0) {
				colisiona = true;
			}
		}
		
        return colisiona;
	}
	


    this.mueve = function(){

		protagonista.colisionEnemigo(this.x, this.y);


      if(this.contador < this.retraso){
        this.contador++;
      }

      else{
        this.contador = 0;

        //ARRIBA
		  if (this.direccion == 0) {
			  if (this.margenes(this.x, this.y - 1) == false) {
            this.y--;
          }
          else{
            this.direccion = Math.floor(Math.random()*4);
          }
        }


        //ABAJO
        if(this.direccion == 1){
          if(this.margenes(this.x, this.y + 1)==false){
            this.y++;
          }
          else{
            this.direccion = Math.floor(Math.random()*4);
          }
        }

        //IZQUIERDA
        if(this.direccion == 2){
          if(this.margenes(this.x - 1, this.y)==false){
            this.x--;
          }
          else{
            this.direccion = Math.floor(Math.random()*4);
          }
        }

        //IZQUIERDA
        if(this.direccion == 3){
          if(this.margenes(this.x + 1, this.y)==false){
            this.x++;
          }
          else{
            this.direccion = Math.floor(Math.random()*4);
          }
        }
      }

    }

}


//OBJETO JUGADOR
var jugador = function(){
  this.x = 1;
  this.y = 1;
  this.vidaP = 100;
  this.color = '#820c01';
  this.llave = false;
	this.espada = false;
	

  this.dibuja = function(){
    ctx.drawImage(tileMap,32,32,32,32,this.x*anchoF,this.y*altoF,anchoF,altoF);
  }


  this.colisionEnemigo = function(x,y){
	  if (this.x == x && this.y == y) {
		
		this.muerte();
    }

  }

	

  this.margenes = function(x,y){
    var colision = false;
	  if (nivel == 1) {
		  if (escenario[y][x] == 0) {
			  colision = true;
		  }
	  }
	  if (nivel == 2) {
		  if (escenario2[y][x] == 0) {
			  colision = true;
		  }

	  }
	  if (nivel == 3) {
		  if (escenario3[y][x] == 0) {
			  colision = true;
		  }
	  }

    return(colision);
  }



  this.arriba = function(){
    if(this.margenes(this.x, this.y-1)==false){
      this.y--;
      this.logicaObjetos();
    }
  }


  this.abajo = function(){
    if(this.margenes(this.x, this.y+1)==false){
      this.y++;
      this.logicaObjetos();
    }
  }

  this.izquierda = function(){
    if(this.margenes(this.x-1, this.y)==false){
      this.x--;
      this.logicaObjetos();
    }
  }

  this.derecha = function(){
    if(this.margenes(this.x+1, this.y)==false){
      this.x++;
      this.logicaObjetos();
    }
  }


  this.victoria = function(){
    console.log('Has ganado!');

    this.x = 1;
	  this.y = 1;
	  nivel = 2;
	  this.llave = false;   //el jugador ya no tiene la llave
	  niveles(nivel);  //Empezamos nuevo mapa
    }

    this.puerta1 = function () {
        //8 y 29
        this.x = 29;
        this.y = 8; 
        this.llave = false;
    }

    this.puerta2 = function () {
        //19 y 22
        this.x = 18;
        this.y = 22;
        this.llave = false;
    }

    this.puerta3 = function () {
        this.x = 29;
        this.y = 4;
        this.llave = true;


    }


    this.muerte = function () {
        sonidoMuerto.play();
			this.x = 1;
			this.y = 1;

			this.llave = false;   //el jugador ya no tiene la llave
        escenario[8][3] = 3;
        escenario2[11][3] = 3;
		
    console.log('Has perdido!');

      //volvemos a poner la llave en su sitio
  }




  this.logicaObjetos = function(){
    var objeto = escenario[this.y][this.x];

    //OBTIENE llave
      if (objeto == 3) {
         
      this.llave = true;
        escenario[this.y][this.x] = 2;
        escenario2[this.y][this.x] = 2;
      console.log('Has obtenido la llave!!');
    }



    //ABRIMOS LA PUERTA
    if(objeto == 1){
        if (this.llave == true) {
            sonidoPuerta.play();
            if (escenario[2][2] == 1) {
                this.puerta1();
            }
            else if (escenario[10][11] == 1) {
                this.puerta2();
            }
            else if (escenario[6][14]==1) {
                this.puerta2();
            } else if (escenario[22][19]) {
                this.puerta3();
            }
                //Puerta final para la victoria
            else if (escenario[1][25] == 1) {
                this.victoria();
            }
       
        } else{
        console.log('No tienes la llave, no puedes pasar!');
      }
    }


  }

}






function inicializa(){
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');

  tileMap = new Image();
    tileMap.src = 'img/tilemap.png';

    sonidoMain.play();

  //CREAMOS AL JUGADOR
	protagonista = new jugador();

  //CREAMOS JEFE DE SALA
	jefe = new malo(6,1);

  //CREAMOS LA antorcha
  imagenAntorcha = new antorcha(0,0);

  //CREAMOS LOS ENEMIGOS
  enemigo.push(new malo(13,9));
  enemigo.push(new malo(5,14));
    enemigo.push(new malo(17, 7));
    enemigo.push(new malo(28, 13));
    enemigo.push(new malo(29, 2));

  //LECTURA DEL TECLADO
  document.addEventListener('keydown',function(tecla){

    if(tecla.keyCode == 38){
        protagonista.arriba();
        sonido1.play();
    }

    if(tecla.keyCode == 40){
        protagonista.abajo();
        sonido1.play();
    }

    if(tecla.keyCode == 37){
        protagonista.izquierda();
        sonido1.play();
    }

    if(tecla.keyCode == 39){
        protagonista.derecha();
        sonido1.play();
	  }

	  if (tecla.keyCode == 27) {
	  }

  });

  setInterval(function(){
    principal();
  },1000/FPS);
}


function borraCanvas(){
    canvas.width = 1400;
  canvas.height=950;
}


function principal(){
	borraCanvas();
	niveles(nivel);
	
  imagenAntorcha.dibuja();
	protagonista.dibuja();
	jefe.dibuja();
	jefe.mueve();

  for(c=0; c<enemigo.length; c++){
    enemigo[c].mueve();
    enemigo[c].dibuja();
  }

}
