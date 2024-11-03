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
  "T": 0
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

function sumDice(sum_template, roll_template) {
  let a = sum_template;
  let total = 0;
  for (key in roll_template) {
    a[key] = roll_template[key].reduce((partialSum, a) => partialSum + a, 0)
    total += a[key]
  }

  a["T"] = total.toString();
  return a;
}

function generateDivs(r, x, s) {
  let c = s;
  const d = $(`<div id="generated-div${c}"><img src="/assets/app_roller/val${x}.png" alt=""></div>`);
  $(r).append(d);
  d.addClass("counted");
  d.addClass("shake");

};

$(function () {

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

      // changes screen
      $("#input-screen").hide();
      $("#result-screen").show();

      // iterates through each dice (e.g. d4,d6,d8) and animates dice results
      var keys = Object.keys(diceRolls);
      let delay = 0;
      let step = 0;
      let divCount = 0;

      keys.forEach(key => {
        $(`#d${key}-counted`).empty();
        diceRolls[key].forEach(value => {
          step++
          setTimeout(() => {
            divCount++
            generateDivs(`#d${key}-counted`, value, divCount);
          }, delay);
          // resets animation delay
          delay += 750;
        });

      });

      // update sum total for display according to length of int (converted to string)
      var sums = sumDice(diceSums, diceRolls);

      if (sums["T"].slice(0, 1)) {
        $("#column-total-digit-0").attr("src", `/assets/app_roller/val${sums["T"].slice(0, 1)}.png`).show();

      }
      if (sums["T"].slice(1, 2)) {
        $("#column-total-digit-1").attr("src", `/assets/app_roller/val${sums["T"].slice(1, 2)}.png`).show();
      }
      if (sums["T"].slice(2, 3)) {
        $("#column-total-digit-2").attr("src", `/assets/app_roller/val${sums["T"].slice(2, 3)}.png`).show();
      }

      // displays sum totals
      setTimeout(() => { $("#total-sprite").show(); }, (step * 750) + 500)
      setTimeout(() => { $("#total-sum-calculated").show(); }, (step * 750) + 1500)

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
    $("#column-total-digit-0").attr("src", ``);
    $("#column-total-digit-1").attr("src", ``);
    $("#column-total-digit-2").attr("src", ``);
    $("#result-screen").hide();
    $("#total-sprite").hide();
    $("#total-sum-calculated").hide();
    $("#column-total-digit-2").hide()
    $("#input-screen").show();
  });

});
