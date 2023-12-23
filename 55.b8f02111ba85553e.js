"use strict";(self.webpackChunkv11=self.webpackChunkv11||[]).push([[55],{2401:(C,d,n)=>{n.d(d,{C:()=>g});class g{get reactionRows(){return this.reactionResults.length-1}get nuclideRows(){return this.nuclideResults.length-1}get elementRows(){return this.elementResults.length-1}get radioNuclideRows(){return this.radioNuclideResults.length-1}constructor(p,f,t=3){this.html=p,this.reactionTemplate=f,this.numberOfTablesExpected=t,this.reactionResults=[],this.nuclideResults=[],this.elementResults=[],this.radioNuclideResults=[],this.queries=[],this.errors=[],this.elementsTemplate=["Z","E","EName"],this.nuclidesTemplate=["id","A","Z"],this.radioNuclidesTemplate=["id","A","E","Z"],this.modelMatches=(e,s)=>{let l=0;for(let o=0;o<s.length;o++)s[o]===e[o]&&l++;return l===s.length},this.parseTableContent=(e,s)=>{if(this.modelMatches(e,this.reactionTemplate))this.reactionResults=s;else if(this.modelMatches(e,this.nuclidesTemplate))this.nuclideResults=s;else if(this.modelMatches(e,this.elementsTemplate))this.elementResults=s;else if(this.modelMatches(e,this.radioNuclidesTemplate))this.radioNuclideResults=s;else{const l=`table with this thead: "${e.join(",")}" couldn't be matched to any template.`;this.errors.push(l)}},this.parseReactionResults=()=>{const e=this.extractTablesFromPage();console.log("reactionTemplate",this.reactionTemplate),console.log("nuclidesTemplate",this.nuclidesTemplate),console.log("elementsTemplate",this.elementsTemplate),console.log("radioNuclidesTemplate",this.radioNuclidesTemplate);for(let l=0;l<e.length;l++)if(e.length>0){const o=e[l];this.parseTableContent(o[0],o)}let s=0;s+=this.reactionResults.length>0?1:0,s+=this.nuclideResults.length>0?1:0,s+=this.elementResults.length>0?1:0,s+=this.radioNuclideResults.length>0?1:0,this.ok=s>=this.numberOfTablesExpected,this.ok||(0==this.reactionResults.length&&this.errors.push("Reaction table is missing"),0==this.nuclideResults.length&&this.errors.push("Nuclides table is missing"),0==this.elementResults.length&&this.errors.push("Elements table is missing"))},this.convertTablesToResultSet=e=>{let s=[];return e.forEach(l=>{let o=Array.prototype.map.call(l.querySelectorAll("tr"),c=>Array.prototype.map.call(c.querySelectorAll("td"),m=>m.innerHTML));o.length>0&&s.push(o)}),s},this.extractTablesFromPage=()=>{let e=[];const o=(new DOMParser).parseFromString(this.html,"text/html").querySelectorAll("table.results");return this.validateTables(o)&&(e=this.convertTablesToResultSet(o)),e},this.validateTables=e=>{let s=e.length>=this.numberOfTablesExpected;return s&&e.forEach(l=>{l.childElementCount>0&&l.childElementCount<3&&(s=s&&"TBODY"==l.lastElementChild?.tagName)}),s},this.parseReactionResults()}}},1428:(C,d,n)=>{n.r(d),n.d(d,{TESTPAGE_ROUTES:()=>F});var v=n(7483),g=n(4221),i=n(8675),p=n(8309),f=n(6814),t=n(9212),e=n(6223),s=n(2296),l=n(5195),o=n(5683),c=n(2032),m=n(1476),T=n(7466),R=n(3566),M=n(5313),N=n(5226);let O=(()=>{class r{constructor(h){this.fb=h,this.layout="row",this.elements="vsl"}ngOnInit(){this.form=this.fb.group({myControl:34})}setElements(h){this.elements=h.target.value}static#t=this.\u0275fac=function(u){return new(u||r)(t.Y36(e.qu))};static#e=this.\u0275cmp=t.Xpm({type:r,selectors:[["mfmp-testpage"]],standalone:!0,features:[t.jDz],decls:18,vars:12,consts:[["placeholder","elements","matInput","",3,"value","change"],["name","layout",3,"ngModel","ngModelChange"],["value","column","selected","layout == 'column'"],["value","row","selected","layout == 'row'"],[3,"parentForm","minimum","maximum","step","label","controlName","layout","elements"]],template:function(u,a){1&u&&(t.TgZ(0,"mat-card")(1,"mat-card-content"),t._UZ(2,"div"),t.TgZ(3,"form")(4,"div")(5,"input",0),t.NdJ("change",function(y){return a.setElements(y)}),t.qZA()(),t.TgZ(6,"div")(7,"mat-radio-group",1),t.NdJ("ngModelChange",function(y){return a.layout=y}),t.TgZ(8,"mat-radio-button",2),t._uU(9," Vertical "),t.qZA(),t.TgZ(10,"mat-radio-button",3),t._uU(11," Horizontal "),t.qZA()()(),t.TgZ(12,"div")(13,"pre"),t._uU(14),t.qZA()(),t._UZ(15,"mfmp-slider-input",4),t.TgZ(16,"div"),t._uU(17),t.qZA()()()()),2&u&&(t.xp6(5),t.s9C("value",a.elements),t.xp6(2),t.Q6J("ngModel",a.layout),t.xp6(7),t.Oqu(a.layout),t.xp6(1),t.Q6J("parentForm",a.form)("minimum",1)("maximum",100)("step",1)("label","myControl")("controlName","myControl")("layout",a.layout)("elements",a.elements),t.xp6(2),t.Oqu(a.form.controls.myControl))},dependencies:[f.ez,e.u5,e._Y,e.JJ,e.JL,e.On,e.F,e.UX,l.QW,l.a8,l.dn,s.ot,o.lN,c.c,c.Nt,m.TU,T.Fk,T.VQ,T.U0,R.JX,M.p0,N.t],styles:["ul[_ngcontent-%COMP%]{text-decoration:none;list-style:none}.mat-mdc-card[_ngcontent-%COMP%]{height:100%}.mat-mdc-card-content[_ngcontent-%COMP%]{margin-left:1em;height:100%}div.wrapper[_ngcontent-%COMP%]{height:100%;display:flex;flex-direction:column;justify-content:stretch}div.buttons[_ngcontent-%COMP%]{display:flex;justify-content:space-evenly;padding:1em}div.form[_ngcontent-%COMP%]{border:1px solid red}div.results[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]{margin:auto}"]})}return r})();var P=n(4612),Z=n(7394),S=n(6414),A=n(4292);const F=[{path:"",component:(()=>{class r{constructor(){this.store=(0,t.f3M)(g.yh),this.crud=(0,t.f3M)(S.I),this.page="Select_LENR_Events.php",this.subsciptions=new Z.w0,this.elements=this.store.select(P.zL.selectElements)}ngOnInit(){this.request=new A.q,this.request.s_Year_from=String(2022),this.request.s_Year_to=String(2023),this.request.s_Index_from=String(1),this.request.s_Index_to=String(5001),this.request.r_id_copy="0",this.request.s_Category="All",this.request.doit="refresh"}ngAfterViewInit(){}ngOnDestroy(){this.subsciptions.unsubscribe()}initialize(){this.subsciptions.unsubscribe(),this.html=this.crud.getPage(this.page)}static#t=this.\u0275fac=function(u){return new(u||r)};static#e=this.\u0275cmp=t.Xpm({type:r,selectors:[["ng-component"]],standalone:!0,features:[t.jDz],decls:1,vars:0,template:function(u,a){1&u&&t._UZ(0,"mfmp-testpage")},dependencies:[f.ez,O],encapsulation:2})}return r})(),providers:[(0,g.oY)(p.zL),(0,v.y3)([p.Sz]),{provide:i.d,useClass:i.d}]}]}}]);