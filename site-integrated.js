/* AX’ETL integrated navigation and one-form enquiry routing.
   Does not create additional forms, use external network calls, or alter server data. */
(() => {
 'use strict';
 // Once the cinematic entry becomes the front page, internal Home links must
 // reach the actual Gutenberg Home page rather than return to the splash.
 document.querySelectorAll('a[href]').forEach(a=>{
   const raw=a.getAttribute('href');
   if(!raw)return;
   try{
     const url=new URL(raw,window.location.href);
     if(url.origin===window.location.origin && url.pathname==='/' && !url.search){
       a.setAttribute('href','/home-page/'+url.hash);
     }
   }catch(_error){}
 });
 const details=document.querySelector('.nav-services');
 if(details){
   document.addEventListener('click',event=>{
     if(details.open&&!details.contains(event.target))details.open=false;
   });
   document.addEventListener('keydown',event=>{
     if(event.key==='Escape')details.open=false;
   });
   details.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>details.open=false));
 }
 const contactForm=document.getElementById('contact-enquiry-form');
 if(!contactForm)return;
 const params=new URLSearchParams(window.location.search);
 const field=document.getElementById('contact-service');
 const project=document.getElementById('contact-project');
 const notice=document.getElementById('contact-service-context');
 const incoming=(params.get('service')||'').trim();
 if(field&&incoming){
   const available=[...field.options].some(option=>option.value===incoming&&!option.disabled);
   if(available){
     field.value=incoming;
     if(notice){
       notice.textContent='ENQUIRY SELECTED / '+incoming.toUpperCase();
       notice.hidden=false;
     }
   }
 }
 const topic=(params.get('topic')||'').trim().slice(0,180);
 if(topic&&project&&!project.value.trim()){
   project.value='I would like to discuss: '+topic+'\n\n';
 }
})();
