import React from "react";
import CenterColumnLayout from "./components/CenterColumnLayout";
import MultipleChoiceQuiz from "./components/MultipleChoiceQuiz";
import StartQuiz from "./components/StartQuiz";
import LocalStorageService from "./services/LocalStorageService";
import { Heading } from "@chakra-ui/react";
import TextInputQuiz from "./components/TextInputQuiz";

type ServiceContextType = {
    store: LocalStorageService;
};
export const ServiceContext = React.createContext<ServiceContextType>(
    null as unknown as ServiceContextType
);

enum QuizState {
    Menu,
    MultipleChoice,
    TextInput,
}

function App() {
    const [quizState, setQuizState] = React.useState(QuizState.Menu);
    const [store] = React.useState(new LocalStorageService());
    React.useEffect(() => {
        store.initalize();
    }, [store]);

    return (
        <ServiceContext.Provider value={{ store }}>
            <CenterColumnLayout>
                {(() => {
                    switch (quizState) {
                        case QuizState.Menu:
                            return (
                                <>
                                    <Heading>Kana Quiz</Heading>
                                    <StartQuiz
                                        text="Multiple Choice"
                                        onStart={() =>
                                            setQuizState(
                                                QuizState.MultipleChoice
                                            )
                                        }
                                    />
                                    <StartQuiz
                                        text="Text Input"
                                        onStart={() =>
                                            setQuizState(QuizState.TextInput)
                                        }
                                    />
                                </>
                            );
                        case QuizState.MultipleChoice:
                            return (
                                <MultipleChoiceQuiz
                                    onFinish={() =>
                                        setQuizState(QuizState.Menu)
                                    }
                                />
                            );
                        case QuizState.TextInput:
                            return (
                                <TextInputQuiz
                                    onFinish={() =>
                                        setQuizState(QuizState.Menu)
                                    }
                                />
                            );
                        default:
                            return null;
                    }
                })()}
            </CenterColumnLayout>
        </ServiceContext.Provider>
    );
}

export default App;
