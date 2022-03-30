import React from "react";
import { Button, Stack } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { ServiceContext } from "../App";
import HiraImage from "./HiraImage";
import { IQuizProps } from "../shared/types";

function MultipleChoiceQuiz({ onFinish }: IQuizProps) {
    const { store } = React.useContext(ServiceContext);

    const [points, setPoints] = React.useState(0);
    const [question, setQuestion] = React.useState(() => {
        const question = store.getHiraQuestion();
        return question;
    });
    const [correctness, setCorrectness] = React.useState<boolean | undefined>(
        undefined
    );

    const processAnswer = (answer: string) => {
        store.processAnswer(answer, question);

        const isCorrect = store.isCorrect(answer, question);
        const newPoints = isCorrect ? points + 1 : points;
        const timeout = isCorrect ? 1000 : 3000;
        const nextQuestion = store.getHiraQuestion();

        setCorrectness(isCorrect);
        setPoints(newPoints);

        if (newPoints === 10) {
            setTimeout(onFinish, timeout);
            return;
        }

        setTimeout(() => {
            setCorrectness(undefined);
            setQuestion(nextQuestion);
        }, timeout);
    };

    return (
        <>
            <Text fontSize="2xl" mb="10">
                {points}
            </Text>
            <HiraImage url={question.hira.url} />
            <Stack alignItems="center" width="200px" height="50px">
                {correctness !== undefined ? (
                    correctness ? (
                        <Text fontSize="xl">Correct!</Text>
                    ) : (
                        <>
                            <Text fontSize="lg">Wrong!</Text>
                            <Text fontSize="lg">{question.hira.name}</Text>
                        </>
                    )
                ) : (
                    ""
                )}
            </Stack>
            {question.answers.map((answer, i) => (
                <Button
                    mt="2"
                    w="20"
                    className="answer"
                    onClick={() => processAnswer(answer)}
                    key={`answer_${i}`}
                    _focus={{
                        outline: "none",
                    }}
                >
                    {answer}
                </Button>
            ))}
        </>
    );
}

export default MultipleChoiceQuiz;
