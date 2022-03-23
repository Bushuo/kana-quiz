import React, { useEffect } from "react";
import CenterColumnLayout from "./components/CenterColumnLayout";
import Quiz from "./components/Quiz";
import StartQuiz from "./components/StartQuiz";
import LocalStorageService from "./services/LocalStorageService";

type ServiceContextType = {
    store: LocalStorageService;
};
export const ServiceContext = React.createContext<ServiceContextType>(
    null as unknown as ServiceContextType
);

function App() {
    const [started, setStarted] = React.useState(false);
    const [store] = React.useState(new LocalStorageService());
    useEffect(() => {
        store.initalize();
    }, [store]);

    return (
        <ServiceContext.Provider value={{ store }}>
            <CenterColumnLayout>
                {started ? (
                    <Quiz onFinish={() => setStarted(false)} />
                ) : (
                    <StartQuiz onStart={() => setStarted(true)} />
                )}
            </CenterColumnLayout>
        </ServiceContext.Provider>
    );
}

export default App;
