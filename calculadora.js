// Función para calcular los días laborados
function calcularFechas(fecha1, fecha2){
    let fechaDia1 = fecha1.getDate();
    let fechaAño1 = fecha1.getFullYear();
    let fechaMes1 = fecha1.getMonth();
   
    let fechaDia2 = fecha2.getDate();
    let fechaAño2 = fecha2.getFullYear();
    let fechaMes2 = fecha2.getMonth();
    
    if(fechaAño1 != fechaAño2){
        alert("Las liquidaciones se efectúan año a año, por favor ingrese una fecha de inicio y fin de periodo que corresponda al mismo año calendario.");
        exit();
    }

    let restarAño = fechaAño2 - fechaAño1;
    let restarMes = fechaMes2- fechaMes1;

    if(restarMes < 0){
        alert("No se permite ingresar una fecha inicial mayor a la fecha final.");
        exit();
    }
    let restarDias = fechaDia2 - fechaDia1;
   
    let diasLaborales;
   
    if(fechaDia1 == 31 || fechaDia2 == 31){
        diasLaborales = (restarMes * 30) + restarDias;
    } else {
        diasLaborales = (restarMes * 30) + restarDias + 1;
    }
return diasLaborales;
}

// Función para calcular los días laborados en las primas
function calcularFechas2(fecha1, fecha3){
    let fechaDia1 = fecha1.getDate();
    let fechaAño1 = fecha1.getFullYear();
    let fechaMes1 = fecha1.getMonth();
   
    let fechaDia2 = fecha3.getDate();
    let fechaAño2 = fecha3.getFullYear();
    let fechaMes2 = fecha3.getMonth();
   
    let restarAño = fechaAño2 - fechaAño1;
    let restarMes = fechaMes2- fechaMes1;
    let restarDias = fechaDia2 - fechaDia1;
   
    let diasLaborales;
   
    if(fechaDia1 == 31 || fechaDia2 == 31){
        diasLaborales = (restarMes * 30) + restarDias;
    } else {
        diasLaborales = (restarMes * 30) + restarDias + 1;
    }
return diasLaborales;
}
   
//Cesantias
let cesantias = (dias, salario) => Math.round(dias * salario / 360);

// Intereses sobre cesantias
let interesesCesantias = (dias, cesantias2) => Math.round(cesantias2 * dias * 0.12 / 360);

// Prima primer semestre
function prima1(dias, salario){
    let dias1;
    if(dias <= 180){
        dias1 = dias;
    } else{
        dias1 = 180;
    }
    const Prima1Semestre = Math.round((dias1 * salario) / 360);
    return Prima1Semestre;
}

// Prima segundo semestre
function prima2(dias, salario){
    let dias2; 
    if(dias > 180){
        dias2 = dias - 180;
    } else{
        dias2 = 0;
    }
    const resultadoPrima2 = Math.round((dias2 * salario) / 360);
    return resultadoPrima2;
}

//Vacaciones
let vacaciones = (salario, dias) => Math.round(salario * dias / 720);

// calcular auxilio de transporte
function calcularTransporte(salario){
    if(salario > 2000000){
        transporte = 0;
    } else{
        if(document.getElementById("InputTransporte1").checked){
            transporte = 117172;
        }else if(document.getElementById("InputTransporte2").checked){
            transporte = 0;
        }
    }
    return transporte;
}

// Convertir formato fecha 
function convertirFecha(value){
    let fechaSp = value.split("-");
    let anio = new Date().getFullYear();
    if (fechaSp.length == 3) {
      anio = fechaSp[2];
    }
    let mes = fechaSp[1] - 1;
    let dia = fechaSp[0];
  
    return new Date(dia, mes, anio);
}

// Validar salario ingesado
function validarSalarioIngresado(salario){
    let sInicial = 1000000;
    let sFinal = 10000000;
    if(salario >= sInicial && salario <= sFinal){

    } else{
        alert('El salario debe ser mayor a 1.000.000 y menor a 10.000.000 millones');
        exit();
    }
}

