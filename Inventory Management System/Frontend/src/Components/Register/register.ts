import { HttpStatusCode } from "axios";
import createPostRequest from "../../Repositries/PostRequest";

const registerForm = document.getElementById(
  "form-register"
) as HTMLFormElement;
const validationError = document.getElementById("error-message") as HTMLElement;
const successMessage = document.getElementById(
  "success-message"
) as HTMLElement;
const usernameInput = document.getElementById("username") as HTMLInputElement;
const emailInput = document.getElementById("email") as HTMLInputElement;
const passwordInput = document.getElementById("password") as HTMLInputElement;
const repasswordInput = document.getElementById(
  "confirmPassword"
) as HTMLInputElement;

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  // Clear previous error messages
  usernameInput.classList.remove("is-invalid");
  emailInput.classList.remove("is-invalid");
  passwordInput.classList.remove("is-invalid");
  repasswordInput.classList.remove("is-invalid");
  if (!validationError.classList.contains("d-none")) {
    validationError.classList.add("d-none");
  }
  const username = usernameInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;
  const repassword = repasswordInput.value;
  // Validate input
  if (
    !validateInput(
      username.trim(),
      email.trim(),
      password.trim(),
      repassword.trim()
    )
  ) {
    validationError.classList.remove("d-none");
  }
  // Submit form
  else {
    const user: any = { username, email, password };
    await sendPostRequest(user);
  }
});
const validateInput = (
  username: string,
  email: string,
  password: string,
  repassword: string
) => {
  if (username === "") {
    validationError.innerHTML = "Please enter your username";
    usernameInput.classList.add("is-invalid");
    return false;
  }
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
  if (repassword === "") {
    validationError.innerHTML = "Please re-enter your password";
    repasswordInput.classList.add("is-invalid");
    return false;
  }
  if (password !== repassword) {
    validationError.innerHTML =
      "Password does not match. Please check your passwords";
    repasswordInput.classList.add("is-invalid");
    return false;
  }
  return true;
};

const sendPostRequest = async (user: any) => {
  try {
    const response = await createPostRequest("/register", user);

    if (response.status === HttpStatusCode.Accepted) {
      successMessage.classList.remove("d-none");
      successMessage.innerHTML = `${response.data.message}`;
      setTimeout(() => {
        successMessage.classList.add("d-none");
      }, 1000);
    }
  } catch (error: any) {
    if (
      error.response.status == HttpStatusCode.BadRequest ||
      error.response.status == HttpStatusCode.NotFound ||
      error.response.status == HttpStatusCode.Forbidden
    ) {
      validationError.classList.remove("d-none");
      validationError.innerHTML = error.response.data.message;
      setTimeout(() => {
        validationError.classList.add("d-none");
      }, 1000);
    }
  }
};
