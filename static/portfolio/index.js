const navElements = document.querySelectorAll("nav #nav-container a");
pointer = 1;

function menuToggle(x) {
  if (x.classList.contains("menuAlt")) {
    document.getElementById("nav").classList.add("nav-open");
    setTimeout(() => {
      document.getElementById("nav").classList.remove("nav-open");
      document.getElementById("nav-container").style.display = "flex";
    }, 200);
  } else {
    document.getElementById("nav").classList.add("nav-close");
    document.getElementById("nav-container").style.display = "none";
    setTimeout(() => {
      document.getElementById("nav").classList.remove("nav-close");
    }, 200);
  }
  x.classList.toggle("menuAlt");
  document.getElementById("nav").classList.toggle("hide");
}
