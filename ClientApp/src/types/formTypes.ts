export interface QuizFormData {
  RecaptchaResponse: string;
  FirstName: string;
  LastName: string;
  Email: string;
  confirmEmail: string;
  Answers: string;
  TermsAndConditions: boolean;
  OptIn: boolean;
}