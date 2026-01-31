const tarjeta = document.getElementById("botonform");

tarjeta.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nombre = tarjeta.nombre.value;
    const edad = tarjeta.edad.value;
    const email = tarjeta.email.value;
    const password = tarjeta.password.value;
    const numero = tarjeta.numero.value;


    try {
        const response = await fetch("http://localhost:8080/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nombre,
                edad,
                email,
                password,
                numero,
            })
        });

        if (response.ok) {
            console.log("Usuario creado con éxito");
            tarjeta.reset()
        } else {
            console.log("Error en el servidor");
        }
    } catch (error) {
        console.log("Error de conexión:", error);
    }
});
