const numDivs = 36;
const maxHits = 10;
const minHits = -10;

let hits = 0;
//let missHits = 0;
let firstHitTime = 0;

function round() {
  // FIXME: надо бы убрать "target" прежде чем искать новый - сделали

  $('.target').removeClass('target').text('');
  $('.miss').removeClass('miss').text('');
  //$('.noTarget').removeClass('noTarget')
  
  $("#lose-message").addClass("d-none");
  $("#win-message").addClass("d-none");
  $('.game-field').show();

  let divSelector = randomDivId();
  console.log(divSelector);
  $(divSelector).addClass("target");
  //$('.game-field').not("target").addClass('noTarget');
  //$('.game-field').not(function() {
  //return $(this).hasClass("target");
  //}).addClass('noTarget');
  $(divSelector).text(hits + 1);
  // TODO: помечать target текущим номером - сделали

  // FIXME: тут надо определять при первом клике firstHitTime - определили
  //if (hits === 1) { 
    //firstHitTime = getTimestamp();
  //}
  if (hits === maxHits) {
    endGameWin();
  }
  if (hits === minHits) {
    endGameLose();
  }
  if (hits > -10 && hits < 10) {
    $("#button-start").hide();
  }
  console.log(hits);
}

function endGameWin() {
  // FIXME: спрятать игровое поле сначала - сделали
  $('.game-field').hide();
  $("#button-start").hide();
  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  console.log(totalPlayedSeconds);
  $("#total-time-played").text(totalPlayedSeconds);

  $("#win-message").removeClass("d-none");
}

function endGameLose() {
  // FIXME: спрятать игровое поле сначала - сделали
  $('.game-field').hide();

  $("#button-start").hide();

  let totalPlayedMillisLose = getTimestamp() - firstHitTime;
  let totalPlayedSecondsLose = Number(totalPlayedMillisLose / 1000).toPrecision(3);
  console.log(totalPlayedSecondsLose);
  $("#total-time-played-lose").text(totalPlayedSecondsLose);

  $("#lose-message").removeClass("d-none");
}

function handleClick(event) {
  // FIXME: убирать текст со старых таргетов. Кажется есть .text? - сделали
  let target = $(event.target);
  
  if (target.hasClass("target")) {
    hits = hits + 1;
    
    round();
  }
  // TODO: как-то отмечать если мы промахнулись? См CSS класс .miss - класс добавлен, 
  // но работает подсветка красным только если не начинать новый раунд автоматически
  else  {
    
    $(target).removeClass('target').addClass('miss');
    hits = hits - 1;
    round();
  }
}
//console.log(divSelector);
function init() {
  // TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке - сделали
  //$("#button-start").click(round);
  $("#button-start").click(function() {
    round();
    firstHitTime = getTimestamp();
    $(".game-field").click(handleClick);
    $("#button-reload").click(function() {
    location.reload();
  });
  });
}

$(document).ready(init);
