import { FooterBlockBrandPivot } from 'blocks/FooterBlockBrandPivot'
import { HeaderBlockBrandPivot } from 'blocks/HeaderBlockBrandPivot'
import React from 'react'
import { withRouter } from 'react-router'
import { FourOhFourBlock } from '../blocks/FourOhFourBlock'

export const FourOhFourPage: React.ComponentType = withRouter(
  ({ staticContext }) => {
    if (staticContext) {
      ;(staticContext as any).statusCode = 404
    }
    return (
      <>
        <HeaderBlockBrandPivot
          is_transparent={true}
          inverse_colors={true}
          _uid="header"
          component="blog"
        />

        <FourOhFourBlock />

        <FooterBlockBrandPivot
          component="blog"
          _uid="footer"
          color={{
            _uid: 'footer',
            color: 'standard-inverse',
            plugin: 'hedvig_minimal_color_picker',
          }}
        />
      </>
    )
  },
)
