import { FontSizes } from 'components/Heading/Heading'
import {
  MarkdownHtmlComponent,
  MinimalColorComponent,
} from 'src/blocks/BaseBlockProps'
import {
  GlobalStory,
  LinkComponent,
  MenuItem,
} from 'src/storyblok/StoryContainer'

export const minimalColorMap: Record<string, MinimalColorComponent> = {
  standard: {
    _uid: '6ecde11d-ba0a-48fb-9b7b-e6dbf31415d9',
    color: 'standard',
    plugin: 'hedvig_minimal_color_picker',
  },
  'standard-inverse': {
    _uid: '6ecde11d-ba0a-48fb-9b7b-e6dbf31415d9',
    color: 'standard-inverse',
    plugin: 'hedvig_minimal_color_picker',
  },
  gray700: {
    _uid: '6ecde11d-ba0a-48fb-9b7b-e6dbf31415d9',
    color: 'gray700',
    plugin: 'hedvig_minimal_color_picker',
  },
  'gray500-inverse': {
    _uid: '6ecde11d-ba0a-48fb-9b7b-e6dbf31415d9',
    color: 'gray500-inverse',
    plugin: 'hedvig_minimal_color_picker',
  },
}

export const fontSizes: FontSizes[] = ['xxs', 'xs', 'sm', 'md', 'lg', 'xl']

export const link: LinkComponent = {
  id: '2',
  url: '/',
  linktype: 'url',
  cached_url: '/',
}

const headerMenuItems: MenuItem[] = [
  {
    _uid: '1',
    label: 'Vår service',
    link,
    component: 'menu_item',
  },
  {
    _uid: '2',
    label: 'Vårt skydd',
    link,
    component: 'menu_item',
  },
  {
    _uid: '3',
    label: 'Hemförsäkring',
    link,
    component: 'menu_item',
    menu_items: [
      {
        _uid: '11',
        label: 'Hyresrätt & Andrahand',
        link,
        component: 'menu_item',
      },
      {
        _uid: '12',
        label: 'Bostadsrätt',
        link,
        component: 'menu_item',
      },
      {
        _uid: '13',
        label: 'Student',
        link,
        component: 'menu_item',
      },
      {
        _uid: '14',
        label: 'Villa',
        link,
        component: 'menu_item',
      },
    ],
  },
  {
    _uid: '4',
    label: 'Om Hedvig',
    link,
    component: 'menu_item',
  },
]

const footerMenuItems: MenuItem[] = [
  {
    _uid: '1',
    label: 'Hemförsäkring',
    link,
    component: 'menu_item',
    menu_items: [
      {
        _uid: '11',
        label: 'Hyresrätt & Andrahand',
        link,
        component: 'menu_item',
      },
      {
        _uid: '12',
        label: 'Bostadsrätt',
        link,
        component: 'menu_item',
      },
      {
        _uid: '13',
        label: 'Student',
        link,
        component: 'menu_item',
      },
      {
        _uid: '14',
        label: 'Villa',
        link,
        component: 'menu_item',
      },
    ],
  },
  {
    _uid: '2',
    label: 'Hedvig',
    link,
    component: 'menu_item',
    menu_items: [
      {
        _uid: '11',
        label: 'Om oss',
        link,
        component: 'menu_item',
      },
      {
        _uid: '12',
        label: 'Service',
        link,
        component: 'menu_item',
      },
      {
        _uid: '13',
        label: 'FAQ',
        link,
        component: 'menu_item',
      },
      {
        _uid: '14',
        label: 'Hedvig Forever',
        link,
        component: 'menu_item',
      },
      {
        _uid: '15',
        label: 'Jobb',
        link,
        component: 'menu_item',
      },
      {
        _uid: '16',
        label: 'Kontakt',
        link,
        component: 'menu_item',
      },
    ],
  },
  {
    _uid: '3',
    label: 'Legal',
    link,
    component: 'menu_item',
    menu_items: [
      {
        _uid: '11',
        label: 'Legal',
        link,
        component: 'menu_item',
      },
      {
        _uid: '12',
        label: 'Personuppgifter',
        link,
        component: 'menu_item',
      },
      {
        _uid: '13',
        label: 'Villkor',
        link,
        component: 'menu_item',
      },
    ],
  },
  {
    _uid: '4',
    label: 'Social',
    link,
    component: 'menu_item',
    menu_items: [
      {
        _uid: '11',
        label: 'Instagram',
        link,
        component: 'menu_item',
      },
      {
        _uid: '12',
        label: 'Facebook',
        link,
        component: 'menu_item',
      },
      {
        _uid: '13',
        label: 'Twitter',
        link,
        component: 'menu_item',
      },
      {
        _uid: '14',
        label: 'Spotify',
        link,
        component: 'menu_item',
      },
      {
        _uid: '15',
        label: 'Medium',
        link,
        component: 'menu_item',
      },
    ],
  },
]

