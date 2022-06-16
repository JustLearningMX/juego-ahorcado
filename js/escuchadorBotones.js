const botonIniciarJuego = document.querySelector('.btn-iniciar');
const botonAgregarPalabra = document.querySelector('.btn-agregar');
const botonCancelar = document.querySelector('.btn-cancelar');
const botonNuevoJuego = document.querySelector('.btn-nuevo');

if(botonIniciarJuego){
    botonIniciarJuego.addEventListener('click', (event)=>{
        event.preventDefault;
        window.location.href = './jugar.html';
    });
}

if(botonAgregarPalabra){
    botonAgregarPalabra.addEventListener('click', (event)=>{
        event.preventDefault;
        window.location.href = './ingresar.html';
    });
}

if(botonCancelar){
    botonCancelar.addEventListener('click', (event)=>{
        event.preventDefault;
        window.location.href = './index.html';
    });
}

if(botonNuevoJuego){
    botonNuevoJuego.addEventListener('click', (event)=>{
        event.preventDefault;
        window.location.href = './jugar.html';
    });
}