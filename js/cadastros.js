var user = JSON.parse(sessionStorage.user);
let tblCaixa;
let caixas ;
$.ajax({
    url: `https://kd-gerenciador.herokuapp.com/user/listar/caixa/${user.idUsuario}`,
    // url: `http://localhost:3000/user/listar/caixa/${user.idUsuario}`,
    type: 'GET'
}).done(function (response) {
    caixas = response;
    tblCaixa = "";
    $.each(response, function (i, item) {
        tblCaixa +=
            `<tr id="tbl_tr_${item.idCaixa}"><td>` + item.nome + '</td>' +
            '<td>' + item.Tipo + '</td>' +
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
        idusuario: 0,
        email: "",
        password: "",
        nome: "",
        tipo: 0
    }
    let post_url = "https://kd-gerenciador.herokuapp.com/create/caixa";
    obj.idusuario = user.idUsuario
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

            //   location.reload();
        }

    }).then(function (response) {
        console.log(response)
    })
})

function editar(id) {
    $("#nome").val($(`#tbl_tr_${id}>td:nth-child(1)`).text());
    // $("#tipo select").val($(`#tbl_tr_${id}>td:nth-child(2)`).text());
    $("select#tipo").val($(`#tbl_tr_${id}>td:nth-child(2)`).text());
console.log(caixas)
    for (let i = 0; i < caixas.length; i++) {
        if (caixas[i].idCaixa == id) {
            $("#email").val(caixas[i].email);
            $("#password").val(caixas[i].Senha);
        }
    }
}