const footerText: MarkdownHtmlComponent = {
  _uid: '5',
  html:
    '<div><p>© Hedvig AB 2020</p></div><div><p>Hedvig HQ, Valhallavägen 117 K, SE–115 31, Stockholm, SWE Org. nr. 559093-0334</p></div>',
  original:
    '<div><p>© Hedvig AB 2020</p></div><div><p>Hedvig HQ, Valhallavägen 117 K, SE–115 31, Stockholm, SWE Org. nr. 559093-0334</p></div>',
  plugin: 'markdown-html',
}

const ratingText: MarkdownHtmlComponent = {
  _uid: '5',
  html: '<p>4,5 av 5 på <a href="#">Trustpilot</a></p>',
  original: '<p>4,5 av 5 på <a href="#">Trustpilot</a></p>',
  plugin: 'markdown-html',
}

const safetyText: MarkdownHtmlComponent = {
  _uid: '5',
  html:
    '<p>Hedvig backas av HDI med över 200 års erfarenhet och 600 miljarder kr på kontot – du är i trygga händer. Hedvig står under Finansinspektionens tillsyn.</p>',
  original:
    '<p>Hedvig backas av HDI med över 200 års erfarenhet och 600 miljarder kr på kontot – du är i trygga händer. Hedvig står under Finansinspektionens tillsyn.</p>',
  plugin: 'markdown-html',
}

const cookie_consent_message: MarkdownHtmlComponent = {
  _uid: '5',
  html:
    'Vi använder cookies, en liten datafil som lagras i din dator, för att hantera inloggningar, öka säkerheten för våra användare och förbättra de tjänster vi erbjuder. Om du inte vill att vi använder cookies kan du enkelt stänga av det i din browser. <a href="/legal">Läs mer</a>',
  original:
    'Vi använder cookies, en liten datafil som lagras i din dator, för att hantera inloggningar, öka säkerheten för våra användare och förbättra de tjänster vi erbjuder. Om du inte vill att vi använder cookies kan du enkelt stänga av det i din browser. <a href="/legal">Läs mer</a>',
  plugin: 'markdown-html',
}

const exampleBannerText: MarkdownHtmlComponent = {
  _uid: '1234',
  html:
    '<p><strong>Corona-viruset – <a href="https://www.hedvig.com/blog/coronaviruset">så fungerar din försäkring</a></strong></p>',
  original:
    '<p><strong>Corona-viruset – <a href="https://www.hedvig.com/blog/coronaviruset">så fungerar din försäkring</a></strong></p>',
  plugin: 'markdown-html',
}

const bannerColor: MinimalColorComponent = {
  _uid: '6ecde11d-ba0a-48fb-9b7b-e6dbf31415d9',
  color: 'purple500',
  plugin: 'hedvig_minimal_color_picker',
}

export const globalStoryMock: GlobalStory = {
  name: 'storybook mock',
  created_at: '',
  first_published_at: '',
  published_at: '',
  id: '',
  uuid: '',
  slug: '/storybook-mock',
  full_slug: '/storybook-mock',
  content: {
    _uid: '1234',
    page_title: '',
    component: 'global',
    header_menu_items: headerMenuItems,
    show_banner: false,
    banner_text: exampleBannerText,
    banner_color: bannerColor,
    show_cta: true,
    cta_label: 'Beräkna ditt pris',
    cta_link: link,
    footer_menu_items: footerMenuItems,
    footer_download_title: 'Ladda ner',
    footer_safety_title: 'Trygghet',
    footer_safety_body: safetyText,
    footer_rating_title: 'Betyg',
    footer_rating_paragraph: ratingText,
    footer_market_title: 'Marknad',
    footer_paragraph: footerText,
    peril_modal_info_title: 'Att tänka på',
    peril_modal_coverage_title: 'Det här täcks',
    peril_modal_exceptions_title: 'Undantag',
    cookie_consent_message: cookie_consent_message,
  },
}
