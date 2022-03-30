import { Heading, Input, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ServiceContext } from "../routes";
import HiraImage from "./HiraImage";

function TextInputQuiz() {
    const navigate = useNavigate();
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
            setTimeout(() => navigate("/"), timeout);
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
            <Stack alignItems="center" width="200px" height="60px">
                {correctness !== undefined ? (
                    correctness ? (
                        <Text fontSize="xl">Correct!</Text>
                    ) : (
                        <>
                            <Text fontSize="lg">Wrong!</Text>
                            <Heading fontSize="xl">
                                {question.hira.name}
                            </Heading>
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
