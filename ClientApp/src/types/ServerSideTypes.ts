export interface IEntry {
    recaptchaResponse: string;
    email: string;
    firstName: string;
    lastName: string;
    answers: string;
    termsAndConditions: boolean;
    optIn?: boolean;
}

export interface IValidatedEntry extends IEntry {
}