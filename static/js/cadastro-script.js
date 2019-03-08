var botaoEnviar = $("#enviar");
$.support.cors = true;

botaoEnviar.one("click", function (event) {
    event.preventDefault();
    var cliente = montaCliente();
    post(cliente);  
});

//POST
function post(cliente){
    $.ajax({
        type: "POST",
        url: "http://localhost:4567/registrer",
        data: JSON.stringify(cliente),
        success: function(ret){
            console.log(ret)
        },
        error: function(){
            console.log("erro")
        }
    });
};

//GETBYDOC
function getByDocument(){
    var doc = form.find("#cnpj").val();
    $.ajax({
        type: "GET",
        url: "http://localhost:4567/registrer/" + doc,
        success: function(ret){
            console.log(ret);
        },
        error: function(){
            console.log("erro")
        }
    });
};
 
    
//GETALL
function getAll(){
    $.ajax({
        type: "GET",
        url: "http://localhost:4567/registrer",
        success: function(ret){
            console.log(ret)
        },
        error: function(){
            console.log("erro")
        }
    });
};

function montaCliente() {
    var form = $("#info_form")
    var cliente = {
        document: form.find("#cnpj").val(),
        name: form.find("#cliente").val(),
        email: form.find("#email").val(),
        adress: form.find("#endereco").val(),
        state: form.find("#estado").val(),
        cep: form.find("#cep").val()
    }
    return cliente;
};