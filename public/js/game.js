let colors = ["green", "red", "yellow", "blue"];
let started = 0;
let pattern = [];
let level = 0;
let i = 0;
let f = 0;

$(document).keypress(function (event) {
  if (!started) {
    new_level();
    started = 1;
  }
});

$(".btn").click(function () {
  if (f) {
    if ($(this).attr("id") == pattern[i]) {
      $(this).fadeOut(100).fadeIn(100);
      playSound($(this).attr("id"));
      i++;
      if (i == pattern.length) {
        setTimeout(new_level, 1000);
      }
    } else {
      $("#level-title").text("Game Over, Press Any Key to Restart");
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
      reset();
    }
  }
});

function randomGenerator() {
  let x = Math.floor(Math.random() * 4);
  return x;
}
function new_level() {
  pattern.push(colors[randomGenerator()]);
  i = 0;
  level++;
  $("#level-title").text("Level " + level);
  setTimeout(function () {
    pattern.forEach(function (item, index) {
      setTimeout(function () {
        $("#" + item)
          .fadeOut(100)
          .fadeIn(100);
        playSound(item);
      }, (500 - 10 * level) * (index + 1));
    });
  }, 20);
  f = 1;
}

function playSound(item) {
  let audio = new Audio("../sounds/" + item + ".mp3");
  audio.play();
}

function reset() {
  i = 0;
  level = 0;
  pattern = [];
  started = 0;
}
