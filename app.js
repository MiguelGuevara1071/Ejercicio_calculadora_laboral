function liquidarEmpleado(){
    let input;  
    input = document.getElementById("fechaInicio")
    const f1 = input.value

    input = document.getElementById("fechaFin")
    const f2 = input.value

    input = document.getElementById("InputSalario");
    const salario = input.value;

    if(salario < 1000000){
        alert("El salario no puede ser menor a 1.000.000")
        exit()
    }

    let fecha1 = convertirFecha1(f1);
    let fecha2 = convertirFecha2(f2);
    let fecha1Anio = fecha1.getFullYear();
    let fecha2Month = fecha2.getMonth();

    document.getElementById("Label").innerText = Datos liquidacion;

    document.getElementById("FechasLabel").innerText = Periodo (AAAA/MM/DD):;
    document.getElementById("Fechas").innerText = ${f1} al ${f2};   

    document.getElementById("SalarioLabel").innerText = Salario:;
    document.getElementById("Salario").innerText = new Intl.NumberFormat().format(salario);

    let transporte = calcularTransporte(salario);
    document.getElementById("TransporteLabel").innerText = Transporte;
    document.getElementById("Transporte").innerText = new Intl.NumberFormat().format(transporte);

    let dias = diasLaborados(fecha1, fecha2);
    document.getElementById("DiaslaboradosLabel").innerText = Dias laborados:;
    document.getElementById("Diaslaborados").innerText = dias;

    let cesantias1 = cesantias(dias, salario);
    document.getElementById("CesantiasLabel").innerText = Cesantias:;
    document.getElementById("Cesantias").innerText = new Intl.NumberFormat().format(cesantias1);

    let interesesCesantias1 = interesesCesantias(dias, cesantias1);
    document.getElementById("InteresesCesantiasLabel").innerText = Intereses cesantias:;
    document.getElementById("InteresesCesantias").innerText = new Intl.NumberFormat().format(interesesCesantias1);

    let vacaciones1 = vacaciones(salario, dias);
    document.getElementById("VacacionesLabel").innerText = Vacaciones:;
    document.getElementById("Vacaciones").innerText = new Intl.NumberFormat().format(vacaciones1);
if(dias <= 180){
        if(fecha2Month < 6){
            let dias = diasLaborados(fecha1, fecha2)
            globalThis.primaPrimerSemestre = prima1(dias, salario);
            document.getElementById("Prima1Label").innerText = Prima primer semestre:;
            document.getElementById("Prima1").innerText = new Intl.NumberFormat().format(primaPrimerSemestre);
    
            globalThis.primaSegundoSemestre = prima2(0, salario)
            document.getElementById("Prima2Label").innerText = Prima segundo semestre:;
            document.getElementById("Prima2").innerText = new Intl.NumberFormat().format(primaSegundoSemestre);
        }else{
            let diasP1 = diasLaborados(fecha1, new Date(`06-30-${fecha1Anio}`));
            globalThis.primaPrimerSemestre = prima1(diasP1, salario);
            document.getElementById("Prima1Label").innerText = Prima primer semestre:;
            document.getElementById("Prima1").innerText = new Intl.NumberFormat().format(primaPrimerSemestre);

            let diasP2 = diasLaborados(new Date(`07-01-${fecha1Anio}`), fecha2);
            globalThis.primaSegundoSemestre = prima2(diasP2, salario)
            document.getElementById("Prima2Label").innerText = Prima segundo semestre:;
            document.getElementById("Prima2").innerText = new Intl.NumberFormat().format(primaSegundoSemestre);
        }
    }else{
        let diasP1 = diasLaborados(fecha1, new Date(`06-30-${fecha1Anio}`))
        globalThis.primaPrimerSemestre = prima1(diasP1, salario);
        document.getElementById("Prima1Label").innerText = Prima primer semestre:;
        document.getElementById("Prima1").innerText = new Intl.NumberFormat().format(primaPrimerSemestre);

        let diasP2 = diasLaborados(new Date(`07-01-${fecha1Anio}`), fecha2)
        globalThis.primaSegundoSemestre = prima2(diasP2, salario)
        document.getElementById("Prima2Label").innerText = Prima segundo semestre:;
        document.getElementById("Prima2").innerText = new Intl.NumberFormat().format(primaSegundoSemestre);
    }
    
    let total = (cesantias1 + transporte + interesesCesantias1 + primaPrimerSemestre + primaSegundoSemestre + vacaciones1);
    document.getElementById("TotalLabel").innerText = Total:;
    document.getElementById("Total").innerText = new Intl.NumberFormat().format(total);

    document.getElementById("tablaEmpleador").style.display = 'none';
    document.getElementById("tablaEmpleado").style.display = '';
}

function mesPrima(diasP){
    let mes = 0;
switch(diasP){
    case(diasP < 30):
    mes = 1;
    break;
    case(diasP > 30 && diasP <= 60):
    mes = 2;
    break;
    case(diasP > 60 && diasP <= 90):
    mes = 3;
    break;
    case(diasP > 90 && diasP <= 120):
    mes = 4;
    break;
    case(diasP > 120 && diasP <= 150):
    mes = 5;
    break;
    case(diasP > 150 && diasP <= 180):
    mes = 6;
    break;
}
return mes;   
}


