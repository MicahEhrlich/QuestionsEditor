import { QUESTION_TYPE_ENUM } from "./enum";

export type QuestionTypes = QuestionType | MultitpleSelectQuestion | RadioSelectionQuestion;

export interface QuestionType {
    type: QUESTION_TYPE_ENUM;
    title: string;
    answer?: string;
}

export interface MultitpleSelectQuestion extends QuestionType {
    answers: string[];
}

export interface RadioSelectionQuestion extends QuestionType {
    answers: string[];
    correctAnswerIndex: number;
}
