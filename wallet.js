document.getElementById("addMoneyButton").addEventListener("click", function () {


    const username = sessionStorage.getItem("loggedInUsername");
    const walletId = document.getElementById("walletid").value;
    const amount = document.getElementById("amount").value;

    if (
        walletId.trim() === "" ||
        !Number.isInteger(Number(walletId)) ||
        Number(walletId) < 1
    ) {
        alert("Please enter a valid wallet ID (a positive integer).");
        return;
    }


    if (
        amount.trim() === "" ||
        !Number.isFinite(Number(amount)) ||
        Number(amount) <= 0
    ) {
        alert("Please enter a valid amount (a positive number).");
        return;
    }


    fetch("http://localhost:8080/wallet/add-money", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            walletId: Number(walletId),
            amount: Number(amount)
        })

    })
        .then(response => response.text().then(data => {
            if (!response.ok) {
                throw new Error(data || "Add Money failed");
            }

            const fraudResult = document.getElementById("fraudResult");
            fraudResult.textContent = data;

            if (data.trim().toUpperCase().startsWith("FRAUD")) {
                fraudResult.style.color = "red";
                alert("FRAUD: Money was not added!");
            } else {
                fraudResult.style.color = "lightgreen";
                alert("SAFE: Money added successfully!");
            }
        }))

        .catch((error) => {
            console.error("Error:", error);
            alert("An error occurred while adding money. Please try again.");
        });

});

document.getElementById("fraudCheckButton").addEventListener("click", function () {

    const username = sessionStorage.getItem("loggedInUsername");
    const walletId = document.getElementById("walletid").value;
    const amount = document.getElementById("amount").value;
    if (
        walletId.trim() === "" ||
        !Number.isInteger(Number(walletId)) ||
        Number(walletId) < 1
    ) {

        alert("Please enter a valid wallet ID (a positive integer).");
        return;
    }

    if (
        amount.trim() === "" ||
        !Number.isFinite(Number(amount)) ||
        Number(amount) <= 0
    ) {
        alert("Please enter a valid amount (a positive number).");
        return;
    }

    fetch("http://localhost:8080/wallet/fraud-check", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            walletId: Number(walletId),
            amount: Number(amount)
        })
    })
        .then(response => response.text().then(data => {

            if (!response.ok) {
                throw new Error(data || "Fraud check failed");
            }
            const fraudResult = document.getElementById("fraudResult");
            fraudResult.textContent = data;

            if (data.trim().toUpperCase() === "FRAUD") {
                alert("FRAUD: This transaction is suspicious!");
            } else {
                alert("SAFE: This transaction is safe.");
            }
        }))
        .catch((error) => {
            console.error("Error:", error);
            alert(error.message || "Unable to connect to the backend");

        });
});
