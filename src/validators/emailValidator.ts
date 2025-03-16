import { Maybe } from "../components/types";
import { Validator } from "./validatorTypes";

export const EMAIL_VALIDATOR_MESSAGE =  'Please provide the correct email'

export const emailValidator: Validator<Maybe<string>>  = {
    validate :(email: Maybe<string>): boolean => {
        if(!email){
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },
    message: EMAIL_VALIDATOR_MESSAGE,
}