let pagina = 1;
let cargar = true;
let ubiE = 0;
let ubiP = 0;
let ubiS = 0;
let ubiV = 0;

// controles de estrenos

function controlCarrusel(modo, direccion) {
    switch (modo) {
        case 'estrenos':
            ubiE = procesarDir(direccion, ubiE);
            cargarPelis(modo, ubiE);
            break;
        case 'peliculas':
            ubiP = procesarDir(direccion, ubiP);
            cargarPelis(modo, ubiP);
            break;
        case 'series':
            ubiS = procesarDir(direccion, ubiS);
            cargarPelis(modo, ubiS);
            break;
        case 'vista':
            ubiV = procesarDir(direccion, ubiV);
            cargarPelis(modo, ubiV);
            break;
    }
    
    function procesarDir(dir, ubi) {
        if (dir == 'S') {
            if (ubi < 16) { ubi++; }
            else { ubi = 0; }
        } else if (dir == 'A') {
            if (ubi > 1) { ubi--; }
            else { ubi = 16; }
        }
        return ubi;
    }
}

function cargarPelis(modo, posi) {
    // console.log(modo);
    switch (modo) {
        case 'estrenos':
            leerPelis(`https://api.themoviedb.org/3/movie/upcoming?api_key=afaf4c9ae3a0ac7f6c3ae156b91a73bc&language=es-AR&page=${pagina}`, modo, posi);
            break;
        case 'peliculas':
            leerPelis(`https://api.themoviedb.org/3/movie/popular?api_key=afaf4c9ae3a0ac7f6c3ae156b91a73bc&language=es-AR&page=${pagina}`, modo, posi);
            break;
        case 'series':
            leerPelis(`https://api.themoviedb.org/3/tv/popular?api_key=afaf4c9ae3a0ac7f6c3ae156b91a73bc&language=es-AR&page=${pagina}`, modo, posi);
            break;
        case 'vista':
            // este itema se completara desde la base de datos con lo seleccionado por el usuario
            // leerVista("", modo, posi);
            break;
        default: {
            //            no procesar error
            break;
        }
    }
}

function leerPelis(origen, modo, ubi) {
    const json = fetch(`${origen}`)
        .then(response => response.json())
        .then(data => procesaPelis(data));
    function procesaPelis(fjson) {
        const filas = fjson.results.slice(ubi, ubi + 4);
        const fila4 = filas.map(obj => fila(obj));
        fila4.splice(0, 0, `<button class="boton" onclick="controlCarrusel('${modo}','S');">=></button>`);
        fila4.splice(5, 0, `<button class="boton" onclick="controlCarrusel('${modo}','A');"><=</button>`);
        document.getElementById(modo).innerHTML = fila4.join(' ');
        function fila(fobj) {
            return `<div class="item-horiz"><img src="https://image.tmdb.org/t/p/w500${fobj.poster_path} "></div>`
        };
    };
};

function validarUs(event, modo) {
    // console.log(event);
    let usuario = sessionStorage.getItem('usuario')
    if (modo && (usuario === "" || usuario == null)) {
        event.preventDefault();
        alert("Debe iniciar sesión.(Menu superior/Inicio) \nusuario: admin \nclave: pass \ntodo en minúsculas");
        removeEventListener(onmousedown, validarUs);
    } else {
        // break;
    }
}

if (cargar) {
    cargarPelis('estrenos', ubiE);
    cargarPelis('peliculas', ubiP);
    cargarPelis('series', ubiS);
    cargarPelis('vista', ubiV);
    cargar = false;
}
