let form, fields, submit

class Login {
    constructor(form, fields, signup, submit) {
        this.form = form;
        this.fields = fields;
        this.signup = signup;
        this.submit = submit
        this.validateonSubmit();
    }

    validateonSubmit() {

        let self = this;
        let data = {}

        this.submit.addEventListener("click", (e) => {
            e.preventDefault();

            var error = 0;
            self.fields.forEach((field) => {

                let input = ''
                if(!this.signup) {
                    let lfield = "l"+field
                    input = document.getElementById(lfield)
                    console.log(input)
                    console.log()
                } else {
                    input = document.getElementById(field)
                }

                data[field] = input.value

                if (self.validateFields(input) === false) {
                    error++;
                    console.log(error)
                }
            });
            if (error === 0) {
                // TODO: npm install -g local-cors-proxy werkend krijgen
                // Misschien werkt het inloggen dan

                if (this.signup) {
                    console.log("final data signup", data)
                    fetch("http://localhost:8000/register", {
                        method: "POST",
                        body: JSON.stringify(data),
                        header: {
                            'Content-Type': 'application/json'
                        },
                    })
                        .then(data => {
                            console.log(data.statusText)
                            //this.form.submit();
                        })
                        .catch(data => {
                            console.error("Error: ", data.message)
                        })

                } else {

                    console.log("final data login", data)
                    data = JSON.stringify(data)
                     console.log("na JSON stringify: ", data)

                    fetch("http://localhost:8000/api/login_check", {
                        mode: 'no-cors',
                        method: "POST",
                        body: ''+data,
                        header: {
                            'Content-Type': 'application/json',

                        },
                    })
                        .then(data => {
                            // this.form.submit();
                            console.log(data)
                            console.log(data.json())
                        })
                        .catch(data => {
                            console.error("Error: ", data.message)
                        })

                }

            }
        });
    }

    validateFields(field) {
        if (field.value.trim() === "") {

            this.setStatus(
                field,
                `${field.nextElementSibling.innerText} cannot be blank`,
                "error"
            );
            return false;
        } else {
            if (field.type == "password") {
                if(field.id !== "lpassword"){
                    if (field.value.length < 8) {

                        this.setStatus(
                            field,
                            `${field.nextElementSibling.innerText} must be at least 8 characters`,
                            "error"
                        );
                        return false;
                }
                } else {
                    this.setStatus(field, null, "success");
                    return true;
                }
            } else {
                this.setStatus(field, null, "success");
                return true;
            }
        }
    }

    setStatus(field, message, status) {
        const errorMessage = field.nextElementSibling

        if (status == "success") {
            if (errorMessage) {
                errorMessage.innerText = "";
            }
            field.classList.remove("input-error");
        }

        if (status == "error") {
            errorMessage.innerText = message;
        }
    }
}

// Access the form element...
document.getElementById("chk1").addEventListener("click", () => {
    form = document.getElementById("login")
    submit = document.getElementById("submitLogin")
    console.log("form = login")

    fields = ["username", "password"];

    const validator = new Login(form, fields, 0, submit)

})
document.getElementById("chk2").addEventListener("click", () => {
    form = document.getElementById("signup")
    submit = document.getElementById("submitSignup")
    console.log("form = signup")
    fields = ["username", "email", "password"];

    const validator = new Login(form, fields, 1, submit)
})













