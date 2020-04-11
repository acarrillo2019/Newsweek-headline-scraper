moment().format();

function getDate() {
  var weekday = moment().format("dddd");
  var date = moment().format("DD MMMM YYYY");
  $(".date").text(weekday + ". ");
  $(".time").text(date);
}
getDate();

//scrape new articles
$(".scrape").on("click", function(event) {
  event.preventDefault();
  $.ajax({
    method: "POST",
    url: "/scrape"
  }).then(function() {
    Swal.fire("You have been added 20 new articles!").then(function() {
      location.reload();
    });
  });
});

//save an article

$(".save").on("click", function(event) {
  event.preventDefault();
  var id = $(this).data("id");
  $.ajax({
    method: "POST",
    url: "/article/" + id
  }).then(function() {
    Swal.fire("Added to saved articles!").then(function() {
      location.reload();
    });
  });
});

// clear articles

$(".clear").on("click", function(event) {
  event.preventDefault();
  $.ajax({
    method: "POST",
    url: "/clear"
  }).then(function() {
    Swal.fire("Articles are removed!").then(function() {
      location.reload();
    });
  });
});

//clear saved articles
$(".clear-saved").on("click", function(event) {
  event.preventDefault();
  var id = $(this).data("id");
  $.ajax({
    method: "POST",
    url: "/clear_saved/" + id
  }).then(function(response) {
    if (response === "many") {
      Swal.fire("Articles were removed!").then(function() {
        location.reload();
      });
    } else {
      Swal.fire("An article was removed!").then(function() {
        location.reload();
      });
    }
  });
});

// add new note
$(".add-note").on("click", function(event) {
  event.preventDefault();
  var id = $(this).data("id");
  var note = $(this)
    .closest(".card-body")
    .find("textarea")
    .val()
    .trim();
  $(this)
    .closest(".card-body")
    .find("textarea")
    .val("");
  if (!note) {
    Swal.fire({
      type: "error",
      title: "Oops...",
      text: "Add something to your comment"
    });
  } else {
    $.ajax({
      method: "POST",
      url: "/add_note/" + id,
      data: { id: id, note: note }
    }).then(function(response) {
      $(".chat").append(
        '<li><i class="far fa-comments"></i>' +
          note +
          ' <button class="remove-note btn-sm btn-outline-warning" data-id="' +
          response.noteId +
          '" type="button">X</button><hr></li>'
      );
    });
  }
});

//delete note
$(document).on("click", ".remove-note", function(event) {
  event.preventDefault();
  var noteId = $(this).data("id");
  var articleId = $(this)
    .closest(".collapse")
    .data("id");
  $(this)
    .closest("li")
    .remove();
  $.ajax({
    method: "POST",
    url: "/remove_note",
    data: { noteId: noteId, articleId: articleId }
  }).then(function() {});
});
