"use strict";(self.webpackChunkv11=self.webpackChunkv11||[]).push([[984],{7984:(ae,w,s)=>{s.r(w),s.d(w,{FUSION_ROUTES:()=>le});var A=s(7483),Z=s(4221),p=s(5498),g=s(6814),O=s(9862),e=s(5879),y=s(2655),j=s(5619),q=s(7394),c=s(5220),_=s(5177),k=s(6414),S=s(8675),Q=s(902),l=s(6223),M=s(2296),b=s(5195),P=s(5986),v=s(3305),C=s(5683),z=s(3176),E=s(617),U=s(2032),G=s(7466),B=s(8525),V=s(2202),L=s(2596),H=s(7837),X=s(3131);const Y=u=>{const m=u.get("leftNuclides")?.get("selectedElements")?.value||[],d=u.get("rightNuclides")?.get("selectedElements")?.value||[];return 0===m.length&&0===d.length?{missingElements:!0}:null};var K=s(3680);function W(u,m){if(1&u&&(e.TgZ(0,"mat-option",39),e._uU(1),e.qZA()),2&u){const d=m.$implicit;e.Q6J("value",d.code),e.xp6(1),e.hij(" ",d.code," ")}}const ee=function(){return["/two-up"]},te=function(){return["/fission"]},ne=function(){return["/all-tables"]};let ie=(()=>{var u;class m{set coreQuery(n){this._coreQuery=n,this.sqlForm&&this.sqlForm.get("coreQuery")?.patchValue(n,{emitEvents:!1})}get coreQuery(){return this._coreQuery}set fullQuery(n){this._fullQuery=n,this.sqlForm&&this.sqlForm.get("fullQuery")?.patchValue(n,{emitEvents:!1})}get fullQuery(){return this._fullQuery}get elementJoin(){return this.fusionForm.get("elementJoin")?.value}constructor(){this._coreQuery="",this._fullQuery="",this.fb=(0,e.f3M)(l.qu),this.router=(0,e.f3M)(y.F0),this.subscriptions=new q.w0,this.submittable=!1,this.sortBy="",this.sortOrder="",this.doit=new e.vpe,this.formChanges=new e.vpe,this.sqlChanges=new e.vpe,this.description='This program ("Fusion.php") enables SQL commands to query the Fusion tables originally created from Dr Parkhomov\'s spreadsheets.',this.initialCoreQuery=" order by MeV desc limit 1000",this.tablesText="Select Fusion data table from 'FusionAll' (original: MeV > 0.0; 3,921 rows; based on the 'Nuclides' table, 293 nuclides), or FusionAllNewPlus (MeV = +/- any, 8026 rows; based on the 'NuclidesPlus' table, 324 nuclides)",this.tooltipDelay=750,this.buildForm=()=>{this.fusionForm=this.fb.nonNullable.group({tableSet:new l.NI("FusionAll",{nonNullable:!0}),resultLimit:new l.NI(1e3),orderBy:new l.NI("MeV"),elementJoin:new l.NI("and"),sortDescending:new l.NI("desc"),inputNeutrinos:new l.NI(!0),outputNeutrinos:new l.NI(!0),noNeutrinos:new l.NI(!0),leftNuclides:this.fb.nonNullable.group({selectedElements:new l.NI([]),nuclearSpin:new l.NI("bf"),atomicSpin:new l.NI("bf")}),rightNuclides:this.fb.nonNullable.group({selectedElements:new l.NI([]),nuclearSpin:new l.NI("bf"),atomicSpin:new l.NI("bf")}),resultNuclides:this.fb.nonNullable.group({selectedElements:new l.NI([]),nuclearSpin:new l.NI("bf"),atomicSpin:new l.NI("bf")}),hidden:""},{validators:Y}),this.subscriptions.add(this.fusionForm.valueChanges.subscribe(n=>this.handleFusionformChanges(n))),this.subscriptions.add(this.sqlForm.valueChanges.subscribe(n=>this.handleSqlFormChanges(n))),this.resetForm(!1)},this.resetForm=(n=!0)=>{this.sqlForm.reset({coreQuery:this.initialCoreQuery}),this.fusionForm.reset({tableSet:"FusionAll",orderBy:"MeV",elementJoin:"and",sortDescending:!0,resultLimit:1e3,inputNeutrinos:!0,outputNeutrinos:!0,noNeutrinos:!0,leftNuclides:{selectedElements:[],atomicSpin:"bf",nuclearSpin:"bf"},rightNuclides:{selectedElements:[],atomicSpin:"bf",nuclearSpin:"bf"},resultNuclides:{selectedElements:[],atomicSpin:"bf",nuclearSpin:"bf"}},{emitEvent:n})},this.resetResults=()=>{},this.handleFusionformChanges=n=>{this.formChanges.emit(n),this.setSubmittable()},this.toggleJoin=()=>{let n=this.fusionForm.get("elementJoin")?.value;n="and"===n?"or":"and",this.fusionForm.get("elementJoin")?.patchValue(n)},this.handleSqlFormChanges=n=>{this.sqlChanges.emit(n),this.setSubmittable()},this.getResultLimit=()=>this.fusionForm.get("resultLimit")?.value,this.setResultLimit=n=>{this.fusionForm.get("resultLimit")?.patchValue(n)},this.setSubmittable=()=>{this.submittable=this.fusionForm.valid||!this.coreQuery.trimStart().startsWith("order")},this.route=this.router.routerState.snapshot.url,this.sqlForm=this.fb.nonNullable.group({coreQuery:new l.NI(this.initialCoreQuery),fullQuery:new l.NI(this.fullQuery)})}buildRequestForm(){this.doit.emit([this.fusionForm,this.sqlForm])}ngOnDestroy(){this.subscriptions.unsubscribe()}ngOnInit(){this.buildForm()}}return(u=m).\u0275fac=function(n){return new(n||u)},u.\u0275cmp=e.Xpm({type:u,selectors:[["mfmp-fusion-face"]],inputs:{elements:"elements",sortFields:"sortFields",coreQuery:"coreQuery",fullQuery:"fullQuery"},outputs:{doit:"doit",formChanges:"formChanges",sqlChanges:"sqlChanges"},standalone:!0,features:[e._Bn([{provide:S.d}],[v.ib]),e.jDz],decls:100,vars:40,consts:[[1,"wrapper"],["expanded","false"],[1,"header"],[3,"routerLink"],[3,"formGroup"],[1,"children","mat-elevation-z2"],[1,"start"],[1,"nuclides"],[1,"elements"],[3,"role","title","multiselect","formGroupName","caption","elementsList"],[1,"join"],["type","button","mat-flat-button","","formControlName","elementJoin","ngDefaultControl","",1,"mat-elevation-z2",3,"click"],[1,"results"],[1,"neutrinos"],["formControlName","inputNeutrinos","value","left"],["formControlName","noNeutrinos","value","none"],["formControlName","outputNeutrinos","value","right"],[1,"sql"],[1,"tableSet"],["formControlName","tableSet","ngDefaultControl",""],["for","tableSet",3,"matTooltip","matTooltipPosition","matTooltipShowDelay"],["color","primary",3,"inline"],["formControlName","tableSet"],["value","FusionAll","selected",""],["value","FusionAllNewPlus"],[1,"orderBy"],["id","orderBy","formControlName","orderBy","value","orderBy","ngDefaultControl",""],["for","orderBy"],["title","Order by","formControlName","orderBy"],[3,"value",4,"ngFor","ngForOf"],["title","when checked.","formControlName","sortDescending","value","sortDescending"],[1,"fullQuery",3,"formGroup"],["matInput","","formControlName","fullQuery","title","'full query'","value","fullQuery","rows","4"],[1,"coreQuery",3,"formGroup"],["matInput","","formControlName","coreQuery","placeholder","core query","value","coreQuery","rows","4","cols","40"],[3,"defaultLimit","minimum","maximum","step","limitVerbiage","limitSize"],["align","end"],["type","button","mat-raised-button","",3,"click"],["type","button","mat-raised-button","","color","primary","tooltip","(submittable) ? '' : 'Select elements to continue.'",3,"disabled","click"],[3,"value"]],template:function(n,t){if(1&n&&(e.TgZ(0,"mat-card")(1,"mat-card-content")(2,"div",0)(3,"mat-expansion-panel",1)(4,"mat-expansion-panel-header")(5,"p",2),e._uU(6),e.qZA()(),e.TgZ(7,"p"),e._uU(8," To make full use of this and the other database tables, a good grasp of SQL is essential. "),e.qZA(),e.TgZ(9,"p"),e._uU(10," But note that it, "),e.TgZ(11,"a",3),e._uU(12,"TwoToTwo"),e.qZA(),e._uU(13," and "),e.TgZ(14,"a",3),e._uU(15,"Fission"),e.qZA(),e._uU(16," is each dedicated to querying only one of two tables. "),e.qZA(),e.TgZ(17,"p"),e._uU(18,' The "universal" program '),e.TgZ(19,"a",3),e._uU(20,"All Tables"),e.qZA(),e._uU(21,' can accept full SQL commands that query any of the 12 "Parkhomov" tables, together with the "ElementProperties", "Nuclides", "RadioNuclides" and "Atomic Radii" tables as well. '),e.qZA(),e.TgZ(22,"p"),e._uU(23,' You may indicate which of the three neutrino conditions to include: "left" and/or "none" and/or "right". The default condition is include all three. '),e.qZA(),e.TgZ(24,"p"),e._uU(25," In all the above tables, except the Periodic, each atom, in either the input or the output, as well as its 'A' and 'Z' numbers now also has a 'nBorF' ('nuclear Boson or Fermion') and a 'aBorF' ('atomic Boson or Fermion') parameter associated with it. "),e.qZA(),e.TgZ(26,"p"),e._uU(27," An atom's nucleus is considered a Boson ('b') if its A number is even; if odd a Fermion ('f'). The atom itself is considered a Boson ('b') if its number of neutrons (A - Z) is even; if odd a Fermion ('f'). "),e.qZA(),e.TgZ(28,"p"),e._uU(29," These parameters can be used either passively, by observing the distributions of 'b' and 'f' in inputs and/or outputs, and/or actively, by selecting 'b only', 'f only' or 'either' in the boxes below. "),e.qZA(),e.TgZ(30,"p"),e._uU(31," NB: To avoid unnecessary duplication in all Fusion tables, A1 is never greater than A2 in any row, i.e. A1 <= A2. This also applies implicitly in that, if the input side of the Core Query only involves E1 and E2, only rows whose associated mass numbers obey A1 <= A2 will appear in the results "),e.qZA(),e.TgZ(32,"p"),e._uU(33,' To protect the table, only SQL compatible "selection" queries can be allowed and you must enter only the CORE part of that query. '),e.qZA(),e.TgZ(34,"p"),e._uU(35,' Once you do this and click on the "Execute Query" button, the front part (here "select * from FusionAll where ") will be automatically prepended and the full query sent to the database. '),e.qZA(),e.TgZ(36,"p"),e._uU(37," Latest: All queries will now be limited to 1000 possible rows of results; any requested 'limit' greater than 1000 will be reset to 1000; to any core query not including any 'limit' command will be appended 'limit 1000'. "),e.qZA(),e.TgZ(38,"p"),e._uU(39," This Fusion Core Query can refer to any and all of E1, A1, nBorF1, Z1, aBorF1, E2, A2, nBorF2, Z2 or aBorF2 (the inputs) and to any and all of E, A, nBorF, Z or aBorF (the output). "),e.qZA()(),e.TgZ(40,"form",4)(41,"div",5)(42,"h3",6),e._uU(43," Select elements from the 'Left Side (E1)' and/or the 'Right Side (E2)' to begin. "),e.qZA(),e.TgZ(44,"div",7)(45,"div",8),e._UZ(46,"mfmp-nuclide-picker",9),e.TgZ(47,"div",10)(48,"button",11),e.NdJ("click",function(){return t.toggleJoin()}),e._uU(49),e.qZA()(),e._UZ(50,"mfmp-nuclide-picker",9),e.qZA(),e.TgZ(51,"div",12),e._UZ(52,"mfmp-nuclide-picker",9),e.qZA()(),e.TgZ(53,"div",13)(54,"div")(55,"p"),e._uU(56," Tick neutrino (nu) contributions to be included (default is all three). "),e.qZA()(),e.TgZ(57,"div")(58,"mat-checkbox",14),e._uU(59," Left "),e.qZA(),e.TgZ(60,"mat-checkbox",15),e._uU(61," None "),e.qZA(),e.TgZ(62,"mat-checkbox",16),e._uU(63," Right "),e.qZA()()(),e.TgZ(64,"div",17)(65,"div",18)(66,"mat-form-field",19)(67,"mat-label",20),e._uU(68," Table Set: "),e.TgZ(69,"mat-icon",21),e._uU(70,"info"),e.qZA()(),e.TgZ(71,"mat-select",22)(72,"mat-option",23),e._uU(73,"FusionAll"),e.qZA(),e.TgZ(74,"mat-option",24),e._uU(75,"FusionAllNewPlus"),e.qZA()()()(),e.TgZ(76,"div",25)(77,"mat-form-field",26)(78,"mat-label",27),e._uU(79,"Order By:"),e.qZA(),e.TgZ(80,"mat-select",28),e.YNc(81,W,2,2,"mat-option",29),e.qZA()(),e.TgZ(82,"div")(83,"mat-checkbox",30),e._uU(84," Descending "),e.qZA()()(),e.TgZ(85,"div",31)(86,"mat-label"),e._uU(87,"Full Query"),e.qZA(),e._UZ(88,"textarea",32),e.qZA(),e.TgZ(89,"div",33)(90,"mat-form-field")(91,"mat-label"),e._uU(92,"Core Query"),e.qZA(),e._UZ(93,"textarea",34),e.qZA()(),e.TgZ(94,"mfmp-resultsize-picker",35),e.NdJ("limitSize",function(i){return t.setResultLimit(i)}),e.qZA()()()()()(),e.TgZ(95,"mat-card-actions",36)(96,"button",37),e.NdJ("click",function(){return t.resetForm()}),e._uU(97,"RESET"),e.qZA(),e.TgZ(98,"button",38),e.NdJ("click",function(){return t.buildRequestForm()}),e._uU(99," SUBMIT "),e.qZA()()()),2&n){let o;e.xp6(6),e.Oqu(t.description),e.xp6(5),e.Q6J("routerLink",e.DdM(37,ee)),e.xp6(3),e.Q6J("routerLink",e.DdM(38,te)),e.xp6(5),e.Q6J("routerLink",e.DdM(39,ne)),e.xp6(21),e.Q6J("formGroup",t.fusionForm),e.xp6(6),e.Q6J("role","query")("title","Left side (E1)")("multiselect",!0)("formGroupName","leftNuclides")("caption","Left")("elementsList",t.elements),e.xp6(3),e.hij(" ",null==(o=t.fusionForm.get("elementJoin"))?null:o.value," "),e.xp6(1),e.Q6J("role","query")("title","Right side (E2)")("multiselect",!0)("formGroupName","rightNuclides")("caption","Right")("elementsList",t.elements),e.xp6(2),e.Q6J("role","result")("title","Results (E)")("multiselect",!0)("formGroupName","resultNuclides")("caption","Result")("elementsList",t.elements),e.xp6(15),e.s9C("matTooltip",t.tablesText),e.Q6J("matTooltipPosition","after")("matTooltipShowDelay",t.tooltipDelay),e.xp6(2),e.Q6J("inline",!0),e.xp6(12),e.Q6J("ngForOf",t.sortFields),e.xp6(4),e.Q6J("formGroup",t.sqlForm),e.xp6(4),e.Q6J("formGroup",t.sqlForm),e.xp6(5),e.Q6J("defaultLimit",1e3)("minimum",0)("maximum",1e3)("step",50)("limitVerbiage","Limit results to ... rows."),e.xp6(4),e.Q6J("disabled",!t.submittable)}},dependencies:[g.ez,g.sg,O.JF,M.ot,M.lW,b.QW,b.a8,b.hq,b.dn,P.p9,P.oG,v.To,v.ib,v.yz,z.N6,E.Ps,E.Hw,U.c,U.Nt,C.KE,C.hX,G.Fk,B.LD,B.gD,K.ey,V.KP,L.AV,L.gM,C.lN,X.g,l.UX,l._Y,l.Fj,l.JJ,l.JL,l.sg,l.u,l.x0,H.X,y.Bz,y.rH],styles:["div.wrapper[_ngcontent-%COMP%]{height:100%}.mat-expansion-panel-header.mat-expanded[_ngcontent-%COMP%], .mat-expansion-panel-header.mat-expanded[_ngcontent-%COMP%]:hover{background-color:#fafafa80}.mat-mdc-card[_ngcontent-%COMP%], .mat-mdc-card-content[_ngcontent-%COMP%]{height:100%}mat-expansion-panel#blurb[_ngcontent-%COMP%]{margin-bottom:1ex}h3.start[_ngcontent-%COMP%]{margin-top:2ex;width:100%;font-weight:500;text-align:center}div.children[_ngcontent-%COMP%]{display:flex;flex-direction:column;padding-top:1em}div.children[_ngcontent-%COMP%]   div.nuclides[_ngcontent-%COMP%]{display:flex;flex-direction:row;align-items:stretch;justify-content:space-evenly;margin-bottom:1ex}div.children[_ngcontent-%COMP%]   div.nuclides[_ngcontent-%COMP%]   div.elements[_ngcontent-%COMP%]{display:flex;flex-direction:row;align-items:center}div.children[_ngcontent-%COMP%]   div.nuclides[_ngcontent-%COMP%]   div.elements[_ngcontent-%COMP%]   div.join[_ngcontent-%COMP%]{margin:1em}div.neutrinos[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:center;align-items:stretch;margin-bottom:1ex}div.sql[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:space-evenly;align-items:flex-start}div.sql[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:nth-child(3){flex:3}div.sql[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:last-child{display:flex;flex-direction:row}.buttoncolumn[_ngcontent-%COMP%]{display:flex;flex-direction:column}div.fullQuery[_ngcontent-%COMP%]{display:none}div.coreQuery[_ngcontent-%COMP%]{padding:1em;display:flex;flex-direction:row;justify-content:flex-start;align-items:center}div.tableSet[_ngcontent-%COMP%], div.tableSet[_ngcontent-%COMP%]   .tableSetGroup[_ngcontent-%COMP%]{display:flex;flex-direction:column}div.tableSet[_ngcontent-%COMP%]   input.hidden[_ngcontent-%COMP%]{visibility:collapse}div.orderBy[_ngcontent-%COMP%]{display:flex;flex-direction:column}span.resultLimitHeader[_ngcontent-%COMP%]{display:flex;flex-direction:row}span.resultLimitHeader[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{display:inline-block;flex:1;font-size:smaller}div.flexrow[_ngcontent-%COMP%]{width:100%;display:flex;flex-direction:row;justify-content:flex-end;align-items:baseline}div.flexrow[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:nth-child(2){flex:2}.fill[_ngcontent-%COMP%]{margin:1em}div.resultLimit[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:stretch}div.resultLimit[_ngcontent-%COMP%]   mat-slider[_ngcontent-%COMP%]{width:30%}p.header[_ngcontent-%COMP%]{text-overflow:ellipsis;padding-right:2em}"],changeDetection:0}),m})(),se=(()=>{var u;class m{constructor(n){this.headerService=n,this.store=(0,e.f3M)(Z.yh),this.http=(0,e.f3M)(k.I),this.router=(0,e.f3M)(y.F0),this.coreQuery="",this.fullQuery="",this.route=this.router.routerState.root,this.ready=new j.X(!1),this.subscriptions=new q.w0,this.submittable=!1,this.description='This program ("Fusion.php") enables SQL commands to coreQuery the Fusion tables originally created from Dr Parkhomov\'s spreadsheets.',this.buildSpinClause=t=>{const o=[];let i="";return"bf"!==t.leftNuclides.nuclearSpin&&o.push(`nBorF1 = '${t.leftNuclides.nuclearSpin}'`),"bf"!==t.leftNuclides.atomicSpin&&o.push(`aBorF1 = '${t.leftNuclides.atomicSpin}'`),"bf"!==t.rightNuclides.nuclearSpin&&o.push(`nBorF2 = '${t.rightNuclides.nuclearSpin}'`),"bf"!==t.rightNuclides.atomicSpin&&o.push(`aBorF2 = '${t.rightNuclides.atomicSpin}'`),"bf"!==t.resultNuclides.nuclearSpin&&o.push(`nBorF = '${t.resultNuclides.nuclearSpin}'`),"bf"!==t.resultNuclides.atomicSpin&&o.push(`aBorF = '${t.resultNuclides.atomicSpin}'`),o.length>0&&(i=o.join(" and ")),i},this.buildElementsClause=t=>{const o=t.leftNuclides.selectedElements??[],i=t.rightNuclides.selectedElements??[],a=t.resultNuclides.selectedElements??[],h=t.elementJoin;let r={startGroup:"",left:"",join:"",right:"",resultJoin:"",endGroup:"",result:""};o.length>0&&(r.left=`E1 in ${this.combineElements(o,[],!0)}`),i.length>0&&(r.right=`E2 in ${this.combineElements(i,[],!0)}`),r.left&&r.right&&(r.join=h,"or"===h&&(r.startGroup="(",r.endGroup=")"),r.join=` ${r.join} `),a.length>0&&((o.length>0||i.length>0)&&(r.result=" and"),r.result+=` E in ${this.combineElements(a,[],!0)}`);const F=`${r.startGroup}${r.left}${r.join}${r.right}${r.endGroup}${r.result}`;return console.log(F),F},this.buildCoreQuery=t=>{const o=t.resultLimit,i=t.orderBy,a=t.sortDescending,ue="from "+t.tableSet;let $="",N="",T="";const D=this.buildNeutrinoClause(t.inputNeutrinos,t.noNeutrinos,t.outputNeutrinos),R=this.buildSpinClause(t),x=this.buildElementsClause(t);let f=[];D&&f.push(D),x&&f.push(x),R&&f.push(R),f.length>0&&($=f.join(" and ")),i&&(N=`order by ${i}`,!0===a&&(N+=" desc")),o&&(T=`limit ${o}`),this.coreQuery=`${x} ${N} ${T}`.trim().replace(/\s\s/g," "),this.fullQuery=`select * ${ue} where ${$} ${N} ${T}`},this.submit_coreQuery=t=>{const o=this.buildRequestForm(t);this.store.dispatch(Q.N.setReportParameters({payload:{url:"fusion",reactionType:_.k.Fusion,query:this.coreQuery,tables:3}})),this.store.dispatch(p.Nw.fetchAllResults({payload:o})),this.router.navigate(["/fusion/reports"])},this.forceReset=()=>{this.router.lastSuccessfulNavigation?.extractedUrl.queryParamMap.get("reset")&&(this.store.dispatch(p.Nw.reset()),this.router.navigate(["/fusion"]))},this.buildNeutrinoClause=(t,o,i)=>{let a=[],h="";return t&&a.push("neutrino = 'left'"),o&&a.push("neutrino = 'none'"),i&&a.push("neutrino = 'right'"),a.length>0&&a.length<3&&(h=`(${a.join(" or ")})`),h},this.combineElements=(t,o,i=!1)=>{const a=t.concat(o.filter(h=>t.indexOf(h)<0));return i?`('${a.join("','")}')`:a}}sql_changes(n){if(n){const t=n.coreQuery;new RegExp(/select\s+(.*?)\s+from\s+(.*?)\s+where\s+(.*?)\s+\order\sby\s+(.*?)\s+\limit\s+(.*?)/i).exec(t)}}form_changes(n){this.buildCoreQuery(n)}ngOnDestroy(){this.subscriptions.unsubscribe()}ngOnInit(){this.forceReset(),this.elements=this.store.select(Q.z.selectElements),this.sortFields=this.store.select(Q.z.selectReactionSortFields),this.headerService.buildPageHeader("fusion"),this.ready.next(!0)}buildRequestForm(n){let t=n[0].value,o=n[1],i=new Array;return this.coreQuery=o.get("coreQuery")?.value,i.push(new c.C({key:"doit",value:"execute_query"})),i.push(new c.C({key:"query",value:this.coreQuery})),i.push(new c.C({key:"table_name",value:t.tableSet})),t.inputNeutrinos&&i.push(new c.C({key:"sql_tables[]",value:"left"})),t.noNeutrinos&&i.push(new c.C({key:"sql_tables[]",value:"none"})),t.outputNeutrinos&&i.push(new c.C({key:"sql_tables[]",value:"right"})),i.push(new c.C({key:"nBorF1",value:t.leftNuclides.nuclearSpin})),i.push(new c.C({key:"aBorF1",value:t.leftNuclides.atomicSpin})),i.push(new c.C({key:"nBorF2",value:t.rightNuclides.nuclearSpin})),i.push(new c.C({key:"aBorF2",value:t.rightNuclides.atomicSpin})),i.push(new c.C({key:"nBorF",value:t.resultNuclides.nuclearSpin})),i.push(new c.C({key:"aBorF",value:t.resultNuclides.atomicSpin})),i}}return(u=m).\u0275fac=function(n){return new(n||u)(e.Y36(S.d))},u.\u0275cmp=e.Xpm({type:u,selectors:[["mfmp-fusion-head"]],standalone:!0,features:[e._Bn([{provide:S.d}]),e.jDz],decls:3,vars:8,consts:[[3,"elements","sortFields","coreQuery","fullQuery","doit","formChanges","sqlChanges"]],template:function(n,t){1&n&&(e.TgZ(0,"mfmp-fusion-face",0),e.NdJ("doit",function(i){return t.submit_coreQuery(i)})("formChanges",function(i){return t.form_changes(i)})("sqlChanges",function(i){return t.sql_changes(i)}),e.ALo(1,"async"),e.ALo(2,"async"),e.qZA()),2&n&&e.Q6J("elements",e.lcZ(1,4,t.elements))("sortFields",e.lcZ(2,6,t.sortFields))("coreQuery",t.coreQuery)("fullQuery",t.fullQuery)},dependencies:[g.ez,g.Ov,O.JF,ie]}),m})();var oe=s(2678),J=s(2600),I=s(9783);const le=[{path:"",component:se,providers:[(0,Z.oY)(p.zL),(0,A.y3)([p.Sz]),{provide:I.I,useClass:I.I}]},{path:"reports",component:oe.a,providers:[(0,Z.oY)(p.zL),(0,A.y3)([p.Sz]),{provide:J.K,useClass:J.K},{provide:C.o2,useValue:{appearance:"outline"}}]}]}}]);