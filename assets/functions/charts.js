// acá tengo el gráfico
// acá tengo el gráfico
export let grafico =[]
    
export const drawChart = (datos, contenedor, titulo) => {
    grafico = new Chart(contenedor, {
        type: 'line',
        data: {
            labels: datos.labels,
            datasets: [{
            label: 'Evolución ' + titulo,
            data: datos.data,
            borderWidth: 0
            }]
        },
        options: {
            scales: {
            y: {
                beginAtZero: false
            }
            }
        }
        
})   
    // return grafico.destroy();
    // console.log(grafico)
    return grafico
}

  


  