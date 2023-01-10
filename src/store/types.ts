import { QuestionTypes } from "../components/Question/types";

type ADD_NEW_QUESTION = 'ADD_NEW_QUESTION';
type UPDATE_QUESTION = 'UPDATE_QUESTION';
type REMOVE_QUESTION = 'REMOVE_QUESTION';

export type QUESTION_ACTION = ADD_NEW_QUESTION | UPDATE_QUESTION | REMOVE_QUESTION;

export type QuestionAction =
    { type: ADD_NEW_QUESTION, question: QuestionTypes } |
    { type: UPDATE_QUESTION, question: QuestionTypes, index: number } |
    { type: REMOVE_QUESTION, index: number };

export interface QuestionsState {
    questions: QuestionTypes[]
}
