import { Maybe } from "../components/types";
import { Validator } from "./validatorTypes";

export const REQUIRED_VALIDATOR_MESSAGE = 'Field is required' 

export const requiredValidator: Validator<Maybe<string>>  = {
    validate : ( value : Maybe<string>) => value !== undefined && value !== null && value !== '',
    message: REQUIRED_VALIDATOR_MESSAGE,
}