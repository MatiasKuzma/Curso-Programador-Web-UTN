function Ejercicio1()
{
    const distancia = prompt('Ingrese la distancia en metros que desea recorrer','')
    const i = ['Caminar', 'Bicicleta', 'Colectivo', 'Auto', 'Avion']

    if (distancia>=0 && distancia<=1000)
    {
        window.alert('Te recomendamos ' + i[0])
    }
    else if(distancia>1000 && distancia<=10000)
    {
        window.alert('Te recomendamos viajar en ' + i[1])
    }
    else if(distancia>10000 && distancia<=30000)
    {
        window.alert('Te recomendamos viajar en ' + i[2])
    }
    else if(distancia>30000 && distancia<=100000)
    {
        window.alert('Te recomendamos viajar en ' + i[3])
    }
    else if(distancia>100000)
    {
        window.alert('Te recomendamos viajar en ' + i[4])
        
    }
    else
    {
        window.alert('La distancia no puede tener un valor negativo y no debe contener ninguna letra')

    }

}

function Ejercicio2()
{
    const i = prompt('Ingrese la cantidad de numeros que desea comparar', '')
    let flag = i - 1
    let contador = 1
    let numero1 = parseInt(prompt(`Ingrese el numero ${contador}/${i}`, ''))
    let mayor = numero1
    while(flag!=0)
    {
        contador = contador + 1
        flag = flag-1
        
        let numero2 = parseInt(prompt(`Ingrese el numero ${contador}/${i}`, ''))

        if(mayor < numero2)
        {
            mayor = numero2
        }


        

    }

    window.alert('El numero mayor que ingresaste es ' + mayor)
}