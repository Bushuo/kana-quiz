import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface ILinkButtonProps {
    to: string;
    text: string;
}

function LinkButton({ to, text }: ILinkButtonProps) {
    return (
        <Link to={to}>
            <Button w="150px">{text}</Button>
        </Link>
    );
}

export default LinkButton;
