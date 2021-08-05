let ctx2 = document.getElementById('myChart');
let ctx3 = document.getElementById('myChart3');
let user = JSON.parse(sessionStorage.user);
const monName = new Array("janeiro", "fevereiro", "março", "abril", "maio", "junho", "agosto", "outubro", "novembro", "dezembro")
const now = new Date;
const get_produtos_url = `https://kd-gerenciador.herokuapp.com/painel/produtos/${user.idEmpresa}`;
let vetorDados = [];
let vetorBarra = [];

$.ajax({
    url: get_produtos_url,
    type: 'GET'
}).then(function (response) { //
    let somarProdutos = 0;

    $.each(response, function (i, d) {
        somarProdutos += d.Quantidade;
        vetorDados.push(d.Quantidade);
        vetorBarra.push(d.Categoria.toLowerCase());
    });

    //exbir a soma dos produtos
    // console.log(vetorBarra, vetorDados)
    barCharts(vetorBarra, vetorDados)

    //gerar o grafico com os dados

}).catch(function (err) {
    console.error(err)
});
//--------------------------------------------------------------------------------------------------------
//const get_vendas_total_url = `https://kd-gerenciador.herokuapp.com/painel/vendas/total/${user.idEmpresa}`;
const get_vendas_total_url = `http://localhost:3000/painel/vendas/total/${user.idEmpresa}`;
$.ajax({
    url: get_vendas_total_url,
    type: 'GET'
}).then(function (response) { //
    let somarTotalVendas = 0;
    let vetorDia = [];
    let vetorBarra = [];
    let vetorMes = [];

    let mes = now.getMonth() + 1;
    console.log(response)

    $.each(response, function (i, d) {
        let dat = new Date(d.data);
      
        if (dat.getMonth() + 1 === mes) {

            let dia = String(dat.getDate()).padStart(2, '0');

            somarTotalVendas += parseFloat(d.Total);

            vetorDia.push(dia);
            vetorBarra.push(d.Quantidade);
            vetorMes.push(monName[dat.getMonth() + 1]);
        }

    });


    console.log(vetorBarra, vetorDia, vetorMes)
    lineCharts(vetorBarra, vetorDia);
}).catch(function (err) {
    console.error(err)
});

function barCharts(x, y) {
    let myChart2 = new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: x,
            datasets: [{
                label: 'Produtos',
                data: y,
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function lineCharts(x, y) {

    let data = {
        labels: y,
        datasets: [{
            label: 'Vendas',
            data: x,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    }

    let myChart3 = new Chart(ctx3, {
        type: 'line',
        data: data
    });
}

function PieCharts(x,y) {  


    
}