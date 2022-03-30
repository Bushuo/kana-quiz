import React from "react";
import { useNavigate } from "react-router-dom";
import { ServiceContext } from "../routes";

function useQuiz(onNextQuestion: () => void) {
    const { store } = React.useContext(ServiceContext);
    const navigate = useNavigate();
    const [points, setPoints] = React.useState(0);
    const [question, setQuestion] = React.useState(() =>
        store.getHiraQuestion()
    );
    const [correctness, setCorrectness] = React.useState<boolean | undefined>(
        undefined
    );

    const processAnswer = (answer: string) => {
        store.processAnswer(answer, question);

        const isCorrect = store.isCorrect(answer, question);
        const newPoints = isCorrect ? points + 1 : points;
        const timeout = isCorrect ? 1000 : 3000;
        const nextQuestion = store.getHiraQuestion(question);

        setCorrectness(isCorrect);
        setPoints(newPoints);

        if (newPoints === 10) {
            setTimeout(() => navigate("/"), timeout);
            return;
        }

        setTimeout(() => {
            setCorrectness(undefined);
            setQuestion(nextQuestion);
            onNextQuestion();
        }, timeout);
    };

    return {
        points,
        question,
        correctness,
        processAnswer,
    };
}

export default useQuiz;
