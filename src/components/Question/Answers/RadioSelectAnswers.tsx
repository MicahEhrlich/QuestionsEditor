import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { TextField } from '@mui/material';

type RadioSelectAnswersPropTypes = {
    answers: string[];
    correctAnswerIndex: number;
    updateAnswers?: (answers: string[], correctAnswer: number) => void;
}


export const RadioSelectAnswers = (props: RadioSelectAnswersPropTypes) => {
    const { answers, updateAnswers } = props;

    const handleOnChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, index: number) => {
        if (updateAnswers) {
            const newAnswers = [...answers];
            newAnswers[index] = event.target.value;
            updateAnswers(newAnswers, index);
        }
    }

    return <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
    >
        <FormLabel id="demo-controlled-radio-buttons-group">Select correct answer:</FormLabel>
        {answers?.map((answer: string, index: number) =>
            <React.Fragment key={index}>
                <FormControlLabel value={answer} control={<Radio />} label={answer} />
                <TextField required id="outlined-basic" label="Enter an answer" variant="outlined" value={answer} onChange={(event) => handleOnChange(event, index)} />
            </React.Fragment>
        )}
    </RadioGroup>
}
