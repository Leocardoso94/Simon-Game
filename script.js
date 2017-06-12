
var wait = true;
var cores = [];
var jogadas = [];
var pontos = 0;
var i = 0;
var strict = false;
var erro = false;

$(document).ready(function() {

  $('#strict').click(function() {
    if (!strict) {
      $('body').css('background-color', '#000');
      $('span').css('color', 'red');
      strict = true;
    } else {
      $('body').css('background-color', '#fff');
      $('span').css('color', '#000');
      strict = false;
    }
  });



  $('#start').click(function() {
    //$('.placar').css('color', '#FF0000');
    ligado = true;
    wait = true;
    cores = [];
    jogadas = [];
    pontos = 0;
    i = 0;
    erro = false;

    setTimeout(function() {
      $('.placar').css('color', '#a20404');
    }, 200);

    setTimeout(function() {
      $('.placar').css('color', '#FF0000');
    }, 400);

    setTimeout(function() {
      $('.placar').css('color', '#a20404');
    }, 600);

    setTimeout(function() {
      $('.placar').css('color', '#FF0000');
    }, 800);
    $('.placar').val('--');
    setTimeout(function() {
      jogar();
    }, 1000);

  });

  $('td').click(function() {
    if (!wait) {
      var pos2 = Number($(this).attr('value'))
      jogadas.push(pos2);

      if (pos2 == 0) {
        $('.red').animate({
          backgroundColor: "red"
        }, 300);
        $('.red').animate({
          backgroundColor: "#880404"
        }, 300);
      }
      if (pos2 == 1) {
        $('.blue').animate({
          backgroundColor: "blue"
        }, 300);
        $('.blue').animate({
          backgroundColor: "#02026d"
        }, 300);
      }
      if (pos2 == 2) {
        $('.green').animate({
          backgroundColor: "green"
        }, 300);
        $('.green').animate({
          backgroundColor: "#034003"
        }, 300);
      }
      if (pos2 == 3) {
        $('.yellow').animate({
          backgroundColor: "yellow"
        }, 300);
        $('.yellow').animate({
          backgroundColor: "#ad8d01"
        }, 300);
      }

      var audioElement = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound' + (pos2 + 1) + '.mp3');

      audioElement.play();
      audioElement.loop = false;

      var is_same = (cores.length == jogadas.length) && cores.every(function(element, index) {
        return element === jogadas[index];
      });
      if (cores[i] == jogadas[i]) {
        if (is_same) {
          wait = true;
          i = 0;
          pontos++;
          jogadas = [];
          $('.placar').val(pontos);
          setTimeout(function() {
            if(pontos == 20){
             $('.placar').val('WIN');
           }else{
            jogar();
          }
        }, 2000);
        }
      } else {
        if (!strict) {
          $('.placar').val('!!');
          wait = true;
          erro = true;
          jogadas = [];

          setTimeout(function() {
            jogar();
          }, 1000);

        } else {

          setTimeout(function() {
            $('#start').click();
          }, 1000);

        }
      }
      i++;

    }
  });

  function jogar() {
    $('.bola').css('cursor', 'wait');
    i = 0;
    if (!erro) {
      var pos = Math.floor((Math.random() * 4) + 0);
      cores.push(pos);
    } else {
      $('.placar').val(pontos);
      erro = false;
    }
    cores.forEach(function myFunction(item, index) {
      setTimeout(function() {
        if (item == 0) {
          $('.red').animate({
            backgroundColor: "red"
          }, 300);
          $('.red').animate({
            backgroundColor: "#880404"
          }, 300);
        }
        if (item == 1) {
          $('.blue').animate({
            backgroundColor: "blue"
          }, 300);
          $('.blue').animate({
            backgroundColor: "#02026d"
          }, 300);
        }
        if (item == 2) {
          $('.green').animate({
            backgroundColor: "green"
          }, 300);
          $('.green').animate({
            backgroundColor: "#034003"
          }, 300);
        }
        if (item == 3) {
          $('.yellow').animate({
            backgroundColor: "yellow"
          }, 300);
          $('.yellow').animate({
            backgroundColor: "#ad8d01"
          }, 300);
        }
        var audioElement = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound' + (item + 1) + '.mp3');

        audioElement.play();
        audioElement.loop = false;

      }, index * 800);
    });
    setTimeout(function() {
      wait = false;
      $('.bola').css('cursor', 'pointer');
    }, (cores.length ) * 800 );
  }

});