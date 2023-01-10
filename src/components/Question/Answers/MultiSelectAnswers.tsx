import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { TextField } from '@mui/material';
import { ChangeEvent } from 'react';

type MultiSelectAnswersPropTypes = {
    answers: string[]
    updateAnswers?: (answers: string[]) => void;
}


export const MultiSelectAnswers = (props: MultiSelectAnswersPropTypes) => {
    const { answers, updateAnswers } = props;

    const handleOnChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, index: number) => {
        if (updateAnswers) {
            const newAnswers = [...answers];
            newAnswers[index] = event.target.value;
            updateAnswers(newAnswers);
        }
    }
    return <FormGroup>
        {answers?.map((answer: string, index: number) =>
            <React.Fragment key={index}>
                <FormControlLabel control={<Checkbox />} label={answer} />
                <TextField id="outlined-basic" label="Enter an answer" variant="outlined" value={answer} disabled={!updateAnswers} onChange={(event) => handleOnChange(event, index)} />
            </React.Fragment>
        )}
    </FormGroup>
}