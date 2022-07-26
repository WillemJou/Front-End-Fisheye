

const button = document.getElementById("open_modal_button");
const contactModal = document.getElementById("contact_modal");
const modal = document.getElementsByClassName("modal");
const sendButton = document.getElementById("send__button");
const form = document.getElementById("modal_form");
const label = document.querySelector(".filter__container");
const chevronDown = document.querySelector(".chevron-down");
const chevronUp = document.querySelector(".chevron-up");

button.tabIndex = 0 ;   

// for input log console
 
const first = document.getElementById('input_prénom');
const last = document.getElementById('input_nom');
const email = document.getElementById('input_email');
const message = document.getElementById("input_message");

function displayModal() {
	contactModal.style.display = "flex";
    button.style.visibility = "hidden";
    label.style.visibility ="hidden";
    chevronUp.style.visibility ="hidden";
    chevronDown.style.visibility ="hidden";
    contactModal.setAttribute('aria-modal', "true" );
    contactModal.removeAttribute('aria-hidden');
    document.body.style.overflow = "hidden";
    first.focus();
};

function closeModal() {
    window.setTimeout(() => {
        button.style.visibility = "visible";
        chevronDown.style.visibility = "visible";
        contactModal.style.display = "none";
        label.style.visibility ="visible";
    }, 500);
    contactModal.setAttribute('aria-hidden', "true" );
    contactModal.removeAttribute('aria-modal');
    document.body.style.overflow = "visible";
};

//close modal with ESCAPE
window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeModal(e);              
    };
});

// show input entries when form submission
form.onsubmit = () => {
    console.log("prénom", first.value);
    console.log("nom", last.value);
    console.log("email", email.value);
    console.log("message", message.value);
    closeModal();
        return false;
};








