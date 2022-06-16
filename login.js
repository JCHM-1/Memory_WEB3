//const auth = new Auth();

class createPost {
    constructor(form, fields, signup) {
        this.form = form;
        this.fields = fields;
        this.createJson();
    }

    createJson(){
        let self = this
        let object = {}

        this.form.addEventListener("submit", (e) => {
            console.log("In submit")
            e.preventDefault();
            var error = 0;

            self.fields.forEach((field) => {
                object[field] = document.getElementById(field).value;
            });

            console.log(object)
        })

        this.sendData(object, signup)
    }

    sendData(data, signup){
        const XHR = new XMLHttpRequest();

        // Define what happens on successful data submission
        XHR.addEventListener( "load", function(event) {
            console.log( event.target.responseText );
        } );

        // Define what happens in case of error
        XHR.addEventListener( "error", function( event ) {
            console.log( 'Oops! Something went wrong.' );
        } );

        if(signup){
            XHR.open( "POST", "http://localhost:8000/register" );
        } else {
            XHR.open( "POST", "/api/login_check" );
        }
        XHR.send(data)
    }


}

// Access the form element...
const signupForm = document.getElementById("signup");
const loginForm = document.getElementById("login")

if (signupForm) {
    const fields = ["username", "email", "password"];
    const validator = new createPost(signupForm, fields, 1);
} else{
    const fields = ["username", "password"];
    const validator = new createPost(loginForm, fields, 0);
}








