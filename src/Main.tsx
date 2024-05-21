import App from "./game/App.tsx";
import ReactDOM from "react-dom/client";
// import React from 'react';

// ReactDOM.createRoot(document.getElementById('root')!).render(
//    <React.StrictMode>
//        <App />
//    </React.StrictMode>
// );

ReactDOM.createRoot(document.getElementById("root")!).render(
    <App versionInfo="BUILD [2024-05-12 16:04:42]" />,
);
