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
                    var tLijst = `<span class="rij btn"><span>Project naam</span><span>Voornaam</span><span>Familienaam</span><span>Specialisatie</span></span>`;
                    for (var i = 0; i < list.length; i++) {
                        tLijst += `<span class="rij"><span>${list[i].naam}</span><span>${list[i].voornaam}</span><span>${list[i].familienaam}</span><span>${list[i].specialisatie}
                        </span></span></span></span></span></span>`;
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

    function getApiMedewerker(){
        let url = baseApiAddress + "Medewerkerget.php";

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
                    var tLijst = `<span class="rij btn"><span>Id</span><span>Voornaam</span><span>Familienaam</span><span>Specialisatie</span></span>`;
                    for (var i = 0; i < list.length; i++) {
                        tLijst += `<span class="rij"><span>${list[i].medewerker_id}</span><span>${list[i].voornaam}</span><span>${list[i].familienaam}</span><span>${list[i].specialisatie}
                        </span></span></span></span></span></span>`;
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

    // Code uit les2 voorbeeld oefening
    function getApiProjects() {
        // de producten van de server opvragen en weergeven dmv de alerter functie
        let url = baseApiAddress + "Projectsget.php";

        // test de api
        fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (responseData) {
                // de verwerking van de data
                let list = responseData.data;

                if (list.length > 0) {
                    // er zit minstens 1 item in list, we geven dit ook onmiddelijk weer
                    var tLijst = `<span class="rij btn"><span>project id</span><span>project naam</span><span>code</span><span>beschrijving</span><span>Actions</span><span>....</span></span>`;
                    for (var i = 0; i < list.length; i++) {
                        tLijst += `<span class="rij">
                            <span>${list[i].project_id}</span>
                            <span class="editable">${list[i].naam}</span>
                            <span class="editable">${list[i].code}</span>
                            <span class="editable">${list[i].beschrijving}</span>
                            <span>
                                <button type="button" class="btnEdit">Edit</button>
                                <button type="button" class="btnSave" style="display:none;">Save</button>
                            </span>
                            <button type="button" data-id="${list[i].project_id}" class="btnRemoveProduct">X</button>
                        </span>`;
                    }
                    tLijst += "<br>";
                    alerter(tLijst);

                    editHandlers(list);

                    document.addEventListener("click", function (event) {
                        if (event.target.classList.contains("btnRemoveProduct")) {
                            const projectId = event.target.getAttribute("data-id");
                            deleteProject(projectId);
                        }
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


    // Chatgpt gebruikt voor het hulp
    function editHandlers(list) {
        const editButtons = document.querySelectorAll('.btnEdit');
        const saveButtons = document.querySelectorAll('.btnSave');
    
        editButtons.forEach((button, index) => {
            button.addEventListener('click', function () {
                const row = button.closest('.rij');
                const editFields = row.querySelectorAll('.editable');
                
                editFields.forEach(field => {
                    field.contentEditable = 'true';
                });
                
                button.style.display = 'none';
                saveButtons[index].style.display = 'block';
            });
        });
    
        saveButtons.forEach((button, index) => {
            button.addEventListener('click', function () {
                const row = button.closest('.rij');
                const editFields = row.querySelectorAll('.editable');
                
                const updatedNaam = editFields[0].innerText;
                const updatedCode = editFields[1].innerText;
                const updatedBeschrijving = editFields[2].innerText;
                const projectId = list[index].project_id;
    
                updateProject(updatedNaam, updatedCode, updatedBeschrijving, projectId);
    
                editFields.forEach(field => {
                    field.contentEditable = 'false';
                });
    
                button.style.display = 'none';
                editButtons[index].style.display = 'block';
            });
        });
    }
    

    function updateProject(updatedNaam, updatedCode, updatedBeschrijving, projectId) {
        // Construct the URL and data for the update request
        let url = baseApiAddress + "UpdateProject.php";
        opties.body = JSON.stringify({
            naam: updatedNaam,
            code: updatedCode,
            beschrijving: updatedBeschrijving,
            project_id: projectId
        });
        fetch(url, opties)
            .then(function (response) {
                if (response.ok) {
                    console.log("Value updated successfully.");
                } else {
                    console.error("Failed to update value.");
                }
            })
            .catch(function (error) {
                console.error("Network error: " + error);
            });
    }


    function deleteProject(projectId) {
        let url = baseApiAddress + "Delete.php";

        opties.body = JSON.stringify({
            project_id: projectId
        });

        fetch(url, opties)
        .then(function (response) {
            if (response.status === 200) {
                // HTTP status 200 indicates a successful deletion
                alerter("Project with ID " + projectId + " deleted successfully");
            } else {
                // Any other HTTP status indicates a failure
                alerter("Deletion of project with ID " + projectId + " failed");
            }
        })
        .catch(function (error) {
            // Handle errors
            alerter("API Error. Please try again later. (" + error + ")");
        });
    }

    //add medewerkers
    function getApiAddMedewerkers() {
        let url = baseApiAddress + "WerkerProjectadd.php";

        let voornaam = document.getElementById("naam").value;
        let familienaam = document.getElementById("familienaam").value;
        let specialisatieSelect = document.getElementById("specialisatie");
        let specialisatie = specialisatieSelect.options[specialisatieSelect.selectedIndex].text;

        if (!voornaam || !familienaam || !specialisatie) {
            alert("Velden mogen niet leeg zijn!!");
            return;
        }
        opties.body = JSON.stringify({
            voornaam: voornaam,
            familienaam: familienaam,
            specialisatie: specialisatie,
        });

        fetch(url, opties)
            .then(function (response) {
                return response.json();
            })
    }

    // add projects
    function getApiAddProjects() {
        let url = baseApiAddress + "Projectsadd.php";

        let projectnaam = document.getElementById("projectnaam").value;
        let code = document.getElementById("code").value;
        let omschrijving = document.getElementById("omschrijving").value;

        if (!projectnaam || !code || !omschrijving) {
            alert("Velden mogen niet leeg zijn!!");
            return;
        }

        opties.body = JSON.stringify({
            naam: projectnaam,
            code: code,
            beschrijving: omschrijving
        });

        fetch(url, opties)
            .then(function (response) {
                return response.json();
            })
    }



    function toewijznMedeProject() {
        let url = baseApiAddress + "ToewijzenMedeProject.php"

        let werkerId = document.getElementById("mede_id").value;
        let projectId = document.getElementById("pr_id").value;

        opties.body = JSON.stringify({
            medewerker_id: werkerId,
            project_id: projectId

        });

        fetch(url, opties)
            .then(function (response) {
                return response.json();
            })
            .then(function (responseData) {
                if (responseData.status == "ok") {
                    alerter("Werker toegewijzen naar de project");
                } else {
                    alerter("Gefaald om werkers toe te wijzen naar een project");
                }
            })
            .catch(function (error) {
                alerter("API Error. Please try again later. (" + error + ")");
            });
    }


    function VerwijderMedeProject() {
        let url = baseApiAddress + "VerwijderMedeProject.php"

        let werkerId = document.getElementById("mede_id").value;
        let projectId = document.getElementById("pr_id").value;

        opties.body = JSON.stringify({
            medewerker_id: werkerId,
            project_id: projectId

        });

        fetch(url, opties)
            .then(function (response) {
                return response.json();
            })
            .then(function (responseData) {
                if (responseData.status == "ok") {
                    alerter("Werker verwijder van uit de project");
                } else {
                    alerter("Gefaald om werkers uit de project te halen.");
                }
            })
            .catch(function (error) {
                alerter("API Error. Please try again later. (" + error + ")");
            });
    }

    document.getElementById("btnAddMedeToProject").addEventListener("click", function () {
        toewijznMedeProject();
    })

    document.getElementById("btnDeleteMedeToProject").addEventListener("click", function () {
        VerwijderMedeProject();
    })


    document.getElementById("btnToonMedewerkPerProject").addEventListener("click", function () {
        getApi();
    })

    document.getElementById("btnAddProjects").addEventListener("click", function (e) {
        e.preventDefault();
        getApiAddProjects();
    })

    document.getElementById("btnAddMedewerkers").addEventListener("click", function (e) {
        e.preventDefault();
        getApiAddMedewerkers();
    })

    document.getElementById("btnLijstProjecten").addEventListener("click", function () {
        getApiProjects();
    })

    document.getElementById("btnLijstMedewerker").addEventListener("click", function () {
        getApiMedewerker();
    })

    function alerter(message) {
        alertEl.innerHTML = message;
    }
})();