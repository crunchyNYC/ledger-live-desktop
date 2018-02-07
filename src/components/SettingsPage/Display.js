// @flow

import React, { PureComponent } from 'react'
import { translate } from 'react-i18next'

import type { SettingsDisplay, T } from 'types/common'

import Box, { Card } from 'components/base/Box'
import Button from 'components/base/Button'
import Label from 'components/base/Label'
import Select from 'components/base/Select'

type InputValue = SettingsDisplay

type Props = {
  t: T,
  settings: SettingsDisplay,
  onSaveSettings: Function,
}
type State = {
  inputValue: InputValue,
}

class TabProfile extends PureComponent<Props, State> {
  state = {
    inputValue: {
      language: this.props.settings.language,
      orderAccounts: this.props.settings.orderAccounts,
    },
  }

  getDatas() {
    const { t } = this.props

    return {
      languages: [
        {
          key: 'en',
          name: t('language.en'),
        },
        {
          key: 'fr',
          name: t('language.fr'),
        },
      ],
      orderAccounts: [
        {
          key: 'custom',
          name: t('orderAccounts.custom'),
        },
        {
          key: 'name',
          name: t('orderAccounts.name'),
        },
        {
          key: 'balance',
          name: t('orderAccounts.balance'),
        },
        {
          key: 'type',
          name: t('orderAccounts.type'),
        },
      ],
    }
  }

  handleChangeInput = (key: $Keys<InputValue>) => (value: $Values<InputValue>) =>
    this.setState(prev => ({
      inputValue: {
        ...prev.inputValue,
        [key]: value,
      },
    }))

  handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { onSaveSettings } = this.props
    const { inputValue } = this.state

    onSaveSettings({
      ...inputValue,
    })
  }

  render() {
    const { t } = this.props
    const { inputValue } = this.state

    const { languages, orderAccounts } = this.getDatas()

    const currentLanguage = languages.find(l => l.key === inputValue.language)
    const currentOrderAccounts = orderAccounts.find(l => l.key === inputValue.orderAccounts)

    return (
      <form onSubmit={this.handleSubmit}>
        <Card flow={3}>
          <Box flow={1}>
            <Label>{t('settings.display.language')}</Label>
            <Select
              onChange={item => this.handleChangeInput('language')(item.key)}
              renderSelected={item => item && item.name}
              value={currentLanguage}
              items={languages}
            />
          </Box>
          <Box flow={1}>
            <Label>{t('settings.display.orderAccounts')}</Label>
            <Select
              onChange={item => this.handleChangeInput('orderAccounts')(item.key)}
              renderSelected={item => item && item.name}
              value={currentOrderAccounts}
              items={orderAccounts}
            />
          </Box>
          <Box horizontal justify="flex-end">
            <Button primary type="submit">
              Save
            </Button>
          </Box>
        </Card>
      </form>
    )
  }
}

export default translate()(TabProfile)