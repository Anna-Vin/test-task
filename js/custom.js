// Custom Select
// 1
document.querySelector('.custom-select-wrapper').addEventListener('click', function() {
    this.querySelector('.custom-select').classList.toggle('open');
})

for (const option of document.querySelectorAll(".custom-option")) {
    option.addEventListener('click', function() {
        if (!this.classList.contains('selected')) {
            this.parentNode.querySelector('.custom-option.selected').classList.remove('selected');
            this.classList.add('selected');
            this.closest('.custom-select').querySelector('.custom-select__trigger span').textContent = this.textContent;
        }
    })
}

window.addEventListener('click', function(e) {
    const select = document.querySelector('.custom-select')
    if (!select.contains(e.target)) {
        select.classList.remove('open');
    }
});

// 2
document.querySelector('.custom-select-wrapper-2').addEventListener('click', function() {
    this.querySelector('.custom-select-2').classList.toggle('open');
})

for (const option of document.querySelectorAll(".custom-option-2")) {
    option.addEventListener('click', function() {
        if (!this.classList.contains('selected')) {
            this.parentNode.querySelector('.custom-option-2.selected').classList.remove('selected');
            this.classList.add('selected');
            this.closest('.custom-select-2').querySelector('.custom-select__trigger-2 span').textContent = this.textContent;
        }
    })
}

window.addEventListener('click', function(e) {
    const select = document.querySelector('.custom-select-2')
    if (!select.contains(e.target)) {
        select.classList.remove('open');
    }
});

// 3
document.querySelector('.custom-select-wrapper-3').addEventListener('click', function() {
    this.querySelector('.custom-select-3').classList.toggle('open');
})

for (const option of document.querySelectorAll(".custom-option-3")) {
    option.addEventListener('click', function() {
        if (!this.classList.contains('selected')) {
            this.parentNode.querySelector('.custom-option-3.selected').classList.remove('selected');
            this.classList.add('selected');
            this.closest('.custom-select-3').querySelector('.custom-select__trigger-3 span').textContent = this.textContent;
        }
    })
}

window.addEventListener('click', function(e) {
    const select = document.querySelector('.custom-select-2')
    if (!select.contains(e.target)) {
        select.classList.remove('open');
    }
});


// Hamburger menu
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".navbar");

hamburger.addEventListener("click", () =>  mobileMenu());

function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}