import { QuestionTypes } from "../components/Question/types";
import { QuestionAction } from "./types";


export function addNewQuestion(question: QuestionTypes): QuestionAction {
    return {
        type: 'ADD_NEW_QUESTION', 
        question
    }
}

export function removeQuestion(index: number): QuestionAction {
    return {
        type: 'REMOVE_QUESTION', 
        index
    }
}

export function updateQuestion(question: QuestionTypes, index: number): QuestionAction {
    return {
        type: 'UPDATE_QUESTION', 
        question, 
        index
    }
}