// Importamos todas las funciones de los modulos
import { getData } from "./getdata.js";
import { drawTable } from "./tables.js";
import { grafico, drawChart } from "./charts.js";
import { formatData } from "./formatData.js";

const cnvChartUno = document.getElementById('grafico1');
const cnvChartDos = document.getElementById('grafico2');
const cnvChartTres = document.getElementById('grafico3');

const dataTable = document.getElementById('secc_resultados')
const selector = document.getElementById('selector')

// const input = document.getElementById('input-buscar')
// const button = document.getElementById('boton-buscar')

const fetchData = async () => {
    const indicador = selector.value;
    // console.log(indicadorAPI(indicador))
    // necesito generar una función que me muestre el buscador dependiendo del indicador
    try {
        const datos = await getData(indicador) // acá estoy ejecutando el API Request
        // drawTable(datos.IPCs,dataTable) //acá estoy generando los valores de la tabla
        // const indAPI = indicadorAPI(indicador)
        // console.log(indAPI)
        // drawTable(`datos.${indAPI}`,dataTable) //acá estoy generando los valores de la tabla
        drawTable(datos,dataTable) //acá estoy generando los valores de la tabla
        const datosFormateados = formatData(datos) // acá esto leyendo los datos correctos para el gráfico
        drawChart(datosFormateados,cnvChartUno, indicador)
    } catch (error) {
        console.log(error);
    }
}

const cambio = () => {
    // console.log('cambio a ' +selector.value)
    fetchData();
    if (grafico !=null){
        grafico.destroy();
    }
    dataTable.replaceChildren()
}
const limpiar =() =>{
}

// button.addEventListener("click",fetchData);
// Acá estoy gatillando el proceso de carga de datos ante un cambio en el selector
selector.addEventListener("change",cambio,false);
// Acá estoy limpiando los registros al momento de hacer click en el selector
selector.addEventListener("click", limpiar)