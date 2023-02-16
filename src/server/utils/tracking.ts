export const gtmDevScript = {
  head: `<!-- Google Tag Manager -->
  <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl+ '&gtm_auth=JjXRUaZZaACoAL4xQQE0lw&gtm_preview=env-386&gtm_cookies_win=x';f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-5BCDJ2B');</script>
  <!-- End Google Tag Manager -->`,
  body: `<!-- Google Tag Manager (noscript) -->
  <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5BCDJ2B&gtm_auth=JjXRUaZZaACoAL4xQQE0lw&gtm_preview=env-386&gtm_cookies_win=x"
  height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
  <!-- End Google Tag Manager (noscript) -->`,
}

export const gtmProdScript = {
  head: `<!-- Google Tag Manager -->
  <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl+ '&gtm_auth=oslbzY6jCtH0Y2AoZVnZ2A&gtm_preview=env-2&gtm_cookies_win=x';f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-5BCDJ2B');</script>
  <!-- End Google Tag Manager -->`,
  body: `<!-- Google Tag Manager (noscript) -->
  <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5BCDJ2B&gtm_auth=oslbzY6jCtH0Y2AoZVnZ2A&gtm_preview=env-2&gtm_cookies_win=x"
  height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
  <!-- End Google Tag Manager (noscript) -->`,
}

export const allTracking = (
  nonce: string,
  appEnvironment: string = 'development',
  intercomAppId?: string,
) => `
<script nonce="${nonce}">
  dataLayer = [];
</script>

${appEnvironment === 'production' ? gtmProdScript.head : gtmDevScript.head}

${
  intercomAppId
    ? `
<script nonce="${nonce}">
  window.intercomSettings = {
    app_id: ${intercomAppId}
  };
</script>
<script nonce="${nonce}">
window.setTimeout(function() {
(function () { var w = window; var ic = w.Intercom; if (typeof ic === "function") { ic('reattach_activator'); ic('update', w.intercomSettings); } else { var d = document; var i = function () { i.c(arguments); }; i.q = []; i.c = function (args) { i.q.push(args); }; w.Intercom = i; var l = function () { var s = d.createElement('script'); s.type = 'text/javascript'; s.async = true; s.src = 'https://widget.intercom.io/widget/${intercomAppId}'; var x = d.getElementsByTagName('script')[0]; x.parentNode.insertBefore(s, x); }; l() } })();
}, 5000);
</script>
`
    : ''
}
`
