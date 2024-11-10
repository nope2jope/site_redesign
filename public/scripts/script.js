function changeSection(id) {
  var section = id.split("-")[0].toUpperCase();
  $(`#${section}`).show();
  $(`#${id}`).parent().parent().parent().parent().parent().hide();
}

function lightsOut() {
  $("body").addClass("dark");
  $("h1").addClass("dark");
  $("p").addClass("dark");
  $("a").addClass("dark")
  

}

$(function () {
      $("a").on("click", function() {
        changeSection($(this).attr("id"))
      });

      $("#open-modal").on("click", function() {
        $(".modal").show()
      });

      $(".modal-close").on("click", function() {
        $(".modal").hide()
      })

      $("#depths-landing").on("click", function(){
        lightsOut();
      })
      
      });