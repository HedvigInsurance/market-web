import { PerilsCollection } from '../types'

export const brfPerils: PerilsCollection[] = [
  {
    id: 'SE_APARTMENT_BRF',
    label: 'Homeowner insurance',
    items: [
      {
        title: 'Fire',
        info: 'Be careful with candles and fires.',
        covered: [
          'Fire due to open flames (not just glow)',
          'Explosion',
          'Sudden damage caused by soot',
          'Lightning',
          'Corrosive gas created by unintentional burning of plastics',
          'Cleaning of soot caused by open fire',
        ],
        exceptions: ['Explosive work', 'Soot from lit candles'],
        icon: {
          variants: {
            dark: {
              svgUrl:
                'https://promise.hedvig.com/media/fire_dark_942da46f6f.svg',
            },
            light: {
              svgUrl: 'https://promise.hedvig.com/media/fire_97796e0790.svg',
            },
          },
        },
      },
      {
        title: 'Water leaks',
        info:
          'Make sure that faucets are sealed and turned off when not in use. Place drip trays that collect water below the fridge/freezer/washing machine. Make sure that the piping system and devices connected to it do not freeze. If you leave your apartment for more than seven days, shut the main water valve.',
        covered: [
          'Unexpected escape of liquid/steam from the pipework system, connected appliances or kitchen, laundry room and bathroom.',
          'Leaking fridge/freezer',
          'Leaking fire extinguisher',
          'Leaking sink',
          'Leaking aquarium',
        ],
        exceptions: [
          'Surface and water barrier installed by uncertified plumber',
          'Damage to the leaking unit itself',
          'Damage caused by roof gutters or external downspouts',
        ],
        icon: {
          variants: {
            dark: {
              svgUrl:
                'https://promise.hedvig.com/media/water_damage_dark_227105c1de.svg',
            },
            light: {
              svgUrl:
                'https://promise.hedvig.com/media/water_damage_e25b83cd0b.svg',
            },
          },
        },
      },
      {
        title: 'Burglary',
        info:
          'Lock doors and windows when no one is home. Do not label your keys with your street address to stop people from discovering where you live.',
        covered: [
          'Everything you own in your apartment up to a total value of SEK 1 million',
        ],
        exceptions: [
          'Theft of money, valuable documents and other theft-prone property (jewelry, mobile phones, computers and other expensive items) from ancillary areas',
        ],
        icon: {
          variants: {
            dark: {
              svgUrl:
                'https://promise.hedvig.com/media/burglary_dark_e79b95b4bc.svg',
            },
            light: {
              svgUrl:
                'https://promise.hedvig.com/media/burglary_946096433f.svg',
            },
          },
        },
      },
      {
        title: 'Theft and damage',
        info:
          'Always keep an eye on your gadgets, for example do not leave your camera alone on a coffee-house table. If you leave theft-prone property inside your car, always lock the car and hide gadgets. One last thing: always lock your bike.',
        covered: [
          'Theft or damage to your home',
          'Theft from common spaces, e.g. bike or stroller storage',
          'Theft or damage to possessions that you have taken to work or a hotel room',
          'Storage, e.g. Shurgard',
          'Theft outside the home',
          'Theft from car while travelling',
        ],
        exceptions: [
          'For some items, e.g. money, electronics, mobile phones, computers, cameras, liquor and jewelry, special rules apply depending on where the theft occurred.',
        ],
        icon: {
          variants: {
            dark: {
              svgUrl:
                'https://promise.hedvig.com/media/theft_dark_71deb24845.svg',
            },
            light: {
              svgUrl: 'https://promise.hedvig.com/media/theft_701fa78317.svg',
            },
          },
        },
      },
      {
        title: 'Criminal damage',
        info:
          'Lock doors and windows when no one is home. Do not label your keys with your street address to stop people from discovering where you live.',
        covered: [
          'Everything you own in your apartment up to a total value of SEK 1 million',
        ],
        exceptions: [
          'Theft of money, valuable documents and theft-prone property (jewelry, mobile phones, computers and other expensive property) from ancillary spaces',
        ],
        icon: {
          variants: {
            dark: {
              svgUrl:
                'https://promise.hedvig.com/media/criminal_damage_dark_b34c7450c7.svg',
            },
            light: {
              svgUrl:
                'https://promise.hedvig.com/media/criminal_damage_9f725dc7cf.svg',
            },
          },
        },
      },
      {
        title: 'Liability protection',
        info:
          'Contact us directly if someone is filing a claim against you. Never admit any guilt. We are here to help!',
        covered: [
          "E.g. damages to someone else's sink",
          'E.g. leak from your apartment that affects your neighbour',
          'E.g. your dog bites someone',
          'Investigation and negotiation',
          'Legal representation',
          'Compensation: Maximum SEK 5 Million',
        ],
        exceptions: [
          'Injury related to your work',
          'Damages from driving',
          'Intentional crime, e.g. if you injure someone on purpose',
        ],
        icon: {
          variants: {
            dark: {
              svgUrl:
                'https://promise.hedvig.com/media/liability_dark_164eb67626.svg',
            },
            light: {
              svgUrl:
                'https://promise.hedvig.com/media/liability_c331907aff.svg',
            },
          },
        },
      },
      {
        title: 'Legal protection',
        info:
          'You have to choose your own representation and that person needs to be a member of the Swedish law Society. Make sure your representative contacts us directly to see whether or not the legal protection is valid.',
        covered: [
          'Custody dispute',
          'Inheritance dispute',
          'Property dispute',
          'Legal representation',
          'Claims according to Tort Liability Act',
          'Compensation: SEK 1,500 - 250,000, 25% deductible',
        ],
        exceptions: [
          'Simplified litigation according to Code of Judicial Procedure',
          "Intentional crimes, e.g. if you've injured someone on purpose",
        ],
        icon: {
          variants: {
            dark: {
              svgUrl:
                'https://promise.hedvig.com/media/legal_protection_dark_bc536f7368.svg',
            },
            light: {
              svgUrl:
                'https://promise.hedvig.com/media/legal_protection_f6e65e1b13.svg',
            },
          },
        },
      },
      {
        title: 'Travel insurance',
        info:
          'Report delayed luggage to your air carrier and make sure to get a PIR report as proof that your luggage is delayed or missing.',
        covered: [
          'Travel coverage first 45 days',
          'Evacuation in the event of war',
          'Evacuation in the event of an epidemic',
          'Evacuation in the event of natural catastrophes, earthquake or volcanic eruption',
        ],
        exceptions: [
          'Travelling home from places the Swedish Ministry of Foreign Affairs warns you to not travel to',
          'Lost luggage',
        ],
        icon: {
          variants: {
            dark: {
              svgUrl:
                'https://promise.hedvig.com/media/travel_insurance_dark_79cb1c4e58.svg',
            },
            light: {
              svgUrl:
                'https://promise.hedvig.com/media/travel_insurance_ed0fa95fdf.svg',
            },
          },
        },
      },
      {
        title: 'Assault',
        info:
          'How you act in various situations affects the level of compensation. If you intervene in a fight or if you are under the influence of alcohol or drugs, then compensation will be lowered or of zero value.',
        covered: [
          'Assault or robbery',
          'Aggravated assault with life threatening damages',
          'Aggravated robbery',
          'Persecution aged 18 and under',
          'Rape',
          'Compensation: SEK 8,000 - 200,000, no deductible',
        ],
        exceptions: [
          'Crimes in connection to work or if you intervened in a fight',
          'Damages in connection to rioting / hooliganism / domestic violence',
        ],
        icon: {
          variants: {
            dark: {
              svgUrl:
                'https://promise.hedvig.com/media/assault_dark_f53ce07038.svg',
            },
            light: {
              svgUrl: 'https://promise.hedvig.com/media/assault_d371c026ac.svg',
            },
          },
        },
      },
      {
        title: 'Travel illness',
        info:
          'Always contact us directly through our app or by calling Hedvig Global Assistance on +45 38 48 94 61.',
        covered: [
          'Casualty, acute illness, acute dental issues',
          'Cancelled travel due to a closely related person dying / becoming seriously ill or injured',
          'Medical assistance and accommodation',
          'No deductible',
          'No maximum limit for reimbursement',
        ],
        exceptions: [
          'Illness or medical condition known before departure',
          'Martial arts with body contact / sky diving / paragliding',
        ],
        icon: {
          variants: {
            dark: {
              svgUrl:
                'https://promise.hedvig.com/media/sick_on_holiday_dark_3e0e5a0dc5.svg',
            },
            light: {
              svgUrl:
                'https://promise.hedvig.com/media/sick_on_holiday_17b3f1899c.svg',
            },
          },
        },
      },
      {
        title: 'White goods',
        info: "There's nothing special for you to think about.",
        covered: [
          'White goods/home appliances due to short circuit, over voltage or high voltage',
          'Installations of heating, water supply, sewerage, ventilation and gas',
          'Windows panes',
          'Clothes due to washing machine/dryer problems',
          'Sanitary ware (e.g. toilet and sink)',
          'Food in freezer due to power outage',
          'Self-installed elevator (Maximum SEK 20,000)',
        ],
        exceptions: [
          'Superficial damages and beauty defects',
          'Underfloor heating in bathrooms or other wet spaces',
        ],
        icon: {
          variants: {
            dark: {
              svgUrl:
                'https://promise.hedvig.com/media/appliance_damage_dark_03df6c1df9.svg',
            },
            light: {
              svgUrl:
                'https://promise.hedvig.com/media/appliance_damage_2a23c61a09.svg',
            },
          },
        },
      },
      {
        title: 'All-risk',
        info:
          "Take your mobile phone (theft-prone property) with you when leaving your car. Don't leave valuable property in your basement (ancillary space). If you check-in jewelry or watches in your bag while travelling, we will not be able to compensate you if they are lost.",
        covered: [
          'Unforeseen damages',
          'Unforeseen events',
          'E.g. you spilled coffee on your laptop',
          'E.g. you dropped your phone in the toilet',
          'E.g. you sat on your glasses',
          'Compensation: SEK 50,000, max, per claim',
        ],
        exceptions: [
          'Borrowed property, e.g. work computer',
          'Theft-prone property from car/ancillary area, e.g camera, jewelry',
          'Theft of cash or valuable documents',
        ],
        icon: {
          variants: {
            dark: {
              svgUrl:
                'https://promise.hedvig.com/media/all_risk_dark_c6f43f63a6.svg',
            },
            light: {
              svgUrl:
                'https://promise.hedvig.com/media/all_risk_eba77dfb03.svg',
            },
          },
        },
      },
      {
        title: 'Tenant ownership',
        info: "There's nothing special for you to think about",
        covered: [
          'Water or fire damage on interior, e.g. your new kitchen',
          'Water or fire damage on surfaces, e.g. your new floor',
        ],
        exceptions: ["There's nothing special for you to think about"],
        icon: {
          variants: {
            dark: {
              svgUrl:
                'https://promise.hedvig.com/media/brf_additional_dark_d5688cc8e6.svg',
            },
            light: {
              svgUrl:
                'https://promise.hedvig.com/media/brf_additional_51b2fb160a.svg',
            },
          },
        },
      },
    ],
  },
]
