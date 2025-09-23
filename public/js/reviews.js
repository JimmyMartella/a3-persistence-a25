const deleteReview = async function(id){
  await fetch(`/delete`, {
    method: "POST",
    body: JSON.stringify({ id })
  });

  loadReviews();
}

const editReview = async function(id){
  const response = await fetch("/reviews");
  const data = await response.json();
  const auditedReview = data.find(i => i.id === id)

  document.querySelector("#blurb") = auditedReview.blurb;
  document.querySelector("#gameplayRating").value = auditedReview.gameplayRating;
  document.querySelector("#storyRating").value = auditedReview.storyRating;
  document.querySelector("#visualsRating").value = auditedReview.visualsRating;
  document.querySelector("#musicRating").value = auditedReview.musicRating;

  const submit = document.querySelector("#submit-edit-button");
  submit.onclick = () => confirmEditReview(id);

  const cancel = document.querySelector("cancel-edit-button");
  submit.onclick = cancelEditReview;
}

const confirmEditReview = async function(id){
  const editedReview = {
    id: id,
    datePosted: datePosted,
    title: title,
    year: year,
    blurb: document.querySelector("blurb"),
    gameplayRating: parseInt(document.querySelector("#gameplayRating").value) || 0,
    storyRating: parseInt(document.querySelector("#storyRating").value) || 0,
    visualsRating: parseInt(document.querySelector("#visualsRating").value) || 0,
    musicRating: parseInt(document.querySelector("#musicRating").value) || 0
  }

  await fetch(`/edit`, {
    method: "POST",
    body: JSON.stringify({ id, editedReview })
  })

  window.location.href = "reviews.html";
}

const cancelEditReview = async function(){
  window.location.hreff = "reviews.html"
}

const loadReviews = async function(){
  const response = await fetch("/reviews");
  const data = await response.json();

  const reviews = document.querySelector("#reviews");
  reviews.innerHTML = "";

  data.forEach(i => {
    const newReview = document.createElement("div");
    newReview.className = "review-card";
    
    const datePosted = document.createElement("div");
    datePosted.className = "timestamp";
    datePosted.innerText = i.datePosted;
    newReview.appendChild(datePosted);

    const title = document.createElement("h3");
    title.innerText = i.title + " (" + i.year + "):";
    newReview.appendChild(title);

    const blurb = document.createElement("p");
    blurb.innerText = "\"" + i.blurb + "\"";
    newReview.appendChild(blurb);

    const scoreTable = document.createElement("table")
    scoreTable.innerHTML = `
                            <thead>
                              <tr>
                                <th>Gameplay:</th>
                                <th>Story:</th>
                                <th>Visuals:</th>
                                <th>Music:</th>
                                <th>Overall:</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <th>${i.gameplayRating}/10</th>
                                <th>${i.storyRating}/10</th>
                                <th>${i.visualsRating}/10</th>
                                <th>${i.musicRating}/10</th>
                                <th>${i.overallRating}/10</th>
                              </tr>
                            </tbody>
                           `;
    newReview.appendChild(scoreTable);

    const edit = document.createElement("button");
    edit.className = "edit-button";
    edit.innerText = "Edit Contents";
    edit.onclick = () => editReview(i.id);
    newReview.appendChild(edit);

    const deletion = document.createElement("button");
    deletion.className = "delete-button";
    deletion.innerText = "Delete";
    deletion.onclick = () => deleteReview(i.id);
    newReview.appendChild(deletion);

    reviews.appendChild(newReview);
  })
}

window.onload = loadReviews();
