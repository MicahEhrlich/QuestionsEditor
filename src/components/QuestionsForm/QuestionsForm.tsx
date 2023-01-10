import { useSelector } from "react-redux"
import { QuestionsState } from "../../store/types"
import { Question } from "../Question/Question"
import { QuestionTypes } from "../Question/types"

export const QuestionsForm = () => {
    const questions = useSelector((state: QuestionsState) => state.questions)
    return (
        <div>
            {questions.map((question: QuestionTypes, index: number) =>
                <Question key={index} question={question} index={index} />
            )}
        </div>
    )
}