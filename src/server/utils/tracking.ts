import { min as createMinifiedSegmentSnippet } from '@segment/snippet'
import { config } from '../config'

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
const branch = `
(function(b,r,a,n,c,h,_,s,d,k){if(!b[n]||!b[n]._q){for(;s<_.length;)c(h,_[s++]);d=r.createElement(a);d.async=1;d.src="https://cdn.branch.io/branch-latest.min.js";k=r.getElementsByTagName(a)[0];k.parentNode.insertBefore(d,k);b[n]=h}})(window,document,"script","branch",function(b,r){b[r]=function(){b._q.push([r,arguments])}},{_q:[],_v:1},"addListener applyCode autoAppIndex banner closeBanner closeJourney creditHistory credits data deepview deepviewCta first getCode init link logout redeem referrals removeListener sendSMS setBranchViewData setIdentity track validateCode trackCommerceEvent logEvent disableTracking".split(" "), 0);
branch.init(${JSON.stringify(config.branchApiKey)});
`

const segmentSnippet = config.segmentApiKey
  ? createMinifiedSegmentSnippet({
      apiKey: config.segmentApiKey,
      page: true,
      load: true,
    })
  : ''

export const allTracking = [snap, branch, segmentSnippet].join(';\n')
