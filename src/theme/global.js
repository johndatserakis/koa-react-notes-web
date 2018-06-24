import styled, { injectGlobal } from 'styled-components'
import { darken } from 'polished';

// Set main theme variables
export const themeMain = {
    white: '#FFFFFF',
    black: '#333333',
    grey: '#eeeeee',
    darkGrey: '#bbb',
    blue: '#488ED8',
    yellow: 'yellow',
    green: '#52C989'
}

// For gloabl css
injectGlobal`
    @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,700');
    @import url('https://cdn.jsdelivr.net/fontawesome/4.7.0/css/font-awesome.min.css');

    html {
        position: relative;
        height: 100%;
    }

    body {
        height: 100%;
        overflow-x: hidden;
        color: #333;
        font-weight: 400;
        background: #fff;
        font-family: 'Source Sans Pro', sans-serif;
    }

    #root {
        height: 100%;
    }

    input:not(:placeholder-shown):valid {
        border: 1px solid green;
    }

    input:not(:placeholder-shown):invalid {
        border: 1px solid #E15358;
        background: #e4c8c9;
    }
`

// Button
export const Button = styled.button`
    font-size: 1.1rem;
    border-radius: 4px;
    padding: 0.25rem 1rem;
    margin: 0;
    border: 1px solid ${props => props ? props.theme[props.styleType] : props.theme.blue};
    background: ${props => props ? props.theme[props.styleType] : props.theme.blue};
    color: ${props => props.theme.white};
    text-transform: uppercase;

    &:hover {
        background: ${props => props ? darken(0.10, props.theme[props.styleType]) : darken(0.10, props.theme[props.blue])};
        cursor: pointer;
    }

    &:active {
        background: ${props => props ? darken(0.15, props.theme[props.styleType]) : darken(0.15, props.theme[props.blue])};
    }
`

// Input
export const Input = styled.input`
    display: block;
    width: 100%;
    padding: .375rem .75rem;
    font-size: 1rem;
    line-height: 1.5;
    color: ${props => props.theme.black};
    background-color: ${props => props.theme.white};
    background-clip: padding-box;
    border: 1px solid ${props => props.theme.darkGrey};
    border-radius: 4px;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    margin-bottom: 15px;
`;

export const TextArea = styled.textarea`
    display: block;
    width: 100%;
    padding: .375rem .75rem;
    font-size: 1rem;
    line-height: 1.5;
    color: ${props => props.theme.black};
    background-color: ${props => props.theme.white};
    background-clip: padding-box;
    border: 1px solid ${props => props.theme.darkGrey};
    border-radius: 4px;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    margin-bottom: 15px;
`;

// User
export const UserActionPanel = styled.div`
    background: ${props => props.theme.blue};
    color: ${props => props.theme.white};
    padding: 30px 20px;
    border-radius: 4px;
`;