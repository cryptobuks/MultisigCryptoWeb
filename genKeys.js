
const $ = require("jquery");
const domready = require("domready");
const funcLib = require("./generateFunctions.js")



var choiceArray =[]
var phraseNum=12
var thirdKeyInfo=[]


domready(function () {


$( ".coinPick" ).click(function() {
  $( "#selectCoin" ).fadeOut()
  choiceArray.push(this.id)
  setTimeout(function(){  $("#pdfOrMem").fadeIn() }, 500)
})


//use array and .phr function to update phrase lenght
  $(".phrButton").click(function() {
      let id=$(this).attr("id")
      let num =parseInt(id.replace("phr", ""))
      $(`#phr`+phraseNum).removeClass("btn-success")
      $(`#phr`+phraseNum).addClass("btn-dark")
      phraseNum=num;
      $(`#phr`+phraseNum).removeClass("btn-dark")
      $(`#phr`+phraseNum).addClass("btn-success")
  });

//Hanldes the mem gen
$("#genphrase").click(function() {
    $( "#pdfOrMem" ).fadeOut()
    setTimeout(function(){  $("#genJustmem").fadeIn() }, 500)
    let memonicStuff=funcLib.genMenmonic(phraseNum,choiceArray[0])
    $(".memphrase").html(memonicStuff[0])
    $(".xpub").html(memonicStuff[1])
    funcLib.addQrCodeToPage('qrmemoniccode',memonicStuff[0])
    funcLib.addQrCodeToPage('canvas',memonicStuff[1])
})

$("#genpPDF").click(function() {
    $( "#pdfOrMem" ).fadeOut()
    setTimeout(function(){  $("#generatepdf").fadeIn() }, 500)
    thirdKeyInfo=funcLib.genMenmonic(phraseNum,choiceArray[0])
})

$("#makeMultiSigPdf").click(function() {
  $(this).attr("disabled","disabled")
  let numberOfAdresses=$('#numOfAdresses').val()
  //test stuff
  $('#1stXpub').val("xpub6ESrUEbUAZ2dtXxoFqGjgS5pde3hyUoeLNYvz2Q2b2eMHrGVwLrCAu39kMTNn6nNEHpz5B59Ae6pEVg2YPTdHk9MLUkuwGium9kUDj6uoVn")
  $('#2ndXpub').val("xpub6EhD7PPnFCFUPXXY43Cxd9M7mgn4sewJ5yuDQ32Yn1h28rvEZkvH6zaoZ3HeLYtDDdvNwSfS6cYP5ypMAhLsa672mX9nP555bjBefQ5PahR")

  let pubKeyArray=[$('#1stXpub').val(),$('#2ndXpub').val(),"xpub6EYuazUxjau1KQEWygQZ18h7wiifQ8czPo3vdFPPr63GExw5EEMdyGbftTFcJiwavgRi8pokaqYWndas2jYzfgYJ5iazsy888Wom2KQ3Dhx"]
  let multiSigAdress=funcLib.createAddressArray(pubKeyArray,numberOfAdresses,choiceArray[0])
  funcLib.createPDF(multiSigAdress,thirdKeyInfo[0],pubKeyArray)
  $(this).removeAttr("disabled");   
})



});






