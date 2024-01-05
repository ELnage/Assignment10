
if (sessionStorage.getItem("userName") == null) {
   window.location = "./index.html";
}
window.onload = function() {
   var userName = document.getElementById("userName");
   userName.textContent = sessionStorage.getItem("userName");
}
function logout() {
   sessionStorage.removeItem("userName");
   window.location = "./index.html"
}