let lastScroll = 0;

let headerSticky = document.getElementById("header-sticky");

window.addEventListener("scroll", (e) => {
  console.log(e);

  if (window.scrollY < lastScroll) {
    headerSticky.style.top = 0;
  } else {
    headerSticky.style.top = "-6vh";
    headerSticky.style.boxShadow = "0px 5px 40px rgba(0, 0, 0, 0.1)";
  }
  lastScroll = window.scrollY;
});
