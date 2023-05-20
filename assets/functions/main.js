// Importamos todas las funciones de los modulos
import { getData } from "./getdata.js";
import { drawTable } from "./tables.js";
import { grafico, drawChart, drawChartDos } from "./charts.js";
import { formatData } from "./formatData.js";

let comparar = 'No'
const inputIndiceComp = document.getElementById('btncheck1');
const cnvChartUno = document.getElementById('grafico1');
const cnvChartDos = document.getElementById('grafico2');
const cnvChartTres = document.getElementById('grafico3');

const startDate_Input = document.getElementById('inputFechaInicial')
const endDate_Input = document.getElementById('inputFechaFinal')

// le paso las fechas iniciales y finales de la consulta.
startDate_Input.value = "2021-05-05"
endDate_Input.value = "2023-05-20"

// const startDateInput = document.getElementById('inputFechaInicial');
const dataTable = document.getElementById('secc_resultados')
const selector = document.getElementById('selector')
const selectorDos = document.getElementById('selectorDos')

// Variables Globales de fechas
let mmStart =''
let yyyyStart =''
let mmEnd=''
let yyyyEnd=''

function getDates(){
    const startDateValue = new Date(document.getElementById('inputFechaInicial').value);
    const endDateValue= new Date(document.getElementById('inputFechaFinal').value);
    mmStart = (startDateValue.getUTCMonth()+1);
    mmEnd = (endDateValue.getUTCMonth() +1);
    yyyyStart = startDateValue.getUTCFullYear();
    yyyyEnd = endDateValue.getUTCFullYear();
}
   
// const input = document.getElementById('input-buscar')
// const button = document.getElementById('boton-buscar')

const fetchData = async () => {
    const indicador = selector.value;
    const indicadorComparable = selectorDos.value;
    // console.log(indicadorAPI(indicador))
    // necesito generar una función que me muestre el buscador dependiendo del indicador
    try {
        if (comparar === "No"){
            const datos = await getData(indicador, mmStart,yyyyStart,mmEnd, yyyyEnd) // acá estoy ejecutando el API Request
            // drawTable(datos,dataTable) //acá estoy generando los valores de la tabla
            const datosFormateados = formatData(datos) // acá esto leyendo los datos correctos para el gráfico
            drawChart(datosFormateados,cnvChartUno, indicador)
        }else {
            const datos = await getData(indicador, mmStart,yyyyStart,mmEnd, yyyyEnd) // acá estoy ejecutando el API Request
            // drawTable(datos,dataTable) //acá estoy generando los valores de la tabla
            const datosFormateados = formatData(datos) // acá esto leyendo los datos correctos para el gráfico
            const datos2 = await getData(indicadorComparable, mmStart,yyyyStart,mmEnd, yyyyEnd) // acá estoy ejecutando el API Request
            // drawTable(datos2,dataTable) //acá estoy generando los valores de la tabla
            const datosFormateados2 = formatData(datos2) // acá esto leyendo los datos correctos para el gráfico
            drawChartDos(cnvChartUno, datosFormateados,indicador,datosFormateados2,indicadorComparable)
        }
    } catch (error) {
        console.log(error);
    }
}

const cambio = () => {
    // console.log('cambio a ' +selector.value)
    getDates()
    fetchData();
    if (grafico !=null){
        grafico.destroy();
    }
    dataTable.replaceChildren()
}
// button.addEventListener("click",fetchData);
// Acá estoy gatillando el proceso de carga de datos ante un cambio en el selector
selector.addEventListener("change",cambio,false);
selectorDos.addEventListener("change",cambio,false);

startDate_Input.addEventListener("change",cambio)
endDate_Input.addEventListener("change",cambio)

inputIndiceComp.addEventListener("click", ()=>{
    if (comparar === 'No'){ // la propiedad del botón viene por defecto en NO
        comparar = 'Si'
        selectorDos.disabled = false;
    } else{
        comparar = 'No'
        selectorDos.disabled = true;
        selectorDos.value = "Seleccione"
    }
})

