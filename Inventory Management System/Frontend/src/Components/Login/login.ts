import { HttpStatusCode } from "axios";
import createPostRequest from "../../Repositries/PostRequest";

const loginForm = document.getElementById("form-login") as HTMLFormElement;
const validationError = document.getElementById("error-message") as HTMLElement;
const emailInput = document.getElementById("email") as HTMLInputElement;
const passwordInput = document.getElementById("password") as HTMLInputElement;

// Login form submit handler
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  // Clear previous error messages
  emailInput.classList.remove("is-invalid");
  passwordInput.classList.remove("is-invalid");
  if (!validationError.classList.contains("d-none")) {
    validationError.classList.add("d-none");
  }
  const email = emailInput.value;
  const password = passwordInput.value;
  // Validate input
  if (!validateInput(email.trim(), password.trim())) {
    validationError.classList.remove("d-none");
  }
  // Submit form
  else {
    await sendAuthRequest(email, password);
  }
});

const validateInput = (email: string, password: string): boolean => {
  if (email === "") {
    validationError.innerHTML = "Please enter your email";
    emailInput.classList.add("is-invalid");
    return false;
  }
  if (password === "") {
    validationError.innerHTML = "Please enter your password";
    passwordInput.classList.add("is-invalid");
    return false;
  }
  if (!email.match(/\S+@\S+\.\S+/)) {
    validationError.innerHTML = "Please enter valid email";
    emailInput.classList.add("is-invalid");
    return false;
  }
  return true;
};

const sendAuthRequest = async (email: string, password: string) => {
  // Send request
  try {
    const user: any = { email, password };
    const response = await createPostRequest("/login", user);
    if (response.status === HttpStatusCode.Accepted) {
      localStorage.setItem("jwt", response.data.tokens.accessToken);
      window.location.href = "../MainPage/main.html";
    }

  } catch (error: any) {
    if (
      error.response.status == HttpStatusCode.BadRequest ||
      error.response.status == HttpStatusCode.NotFound ||
      error.response.status == HttpStatusCode.Forbidden
    ) {
      validationError.classList.remove("d-none");
      validationError.innerHTML = error.response.data.message;
    }
  }
};


