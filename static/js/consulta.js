var botaoEnviar = $("#enviar");
$.support.cors = true;

var cnpjMascara = $("#cnpj-input").mask("99.999.999/9999-99");

botaoEnviar.click(function (event) {
    event.preventDefault();
    limpaCliente();
    getByDocument();
});

//GETBYDOC
function getByDocument() {
    $.ajax({
        type: "GET",
        url: "http://ec2-18-217-235-234.us-east-2.compute.amazonaws.com:8080/registrer?document=" + cnpjMascara.val().replace(/[^\d]+/g, ''),
        success: function (ret) {
            $("#tabela").removeClass("invisible");
            montaCliente(ret);
        },
        error: function () {
            $("#tabela").addClass("invisible");
            alert("Erro ao Consultar Cliente!")
        }
    });
};

function montaCliente(ret) {
    var trTabela = $("<tr>").attr("id", "tr-tabela")

    var nome = $("<td>").text(ret.name);
    trTabela.append(nome);

    var email = $("<td>").text(ret.email);
    trTabela.append(email);

    var endereco = $("<td>").text(ret.address);
    trTabela.append(endereco);
    
    var estado = $("<td>").text(ret.state);
    trTabela.append(estado);

    var cep = $("<td>").text(ret.cep).mask("99999-999");
    trTabela.append(cep);

    $("#tabela").find("#tbody").append(trTabela);
};


function limpaCliente(){
    $("#tabela").addClass("invisible");
    $("#tr-tabela").remove();
};