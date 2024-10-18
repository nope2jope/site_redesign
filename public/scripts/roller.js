const diceQueue = [4, 6, 8, 10, 12, 20];

const diceCount = {
  4: 0,
  6: 0,
  8: 0,
  10: 0,
  12: 0,
  20: 0,
};

const diceRolls = {
  4: [],
  6: [],
  8: [],
  10: [],
  12: [],
  20: [],
};

const diceSums = {
  4: 0,
  6: 0,
  8: 0,
  10: 0,
  12: 0,
  20: 0,
};

var toRoll = 0;

var currentSelection = 5;

function resetTemplates() {
  toRoll = 0;

  for (let x in diceCount) {
    diceCount[x] = 0;
  }

  for (let y in diceRolls) {
    diceRolls[y] = [];
  }

  for (let z in diceSums) {
    diceSums[z] = 0;
  }

  $("#d4-counter").attr("src", `/assets/app_roller/num0.png`);
  $("#d6-counter").attr("src", `/assets/app_roller/num0.png`);
  $("#d8-counter").attr("src", `/assets/app_roller/num0.png`);
  $("#d10-counter").attr("src", `/assets/app_roller/num0.png`);
  $("#d12-counter").attr("src", `/assets/app_roller/num0.png`);
  $("#d20-counter").attr("src", `/assets/app_roller/num0.png`);

};

function playSound(x) {
  switch (x) {
    case "click":
      var audio = new Audio('/assets/app_roller/sounds/click-sound.wav');
      audio.play();
      break;
    case "single":
      var audio = new Audio('/assets/app_roller/sounds/single-roll.mp3');
      audio.play();
      break;
    case "multi":
      var audio = new Audio('/assets/app_roller/sounds/multi-roll.wav');
      audio.play();
  }
};

function scrollLeft() {
  if (currentSelection === 0) {
    currentSelection = 5;
  } else {
    currentSelection--;
  }
};

function scrollRight() {
  if (currentSelection === 5) {
    currentSelection = 0;
  } else {
    currentSelection++;
  }
};

function changeDie(x) {
  $("#dice-name").attr("src", `/assets/app_roller/name${x}.png`)
  $("#dice-choice").attr("src", `/assets/app_roller/d${x}sprite.png`)
};

function animateButton(x) {
  playSound("click");
  switch (x) {
    case "plus":
      $("#plus-button").attr("src", `/assets/app_roller/buttonplus2_pressed.png`);
      setTimeout(() => {
        $("#plus-button").attr("src", `/assets/app_roller/buttonplus2.png`);
      }, 100);
      break;

    case "minus":
      $("#minus-button").attr("src", `/assets/app_roller/buttonminus2_pressed.png`);
      setTimeout(() => {
        $("#minus-button").attr("src", `/assets/app_roller/buttonminus2.png`);
      }, 100);
      break;

  }
};

function animateCount(x, y) {
  $(`#d${y}-counter`).attr("src", `/assets/app_roller/num${x}.png`);
  $(`#d${y}-counter`).addClass("shake");
  setTimeout(() => {
    $(`#d${y}-counter`).removeClass("shake");
  }, 100)
};

function rollDice(dice_val, num) {
  const arr = [];
  for (var i = 0; i < num; i++) {
    var roll = Math.floor(Math.random() * dice_val) + 1;
    arr.push(roll);
  }
  return arr;
};

function generateDivs(r, x) {
  let c = 0;
  const d = $(`<div id="generated-div${c}"><img src="/assets/app_roller/val${x}.png" alt=""></div>`);
  $(r).append(d);
  d.addClass("counted");
  d.addClass("shake");

};

$(document).ready(() => {

  const btnLeftArrow = $("#left-arrow");
  const btnRightArrow = $("#right-arrow");
  const btnMinus = $("#minus-button");
  const btnPlus = $("#plus-button");
  const btnRoll = $("#roll-button");
  const btnX = $("#x-button");
  const btnRefresh = $("#refresh-button");


  btnRoll.on("mouseenter", function () {
    $(this).attr("src", "/assets/app_roller/buttonroll1.gif");
  }).on("mouseleave", function () {
    $(this).attr("src", "/assets/app_roller/buttonroll1static.png");
  });
  ;

  btnRoll.on("click", () => {
    // confirms there are results to display 
    if (toRoll > 0) {
      if (toRoll === 1) {
        playSound("single")
      } else {
        playSound("multi")
      };

      // rolls dice quantities and assigns vales to result object
      for (let key in diceCount) {
        if (diceCount[key] > 0) {
          diceRolls[key] = rollDice(parseInt(key), parseInt(diceCount[key]))
        }
      };

      // updates screen
      $("#input-screen").hide();
      $("#result-screen").show();

      var keys = Object.keys(diceRolls);
      let delay = 0;

      // iterates through each dice (e.g. d4,d6,d8) and animates dice results
      keys.forEach(key => {
        $(`#d${key}-counted`).empty();
        diceRolls[key].forEach(value => {
          setTimeout(() => {
            generateDivs(`#d${key}-counted`, value);
          }, delay);
          // resets animation delay
          delay += 750;
        });
      });
    }
  });

  btnMinus.on("click", () => {
    animateButton("minus");

    if (diceCount[diceQueue[currentSelection]] > 0) {
      toRoll--;
      diceCount[diceQueue[currentSelection]]--;
      animateCount(diceCount[diceQueue[currentSelection]], diceQueue[currentSelection])
    }
  });

  btnPlus.on("click", () => {
    animateButton("plus");
    if (diceCount[diceQueue[currentSelection]] < 9) {
      toRoll++;
      diceCount[diceQueue[currentSelection]]++;
      animateCount(diceCount[diceQueue[currentSelection]], diceQueue[currentSelection])
    }
  });

  btnLeftArrow.on("click", () => {
    playSound("click");
    scrollLeft();
    changeDie(diceQueue[currentSelection])
  });

  btnRightArrow.on("click", () => {
    playSound("click");
    scrollRight();
    changeDie(diceQueue[currentSelection]);
  });

  btnX.on("click", () => {
    resetTemplates();
  });

  btnRefresh.on("click", () => {

    resetTemplates();
    // update screen
    $("#result-screen").hide();
    $("#input-screen").show();
  });

});
