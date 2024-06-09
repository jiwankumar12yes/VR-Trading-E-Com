import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
  try {
    const saltRounds = 11;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.log(`Error in Hashing Password`);
  }
};

export const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};
