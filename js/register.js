var gif = '<img width="100" src="https://pa1.narvii.com/6890/f52432aea86cab93504a3e469767a0fdc6caea3cr1-320-240_hq.gif" >';

$("#gif").append(gif);
$("#gif").hide();
/*=======================================================================================*/


$("#submit").click(function () {
    var obj = {
        nome: '',
        email: '',
        password: '',
        email_recuperacao: ''
    };

    obj.nome = $("#nome").val();
    obj.email = $("#email").val();
    obj.password = $("#password").val();
    obj.email_recuperacao = $("#email_recuperacao").val();

    // var post_url = "http://localhost:3000/user/upload/image";

    // let img_url = "https://api.imgbb.com/1/upload?key=cc6802445a8fe48713fbbf176fa47179";

    let post_url = "https://kd-gerenciador.herokuapp.com/user/create";
    $("#gif").show();
    $.ajax({
        url: post_url,
        type: 'POST',
        data: obj
    }).done(function (response) { //
        var teste44 = $("#email").val();

        window.location.href = "login.html";

    }).fail(function (response) {
        console.log(response)

    });;
});
