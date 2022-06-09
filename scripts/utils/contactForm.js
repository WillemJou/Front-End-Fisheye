
const button = document.getElementById("open_modal_button");
const modal = document.getElementById("contact_modal");
const sendButton = document.getElementById("send_button");
const form = document.getElementById("modal_form");


function displayModal() {
	modal.style.display = "flex";
    button.style.visibility = "hidden";
}

function closeModal() {
    modal.style.display = "none";
    button.style.visibility = "visible";
}

// console log des input 
const first = document.getElementById('firstname');
const last = document.getElementById('lastname');
const email = document.getElementById('email');

const focusModal = () => {
    button.addEventListener("click", first.focus());
}

form.onsubmit = () => {
    console.log("prénom", first.value);
    console.log("nom", last.value);
    console.log("email", email.value);
        return false;
}