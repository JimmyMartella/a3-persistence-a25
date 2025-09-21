const deleteReview = async function(id){
  await fetch(`/delete`, {
    method: "POST",
    body: JSON.stringify({ id })
  });

  loadReviews();
}

const editReview = async function(){
  await fetch(`/edit`, {
    method: "POST"
  })

  loadReviews();
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

    const deletion = document.createElement("button");
    deletion.className = "delete-button";
    deletion.innerText = "Delete";
    deletion.onclick = () => deleteReview(i.id);
    newReview.appendChild(deletion);

    reviews.appendChild(newReview);
  })
}

window.onload = loadReviews();
