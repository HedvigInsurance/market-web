import React, { AnchorHTMLAttributes, DetailedHTMLProps } from 'react'
import styled from '@emotion/styled'
import {
  ButtonLinkBrandPivot,
  ButtonProps,
} from 'components/ButtonBrandPivot/Button'
import {
  getMinimalColorStyles,
  getSectionSizeStyle,
} from 'components/blockHelpers'
import { SectionSize } from 'utils/SectionSize'
import { minimalColorComponentColors } from '../BaseBlockProps'

interface WrapperProps {
  background?: minimalColorComponentColors
  size?: SectionSize
}

const Wrapper = styled.section<WrapperProps>(
  ({ background = 'standard', size = 'lg' }) => ({
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: getMinimalColorStyles(background).background,
    ...getSectionSizeStyle(size),
  }),
)

type ButtonLinkProps = ButtonProps<minimalColorComponentColors> &
  DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>

interface Props extends ButtonLinkProps {
  children: string
}

const Button: React.FC<Props> = ({ children, ...props }) => (
  <ButtonLinkBrandPivot fullWidth={true} {...props}>
    {children}
  </ButtonLinkBrandPivot>
)

const CallToActionBlock = {
  Wrapper,
  Button,
}

export default CallToActionBlock
