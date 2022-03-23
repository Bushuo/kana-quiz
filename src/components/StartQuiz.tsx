import React from "react";
import { Button } from "@chakra-ui/react";

interface IStartQuizProps {
    onStart: () => void;
    text: string;
}

function StartQuiz({ onStart, text }: IStartQuizProps) {
    return (
        <Button w="150px" mt="2" onClick={onStart}>
            {text}
        </Button>
    );
}

export default StartQuiz;
