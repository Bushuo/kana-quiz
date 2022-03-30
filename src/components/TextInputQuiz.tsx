import {
    Button,
    Heading,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    Text,
} from "@chakra-ui/react";
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
            <InputGroup size="md" w="100">
                <Input
                    ref={inputRef}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            processAnswer(e.currentTarget.value);
                        }
                    }}
                />
                <InputRightElement width="4.5rem">
                    <Button
                        h="1.75rem"
                        size="sm"
                        onClick={() =>
                            processAnswer(inputRef.current?.value ?? "")
                        }
                    >
                        Enter
                    </Button>
                </InputRightElement>
            </InputGroup>
        </>
    );
}

export default TextInputQuiz;
