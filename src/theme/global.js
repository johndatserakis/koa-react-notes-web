import styled, { injectGlobal } from 'styled-components'
import { darken } from 'polished';

// Set main theme variables
const themeMain = {
    white: '#FFFFFF',
    black: '#333333',
    grey: '#eeeeee',
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
`

// Button
const Button = styled.button`
    font-size: 1rem;
    border-radius: 4px;
    padding: 0.25rem 1rem;
    margin: 0;
    border: 1px solid ${props => props ? props.theme[props.styleType] : props.theme.blue};
    background: ${props => props ? props.theme[props.styleType] : props.theme.blue};
    color: ${props => props.theme.white};



    // &:hover {
    //     background: ${props => darken(0.10, props.theme.blue)};
    // }
`

const Input = styled.input`
    display: block;
    width: 100%;
    padding: .375rem .75rem;
    font-size: 1rem;
    line-height: 1.5;
    color: ${props => props.theme.black};
    background-color: ${props => props.theme.white};
    background-clip: padding-box;
    border: 1px solid ${props => props.theme.grey};
    border-radius: 4px;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    margin-bottom: 15px;
`;

// User
const UserActionPanel = styled.div`
    background: ${props => props.theme.blue};
    color: ${props => props.theme.white};
    padding: 30px 20px;
    border-radius: 4px;
`;

export { themeMain, Button, Input, UserActionPanel }