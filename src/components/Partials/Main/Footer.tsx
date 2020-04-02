// import React from 'react';
// import styled from 'styled-components'
// import { Container, Flex, Box } from 'theme/Grid'

// const FooterSection = styled.section`
//     background: ${props => props.theme.grey};
//     padding: 30px 0;
//     text-align: center;
//     color: ${props => props.theme.black};
// `;

// class Footer extends React.Component {
//     render() {
//         return (
//             <FooterSection>
//                 <Container>
//                     <Flex>
//                         <Box mx={'auto'}>
//                             <div>
//                                 <a href="https://github.com/johndatserakis">Koa-React-Notes</a> is a SPA using Koa (2.3) as the <a href="https://github.com/johndatserakis/koa-react-notes-api">backend</a> and React (16.8.3) as the <a href="https://github.com/johndatserakis/koa-react-notes-api">frontend</a>.
//                             </div>
//                         </Box>
//                     </Flex>
//                 </Container>
//             </FooterSection>
//         );
//     }
// }

// export default Footer

import React, { Fragment } from "react";
import { Layout } from 'antd';

export const Footer = () => {
  return (
    <Fragment>
      <Layout.Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Layout.Footer>
    </Fragment>
  )
}
