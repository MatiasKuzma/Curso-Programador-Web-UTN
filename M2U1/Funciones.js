window.addEventListener('load', function () {
    const fondo = document.getElementsByTagName('body')[0]
    const rojo = document.getElementById('rojo')
    const verde = document.getElementById('verde')
    const azul = document.getElementById('azul')
    const borrar = document.getElementById('borrar')

    rojo.addEventListener('click', function () {
        fondo.style.backgroundColor = '#f00'
    })

    verde.addEventListener('click', function () {
        fondo.style.backgroundColor = '#008000'
    })

    azul.addEventListener('click', function () {
        fondo.style.backgroundColor = '#0000FF'
    })

    borrar.addEventListener('click', function () {
        fondo.style.backgroundColor = '#FFFFFF'
    })

})

function contadorDeCaracteres(texto) {
    const maximo = 50;
    const caracteres = texto.value.length;

    if(maximo<caracteres){
        document.getElementById("contador").innerHTML = '<span style="color: red;">'+ caracteres + '/' + maximo + '</span>'
    }
    else{
        document.getElementById("contador").innerHTML = '<span style="color: green;">'+ caracteres + '/' + maximo + '</span>'
    }
}






