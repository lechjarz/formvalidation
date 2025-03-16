export type Validator<T> = {
    validate: (value: T) => boolean;
    message: string;
};

export type ValidatorConfig<T> = {
    [K in keyof T]?: Validator<T[K]>[];
};

