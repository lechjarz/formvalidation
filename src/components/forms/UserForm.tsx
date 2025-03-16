import { useState } from "react";
import { FieldWithValidation } from "./FieldWithValidation";
import { UserData } from "../types";
import { getInitUserData } from "../userData";
import { useUserFormValidation } from "./UseUserFomrValidation";
import { userValidationConfig } from "../userValidationConfig";
import "./UserForm.css";

export const UserForm = () => {
  const [userData, setUserData] = useState<UserData>(getInitUserData());
  const [startValidation, setStartValidation] = useState<boolean>(false);

  const {
    firstNameValidationError,
    lastNameValidationError,
    emailValidationError,
    isUserFormValid,
    passwordValidationError,
  } = useUserFormValidation(userData, userValidationConfig, startValidation);

  const handleFieldChange = (value: string, fieldName: keyof UserData) => {
    const newUserData = { ...userData, [fieldName]: value };
    setUserData(newUserData);
  };

  const registerHandle = () => {
    if (!startValidation) {
      setStartValidation(true);
    }
  };

  return (
    <div className="user-form-container">
      <header>REGISTRATION FORM</header>
      <FieldWithValidation validationError={firstNameValidationError}>
        <input
          type="text"
          placeholder="First Name"
          value={userData.firstName ?? ""}
          onChange={(e) => handleFieldChange(e.target.value, "firstName")}
        />
      </FieldWithValidation>
      <FieldWithValidation validationError={lastNameValidationError}>
        <input
          type="text"
          placeholder="Last Name"
          value={userData.lastName ?? ""}
          onChange={(e) => handleFieldChange(e.target.value, "lastName")}
        />
      </FieldWithValidation>
      <FieldWithValidation validationError={emailValidationError}>
        <input
          type="email"
          placeholder="Email"
          value={userData.email ?? ""}
          onChange={(e) => handleFieldChange(e.target.value, "email")}
        />
      </FieldWithValidation>
      <FieldWithValidation validationError={passwordValidationError}>
        <input
          type="password"
          placeholder="Password"
          value={userData.password ?? ""}
          onChange={(e) => handleFieldChange(e.target.value, "password")}
        />
      </FieldWithValidation>

      <button
        disabled={startValidation && !isUserFormValid}
        onClick={() => registerHandle()}
      >
        Register
      </button>

      {isUserFormValid && <div>User Form has been validated successfuly</div>}
    </div>
  );
};
