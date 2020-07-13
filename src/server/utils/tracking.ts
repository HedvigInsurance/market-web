const snap = `
 (function(win, doc, sdk_url){
    if(win.snaptr) return;
    var tr=win.snaptr=function(){
    tr.handleRequest? tr.handleRequest.apply(tr, arguments):tr.queue.push(arguments);
  };
    tr.queue = [];
    var s='script';
    var new_script_section=doc.createElement(s);
    new_script_section.async=!0;
    new_script_section.src=sdk_url;
    var insert_pos=doc.getElementsByTagName(s)[0];
    insert_pos.parentNode.insertBefore(new_script_section, insert_pos);
  })(window, document, 'https://sc-static.net/scevent.min.js');
    snaptr('init','2615a7c0-d8e9-4ae6-9914-814a1017010d')
    snaptr('track','PAGE_VIEW')
`

export const allTracking = (nonce: string) => `
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-113416531-1"></script>
<script nonce="${nonce}">
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'UA-113416531-1');
</script>

<!-- Hotjar Tracking Code for https://www.hedvig.com/new-member -->
<script nonce="${nonce}">
    (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:1068935,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
</script>

<script nonce="${nonce}">
${[snap].join(';\n')}
</script>


<script nonce="${nonce}">
  window.intercomSettings = {
    app_id: "ziqa7goa"
  };
</script>
<script nonce="${nonce}">
window.setTimeout(() => {
(function () { var w = window; var ic = w.Intercom; if (typeof ic === "function") { ic('reattach_activator'); ic('update', w.intercomSettings); } else { var d = document; var i = function () { i.c(arguments); }; i.q = []; i.c = function (args) { i.q.push(args); }; w.Intercom = i; var l = function () { var s = d.createElement('script'); s.type = 'text/javascript'; s.async = true; s.src = 'https://widget.intercom.io/widget/ziqa7goa'; var x = d.getElementsByTagName('script')[0]; x.parentNode.insertBefore(s, x); }; l() } })();
}, 5000);
</script>
`
