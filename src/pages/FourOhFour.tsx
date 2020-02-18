import * as React from 'react'
import { withRouter } from 'react-router'
import { FooterBlock } from '../blocks/FooterBlock'
import { FourOhFourBlock } from '../blocks/FourOhFourBlock'
import { HeaderBlock } from '../blocks/HeaderBlock'

export const FourOhFourPage: React.ComponentType = withRouter(
  ({ staticContext }) => {
    if (staticContext) {
      ;(staticContext as any).statusCode = 404
    }
    return (
      <>
        <HeaderBlock
          is_transparent={false}
          inverse_colors={false}
          _uid="header"
          component="blog"
        />

        <FourOhFourBlock />

        <FooterBlock
          component="blog"
          _uid="footer"
          color={{
            _uid: 'footer',
            color: 'standard-inverse',
            plugin: 'hedvig_minimal_color_picker' as 'hedvig_minimal_color_picker',
          }}
        />
      </>
    )
  },
)
