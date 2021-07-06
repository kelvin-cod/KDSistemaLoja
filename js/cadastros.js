var user = JSON.parse(sessionStorage.user);
let tblCaixa;
let caixas;

$.ajax({
    url: `https://kd-gerenciador.herokuapp.com/user/listar/caixa/${user.idUsuario}`,
    // url: `http://localhost:3000/user/listar/caixa/${user.idUsuario}`,
    type: 'GET'
}).done(function (response) {
    caixas = response;
    tblCaixa = "";
    let tipo = "";
    $.each(response, function (i, item) {

        if (item.Tipo == 1) {
            tipo = "Administrador";
        } else {
            tipo = "Normal";
        }
        tblCaixa +=
            `<tr id="tbl_tr_${item.idCaixa}"><td>` + item.nome + '</td>' +
            `<td tipo="${item.Tipo}">` + tipo + '</td>' +
            '<td>' +
            '<div class="table-data-feature">' +
            `<p class="item btn" data-toggle="tooltip" onclick="editar(${ item.idCaixa})" 
            data-placement="top" title="Edit">
            <i class="zmdi zmdi-edit"></i></p>
            </div></td></tr>`;
        //   location.reload();

    });

    $('#tabelaCaixa').append(tblCaixa);
    tblCaixa = "";

});

$("#enviar").on("click", () => {
    let obj = {
        idUsuario: 0,
        email: "",
        password: "",
        nome: "",
        tipo: 0
    }
    let post_url = "https://kd-gerenciador.herokuapp.com/user/create/caixa";
    // let post_url = "http://localhost:3000/user/create/caixa";
    obj.idUsuario = user.idUsuario;
    obj.email = $("#email").val();
    obj.password = $("#password").val();
    obj.nome = $("#nome").val();
    obj.tipo = parseInt($("#tipo :selected").val());

    $.ajax({
        url: post_url,
        type: 'POST',
        data: obj,
        dataType: 'json',
        complete: function () {

            location.reload();
        }

    }).then(function (response) {
        console.log(response)
    })
})

function editar(id) {
    $("#nome").val($(`#tbl_tr_${id}>td:nth-child(1)`).text());
    // $("#tipo select").val($(`#tbl_tr_${id}>td:nth-child(2)`).text());
    $("select#tipo").val($(`#tbl_tr_${id}>td:nth-child(2)`).attr("tipo"));
    for (let i = 0; i < caixas.length; i++) {
        if (caixas[i].idCaixa == id) {
            $("#email").val(caixas[i].email);
            $("#password").val(caixas[i].Senha);
        }
    }

    $("#botoes").html("");
    $("#botoes").append(` <button type="button" class="btn btn-danger  col-5  col-md-2 col-sm-6"  onclick="excluir(${id})">
    <i class="fas fa-trash"></i> Excluir </button>
  <button type="button" class="btn btn-success offset-md-2 col-5 col-md-2 col-sm-6 font-weight-bold"
   onclick="atualizar(${id})">
    <i class="fas fa-check"></i>
    Atualizar
  </button>`);
};

function atualizar(id) {
    let obj = {
        email: "",
        password: "",
        nome: "",
        tipo: 0
    };

    obj.email = $("#email").val();
    obj.password = $("#password").val();
    obj.nome = $("#nome").val();
    obj.tipo = parseInt($("#tipo :selected").val());

    $.ajax({
        url: `https://kd-gerenciador.herokuapp.com/user/update/caixa/${id}`,
        type: 'PUT',
        data: obj,
        dataType: 'json'


    }).done(function (response) {

        console.log(response)
        location.reload();
    })
};

function excluir(id) {
    $.ajax({
        url: `https://kd-gerenciador.herokuapp.com/user/delete/caixa/${id}`,
        type: 'POST'
    }).then(function (response) {
        location.reload();
    });

};

window.onload = $("#logo").hide();