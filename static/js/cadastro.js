var botaoEnviar = $("#enviar");
$.support.cors = true;
$(document).ready(function(){
    $('.sidenav').sidenav();
  });


$(function() {
    validaEmail();
});

var erro = false; 

$(document).ready(function () {
    $('select').formSelect();
});


function validaEmail(){
    $("#email-input").blur(function(){
        if (!($(this).val().indexOf("@") > -1) || !($(this).val().indexOf(".com") > -1)){
            $(this).addClass("input-field-error");    
            erro = true;              
        }
        else{
            $(this).toggleClass("input-field-error");  
            erro = false;   
        }
    });
}

var cepMascara = $("#cep-input").mask("99999-999");
var cnpjMascara = $("#cnpj-input").mask("99.999.999/9999-99");

botaoEnviar.on("click", function (event) {  
    if(erro == true){
        $(this).attr("disable");
        alert("Algum valor inválido!")
    }else{
        event.preventDefault();  
        var cliente = montaCliente(cepMascara, cnpjMascara);
        post(cliente);
    }   
});

//POST
function post(cliente) {
    $.ajax({
        type: "POST",
        url: "http://localhost:4567/registrer",
        data: JSON.stringify(cliente),
        success: function (ret) {
            alert("Cliente Cadastrado com Sucesso!")
        },
        error: function () {
            alert("Erro ao Cadastrar o Cliente!")
        }
    });
};

//GETBYDOC
function getByDocument() {
    var doc = form.find("#cnpj").val();
    $.ajax({
        type: "GET",
        url: "http://localhost:4567/registrer/" + doc,
        success: function (ret) {
            console.log(ret);
        },
        error: function () {
            console.log("erro")
        }
    });
};


//GETALL
function getAll() {
    $.ajax({
        type: "GET",
        url: "http://localhost:4567/registrer",
        success: function (ret) {
            console.log(ret)
        },
        error: function () {
            console.log("erro")
        }
    });
};

function montaCliente(cep, cnpj) {
    var cliente = {
        document: cnpj.val().replace(/[^\d]+/g,''),
        name: $("#nome-input").val(),
        email: $("#email-input").val(),
        address: $("#endereco-input").val(),
        state: $("#estado-input").val(),
        cep: cep.val().replace(/[^\d]+/g,'')
    }
    console.log(cliente);
    
    return cliente;
};