const palabraNueva = document.querySelector('.palabra-nueva');
const botonGuardar = document.querySelector('.btn-guardar');

const mensaje = document.querySelector('.mensaje');
mensaje.textContent = 'Min. 3 y Máx. de 8 letras';

const arrayDePalabras = JSON.parse(window.localStorage.getItem('palabras'));

let esLongitudCorrecta = false;

palabraNueva.addEventListener('keyup', (e)=>{
    e.preventDefault();
    esLongitudCorrecta = palabraNueva.value.length >= 3 && palabraNueva.value.length < 9 ? true : false;
});

botonGuardar.addEventListener('click', (e)=>{
    e.preventDefault();

    if(esLongitudCorrecta){
        palabras.push(palabraNueva.value);
        
        if(arrayDePalabras){
            window.localStorage.removeItem('palabras');
        }

        window.localStorage.setItem(
            "palabras", JSON.stringify(palabras)
        );

        window.location.href = './jugar.html';
    }
});