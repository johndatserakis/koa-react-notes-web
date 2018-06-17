import React from 'react';
import styled from 'styled-components'

const FooterSection = styled.section`
    background: ${props => props.theme.grey};
    padding: 30px 0;
    text-align: center;
    color: ${props => props.theme.black};
`;

class Footer extends React.Component {
    render() {
        return (
            <FooterSection>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <p>
                                <a href="https://github.com/johndatserakis">Koa-React-Notes</a> is a SPA using Koa (2.3) as the <a href="https://github.com/johndatserakis/koa-react-notes-api">backend</a> and React (16.4.1) as the <a href="https://github.com/johndatserakis/koa-react-notes-api">frontend</a>.
                            </p>
                        </div>
                    </div>
                </div>
            </FooterSection>
        );
    }
}

export default Footer