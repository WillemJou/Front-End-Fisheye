
const button = document.getElementById("open_modal_button");
const modal = document.getElementById("contact_modal");
const sendButton = document.getElementById("send_button");
const form = document.getElementById("modal_form")

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
console.log(first, last, email);

const focusModal = () => {
    document.querySelector("#firsname").focus();
}
const focusModalEvent = () =>{
     button.addEventListener("click", focusModal());
};
