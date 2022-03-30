import { Heading, Input, Stack, Text } from "@chakra-ui/react";
import React from "react";
import useQuiz from "../hooks/useQuiz";
import HiraImage from "./HiraImage";

function TextInputQuiz() {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const { question, points, processAnswer, correctness } = useQuiz(() => {
        if (inputRef.current) {
            inputRef.current.value = "";
        }
    });

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
