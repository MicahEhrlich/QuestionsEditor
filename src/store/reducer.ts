import { QuestionTypes } from '../components/Question/types';
import { QuestionAction, QuestionsState } from './types';

const initialState: QuestionsState = {
    questions: []
}

export function questionReducer(state: QuestionsState = initialState, action: QuestionAction) {
    switch (action.type) {
        case 'ADD_NEW_QUESTION': {
            const newQuestion: QuestionTypes = action.question;
            const updatedQuestions = [...state.questions];
            updatedQuestions.push(newQuestion);
            return { ...state, questions: updatedQuestions }
        }
        case 'UPDATE_QUESTION': {
            const updatedQuestion: QuestionTypes = action.question;
            const questionIndex = action.index;
            const updatedQuestions = [...state.questions];
            updatedQuestions[questionIndex] = updatedQuestion
            return { ...state, questions: updatedQuestions }
        }
        case 'REMOVE_QUESTION': {
            const questionIndex = action.index;
            const updatedQuestions = [...state.questions];
            updatedQuestions.splice(questionIndex, 1)
            return { ...state, questions: updatedQuestions }
        }
        default:
            return state
    }
}
