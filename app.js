document.addEventListener("DOMContentLoaded", async function(){
    try{
        const app = document.querySelector(".app")
        let videoCardsTemplate="",
        scorebatAPI=`https://www.scorebat.com/video-api/v1/`,
        scorebatFetch= fetch(scorebatAPI),
        [scorebatRes] = await Promise.all([scorebatFetch]),
        scorebatData = await scorebatRes.json();
      
        console.log(scorebatRes);
        console.log(scorebatData[0].title);

        //Solo traemos las HightLights que ya incluyen los goles y mejores jugadas del partido
        for (let i = 0; i < scorebatData.length; i++) {
          for (let j = 0; j < scorebatData[i].videos.length; j++)
          {
            if (scorebatData[i].videos[j].title=='Highlights') {
              videoCardsTemplate+=`
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
        app.innerHTML=videoCardsTemplate;
      } catch(err){
       console.log(err);
        let message =err.statusText||"Ocurrió un error";
        $error.innerHTML=`<p>${message}</p>`;
      }
})
