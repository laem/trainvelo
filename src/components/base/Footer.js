import React from 'react'
import styled from 'styled-components'

import ademe from './footer/ademe.jpg'
import repufrancaise from './footer/repufrancaise.jpg'

import Button from 'components/base/Button'
import MagicLink from 'components/base/MagicLink'
import ThemeToggle from 'components/base/ThemeToggle'
import Logo from './footer/Logo'
import Contact from './footer/Contact'

const Wrapper = styled.div`
  position: relative;
  background-color: ${(props) =>
    props.theme.colors[props.background || 'second']};
  transition: all 600ms;
`
const Content = styled.div`
  max-width: ${(props) => props.width || '37rem'};
  margin: 0 auto;
  padding: 2rem 1rem 1rem;
`
const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 1rem;

  p,
  h2 {
    color: ${(props) => props.theme.colors[props.color || 'text']};
  }
`
const CenterSection = styled(Section)`
  align-items: center;
`
const Text = styled.p``
const Title = styled.h2`
  font-size: 1.75rem;
`
const StyledButton = styled(Button)`
  align-self: center;
  margin-bottom: 1.5rem;
`
const LogosWrapper = styled.div`
  display: flex;
  justify-content: center;
`
const Logos = styled(MagicLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  text-decoration: none;
  background-color: white;
`
const Institution = styled.img`
  display: block;
  height: 5.625em;
`
const StyledLink = styled.button`
  display: inline;
  margin: 0;
  padding: 0;
  color: ${(props) => props.theme.colors.main};
  text-decoration: underline;
  background: transparent;
  border: none;
  cursor: pointer;
`
export default function Footer(props) {
  return (
    <Wrapper background={props.background} id='about'>
      <Content>
        <CenterSection>
          <StyledButton
            onClick={() => {
              window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth',
              })
              props.setConfiguratorOpen(true)
            }}
          >
            J'int??gre le simulateur ?? mon site
          </StyledButton>
          <ThemeToggle mobile />
        </CenterSection>
        <Section color={props.color}>
          <Title>D'ou viennent ces donn??es ?</Title>
          <Text>
            Ce simulateur r??utilise les donn??es de la{' '}
            <MagicLink to='https://www.bilans-ges.ademe.fr/fr/accueil/contenu/index/page/presentation/siGras/0'>
              Base Carbone
            </MagicLink>
            . Il s???agit d???une{' '}
            <strong>base de donn??es publique de facteurs d'??missions</strong>,
            n??cessaires ?? la r??alisation d???un bilan d?????missions de gaz ?? effet
            de serre (GES) et plus g??n??ralement tout exercice de comptabilit??
            carbone.
          </Text>
        </Section>
        <Section color={props.color}>
          <Title>
            Comment int??grer ces donn??es ?? mon site ou application ?
          </Title>
          <Text>
            <strong>
              Vous souhaitez afficher ce simulateur sur votre site ?
            </strong>
            <br />
            Personnalisez le et int??grez le facilement grace ??{' '}
            <StyledLink
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  left: 0,
                  behavior: 'smooth',
                })
                props.setConfiguratorOpen(true)
              }}
            >
              notre configurateur
            </StyledLink>
            .
          </Text>

          <Text>
            <strong>Vous souhaitez r??utiliser les donn??es brutes ?</strong>
            <br />
            Contactez nous ??{' '}
            <MagicLink to='mailto:datagir@ademe.fr'>
              datagir@ademe.fr
            </MagicLink>{' '}
            pour b??n??ficier de notre expertise et accompagnement.
          </Text>
          <Text>
            <strong>Vous souhaitez r??utiliser le code du simulateur ?</strong>
            <br />
            Ce simulateur est d??velopp?? de mani??re ouverte (open source).
            L???ensemble du code est{' '}
            <MagicLink to='https://github.com/datagir/monimpacttransport'>
              disponible librement
            </MagicLink>
            .
          </Text>
        </Section>
        <Section color={props.color}>
          <Title>Nous contacter</Title>
          <Text>
            Vous souhaitez nous contacter pour{' '}
            <strong>
              obtenir de l'aide sur l'int??gration des donn??es ou des simulateurs
            </strong>{' '}
            ? Ou alors pour{' '}
            <strong>
              nous signaler un bug, nous faire une suggestion ou donner votre
              avis sur ce simulateur
            </strong>{' '}
            ? Utilisez le formulaire ci???dessous :
          </Text>
          <Contact />
        </Section>
        <Section color={props.color}>
          <Title>Qui sommes-nous ?</Title>
          <Text>
            <MagicLink to='https://datagir.ademe.fr/'>
              <strong>Datagir</strong>
            </MagicLink>{' '}
            est un <strong>service public gratuit</strong>, port?? par l???
            <MagicLink to='https://www.ademe.fr/'>ADEME</MagicLink> et
            l???incubateur de la DINUM{' '}
            <MagicLink to='https://beta.gouv.fr/'>beta.gouv.fr</MagicLink>.
          </Text>
          <Text>
            Notre mission est de{' '}
            <strong>
              diffuser les informations et donn??es environnementales en
              open-data de l???ADEME
            </strong>{' '}
            pour encourager l???am??lioration continue et l???innovation. Pour cela,{' '}
            <strong>
              nous accompagnons toutes les applications & services dans leur
              d??marche responsable
            </strong>{' '}
            par l'appropriation et l???int??gration de ces donn??es afin d???apporter
            l???information au plus pr??s des citoyens.
          </Text>
        </Section>
      </Content>
      <LogosWrapper>
        <Logos to='https://datagir.ademe.fr/'>
          <Institution src={repufrancaise} alt='R??publique Fran??aise' />
          <Institution src={ademe} alt='ADEME' />
          <Logo />
        </Logos>
      </LogosWrapper>
    </Wrapper>
  )
}
