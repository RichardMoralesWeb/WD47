document.querySelector("#mudaLayout").addEventListener("click", function(){
  var mural = document.querySelector(".mural");
  mural.classList.toggle("mural--linhas");

  if (mural.classList.contains("mural--linhas")){
    this.textContent = "blocos";
  } else {
    this.textContent = "linhas";
  }
});

function removeCartao(event) {
  event.preventDefault();
  var cartao = document.querySelector("#cartao_" + this.dataset.ref);

  cartao.classList.add("cartao--some");
  console.log(cartao);
  setTimeout(function(){
    cartao.remove();
  },400);
};

var botoes = document.querySelectorAll(".opcoesDoCartao-remove");

for (var i = 0; i <botoes.length; i++) {
  botoes[i].addEventListener("click", removeCartao);
};

var $novoCartaoSalvar = document.querySelector(".novoCartao-salvar");
$novoCartaoSalvar.addEventListener("click", validaCartao);

function validaCartao (event){

  if(!document.querySelector(".novoCartao-conteudo").value){
    event.preventDefault();
    var $error = document.createElement("span");
    $error.textContent="Digite um valor no campo acima";
    $error.classList.add("error");
    this.parentNode.insertBefore($error, this);
  }
}

$(".novoCartao").submit(function(event) {
  var campoConteudo = $(".novoCartao-conteudo");
    var conteudo = campoConteudo.val().trim();

  if (conteudo) {
    var conteudoTag = $("<p>").addClass("cartao-conteudo").append(conteudo);

    $("<div>").addClass("cartao")
              .append(conteudoTag)
              .prependTo(".mural");
  }
  campoConteudo.val("");
  event.preventDefault();

});

$(".novoCartao").submit(function(event) {

  var campoConteudo = $(".novoCartao-conteudo");
    var conteudo = campoConteudo.val().trim();

  if(conteudo) {

    var botaoRemove = $("<button>").addClass("opcoesDoCartao-remove")
                                   .text("remover")
                                   .clic(removeCartao);

    var opcoes = $("<div>").addClass("opcoesDoCartao")
                           .append(botaoRemove);

    var conteudoTag = $("<p>").addClass("cartao-conteudo")
                  nd(opcoes)
              .append(conteudoTag)
              .preprendTo(".mural");
  }

  campoConteudo.val("")

  event.preventDefault();

});

var contador = $(".cartao").length;
$(".novoCartao").submit(function(event) {

  var campoConteudo = $(".novoCartao-conteudo");
  var conteudo = campoConteudo.val().trim().replace(/\n/g, "<br>");

  if(conteudo){
    contador++;

    var botaoRemove = $ ("<button>").addClass("opcoesDoCartao-remove")
                                    .attr("data-ref", contador)
                                    .text("Remover")
                                    .click(removeCartao);

    var opcoes = $("<div>").addClass("opcoesDoCartao")
                           .append(botaoRemove);

    var conteudoTag = $("<p>").addClass("cartao-conteudo")
                              .append(conteudo);

    $("<div>").attr("id", "cartao_" + contador)
              .addClass("cartao")
              .append(opcoes)
              .append(conteudoTag)
              .preprendTo(".mural");
  }

  campoConteudo.val("");

  event.preventDefault();

});

$("#busca").on("input", function(){
  var busca = $(this).val().trim();

  if(busca.length){
    $(".cartao").hide().filter(function(){
      return $(this).find(".cartao-conteudo")
                    .text()
                    .match(new RegExp(busca, "i"));
    }).show();
  } else {
    $(".cartao").show();
  }
});
