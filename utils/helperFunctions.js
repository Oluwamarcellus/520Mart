// check if email is a valid format
export const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// compares and check password
export const isValidPassword = (password, verifyPassword) => {
  if (password !== verifyPassword) {
    return "Passwords do not match.";
  } else if (/\s/.test(password) || /\s/.test(verifyPassword)) {
    return "Password cannot contain spaces.";
  }
  return null;
};
