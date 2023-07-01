"use strict";(self.webpackChunkv11=self.webpackChunkv11||[]).push([[984],{7984:(ae,w,s)=>{s.r(w),s.d(w,{FUSION_ROUTES:()=>ie});var A=s(7483),C=s(4221),f=s(5498),y=s(6814),O=s(9862),e=s(5879),q=s(1303),k=s(5619),P=s(7394),a=s(5220),j=s(5177),D=s(6847),N=s(8675),Z=s(902),o=s(6223),E=s(2296),b=s(5195),M=s(5986),v=s(3305),Q=s(5683),z=s(3176),_=s(617),B=s(2032),S=s(7466),U=s(8525),V=s(2202),G=s(8057),H=s(7837),X=s(3131);const Y=r=>{const c=r.get("leftNuclides")?.get("selectedElements")?.value||[],n=r.get("rightNuclides")?.get("selectedElements")?.value||[];return 0===c.length&&0===n.length?{missingElements:!0}:null};var K=s(3680);function W(r,c){if(1&r&&(e.TgZ(0,"mat-option",35),e._uU(1),e.qZA()),2&r){const n=c.$implicit;e.Q6J("value",n.code),e.xp6(1),e.hij(" ",n.code," ")}}let ee=(()=>{class r{set coreQuery(n){this._coreQuery=n,this.sqlForm&&this.sqlForm.get("coreQuery")?.patchValue(n,{emitEvents:!1})}get coreQuery(){return this._coreQuery}set fullQuery(n){this._fullQuery=n,this.sqlForm&&this.sqlForm.get("fullQuery")?.patchValue(n,{emitEvents:!1})}get fullQuery(){return this._fullQuery}get elementJoin(){return this.fusionForm.get("elementJoin")?.value}constructor(){this._coreQuery="",this._fullQuery="",this.fb=(0,e.f3M)(o.qu),this.router=(0,e.f3M)(q.F0),this.subscriptions=new P.w0,this.submittable=!1,this.sortBy="",this.sortOrder="",this.doit=new e.vpe,this.formChanges=new e.vpe,this.sqlChanges=new e.vpe,this.description='This program ("Fusion.php") enables SQL commands to query the Fusion tables originally created from Dr Parkhomov\'s spreadsheets.',this.initialCoreQuery=" order by MeV desc limit 1000",this.tablesText="Select Fusion data table from 'FusionAll' (original: MeV > 0.0; 3,921 rows; based on the 'Nuclides' table, 293 nuclides), or FusionAllNewPlus (MeV = +/- any, 8026 rows; based on the 'NuclidesPlus' table, 324 nuclides)",this.buildForm=()=>{this.fusionForm=this.fb.nonNullable.group({tableSet:new o.NI("FusionAll",{nonNullable:!0}),resultLimit:new o.NI(1e3),orderBy:new o.NI("MeV"),elementJoin:new o.NI("and"),sortDescending:new o.NI("desc"),inputNeutrinos:new o.NI(!0),outputNeutrinos:new o.NI(!0),noNeutrinos:new o.NI(!0),leftNuclides:this.fb.nonNullable.group({selectedElements:new o.NI([]),nuclearSpin:new o.NI("bf"),atomicSpin:new o.NI("bf")}),rightNuclides:this.fb.nonNullable.group({selectedElements:new o.NI([]),nuclearSpin:new o.NI("bf"),atomicSpin:new o.NI("bf")}),resultNuclides:this.fb.nonNullable.group({selectedElements:new o.NI([]),nuclearSpin:new o.NI("bf"),atomicSpin:new o.NI("bf")})},{validators:Y}),this.subscriptions.add(this.fusionForm.valueChanges.subscribe(n=>this.handleFusionformChanges(n))),this.subscriptions.add(this.sqlForm.valueChanges.subscribe(n=>this.handleSqlFormChanges(n))),this.resetForm(!1)},this.resetForm=(n=!0)=>{this.sqlForm.reset({coreQuery:this.initialCoreQuery}),this.fusionForm.reset({tableSet:"FusionAll",orderBy:"MeV",elementJoin:"and",sortDescending:!0,resultLimit:1e3,inputNeutrinos:!0,outputNeutrinos:!0,noNeutrinos:!0,leftNuclides:{selectedElements:[],atomicSpin:"bf",nuclearSpin:"bf"},rightNuclides:{selectedElements:[],atomicSpin:"bf",nuclearSpin:"bf"},resultNuclides:{selectedElements:[],atomicSpin:"bf",nuclearSpin:"bf"}},{emitEvent:n})},this.resetResults=()=>{},this.handleFusionformChanges=n=>{this.buildResultElements(n.leftNuclides.selectedElements,n.rightNuclides.selectedElements),this.formChanges.emit(n),this.setSubmittable()},this.toggleJoin=()=>{let n=this.fusionForm.get("elementJoin")?.value;n="and"===n?"or":"and",this.fusionForm.get("elementJoin")?.patchValue(n)},this.handleSqlFormChanges=n=>{this.sqlChanges.emit(n),this.setSubmittable()},this.getResultLimit=()=>this.fusionForm.get("resultLimit")?.value,this.setResultLimit=n=>{this.fusionForm.get("resultLimit")?.patchValue(n)},this.setSubmittable=()=>{this.submittable=this.fusionForm.valid||!this.coreQuery.trimStart().startsWith("order")},this.buildResultElements=(n,t)=>{let l=this.combineElements(n,t);this.fusionForm.get("resultNuclides.selectedElements")?.patchValue(l,{onlySelf:!0,emitEvents:!1})},this.combineElements=(n,t,l=!1)=>{const i=n.concat(t.filter(u=>n.indexOf(u)<0));return l?`('${i.join("','")}')`:i},this.route=this.router.routerState.snapshot.url,this.sqlForm=this.fb.nonNullable.group({coreQuery:new o.NI(this.initialCoreQuery),fullQuery:new o.NI(this.fullQuery)})}buildRequestForm(){this.doit.emit([this.fusionForm,this.sqlForm])}ngOnDestroy(){this.subscriptions.unsubscribe()}ngOnInit(){this.buildForm()}}return r.\u0275fac=function(n){return new(n||r)},r.\u0275cmp=e.Xpm({type:r,selectors:[["mfmp-fusion-face"]],inputs:{elements:"elements",sortFields:"sortFields",coreQuery:"coreQuery",fullQuery:"fullQuery"},outputs:{doit:"doit",formChanges:"formChanges",sqlChanges:"sqlChanges"},standalone:!0,features:[e._Bn([{provide:N.d}],[v.ib]),e.jDz],decls:90,vars:32,consts:[["expanded","false"],[1,"header"],["routerLink","fission","href","/fission"],[3,"formGroup"],[1,"children","mat-elevation-z2"],[1,"start"],[1,"nuclides"],[1,"elements"],[3,"role","title","multiselect","formGroupName","caption","elementsList"],[1,"join"],["mat-raised-button","","formControlName","elementJoin","ngDefaultControl","",3,"click"],[1,"results"],[1,"neutrinos"],["formControlName","inputNeutrinos","value","left"],["formControlName","noNeutrinos","value","none"],["formControlName","outputNeutrinos","value","right"],[1,"coreQuery"],[3,"caption","text"],[1,"sql"],["labelPosition","before","formControlName","tableSet","name","tableSet","value","FusionAll"],["value","FusionAll","selected",""],["value","FusionAllNewPlus"],["id","orderBy","formControlName","orderBy","value","orderBy","ngDefaultControl",""],["title","Order by","formControlName","orderBy"],[3,"value",4,"ngFor","ngForOf"],["title","when checked.","formControlName","sortDescending","value","sortDescending"],[1,"flexrow"],[1,"fullQuery",3,"formGroup"],["matInput","","formControlName","fullQuery","title","'full query'","value","fullQuery","rows","4"],[1,"coreQuery",3,"formGroup"],["matInput","","formControlName","coreQuery","title","'core query'","value","coreQuery","rows","4"],[3,"defaultLimit","minimum","maximum","step","limitVerbiage","limitSize"],["align","end"],["type","button","mat-raised-button","",3,"click"],["type","button","mat-raised-button","","color","primary","tooltip","(submittable) ? '' : 'Select elements to continue.'",3,"disabled","click"],[3,"value"]],template:function(n,t){if(1&n&&(e.TgZ(0,"mat-expansion-panel",0)(1,"mat-expansion-panel-header")(2,"p",1),e._uU(3),e.qZA()(),e.TgZ(4,"p"),e._uU(5," To make full use of this and the other database tables, a good grasp of SQL is essential. "),e.qZA(),e.TgZ(6,"p"),e._uU(7," But note that it, TwoToTwo and "),e.TgZ(8,"a",2),e._uU(9,"Fission"),e.qZA(),e._uU(10," is each dedicated to querying only one of two tables. "),e.qZA(),e.TgZ(11,"p"),e._uU(12,' The "universal" program All Tables can accept full SQL commands that query any of the 12 "Parkhomov" tables, together with the "ElementProperties", "Nuclides", "RadioNuclides" and "Atomic Radii" tables as well. '),e.qZA(),e.TgZ(13,"p"),e._uU(14,' You may indicate which of the three neutrino conditions to include: "left" and/or "none" and/or "right". The default condition is include all three. '),e.qZA(),e.TgZ(15,"p"),e._uU(16," In all the above tables, except the Periodic, each atom, in either the input or the output, as well as its 'A' and 'Z' numbers now also has a 'nBorF' ('nuclear Boson or Fermion') and a 'aBorF' ('atomic Boson or Fermion') parameter associated with it. "),e.qZA(),e.TgZ(17,"p"),e._uU(18," An atom's nucleus is considered a Boson ('b') if its A number is even; if odd a Fermion ('f'). The atom itself is considered a Boson ('b') if its number of neutrons (A - Z) is even; if odd a Fermion ('f'). "),e.qZA(),e.TgZ(19,"p"),e._uU(20," These parameters can be used either passively, by observing the distributions of 'b' and 'f' in inputs and/or outputs, and/or actively, by selecting 'b only', 'f only' or 'either' in the boxes below. "),e.qZA(),e.TgZ(21,"p"),e._uU(22," NB: To avoid unnecessary duplication in all Fusion tables, A1 is never greater than A2 in any row, i.e. A1 <= A2. This also applies implicitly in that, if the input side of the Core Query only involves E1 and E2, only rows whose associated mass numbers obey A1 <= A2 will appear in the results "),e.qZA(),e.TgZ(23,"p"),e._uU(24,' To protect the table, only SQL compatible "selection" queries can be allowed and you must enter only the CORE part of that query. '),e.qZA(),e.TgZ(25,"p"),e._uU(26,' Once you do this and click on the "Execute Query" button, the front part (here "select * from FusionAll where ") will be automatically prepended and the full query sent to the database. '),e.qZA(),e.TgZ(27,"p"),e._uU(28," Latest: All queries will now be limited to 1000 possible rows of results; any requested 'limit' greater than 1000 will be reset to 1000; to any core query not including any 'limit' command will be appended 'limit 1000'. "),e.qZA(),e.TgZ(29,"p"),e._uU(30," This Fusion Core Query can refer to any and all of E1, A1, nBorF1, Z1, aBorF1, E2, A2, nBorF2, Z2 or aBorF2 (the inputs) and to any and all of E, A, nBorF, Z or aBorF (the output). "),e.qZA()(),e.TgZ(31,"form",3)(32,"div",4)(33,"h3",5),e._uU(34," Select elements from the 'Left Side (E1)' and/or the 'Right Side (E2)' to begin. "),e.qZA(),e.TgZ(35,"div",6)(36,"div",7),e._UZ(37,"mfmp-nuclide-picker",8),e.TgZ(38,"div",9)(39,"button",10),e.NdJ("click",function(){return t.toggleJoin()}),e._uU(40),e.qZA()(),e._UZ(41,"mfmp-nuclide-picker",8),e.qZA(),e.TgZ(42,"div",11),e._UZ(43,"mfmp-nuclide-picker",8),e.qZA()(),e.TgZ(44,"div",12)(45,"div")(46,"p"),e._uU(47," Tick neutrino (nu) contributions to be included (default is all three). "),e.qZA()(),e.TgZ(48,"div")(49,"mat-checkbox",13),e._uU(50," Left "),e.qZA(),e.TgZ(51,"mat-checkbox",14),e._uU(52," None "),e.qZA(),e.TgZ(53,"mat-checkbox",15),e._uU(54," Right "),e.qZA()()()(),e.TgZ(55,"mat-card",16)(56,"mat-card-content"),e._UZ(57,"mfmp-expandable-box",17),e.TgZ(58,"div",18)(59,"div")(60,"mat-radio-group",19)(61,"mat-radio-button",20),e._uU(62," FusionAll "),e.qZA(),e.TgZ(63,"mat-radio-button",21),e._uU(64," FusionAllNewPlus "),e.qZA()()(),e.TgZ(65,"div")(66,"div")(67,"mat-form-field",22)(68,"mat-label"),e._uU(69,"Order By:"),e.qZA(),e.TgZ(70,"mat-select",23),e.YNc(71,W,2,2,"mat-option",24),e.qZA()()(),e.TgZ(72,"div")(73,"mat-checkbox",25),e._uU(74," Descending "),e.qZA()()()(),e.TgZ(75,"div",26)(76,"div",27)(77,"mat-label"),e._uU(78,"Full Query"),e.qZA(),e._UZ(79,"textarea",28),e.qZA(),e.TgZ(80,"div",29)(81,"mat-label"),e._uU(82,"Core Query"),e.qZA(),e._UZ(83,"textarea",30),e.qZA(),e.TgZ(84,"mfmp-resultsize-picker",31),e.NdJ("limitSize",function(i){return t.setResultLimit(i)}),e.qZA()()(),e.TgZ(85,"mat-card-actions",32)(86,"button",33),e.NdJ("click",function(){return t.resetForm()}),e._uU(87," RESET "),e.qZA(),e.TgZ(88,"button",34),e.NdJ("click",function(){return t.buildRequestForm()}),e._uU(89," SUBMIT "),e.qZA()()()()),2&n){let l;e.xp6(3),e.Oqu(t.description),e.xp6(28),e.Q6J("formGroup",t.fusionForm),e.xp6(6),e.Q6J("role","query")("title","Left side (E1)")("multiselect",!0)("formGroupName","leftNuclides")("caption","Left")("elementsList",t.elements),e.xp6(3),e.hij(" ",null==(l=t.fusionForm.get("elementJoin"))?null:l.value," "),e.xp6(1),e.Q6J("role","query")("title","Right side (E2)")("multiselect",!0)("formGroupName","rightNuclides")("caption","Right")("elementsList",t.elements),e.xp6(2),e.Q6J("role","result")("title","Results")("multiselect",!0)("formGroupName","resultNuclides")("caption","Result")("elementsList",t.elements),e.xp6(14),e.Q6J("caption","Tables:")("text",t.tablesText),e.xp6(14),e.Q6J("ngForOf",t.sortFields),e.xp6(5),e.Q6J("formGroup",t.sqlForm),e.xp6(4),e.Q6J("formGroup",t.sqlForm),e.xp6(4),e.Q6J("defaultLimit",1e3)("minimum",0)("maximum",1e3)("step",50)("limitVerbiage","Limit results to ... rows."),e.xp6(4),e.Q6J("disabled",!t.submittable)}},dependencies:[y.ez,y.sg,O.JF,E.ot,E.lW,b.QW,b.a8,b.hq,b.dn,M.p9,M.oG,v.To,v.ib,v.yz,z.N6,_.Ps,B.c,B.Nt,Q.KE,Q.hX,S.Fk,S.VQ,S.U0,U.LD,U.gD,K.ey,V.KP,Q.lN,X.g,o.UX,o._Y,o.Fj,o.JJ,o.JL,o.sg,o.u,o.x0,H.X,G.t],styles:[".mat-expansion-panel-header.mat-expanded[_ngcontent-%COMP%], .mat-expansion-panel-header.mat-expanded[_ngcontent-%COMP%]:hover{background-color:#fafafa80}.mat-card-content[_ngcontent-%COMP%]{width:100%}mat-expansion-panel#blurb[_ngcontent-%COMP%]{margin-bottom:1ex}h3.start[_ngcontent-%COMP%]{margin-top:2ex;width:100%;font-weight:500;text-align:center}div.children[_ngcontent-%COMP%]{display:flex;flex-direction:column;padding-top:1em}div.children[_ngcontent-%COMP%]   div.nuclides[_ngcontent-%COMP%]{display:flex;flex-direction:row;align-items:stretch;justify-content:space-evenly;margin-bottom:1ex}div.children[_ngcontent-%COMP%]   div.nuclides[_ngcontent-%COMP%]   div.elements[_ngcontent-%COMP%]{display:flex;flex-direction:row;align-items:center}div.children[_ngcontent-%COMP%]   div.nuclides[_ngcontent-%COMP%]   div.elements[_ngcontent-%COMP%]   div.join[_ngcontent-%COMP%]{margin:1em}div.neutrinos[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:center;align-items:baseline;margin-bottom:1ex}div.sql[_ngcontent-%COMP%]{width:100%;display:flex;flex-direction:row;justify-content:space-around}div.sql[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:last-child{display:flex;flex-direction:row}mat-card.coreQuery[_ngcontent-%COMP%]{background-color:transparent}mat-card.coreQuery[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{width:100%}div.fullQuery[_ngcontent-%COMP%]{display:none}div.coreQuery[_ngcontent-%COMP%]{padding:1em;display:flex;flex-direction:row;justify-content:stretch}div.coreQuery[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:first-child{display:block;flex:1}div.coreQuery[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:last-child{display:block;flex:3;border-radius:5px;border:1px solid #ccc;box-shadow:1px 1px 1px #999}mat-form-field#orderBy[_ngcontent-%COMP%]{flex-direction:row!important}span.resultLimitHeader[_ngcontent-%COMP%]{display:flex;flex-direction:row}span.resultLimitHeader[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{display:inline-block;flex:1;font-size:smaller}div.flexrow[_ngcontent-%COMP%]{width:100%;display:flex;flex-direction:row;justify-content:stretch;align-items:baseline}div.flexrow[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:nth-child(2){flex:3}.fill[_ngcontent-%COMP%]{margin:1em}div.resultLimit[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:stretch}div.resultLimit[_ngcontent-%COMP%]   mat-slider[_ngcontent-%COMP%]{width:30%}p.header[_ngcontent-%COMP%]{text-overflow:ellipsis;padding-right:2em}"],changeDetection:0}),r})(),te=(()=>{class r{constructor(n){this.headerService=n,this.store=(0,e.f3M)(C.yh),this.http=(0,e.f3M)(D.I),this.router=(0,e.f3M)(q.F0),this.coreQuery="",this.fullQuery="",this.route=this.router.routerState.root,this.ready=new k.X(!1),this.subscriptions=new P.w0,this.submittable=!1,this.description='This program ("Fusion.php") enables SQL commands to coreQuery the Fusion tables originally created from Dr Parkhomov\'s spreadsheets.',this.buildCoreQuery=t=>{const l=t.resultLimit,i=t.orderBy,u=t.elementJoin,h=t.sortDescending,ue="from "+t.tableSet,L=this.buildNeutrinoClause(t.inputNeutrinos,t.noNeutrinos,t.outputNeutrinos),p=[],m=[];let d="",x="",R="",F="",T="";"bf"!==t.leftNuclides.nuclearSpin&&m.push(`nBorF1 = '${t.leftNuclides.nuclearSpin}'`),"bf"!==t.leftNuclides.atomicSpin&&m.push(`aBorF1 = '${t.leftNuclides.atomicSpin}'`),"bf"!==t.rightNuclides.nuclearSpin&&m.push(`nBorF2 = '${t.rightNuclides.nuclearSpin}'`),"bf"!==t.rightNuclides.atomicSpin&&m.push(`aBorF2 = '${t.rightNuclides.atomicSpin}'`),"bf"!==t.resultNuclides.nuclearSpin&&m.push(`nBorF = '${t.resultNuclides.nuclearSpin}'`),"bf"!==t.resultNuclides.atomicSpin&&m.push(`aBorF = '${t.resultNuclides.atomicSpin}'`),m.length>0&&(x=m.join(" and "));const I=t.leftNuclides.selectedElements??[],$=t.rightNuclides.selectedElements??[];I.length>0&&p.push(`E1 in ${this.combineElements(I,[],!0)}`),$.length>0&&p.push(`E2 in ${this.combineElements($,[],!0)}`),p.length>0&&(d=p[0]),p.length>1&&(d+=` ${u} `,d+=p[1],"or"===u&&(d=`(${d})`));let g=[];L&&g.push(L),d&&g.push(d),x&&g.push(x),g.length>0&&(R=g.join(" and ")),i&&(F=`order by ${i}`,!0===h&&(F+=" desc"),console.log("descending",h)),l&&(T=`limit ${l}`),this.coreQuery=`${d} ${F} ${T}`.trim().replace(/\s\s/g," "),this.fullQuery=`select * ${ue} where ${R} ${F} ${T}`},this.submit_coreQuery=t=>{const l=this.buildRequestForm(t);this.store.dispatch(Z.QJ.setReportParameters({payload:{url:"fusion",reactionType:j.k.Fusion,query:this.coreQuery}})),this.store.dispatch(f.tc.fetchAllResults({payload:l})),this.router.navigate(["/fusion/reports"])},this.forceReset=()=>{this.router.lastSuccessfulNavigation?.extractedUrl.queryParamMap.get("reset")&&(this.store.dispatch(f.tc.reset()),this.router.navigate(["/fusion"]))},this.buildNeutrinoClause=(t,l,i)=>{let u=[],h="";return t&&u.push("neutrino = 'left'"),l&&u.push("neutrino = 'none'"),i&&u.push("neutrino = 'right'"),u.length>0&&u.length<3&&(h=`(${u.join(" or ")})`),h},this.combineElements=(t,l,i=!1)=>{const u=t.concat(l.filter(h=>t.indexOf(h)<0));return i?`('${u.join("','")}')`:u}}sql_changes(n){if(console.log("form",n),n){const t=n.coreQuery,i=new RegExp(/select\s+(.*?)\s+from\s+(.*?)\s+where\s+(.*?)\s+\order\sby\s+(.*?)\s+\limit\s+(.*?)/i).exec(t);console.log("clauses",i)}}form_changes(n){console.log("fusionForm:",n),this.buildCoreQuery(n)}ngOnDestroy(){this.subscriptions.unsubscribe()}ngOnInit(){this.forceReset(),this.elements=this.store.select(Z.dS.selectElements),this.sortFields=this.store.select(Z.dS.selectReactionSortFields),this.headerService.buildPageHeader("fusion"),this.ready.next(!0)}buildRequestForm(n){let t=n[0].value,l=n[1],i=new Array;return this.coreQuery=l.get("coreQuery")?.value,i.push(new a.C({key:"doit",value:"execute_query"})),i.push(new a.C({key:"query",value:this.coreQuery})),i.push(new a.C({key:"table_name",value:t.tableSet})),t.inputNeutrinos&&i.push(new a.C({key:"sql_tables[]",value:"left"})),t.noNeutrinos&&i.push(new a.C({key:"sql_tables[]",value:"none"})),t.outputNeutrinos&&i.push(new a.C({key:"sql_tables[]",value:"right"})),i.push(new a.C({key:"nBorF1",value:t.leftNuclides.nuclearSpin})),i.push(new a.C({key:"aBorF1",value:t.leftNuclides.atomicSpin})),i.push(new a.C({key:"nBorF2",value:t.rightNuclides.nuclearSpin})),i.push(new a.C({key:"aBorF2",value:t.rightNuclides.atomicSpin})),i.push(new a.C({key:"nBorF",value:t.resultNuclides.nuclearSpin})),i.push(new a.C({key:"aBorF",value:t.resultNuclides.atomicSpin})),i}}return r.\u0275fac=function(n){return new(n||r)(e.Y36(N.d))},r.\u0275cmp=e.Xpm({type:r,selectors:[["mfmp-fusion-head"]],standalone:!0,features:[e._Bn([{provide:N.d}]),e.jDz],decls:3,vars:8,consts:[[3,"elements","sortFields","coreQuery","fullQuery","doit","formChanges","sqlChanges"]],template:function(n,t){1&n&&(e.TgZ(0,"mfmp-fusion-face",0),e.NdJ("doit",function(i){return t.submit_coreQuery(i)})("formChanges",function(i){return t.form_changes(i)})("sqlChanges",function(i){return t.sql_changes(i)}),e.ALo(1,"async"),e.ALo(2,"async"),e.qZA()),2&n&&e.Q6J("elements",e.lcZ(1,4,t.elements))("sortFields",e.lcZ(2,6,t.sortFields))("coreQuery",t.coreQuery)("fullQuery",t.fullQuery)},dependencies:[y.ez,y.Ov,O.JF,ee]}),r})();var ne=s(1358),J=s(2600);const ie=[{path:"",component:te,providers:[(0,C.oY)(f.RB),(0,A.y3)([f.Sz])]},{path:"reports",component:ne.a,providers:[(0,C.oY)(f.RB),(0,A.y3)([f.Sz]),{provide:J.K,useClass:J.K}]}]}}]);