import { Button } from "@chakra-ui/react";
import React from "react";

interface IStartQuizProps {
    onStart: () => void;
}

function StartQuiz({ onStart }: IStartQuizProps) {
    return <Button onClick={onStart}>Start Quiz</Button>;
}

export default StartQuiz;
