import React, { FunctionComponent } from 'react'
import {
  PopoverConfigContext,
  EdcPopoverProvider
} from './PopoverConfigProvider'

export default { title: 'PopoverConfigProvider' }

export const withExampleConsumer: FunctionComponent = () => (
  <EdcPopoverProvider
    pluginId='myedchelp'
    docPath='/doc'
    helpPath='/help'
    i18nPath='/doc/i18n'
  >
    <h1>No results should be empty</h1>
    <hr />
    <hr />
    <h4>Fetch plugin id from context (provider =&gt; consumer)</h4>
    <div>
      <PopoverConfigContext.Consumer>
        {(value): string => 'Result: ' + value.pluginId}
      </PopoverConfigContext.Consumer>
    </div>
    <hr />
    <h4>Fetch doc path from context (provider =&gt; consumer)</h4>
    <div>
      <PopoverConfigContext.Consumer>
        {(value): string => 'Result: ' + value.docPath}
      </PopoverConfigContext.Consumer>
    </div>
    <hr />
    <h4>Fetch help path from context (provider =&gt; consumer)</h4>
    <div>
      <PopoverConfigContext.Consumer>
        {(value): string => 'Result: ' + value.helpPath}
      </PopoverConfigContext.Consumer>
    </div>
    <hr />
    <h4>Fetch icon from context (provider =&gt; consumer)</h4>
    <div>
      <PopoverConfigContext.Consumer>
        {(value): string => 'Result: ' + value.icon}
      </PopoverConfigContext.Consumer>
    </div>
    <hr />
    <h4>Fetch i18n path from context (provider =&gt; consumer)</h4>
    <div>
      <PopoverConfigContext.Consumer>
        {(value): string => 'Result: ' + value.i18nPath}
      </PopoverConfigContext.Consumer>
    </div>
    <hr />
  </EdcPopoverProvider>
)
