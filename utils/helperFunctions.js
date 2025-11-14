import { Share } from "react-native";

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

// Handles share post with friends
export const handleShare = async (cardInfo) => {
  try {
    await Share.share({
      message: `I discovered an amazing deal — ${cardInfo.title}... for $${cardInfo.price}! You should explore the 520Mart App, they have great offers.`,
    });
  } catch (error) {
    console.error(error);
  }
};
