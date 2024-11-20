function changeSection(id) {
  var section = id.split("-")[0].toUpperCase();
  $(`#${section}`).show();
  $(`#${id}`).parent().parent().parent().parent().hide();
}

function lightsOut() {
  $("body").addClass("dark");
  $("h1").addClass("dark");
  $("p").addClass("dark");
  $("a").addClass("dark");
}

$(function () {

  var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    centeredSlides: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  $(".body-nav").on("click", function () {
    changeSection(this.id)
  });

  $(".modal-open").on("click", function () {
    $(`#${this.id}modal`).show()
  });

  $(".modal-close").on("click", function () {
    $(".modal").hide()
  });

  $("#depths-landing").on("click", function () {
    lightsOut();
  });

});