const pantalla = document.querySelector('.lienzo');
const pincel = pantalla.getContext('2d');
pincel.fillStyle = 'white';
pincel.fillRect(0,0,300,250);
console.log(palabras)
let arrayDePalabras = JSON.parse(window.localStorage.getItem('palabras'));

arrayDePalabras = !arrayDePalabras ? palabras : arrayDePalabras;

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  }

const elegirPalabra = ()=>{
    const posicion = getRandomInt(1, arrayDePalabras.length+1)    
    return arrayDePalabras[posicion-1];
}

const palabra = elegirPalabra();

const ponerPosiciones = ()=>{
    const contenedorPalabras = document.querySelector('.contenedor-palabraElegida');

    for (let i = 0; i < palabra.length; i++) {
        const input = document.createElement('input');
        input.setAttribute('id', i);
        input.setAttribute('class', 'inputLetra');
        contenedorPalabras.appendChild(input);
    }
}

ponerPosiciones();

const dibujarLinea = (x,y,x2,y2,color)=>{
    pincel.beginPath();
    pincel.moveTo(x, y);
    pincel.lineTo(x2, y2);
    pincel.lineWidth = 3;
    pincel.strokeStyle = color;
    pincel.stroke();
}

const dibujarCirculo = (x, y, radio, color)=>{
    pincel.fillStyle = color;
    pincel.beginPath();
    pincel.arc(x, y, radio, 0, 2*Math.PI);
    pincel.fill();        
};

const dibujarOjos = ()=>{
    pincel.beginPath();
    pincel.moveTo(172, 88);
    pincel.lineTo(177, 93);
    pincel.lineWidth = 1;
    pincel.strokeStyle = '#0A3871';
    pincel.stroke();

    pincel.beginPath();
    pincel.moveTo(177, 88);
    pincel.lineTo(172, 93);
    pincel.lineWidth = 1;
    pincel.strokeStyle = '#0A3871';
    pincel.stroke();

    pincel.beginPath();
    pincel.moveTo(185, 88);
    pincel.lineTo(190, 93);
    pincel.lineWidth = 1;
    pincel.strokeStyle = '#0A3871';
    pincel.stroke();

    pincel.beginPath();
    pincel.moveTo(190, 88);
    pincel.lineTo(185, 93);
    pincel.lineWidth = 1;
    pincel.strokeStyle = '#0A3871';
    pincel.stroke();
}

const cuerpo = {
    base: () => dibujarLinea(20, 240, 280, 240, '#0A3871'),
    1: () => dibujarLinea(60, 40, 60, 240, '#0A3871'),
    2: () => dibujarLinea(59, 40, 181, 40, '#0A3871'),
    3: () => dibujarLinea(180, 40, 180, 80, '#0A3871'),
    4: () => dibujarCirculo(180,95, Math.PI+18, "#0A3871"),
    cara: () => dibujarCirculo(180,95, Math.PI+15, "white"),
    5: () => dibujarLinea(180, 115, 180, 190, '#0A3871'),
    6: () => dibujarLinea(180, 190, 150, 225, '#0A3871'),
    7: () => dibujarLinea(180, 190, 210, 225, '#0A3871'),
    8: () => dibujarLinea(180, 115, 155, 160, '#0A3871'),
    9: () => dibujarLinea(180, 115, 205, 160, '#0A3871'),
    ojos: () => dibujarOjos(),
}

cuerpo['base']();

const arrayInputs = document.querySelectorAll('.inputLetra');
let contador = 1;
let acertadas = 0;
const letrasElegidas = [];

const ponerMensaje = (mensaje, color)=>{
    const contenedorMensaje = document.querySelector('.mensajes');
    contenedorMensaje.innerHTML = '';
    const p = document.createElement('p');
    p.style.color = color;
    p.textContent = mensaje;
    contenedorMensaje.appendChild(p);
}

const verificarLetra = (inputs, posicion)=>{
    // console.log(palabra);    

    const letra = inputs[posicion].value.toUpperCase();

    //Si la letra ya se ha usado
    if(letrasElegidas.includes(letra)){
        ponerMensaje(`La letra ${letra} ya fue seleccionada`, '#666');
        setTimeout(()=>{
            ponerMensaje(``, 'white');
        }, 1200);
    }

    //Letra de un caracter y no se ha usado
    if(letra.length === 1 && !letrasElegidas.includes(letra)){

        //Si la letra NO coincide (No acertó)
        if(palabra[posicion].toUpperCase() !== letra){         
            let existeEnOtraPosicion = false;

            //Se revisan los otros inputs
            for (let i = 0; i < palabra.length; i++){
                if(i !== posicion && palabra[i].toUpperCase() === letra){
                    existeEnOtraPosicion = true;
                    acertadas++;
                    inputs[i].value = letra;
                    inputs[i].disabled = true;
                    inputs[i].classList.toggle("inputOk");
                    inputs[posicion].value = '';
                }
            }

            //Si la letra no existiera tampoco en otra posición
            if(!existeEnOtraPosicion){
                const contenedorLetrasDescartadas = document.querySelector('.contenedor-letrasDescartadas');
                const p = document.createElement('p');
                p.textContent = letra;
                contenedorLetrasDescartadas.appendChild(p);
                cuerpo[contador]();
                
                if(contador == 4){
                    cuerpo['cara']();
                }

                if(contador == 9){
                    cuerpo['ojos']();
                }

                contador++;
            }            

        }
        //Si la letra SI coincide (Acertó)
        else{
            acertadas++;
            inputs[posicion].disabled = true;
            inputs[posicion].classList.toggle("inputOk");

            for (let i = 0; i < palabra.length; i++){
                if(i !== posicion && palabra[i].toUpperCase() === letra){
                    acertadas++;
                    inputs[i].value = letra;
                    inputs[i].disabled = true;
                    inputs[i].classList.toggle("inputOk");
                }
            }
        }        

        //Si se pierden todas las oportunidades
        if (contador > 9) {
            ponerMensaje('Has Perdido :(', 'crimson');
            
            for (let i = 0; i < palabra.length; i++){
                if(!inputs[i].classList.contains('inputOk')){
                    inputs[i].value = palabra[i].toUpperCase();
                    inputs[i].disabled = true;
                    inputs[i].classList.toggle("inputFailed");
                }
            }
        } 
        //Si acertó todas las letras
        else if (acertadas === palabra.length) {
            ponerMensaje('¡Felicidades! Has Ganado', '#3e8e41');
        } 
        //Si aún tiene oportunidad
        else {
            letrasElegidas.push(letra);
            // console.log(letrasElegidas);
        }        
    }
}

//Escuchamos cuando el usuario escriba en algún input
for (let j = 0; j < arrayInputs.length; j++) {
    arrayInputs[j].addEventListener('keyup', (e)=>{
        verificarLetra(arrayInputs, j);
    });
}