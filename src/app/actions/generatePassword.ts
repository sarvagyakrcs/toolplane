"use server";

interface PasswordOptions {
  length?: number;
  includeUppercase?: boolean;
  includeLowercase?: boolean;
  includeNumbers?: boolean;
  includeSymbols?: boolean;
  excludeSimilar?: boolean;
}

export async function generatePassword(options: PasswordOptions = {}): Promise<string> {
  const {
    length = 16,
    includeUppercase = true,
    includeLowercase = true,
    includeNumbers = true,
    includeSymbols = true,
    excludeSimilar = false,
  } = options;

  if (length < 4 || length > 128) {
    throw new Error("Password length must be between 4 and 128 characters.");
  }

  let charset = "";
  
  if (includeLowercase) {
    charset += excludeSimilar ? "abcdefghjkmnpqrstuvwxyz" : "abcdefghijklmnopqrstuvwxyz";
  }
  
  if (includeUppercase) {
    charset += excludeSimilar ? "ABCDEFGHJKMNPQRSTUVWXYZ" : "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  }
  
  if (includeNumbers) {
    charset += excludeSimilar ? "23456789" : "0123456789";
  }
  
  if (includeSymbols) {
    charset += "!@#$%^&*()_+-=[]{}|;:,.<>?";
  }

  if (!charset) {
    throw new Error("At least one character type must be selected.");
  }

  let password = "";
  
  // Use crypto.getRandomValues for better randomness
  const array = new Uint32Array(length);
  crypto.getRandomValues(array);
  
  for (let i = 0; i < length; i++) {
    password += charset[array[i] % charset.length];
  }

  return password;
} 