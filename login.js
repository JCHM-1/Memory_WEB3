demo()

function demo() {
    fetch("localhost:8080/frontend")
        .then(response => response.json())
        .then(data => console.log(data))
}

