document.querySelectorAll("button").forEach((btn) =>
  btn.addEventListener("click", (evt) => {
    const form = evt.target.form;
    const api_target = form.id == "login" ? "api/login_check" : "/register";
    const body = JSON.stringify(Object.fromEntries(new FormData(form)));

    fetch(`http://localhost:8000/${api_target}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Accept': "application/json",
      },
      body,
    })
      .then((resp) => resp.json())
      .then((json) => {
        window.localStorage.setItem("token", json.token);
        form.submit();
      })
        .catch(()=>{
            window.alert("Fout")
        });
  })
);

// validateFields(field) {
//     if (field.value.trim() === "") {
//
//         this.setStatus(
//             field,
//             `${field.nextElementSibling.innerText} cannot be blank`,
//             "error"
//         );
//         return false;
//     } else {
//         if (field.type == "password") {
//             if(field.id !== "lpassword"){
//                 if (field.value.length < 8) {
//
//                     this.setStatus(
//                         field,
//                         `${field.nextElementSibling.innerText} must be at least 8 characters`,
//                         "error"
//                     );
//                     return false;
//             }
//             } else {
//                 this.setStatus(field, null, "success");
//                 return true;
//             }
//         } else {
//             this.setStatus(field, null, "success");
//             return true;
//         }
//     }
// }
//
// setStatus(field, message, status) {
//     const errorMessage = field.nextElementSibling
//
//     if (status == "success") {
//         if (errorMessage) {
//             errorMessage.innerText = "";
//         }
//         field.classList.remove("input-error");
//     }
//
//     if (status == "error") {
//         errorMessage.innerText = message;
//     }
// }
