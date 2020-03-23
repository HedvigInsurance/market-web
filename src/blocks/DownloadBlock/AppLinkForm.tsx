import styled from '@emotion/styled'
import { colors } from '@hedviginsurance/brand'
import Cookies from 'js-cookie'
import React from 'react'
import { TABLET_BP_UP } from '../../components/blockHelpers'
import { Button } from '../../components/buttons'
import { trackEvent } from '../../utils/tracking/trackEvent'
import { utmParamsToBranchLinkOptions } from '../../utils/tracking/utmToBranch'
import { DownloadSpinner } from './DownloadSpinner'

const CustomButton = styled(Button)<{ disabled: boolean; touched: boolean }>(
  ({ disabled, touched }) => ({
    backgroundColor: disabled && touched ? colors.LIGHT_GRAY : colors.GREEN,
    border: 0,
    marginBottom: '1rem',
    opacity: !touched ? 0.5 : 1,
    transition: 'background-color 250ms, opacity 250ms',
    whiteSpace: 'nowrap',
    '&:hover, &:focus': {
      backgroundColor: disabled && touched ? colors.LIGHT_GRAY : colors.GREEN,
    },
  }),
)
const Input = styled('input')<{ error: boolean }>(({ error }) => ({
  minWidth: '18rem',
  borderWidth: 2,
  borderStyle: 'solid',
  borderColor: error ? colors.PINK : colors.LIGHT_GRAY,
  borderRadius: 30,
  boxShadow: 'none',
  padding: '1em 1.5em',
  marginBottom: '1rem',
  outline: 'none',
  ':focus': { borderColor: colors.PURPLE },
  [TABLET_BP_UP]: {
    marginRight: '1rem',
  },
  [VERTICAL_BP]: {
    marginRight: 0,
  },
}))

const VERTICAL_BP = '@media (max-width: 1050px)'
const Form = styled('form')({
  display: 'flex',
  maxWidth: '100%',
  justifyContent: 'center',
  [VERTICAL_BP]: {
    flexDirection: 'column',
    maxWidth: 450,
    margin: '0 auto',
  },
})

const ErrorText = styled('p')({
  marginTop: '1rem',
  color: colors.PINK,
})

export interface AppLinkFormProps {
  phoneNumberPlaceholder: string
  ctaText: string
  errorText: string
  successText: string
  className?: string
  linkOptions?: { [key: string]: any }
}

interface State {
  phoneNumber: string
  hasErrors: boolean
  isSuccessful: boolean
  isSending: boolean
  isTouched: boolean
}

export class AppLinkForm extends React.PureComponent<AppLinkFormProps, State> {
  public state: State = {
    phoneNumber: '',
    hasErrors: false,
    isSuccessful: false,
    isSending: false,
    isTouched: false,
  }

  public handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()

    let { phoneNumber } = this.state
    phoneNumber = phoneNumber.trim()
    if (!phoneNumber) {
      return
    }
    // Default to Sweden if no country code
    if (!phoneNumber.match(/^\+/)) {
      phoneNumber = `+46${phoneNumber}`
    }

    this.setState({ isSending: true, hasErrors: false })

    const utmParams = Cookies.getJSON('utm-params') || {}
    const defaultBranchLinkOptions = {
      channel: 'hedvig',
      feature: 'send-sms',
    }
    // utmParams take precendent over default branch params
    const linkOptions = utmParamsToBranchLinkOptions(
      utmParams,
      defaultBranchLinkOptions,
    )
    ;(window as any).branch.sendSMS(
      phoneNumber,
      {
        ...linkOptions,
        data: {
          ...(this.props.linkOptions || {}),
          $custom_sms_text: 'Ladda ner Hedvig-appen: {{ link }}',
        },
      },
      { make_new_link: false },
      (err: Error) => {
        this.setState({ isSending: false })
        if (err) {
          this.setState({ hasErrors: true })
          console.log('Branch.sendSMS error', err) // tslint:disable-line no-console
          return
        }
        this.setState({ isSuccessful: true, phoneNumber: '' })
        trackEvent('Send app link sms')
      },
    )
  }

  public render() {
    return (
      <div className={this.props.className}>
        {this.state.isSuccessful ? (
          <div>{this.props.successText}</div>
        ) : (
          <Form onSubmit={this.handleSubmit}>
            <Input
              error={this.state.hasErrors}
              type="tel"
              placeholder={this.props.phoneNumberPlaceholder}
              value={this.state.phoneNumber}
              onChange={this.handleChange}
            />
            <CustomButton
              type="submit"
              disabled={!this.state.phoneNumber || this.state.isSending}
              touched={this.state.isTouched}
            >
              {this.props.ctaText}
            </CustomButton>
          </Form>
        )}
        {this.state.isSending && <DownloadSpinner />}
        {this.state.hasErrors && (
          <>
            <ErrorText>{this.props.errorText}</ErrorText>
          </>
        )}
      </div>
    )
  }

  private handleChange: React.ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    this.setState({ phoneNumber: event.target.value, isTouched: true })
  }
}
