console.log("Linked!");

$(document).ready(function(){
// OOX
// XXO
// XOX
//var size = 3;
var size=3;
makeBoard(size);
$('#scoreBoard').hide();
var player1;
var player2;
var gameOver = false;
var xScore = 0;
var oScore = 0;
var totalTies = 0;
$('#submit').click(function(e) {
  e.preventDefault();
  player1 = $('#player1-name').val();
  player2 = $('#player2-name').val();
  size = parseInt($('#size').val());
  makeBoard(size);
  $('.form-horizontal').hide("slow");
  $('#scoreBoard').show(); 
  clicking();
});

function makeBoard(){
  $('.box').remove();
  var y;
  var x;
  var board = $("<div class='board'></div>");
  if (!size) {
    size = 3;
  }
  for (y=0; y<size; y++){
    for (x=0; x<size; x++){
      var cell = $('<div>&nbsp</div>');//that's a non-breaking space
      var cellId = size * y + x;
      cell.attr('class','box').attr('id',cellId);
      board.append(cell);
    }
  }
  $('.container').append(board);
  $('#scoreBoard').remove();
  $('.board').before("<div id='scoreBoard'></div>")
  $('#xScore').remove();
  $('#oScore').remove();
  $('#ties').remove();
  if (!player1) {
    player1 = "X";
  }
  if (!player2) {
    player2 = "O";
  }
  $('#scoreBoard').append("<p id='xScore'>"+player1+"'s score: "+xScore+"</p>");
  $('#scoreBoard').append("<p id='oScore'>"+player2+"'s score: "+oScore+"</p>");
  $('#scoreBoard').append("<p id='ties'>Total ties: "+totalTies+"</p>");
  $('#scoreBoard').show();
  $('.container').css('width', 230*size + 'px');//works only up to size 24
  clicking();
};

function clicking(){
  var playerX = true;
  var playerO = false;
  $('.box').click(function() {
    if (gameOver === false){
      //console.log($('#'+this.id).text());
      //&nbsp is CharCode 160
      if ($('#'+this.id).text() == String.fromCharCode(160)){ 
        if (playerX) {
          playerX = false;
          playerO = true;
          $('#'+this.id).text("X");
        } else if (playerO) {
          playerX = true;
          playerO = false;
          $('#'+this.id).text("O");
        }
        checkWinner();
      }
    }
  })
}

function checkWinner() {
  var boxId;
  var filledCells = 0;
  for (boxId=0; boxId<size*size; boxId++) {
    // //if row wins
    if (boxId % size === 0) {
      var winningRowCounter = 0;
      for (var i = boxId; i<boxId+size; i++) {
        var startOfRow = $('#'+boxId);
        if (startOfRow.text() === $('#'+i).text() && !($('#'+i).text() === "String.fromCharCode(160)")) {
          winningRowCounter +=1;
          //console.log(winningRowCounter)
        }
      }
      if (winningRowCounter === size) {
        victory(startOfRow.text(), player1, player2);
        return;
      }
    }
    //if column wins
    if (boxId < size) {
      var winningColumnCounter = 0;
      for (var j = boxId; j<size*size; j+=size) {
        var startOfColumn = $('#'+boxId);
        if (startOfColumn.text() === $('#'+j).text() && !($('#'+j).text()==="String.fromCharCode(160)")) {
          winningColumnCounter +=1;
        }
      }
      if (winningColumnCounter === size) {
        victory(startOfColumn.text(), player1, player2);
        //return;
      }
    }
    //if first diagnol wins
    if (boxId === 0) {
      var winningFirstDiagnolCounter = 0;
      for (var k=boxId; k<size*size; k+=(size+1)) {
        if ($('#0').text() === $('#'+k).text() && !($('#'+k).text()==="String.fromCharCode(160)")) {
          winningFirstDiagnolCounter +=1;
        }
      }
      if (winningFirstDiagnolCounter === size) {
        victory($('#0').text(), player1, player2);
        return;
      }
    }
    //if second diagnol wins
    if (boxId === size-1) {
      var winningSecondDiagnolCounter = 0;
      //careful to limit that final box doesn't count in second diagnol
      for (var k=boxId; k<=(size*size-size); k+=(size-1)) {
        if ($('#'+(size-1)).text() === $('#'+k).text() && !($('#'+k).text()==="String.fromCharCode(160)")) {
          winningSecondDiagnolCounter +=1;
        }
      }
      if (winningSecondDiagnolCounter === size) {
        victory($('#'+(size-1)).text(), player1, player2);
        return;
      }
    }
    //check if tie
    if ($('#'+boxId).text()==="X" || $('#'+boxId).text()==="O") {
      filledCells+=1;
      if (filledCells === size*size) {
        victory("tie", player1, player2);
      }
    }
  }
}

function victory(winningLetter, player1, player2) {
  //make modal message
  if (winningLetter === "X") {
    //$('#myModal').modal();
    gameOver = true;
    xScore += 1;
    $('#xScore').html(player1+"'s score: "+xScore);
    $('#xScore').css('color','green');
    //$('#0').before("<button id='newGame'>New Game</button><br>");
    $('#modal').toggle();
    $('.modal-header').append("<h5 id='modalHeaderTitle'>Congratulations!</h5>");
    $('.modal-body').append("<p id='winningMessage'>"+player1+" is the winner!</p>");
    $('.modal-body').append("<button id='newGame'>Play Again?</button>");
    $('#newGame').click(function(){
      $('#modalHeaderTitle').remove();
      $('#winningMessage').remove();
      $('#newGame').remove();
      $('#modal').toggle();
      gameOver = false;
      $('#scoreBoard').remove();
      $('#board').remove();
      makeBoard(size);
    })
  } else if (winningLetter === "O") {
    gameOver = true;
    oScore += 1;
    $('#oScore').html(player2+"'s score: "+oScore);
    $('#oScore').css('color','green');
    $('#modal').toggle();
    $('.modal-header').append("<h5 id='modalHeaderTitle'>Congratulations!</h5>");
    $('.modal-body').append("<p id='winningMessage'>"+player2+" is the winner!</p>");
    $('.modal-body').append("<button id='newGame'>Play Again?</button>");
    $('#newGame').click(function(){
      $('#modalHeaderTitle').remove();
      $('#winningMessage').remove();
      $('#newGame').remove();
      $('#modal').toggle();
      gameOver = false;
      $('#scoreBoard').remove();
      $('#board').remove();
      makeBoard(size);
    });
  } else if (winningLetter === "tie") {
    gameOver = true;
    totalTies += 1;
    $('#ties').html("Total ties: "+totalTies);
    $('#ties').css('color','orange');
    
    
    $('#modal').toggle();
    $('.modal-header').append("<h5 id='modalHeaderTitle'>To be continued...</h5>");
    $('.modal-body').append("<p id='winningMessage'>It's a tie!</p>");
    $('.modal-body').append("<button id='newGame'>Play Again?</button>");
    $('#newGame').click(function(){
      $('#modalHeaderTitle').remove();
      $('#winningMessage').remove();
      $('#newGame').remove();
      $('#modal').toggle();
      gameOver = false;
      $('#scoreBoard').remove();
      $('#board').remove();
      makeBoard(size);
    });
  }
}



//https://thebovinecomedy.files.wordpress.com/2009/07/wargames.jpg

})//end $(document).ready(function(){})
// XXO
// OOX
// X_O