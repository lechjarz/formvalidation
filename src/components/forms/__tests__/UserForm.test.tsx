import { render, screen, fireEvent } from "@testing-library/react";
import { UserForm } from "../UserForm";
import { passwordStrengthValidatorMessage } from "../../../validators/passwordStrengthValidator";
import { REQUIRED_VALIDATOR_MESSAGE } from "../../../validators/requiredValidator";
import { EMAIL_VALIDATOR_MESSAGE } from "../../../validators/emailValidator";

const FIRST_NAME = "John";
const LAST_NAME = "Smith";
const EMAIL = "jon.smith@test.com";
const PASSWORD = "SEC123";

describe("UserForm", () => {
  test("all input fields and register button renders", () => {
    render(<UserForm />);

    expect(screen.getByText("REGISTRATION FORM")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("First Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Last Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByText("Register")).toBeInTheDocument();
  });

  test("when it is displays initially should not show validation messages", () => {
    render(<UserForm />);

    expect(
      screen.queryByText(REQUIRED_VALIDATOR_MESSAGE)
    ).not.toBeInTheDocument();
    expect(screen.queryByText(EMAIL_VALIDATOR_MESSAGE)).not.toBeInTheDocument();
  });

  test("when register button is clicked with empty fields it should show validation errors ", () => {
    render(<UserForm />);

    const registerButton = screen.getByText("Register");
    fireEvent.click(registerButton);

    const firstNameField = screen.getByPlaceholderText("First Name");
    const lastNameField = screen.getByPlaceholderText("Last Name");
    const emailField = screen.getByPlaceholderText("Email");
    const passwordField = screen.getByPlaceholderText("Password");

    expect(firstNameField.closest(".field")?.textContent).toContain(
      REQUIRED_VALIDATOR_MESSAGE
    );
    expect(lastNameField.closest(".field")?.textContent).toContain(
      REQUIRED_VALIDATOR_MESSAGE
    );
    expect(emailField.closest(".field")?.textContent).toContain(
      REQUIRED_VALIDATOR_MESSAGE
    );
    expect(passwordField.closest(".field")?.textContent).toContain(
      REQUIRED_VALIDATOR_MESSAGE
    );
  });

  test("when incorect email format should validate", () => {
    render(<UserForm />);

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "invalidemail" },
    });
    fireEvent.click(screen.getByText("Register"));

    expect(screen.getByText(EMAIL_VALIDATOR_MESSAGE)).toBeInTheDocument();
  });

  test("when weak password should validate", () => {
    render(<UserForm />);

    const passwordField = screen.getByPlaceholderText("Password");

    fireEvent.change(passwordField, {
      target: { value: "123" },
    });
    fireEvent.click(screen.getByText("Register"));

    expect(passwordField.closest(".field")?.textContent).toContain(
      passwordStrengthValidatorMessage
    );
  });

  test("when form is valid should enable register button", () => {
    render(<UserForm />);

    fireEvent.change(screen.getByPlaceholderText("First Name"), {
      target: { value: FIRST_NAME },
    });
    fireEvent.change(screen.getByPlaceholderText("Last Name"), {
      target: { value: LAST_NAME },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: EMAIL },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: PASSWORD },
    });

    fireEvent.click(screen.getByText("Register"));

    expect(
      screen.queryByText(REQUIRED_VALIDATOR_MESSAGE)
    ).not.toBeInTheDocument();
    expect(screen.queryByText(EMAIL_VALIDATOR_MESSAGE)).not.toBeInTheDocument();
    expect(
      screen.getByText("User Form has been validated successfuly")
    ).toBeInTheDocument();
  });

  test("when form is invalid should disable register button", () => {
    render(<UserForm />);

    fireEvent.change(screen.getByPlaceholderText("First Name"), {
      target: { value: "" },
    });
    fireEvent.change(screen.getByPlaceholderText("Last Name"), {
      target: { value: "" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "invalidemail" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "abc" },
    });

    fireEvent.click(screen.getByText("Register"));

    expect(screen.getByText("Register")).toBeDisabled();
  });
});
