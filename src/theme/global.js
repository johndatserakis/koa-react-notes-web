import styled, { injectGlobal } from 'styled-components'

// Set main theme variables
const themeMain = {
    white: '#FFFFFF',
    black: '#333333',
    grey: '#eeeeee',
    blue: '#488ED8',
    yellow: 'yellow'
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

const Button = styled.button`
    font-size: 1rem;
    border-radius: 4px;
    padding: 0.25rem 1rem;
    margin: 0 1rem;
    background: ${props => props.theme.blue};
    color: ${props => props.theme.white};
`

export { themeMain, Button }