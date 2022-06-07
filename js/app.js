// Необхідні змінні //

const header = document.querySelector('header');
const first_skill = document.querySelector('.skill:first-child');
const sk_counters = document.querySelectorAll('.counter span');
const progress_bars = document.querySelectorAll('.skills svg circle');
const ml_section = document.querySelector('.milestones');
const ml_counters = document.querySelectorAll('.number span');
const links = document.querySelectorAll('.nav-link');
const toggle_btn = document.querySelector('.toggle-btn');
const isValidEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
const contactForm = document.querySelector('form.contact-form');
const formWrap = contactForm.querySelector('.form-wrap');
const thanksMessage = contactForm.querySelector('.thanks');
const submitButton = contactForm.querySelector('input[type="submit"]')
const nameInput = document.querySelector('input[name="username"]');
const emailInput = document.querySelector('input[name="email"]');
const messageInput = document.querySelector('textarea[name="message"]');
const inputs = [nameInput, emailInput, messageInput];
const subscriptionForm = document.querySelector('.sub-box > form');
const emailSubInput = document.querySelector('input[name="email-sub"]');
const hamburger = document.querySelector('.hamburger');

window.addEventListener('scroll', () => {
  activeLink();
  if (!skillsPlayed) skillsCounter();
  if (!mlPlayed) mlCounter();
});

function updateCount(num, maxNum) {
  let currentNum = +num.innerText;

  if (currentNum < maxNum) {
    num.innerText = currentNum + 1;
    setTimeout(() => {
      updateCount(num, maxNum);
    }, 12);
  }
}

// Прилипаюче Меню //

function stickyNavbar() {
  header.classList.toggle('scrolled', window.pageYOffset > 0);
}

stickyNavbar();

window.addEventListener('scroll', stickyNavbar);

// Анімації Reveal //

let sr = ScrollReveal({
  duration: 2500,
  distance: "60px",
});

sr.reveal('.showcase-info', { delay: 500 });
sr.reveal('.showcase-image', { origin: 'top', delay: 600 });
sr.reveal('.prt-card.shop', { origin: 'left', delay: 300 });
sr.reveal('.prt-card.landing', { origin: 'top', delay: 300 });
sr.reveal('.prt-card.app', { origin: 'right', delay: 300 });

// Анімація прогресу в блоці 'Мої навички' //

function hasReached(elem) {
  let topPosition = elem.getBoundingClientRect().top;

  if (window.innerHeight >= topPosition + elem.offsetHeight) {
    return true;
  }
  else {
    return false;
  }
}

let skillsPlayed = false;

function skillsCounter() {
  if (!hasReached(first_skill)) return;

  skillsPlayed = true;

  sk_counters.forEach((counter, i) => {
    let target = +counter.dataset.target;
    let strokeValue = 427 - 427 * (target / 100);

    progress_bars[i].style.setProperty('--target', strokeValue);

    setTimeout(() => {
      updateCount(counter, target);
    }, 400);

  });

  progress_bars.forEach((p) => (
    p.style.animation = 'progress 2s ease-in-out forwards'
  ));
}

skillsCounter();

// Анімація чисел в блоці 'Послуги' //

let mlPlayed = false;

function mlCounter() {
  if (!hasReached(ml_section)) return;
  mlPlayed = true;
  ml_counters.forEach(ctr => {
    let target = +ctr.dataset.target;
    setTimeout(() => {
      updateCount(ctr, target);
    }, 400);
  });
}

// Фільтер в блоці 'Моє Портфоліо' //

let mixer = mixitup('.portfolio-gallery', {
  selectors: {
    target: '.prt-card',
  },
  animation: {
    duration: 500,
  },
});

// Слайдер для блоку 'Відгуки' //

const swiper = new Swiper('.swiper', {
  loop: true,
  speed: 550,
  autoplay: true,

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});

// Валідація Контактної Форми //

let isFormValid = false;
let isValidationOn = false;


