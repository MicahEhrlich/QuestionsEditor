import { Answers } from "./Answers/Answers";
import { QuestionTypes } from "./types";

type QuestionPropTypes = {
    question: QuestionTypes;
    index: number;
}

export const Question = (props: QuestionPropTypes) => {
    const { question, index } = props;

    return (
        <div>
            <span>{question.title}</span>
            <div>
                <Answers question={question} index={index} />
            </div>
        </div>
    )
}