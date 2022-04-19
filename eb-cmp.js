var ebCMP=function(exports){'use strict';var FUNCTIONNAMES;(function(FUNCTIONNAMES){FUNCTIONNAMES[FUNCTIONNAMES['doWeHaveConsent']=0]='doWeHaveConsent';FUNCTIONNAMES[FUNCTIONNAMES['getAllConsents']=1]='getAllConsents'})(FUNCTIONNAMES||(FUNCTIONNAMES={}));exports.CONSENTNAMES=void 0;(function(CONSENTNAMES){CONSENTNAMES['fullconsent']='fullconsent';CONSENTNAMES['iab']='iab';CONSENTNAMES['marketing']='marketing';CONSENTNAMES['preferences']='preferences';CONSENTNAMES['statistics']='statistics'})(exports.CONSENTNAMES||(exports.CONSENTNAMES={}));exports.CONSENTTEXTS=void 0;(function(CONSENTTEXTS){CONSENTTEXTS['fullconsent']='Tillad alle';CONSENTTEXTS['iab']='Tillad alle';CONSENTTEXTS['marketing']='Marketing';CONSENTTEXTS['preferences']='Præferencer';CONSENTTEXTS['statistics']='Statistik'})(exports.CONSENTTEXTS||(exports.CONSENTTEXTS={}));let hasFullIABConsent$1=false;let ready=false;const STATE={ready:false,waitlist:[]};function setupDone(){STATE.ready=true;handleWaiting()}function handleWaiting(){STATE.waitlist.forEach((cb=>{cb()}))}function isReady(callback){if(STATE.ready){callback()}else{STATE.waitlist.push(callback)}}const CONSENTSTATE={set hasFullIABConsent(input){hasFullIABConsent$1=input},get hasFullIABConsent(){return hasFullIABConsent$1},isReady:isReady,list:[],set ready(readyState){ready=readyState},get ready(){return ready},setupDone:setupDone};function checkSingleVendor(consentTo){const{consent:cookiebotConsent}=window.Cookiebot;switch(consentTo){case exports.CONSENTNAMES.fullconsent:return cookiebotConsent.marketing&&cookiebotConsent.preferences&&cookiebotConsent.statistics;case exports.CONSENTNAMES.iab:return CONSENTSTATE.hasFullIABConsent;case exports.CONSENTNAMES.marketing:return cookiebotConsent.marketing;case exports.CONSENTNAMES.preferences:return cookiebotConsent.preferences;case exports.CONSENTNAMES.statistics:return cookiebotConsent.statistics;default:return false}}const componentName='ebCMP';function doWeHaveConsent(options,recheck=false){const{callback:callback,defaultResponse:defaultResponse,previousConsent:previousConsent,consentTo:consentTo}=options;const defaultConsent=defaultResponse!==null&&defaultResponse!==void 0?defaultResponse:false;try{let consent=false;CONSENTSTATE.isReady((()=>{consent=checkSingleVendor(consentTo);if(consent!==previousConsent){callback(consent,recheck);options.previousConsent=consent}if(!recheck)CONSENTSTATE.list.push({fn:FUNCTIONNAMES.doWeHaveConsent,options:options})}))}catch(err){callback(defaultConsent,true);window.ebLog({component:componentName,label:'doWeHaveConsent',level:'ERROR',message:`${err.message}`})}}function getAllConsents(cb,recheck=false){CONSENTSTATE.isReady((()=>{const returnObject={[exports.CONSENTNAMES.fullconsent]:checkSingleVendor(exports.CONSENTNAMES.fullconsent),[exports.CONSENTNAMES.iab]:checkSingleVendor(exports.CONSENTNAMES.iab),[exports.CONSENTNAMES.marketing]:checkSingleVendor(exports.CONSENTNAMES.marketing),[exports.CONSENTNAMES.preferences]:checkSingleVendor(exports.CONSENTNAMES.preferences),[exports.CONSENTNAMES.statistics]:checkSingleVendor(exports.CONSENTNAMES.statistics)};cb(returnObject);if(!recheck)CONSENTSTATE.list.push({fn:FUNCTIONNAMES.getAllConsents,options:cb})}))}function getPurposeText(consentTo){switch(consentTo){case exports.CONSENTNAMES.fullconsent:case exports.CONSENTNAMES.iab:return exports.CONSENTTEXTS.fullconsent;case exports.CONSENTNAMES.marketing:return exports.CONSENTTEXTS.marketing;case exports.CONSENTNAMES.preferences:return exports.CONSENTTEXTS.preferences;case exports.CONSENTNAMES.statistics:return exports.CONSENTTEXTS.statistics;default:return exports.CONSENTTEXTS.fullconsent}}const noConsentGroup=()=>!CONSENTSTATE.hasFullIABConsent;function consentCheck(recheck=false){const list=CONSENTSTATE.list;list.forEach((listItem=>{const{fn:fn,options:options}=listItem;switch(fn){case FUNCTIONNAMES.doWeHaveConsent:doWeHaveConsent(options,recheck);break;case FUNCTIONNAMES.getAllConsents:getAllConsents(options,recheck);break}}))}const hasFullIABConsent=tcData=>Object.entries(tcData.purpose.consents).length>0&&Object.entries(tcData.vendor.consents).length>0;exports.consentID='';window.addEventListener('CookiebotOnConsentReady',(()=>{try{if(window.Cookiebot.consent[exports.CONSENTNAMES.marketing]){window.__tcfapi('getTCData',2,(tcData=>{CONSENTSTATE.hasFullIABConsent=hasFullIABConsent(tcData);CONSENTSTATE.setupDone()}))}else{CONSENTSTATE.hasFullIABConsent=false;CONSENTSTATE.setupDone()}exports.consentID=window.Cookiebot&&window.Cookiebot.consentID?window.Cookiebot.consentID:'';consentCheck(true)}catch(err){CONSENTSTATE.hasFullIABConsent=false;CONSENTSTATE.setupDone();window.ebLog({component:componentName,label:'CookiebotOnConsentReady',level:'ERROR',message:`${err.message}`})}}));function editConsent(){window.Cookiebot.renew()}exports.loadStatus='unset';window.addEventListener('load',(()=>{exports.loadStatus=window.Cookiebot.consent?'loaded':'error';if(exports.loadStatus==='error'){window.ebLog({component:componentName,label:'CookiebotLoad',level:'ERROR',message:'Cookiebot load error'})}}));exports.doWeHaveConsent=doWeHaveConsent;exports.editConsent=editConsent;exports.getAllConsents=getAllConsents;exports.getPurposeText=getPurposeText;exports.noConsentGroup=noConsentGroup;Object.defineProperty(exports,'__esModule',{value:true});return exports}({});