const resetElm = (elm) => {
  elm.parentElement.classList.remove('form-error');
  elm.nextElementSibling.style.display = 'none';
}

const invalidateElm = (elm) => {
  elm.parentElement.classList.add('form-error');
  elm.nextElementSibling.style.display = 'block';
}

const validateInputs = () => {
  if (!isValidationOn) return;
  isFormValid = true;
  inputs.forEach(resetElm);
  contactForm.querySelector('.email').style.display = 'none';

  if (!nameInput.value) {
    isFormValid = false;
    invalidateElm(nameInput);
  }
  if (!emailInput.value) {
    isFormValid = false;
    invalidateElm(emailInput);
  }
  else if (emailInput.value && !isValidEmail(emailInput.value)) {
    isFormValid = false;
    emailInput.parentElement.classList.add('form-error');
    contactForm.querySelector('.email').style.display = 'block';
  }
  if(!messageInput.value) {
    isFormValid = false;
    invalidateElm(messageInput);
  }
};

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  isValidationOn = true;
  validateInputs();
  if (isFormValid) {
    formWrap.remove();
    submitButton.remove();
    thanksMessage.style.display = 'flex';
  }
});

inputs.forEach(input => {
  input.addEventListener('input', () => {
    validateInputs();
  });
});

// Валідація форми в блоці 'Розсилка' //

let isSecondFormValid = false;
const submitBtn = subscriptionForm.querySelector('input[type="submit"]');

const validateInput = () => {
  emailSubInput.parentElement.classList.remove('form-error');
  emailSubInput.nextElementSibling.style.display = 'none';
  subscriptionForm.querySelector('.email').style.display = 'none';
  isSecondFormValid = true;

  if(!emailSubInput.value) {
  isSecondFormValid = false;
  emailSubInput.parentElement.classList.add('form-error');
  emailSubInput.nextElementSibling.style.display = 'block';
  }
  else if (emailSubInput.value && !isValidEmail(emailSubInput.value)) {
  isSecondFormValid = false;
  emailSubInput.parentElement.classList.add('form-error');
  subscriptionForm.querySelector('.email').style.display = 'block';
  }
};

subscriptionForm.addEventListener('submit', (e) => {
  e.preventDefault();
  validateInput();
  if(isSecondFormValid) {
  emailSubInput.parentElement.classList.add('form-access');
  emailSubInput.disabled = true;
  submitBtn.disabled = true;
  }
});

// Зміна активного пункту навігації при скроллі //

function activeLink() {
  let sections = document.querySelectorAll('section[id]');
  let passedSections = Array.from(sections).map((sct, i) => {
    return {
      y: sct.getBoundingClientRect().top - header.offsetHeight,
      id: i,

    };
  })
    .filter((sct) => sct.y <= 0);

  let currSectionID = passedSections.at(-1).id;

  links.forEach(l => l.classList.remove('active'));
  links[currSectionID].classList.add('active');
}

activeLink();

// Реалізація зміни теми сайту по кліку на кнопку //

let firstTheme = localStorage.getItem('dark');

changeTheme(+firstTheme);

function changeTheme(isDark) {
  if (isDark) {
    document.body.classList.add('dark');
    toggle_btn.classList.replace('uil-moon', 'uil-sun');
    localStorage.setItem('dark', 1);
  }
  else {
    document.body.classList.remove('dark');
    toggle_btn.classList.replace('uil-sun', 'uil-moon');
    localStorage.setItem('dark', 0);
  }
}

toggle_btn.addEventListener('click', () => {
  changeTheme(!document.body.classList.contains('dark'));
});

//  Згортання і Розгортання Навбар Меню //

hamburger.addEventListener('click', () => {
  document.body.classList.toggle('open');
  document.body.classList.toggle('stopScrolling');
})

links.forEach(link => link.addEventListener('click', () => {
  document.body.classList.remove('open');
  document.body.classList.remove('stopScrolling');
}))
