import React from 'react'

export const Norway: React.FC = () => (
  <svg fill="none" width={32} height={23} viewBox="0 0 32 23">
    <mask id="a" width="32" height="23" x="0" y="0" maskUnits="userSpaceOnUse">
      <path
        fill="#fff"
        d="M29.714 0H2.286A2.286 2.286 0 000 2.286V20.57a2.286 2.286 0 002.286 2.286h27.428A2.286 2.286 0 0032 20.571V2.286A2.286 2.286 0 0029.714 0z"
      />
    </mask>
    <g mask="url(#a)">
      <path fill="#fff" d="M13.714 0H9.143v22.857h4.571V0z" />
      <path fill="#fff" d="M32 9.143H0v4.571h32V9.143z" />
      <path
        fill="#F14247"
        d="M0 13.714h9.143v9.143H0v-9.143zm32 0v9.143H13.714v-9.143H32zM32 0v9.143H13.714V0H32zM9.143 9.143H0V0h9.143v9.143z"
      />
      <path
        fill="#0A3A85"
        d="M0 12.19h10.666v10.667h1.525V12.191H32v-1.525H12.19V0h-1.524v10.666H0v1.525z"
      />
    </g>
  </svg>
)
