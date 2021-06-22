fetch("https://rickandmortyapi.com/api/character")
  .then(function (response) {
    return response.json();
  })
  .then(function (json) {
    const tbody = document.querySelector("tbody");
    for (let i in json.results) {
      const name = json.results[i].name;
      const gender = json.results[i].gender;
      const origin = json.results[i].origin.name;
      const avatar = json.results[i].image;
      const row = `
        <tr index="${i}">
          <td>${name}</td>
          <td>${gender}</td>
          <td>${origin}</td>
          <td><img src="${avatar}" alt="character-avatar" class="rounded shadow" width="80" height="80"></img></td>
        </tr>
      `;

      tbody.innerHTML += row;
    }

    // Rows events
    const rows = document.querySelectorAll("tr");
    const cardAvatar = document.getElementById("avatar");
    const cardTitle = document.getElementsByClassName("card-title")[0];
    const cardInfo = document.getElementById("info");

    for (let i = 0; i < rows.length; i++) {
      rows[i].addEventListener("click", function () {
        writeCardInfo(i - 1);
      });
    }

    // Buttons
    var prevButton = document.getElementById("prev");
    var nextButton = document.getElementById("next");

    prevButton.addEventListener("click", function () {
      let prevIndex = cardInfo.getAttribute("index") - 1;
      
      if (prevIndex >= 0) {
        writeCardInfo(prevIndex);
      }
    });

    nextButton.addEventListener("click", function () {
      let nextIndex = parseInt(cardInfo.getAttribute("index"), 10) + 1;

      if (nextIndex < json.results.length) {
        writeCardInfo(nextIndex);
      }
    });

    function writeCardInfo(index) {
      let id = json.results[index].id;
      let name = json.results[index].name;
      let gender = json.results[index].gender;
      let origin = json.results[index].origin.name;
      let status = json.results[index].status;
      let species = json.results[index].species;

      cardInfo.setAttribute("index", index);
      cardAvatar.src = json.results[index].image;
      cardAvatar.classList.remove("d-none");
      cardTitle.textContent = name;
      cardInfo.innerHTML = `
      ID: ${id} <br>
      Género: ${gender} <br>
      Origen: ${origin} <br>
      Status: ${status} <br>
      Especie: ${species}`;
    }
  });
