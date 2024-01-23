export const checkValidString = (value, minLen = 1) => {
  return value && value.length > minLen;
};

export const checkValidEmail = (value, minLen = 5) => {
  const emailRegex = /^\S+@\S+$/;
  return value && value.length > minLen && emailRegex.test(value);
};
export const checkValidPassword = (value, minLen = 9) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{10,}$/;

  return value && value.length > minLen && passwordRegex.test(value);
};
