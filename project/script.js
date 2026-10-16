// SIGNUP
function signup() {

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (name === "" || email === "" || password === "") {
        alert("Please fill all fields");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let exists = users.find(user => user.email === email);

    if (exists) {
        alert("User already exists!");
        return;
    }

    users.push({
        name: name,
        email: email,
        password: password,
        role: "user"
    });

    localStorage.setItem("users", JSON.stringify(users));

    alert("Signup successful!");

    window.location.href = "login.html";
}


// LOGIN
function login() {

    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;

    // ADMIN LOGIN
    if (email === "admin@gmail.com" && password === "admin123") {

        let admin = {
            name: "Admin",
            email: email,
            role: "admin"
        };

        localStorage.setItem(
            "loggedInUser",
            JSON.stringify(admin)
        );

        window.location.href = "admin.html";

        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let user = users.find(
        u => u.email === email && u.password === password
    );

    if (user) {

        localStorage.setItem(
            "loggedInUser",
            JSON.stringify(user)
        );

        window.location.href = "user.html";

    } else {

        alert("Invalid email or password");

    }
}


// LOGOUT
function logout() {

    localStorage.removeItem("loggedInUser");

    window.location.href = "index.html";
}


// ADD TOURNAMENT
function addTournament() {

    let game = document.getElementById("game").value;
    let tournament = document.getElementById("tournament").value;
    let prize = document.getElementById("prize").value;
    let date = document.getElementById("date").value;

    if (
        game === "" ||
        tournament === "" ||
        prize === "" ||
        date === ""
    ) {
        alert("Please fill all fields");
        return;
    }

    let tournaments =
        JSON.parse(localStorage.getItem("tournaments")) || [];

    tournaments.push({

        game: game,

        name: tournament,

        prize: prize,

        date: date

    });

    localStorage.setItem(
        "tournaments",
        JSON.stringify(tournaments)
    );

    alert("Tournament added successfully!");

    // Clear fields
    document.getElementById("game").value = "";
    document.getElementById("tournament").value = "";
    document.getElementById("prize").value = "";
    document.getElementById("date").value = "";

    showAdminTournaments();
}


// SHOW TOURNAMENTS FOR USER
function showTournaments() {

    let list = document.getElementById("tournamentList");

    if (!list) return;

    let tournaments =
        JSON.parse(localStorage.getItem("tournaments")) || [];

    list.innerHTML = "";

    if (tournaments.length === 0) {

        list.innerHTML = "<h2>No tournaments available</h2>";

        return;
    }

    tournaments.forEach((tournament, index) => {

        list.innerHTML += `
        
        <div class="card">

            <h2>🎮 ${tournament.name}</h2>

            <p>Game: ${tournament.game}</p>

            <p>Prize: ₹${tournament.prize}</p>

            <p>📅 Date: ${tournament.date}</p>

            <button onclick="registerTournament(${index})">
                Register
            </button>

        </div>
        
        `;
    });
}


// REGISTER TOURNAMENT
function registerTournament(index) {

    let user =
        JSON.parse(localStorage.getItem("loggedInUser"));

    if (!user) {

        alert("Please login first");

        window.location.href = "login.html";

        return;
    }

    let tournaments =
        JSON.parse(localStorage.getItem("tournaments")) || [];

    let registrations =
        JSON.parse(localStorage.getItem("registrations")) || [];

    // Prevent duplicate registration
    let alreadyRegistered = registrations.find(
        r =>
            r.user === user.email &&
            r.tournament === tournaments[index].name
    );

    if (alreadyRegistered) {

        alert("You have already registered for this tournament!");

        return;
    }

    registrations.push({

        user: user.email,

        tournament: tournaments[index].name,

        game: tournaments[index].game,

        date: tournaments[index].date

    });

    localStorage.setItem(
        "registrations",
        JSON.stringify(registrations)
    );

    alert("Tournament registration successful!");
}


// ADMIN TOURNAMENT LIST
function showAdminTournaments() {

    let list =
        document.getElementById("adminTournamentList");

    if (!list) return;

    let tournaments =
        JSON.parse(localStorage.getItem("tournaments")) || [];

    list.innerHTML = "";

    if (tournaments.length === 0) {

        list.innerHTML = "<p>No tournaments added yet.</p>";

        return;
    }

    tournaments.forEach((tournament, index) => {

        list.innerHTML += `

        <div class="tournament">

            <h2>🎮 ${tournament.name}</h2>

            <p>Game: ${tournament.game}</p>

            <p>Prize: ₹${tournament.prize}</p>

            <p>📅 Date: ${tournament.date}</p>

            <button onclick="deleteTournament(${index})">
                Delete
            </button>

        </div>

        `;
    });
}


// DELETE TOURNAMENT
function deleteTournament(index) {

    let tournaments =
        JSON.parse(localStorage.getItem("tournaments")) || [];

    tournaments.splice(index, 1);

    localStorage.setItem(
        "tournaments",
        JSON.stringify(tournaments)
    );

    showAdminTournaments();
}


// PAGE LOAD
showTournaments();
showAdminTournaments();