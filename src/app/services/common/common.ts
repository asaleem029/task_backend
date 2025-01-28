import { ApiError, ApiSuccess, AuthMessages } from '../../../app/utils/index.js';

class CommonService {
  async validateAndComparePassword(
    password: string,
    confirmPassword: string,
  ): Promise<IAPISuccessResponse> {
    try {
      const validatePassword = await this.validatePassword(password);
      if (!validatePassword) {
        throw AuthMessages.PASSWORD_VALIDATION_FAILED;
      }
      const comparePasswords = await this.comparePasswords(password, confirmPassword);
      if (!comparePasswords) {
        throw AuthMessages.PASSWORD_CONFIRMED_FAILURE;
      }
      return ApiSuccess.format({
        userMessage: AuthMessages.PASSWORD_VALID.message,
        code: AuthMessages.PASSWORD_VALID.code,
        keyName: 'data',
        ['data']: true,
      });
    } catch (error) {
      console.error('Error during validateAndComparePassword:', error);
      throw ApiError.format(error, AuthMessages.PASSWORD_VALIDATION_FAILED);
    }
  }

  async validatePassword(password: string): Promise<boolean> {
    try {
      // Minimum password length requirement (8 characters)
      const minLength = 8;

      // Check if the password meets the length requirement
      if (!password || password.length < minLength) {
        return false;
      }

      // Check if the password contains at least one lowercase letter
      if (!/[a-z]/.test(password)) {
        return false;
      }

      // Check if the password contains at least one uppercase letter
      if (!/[A-Z]/.test(password)) {
        return false;
      }

      // Check if the password contains at least one numeric digit
      if (!/\d/.test(password)) {
        return false;
      }

      if (!/[-#?!@$%^&*+()_=]/.test(password)) {
        return false;
      }

      // All validation criteria passed
      return true;
    } catch (error) {
      console.error('Error during password validation:', error);
      return false; // Return false in case of any unexpected error
    }
  }

  async comparePasswords(password: string, confirmPassword: string): Promise<boolean> {
    try {
      // Compare password and confirm password fields
      const passwordsMatch = password === confirmPassword;
      return passwordsMatch;
    } catch (error) {
      console.error('Error during password comparison:', error);
      return false;
    }
  }

  async getCurrentTimeStamp(): Promise<Date> {
    const currentDate = new Date();
    return currentDate;
  }

  async getCriteria(criteria: any): Promise<any> {
    const userCriteria: any = {
      where: {},
    };

    // Add each criterion to the where clause
    Object.keys(criteria).forEach((key) => {
      userCriteria.where[key] = criteria[key];
    });

    return userCriteria;
  }
}

export default new CommonService();
