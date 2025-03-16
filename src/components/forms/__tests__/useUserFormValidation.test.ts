import { renderHook } from "@testing-library/react";
import { UserData } from "../../types";
import { userValidationConfig } from "../../userValidationConfig";
import {useUserFormValidation} from "../UseUserFomrValidation"
import { passwordStrengthValidatorMessage } from "../../../validators/passwordStrengthValidator";
import { EMAIL_VALIDATOR_MESSAGE } from "../../../validators/emailValidator";
import { REQUIRED_VALIDATOR_MESSAGE } from "../../../validators/requiredValidator";

const FIRST_NAME = 'John';
const LAST_NAME = 'Smith'
const EMAIL = 'jon.smith@test.com' 
const PASSWORD = "SEC123";

describe("useUserFormValidation", () => {
    test("when validation hasn't started should return initial state", () => {
      const mockUserData: UserData = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      };
  
      const { result } = renderHook(() =>
        useUserFormValidation(mockUserData, userValidationConfig, false)
      );
  
      expect(result.current.isUserFormValid).toBe(false);
      expect(result.current.firstNameValidationError).toBeUndefined();
      expect(result.current.lastNameValidationError).toBeUndefined();
      expect(result.current.emailValidationError).toBeUndefined();
      expect(result.current.passwordValidationError).toBeUndefined();
    });
  
    test("when all fields are empty should return validation errors ", () => {
      const mockUserData: UserData = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      };
  
      const { result } = renderHook(() =>
        useUserFormValidation(mockUserData, userValidationConfig, true)
      );
  
      expect(result.current.isUserFormValid).toBe(false);
      expect(result.current.firstNameValidationError).toBe(REQUIRED_VALIDATOR_MESSAGE);
      expect(result.current.lastNameValidationError).toBe(REQUIRED_VALIDATOR_MESSAGE);
      expect(result.current.emailValidationError).toBe(REQUIRED_VALIDATOR_MESSAGE);
      expect(result.current.passwordValidationError).toBe(REQUIRED_VALIDATOR_MESSAGE);
    });
  
    test("when invalid email should return validation error", () => {
      const mockUserData: UserData = {
        firstName: FIRST_NAME,
        lastName: LAST_NAME,
        email: "invalid-email",
        password: PASSWORD,
      };
  
      const { result } = renderHook(() =>
        useUserFormValidation(mockUserData, userValidationConfig, true)
      );
  
      expect(result.current.isUserFormValid).toBe(false);
      expect(result.current.emailValidationError).toBe(EMAIL_VALIDATOR_MESSAGE);
      expect(result.current.passwordValidationError).toBeUndefined();
    });
  
    test("when weak passwords should return a password validation error", () => {
      const mockUserData: UserData = {
        firstName: FIRST_NAME,
        lastName: LAST_NAME,
        email: EMAIL,
        password: "123",
      };
  
      const { result } = renderHook(() =>
        useUserFormValidation(mockUserData, userValidationConfig, true)
      );
  
      expect(result.current.isUserFormValid).toBe(false);
      expect(result.current.passwordValidationError).toBe(
        passwordStrengthValidatorMessage
      );
    });
  
    test("when valid input should return no validation", () => {
      const mockUserData: UserData = {
        firstName: FIRST_NAME,
        lastName: LAST_NAME,
        email: EMAIL,
        password:PASSWORD,
      };
  
      const { result } = renderHook(() =>
        useUserFormValidation(mockUserData, userValidationConfig, true)
      );
  
      expect(result.current.isUserFormValid).toBe(true);
      expect(result.current.firstNameValidationError).toBeUndefined();
      expect(result.current.lastNameValidationError).toBeUndefined();
      expect(result.current.emailValidationError).toBeUndefined();
      expect(result.current.passwordValidationError).toBeUndefined();
    });
  });
