const output = document.getElementById("output");
var url = "https://api.hadith.gading.dev/books"

function getListHadits() {
  axios.get(url).then(function (res) {
    let hadits = res.data.data
      .map((h, img) => {
        return `
        <div class="card-hadits">
        <div class="img-hadits">
          <img src="./assets/${h.id}.jpg">
        </div>
        <h2>${h.name}</h2>
        <p>Total Hadith : <b>${h.available}</b></p>
        <a class="btn btn-info w-75" href="/page/${h.id}.html" 
        target="_blank">Read Hadits</a>
        </div>`;
      })
      .join("");

    output.innerHTML = hadits;
  });
}

const outputHadits = document.getElementById("output-hadits")

// Untuk menghapus extension .html
var currentURL = window.location.href;
var fileName = currentURL.split('/').pop();
var fileNameWithoutExtension = fileName.replace(/\.html$/, '')

// Card Hadits
function getHaditsById(){
  axios.get(`${url}/${fileNameWithoutExtension}?range=1-300`)
    .then(function (res){
      var getHadits = res.data.data.hadiths.map((hadits) => {
        return `
        <div class="card mb-2 mt-2">
          <div class="card-header bg-info-subtle">
            <h3 class="card-title">Hadits No : ${hadits.number}</h3>
          </div>
          <div class="card-body">
            <p class="text-end fs-5 card-text">${hadits.arab}</p>
            <p class="arti card-text">${hadits.id}</p>
          </div>
        </div>
        `
      }).join("")

      outputHadits.innerHTML = getHadits
    })
}

// Search Hadits
function btnSearch() {
  const search = document.getElementById('search-hadits').value;
  const title = document.getElementById('hasil-pencarian');
  const output = document.getElementById('output-search')

  axios.get(`${url}/${fileNameWithoutExtension}?range=1-300`)
    .then(function (res){
      var getSearch = res.data.data.hadiths.filter((fill) => {
        return fill.id.toLowerCase().includes(search.toLowerCase());
      });

      if (search.length > 0) {
        title.innerHTML = `Pencarian Hadits : <b>${search}</b>`

        output.innerHTML = getSearch.map((hasil) => {
          return `
            <div class="card m-2">
            <div class="card-header bg-primary-subtle">
              <h3 class="card-title">Hadits No : ${hasil.number}</h3>
            </div>
            <div class="card-body">
              <p class="text-end fs-5 card-text">${hasil.arab}</p>
              <p class="arti card-text">${hasil.id}</p>
            </div>
          </div>
            `
          })
          .join("");

        } else if (search == "") {
          title.innerHTML = "";
          output.innerHTML = ""
      }
    })
}