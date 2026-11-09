const signInTab = document.getElementById("signInTab");
const registerTab = document.getElementById("registerTab");
const signInSection = document.getElementById("signInSection");
const registerSection = document.getElementById("registerSection");
const registerMessage = document.getElementById("registerMessage");
const signInMessage = document.getElementById("signInMessage");
const registerButton = document.getElementById("registerButton");

const registerUsername = document.getElementById("registerUsername");

const registerPassword = document.getElementById("registerPassword");

const signInButton = document.getElementById("signInButton");
const signInUsername = document.getElementById("signInUsername");
const signInPassword = document.getElementById("signInPassword");

const toggleSignInPassword = document.getElementById("toggleSignInPassword");
const toggleRegisterPassword = document.getElementById("toggleRegisterPassword");

toggleRegisterPassword.addEventListener("click", function () {
    if (registerPassword.type === "password") {
        registerPassword.type = "text";
    } else {
        registerPassword.type = "password";
    }
});

toggleSignInPassword.addEventListener("click", function () {
    if (signInPassword.type === "password") {
        signInPassword.type = "text";
    } else {
        signInPassword.type = "password";
    }
});

signInButton.addEventListener("click", function () {
    const signinusername = signInUsername.value;
    const signinpassword = signInPassword.value;

    fetch("http://localhost:8080/login", {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            username: signinusername,
            password: signinpassword
        })

    })

        .then(response => {
            return response.text().then(data => {

                if (response.ok) {
                    signInMessage.textContent = data;
                    signInMessage.style.color = "green";
                    // Save the username of the logged-in user
                    sessionStorage.setItem("loggedInUsername", signinusername);
                    setTimeout(function () {
                        window.location.href = "wallet.html";
                    }, 1500);
                } else {
                    signInMessage.textContent = data;
                    signInMessage.style.color = "red";
                }

            });
        });


});

registerTab.addEventListener("click", function () {
    signInSection.style.display = "none";
    registerSection.style.display = "block";
});

signInTab.addEventListener("click", function () {
    registerSection.style.display = "none";
    signInSection.style.display = "block";
});

registerButton.addEventListener("click", function () {

    const username = registerUsername.value;
    const password = registerPassword.value;

    fetch("http://localhost:8080/register", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            username: username,
            password: password
        })

    })
        // .then(response => response.text())
        // .then(data => {
        //      alert(data);
        //  });

        .then(response => {
            return response.text().then(data => {

                if (response.ok) {
                    registerMessage.textContent = data;
                    registerMessage.style.color = "green";

                    setTimeout(() => {
                        signInTab.click();
                    }, 3000);
                    signInTab.click();


                } else {
                    registerMessage.textContent = data;
                    registerMessage.style.color = "red";
                }

            });
        });

});

