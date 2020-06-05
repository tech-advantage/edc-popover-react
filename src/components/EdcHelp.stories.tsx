import React, { FunctionComponent } from 'react'
import { EdcHelp } from './EdcHelp'
import { PopoverProvider } from '..'

export default { title: 'EdcHelp' }

export const withDefaultIcon: FunctionComponent = () => (
  <PopoverProvider
    pluginId='myedchelp'
    docPath='/doc'
    helpPath='/help'
    i18nPath='/doc/i18n'
  >
    <EdcHelp mainKey='a' subKey='b' />
  </PopoverProvider>
)

export const withCustomIcon: FunctionComponent = () => (
  <PopoverProvider
    pluginId='myedchelp'
    docPath='/doc'
    helpPath='/help'
    i18nPath='/doc/i18n'
    icon='fas fa-ad'
  >
    <EdcHelp mainKey='a' subKey='b' />
  </PopoverProvider>
)

export const withNoProvider: FunctionComponent = () => (
  <EdcHelp mainKey='a' subKey='b' />
)
