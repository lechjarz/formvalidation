import { ValidatorConfig,  } from "./validatorTypes";

export const formValidator = <T>(data: T, validatorConfig: ValidatorConfig<T>) => {
    const validationResults: Partial<{ [K in keyof T]: string[] }> = Object.keys(validatorConfig).reduce(
        (acc, fieldKey) => {
            const key = fieldKey as keyof T;
            const validators = validatorConfig[key] || [];

            const validationFieldResult = validators
                .map((validator) => (!validator.validate(data[key]) ? validator.message : undefined))
                .filter((message): message is string => Boolean(message));

            return validationFieldResult.length > 0
                ? { ...acc, [key]: validationFieldResult }
                : acc;
        },
        {} as Partial<{ [K in keyof T]: string[] }>
    );

    return {
        isFormValid: Object.keys(validationResults).length === 0,
        isFieldValid: (key: keyof T): boolean => !validationResults[key],
        getValidationMessage: (key: keyof T): string | undefined => validationResults[key]?.[0],
    };
};