// Funcion para crear calculos y interactuar con el html
function liquidarEmpleado(){
    let input;
    input = document.getElementById("InputFechaInicio");
    const f1 = input.value;
    input = document.getElementById("InputFechaFinal");
    const f2 = input.value;

    const fecha1 = convertirFecha(f1);
    const fecha2 = convertirFecha(f2);

    document.getElementById("Fechas").innerText = `${fecha1.toLocaleDateString()} Hasta ${fecha2.toLocaleDateString()}`;

    let dias = calcularFechas(fecha1, fecha2);
    document.getElementById("Diaslaborados").innerText = `${dias}`;

    input = document.getElementById("InputSalario");
    const salario = Number(input.value);

    validarSalarioIngresado(salario);
    document.getElementById("Salario").innerText = new Intl.NumberFormat().format(salario);
    
    const transporte = calcularTransporte(salario);
    document.getElementById("Transporte").innerText = new Intl.NumberFormat().format(transporte);

    let cesantias2 = cesantias(dias, salario);
    document.getElementById("Cesantias").innerText = new Intl.NumberFormat().format(cesantias2);

    let interesesCesantias2 = interesesCesantias(dias, cesantias2);
    document.getElementById("InteresesCesantias").innerText = new Intl.NumberFormat().format(interesesCesantias2);

    // Calcular primas
    // let fechaAnio1 = new Date(fecha1.getFullYear());
    // let fechaMes2 = fecha2.getMonth();
    // if(dias <= 180){
    //     if(fechaMes2 <= 6){
    //         let dias = calcularFechas(fecha1, fecha2);
    //         globalThis.primaPrimerSemestre = prima1(dias, salario);
    //         document.getElementById("Prima1").innerText = new Intl.NumberFormat().format(primaPrimerSemestre);
    
    //         globalThis.primaSegundoSemestre = prima2(0, salario);
    //         document.getElementById("Prima2").innerText = new Intl.NumberFormat().format(primaSegundoSemestre);
    //     }else{
    //         let fecha3 = new Date(06-30-fechaAnio1);
    //         let diasP = calcularFechas2(fecha1, fecha3);
            
    //         function prima1a(diasP, salario){
    //             resultado = Math.round(salario * diasP) / 360;
    //             return resultado;
    //         }
    //         globalThis.primaPrimerSemestre = prima1a(diasP, salario);
    //         document.getElementById("Prima1").innerText = new Intl.NumberFormat().format(primaPrimerSemestre);

    //         let fecha4 = new Date(07-01-fechaAnio1);
            
    //         var diasP2 = calcularFechas2(fecha2, fecha4);

    //         function prima1b(diasP2, salario){
    //             resultado = Math.round(salario * diasP2) / 360;
    //             return resultado;
    //         }
    //         globalThis.primaSegundoSemestre = prima1b(diasP2, salario);
    //         document.getElementById("Prima2").innerText = new Intl.NumberFormat().format(primaSegundoSemestre);
    //     }
    // }else{
    //     let fecha3 = new Date(06-30-fechaAnio1);
    //         let diasP = calcularFechas2(fecha1, fecha3);
            
    //         function prima1a(diasP, salario){
    //             resultado = Math.round(salario * diasP) / 360;
    //             return resultado;
    //         }
    //         globalThis.primaPrimerSemestre = prima1a(diasP, salario);
    //         document.getElementById("Prima1").innerText = new Intl.NumberFormat().format(primaPrimerSemestre);

    //         let fecha4 = new Date(07-01-fechaAnio1);
            
    //         var diasP2 = calcularFechas2(fecha2, fecha4);

    //         function prima1b(diasP2, salario){
    //             resultado = Math.round(salario * diasP2) / 360;
    //             return resultado;
    //         }
    //         globalThis.primaSegundoSemestre = prima1b(diasP2, salario);
    //         document.getElementById("Prima2").innerText = new Intl.NumberFormat().format(primaSegundoSemestre);
    // }
    
    let primaPrimerSemestre = prima1(dias, salario);
    document.getElementById("Prima1").innerText = new Intl.NumberFormat().format(primaPrimerSemestre);

    let primaSegundoSemestre = prima2(dias, salario)
    document.getElementById("Prima2").innerText = new Intl.NumberFormat().format(primaSegundoSemestre);

    let vacaciones2 = vacaciones(salario, dias);
    document.getElementById("Vacaciones").innerText = new Intl.NumberFormat().format(vacaciones2);

    let total = (cesantias2 + interesesCesantias2 + primaPrimerSemestre + primaSegundoSemestre + vacaciones2);
    document.getElementById("Total").innerText = new Intl.NumberFormat().format(total);

    mostrarTabla1();
} 

