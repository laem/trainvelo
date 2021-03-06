import React, { Suspense, useContext } from 'react'
import styled from 'styled-components'

import UXContext from 'utils/UXContext'
import StyleContext from 'utils/StyleContext'
import Header from 'components/layout/Header'
import IframeFooter from 'components/base/IframeFooter'
const Map = React.lazy(() => import('components/layout/Map'))

const Wrapper = styled.div``
const Content = styled.div`
  position: relative;
  max-width: 46rem;
  margin: 0 auto 2em;

  ${(props) => props.theme.mq.small} {
    width: auto;
    margin: 0 3vw 2em;
  }
`
export default function Iframe(props) {
  const { map } = useContext(UXContext)
  const { theme } = useContext(StyleContext)

  return (
    <Wrapper>
      {theme === 'default' && map && (
        <Suspense fallback={''}>
          <Map />
        </Suspense>
      )}
      <Content>
        <Header iframe />
        {props.children}
      </Content>
      <IframeFooter about='https://monimpacttransport.fr' />
    </Wrapper>
  )
}
