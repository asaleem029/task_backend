import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

class BcryptService {
  // Hash a password
  async hashPassword(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    return hashedPassword;
  }

  // Compare a password with its hash
  async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
  }

  // Generate a salt
  async generateSalt(): Promise<string> {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    return salt;
  }
}

export default new BcryptService();
