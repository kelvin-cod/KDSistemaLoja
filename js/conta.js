try {
    var user = JSON.parse(sessionStorage.user);
    $("#nome").val(user.Nome);
    $("#email").val(user.Email);
    $("#email_recuperacao").val(user.Email_recuperacao);

    if(user.Foto != null){
        $("#image").attr('src', user.Foto);
    }
    getUser()
} catch (error) {
    console.log(error)
}
var gif = '<img width="100" src="https://pa1.narvii.com/6890/f52432aea86cab93504a3e469767a0fdc6caea3cr1-320-240_hq.gif" >';

$("#gif").append(gif);
$("#gif").hide();


function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#image').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}
var result;

function encodeImgtoBase64(element) {
    readURL(element);

    var img = element.files[0];

    var reader = new FileReader();

    reader.onloadend = function () {
        result = reader.result;
    }
    reader.readAsDataURL(img);
};



function getUser() {

    let get_url = "https://kd-gerenciador.herokuapp.com/user/listar/";
    //let get_url = "http://localhost:3000/user/listar/";

    $.ajax({
        url: get_url + user.idUsuario,
        type: 'get'

    }).done(function (response) { //
        let aux = {
            Nome: "",
            Email: "",
            Email_recuperacao: "",
            idUsuario: "",
            Foto: ""
        }

        aux.Nome = response.Nome;
        aux.Email = response.Email;
        aux.Email_recuperacao = response.Email_recuperacao;
        aux.idUsuario = response.idUsuario;
        aux.Foto = response.Foto

        sessionStorage.setItem("user", JSON.stringify(aux));

        $("#password").val(response.Senha);

    }).fail(function (response) {
        console.log(response)
    });
};


var senha = $('#password');
var olho = $("#olho");

olho.mousedown(function () {
    senha.attr("type", "text");
});

olho.mouseup(function () {
    senha.attr("type", "password");
});
// para evitar o problema de arrastar a imagem e a senha continuar exposta, 
//citada pelo nosso amigo nos comentários
$("#olho").mouseout(function () {
    $("#senha").attr("type", "password");
});


/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

$("#atualizar").click(() => {
    let put_url = "https://kd-gerenciador.herokuapp.com/user/update/";
    //let put_url = "http://localhost:3000/user/update/";

    let obj = {
        nome: '',
        email: '',
        password: '',
        email_recuperacao: '',
        foto: ''
    };

    obj.nome = $("#nome").val();
    obj.email = $("#email").val();
    obj.password = $("#password").val();
    obj.email_recuperacao = $("#email_recuperacao").val();
    obj.foto = result;

    if (obj.foto == null) {
        obj.foto = user.Foto
    }
    $("#gif").show();
    $.ajax({
        url: put_url + user.idUsuario,
        type: 'PUT',
        data: obj
    }).done(function (response) { //

        getUser();

        setTimeout(function () {
            document.location.reload();
        }, 600);
        
     

    }).fail(function (response) {
        console.log(response)
    });
});