function toggleDropdown() {
  const dropdownMenu = document.querySelector(".dropdown");

  console.log("hi");

  dropdownMenu.classList.toggle("show");
}

document.querySelector(".svg").addEventListener("click", toggleDropdown);

console.log("hi");
