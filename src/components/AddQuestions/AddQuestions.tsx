import * as React from 'react';
import './AddQuestions.css';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import { ReactElement, useState } from "react";
import { useDispatch } from "react-redux";
import { addNewQuestion } from "../../store/actions";
import { MultiSelectAnswers } from "../Question/Answers/MultiSelectAnswers";
import { RadioSelectAnswers } from "../Question/Answers/RadioSelectAnswers";
import { QUESTION_TYPE_ENUM } from "../Question/enum";
import { MultitpleSelectQuestion, QuestionType, RadioSelectionQuestion } from "../Question/types";
import { RadioGroup, FormControlLabel, Radio, FormControl, FormLabel, Button } from '@mui/material';

export const AddQuestions = () => {
    const [questionType, setQuestionType] = useState<QUESTION_TYPE_ENUM>(QUESTION_TYPE_ENUM.OPEN_TEXT)
    const [title, setTitle] = useState<string>('');
    const [answer, setAnswer] = useState<string>('');
    const [answers, setAnswers] = useState<string[]>([]);
    const [correctAnswer, setCorrectAnswer] = useState<number>(0);

    const dispatch = useDispatch();

    const onQuestionChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const questionType = (event.target as HTMLInputElement).value as QUESTION_TYPE_ENUM;
        setQuestionType(questionType)
    }

    const handleOnChange = (answers: string[]): void => {
        const newAnswers = [...answers];
        setAnswers(newAnswers);
    }

    const showQuestionType = (): ReactElement => {
        switch (questionType) {
            case QUESTION_TYPE_ENUM.RADIO_SELECTION:
                return <RadioSelectAnswers answers={answers} updateAnswers={handleOnChange} correctAnswerIndex={correctAnswer} />;
            case QUESTION_TYPE_ENUM.MULTIPLE_SELECT:
                return <MultiSelectAnswers answers={answers} updateAnswers={handleOnChange} />;
            case QUESTION_TYPE_ENUM.OPEN_TEXT:
            default:
                return <TextField id="outlined-basic" label="Enter an answer" variant="outlined" value={answer} onChange={event => setAnswer(event.target.value)} />;
        }
    }

    const addNewAnswer = (): void => {
        const newAnswers = [...answers, ''];
        setAnswers(newAnswers);
    }

    const resetQuestion = (): void => {
        setTitle('');
        setAnswer('');
        setAnswers([])
        setCorrectAnswer(0)
    }

    const canSaveQuestion = (): boolean => {
        return !title.length || (questionType !== QUESTION_TYPE_ENUM.OPEN_TEXT && !answers.length) || (questionType === QUESTION_TYPE_ENUM.OPEN_TEXT && !answer.length)
    }

    const saveQuestion = (): void => {
        switch (questionType) {
            case QUESTION_TYPE_ENUM.MULTIPLE_SELECT: {
                const question: MultitpleSelectQuestion = {
                    title,
                    type: questionType,
                    answers,
                }
                dispatch(addNewQuestion(question))
                break;
            }
            case QUESTION_TYPE_ENUM.RADIO_SELECTION: {
                const question: RadioSelectionQuestion = {
                    title,
                    type: questionType,
                    answers,
                    correctAnswerIndex: correctAnswer
                }
                dispatch(addNewQuestion(question))
                break;
            }
            case QUESTION_TYPE_ENUM.OPEN_TEXT:
            default: {
                const question: QuestionType = {
                    title,
                    type: questionType,
                    answer
                }
                dispatch(addNewQuestion(question))
                break;
            }
        }
        resetQuestion()
    }

    React.useEffect(() => {

    }, [questionType])

    return (
        <Container className='add-question-container' maxWidth="md">

            <FormControl>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                    onChange={onQuestionChange}
                >
                    <FormLabel id="demo-controlled-radio-buttons-group">Select Question Type:</FormLabel>

                    <FormControlLabel value={QUESTION_TYPE_ENUM.OPEN_TEXT} control={<Radio />} label="Open Text" />
                    <FormControlLabel value={QUESTION_TYPE_ENUM.RADIO_SELECTION} control={<Radio />} label="Radio Selection" />
                    <FormControlLabel value={QUESTION_TYPE_ENUM.MULTIPLE_SELECT} control={<Radio />} label="Multiple Selection" />
                </RadioGroup>
            </FormControl>
            <div className='question'>
                <FormControl>
                    <TextField required id="outlined-basic" label="Enter your question" variant="outlined" value={title} onChange={event => setTitle(event.target.value)} />
                    <FormLabel id="demo-controlled-radio-buttons-group">Answers:</FormLabel>
                    {showQuestionType()}
                    <div className='add-new-answer'>
                        <Button variant="contained" disabled={questionType === QUESTION_TYPE_ENUM.OPEN_TEXT} onClick={addNewAnswer}>Add new answer</Button>
                    </div>
                </FormControl>
            </div>
            <Button variant="contained" disabled={canSaveQuestion()} onClick={saveQuestion}>Save Question</Button>
        </Container>
    )
}