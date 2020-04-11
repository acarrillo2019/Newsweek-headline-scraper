$(document).ready(() => {

  // Event listener to save article to database
  $(".add-article").on("click", function(event) {
    event.preventDefault();

    // Save the article to the data base
    const article = {
        headline: $(this).attr("data-headline"),
        link: $(this).attr("data-link"),
        summary: $(this).attr("data-summary"),
        imageURL: $(this).attr("data-imageURL"),
        articleDate: $(this).attr("data-articleDate")
    }

    $.ajax({
      method: "POST",
      url: "/saveArticle",
      data: article
    })
    .then ((res) => {
      console.log(res);
      // Display alert informing that the article was saved
      if (res === 'status 200') {
        displayAlert("Article Saved!","green");
      }
      else {
        displayAlert("Article already saved","red");
      }
    })
  })


  // Event listener to delete article
  $(".delete-article").on("click", function(event) {
    event.preventDefault();

    const id = $(this).attr("data-id")
    $.ajax({
      method: "DELETE",
      url: `/article/${id}`
    })
    .then ((data) => {
      console.log("article deleted");
      $(`#${id}`).remove();
      displayAlert("Article Deleted!","green");
    })
  })

  // Event listener to show article notes
  $(".show-note").on("click", function (event) {
    event.preventDefault();

    // Empty the notes from the note section
    $(".modal-body").empty();
    $(".modal-title").text($(this).attr("data-headline"));
    $("#savenote").attr("data-id",$(this).attr("data-id"));

    // Save the article id from note class
    const articleId = $(this).attr("data-id");

    // Now make an ajax call for the notes
    $.ajax({
      method: "GET",
      url: `/notes/${articleId}`
    })
    // With that done, add the note information to the page
    .then(function(data) {
      console.log(`get notes/id: ${JSON.stringify(data)}`);
      let notes = [];
      data.forEach((note) =>{
        // Create the note card
        const n = `<div id="${note._id}" class="card shadow p-3 mb-5 bg-white rounded">`
          + `<div class="card-body">`
          + `<blockquote class="blockquote mb-0">`
          + `<p class="note-body">${note.body}</p>`
          + `<footer class="blockquote-footer">${note.name}<span style="float:right"><i class="far fa-trash-alt delete-note" data-id="${note._id}"></i></span></footer>`
          + `</blockquote></div></div>`

        notes.push(n);
      })
      
      // Display notes in modal
      $(".modal-body").append(notes);

      // Form to enter comment/name
      const addComment = `<form>
          <textarea id="bodyInput" class="form-control-sm shadow p-3 mb-5 bg-white rounded border-0" placeholder="Add comments..." rows="3"></textarea>
          <textarea id="nameInput" class="form-control-sm shadow p-3 mb-5 bg-white rounded border-0" placeholder="Your name"></textarea>
        </form>`

      // Display form in modal
      $(".modal-body").append(addComment);
    });
  });

  // Event listener to save the note
  $(document).on("click", "#savenote", function() {
    // Grab the id associated with the article from the submit button
    var articleId = $(this).attr("data-id");

    // Save note
    $.ajax({
      method: "POST",
      url: "/note",
      data: {
        name: $("#nameInput").val(),
        body: $("#bodyInput").val(),
        article: articleId
      }
    })
      // With that done
      .then(function(data) {
        // Log the response
        console.log(data);
        displayAlert("Note Saved!","green");
        // Empty the notes section
        $("#modal-body").empty();
      });

    // Also, remove the values entered in the input and textarea for note entry
    $("#nameInput").val("");
    $("#bodyInput").val("");
  });

// Event listener to delete note
$(document).on("click", ".delete-note", function(event) {
  event.preventDefault();

  const id = $(this).attr("data-id");
  $.ajax({
    method: "DELETE",
    url: `/note/${id}`
  })
  .then ((data) => {
    console.log("note deleted");
    $(`#${id}`).remove();
    displayAlert("Note Deleted!","green");
  })
})

  // Set alert position
  // Find scrolling distance from top, set alert positon so that it appears in the window
  $(window).scroll(function(){
    $('.alert').css({"top": $(window).scrollTop() + 200});
  })

  // Event listener to close alert
  $('.close').click(function() {
    closeAlert();
  })

  function displayAlert(msg,msgColor) {
    $("#alert-msg").text(msg);
    $(".alert").css({"background-color":msgColor});
    $(".alert").show();
    setTimeout(closeAlert,2000); // Display alert for 2 seconds
  }

  function closeAlert(){$('.alert').hide();}
})