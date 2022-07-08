

const button = document.getElementById("open_modal_button");
const contactModal = document.getElementById("contact_modal");
const modal = document.getElementsByClassName("modal");
const sendButton = document.getElementById("send__button");
const form = document.getElementById("modal_form");
const label = document.querySelector(".filter__container");
// pour console log des input 
const first = document.getElementById('input_prénom');
const last = document.getElementById('input_nom');
const email = document.getElementById('input_email');
const chevron = document.querySelector(".chevron-down")

function displayModal() {
	contactModal.style.display = "flex";
    button.style.visibility = "hidden";
    label.style.visibility ="hidden";
    chevron.style.visibility ="hidden";
    contactModal.setAttribute('aria-modal', "true" );
    contactModal.removeAttribute('aria-hidden');
    document.body.style.overflow = "hidden";
    first.focus();
};

function closeModal() {
    window.setTimeout(() => {
        button.style.visibility = "visible"
        chevron.style.visibility = "visible"
        contactModal.style.display = "none"
        label.style.visibility ="visible";
    }, 500);
    contactModal.setAttribute('aria-hidden', "true" );
    contactModal.removeAttribute('aria-modal');
    document.body.style.overflow = "visible";
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





