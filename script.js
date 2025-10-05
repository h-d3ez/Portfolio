console.log("Portfolio site loaded successfully");

document.addEventListener("DOMContentLoaded", function() {
  // Typed.js initialization
  new Typed("#typed", {
    strings: [
      "Hamdhan Mohamed",
    ],
    typeSpeed: 80,
    backSpeed: 0,
    backDelay: 0,
    loop: false,
    showCursor: true,
    onComplete: function(self) {
      self.cursor.remove();  // remove cursor after typing finishes
    }
  });

  // Hamburger menu functionality
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const links = document.querySelectorAll('.nav-links li');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close menu when clicking on a link
  links.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    }
  });
});

const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

contactForm.addEventListener('submit', function(event) {
  event.preventDefault(); // prevent default submission

  const formData = new FormData(contactForm);

  fetch(contactForm.action, {
    method: 'POST',
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(response => {
    if (response.ok) {
      formStatus.textContent = "Message sent successfully! Thank you for reaching out.";
      contactForm.reset();
    } else {
      formStatus.textContent = "Oops! Something went wrong. Try again.";
    }
  })
  .catch(error => {
    formStatus.textContent = "Oops! Something went wrong. Try again.";
  });
});

const skills = ["Cybersecurity", "Software Engineering", "Web Development", "UI/UX Design"];
let i = 0;
let charIndex = 0;
const speed = 100; // typing speed

function typeSkill() {
  const display = document.getElementById("animated-skills");
  if (charIndex < skills[i].length) {
    display.innerHTML += skills[i].charAt(charIndex);
    charIndex++;
    setTimeout(typeSkill, speed);
  } else {
    setTimeout(() => eraseSkill(), 1000); // wait 1s before erasing
  }
}

function eraseSkill() {
  const display = document.getElementById("animated-skills");
  if (charIndex > 0) {
    display.innerHTML = skills[i].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(eraseSkill, speed / 2);
  } else {
    i = (i + 1) % skills.length; // move to next skill
    setTimeout(typeSkill, 500);
  }
}

// start the animation
typeSkill();