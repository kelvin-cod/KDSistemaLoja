var user = JSON.parse(sessionStorage.user);

$.ajax({
    url: `https://kd-gerenciador.herokuapp.com/listar/caixa/${user.idUsuario}`,
    type: 'GET',
    complete: function (response) {
        console.log(response)
        //   location.reload();
    }

}).then(function (response) {
    console.log(response.body)
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
    console.log(obj)
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