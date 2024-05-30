

// const formulario = document.getElementById('validaus').addEventListener('submit', function (event) {
const formulario = document.getElementById('validaus');
formulario.addEventListener('submit', function (event) {

    event.preventDefault();

    let error = 9;
    let username = document.getElementById('nombre').value;
    let password = document.getElementById('pass').value;

    // valida usuario 
    if (username === 'admin') {
        error = 0;
        document.getElementById('error1').innerHTML = 'Nombre de usuario validado.';
        document.getElementById('nombre').className = 'correcto';
        document.getElementById('error1').className = 'correcto';
    } else {
        if (username !== 'usuario') {
            error = 1;
            document.getElementById('error1').innerHTML = 'Nombre de usuario incorrecto. Inténtalo de nuevo.';
            document.getElementById('nombre').className = 'error';
            document.getElementById('error1').className = 'error';
            // alert('Nombre de usuario incorrecto. Inténtalo de nuevo.');
            return;
        }
    }

    // valida contraseña
    if (password === 'pass') {
        document.getElementById('error2').innerHTML = 'Contraseña para el usuario valida.';
        document.getElementById('pass').className = 'correcto';
        document.getElementById('error2').className = 'correcto';
    } else {
        if (password !== 'password') {
            error = 2;
            sessionStorage.removeItem('usuario');
            document.getElementById('error2').innerHTML = 'Contraseña incorrecta. Inténtalo de nuevo.';
            document.getElementById('pass').className = 'error';
            document.getElementById('error2').className = 'error';
            // alert('Contraseña incorrecta. Inténtalo de nuevo.');
        }
        return;
    }
    if (error == 0) {
        // alert('¡Inicio de sesión exitoso!');
        sessionStorage.setItem('usuario', username);
        window.location.href = "/index.html";
        // formulario.submit();
    }
});

formulario.addEventListener('reset', function (event) {
    event.preventDefault();
    sessionStorage.removeItem('usuario');
    alert('¡Cancelo, se perderan todos los datos!');
    window.location.href = "/index.html";
});

// window.onload = function () {
//     //     window.location.hash = "no-back-button";
//     //     window.location.hash = "Again-No-back-button";
//     //     window.onhashchange = function () {
//     //         window.location.hash = "no-back-button";
//     //     }
//     // };
//     window.history.pushState(null, "", window.location.href);
//     window.onpopstate = funtion(){
//         window.history.pushState(null, "", window.location.href);
//     }
// };