// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function(event){
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault();

  const review = {
    title: document.querySelector("#title").value,
    year: parseInt(document.querySelector("#year").value) || 0,
    blurb: document.querySelector("#blurb").value,
    gameplayRating: parseInt(document.querySelector("#gameplayRating").value) || 0,
    storyRating: parseInt(document.querySelector("#storyRating").value) || 0,
    visualsRating: parseInt(document.querySelector("#visualsRating").value) || 0,
    musicRating: parseInt(document.querySelector("#musicRating").value) || 0
  }

  const body = JSON.stringify(review)

  const response = await fetch("/submit", {
    method: "POST",
    body
  })

  const data = await response.json();

  if (response.ok){
    window.location.href = "reviews.html";
  } else {
    alert("Error");
  }
}

window.onload = function() {
   const button = document.querySelector("button");
  button.onclick = submit;
}
