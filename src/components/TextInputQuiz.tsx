import { Input, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { ServiceContext } from "../App";
import { IQuizProps } from "../shared/types";
import HiraImage from "./HiraImage";

function TextInputQuiz({ onFinish }: IQuizProps) {
    const { store } = React.useContext(ServiceContext);
    const inputRef = React.useRef<HTMLInputElement>(null);

    const [points, setPoints] = React.useState(0);
    const [question, setQuestion] = React.useState(() => {
        const question = store.getHiraQuestion();
        return question;
    });
    const [correctness, setCorrectness] = React.useState<boolean | undefined>(
        undefined
    );

    const processAnswer = async (answer: string) => {
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
            if (inputRef.current) {
                inputRef.current.value = "";
            }
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
            <Input
                ref={inputRef}
                w="100"
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        processAnswer(e.currentTarget.value);
                    }
                }}
            />
        </>
    );
}

export default TextInputQuiz;
