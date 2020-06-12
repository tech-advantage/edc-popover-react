import React, { FunctionComponent } from 'react'
import { EdcHelp } from './EdcHelp'
import { PopoverProvider } from '..'
import { HelperFactory } from '../helper/HelperFactory'

export default { title: 'EdcHelp' }

type ProviderProps = {
  docPath?: string
  helpPath?: string
  i18nPath?: string
  icon?: string
  helpFactory?: HelperFactory
}

function DefaultProvider(
  props: ProviderProps & { children: React.ReactNode }
): JSX.Element {
  return (
    <PopoverProvider
      {...{
        ...{
          pluginId: 'edc',
          docPath: './doc',
          helpPath: 'https://demo.easydoccontents.com/help',
          i18nPath: './doc/i18n',
          lang: 'en'
        },
        ...props
      }}
    >
      {props.children}
    </PopoverProvider>
  )
}

export const withDefaultIcon: FunctionComponent = () => (
  <DefaultProvider>
    <EdcHelp mainKey='fr.techad.edc' subKey='documentation_type' />
  </DefaultProvider>
)

export const withCustomIcon: FunctionComponent = () => (
  <DefaultProvider icon='fas fa-ad'>
    <EdcHelp mainKey='fr.techad.edc' subKey='documentation_type' />
  </DefaultProvider>
)

export const withCustomLanguage: FunctionComponent = () => (
  <DefaultProvider>
    <EdcHelp mainKey='fr.techad.edc' subKey='documentation_type' lang='fr' />
  </DefaultProvider>
)

export const withHoverTrigger: FunctionComponent = () => (
  <DefaultProvider>
    <EdcHelp
      mainKey='fr.techad.edc'
      subKey='documentation_type'
      trigger='hover'
    />
  </DefaultProvider>
)

export const withNoProvider: FunctionComponent = () => (
  <EdcHelp mainKey='fr.techad.edc' subKey='documentation_type' />
)

export const withFailingDocPath: FunctionComponent = () => (
  <DefaultProvider
    docPath='nonexistingdocpath'
    helpPath='ohno'
    i18nPath='ohnono'
    helpFactory={new HelperFactory()}
  >
    <EdcHelp
      mainKey='fr.techad.edc'
      subKey='documentation_type'
      trigger='hover'
    />
  </DefaultProvider>
)

export const withWrongKeys: FunctionComponent = () => (
  <DefaultProvider>
    <EdcHelp mainKey='fr.techad.edc' subKey='nonexistingkey' trigger='hover' />
  </DefaultProvider>
)
