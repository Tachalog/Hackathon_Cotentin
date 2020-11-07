< script type = "text/javascript" >
    function csv2json(csv) {
        let j = {
            data: []
        };
        let rows = csv.split("\n");
        let header = rows.shift();
        rows.forEach(function (r) {
            let cells = r.split(";");
            j.data[j.data.length] = {
                id: cells[0], // ID
                nom: cells[1], // Nom du commerce
                cat: cells[2], // Catégorie
                desc: cells[3], // Description
                nom_c: cells[4], // Nom (contact)
                tel: cells[5], // Numéro de télephone */
                email_c: cells[6], // E-mail (contact)
                addresse: cells[7], // Adresse
                site: cells[8], // Site Web
                reseaux: cells[9], // Réseaux sociaux
                services: cells[10], // Services
                email_adm: cells[11] // E-mail (admin)
            };
        });
        return j;
    }

function more(id, desc) {
    if (!desc || !id || typeof desc !== "string" || typeof id !== "string") {
        return false;
    }
    let e = document.querySelector("#shop-block-" + id);
    e.querySelectorAll(".shop-desc")[0].innerHTML = desc;
}

function Shop(data) {
    if (!data || (typeof data !== "string" && typeof data !== "object")) {
        return false;
    }
    let j = (typeof data === "string" ? JSON.stringify(data) : data);
    j.id = j.id.toString();

    let b = document.createElement("div");
    b.className = "shop-block";
    b.id = "shop-block-" + j.id;
    b.addEventListener("click", function () {
        more(j.id, j.desc);
    });
    let i = document.createElement("img");
    i.src = j.img;
    i.className = "shop-img";
    let n = document.createElement("div");
    n.className = "shop-name";
    n.innerHTML = j.nom;
    let d = document.createElement("div");
    d.className = "shop-desc";
    d.innerHTML = (j.desc.length > 250 ? j.desc.substring(0, 247) + "..." : j.desc);

    b.appendChild(i);
    b.appendChild(n);
    b.appendChild(d);
    document.body.appendChild(b);
    /* Génère la structure suivante :

    div .shop-block
    - img .shop-img
    - div .shop-name
    - div .shop-desc
    */
}

let xhr = new XMLHttpRequest();
xhr.open("GET", "data.csv");
xhr.onload = function () {
    csv2json(xhr.responseText).data.forEach(function (d) {
        new Shop(d);
    });
};
xhr.onerror = function () {
    alert("Impossible de charger les donn\u00e9es. Essayez de recharger la page.");
};
xhr.send();
</script>