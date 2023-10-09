(function () {
    "use strict";
    let baseApiAddress = "https://manojmagar.be/RESTfulAPI/Taak1/api/";

    let alertEl = document.getElementById("alert");
    let opties = {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "omit"
    };

    function getApi() {
        // de producten van de server opvragen en weergeven dmv de alerter functie
        let url = baseApiAddress + "WerkerProjectget.php";

        // test de api
        fetch(url)
            .then(function (response) {
                console.log(response);
                return response.json();
            })
            .then(function (responseData) {
                // de verwerking van de data
                var list = responseData.data;

                if (list.length > 0) {
                    // er zit minstens 1 item in list, we geven dit ook onmiddelijk weer
                    var tLijst = `<span class="rij btn"><span>Project naam</span><span>Voornaam</span><span>Familienaam</span><span>Specialisatie</span><span>....</span></span>`;
                    for (var i = 0; i < list.length; i++) {
                        tLijst += `<span class="rij"><span>${list[i].naam}</span><span>${list[i].voornaam}</span><span>${list[i].familienaam}</span><span>${list[i].specialisatie}
                        </span><span><button type="button" data-id="${list[i].project_id}" class="btnRemoveProduct">X</button></span></span></span></span></span></span>`;
                    }
                    tLijst += "<br>";

                    alerter(tLijst);
                } else {
                    alerter("Servertijd kon niet opgevraagd worden");
                }

            })
            .catch(function (error) {
                // verwerk de fout
                alertEl.innerHTML = "fout : " + error;
            });
    }

    function getApiProjects() {
        // de producten van de server opvragen en weergeven dmv de alerter functie
        let url = baseApiAddress + "Projectsget.php";

        // test de api
        fetch(url)
            .then(function (response) {
                console.log(response);
                return response.json();
            })
            .then(function (responseData) {
                // de verwerking van de data
                var list = responseData.data;

                if (list.length > 0) {
                    // er zit minstens 1 item in list, we geven dit ook onmiddelijk weer
                    var tLijst = `<span class="rij btn"><span>project id</span><span>project naam</span><span>code</span><span>beschrijving</span><span>....</span></span>`;
                    for (var i = 0; i < list.length; i++) {
                        tLijst += `<span class="rij"><span>${list[i].project_id}</span><span>${list[i].naam}</span><span>${list[i].code}</span><span>${list[i].beschrijving}
                        </span><span><button type="button" data-id="${list[i].project_id}" class="btnRemoveProduct">X</button></span></span></span></span>`;
                    }
                    tLijst += "<br>";

                    alerter(tLijst);
                    const btnRemoveProductButtons = document.querySelectorAll('.btnRemoveProduct');
                    btnRemoveProductButtons.forEach(function (button) {
                    button.addEventListener('click', function () {
                        // Retrieve the data-id attribute value for the clicked button
                        const projectId = this.getAttribute('data-id');
                        deleteProject(projectId);
                    });
                });
                } else {
                    alerter("Servertijd kon niet opgevraagd worden");
                }

            })
            .catch(function (error) {
                // verwerk de fout
                alertEl.innerHTML = "fout : " + error;
            });
    }



    function deleteProject(projectId) {
        let url = baseApiAddress + "Delete.php";
        opties.body = JSON.stringify({
            project_id: projectId,
        })

        fetch(url, opties)
            .then(function (response) {
                return response.json();
            })
            .then(function (responseData) {
                // de verwerking van de data
                const list = responseData.data;

                if (Object.keys(list).length > 0) {
                    // er zit slechts 1 item in de lijst, we geven dit ook onmiddelijk weer
                    alerter("Servertijd : " + list.servertime);
                } else {
                    alerter("Servertijd kon niet opgevraagd worden");
                }

            })
            .catch(function (error) {
                // verwerk de fout
                alerter("<br>API Fout. Probeer later nog eens.<br>(" + error + ")");
            });
    }


    function getApiAdd() {

        let url = baseApiAddress + "WerkerProjectadd.php";

        let voornaam = document.getElementById("naam").value;
        let familienaam = document.getElementById("familienaam").value;
        let specialisatieSelect = document.getElementById("specialisatie");
        let specialisatie = specialisatieSelect.options[specialisatieSelect.selectedIndex].text;

        let projectnaam = document.getElementById("projectnaam").value;
        let code = document.getElementById("code").value;
        let omschrijving = document.getElementById("omschrijving").value;

        if (!voornaam || !familienaam || !specialisatie || !projectnaam || !code || !omschrijving) {
            alert("Velden mogen niet leeg zijn!!");
            return;
        }

        opties.body = JSON.stringify({
            voornaam: voornaam,
            familienaam: familienaam,
            specialisatie: specialisatie,
            naam: projectnaam,
            code: code,
            beschrijving: omschrijving
        });

        fetch(url, opties)
            .then(function (response) {
                return response.json();
            })
    }


    document.getElementById("btnToonMedewerkPerProject").addEventListener("click", function () {
        getApi();
    })

    document.getElementById("btnSubmit").addEventListener("click", function (e) {
        e.preventDefault();
        getApiAdd();
    })

    document.getElementById("btnLijstProjecten").addEventListener("click", function () {
        getApiProjects();
    })

    function alerter(message) {
        alertEl.innerHTML = message;
    }
})();