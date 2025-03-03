function changeSection(id) {
  var section = id.split("-")[0].toUpperCase();
  $(`#${section}`).show();
  $(`#${id}`).parent().parent().parent().parent().hide();
}

function confettiCannon() {
  var end = Date.now() + (15 * 1000);
  var confettiColors = ["#f2f3fc", "#fed053"];
  
  (function frame() {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: confettiColors
    });
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: confettiColors
    });
  
    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  }());
}

function lightsOut() {
  $("body").addClass("dark");
  $(".border-div").addClass("dark");
  $("h1").addClass("dark-text");
  $("h2").addClass("dark-text");
  $("h3").addClass("dark-text");
  $("h4").addClass("dark-text");
  $("p").addClass("dark-text");
  $("a").addClass("dark-text");
  $("footer").addClass("dark-nav");
  $("nav").addClass("dark-nav");
  $("#home-link").addClass("dark-nav-text");
  $("#about-link").addClass("dark-nav-text");
  $("#name-link").addClass("dark-nav-text")
  $("#foot-text").addClass("dark-nav-text")
  $("#foot-name-link").css("color", "var(--gray)")

  
}

function lightsOn() {
  $("body").removeClass("dark");
  $(".border-div").removeClass("dark");
  $("h1").removeClass("dark-text");
  $("h2").removeClass("dark-text");
  $("h3").removeClass("dark-text");
  $("h4").removeClass("dark-text");
  $("p").removeClass("dark-text");
  $("a").removeClass("dark-text");
  $("footer").removeClass("dark-nav");
  $("nav").removeClass("dark-nav");
  $("#home-link").removeClass("dark-nav-text");
  $("#about-link").removeClass("dark-nav-text");
  $("#name-link").removeClass("dark-nav-text")
  $("#foot-text").removeClass("dark-nav-text")
  $("#foot-name-link").css("color", "var(--amber)")
}

$(function () {

  var swiper = new Swiper(".works-swiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    centeredSlides: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  $("#zone-depths").on("click", function () {
    setTimeout(confettiCannon, 1300)  })




  $(".body-nav").on("click", function () {
      if (this.childNodes[0]['href'] === "") {
        changeSection(this.id)
      }


});

  $(".modal-open").on("click", function () {
    $(`#${this.id}-modal`).show()
  });

  $(".modal-close").on("click", function () {
    $(".modal").hide()
  });

  $("#depths-landing").on("click", function () {
    lightsOut();
  });

  $("#landing-depths").on("click", function () {
    lightsOn();
  });

  $("#landing-zone").on("click", function () {
    lightsOn();
  });

});