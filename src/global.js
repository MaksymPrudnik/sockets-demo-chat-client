import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    *,
    *::after,
    *::before {
        box-sizing: border-box;
    }

    body {
        background: ${({ theme }) => theme.body};
        color: ${({ theme }) => theme.color};
        paddign: 0;
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
            'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
            sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        transition: all 0.25s linear;
    }

    button:hover {
        cursor: pointer;
    }
    
    *:focus {
        outline: none;
    }
    
    .App {
        height: 100vh;
        text-align: center;
        display: flex;
        flex-direction: column;
    }
    
    .central-view {
        display: flex;
        height: 100%;
        overflow: auto;
    }
    
    .messages {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        overflow: auto;
    }
    
    @media (max-width: 600px) {
        .messages-hidden {
            display: none;
    }
}`;
