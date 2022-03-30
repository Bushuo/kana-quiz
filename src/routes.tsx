import React from "react";
import { Route, Routes as RRRoutes } from "react-router-dom";
import CenterColumnLayout from "./components/CenterColumnLayout";
import LocalStorageService from "./services/LocalStorageService";
import Menu from "./components/Menu";
import MultipleChoiceQuiz from "./components/MultipleChoiceQuiz";
import TextInputQuiz from "./components/TextInputQuiz";
import Statistics from "./components/Statistics";

type ServiceContextType = {
    store: LocalStorageService;
};
export const ServiceContext = React.createContext<ServiceContextType>(
    null as unknown as ServiceContextType
);

function Routes() {
    const [store] = React.useState(new LocalStorageService());
    React.useEffect(() => {
        store.initalize();
    }, [store]);

    return (
        <ServiceContext.Provider value={{ store }}>
            <RRRoutes>
                <Route element={<CenterColumnLayout />}>
                    <Route path="/" element={<Menu />} />
                    <Route
                        path="/multiple-choice"
                        element={<MultipleChoiceQuiz />}
                    />
                    <Route path="/text-input" element={<TextInputQuiz />} />
                </Route>
                <Route path="/statistics" element={<Statistics />} />
            </RRRoutes>
        </ServiceContext.Provider>
    );
}

export default Routes;
