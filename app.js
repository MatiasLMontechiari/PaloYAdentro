document.addEventListener("DOMContentLoaded", async function () {
  try {
    const app = document.querySelector(".app")
    let videoCardsTemplate = "",
      scorebatAPI = `https://www.scorebat.com/video-api/v1/`,
      scorebatFetch = fetch(scorebatAPI),
      [scorebatRes] = await Promise.all([scorebatFetch]),
      scorebatData = await scorebatRes.json();

    //Solo traemos las HightLights solo de la Copa America y La Copa del Mundo que ya incluyen los goles y mejores jugadas del partido
    for (let i = 0; i < scorebatData.length; i++) {
      for (let j = 0; j < scorebatData[i].videos.length; j++) {
        
        let buscarCopaAmerica = scorebatData[i].competition.name.indexOf("COPA AMERICA:")
        let buscarCopaDelMundo = scorebatData[i].competition.name.indexOf("WORLD CUP:")

    //Genera las cards con los highlight de la copa america
        if (buscarCopaAmerica !== -1) {
          if (scorebatData[i].videos[j].title == 'Highlights') {
            videoCardsTemplate += `
                <div class="card">
                ${scorebatData[i].videos[j].embed}
                <div class="card-body">
                <h5 class="card-title">${scorebatData[i].title}</h5>
                <p class="card-text">${scorebatData[i].competition.name}</p>
                </div>
                </div>`
          }
        }

    //Genera las cards con los hightlights de la copa del mundo
        if (buscarCopaDelMundo !== -1) {
          if (scorebatData[i].videos[j].title == 'Highlights') {
            videoCardsTemplate += `
                <div class="card">
                ${scorebatData[i].videos[j].embed}
                <div class="card-body">
                <h5 class="card-title">${scorebatData[i].title}</h5>
                <p class="card-text">${scorebatData[i].competition.name}</p>
                </div>
                </div>`
          }
        }
      }
    }
    app.innerHTML = videoCardsTemplate;
  } catch (err) {
    console.log(err);
    let message = err.statusText || "Ocurrió un error";
    $error.innerHTML = `<p>${message}</p>`;
  }
})
