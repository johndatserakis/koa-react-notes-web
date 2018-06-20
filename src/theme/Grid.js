import styled from 'styled-components'
import { Flex, Box } from 'grid-styled'

const Container = styled(Box)`
  max-width: 1024px;
`
Container.defaultProps = {
  mx: 'auto'
}

Box.defaultProps = {
  px: [2, 2, 2, 0]
}

export { Container, Flex, Box }