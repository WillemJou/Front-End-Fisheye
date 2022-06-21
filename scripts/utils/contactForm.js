

const button = document.getElementById("open_modal_button");
const contactModal = document.getElementById("contact_modal");
const modal = document.getElementsByClassName("modal");
const sendButton = document.getElementById("send__button");
const form = document.getElementById("modal_form");
const descriptif = document.querySelector(".photographer__header");
// pour console log des input 
const first = document.getElementById('input_prénom');
const last = document.getElementById('input_nom');
const email = document.getElementById('input_email');

function displayModal() {
	contactModal.style.display = "flex";
    button.style.visibility = "hidden";
    descriptif.style.visibility = "hidden";
    contactModal.setAttribute('aria-modal', "true" );
    contactModal.removeAttribute('aria-hidden');
    first.focus();
};

function closeModal() {
    window.setTimeout(() => {
        button.style.visibility = "visible"
        contactModal.style.display = "none"
        descriptif.style.visibility = "visible";
    }, 500);
    contactModal.setAttribute('aria-hidden', "true" );
    contactModal.removeAttribute('aria-modal');
};

//fermer modal ac ECHAP
window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeModal(e);              
    };
});

// affiche les entrées des input quand soumission formulaire
form.onsubmit = () => {
    console.log("prénom", first.value);
    console.log("nom", last.value);
    console.log("email", email.value);
        return false;
};





