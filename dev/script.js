// Global variables for selectors
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
const navbarToggler = document.querySelector('.navbar-toggler');
const navbar = document.getElementById("myNavbar");
const toast = new bootstrap.Toast(document.getElementById('liveToast'));

function showToast(toastElement) {
  let toast = new bootstrap.Toast(toastElement);
  toast.show();
}


function closeNavbar() {
  // Close the navbar by triggering a click on the toggler button
  if (navbarToggler.getAttribute('aria-expanded') === 'true') {
    navbarToggler.click();
  }
}

function addClickEventListeners() {
  // Add click event listeners to each navbar link
  navLinks.forEach(function (link) {
    link.addEventListener('click', closeNavbar);
  });
}

function handleScroll() {
  const scrollThreshold = 639;
  const scrollPosition = window.scrollY;

  // Change background color when scrolling down
  if (scrollPosition > scrollThreshold) {
    navbar.style.backgroundColor = "rgba(0, 0, 0, 0.876)";
  } else {
    // Change background color back to transparent when scrolling up
    navbar.style.backgroundColor = "transparent";
  }
}

function navbarFn() {
  addClickEventListeners();
  window.addEventListener("scroll", handleScroll);
}

(function () {
  emailjs.init('tSLOkCyqkKzdDotLy');
})();

document.querySelector('#contact .btn-primary').addEventListener('click', function (event) {
  event.preventDefault();

  const contactForm = document.getElementById('contact-form');
  const successToast = new bootstrap.Toast(document.getElementById('successToast'));
  const errorToast = new bootstrap.Toast(document.getElementById('errorToast'));

  var contactModalEl = document.getElementById('contactModal');
  var contactModal = bootstrap.Modal.getInstance(contactModalEl);
  if (!contactModal) {
    contactModal = new bootstrap.Modal(contactModalEl);
  }

  function handleResponse(response, toast) {
    console.log('SUCCESS!');

    // Clear the input fields in the form
    contactForm.reset();

    // Show the appropriate toast
    toast.show();

    // Close the modal on successful submission
    contactModal.hide();
  }

  emailjs.sendForm('default_service', 'contact_form', contactForm)
    .then(function (response) {
      if (response.status === 200) {
        handleResponse(response, successToast);
      } else {
        handleResponse(response, errorToast);
      }
    })
    .catch(function (error) {
      console.log('FAILED...', error);

      // Clear the input fields in the form
      contactForm.reset();
      // Show error toast
      errorToast.show();

      // Close the modal on error
      contactModal.hide();
    });
});
// Call the functions
document.addEventListener("DOMContentLoaded", navbarFn);