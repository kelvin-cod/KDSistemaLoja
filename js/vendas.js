    var Produtos = [];
    var Comanda = {
        idComanda: 0,
        idProduto: 0,
        Descricao: "",
        Obs: "",
        Desconto: 0,
        Valor_venda: 0,
        Quantidade: 0,
        SubTotal: 0
    };
    var quantidade = 0;
    var soma = 0;
    var valor = 0;
    var idProduto = 0;
    var Pedidos = [];
    var Quantidade_total = 0;
    var Total = 0;
    now = new Date;
    var trHTML = '';

    var Venda = {
        idUsuario: 0,
        idCliente: 0,
        data_venda: '',
        desconto: 0,
        pedido_venda: 0,
        total_venda: 0,
        cliente_venda: '',
        tipo_venda: '',
        troco_venda: 0,
        idEmpresa: 0,
        Pedidos: []
    }
    var user = JSON.parse(sessionStorage.user);
    async function getDate() {
        hoje = await new Date();
        yr = hoje.getFullYear();
        mt = hoje.getMonth() + 1;
        dy = hoje.getDate();

        if (dy < 10) {
            dy = "0" + dy
        }
        if (mt < 10) {
            mt = "0" + mt
        }
        return dy + "-" + mt + "-" + yr;
    }
    getDate().then(resp => {

        $("#Data").text(resp);
    });
    var gif = '<img width="100" src="https://pa1.narvii.com/6890/f52432aea86cab93504a3e469767a0fdc6caea3cr1-320-240_hq.gif" >';

    $("#gif").append(gif);
    $("#gif").hide();
    /************************************************************************************************************************* */
    Array.prototype.duplicates = function () {
        return this.filter(function (x, y, k) {
            return y !== k.lastIndexOf(x);
        });
    } // remover duplicatas
    let mes = now.getMonth() + 1 // arrumar bug de mes

    $("#Data_vendas").val(now.getDate() + "/" + mes + "/" + now.getFullYear());
    /*
        $.ajax({
            url: 'https://kd-gerenciador.herokuapp.com/vendas/ultimo',
            // url: 'http://localhost:3000/produtos/listar',
            type: 'GET',
            dataType: 'json', // added data type

            success: function (response) {
                let aux = parseInt(response[0].ultimo) + 1;
                $("#Numero_pedido").val(aux);
            }
        });
    */
    $.ajax({
        url: 'https://kd-gerenciador.herokuapp.com/produtos/listar',
        type: 'GET',
        dataType: 'json', // added data type
    }).done(function (response) { //
        let vet_categoria = [];
        // let selectbox = $('#Produto_vendas');
        var selectbox2 = $('#Valor_vendas');
        var selectbox3 = $('#Adicional_vendas');
        //selectbox.find('option').remove();
        response = response.sort(function compare(a, b) {
            if (a.Descricao < b.Descricao) return -1;
            if (a.Descricao > b.Descricao) return 1;
            return 0;
        })
        //  console.log(response)
        Produtos = response; //popula array de produtos
        $.each(response, function (i, d) {
            vet_categoria.push(d.categoria)
        });
        const novoArray = [...new Set(vet_categoria)]; //remove categorias repetidas

        var $optgroup; // cria as o grupo de opçoes

        $.each(novoArray, function (i, optgroups) { // para cada valor no vetor joga em um grupo

            $optgroup = $('<optgroup>', {
                label: novoArray[i],
                id: i
            });

            $optgroup.appendTo('#Produto_vendas'); // atribuui
            $.each(response, function (j, d) {
                if (d.categoria == novoArray[i]) {
                    $(`<option valor="${d.Valor_Venda}">`).val(d.idProduto).text(d.Descricao).appendTo($optgroup);
                }
                if (d.Descricao == "Ovo") {
                    $('<option>').val(d.idProduto).text(d.Descricao).appendTo(selectbox3);
                }

                $('<option>').val(d.idProduto).text(d.Valor_Venda).appendTo(selectbox2);
            });
        });

        $.each(response, function (i, d) {

            if (d.Descricao == "Ovo") {
                $('<option>').val(d.idProduto).text(d.Descricao).appendTo(selectbox3);
            }


        });
    });


    /**----------------------------------------------------------------------------------------------------- */

    $('#Produto_vendas').change(function () {
        idProduto = ($(this).val());

        $("#Valor_vendas").val($(this).val());
        $("#imgProduto").html("")
        $("#imgProduto").append(`  <img class="previewProd" src="" alt="">`)
        //
        //
        quantidade = parseFloat($("#Quantidade_vendas").val());
        valor = parseFloat($("#Valor_vendas :selected").text());

        soma = (quantidade * valor).toFixed(2);
        if (isNaN(soma)) {
            soma = 0
        }
        $("#Subtotal_vendas").val(soma);
        $(".sub_total").val(soma);
        var selected = $("option:selected", this);

        if (selected.parent()[0].label == "Lanche") {
            $(".adicional").css("display", "block");
        }

    });

    /**----------------------------------------------------------------------------------------------------- */
    $("#fecharBalcao").click(() => {
        localStorage.removeItem("venda");
        $(window.document.location).attr('href', "index.html");
    })

    /**----------------------------------------------------------------------------------------------------- */
    $('#Quantidade_vendas').change(function () {

        quantidade = $("#Quantidade_vendas").val();
        valor = parseFloat($("#Valor_vendas :selected").text());
        soma = (quantidade * valor).toFixed(2);
        if (isNaN(soma)) {
            soma = 0
        }
        $("#Subtotal_vendas").val(soma);
    });
    /**----------------------------------------------------------------------------------------------------- */
    let cont = 0;

    $('#Add_item').click(function () {

        if ($('#Produto_vendas  :selected').text() == "") {
            return alert("Selecione um Item");
        }

        Comanda.idComanda = cont;

        cont++;

        Comanda.idProduto = parseInt(idProduto);
        Comanda.Descricao = $('#Produto_vendas :selected').text();
        Comanda.Obs = $('#Obs_vendas').val();
        Comanda.Valor_venda = valor;
        Comanda.Quantidade = parseInt(quantidade);
        Comanda.Desconto = parseFloat($('#Desconto_vendas').val().replace(",", "."));


        if (isNaN(Comanda.Desconto)) {
            Comanda.Desconto = 0
        } else if (Comanda.Desconto > 0) {
            soma = soma - Comanda.Desconto
        }

        Comanda.SubTotal = soma
        Pedidos.push(Comanda);

        Venda.Pedidos.push(Comanda);
        localStorage.setItem("venda", Venda)

        Total += parseFloat(soma)
        Quantidade_total += parseInt(quantidade);

        salvar(Comanda);
        Comanda = new Object();

        console.log(Pedidos);

        $('#Produto_vendas').val("");
        $('#Quantidade_vendas').val(1);
        $("#Valor_vendas").val("");
        $("#Subtotal_vendas").val("");
        $("#Obs_vendas").val("");
        $("#Total_vendas").val(Total.toFixed(2));
        $("#Quantidade_total").val(Quantidade_total);
        $('#Desconto_vendas').val(0);
        $('#imgProduto').html("");

        atualizaValor()
    });
    /**----------------------------------------------------------------------------------------------------- */
    function salvar(item) {

        if (isNaN(item.Desconto)) {
            item.Desconto = 0
        }

        trHTML =
            '<tr id="tbl_tr_' + item.idComanda + '"><td>' + item.Quantidade +
            '</td><td>' + item.Descricao +
            '</td><td class="descontos-calculado">' + item.Desconto.toFixed(2) +
            '</td><td id="tbl_subtotal_' + item.idProduto + '" class="valor-calculado font-weight-bold">' + parseFloat(item.SubTotal).toFixed(2) +
            '</td><td> ' +
            '<div class="table-data-feature">' +
            /*
            '<p class="item btn" data-toggle="tooltip" onclick="editar(' + item.idProduto + ')" ' +
            ' data-placement="top" title="Edit" id="bEdit" >' +
            */
            '<p class="item btn" data-toggle="tooltip" onclick="editar(' + item.idComanda + ', ' + item.idProduto + ') " ' +
            'data-placement="top" title="Edit"  >' +
            '<i class="zmdi zmdi-edit"></i></p>' +
            '</div></td>' +
            '</tr>';

        return $('#TabelaComanda').append(trHTML);
    }
    /*
    <p class="item btn" id="bElim" data-toggle="tooltip" ' +
            ' data-placement="top" title="Delete" onclick="excluir( ' + item.idComanda + ', ' + item.idProduto + ');rowElim(this);">' +
            '<i class="zmdi zmdi-delete"></i>' +
            '</p> 
    
    */
    /**----------------------------------------------------------------------------------------------------- */
    /**----------------------------------------------------------------------------------------------------- */

    function editar(id, idProduto) {
        $("div.id100 select").val(idProduto);
        $("#Quantidade_vendas").val($(`#tbl_tr_${id}>td:nth-child(1)`).text());
        $("#Valor_vendas :selected").attr("disabled", false);
        $("#Desconto_vendas").val($(`#tbl_tr_${id}>td:nth-child(3)`).text());

        let aux = ($("#Quantidade_vendas").val() * parseFloat($("#Produto_vendas :selected").attr("valor"))) - parseFloat($("#Desconto_vendas").val())
        $("#Subtotal_vendas").val(aux.toFixed(2));
        $("#Valor_vendas :selected").attr("disabled", true);

        //  $("div#Valor_vendas select").val(idProduto);
        //  $("#Produto_vendas option:selected").val(idProduto);

        //   $(`.id100 option[value=${idProduto}]`).attr('selected','selected');


        //- $(`#Produto_vendas option:contains(${idProduto})`).attr('selected', true);

        $("#Add_item").attr("hidden", true);
        $("#btnAtualizar").attr("hidden", false);

        $("#btnAtualizar").html("");
        $("#btnAtualizar").append(`
        <div class="row">
            <div class="form-group col-6 text-center ">
                <button type="button" class="btn btn-success  w-100" onclick="atualizaProduto(${id})">
                    <i class="fas fa-check"></i>
                    Atualizar Produto
                </button>
            </div>
            <div class="form-group col-6 text-center ">
                <button type="button" class="btn btn-danger  w-100 " onclick="excluir(${id} + ', ' + 
                ${idProduto})" >
                    <i class="fas fa-times"></i>
                Excluir
                </button>
            </div>
        </div>`)
        //   #tbl_tr_0 > 
    }
    /**----------------------------------------------------------------------------------------------------- */
    function atualizaProduto(id) {

        let desconto = $("#Desconto_vendas").val();
        if (desconto = 0) {
            desconto = 0
        } else {
            desconto = desconto.toFixed(2);
        }
        $(`#tbl_tr_${id}>td:nth-child(1)`).text($("#Quantidade_vendas").val());
        $(`#tbl_tr_${id}>td:nth-child(2)`).text($('#Produto_vendas  :selected').text());
        $(`#tbl_tr_${id}>td:nth-child(3)`).text($("#Desconto_vendas").val());
        $(`#tbl_tr_${id}>td:nth-child(4)`).text($("#Subtotal_vendas").val());

        for (let i = 0; i < Pedidos.length; i++) {
            if (i == id) {
                Pedidos[i].Quantidade = parseInt($("#Quantidade_vendas").val());
                Pedidos[i].SubTotal = parseFloat($("#Subtotal_vendas").val());
                Pedidos[i].Desconto = parseFloat($("#Desconto_vendas").val());
                Pedidos[i].Valor_venda = parseFloat($("#Valor_vendas").val());
                Pedidos[i].Descricao = $('#Produto_vendas  :selected').text();
                Pedidos[i].idProduto = parseInt($('#Produto_vendas  :selected').val());
            }
        }

        // console.log(Pedidos)


        $('#Produto_vendas').val("");
        $('#Quantidade_vendas').val(1);
        $("#Valor_vendas").val("");
        $("#Subtotal_vendas").val("");
        $("#Obs_vendas").val("");
        //$("#Total_vendas").val(Total.toFixed(2));
        $("#Quantidade_total").val(Quantidade_total);
        $('#Desconto_vendas').val(0);
        $('#imgProduto').html("");

        $("#btnAtualizar").attr("hidden", true);
        $("#Add_item").attr("hidden", false);
        atualizaValor();
    };

    function excluir(id, id_linha) {
        let quantidade_Coluna = parseInt($(`#tbl_${id}`).text());
        let subtotal_Coluna = parseFloat($(`#tbl_subtotal_${id_linha}`).text());

        for (let i = 0; i < Pedidos.length; i++) {

            if (Pedidos[i].idComanda == parseInt(id)) {

                //retira da quantidade total o valor excluido
                Quantidade_total -= quantidade_Coluna;

                //retira do total o valor excluido
                Total -= subtotal_Coluna;

                // remove do vetor o item excluido
                Pedidos.splice(i, 1);
                Venda.Pedidos.splice(i, 1);
                console.log(Pedidos)
                // console.log(Pedidos)
                //atribui os novos valores


                if (isNaN(Total)) {
                    Total = 0
                };
                $(`#tbl_tr_${id}`).remove();
                atualizaValor();
                $('#Produto_vendas').val("");
                $('#Quantidade_vendas').val(1);
                $("#Valor_vendas").val("");
                $("#Subtotal_vendas").val("");
                $("#Obs_vendas").val("");
                //   $("#Total_vendas").val(Total.toFixed(2));
                $("#Quantidade_total").val(Quantidade_total);
                $('#Desconto_vendas').val(0);
                $('#imgProduto').html("");

                $("#btnAtualizar").attr("hidden", true);
                $("#Add_item").attr("hidden", false);
                $('#myTableRow').remove();
            }

        }
    }
    /**----------------------------------------------------------------------------------------------------- */
    //Função para desconto de vendas


    $("#Desconto_vendas").change(() => {
        let valor = parseFloat($("#Desconto_vendas").val());
        let precoUni = $("#Produto_vendas :selected").attr("valor");
        // let valor_total = $("#Valor_vendas :selected").text(); //$("#Total_vendas2").val().replace('R$', '').replace(",", ".");
        let desconto = 0;
        let quant = $("#Quantidade_vendas").val();

        desconto = (precoUni * quant) - valor;
        Venda.desconto = desconto;

        $("#Subtotal_vendas").val(desconto.toFixed(2));

        if (valor < 0 || isNaN(valor)) {
            $("#Desconto_vendas").val(0)
            return alert("Desconto Inválido")
        } else {

            $("#desconto_vendas").val(parseFloat($("#Desconto_vendas").val()).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            }))


            return $("#Total_vendas").val(desconto.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            }));
        }
    })

    $("#Total_vendas3").focus(() => {
        let aux = parseFloat($("#Total_vendas").val().replace('R$', '')).toFixed(2)
        $("#Total_vendas").val(aux)
    });

    $("#Total_vendas2").keyup(() => {
        let aux = parseFloat($("#Total_vendas").val().replace('R$', '')).toFixed(2)

        setTimeout($("#Total_vendas").val(aux.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })), 3000)
    });
    /**----------------------------------------------------------------------------------------------------- */
    $("#Concluir_vendas").click(() => {
        //  let cliente = $("#Nome_cliente option:selected").val();
        //    Venda.cliente_venda = $("#Nome_cliente option:selected").text();

        $('#gif').hide();


        if (Pedidos.length == 0) {
            return alert("Ação inválida!!");
        } else {

            let numeroPedido = parseFloat($("#Numero_pedido").val());
            let var_name = $("input[name='exampleRadios']:checked").val();
            let user = JSON.parse(sessionStorage.getItem("user"));
            let total_venda = $("#Total_vendas").val();

            Venda.idUsuario = user.idUsuario;
            Venda.idEmpresa = user.idEmpresa;
            Venda.cliente_venda = "AO CONSUMIDOR";
            Venda.data_venda = $("#Data_vendas").val();
            // Venda.tipo_venda = var_name;
            //   Venda.pedido_venda = numeroPedido + 1;
            //   Venda.total_venda = parseFloat(total_venda);
            // console.log(Venda)
            $('#Modal').modal('show');
        }
    });
    /**----------------------------------------------------------------------------------------------------- */
    $("#modal-btn-sim").click(() => {
        $('#gif').show();
        const post_url = "https://kd-gerenciador.herokuapp.com/vendas/concluir";
        // const post_url = "http://localhost:3000/vendas/concluir";
        $("#confirmar").hide();


        $.ajax({
            url: post_url,
            type: 'POST',
            data: Venda,
            dataType: 'json'

        }).done(function (response) {
            location.reload();
        }).fail(function (response) {
            alert(response)

        });
    });


    /**----------------------------------------------------------------- */
    $("#Pagamento").change(() => {
        if ($("#Pagamento option:selected").val() == 1) {
            $("#Total_vendas").attr("disabled", false) //bg-white 
        }
    })

    function finalizarValor() {

        if ($('#Pagamento  :selected').text() == "") {
            return alert("Selecione um Pagamento");
        }

        let troco = 0;
        let pagamento = 0;
        troco = parseFloat($("#Total_vendas").val().replace('R$', '').replace(',', '.')) - (parseFloat($("#subTotalFinal").val().replace('R$', '').replace(',', '.')) - parseFloat($("#desconto_vendas").val().replace('R$', '').replace(',', '.')));
        Venda.troco_venda = troco;
        Venda.tipo_venda = parseInt($('#Pagamento  :selected').val());

        $("#troco_vendas").val(troco.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        }));

        if (troco == 0) {
            pagamento = parseFloat($("#Total_vendas").val().replace('R$', '').replace(',', '.'))
            Venda.total_venda = pagamento;

            $("#pagamentos_vendas").val(pagamento.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            }));

            $("#total_pagar_vendas").val(pagamento.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            }));
        } else {
            pagamento = parseFloat($("#Total_vendas").val().replace('R$', '').replace(',', '.'))
            Venda.total_venda = pagamento;

            $("#troco_vendas").val(troco.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            }));

            $("#pagamentos_vendas").val(parseFloat($("#Total_vendas").val()).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            }));

            $("#total_pagar_vendas").val(parseFloat($("#Total_vendas").val()).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            }));
        }



        $("#Concluir_vendas").attr("disabled", false);

    };

    function atualizaValor() {

        let valorCalculado = 0;

        $(".valor-calculado").each(function () {
            valorCalculado += parseFloat($(this).text());
        });
        //  console.log(valorCalculado)
        $(".total-calculado").val(valorCalculado.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        }));
        valorCalculado = 0;
        /*

        toLocaleString("pt-BR", {

                    style: "currency",
                    currency: "BRL"
                }));
        */
    };


    $('#FinalizarVenda').on("click", () => {



        $('#FinalizarVendaDiv').hide()
        $('#MostrarVendaDiv').attr("hidden", false);
        // $('#MostrarVendaDiv').show()
        let valorCalculado = 0;
        let descontoCalculado = 0;
        $(".valor-calculado").each(function () {
            valorCalculado += parseFloat($(this).text());
        });

        $(".descontos-calculado").each(function () {
            descontoCalculado += parseFloat($(this).text());
        });

        valorCalculado = valorCalculado + descontoCalculado;

        $("#subTotalFinal").val(valorCalculado.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        }));

        $('#TabelaComanda2').html("");
        $('#TabelaComanda2').append($("#TabelaComanda").html());
        $('#TabelaComanda').html("");


    });

    $('#cancelarVenda').on("click", () => {

        $('#MostrarVendaDiv').attr("hidden", true);
        $('#FinalizarVendaDiv').show()
        $('#TabelaComanda').html("");
        $('#TabelaComanda').append($("#TabelaComanda2").html());
        $('#TabelaComanda2').html("");
        // $('#MostrarVendaDiv').show()
    });