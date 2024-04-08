// Fonction qui permets le login utilisateur
const boutonSeConnecter = document.getElementById("se-connecter")
boutonSeConnecter.addEventListener("click", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const motDePasse = document.getElementById("motdepasse").value;

    const userLogin = {
        email: email,
        password: motDePasse,
    };

    const userLoginJson = JSON.stringify(userLogin);

    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json", "accept": "application/json" },
        body: userLoginJson
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Erreur de connexion");
        }
    })
    .then(data => {
        console.log("Connexion réussie:", data);
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('token', data.token);
        window.location.href = "../index.html";
    })
    .catch(error => {
        console.error("Erreur de connexion:", error);
        document.getElementById("message-erreur").innerText = "Identifiant ou mot de passe incorrect.";
    });
});