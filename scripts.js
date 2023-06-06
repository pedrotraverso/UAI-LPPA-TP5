const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const nombreInput = document.getElementById('nombre');
const formTitle = document.getElementById('form-title');

nombreInput.addEventListener('keydown', () => {
    formTitle.textContent = `HOLA ${nombreInput.value}`.toUpperCase();
});

const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{6,}$/, // Debe tener más de 6 letras y al menos un espacio entre medio.
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, // Debe tener un formato de email válido.
    contrasena: /^.{8,}$/, // Al menos 8 caracteres, formados por letras y números.
    edad: /^(?:1[89]|[2-9]\d|\d{3,})$/, // Número entero mayor o igual a 18.
    telefono: /^[0-9]{7,}$/, // Número de al menos 7 dígitos, no aceptar espacios, guiones ni paréntesis.
    direccion: /^[a-zA-ZÀ-ÿ0-9\s]{5,}$/, // Al menos 5 caracteres, con letras, números y un espacio en el medio.
    ciudad: /^.{3,}$/, // Al menos 3 caracteres.
    cp: /^.{3,}$/, // Al menos 3 caracteres.
    dni: /^\d{7,8}$/, // Número de 7 u 8 dígitos.
}

const campos = {
    nombre: false,
    email: false,
    contrasena: false,
    edad: false,
    telefono: false,
    direccion: false,
    ciudad: false,
    cp: false,
    dni: false
}

const validarFormulario = (e) => {
    switch (e.target.name) {
        case "nombre":
            validarCampo(expresiones.nombre, e.target, 'nombre');
            break;
        case "email":
            validarCampo(expresiones.email, e.target, 'email');
            break;
        case "contrasena":
            validarCampo(expresiones.contrasena, e.target, 'contrasena');
            validarPassword2();
            break;
        case "contrasena2":
            validarPassword2();
            break;
        case "edad":
            validarCampo(expresiones.edad, e.target, 'edad');
            break;
        case "telefono":
            validarCampo(expresiones.telefono, e.target, 'telefono');
            break;
        case "direccion":
            validarCampo(expresiones.direccion, e.target, 'direccion');
            break;
        case "ciudad":
            validarCampo(expresiones.ciudad, e.target, 'ciudad');
            break;
        case "cp":
            validarCampo(expresiones.cp, e.target, 'cp');
            break;
        case "dni":
            validarCampo(expresiones.dni, e.target, 'dni');
            break;
    }
}

const validarCampo = (expresion, input, campo) => {
    if (expresion.test(input.value)) {
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos[campo] = true;
    } else {
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
        campos[campo] = false;
    }
}

const validarPassword2 = () => {
    const inputPassword1 = document.getElementById('contrasena');
    const inputPassword2 = document.getElementById('contrasena2');

    if (inputPassword1.value !== inputPassword2.value) {
        document.getElementById(`grupo__contrasena2`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__contrasena2`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__contrasena2 i`).classList.add('fa-times-circle');
        document.querySelector(`#grupo__contrasena2 i`).classList.remove('fa-check-circle');
        document.querySelector(`#grupo__contrasena2 .formulario__input-error`).classList.add('formulario__input-error-activo');
        campos['contrasena'] = false;
    } else {
        document.getElementById(`grupo__contrasena2`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__contrasena2`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo__contrasena2 i`).classList.remove('fa-times-circle');
        document.querySelector(`#grupo__contrasena2 i`).classList.add('fa-check-circle');
        document.querySelector(`#grupo__contrasena2 .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos['contrasena'] = true;
    }
}

inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    const terminos = document.getElementById('terminos');
    if (campos.nombre && campos.email && campos.contrasena && campos.edad && campos.telefono && campos.direccion && campos.ciudad && campos.cp && campos.dni && terminos.checked) {
        formulario.reset();

        document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
        setTimeout(() => {
            document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
        }, 5000);

        document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
            icono.classList.remove('formulario__grupo-correcto');
        });
    } else {
        document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
    }
});