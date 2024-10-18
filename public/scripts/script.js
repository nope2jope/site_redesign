function changeSection(id) {
  const section = id.split("-")[0].toUpperCase();
  $(`#${id}`).parent().parent().parent().parent().parent().hide();
  $(`#${section}`).show();
}

$(document).ready(()=> {
    $("#well").on("mouseenter", function () {
        $(this).attr("src", "assets/well_sprite_color_animate_2.gif");
      }).on("mouseleave", function () {
        $(this).attr("src", "assets/well_sprite_color_animate_1.png");
      });
      $("#rabbit").on("mouseenter", function () {
        $(this).attr("src", "assets/rabbit_sprite_color_animate_3.gif");
      }).on("mouseleave", function () {
        $(this).attr("src", "assets/rabbit_sprite_color_animate_1.png");
      });
      $("#trowel").on("mouseenter", function () {
        $(this).attr("src", "assets/trowel_sprite_color_animate_1.gif");
      }).on("mouseleave", function () {
        $(this).attr("src", "assets/trowel_sprite_color.png");
      });
      $("#work-link").on("click", function() {
        changeSection($(this).attr("id"))
      });
      $("#about-link").on("click", function() {
        changeSection($(this).attr("id"))
      });
      // $("#depths-link").on("click", function() {
      //   changeSection($(this).attr("id"))
      // });
      $("#landing-link").on("click", function() {
        changeSection($(this).attr("id"))
      });
      
      });