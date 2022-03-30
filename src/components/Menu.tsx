import { Heading } from "@chakra-ui/react";
import StartQuiz from "./StartQuiz";

function Menu() {
    return (
        <>
            <Heading>Kana Quiz</Heading>
            <StartQuiz to="/multiple-choice" text="Multiple Choice" />
            <StartQuiz to="/text-input" text="Text Input" />
        </>
    );
}

export default Menu;
