import React from "react";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface IStartQuizProps {
    to: string;
    text: string;
}

function StartQuiz({ to, text }: IStartQuizProps) {
    return (
        <Link to={to}>
            <Button w="150px" mt="2">
                {text}
            </Button>
        </Link>
    );
}

export default StartQuiz;
