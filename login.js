class Login {
    constructor(form, fields) {
        this.form = form;
        this.fields = fields;
        this.validateonSubmit();
    }

    validateonSubmit() {

        let self = this;

        this.form.addEventListener("submit", (e) => {
            console.log("In submit")
            e.preventDefault();
            var error = 0;
            self.fields.forEach((field) => {
                console.log(field)
                const input = document.getElementById(field);

                if (self.validateFields(input) == false) {
                    error++;
                }
            });
            if (error == 0) {
                //do login api here
                localStorage.setItem("auth", 1);
                this.form.submit();
            }
        });
    }

    validateFields(field) {
        if (field.value.trim() === "") {
            this.setStatus(
                field,
                `${field.nextSibling.innerText} cannot be blank`,
                "error"
            );
            return false;
        } else {
            if (field.type == "password") {
                console.log(field)
                if (field.value.length < 8) {
                    console.log(field.nextElementSibling)
                    this.setStatus(
                        field,
                        `${field.previousElementSibling.innerText} must be at least 8 characters`,
                        "error"
                    );
                    return false;
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
        console.log(field)
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

const signupForm = document.getElementById("signup");
const loginForm = document.getElementById("login")
if (signupForm) {
    const fields = ["username", "password", "confirm"];
    const validator = new Login(form, fields);
} else{
    const fields = ["username", "password"];
    const validator = new Login(form, fields);
}




