var novaURL = "login.html";

async function isloggedIn() {
    var preview = await "https://i.ibb.co/sPxMfwZ/user-white.jpg";
    var user = {};

    try {
        user = await JSON.parse(sessionStorage.getItem("user"));
        user.Foto = preview;
    } catch (error) {
        console.log(error)
    }

    if (user == null) {
        $(window.document.location).attr('href', novaURL);
    } else {

        $("#usuario_nome").append(user.Nome);
        $(".usuario_nome").append(user.Nome);

        $(".usuario_email").append(user.Email);
        $(".usuario_foto").append(`<img class="img-user" src='https://i.ibb.co/sPxMfwZ/user-white.jpg' alt="user Photo" />`);
      
        let rota = ($(window.document.location).attr('href')).split("/").pop();

        if (user.tipo === 2) {
            if (rota == "vendas") {
                //    console.log(rota)
            } else {
                $(window.document.location).attr('href', "vendas.html");
            }
        }
    }

};

window.onload = isloggedIn();

setTimeout(function () {
    isloggedIn();
}, 500);

$("#logout").click(() => {

    let url = "login.html";

    sessionStorage.removeItem('user');
    $(window.document.location).attr('href', url);
})