(function () {
  let attempts = document.getElementById("attempts");
  let myForm = document.getElementById("myForm");
  let numProvided = document.getElementById("numProvided");
  let error = document.getElementById("error");

  if (myForm) {
    myForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (numProvided.value) {
        if (isPrime(numProvided.value)) {
          error.hidden = true;
          let newLi = document.createElement("li");
          newLi.classList.add("is-prime");
          newLi.innerHTML = numProvided.value + " is a Prime Number";
          attempts.appendChild(newLi);
          myForm.reset();
          numProvided.focus();
        } else {
          error.hidden = true;
          let newLi = document.createElement("li");
          newLi.classList.add("not-prime");
          newLi.innerHTML = numProvided.value + " is not a Prime Number";
          attempts.appendChild(newLi);
          myForm.reset();
          numProvided.focus();
        }
      } else {
        error.hidden = false;
        numProvided.focus();
      }
    });
  }

  function isPrime(n) {
    if (n <= 1) {
      return false;
    }
    for (let i = 2; i <= Math.round(Math.sqrt(n)); i++) {
      if (n % i === 0) {
        return false;
      }
    }
    return true;
  }
})();
