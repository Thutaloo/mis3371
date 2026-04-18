document.addEventListener("DOMContentLoaded", function () {
  const yearSpan = document.getElementById("y");
  const currentDate = document.getElementById("current-date");
  const resetButton = document.getElementById("reset-form");
  const form = document.getElementById("patient-form");
  const confirmModal = document.getElementById("confirm-modal");
  const modalSummary = document.getElementById("modal-summary");
  const modalCancel = document.getElementById("modal-cancel");
  const modalConfirm = document.getElementById("modal-confirm");
  const submitButton = document.getElementById("submit-btn");

  const firstName = document.getElementById("first_name");
  const middleInitial = document.getElementById("middle_initial");
  const lastName = document.getElementById("last_name");
  const dateOfBirth = document.getElementById("date_of_birth");
  const ssnInput = document.getElementById("ssn");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const address1 = document.getElementById("address_line_1");
  const address2 = document.getElementById("address_line_2");
  const cityInput = document.getElementById("city");
  const stateInput = document.getElementById("state");
  const zipInput = document.getElementById("postal_code");
  const username = document.getElementById("username");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirm_password");
  const messageBox = document.getElementById("message");
  const letter = document.getElementById("letter");
  const capital = document.getElementById("capital");
  const number = document.getElementById("number");
  const lengthRule = document.getElementById("length");
  const match = document.getElementById("match");
  const consent = document.getElementById("consent");

  const painSlider = document.getElementById("pain_level");
  const painValue = document.getElementById("pain_level_value");

  if (form) {
    form.setAttribute("novalidate", "novalidate");
  }

  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  if (currentDate) {
    currentDate.textContent = new Date().toLocaleString();
  }

  function formatDateForInput(dateObj) {
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  if (dateOfBirth) {
    const today = new Date();
    const maxDate = new Date(today);
    const minDate = new Date(today);
    minDate.setFullYear(today.getFullYear() - 120);

    dateOfBirth.max = formatDateForInput(maxDate);
    dateOfBirth.min = formatDateForInput(minDate);
  }

  if (painSlider && painValue) {
    painValue.textContent = painSlider.value;

    painSlider.addEventListener("input", function () {
      painValue.textContent = this.value;
    });
  }

  function getErrorHost(field) {
    if (!field) return null;
    return field.parentElement;
  }

  function showError(field, message) {
    if (!field) return;

    field.classList.add("invalid-field");

    const host = getErrorHost(field);
    if (!host) return;

    let error = host.querySelector(".field-error");

    if (!error) {
      error = document.createElement("div");
      error.className = "field-error";
      host.appendChild(error);
    }

    error.textContent = message;
  }

  function clearError(field) {
    if (!field) return;

    field.classList.remove("invalid-field");

    const host = field.parentElement;
    if (!host) return;

    let error = host.querySelector(".field-error");

    if (!error) {
      error = document.createElement("div");
      error.className = "field-error";
      host.appendChild(error);
    }

    error.textContent = "";
  }

  function clearAllErrors() {
    if (!form) return;

    const errors = form.querySelectorAll(".field-error");
    errors.forEach(function (error) {
      error.remove();
    });

    const fields = form.querySelectorAll(".invalid-field");
    fields.forEach(function (field) {
      field.classList.remove("invalid-field");
    });
  }

  function validateFirstName(showMessages = true) {
    if (!firstName) return true;

    const value = firstName.value.trim();
    const regex = /^[A-Za-z'-]{1,30}$/;

    if (value === "") {
      if (showMessages) {
        showError(firstName, "First name is required.");
      }
      return false;
    }

    if (!regex.test(value)) {
      if (showMessages) {
        showError(firstName, "Letters, apostrophes, and dashes only.");
      }
      return false;
    }

    if (showMessages) {
      clearError(firstName);
    }
    return true;
  }

  function validateMiddleInitial(showMessages = true) {
    if (!middleInitial) return true;

    const value = middleInitial.value.trim();
    const regex = /^[A-Za-z]$/;

    if (value === "") {
      if (showMessages) {
        clearError(middleInitial);
      }
      return true;
    }

    if (!regex.test(value)) {
      if (showMessages) {
        showError(middleInitial, "One letter only.");
      }
      return false;
    }

    if (showMessages) {
      clearError(middleInitial);
    }
    return true;
  }

  function validateLastName(showMessages = true) {
    if (!lastName) return true;

    const value = lastName.value.trim();
    const regex = /^[A-Za-z2-5'-]{1,30}$/;

    if (value === "") {
      if (showMessages) {
        showError(lastName, "Last name is required.");
      }
      return false;
    }

    if (!regex.test(value)) {
      if (showMessages) {
        showError(
          lastName,
          "Only letters, apostrophes, dashes, and numbers 2 through 5 are allowed.",
        );
      }
      return false;
    }

    if (showMessages) {
      clearError(lastName);
    }
    return true;
  }

  function validateDOB(showMessages = true) {
    if (!dateOfBirth) return true;

    if (dateOfBirth.value === "") {
      if (showMessages) {
        showError(dateOfBirth, "Date of birth is required.");
      }
      return false;
    }

    const selected = new Date(dateOfBirth.value + "T00:00:00");
    const today = new Date();
    const minDate = new Date();
    minDate.setFullYear(today.getFullYear() - 120);

    if (selected > today) {
      if (showMessages) {
        showError(dateOfBirth, "Date of birth cannot be in the future.");
      }
      return false;
    }

    if (selected < minDate) {
      if (showMessages) {
        showError(
          dateOfBirth,
          "Date of birth cannot be more than 120 years ago.",
        );
      }
      return false;
    }

    if (showMessages) {
      clearError(dateOfBirth);
    }
    return true;
  }

  function validateEmail(showMessages = true) {
    if (!emailInput) return true;

    const value = emailInput.value.trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (value === "") {
      if (showMessages) {
        showError(emailInput, "Email is required.");
      }
      return false;
    }

    if (!regex.test(value)) {
      if (showMessages) {
        showError(emailInput, "Enter a valid email like name@domain.com.");
      }
      return false;
    }

    if (showMessages) {
      clearError(emailInput);
    }
    return true;
  }

  function formatPhone() {
    if (!phoneInput) return;

    let digits = phoneInput.value.replace(/\D/g, "").substring(0, 10);
    let formatted = digits;

    if (digits.length > 6) {
      formatted = `${digits.substring(0, 3)}-${digits.substring(3, 6)}-${digits.substring(6)}`;
    } else if (digits.length > 3) {
      formatted = `${digits.substring(0, 3)}-${digits.substring(3)}`;
    }

    phoneInput.value = formatted;
  }

  function validatePhone(showMessages = true) {
    if (!phoneInput) return true;

    const value = phoneInput.value.trim();
    const regex = /^\d{3}-\d{3}-\d{4}$/;

    if (value === "") {
      if (showMessages) {
        showError(phoneInput, "Phone number is required.");
      }
      return false;
    }

    if (!regex.test(value)) {
      if (showMessages) {
        showError(phoneInput, "Phone number must be in the format 000-000-0000.");
      }
      return false;
    }

    if (showMessages) {
      clearError(phoneInput);
    }
    return true;
  }

  function formatSSN() {
    if (!ssnInput) return;

    let digits = ssnInput.value.replace(/\D/g, "").substring(0, 9);
    let formatted = digits;

    if (digits.length > 5) {
      formatted = `${digits.substring(0, 3)}-${digits.substring(3, 5)}-${digits.substring(5)}`;
    } else if (digits.length > 3) {
      formatted = `${digits.substring(0, 3)}-${digits.substring(3)}`;
    }

    ssnInput.value = formatted;
  }

  function validateSSN(showMessages = true) {
    if (!ssnInput) return true;

    const value = ssnInput.value.trim();
    const regex = /^\d{3}-\d{2}-\d{4}$/;

    if (value === "") {
      if (showMessages) {
        showError(ssnInput, "Social Security Number is required.");
      }
      return false;
    }

    if (!regex.test(value)) {
      if (showMessages) {
        showError(
          ssnInput,
          "Social Security Number must be in the format 123-45-6789.",
        );
      }
      return false;
    }

    if (showMessages) {
      clearError(ssnInput);
    }
    return true;
  }

  function validateAddress(field, required, showMessages = true) {
    if (!field) return true;

    const value = field.value.trim();

    if (value === "") {
      if (required) {
        if (showMessages) {
          showError(field, "This field is required.");
        }
        return false;
      }

      if (showMessages) {
        clearError(field);
      }
      return true;
    }

    if (value.length < 2 || value.length > 30) {
      if (showMessages) {
        showError(field, "This field must be between 2 and 30 characters.");
      }
      return false;
    }

    if (showMessages) {
      clearError(field);
    }
    return true;
  }

  function validateCity(showMessages = true) {
    if (!cityInput) return true;

    const value = cityInput.value.trim();

    if (value === "") {
      if (showMessages) {
        showError(cityInput, "City is required.");
      }
      return false;
    }

    if (value.length < 2 || value.length > 30) {
      if (showMessages) {
        showError(cityInput, "City must be between 2 and 30 characters.");
      }
      return false;
    }

    if (showMessages) {
      clearError(cityInput);
    }
    return true;
  }

  function validateState(showMessages = true) {
    if (!stateInput) return true;

    if (stateInput.value === "") {
      if (showMessages) {
        showError(stateInput, "Please select a state.");
      }
      return false;
    }

    if (showMessages) {
      clearError(stateInput);
    }
    return true;
  }

  function formatZip() {
    if (!zipInput) return;

    let digits = zipInput.value.replace(/\D/g, "").substring(0, 9);

    if (digits.length > 5) {
      zipInput.value = `${digits.substring(0, 5)}-${digits.substring(5)}`;
    } else {
      zipInput.value = digits;
    }
  }

  function validateZip(showMessages = true) {
    if (!zipInput) return true;

    const value = zipInput.value.trim();
    const regex = /^\d{5}(-\d{4})?$/;

    if (value === "") {
      if (showMessages) {
        showError(zipInput, "Post/Zip code is required.");
      }
      return false;
    }

    if (!regex.test(value)) {
      if (showMessages) {
        showError(zipInput, "Post/Zip code must be 5 digits or ZIP+4 format.");
      }
      return false;
    }

    if (showMessages) {
      clearError(zipInput);
    }
    return true;
  }

  function normalizeUsername() {
    if (!username) return;
    username.value = username.value.toLowerCase();
  }

  function validateUsername(showMessages = true) {
    if (!username) return true;

    normalizeUsername();

    const value = username.value.trim();
    const regex = /^[a-z][a-z0-9_-]{4,19}$/;

    if (value === "") {
      if (showMessages) {
        showError(username, "Username is required.");
      }
      return false;
    }

    if (!regex.test(value)) {
      if (showMessages) {
        showError(
          username,
          "Username must start with a letter and use only letters, numbers, underscores, or dashes.",
        );
      }
      return false;
    }

    if (showMessages) {
      clearError(username);
    }
    return true;
  }

  function validatePassword() {
    let isValid = true;

    if (!password || !confirmPassword || !username || !firstName || !lastName) {
      return true;
    }

    password.classList.remove("invalid-field");
    confirmPassword.classList.remove("invalid-field");

    const passwordHost = password.parentElement;
    const confirmPasswordHost = confirmPassword.parentElement;

    if (passwordHost) {
      const passwordError = passwordHost.querySelector(".field-error");
      if (passwordError) {
        passwordError.textContent = "";
      }
    }

    if (confirmPasswordHost) {
      const confirmPasswordError = confirmPasswordHost.querySelector(".field-error");
      if (confirmPasswordError) {
        confirmPasswordError.textContent = "";
      }
    }

    const pwd = password.value;
    const confirmPwd = confirmPassword.value;
    const user = username.value.trim().toLowerCase();
    const first = firstName.value.trim().toLowerCase();
    const last = lastName.value.trim().toLowerCase();

    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#%^&*()\-_=+\\/><.,`~])(?!.*["]).{8,30}$/;

    if (pwd === "") {
      isValid = false;
    } else if (!regex.test(pwd)) {
      isValid = false;
    } else if (user !== "" && pwd.toLowerCase().includes(user)) {
      isValid = false;
    } else if (first !== "" && pwd.toLowerCase().includes(first)) {
      isValid = false;
    } else if (last !== "" && pwd.toLowerCase().includes(last)) {
      isValid = false;
    }

    if (confirmPwd === "") {
      isValid = false;
    } else if (pwd !== confirmPwd) {
      isValid = false;
    }

    return isValid;
  }

  function setRuleState(element, isValid) {
    if (!element) return;

    if (isValid) {
      element.classList.add("valid");
      element.classList.remove("invalid");
    } else {
      element.classList.add("invalid");
      element.classList.remove("valid");
    }
  }

  function updatePasswordChecklist() {
    if (!password || !confirmPassword) return;

    const value = password.value;

    setRuleState(letter, /[a-z]/.test(value));
    setRuleState(capital, /[A-Z]/.test(value));
    setRuleState(number, /[0-9]/.test(value));
    setRuleState(lengthRule, value.length >= 8);

    setRuleState(
      match,
      value !== "" &&
        confirmPassword.value !== "" &&
        value === confirmPassword.value,
    );
  }

  function validateConsent(showMessages = true) {
    if (!consent) return true;

    if (!consent.checked) {
      if (showMessages) {
        showError(
          consent,
          "You must agree to the terms, conditions, and policies.",
        );
      }
      return false;
    }

    if (showMessages) {
      clearError(consent);
    }
    return true;
  }

  function checkFormValidity() {
    if (!submitButton) return;

    const isValid =
      validateFirstName(false) &&
      validateMiddleInitial(false) &&
      validateLastName(false) &&
      validateDOB(false) &&
      validateEmail(false) &&
      validatePhone(false) &&
      validateSSN(false) &&
      validateAddress(address1, true, false) &&
      validateAddress(address2, false, false) &&
      validateCity(false) &&
      validateState(false) &&
      validateZip(false) &&
      validateUsername(false) &&
      validatePassword() &&
      validateConsent(false);

    submitButton.disabled = !isValid;
  }

  function getSelectedRadioValue(name) {
    const selected = document.querySelector(`input[name="${name}"]:checked`);
    return selected ? selected.value : "Not provided";
  }

  function buildModalSummary() {
    const genderInput = document.getElementById("gender");

    return `First Name: ${firstName?.value.trim() || "N/A"}
Middle Initial: ${middleInitial?.value.trim() || "N/A"}
Last Name: ${lastName?.value.trim() || "N/A"}

Date of Birth: ${dateOfBirth?.value || "N/A"}
Social Security Number: ${ssnInput?.value.trim() || "N/A"}
Gender: ${genderInput?.value || "N/A"}

Email: ${emailInput?.value.trim() || "N/A"}
Phone: ${phoneInput?.value.trim() || "N/A"}

Address 1: ${address1?.value.trim() || "N/A"}
Address 2: ${address2?.value.trim() || "N/A"}
City: ${cityInput?.value.trim() || "N/A"}
State: ${stateInput?.value || "N/A"}
Post/Zip Code: ${zipInput?.value.trim() || "N/A"}

Tobacco Use: ${getSelectedRadioValue("tobacco_use")}
Alcohol Use: ${getSelectedRadioValue("alcohol_use")}
Prescription Medications: ${getSelectedRadioValue("prescription_medications")}
Surgery in Past 5 Years: ${getSelectedRadioValue("surgery")}
Current Pain Level: ${painSlider?.value || "N/A"}

Username: ${username?.value.trim() || "N/A"}
`;
  }

  function openModal() {
    if (!confirmModal || !modalSummary) return;
    modalSummary.textContent = buildModalSummary();
    confirmModal.hidden = false;
  }

  function closeModal() {
    if (!confirmModal) return;
    confirmModal.hidden = true;
  }

  if (resetButton && form) {
    resetButton.addEventListener("click", function () {
      const confirmReset = confirm("Are you sure you want to clear the form?");
      if (!confirmReset) {
        return;
      }

      form.reset();
      clearAllErrors();

      if (painSlider && painValue) {
        painValue.textContent = painSlider.value;
      }

      updatePasswordChecklist();
      checkFormValidity();
    });
  }

  if (firstName) {
    firstName.addEventListener("input", validateFirstName);
    firstName.addEventListener("blur", validateFirstName);
  }

  if (middleInitial) {
    middleInitial.addEventListener("input", validateMiddleInitial);
    middleInitial.addEventListener("blur", validateMiddleInitial);
  }

  if (lastName) {
    lastName.addEventListener("input", validateLastName);
    lastName.addEventListener("blur", validateLastName);
  }

  if (dateOfBirth) {
    dateOfBirth.addEventListener("change", validateDOB);
    dateOfBirth.addEventListener("blur", validateDOB);
  }

  if (emailInput) {
    emailInput.addEventListener("input", validateEmail);
    emailInput.addEventListener("blur", validateEmail);
  }

  if (phoneInput) {
    phoneInput.addEventListener("input", function () {
      formatPhone();
      validatePhone();
    });
    phoneInput.addEventListener("blur", validatePhone);
  }

  if (ssnInput) {
    ssnInput.addEventListener("input", function () {
      formatSSN();
      validateSSN();
    });
    ssnInput.addEventListener("blur", validateSSN);
  }

  if (address1) {
    address1.addEventListener("input", function () {
      validateAddress(address1, true);
    });
    address1.addEventListener("blur", function () {
      validateAddress(address1, true);
    });
  }

  if (address2) {
    address2.addEventListener("input", function () {
      validateAddress(address2, false);
    });
    address2.addEventListener("blur", function () {
      validateAddress(address2, false);
    });
  }

  if (cityInput) {
    cityInput.addEventListener("input", validateCity);
    cityInput.addEventListener("blur", validateCity);
  }

  if (stateInput) {
    stateInput.addEventListener("change", validateState);
    stateInput.addEventListener("blur", validateState);
  }

  if (zipInput) {
    zipInput.addEventListener("input", function () {
      formatZip();
      validateZip();
    });
    zipInput.addEventListener("blur", validateZip);
  }

  if (username) {
    username.addEventListener("input", function () {
      normalizeUsername();
      validateUsername();
      validatePassword();
      updatePasswordChecklist();
    });
    username.addEventListener("blur", function () {
      validateUsername();
      validatePassword();
      updatePasswordChecklist();
    });
  }

  if (password) {
    password.addEventListener("input", function () {
      validatePassword();
      updatePasswordChecklist();
    });
    password.addEventListener("blur", function () {
      validatePassword();
      updatePasswordChecklist();
    });
  }

  if (confirmPassword) {
    confirmPassword.addEventListener("input", function () {
      validatePassword();
      updatePasswordChecklist();
    });
    confirmPassword.addEventListener("blur", function () {
      validatePassword();
      updatePasswordChecklist();
    });
  }

  if (consent) {
    consent.addEventListener("change", validateConsent);
  }

  if (form) {
    form.addEventListener("input", function () {
      updatePasswordChecklist();
      checkFormValidity();
    });

    form.addEventListener("change", function () {
      updatePasswordChecklist();
      checkFormValidity();
    });
  }

  updatePasswordChecklist();
  checkFormValidity();

  if (modalCancel) {
    modalCancel.addEventListener("click", function () {
      closeModal();
    });
  }

  if (modalConfirm && form) {
    modalConfirm.addEventListener("click", function () {
      closeModal();
      form.submit();
    });
  }

  if (form) {
    form.addEventListener("submit", function (event) {
      const firstInvalidField =
        (!validateFirstName() && firstName) ||
        (!validateMiddleInitial() && middleInitial) ||
        (!validateLastName() && lastName) ||
        (!validateDOB() && dateOfBirth) ||
        (!validateEmail() && emailInput) ||
        (!validatePhone() && phoneInput) ||
        (!validateSSN() && ssnInput) ||
        (!validateAddress(address1, true) && address1) ||
        (!validateAddress(address2, false) && address2) ||
        (!validateCity() && cityInput) ||
        (!validateState() && stateInput) ||
        (!validateZip() && zipInput) ||
        (!validateUsername() && username) ||
        (!validatePassword() && password) ||
        (!validateConsent() && consent);

      updatePasswordChecklist();
      checkFormValidity();

      if (firstInvalidField) {
        event.preventDefault();
        firstInvalidField.focus();
        return;
      }

      event.preventDefault();
      openModal();
    });
  }
});