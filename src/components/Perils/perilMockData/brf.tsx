import { Peril } from '../types'

export const brfPerils: Peril[] = [
  {
    title: 'Eldsvåda',
    description:
      'En överhettad mobilladdare eller ett misslyckat försök att fritera pommes frites, bränder uppstår på de mest vardagliga vis. Om det börjar brinna i din lägenhet får du ersättning för brand- och rökskador.',
    covered: [
      'Eld som har brunnit med öppen låga (inte enbart glöd- eller svedskada)',
      'Explosion',
      'Plötslig skada av sot',
      'Blixt',
      'Frätande gas som bildats vid oavsiktlig upphettning av plast',
      'Sanering av sot orsakad av öppen låga',
    ],
    exceptions: ['Sprängningsarbete, sot eller levande ljus'],
    icon: {
      variants: {
        dark: {
          svgUrl: '/app-content-service/fire_dark.svg',
        },
        light: {
          svgUrl: '/app-content-service/fire.svg',
        },
      },
    },
  },
  {
    title: 'Vattenläcka',
    description:
      'Skyddet kan ge ersättning vid olika typer av vattenskador t.ex. om en tvättmaskin läckt okontrollerat eller ett badrum svämmat över. Du kan få ersättning både för att åtgärda skadorna på lägenheten samt för andra merkostnader under reparationen.',
    covered: [
      'Oberäknat vatten/ånga från vattenledningssytem',
      'Oberäknat vatten/ånga från badrum, kök eller tvättstuga',
      'Oberäknat vatten/ånga från värmepanna',
      'Läckage från kyl/frys',
      'Läckage från brandsläckare',
      'Läckage från tvättställ',
      'Läckage från akvarie',
    ],
    exceptions: [
      'Yt-och tätskikt installerats utan behörig installatör',
      'Skada på det föremål som har läckt',
      'Skada orsakat av takränna eller utvändigt stuprör',
    ],
    icon: {
      variants: {
        dark: {
          svgUrl: '/app-content-service/water_damage_dark.svg',
        },
        light: {
          svgUrl: '/app-content-service/water_damage.svg',
        },
      },
    },
  },
  {
    title: 'Inbrott',
    description:
      'Skyddet gäller när någon utan lov gjort inbrott eller förstört din bostadsrätt. Skyddet gäller självklart också för vinden och källaren.',
    covered: [
      'Allt du äger i din lägenhet till ett värde upp till 1 miljon kronor',
      'Inbrott och skadegörelse i din bostadsrätt inklusive. vind/källare',
    ],
    exceptions: [
      'Stöld av pengar, värdehandlingar och stöldbegärlig egendom (smycken, mobiltelefoner, datorer och allt annat dyrt) ifrån vind eller källarförråd eller ur bil',
    ],
    icon: {
      variants: {
        dark: {
          svgUrl: '/app-content-service/burglary_dark.svg',
        },
        light: {
          svgUrl: '/app-content-service/burglary.svg',
        },
      },
    },
  },
  {
    title: 'Stöld',
    description:
      'Vid stöld och skadegörelse av dina saker så täcks dem och ersätts av oss. Oavsett om du är hemma eller på flygande fot kan du alltid känna dig trygg med oss.',
    covered: [
      'Stöld och skadegörelse i ditt hem',
      'Stöld ur gemensamhetsutrymme, t.ex. cykel- eller barnvagnsförråd',
      'Stöld och skadegörelse av saker du tar med dig till ditt arbete eller hotellrum',
      'Stöld och skadegörelse vid förvaring hos t.ex. Shurguard',
      'Stöld utanför bostaden',
      'Stöld ur bil när du är på resa',
    ],
    exceptions: [
      'För vissa typer av saker, t.ex. pengar, hemelektronik, mobiltelefoner, datorer, kameror, sprit och smycken gäller speciella regler beroende på var stölden inträffat.',
    ],
    icon: {
      variants: {
        dark: {
          svgUrl: '/app-content-service/theft_dark.svg',
        },
        light: {
          svgUrl: '/app-content-service/theft.svg',
        },
      },
    },
  },
  {
    title: 'Skadegörelse',
    description:
      'Skyddet gäller när någon utan lov gjort inbrott eller förstört din bostadsrätt. Skyddet gäller självklart också för vinden och källaren.',
    covered: [
      'Sakerna i din lägenhet till ett värde upp till 1 miljon kronor',
      'Inbrott och skadegörelse i t.ex. vind/källare',
    ],
    exceptions: [
      'Stöld av pengar, värdehandlingar och stöldbegärlig egendom (smycken, mobiltelefoner, datorer och allt annat dyrt) ifrån biyta',
    ],
    icon: {
      variants: {
        dark: {
          svgUrl: '/app-content-service/criminal_damage_dark.svg',
        },
        light: {
          svgUrl: '/app-content-service/criminal_damage.svg',
        },
      },
    },
  },
  {
    title: 'Ansvarsskydd',
    description:
      'Vårt ansvarsskydd gäller när någon kräver dig på skadestånd för att ha skadat honom eller henne eller dennes ägodelar. Vi hjälper dig med utredning och förhandling och vi betalar både rättegångskostnader och skadestånd om du vållat skadan.',
    covered: [
      'T.ex. om ditt handfat gått sönder i en lägenhet',
      'T.ex. vattenskada från din lägenhet som drabbar grannarna',
      'T.ex. Hunden orsakar bitskador',
      'Utredning och förhandling',
      'Representation i domstol',
      'Max 5 000 000 kr i ersättning per försäkringsår och person/sakskada',
    ],
    exceptions: [
      'Skada i samband med arbete',
      'Skada orsakat av när du kört bil/fordon',
      'Uppsåtligt brott, t.ex. om du skadar någon/något med flit',
    ],
    icon: {
      variants: {
        dark: {
          svgUrl: '/app-content-service/liability_dark.svg',
        },
        light: {
          svgUrl: '/app-content-service/liability.svg',
        },
      },
    },
  },
  {
    title: 'Rättsskydd',
    description:
      'Vårt rättsskydd kan ge dig ersättning för att t.ex. anlita advokat/ombud om du hamnar i en rättslig tvist. Skyddet gäller i tvister som prövas i tingsrätt, hovrätt eller Högsta domstolen.',
    covered: [
      'Vårdnadstvist',
      'Arvstvist',
      'Fastighetstvist',
      'Advokat och representation i domstol',
      'Krav enligt skadeståndslagen',
      'Mellan 1 500 - 250 000 kr i ersättning, självrisk 20% av totalbeloppet',
    ],
    exceptions: [
      'Småmål enligt rättegångsbalken',
      'Uppsåtligt brott, t.e.x om du skadat någon/något med flit',
      'Uppsåtligt brott, t.ex. om du skadar någon/något med flit',
    ],
    icon: {
      variants: {
        dark: {
          svgUrl: '/app-content-service/legal_protection_dark.svg',
        },
        light: {
          svgUrl: '/app-content-service/legal_protection.svg',
        },
      },
    },
  },
  {
    title: 'Resetrubbel',
    description:
      'Du kan få ersättning om ditt bagage blir försenat på utresa. Och är du i ett land där det utbryter krig eller det sker en naturkatastrof, ja då flyger vi hem dig till Sverige och ersätter dig för de nödvändiga och skäliga kostnaderna.',
    covered: [
      'Reseskydd i 45 dagar, kan förlängas till max 90 dagar',
      'Evakuering vid krig',
      'Evakuering vid epidemi',
      'Evakuering vid naturkatastrof, jordskalv, vulkanutbrott',
      'Bagageförsening vid utresa',
      'Max 5000 kr i ersättning vid försenat bagage',
    ],
    exceptions: [
      'Hemresa från land som UD avråder folk från att resa till',
      'Förlorat bagage',
    ],
    icon: {
      variants: {
        dark: {
          svgUrl: '/app-content-service/travel_insurance_dark.svg',
        },
        light: {
          svgUrl: '/app-content-service/travel_insurance.svg',
        },
      },
    },
  },
  {
    title: 'Överfall',
    description:
      'Vårt överfallsskydd kan ge dig ersättning om du blir utsatt för brott, t.ex. misshandel, rån, ofredande eller våldtäkt. Skyddet kan också ge dig ersättning om du skulle bli utsatt för försök till brott.',
    covered: [
      'Misshandel (som inte är ringa) eller rån',
      'Grov misshandel med livshotande skada',
      'Grovt rån',
      'Ofredande om du är under 18 år',
      'Våldtäkt',
      'Mellan 8000 kr - 200 000 kr i ersättning, ingen självrisk',
    ],
    exceptions: [
      'Brott i samband med arbete eller när du medvetet blandar dig i bråk',
      'Överfallsskada i samband med upplopp / huliganism / våld i hemmet',
    ],
    icon: {
      variants: {
        dark: {
          svgUrl: '/app-content-service/assault_dark.svg',
        },
        light: {
          svgUrl: '/app-content-service/assault.svg',
        },
      },
    },
  },
  {
    title: 'Sjuk på resa',
    description:
      'Vårt reseskydd gäller de första 45 dagarna på din resa och ersätter kostnader om du blir akut sjuk, skadar dig eller får akuta tandskador. Vi flyger även hem dig till Sverige för vidare vård om det bedöms nödvändigt.',
    covered: [
      'Olycksfall, akut sjukdom, akuta tandbesvär',
      'Avbruten resa p.g.a att närstående person avlidit/allvarligt sjuk/skadad',
      'Läkarvård och logi',
      'Ingen självrisk',
      'Inget maxtak för ersättning',
    ],
    exceptions: [
      'Sjukdomstillstånd som var kända innan avresan',
      'Kampsport med kroppskontakt/Fallskärmshoppning/Skärmflygning',
    ],
    icon: {
      variants: {
        dark: {
          svgUrl: '/app-content-service/sick_on_holiday_dark.svg',
        },
        light: {
          svgUrl: '/app-content-service/sick_on_holiday.svg',
        },
      },
    },
  },
  {
    title: 'Vitvaror',
    description:
      'Du kan få ersättning om tvättmaskinen säckar ihop eller om annan elektrisk maskin eller apparat går sönder p.g.a. kortslutning, överslag eller överspänning. Och går frysen sönder kan du få ersättning för eventuellt skadat innehåll.',
    covered: [
      'Vitvaror/hushållsmaskiner p.g.a kortslutning, överslag eller överspänning',
      'Installation för värme, vatten, avlopp, ventilation, gas, el',
      'Glasrutor i fönster/dörrar i byggnaden',
      'Tvätt i tvättmaskin/torktumlare vid fel på maskinen',
      'Sanitetsgods',
      'Livsmedel i frys vid strömavbrott',
      'Egeninstallerad hiss (max 20.000 kr)',
    ],
    exceptions: [
      'Ytliga skador och skönhetsfel ersätts inte',
      'Värmeslingor i golv i badrum eller annat våtutrymme',
    ],
    icon: {
      variants: {
        dark: {
          svgUrl: '/app-content-service/appliance_damage_dark.svg',
        },
        light: {
          svgUrl: '/app-content-service/appliance_damage.svg',
        },
      },
    },
  },
  {
    title: 'Drulle',
    description:
      'Vår drulleförsäkring gäller när du har sönder saker som du äger genom en plötslig och oförutsedd händelse. Vi hjälper dig t.e.x när du spiller kaffe på datorn, tappar mobilen i marken eller sätter dig på glasögonen. Drulle ingår alltid utan extra kostnad.',
    covered: [
      'Plötslig och oförutsedd skada',
      'Plötslig och oförutsedd händelse',
      'T.ex. om du skulle spilla kaffe på din dator',
      'T.ex. om du tappar din mobiltelefon i marken',
      'T.ex. om du sätter dig på dina glasögon',
      'Max 50 000 kr i ersättning per förlorad eller skadad sak',
    ],
    exceptions: [
      'Lånad egendom t.ex. lånedator från jobbet/skolan',
      'Stöld av stöldbegärlig egendom (ex: kamera, smycke) i bil/lokal/biyta',
      'Stöld av pengar eller värdehandlingar',
    ],
    icon: {
      variants: {
        dark: {
          svgUrl: '/app-content-service/all_risk_dark.svg',
        },
        light: {
          svgUrl: '/app-content-service/all_risk.svg',
        },
      },
    },
  },
  {
    title: 'Bostadsrättstillägg',
    description:
      'Om man äger sin lägenhet är det skönt att ha en försäkring som täcker själva lägenheten också, inte bara prylarna som finns däri. På försäkringsspråk kallas det för bostadsrättstillägg. Hedvig ersätter kostnaden för att reparera skador på din lägenhet utan beloppsbegränsning - oavsett om du bor i studentlya eller paradvåning. Skönt!',
    covered: [
      'skador på fast inredning (typ ditt nya kök',
      'skador på ytskikt (typ dina nyfixade golv, tak eller väggar)',
    ],
    exceptions: ['Inget särskilt!'],
    icon: {
      variants: {
        dark: {
          svgUrl: '/app-content-service/brf_additional_dark.svg',
        },
        light: {
          svgUrl: '/app-content-service/brf_additional.svg',
        },
      },
    },
  },
]
