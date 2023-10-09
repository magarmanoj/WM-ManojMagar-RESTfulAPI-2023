(function (){
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
			.then(function(response) {
                console.log(response);
				return response.json();
			})
			.then(function(responseData){
				// de verwerking van de data
				var list = responseData.data;

                if (list.length > 0) {
					// er zit minstens 1 item in list, we geven dit ook onmiddelijk weer
					var tLijst = `<span class="rij btn"><span>Project naam</span><span>Voornaam</span><span>Familienaam</span><span>Specialisatie</span></span>`;
					for (var i = 0; i < list.length; i++) {
						tLijst += `<span class="rij"><span>${ list[i].naam }</span><span>${ list[i].voornaam }</span><span>${ list[i].familienaam }</span><span>${ list[i].specialisatie }</span></span>`;
					}
					tLijst += "<br>";

					alerter(tLijst);
				} else {
					alerter("Servertijd kon niet opgevraagd worden");
				}

			})
			.catch(function(error) {
				// verwerk de fout
				alertEl.innerHTML = "fout : " + error;
			});
	}

    function getApiAdd() {
        if (!voornaam || !familienaam || !specialisatie) {
            alert("All fields are required. Please fill in all fields.");
            return; 
        }
        let url = baseApiAddress + "WerkerProjectadd.php";

        opties.body = JSON.stringify({
            voornaam: document.getElementById("naam").value,
            familienaam: document.getElementById("achternaam").value,
            specialisatie: document.getElementById("specialisatie").value
        });

        fetch(url, opties)
            .then(function (response) {
                return response.json();
            })
    }

    document.getElementById("btnToonMedewerkPerProject").addEventListener("click", function(){
        getApi();
    })

    document.getElementById("btnSubmit").addEventListener("click", function(e){
        e.preventDefault();
        getApiAdd();
    })

    function alerter(message){
        alertEl.innerHTML = message;
    }
})();