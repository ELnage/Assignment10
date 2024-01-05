var userName = document.getElementById("userName");
var signupEmail = document.getElementById("signupEmail");
var signupPassword = document.getElementById("signupPassword");
var signupBtn = document.getElementById("signup");
var loginEmail = document.getElementById("loginEmail");
var loginPassword = document.getElementById("loginPassword");
var loginBtn = document.getElementById("login");
var emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
var users = [];
if (localStorage.getItem("Users") != null) {
  users = JSON.parse(localStorage.getItem("Users"));
}
var loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
});
var signupForm = document.getElementById("signupForm");
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
});
signupBtn.onclick = function () {
  // التحقق ان الحقول غير فارغة
  if (
    userName.value == "" ||
    signupEmail.value == "" ||
    signupPassword.value == ""
  ) {
    Swal.fire({
      title: "All inputs is required",
      icon: "error",
      confirmButtonColor: "#F27474",
    });
  } else {
    // التحقق من صلاحية صيغة البريد
    if (emailReg.test(signupEmail.value)) {
      var emailExists = false;
      for (var i = 0; i < users.length; i++) {
        if (users[i].Email == signupEmail.value) {
          emailExists = true;
          break;
        }
      }
      // التحقق من ان البريد غير مستخدم
      if (emailExists) {
        Swal.fire({
          title: "Email already exists",
          icon: "error",
          confirmButtonColor: "#F27474",
        });
      } else {
        signup();
        clear();
      }
    } else {
      Swal.fire({
        title: "Email is not valid",
        icon: "error",
        confirmButtonColor: "#F27474",
      });
    }
  }
};

function signup() {
  var user = {
    userName: userName.value,
    Email: signupEmail.value,
    password: signupPassword.value,
  };
  users.push(user);
  localStorage.setItem("Users", JSON.stringify(users));
  Swal.fire({
    title: "SignUp Success",
    icon: "success",
    confirmButtonColor: "#A5DC86",
  });
}

function clear() {
  userName.value = "";
  signupEmail.value = "";
  signupPassword.value = "";
}

loginBtn.onclick = function () {
  var userValid = false;
  var userNameSession;
  for (var i = 0; i < users.length; i++) {
    if (
      users[i].Email == loginEmail.value &&
      users[i].password == loginPassword.value
    ) {
      userValid = true;
      userNameSession = users[i].userName;
      break;
    }
  }
  if (userValid) {
    sessionStorage.setItem("userName", userNameSession);
    window.location = "./home.html";
  } else {
    Swal.fire({
      title: "Email Or password is wrong",
      icon: "error",
      confirmButtonColor: "#F27474",
    });
  }
};
