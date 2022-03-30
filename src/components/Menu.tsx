import { Box, Heading } from "@chakra-ui/react";
import LinkButton from "./LinkButton";

function StyledLinkButton({ to, text }: { to: string; text: string }) {
    return (
        <Box mb="2">
            <LinkButton to={to} text={text} />
        </Box>
    );
}

function Menu() {
    return (
        <>
            <Heading mb="5">Kana Quiz</Heading>
            <StyledLinkButton to="/multiple-choice" text="Multiple Choice" />
            <StyledLinkButton to="/text-input" text="Text Input" />
            <StyledLinkButton to="/statistics" text="Statistics" />
        </>
    );
}

export default Menu;
