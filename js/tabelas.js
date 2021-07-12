const user = JSON.parse(sessionStorage.user); // pega user do session

function getVendas() {
    $.ajax({
       url: `https://kd-gerenciador.herokuapp.com/vendas/listar/${user.idEmpresa}`,
       // url: `http://localhost:3000/vendas/listar/${user.idEmpresa}`,
        type: 'GET',
        dataType: 'json', // added data type

        success: function (response) {
            var tbHTML = '';
            objCategoria = {};
            let quantidade_total;
            let vet = []
            //  console.log(response)

            $.each(response, function (i, item) {
                if (item.idPedido == item.pedido) {
                    vet.push(item)
                }
                //  console.log(vet)
            });

            $.each(response, function (i, item) {
                let data = new Date(item.data);
                tbHTML +=
                    '<tr class="linha"><td >' + item.Descricao +
                    '</td><td class="desconto">' + parseFloat(item.desconto).toFixed(2) +
                    '</td><td class="quantidade">' + parseInt(item.quantidade) +
                    '</td><td class="valor-calculado">' + parseFloat(item.vTotal).toFixed(2) +
                    '</td><td>' + data.toLocaleDateString() +
                    '</td></tr>';
            });
            $('#tabelaPedido>tbody').html("");
            $('#tabelaPedido>tbody').append(tbHTML);

            somarTotal();
        }
    });
};
$("#buscaData").on("click", () => {

    let data = $("#dataFiltro").val();

    if ($("#dataFiltro").val() == "") {
        alert("Data Incorreta!");
        return;
    } else {

        data = data.split('-').reverse().join('/');

        $("#tabelaPedido >tbody>tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(data) > -1)
        });
        somarTotal();
    }

})

$("#dataFiltro").on("click", () => {
    $("#dataFiltro").val("")
    getVendas();
});

$(document).ready(function () {
    getVendas();
});
/*

            switch (item.tipo) {
                case 1:
                    tbHTML += `</td><td >Dinheiro`
                    break;
                case 2:
                    tbHTML += `</td><td >Cart. Crédito`
                    break;
                case 3:
                    tbHTML += `</td><td >Cart. Crédito`
                    break;
                default:
                    break;
            }

*/


function somarTotal() {
    let valorCalculadoPago = 0;
    let quantProdutos = 0;
    let descontos = 0;

    $('.linha').each(function () {
        if ($(this).css("display") === "none") {
            $(this).remove();
        }
    });

    $(".valor-calculado").each(function () {
        valorCalculadoPago += parseFloat($(this).text());
    });

    $(".quantidade").each(function () {
        quantProdutos += parseInt($(this).text());
    });

    $(".desconto").each(function () {
        descontos += parseFloat($(this).text());
    });

    $("#vTotal").text(valorCalculadoPago.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    }));

    $("#qTotal").text(quantProdutos);

    $("#dTotal").text(descontos.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    }));
};