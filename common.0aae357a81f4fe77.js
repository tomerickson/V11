"use strict";(self.webpackChunkv11=self.webpackChunkv11||[]).push([[592],{7936:(O,R,s)=>{s.d(R,{U:()=>A});var d=s(9212),e=s(2401);class i extends e.C{constructor(P,u){super(P,u,1)}}var f=s(145),T=s(6414),g=s(8045);const _=["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"];var a=s(8309),C=s(4221);let A=(()=>{class E{constructor(){this.store=(0,d.f3M)(C.yh),this.config=(0,d.f3M)(f._Z),this.crud=(0,d.f3M)(T.I),this.page="list_results.php",this.getAllResultsPage=u=>this.crud.getPage(this.page),this.refreshResults=u=>{const t=new FormData;t.append("doit","refresh"),t.append("order",u);const y=(0,g.Fj)(t);return this.crud.postPage(this.page,y)},this.extractResultsTable=u=>{const p=(new DOMParser).parseFromString(u,"text/html").body.querySelector("table.results").rows[0].cells[0].innerText,h=new i(u,[p]);return h.reactionResults.splice(0,1),h.reactionResults=h.reactionResults.map(v=>this.rowHandler(v)),h},this.rowHandler=u=>{const t={};return t.query=u[0],t.size=u[1],t.date=(E=>{let P=new Date(0);const u=RegExp("^(\\d{2}).(\\w{3}).(\\d{4}).(\\d{2}).(\\d{2}).(\\d{2})$"),t=E.match(u);if(t&&t.length>6){const y=+t[3],l=_.findIndex(F=>F===t[2].toLowerCase());P=new Date(y,l,+t[1],+t[4],+t[5],+t[6])}return P})(u[2]),t.link=(0,g.GM)(u[3]),t},this.navigate=u=>{this.store.dispatch(a.Nw.setPage({payload:u}))},this.openLink=u=>{window.open(`${this.config.apiUrl}${u}`,"_blank","noreferrer, noopener")}}static#e=this.\u0275fac=function(t){return new(t||E)};static#t=this.\u0275prov=d.Yz7({token:E,factory:E.\u0275fac})}return E})()},4292:(O,R,s)=>{s.d(R,{q:()=>d});class d{constructor(){this._year=(new Date).getFullYear(),this.s_Category="",this.s_Author="",this.s_Year_from=this._year.toString(),this.s_Year_to=this._year.toString()}}},9693:(O,R,s)=>{s.d(R,{s:()=>i});var d=s(9212),e=s(2655);let i=(()=>{class f{constructor(g,_){this._elementRef=g,this._router=_}ngOnInit(){console.log("htmldirective oninit")}ngOnChanges(){if(console.log("htmldirective onchanges"),this.html){this._uniqueId||=[...this._elementRef.nativeElement.attributes].find(_=>_.name.startsWith("_ngcontent-")).name,this._elementRef.nativeElement.innerHTML=this.html;const g=this._elementRef.nativeElement.querySelectorAll("*");for(const _ of g)if(_.setAttribute(this._uniqueId,""),"A"===_.tagName){const x=_.href?.toLowerCase();x?.startsWith(location.origin.toLowerCase())&&_.addEventListener("click",a=>{this._router.navigate([x.substring(location.origin.length)]),a.preventDefault()})}}else this._elementRef.nativeElement.innerHTML=null}static#e=this.\u0275fac=function(_){return new(_||f)(d.Y36(d.SBq),d.Y36(e.F0))};static#t=this.\u0275dir=d.lG2({type:f,selectors:[["","mfmp-html",""]],inputs:{html:"html"},standalone:!0,features:[d.TTD]})}return f})()},2070:(O,R,s)=>{s.d(R,{O:()=>T});var d=s(6814),e=s(5940),i=s(5195),f=s(9212);let T=(()=>{class g{static#e=this.\u0275fac=function(a){return new(a||g)};static#t=this.\u0275cmp=f.Xpm({type:g,selectors:[["mfmp-progress-spinner"]],standalone:!0,features:[f.jDz],decls:2,vars:0,consts:[["mode","indeterminate",1,"progress-spinner"]],template:function(a,C){1&a&&(f.TgZ(0,"div"),f._UZ(1,"mat-progress-spinner",0),f.qZA())},dependencies:[d.ez,i.QW,e.Cq,e.Ou],styles:["div[_ngcontent-%COMP%]{width:100%}.progress-spinner[_ngcontent-%COMP%]{margin-top:3em;margin-left:auto;margin-right:auto}"]})}return g})()},5226:(O,R,s)=>{s.d(R,{t:()=>u});var d=s(6814),e=s(9212),i=s(6223),f=s(5683),T=s(2032),g=s(2202);function _(t,y){if(1&t&&(e.TgZ(0,"div")(1,"mat-label"),e._uU(2),e.qZA()()),2&t){const l=e.oxw(4);e.xp6(2),e.Oqu(l.label)}}function x(t,y){if(1&t&&e.YNc(0,_,3,1,"div"),2&t){const l=e.oxw(3);e.um2(0,l.label?0:-1)}}function a(t,y){if(1&t){const l=e.EpF();e.TgZ(0,"mat-slider",2),e.NdJ("change",function(h){e.CHM(l);const v=e.oxw(3);return e.KtG(v.handleSliderChange(h))}),e._UZ(1,"input",3),e.qZA()}if(2&t){const l=e.oxw(3);e.Q6J("min",l.minimum)("max",l.maximum)("step",l.step)}}function C(t,y){if(1&t&&(e.TgZ(0,"label",4),e._uU(1),e.qZA()),2&t){const l=e.oxw(3);e.xp6(1),e.Oqu(l.value)}}function A(t,y){if(1&t&&(e.TgZ(0,"h3"),e._uU(1),e.qZA()),2&t){const l=e.oxw().$implicit;e.xp6(1),e.hij("Unrecognized slider element: ",l,"")}}function E(t,y){if(1&t&&e.YNc(0,x,1,1)(1,a,2,3)(2,C,2,1)(3,A,2,1),2&t){let p;e.um2(0,"label"===(p=y.$implicit)?0:"slider"===p?1:"value"===p?2:3)}}function P(t,y){if(1&t&&(e.TgZ(0,"div")(1,"mat-form-field",1),e.SjG(2,E,4,1,null,null,e.x6l),e.qZA()()),2&t){const l=e.oxw();e.Tol(l.setClass()),e.xp6(1),e.Q6J("formGroup",l.parentForm),e.xp6(1),e.wJu(l.fields)}}let u=(()=>{class t{set controlName(l){this._controlName=l,this.value=this.parentForm.controls[l].value}get controlName(){return this._controlName}set elements(l){this.checkElements(l)&&(this._elements=l,this.fields=[],this.parseElements(l))}get elements(){return this._elements}constructor(){this.minimum=0,this.step=1,this.layout="row",this.label="",this.ready=(0,e.tdS)(!1),this.setClass=()=>this.layout,this.checkElements=l=>{let p="",h=l.slice(),v=h.indexOf("s")>=0;if(v)for(let c=0;c<h.length;c++)switch(h[c]){case"s":case"v":case"l":break;default:v=!1,p=`${h[c]} is not a recognized slider element.  Use only 'l', 's' or 'v'`}else p="'elements' must contain an 's'.";return v||console.log(p),v},this.parseElements=l=>{let h=l.slice();for(let v=0;v<h.length;v++)switch(h[v]){case"s":this.fields.push("slider");break;case"v":this.fields.push("value");break;case"l":this.fields.push("label")}}}ngOnInit(){this.ready.set(!0),console.log("slider-input is ready")}handleSliderChange(l){}get limitText(){return this.label.replace("...",`${this.maximum}`)}static#e=this.\u0275fac=function(p){return new(p||t)};static#t=this.\u0275cmp=e.Xpm({type:t,selectors:[["mfmp-slider-input"]],inputs:{parentForm:"parentForm",minimum:"minimum",maximum:"maximum",step:"step",layout:"layout",label:"label",controlName:"controlName",elements:"elements"},standalone:!0,features:[e._Bn([g.$5]),e.jDz],decls:1,vars:1,consts:[[3,"class"],[3,"formGroup"],["formControlName","controlName","discrete","",3,"min","max","step","change"],["matSliderThumb","","placeholder"," "],["matLabel",""]],template:function(p,h){1&p&&e.YNc(0,P,4,3,"div",0),2&p&&e.um2(0,h.ready()?0:-1)},dependencies:[d.ez,i.UX,i.JJ,i.JL,i.sg,i.u,f.lN,f.KE,f.hX,T.c,g.KP,g.pH,g.$5],styles:["div.row[_ngcontent-%COMP%]{display:flex;flex-direction:row;align-items:center}div.column[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:flex-start}"]})}return t})()},8309:(O,R,s)=>{s.d(R,{Nw:()=>c,Sz:()=>d,zL:()=>S});var d={};s.r(d),s.d(d,{fetchAllResultsErrorAlert:()=>v,getCurrentPageEffect:()=>l,getFirstPageEffect:()=>y,loadResultsEffect:()=>p,refreshAllResultsEffect:()=>h});var e=s(9212),i=s(7483),f=s(2096),T=s(6328),g=s(2460);function _(n){return(0,T.b)(r=>{const m=n(r),o=Array.isArray(m)?m:[m];return(0,f.of)(r).pipe((0,g.M)(...o))})}var a=s(4221),C=s(7398),A=s(4664),E=s(6306),P=s(9397),u=s(7936),t=s(2744);const y=(0,i.GW)((n=(0,e.f3M)(i.eX))=>{const r=(0,e.f3M)(a.yh);return n.pipe((0,i.l4)(c.loadResultsSuccess),_(()=>r.select(S.selectNavigator)),(0,C.U)(([,m])=>c.setPage({payload:{page:1,size:10,sizes:m.sizes}})))},{functional:!0}),l=(0,i.GW)((n=(0,e.f3M)(i.eX))=>{const r=(0,e.f3M)(a.yh);return n.pipe((0,i.l4)(c.sort),_(()=>r.select(S.selectNavigator)),(0,C.U)(([,m])=>c.setPage({payload:m})))},{functional:!0}),p=(0,i.GW)((n=(0,e.f3M)(i.eX))=>{const r=(0,e.f3M)(u.U);return n.pipe((0,i.l4)(c.loadResults),(0,A.w)(m=>r.getAllResultsPage(m.query).pipe((0,C.U)(o=>r.extractResultsTable(o)),(0,C.U)(o=>c.loadResultsSuccess({payload:o})),(0,E.K)(o=>(0,f.of)(c.loadResultsFailure({error:o}))))))},{functional:!0}),h=(0,i.GW)((n=(0,e.f3M)(i.eX))=>{const r=(0,e.f3M)(u.U);return n.pipe((0,i.l4)(c.refreshResults),(0,A.w)(m=>r.refreshResults(m.sort).pipe((0,C.U)(o=>r.extractResultsTable(o)),(0,C.U)(o=>c.loadResultsSuccess({payload:o})),(0,E.K)(o=>(0,f.of)(c.loadResultsFailure({error:o}))))))},{functional:!0}),v=(0,i.GW)(()=>{const n=(0,e.f3M)(t.c);return(0,e.f3M)(i.eX).pipe((0,i.l4)(c.loadResultsFailure),(0,P.b)(()=>n.showClientError("No results found.")))},{functional:!0,dispatch:!1}),c=(0,a.R7)({source:"AllResults API",events:{Reset:(0,a.uZ)(),loadResults:(0,a.Ky)(),loadResultsSuccess:(0,a.Ky)(),loadResultsFailure:n=>({error:n}),refreshResults:(0,a.Ky)(),setPage:(0,a.Ky)(),sort:(0,a.Ky)()}});function L(n,r){return(m,o)=>{let M;return M="number"==typeof+m[n]?I(+m[n],+o[n]):I(m[n],o[n]),"desc"===r&&(M=0-M),M}}const I=(n,r)=>n<r?-1:n>r?1:0,U={query:"",loading:!1,ready:!1,error:null,results:[],page:[],navigator:{page:1,size:10,sizes:[5,10,15,20]},pageNumber:1,pageSize:10},z=(0,a.Lq)(U,(0,a.on)(c.reset,()=>({...U})),(0,a.on)(c.loadResults,(n,r)=>({...n,query:r.query,loading:!0,ready:!1,error:null,results:[]})),(0,a.on)(c.loadResultsSuccess,(n,r)=>({...n,ready:!0,loading:!1,results:r.payload.reactionResults})),(0,a.on)(c.loadResultsFailure,(n,r)=>({...n,loading:!1,error:r.error})),(0,a.on)(c.setPage,(n,r)=>{const o=(r.payload.page-1)*r.payload.size,M=Math.min(o+r.payload.size,n.results.length);return{...n,pageNumber:r.payload.page,pageSize:r.payload.size,page:n.results.slice(o,M)}}),(0,a.on)(c.sort,(n,r)=>{const m=r.payload.active;return{...n,results:[...n.results].sort(L(m,r.payload.direction))}})),S=(0,a.Tz)({name:"all-results",reducer:z,extraSelectors:({selectResults:n})=>({selectRows:(0,a.P1)(n,r=>r.length)})})}}]);