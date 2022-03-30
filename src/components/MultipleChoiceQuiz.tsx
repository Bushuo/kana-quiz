import { Button, Stack } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import HiraImage from "./HiraImage";
import useQuiz from "../hooks/useQuiz";

function MultipleChoiceQuiz() {
    const { question, points, processAnswer, correctness } = useQuiz(
        () => void 0
    );

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
