
const button = document.getElementById("open_modal_button");
const modal = document.getElementById("contact_modal");
const sendButton = document.getElementsById("send_button");
const form = document.getElementById("modal_form")

function displayModal() {
	modal.style.display = "flex";
    button.style.visibility = "hidden";
}

function closeModal() {
    modal.style.display = "none";
    button.style.visibility = "visible";
}

//form.addEventListener('submit');