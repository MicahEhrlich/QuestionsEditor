import { Button, FormControl, TextField } from "@mui/material"
import { ReactElement, useState } from "react"
import { useDispatch } from "react-redux"
import { QUESTION_TYPE_ENUM } from "../enum"
import { MultitpleSelectQuestion, QuestionTypes, RadioSelectionQuestion } from "../types"
import { MultiSelectAnswers } from "./MultiSelectAnswers"
import { RadioSelectAnswers } from "./RadioSelectAnswers"
import { removeQuestion, updateQuestion } from "../../../store/actions";


type AnswersPropTypes = {
    question: QuestionTypes,
    index: number
}

export const Answers = (props: AnswersPropTypes) => {
    const { question, index } = props;

    const [title, setTitle] = useState<string>(question.title);

    const dispatch = useDispatch();

    const displayAnswersByType = (): ReactElement => {
        switch (question.type) {
            case QUESTION_TYPE_ENUM.MULTIPLE_SELECT: {
                const multiSelectQuestion = question as MultitpleSelectQuestion;
                const { answers } = multiSelectQuestion;
                return <MultiSelectAnswers answers={answers} />;
            }
            case QUESTION_TYPE_ENUM.RADIO_SELECTION: {
                const radioSelectionQuestion = question as RadioSelectionQuestion;
                const { answers, correctAnswerIndex } = radioSelectionQuestion;
                return <RadioSelectAnswers answers={answers} correctAnswerIndex={correctAnswerIndex} />
            }
            case QUESTION_TYPE_ENUM.OPEN_TEXT:
            default:
                return <TextField id="outlined-basic" label="Enter an answer" variant="outlined" value={question.answer} />;

        }
    }

    const onDeleteQuestion = (): void => {
        dispatch(removeQuestion(index))
    }

    const onUpdateQuestion = (): void => {
        question.title = title
        dispatch(updateQuestion(question, index));


    }

    return (
        <FormControl>
            <TextField id="outlined-basic" label="Update question title" variant="outlined" value={title} onChange={event => setTitle(event.target.value)} />
            {displayAnswersByType()}
            <Button variant="contained" color="error" onClick={onDeleteQuestion}>Delete</Button>
            <Button variant="contained" color="secondary" onClick={onUpdateQuestion}>Update</Button>
        </FormControl>)
}