//Calculos empleador
// cesantias 
let cesantiasEmpleador = salario => Math.ceil(salario * 0.08333);

// intereses sobre cesantias
let interesesSobreCesantias = cesantiasEmpleado => Math.ceil(cesantiasEmpleado * 0.12);

// primas 
let primas = salario => Math.ceil(salario * 0.083333);

// vacaciones
let vacacionesEmpleado = salario => Math.ceil(salario / 360 * 15);

// caja de compensacion laboral
let cajaCompensacion = salario => Math.ceil(salario * 0.04);

// icbf 
let icbf = salario => Math.ceil(salario * 0.03);

// sena
let sena = salario => Math.ceil(salario * 0.02);

// Dar formato de moneda
function formatoNumero(value) {
    let num = value.toFixed(2)
    let cents = (num - Math.floor(num)).toFixed(2);
    return Math.floor(num).toLocaleString();
}

//Funcion de interaccion 2
function liquidarParaEmpleador(){
    let input;
    input = document.getElementById("InputFechaInicio");
    const f1 = input.value;
    input = document.getElementById("InputFechaFinal");
    const f2 = input.value;

    let fecha1 = convertirFecha(f1);
    let fecha2 = convertirFecha(f2);

    input = document.getElementById("InputSalario");
    const salario = Number(input.value); 

    validarSalarioIngresado(salario);
    document.getElementById("SalarioEmpleador").innerText = new Intl.NumberFormat().format(salario);
    
    const transporte = calcularTransporte(salario);
    document.getElementById("TransporteEmpleador").innerText = new Intl.NumberFormat().format(transporte);

    let cesantiasEmpleado = cesantiasEmpleador(salario);
    document.getElementById("CesantiasEmpleador").innerText = new Intl.NumberFormat().format(cesantiasEmpleado);

    let interesesSCesantias = interesesSobreCesantias(cesantiasEmpleado);
    document.getElementById("InteresesCesantiasEmpleador").innerText = new Intl.NumberFormat().format(interesesSCesantias);

    let primasEmpleado = primas(salario);
    document.getElementById("PrimasEmpleador").innerText = new Intl.NumberFormat().format(primasEmpleado);

    let vacacionesEmpleado1 = vacacionesEmpleado(salario);
    document.getElementById("VacacionesEmpleador").innerText = new Intl.NumberFormat().format(vacacionesEmpleado1);

    let cajaDeCompensacion = cajaCompensacion(salario);
    document.getElementById("CajaCompensacionEmpleador").innerText = new Intl.NumberFormat().format(cajaDeCompensacion);

    let icbf1 = icbf(salario);
    document.getElementById("IcbfEmpleador").innerText = new Intl.NumberFormat().format(icbf1);

    let sena1 = sena(salario);
    document.getElementById("SenaEmpleador").innerText = new Intl.NumberFormat().format(sena1);

    let TotalEmpleador = (salario + transporte + cesantiasEmpleado + interesesSCesantias + primasEmpleado +
    vacacionesEmpleado1 + cajaDeCompensacion + icbf1 + sena1);
    document.getElementById("TotalEmpleador").innerText = new Intl.NumberFormat().format(TotalEmpleador);
    
    mostrarTabla2();
}

// funcion mostrar tabla1 y ocultar tabla2
function mostrarTabla1(){
    document.getElementById("tabla1").style.display = 'block';
    document.getElementById('tabla2').style.display = 'none';
}

// funcion mostrar tabla1 y ocultar tabla1
function mostrarTabla2(){
    document.getElementById("tabla2").style.display = 'block';
    document.getElementById('tabla1').style.display = 'none';
}



