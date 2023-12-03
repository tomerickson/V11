"use strict";(self.webpackChunkv11=self.webpackChunkv11||[]).push([[984],{7984:(ue,x,o)=>{o.r(x),o.d(x,{FUSION_ROUTES:()=>oe});var w=o(7483),F=o(4221),m=o(5498),p=o(6814),A=o(9862),e=o(9212),f=o(2655),R=o(5619),O=o(7394),c=o(5220),j=o(5177),k=o(6414),N=o(8675),Z=o(902),l=o(6223),q=o(2296),g=o(5195),M=o(5986),y=o(3305),b=o(5683),z=o(3176),P=o(617),E=o(2032),_=o(7466),U=o(8525),G=o(2202),B=o(2596),V=o(7837),H=o(3131);const X=a=>{const S=a.get("leftNuclides")?.get("selectedElements")?.value||[],i=a.get("rightNuclides")?.get("selectedElements")?.value||[];return 0===S.length&&0===i.length?{missingElements:!0}:null};var Y=o(3680);function K(a,S){if(1&a&&(e.TgZ(0,"mat-option",39),e._uU(1),e.qZA()),2&a){const i=S.$implicit;e.Q6J("value",i.code),e.xp6(1),e.hij(" ",i.code," ")}}const W=()=>["/two-up"],ee=()=>["/fission"],te=()=>["/all-tables"];let ne=(()=>{class a{set coreQuery(i){this._coreQuery=i,this.sqlForm&&this.sqlForm.get("coreQuery")?.patchValue(i,{emitEvents:!1})}get coreQuery(){return this._coreQuery}set fullQuery(i){this._fullQuery=i,this.sqlForm&&this.sqlForm.get("fullQuery")?.patchValue(i,{emitEvents:!1})}get fullQuery(){return this._fullQuery}get elementJoin(){return this.fusionForm.get("elementJoin")?.value}constructor(){this._coreQuery="",this._fullQuery="",this.fb=(0,e.f3M)(l.qu),this.router=(0,e.f3M)(f.F0),this.subscriptions=new O.w0,this.submittable=!1,this.sortBy="",this.sortOrder="",this.doit=new e.vpe,this.formChanges=new e.vpe,this.sqlChanges=new e.vpe,this.description='This program ("Fusion.php") enables SQL commands to query the Fusion tables originally created from Dr Parkhomov\'s spreadsheets.',this.initialCoreQuery=" order by MeV desc limit 1000",this.tablesText="Select Fusion data table from 'FusionAll' (original: MeV > 0.0; 3,921 rows; based on the 'Nuclides' table, 293 nuclides), or FusionAllNewPlus (MeV = +/- any, 8026 rows; based on the 'NuclidesPlus' table, 324 nuclides)",this.tooltipDelay=750,this.buildForm=()=>{this.fusionForm=this.fb.nonNullable.group({tableSet:new l.NI("FusionAll",{nonNullable:!0}),resultLimit:new l.NI(1e3),orderBy:new l.NI("MeV"),elementJoin:new l.NI("and"),sortDescending:new l.NI("desc"),inputNeutrinos:new l.NI(!0),outputNeutrinos:new l.NI(!0),noNeutrinos:new l.NI(!0),leftNuclides:this.fb.nonNullable.group({selectedElements:new l.NI([]),nuclearSpin:new l.NI("bf"),atomicSpin:new l.NI("bf")}),rightNuclides:this.fb.nonNullable.group({selectedElements:new l.NI([]),nuclearSpin:new l.NI("bf"),atomicSpin:new l.NI("bf")}),resultNuclides:this.fb.nonNullable.group({selectedElements:new l.NI([]),nuclearSpin:new l.NI("bf"),atomicSpin:new l.NI("bf")}),hidden:""},{validators:X}),this.subscriptions.add(this.fusionForm.valueChanges.subscribe(i=>this.handleFusionformChanges(i))),this.subscriptions.add(this.sqlForm.valueChanges.subscribe(i=>this.handleSqlFormChanges(i))),this.resetForm(!1)},this.resetForm=(i=!0)=>{this.sqlForm.reset({coreQuery:this.initialCoreQuery}),this.fusionForm.reset({tableSet:"FusionAll",orderBy:"MeV",elementJoin:"and",sortDescending:!0,resultLimit:1e3,inputNeutrinos:!0,outputNeutrinos:!0,noNeutrinos:!0,leftNuclides:{selectedElements:[],atomicSpin:"bf",nuclearSpin:"bf"},rightNuclides:{selectedElements:[],atomicSpin:"bf",nuclearSpin:"bf"},resultNuclides:{selectedElements:[],atomicSpin:"bf",nuclearSpin:"bf"}},{emitEvent:i})},this.resetResults=()=>{},this.handleFusionformChanges=i=>{this.formChanges.emit(i),this.setSubmittable()},this.toggleJoin=()=>{let i=this.fusionForm.get("elementJoin")?.value;i="and"===i?"or":"and",this.fusionForm.get("elementJoin")?.patchValue(i)},this.handleSqlFormChanges=i=>{this.sqlChanges.emit(i),this.setSubmittable()},this.getResultLimit=()=>this.fusionForm.get("resultLimit")?.value,this.setResultLimit=i=>{this.fusionForm.get("resultLimit")?.patchValue(i)},this.setSubmittable=()=>{this.submittable=this.fusionForm.valid||!this.coreQuery.trimStart().startsWith("order")},this.route=this.router.routerState.snapshot.url,this.sqlForm=this.fb.nonNullable.group({coreQuery:new l.NI(this.initialCoreQuery),fullQuery:new l.NI(this.fullQuery)})}buildRequestForm(){this.doit.emit([this.fusionForm,this.sqlForm])}ngOnDestroy(){this.subscriptions.unsubscribe()}ngOnInit(){this.buildForm()}static#e=this.\u0275fac=function(t){return new(t||a)};static#t=this.\u0275cmp=e.Xpm({type:a,selectors:[["mfmp-fusion-face"]],inputs:{elements:"elements",sortFields:"sortFields",coreQuery:"coreQuery",fullQuery:"fullQuery"},outputs:{doit:"doit",formChanges:"formChanges",sqlChanges:"sqlChanges"},standalone:!0,features:[e._Bn([{provide:N.d}],[y.ib]),e.jDz],decls:100,vars:40,consts:[[1,"wrapper"],["expanded","false"],[1,"header"],[3,"routerLink"],[3,"formGroup"],[1,"children","mat-elevation-z2"],[1,"start"],[1,"nuclides"],[1,"elements"],[3,"role","title","multiselect","formGroupName","caption","elementsList"],[1,"join"],["type","button","mat-flat-button","","formControlName","elementJoin","ngDefaultControl","",1,"mat-elevation-z2",3,"click"],[1,"results"],[1,"neutrinos"],["formControlName","inputNeutrinos","value","left"],["formControlName","noNeutrinos","value","none"],["formControlName","outputNeutrinos","value","right"],[1,"sql"],[1,"tableSet"],["formControlName","tableSet","ngDefaultControl",""],["for","tableSet",3,"matTooltip","matTooltipPosition","matTooltipShowDelay"],["color","primary",3,"inline"],["formControlName","tableSet"],["value","FusionAll","selected",""],["value","FusionAllNewPlus"],[1,"orderBy"],["id","orderBy","formControlName","orderBy","value","orderBy","ngDefaultControl",""],["for","orderBy"],["title","Order by","formControlName","orderBy"],[3,"value",4,"ngFor","ngForOf"],["title","when checked.","formControlName","sortDescending","value","sortDescending"],[1,"fullQuery",3,"formGroup"],["matInput","","formControlName","fullQuery","title","'full query'","value","fullQuery","rows","4"],[1,"coreQuery",3,"formGroup"],["matInput","","formControlName","coreQuery","placeholder","core query","value","coreQuery","rows","4","cols","40"],[3,"defaultLimit","minimum","maximum","step","limitVerbiage","limitSize"],["align","end"],["type","button","mat-raised-button","",3,"click"],["type","button","mat-raised-button","","color","primary","tooltip","(submittable) ? '' : 'Select elements to continue.'",3,"disabled","click"],[3,"value"]],template:function(t,n){if(1&t&&(e.TgZ(0,"mat-card")(1,"mat-card-content")(2,"div",0)(3,"mat-expansion-panel",1)(4,"mat-expansion-panel-header")(5,"p",2),e._uU(6),e.qZA()(),e.TgZ(7,"p"),e._uU(8," To make full use of this and the other database tables, a good grasp of SQL is essential. "),e.qZA(),e.TgZ(9,"p"),e._uU(10," But note that it, "),e.TgZ(11,"a",3),e._uU(12,"TwoToTwo"),e.qZA(),e._uU(13," and "),e.TgZ(14,"a",3),e._uU(15,"Fission"),e.qZA(),e._uU(16," is each dedicated to querying only one of two tables. "),e.qZA(),e.TgZ(17,"p"),e._uU(18,' The "universal" program '),e.TgZ(19,"a",3),e._uU(20,"All Tables"),e.qZA(),e._uU(21,' can accept full SQL commands that query any of the 12 "Parkhomov" tables, together with the "ElementProperties", "Nuclides", "RadioNuclides" and "Atomic Radii" tables as well. '),e.qZA(),e.TgZ(22,"p"),e._uU(23,' You may indicate which of the three neutrino conditions to include: "left" and/or "none" and/or "right". The default condition is include all three. '),e.qZA(),e.TgZ(24,"p"),e._uU(25," In all the above tables, except the Periodic, each atom, in either the input or the output, as well as its 'A' and 'Z' numbers now also has a 'nBorF' ('nuclear Boson or Fermion') and a 'aBorF' ('atomic Boson or Fermion') parameter associated with it. "),e.qZA(),e.TgZ(26,"p"),e._uU(27," An atom's nucleus is considered a Boson ('b') if its A number is even; if odd a Fermion ('f'). The atom itself is considered a Boson ('b') if its number of neutrons (A - Z) is even; if odd a Fermion ('f'). "),e.qZA(),e.TgZ(28,"p"),e._uU(29," These parameters can be used either passively, by observing the distributions of 'b' and 'f' in inputs and/or outputs, and/or actively, by selecting 'b only', 'f only' or 'either' in the boxes below. "),e.qZA(),e.TgZ(30,"p"),e._uU(31," NB: To avoid unnecessary duplication in all Fusion tables, A1 is never greater than A2 in any row, i.e. A1 <= A2. This also applies implicitly in that, if the input side of the Core Query only involves E1 and E2, only rows whose associated mass numbers obey A1 <= A2 will appear in the results "),e.qZA(),e.TgZ(32,"p"),e._uU(33,' To protect the table, only SQL compatible "selection" queries can be allowed and you must enter only the CORE part of that query. '),e.qZA(),e.TgZ(34,"p"),e._uU(35,' Once you do this and click on the "Execute Query" button, the front part (here "select * from FusionAll where ") will be automatically prepended and the full query sent to the database. '),e.qZA(),e.TgZ(36,"p"),e._uU(37," Latest: All queries will now be limited to 1000 possible rows of results; any requested 'limit' greater than 1000 will be reset to 1000; to any core query not including any 'limit' command will be appended 'limit 1000'. "),e.qZA(),e.TgZ(38,"p"),e._uU(39," This Fusion Core Query can refer to any and all of E1, A1, nBorF1, Z1, aBorF1, E2, A2, nBorF2, Z2 or aBorF2 (the inputs) and to any and all of E, A, nBorF, Z or aBorF (the output). "),e.qZA()(),e.TgZ(40,"form",4)(41,"div",5)(42,"h3",6),e._uU(43," Select elements from the 'Left Side (E1)' and/or the 'Right Side (E2)' to begin. "),e.qZA(),e.TgZ(44,"div",7)(45,"div",8),e._UZ(46,"mfmp-nuclide-picker",9),e.TgZ(47,"div",10)(48,"button",11),e.NdJ("click",function(){return n.toggleJoin()}),e._uU(49),e.qZA()(),e._UZ(50,"mfmp-nuclide-picker",9),e.qZA(),e.TgZ(51,"div",12),e._UZ(52,"mfmp-nuclide-picker",9),e.qZA()(),e.TgZ(53,"div",13)(54,"div")(55,"p"),e._uU(56," Tick neutrino (nu) contributions to be included (default is all three). "),e.qZA()(),e.TgZ(57,"div")(58,"mat-checkbox",14),e._uU(59," Left "),e.qZA(),e.TgZ(60,"mat-checkbox",15),e._uU(61," None "),e.qZA(),e.TgZ(62,"mat-checkbox",16),e._uU(63," Right "),e.qZA()()(),e.TgZ(64,"div",17)(65,"div",18)(66,"mat-form-field",19)(67,"mat-label",20),e._uU(68," Table Set: "),e.TgZ(69,"mat-icon",21),e._uU(70,"info"),e.qZA()(),e.TgZ(71,"mat-select",22)(72,"mat-option",23),e._uU(73,"FusionAll"),e.qZA(),e.TgZ(74,"mat-option",24),e._uU(75,"FusionAllNewPlus"),e.qZA()()()(),e.TgZ(76,"div",25)(77,"mat-form-field",26)(78,"mat-label",27),e._uU(79,"Order By:"),e.qZA(),e.TgZ(80,"mat-select",28),e.YNc(81,K,2,2,"mat-option",29),e.qZA()(),e.TgZ(82,"div")(83,"mat-checkbox",30),e._uU(84," Descending "),e.qZA()()(),e.TgZ(85,"div",31)(86,"mat-label"),e._uU(87,"Full Query"),e.qZA(),e._UZ(88,"textarea",32),e.qZA(),e.TgZ(89,"div",33)(90,"mat-form-field")(91,"mat-label"),e._uU(92,"Core Query"),e.qZA(),e._UZ(93,"textarea",34),e.qZA()(),e.TgZ(94,"mfmp-resultsize-picker",35),e.NdJ("limitSize",function(r){return n.setResultLimit(r)}),e.qZA()()()()()(),e.TgZ(95,"mat-card-actions",36)(96,"button",37),e.NdJ("click",function(){return n.resetForm()}),e._uU(97,"RESET"),e.qZA(),e.TgZ(98,"button",38),e.NdJ("click",function(){return n.buildRequestForm()}),e._uU(99," SUBMIT "),e.qZA()()()),2&t){let s;e.xp6(6),e.Oqu(n.description),e.xp6(5),e.Q6J("routerLink",e.DdM(37,W)),e.xp6(3),e.Q6J("routerLink",e.DdM(38,ee)),e.xp6(5),e.Q6J("routerLink",e.DdM(39,te)),e.xp6(21),e.Q6J("formGroup",n.fusionForm),e.xp6(6),e.Q6J("role","query")("title","Left side (E1)")("multiselect",!0)("formGroupName","leftNuclides")("caption","Left")("elementsList",n.elements),e.xp6(3),e.hij(" ",null==(s=n.fusionForm.get("elementJoin"))?null:s.value," "),e.xp6(1),e.Q6J("role","query")("title","Right side (E2)")("multiselect",!0)("formGroupName","rightNuclides")("caption","Right")("elementsList",n.elements),e.xp6(2),e.Q6J("role","result")("title","Results (E)")("multiselect",!0)("formGroupName","resultNuclides")("caption","Result")("elementsList",n.elements),e.xp6(15),e.s9C("matTooltip",n.tablesText),e.Q6J("matTooltipPosition","after")("matTooltipShowDelay",n.tooltipDelay),e.xp6(2),e.Q6J("inline",!0),e.xp6(12),e.Q6J("ngForOf",n.sortFields),e.xp6(4),e.Q6J("formGroup",n.sqlForm),e.xp6(4),e.Q6J("formGroup",n.sqlForm),e.xp6(5),e.Q6J("defaultLimit",1e3)("minimum",0)("maximum",1e3)("step",50)("limitVerbiage","Limit results to ... rows."),e.xp6(4),e.Q6J("disabled",!n.submittable)}},dependencies:[p.ez,p.sg,A.JF,q.ot,q.lW,g.QW,g.a8,g.hq,g.dn,M.p9,M.oG,y.To,y.ib,y.yz,z.N6,P.Ps,P.Hw,E.c,E.Nt,b.KE,b.hX,_.Fk,U.LD,U.gD,Y.ey,G.KP,B.AV,B.gM,b.lN,H.g,l.UX,l._Y,l.Fj,l.JJ,l.JL,l.sg,l.u,l.x0,V.X,f.Bz,f.rH],styles:[".wrapper[_ngcontent-%COMP%], .mat-mdc-card[_ngcontent-%COMP%], .mat-mdc-card-content[_ngcontent-%COMP%]{min-height:100%}.mat-expansion-panel-header.mat-expanded[_ngcontent-%COMP%], .mat-expansion-panel-header.mat-expanded[_ngcontent-%COMP%]:hover{background-color:#fafafa80}mat-expansion-panel#blurb[_ngcontent-%COMP%]{margin-bottom:1ex}h3.start[_ngcontent-%COMP%]{margin-top:2ex;width:100%;font-weight:500;text-align:center}div.children[_ngcontent-%COMP%]{display:flex;flex-direction:column;padding-top:1em}div.children[_ngcontent-%COMP%]   div.nuclides[_ngcontent-%COMP%]{display:flex;flex-direction:row;align-items:stretch;justify-content:space-evenly;margin-bottom:1ex}div.children[_ngcontent-%COMP%]   div.nuclides[_ngcontent-%COMP%]   div.elements[_ngcontent-%COMP%]{display:flex;flex-direction:row;align-items:center}div.children[_ngcontent-%COMP%]   div.nuclides[_ngcontent-%COMP%]   div.elements[_ngcontent-%COMP%]   div.join[_ngcontent-%COMP%]{margin:1em}div.neutrinos[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:center;align-items:stretch;margin-bottom:1ex}div.sql[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:space-evenly;align-items:flex-start}div.sql[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:nth-child(3){flex:3}div.sql[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:last-child{display:flex;flex-direction:row}.buttoncolumn[_ngcontent-%COMP%]{display:flex;flex-direction:column}div.fullQuery[_ngcontent-%COMP%]{display:none}div.coreQuery[_ngcontent-%COMP%]{padding:1em;display:flex;flex-direction:row;justify-content:flex-start;align-items:center}div.tableSet[_ngcontent-%COMP%], div.tableSet[_ngcontent-%COMP%]   .tableSetGroup[_ngcontent-%COMP%]{display:flex;flex-direction:column}div.tableSet[_ngcontent-%COMP%]   input.hidden[_ngcontent-%COMP%]{visibility:collapse}div.orderBy[_ngcontent-%COMP%]{display:flex;flex-direction:column}span.resultLimitHeader[_ngcontent-%COMP%]{display:flex;flex-direction:row}span.resultLimitHeader[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{display:inline-block;flex:1;font-size:smaller}div.flexrow[_ngcontent-%COMP%]{width:100%;display:flex;flex-direction:row;justify-content:flex-end;align-items:baseline}div.flexrow[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:nth-child(2){flex:2}.fill[_ngcontent-%COMP%]{margin:1em}div.resultLimit[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:stretch}div.resultLimit[_ngcontent-%COMP%]   mat-slider[_ngcontent-%COMP%]{width:30%}p.header[_ngcontent-%COMP%]{text-overflow:ellipsis;padding-right:2em}"],changeDetection:0})}return a})(),ie=(()=>{class a{constructor(i){this.headerService=i,this.store=(0,e.f3M)(F.yh),this.http=(0,e.f3M)(k.I),this.router=(0,e.f3M)(f.F0),this.coreQuery="",this.fullQuery="",this.route=this.router.routerState.root,this.ready=new R.X(!1),this.subscriptions=new O.w0,this.submittable=!1,this.description='This program ("Fusion.php") enables SQL commands to coreQuery the Fusion tables originally created from Dr Parkhomov\'s spreadsheets.',this.buildSpinClause=t=>{const n=[];let s="";return"bf"!==t.leftNuclides.nuclearSpin&&n.push(`nBorF1 = '${t.leftNuclides.nuclearSpin}'`),"bf"!==t.leftNuclides.atomicSpin&&n.push(`aBorF1 = '${t.leftNuclides.atomicSpin}'`),"bf"!==t.rightNuclides.nuclearSpin&&n.push(`nBorF2 = '${t.rightNuclides.nuclearSpin}'`),"bf"!==t.rightNuclides.atomicSpin&&n.push(`aBorF2 = '${t.rightNuclides.atomicSpin}'`),"bf"!==t.resultNuclides.nuclearSpin&&n.push(`nBorF = '${t.resultNuclides.nuclearSpin}'`),"bf"!==t.resultNuclides.atomicSpin&&n.push(`aBorF = '${t.resultNuclides.atomicSpin}'`),n.length>0&&(s=n.join(" and ")),s},this.buildElementsClause=t=>{const n=t.leftNuclides.selectedElements??[],s=t.rightNuclides.selectedElements??[],r=t.resultNuclides.selectedElements??[],d=t.elementJoin;let u={startGroup:"",left:"",join:"",right:"",resultJoin:"",endGroup:"",result:""};n.length>0&&(u.left=`E1 in ${this.combineElements(n,[],!0)}`),s.length>0&&(u.right=`E2 in ${this.combineElements(s,[],!0)}`),u.left&&u.right&&(u.join=d,"or"===d&&(u.startGroup="(",u.endGroup=")"),u.join=` ${u.join} `),r.length>0&&((n.length>0||s.length>0)&&(u.result=" and"),u.result+=` E in ${this.combineElements(r,[],!0)}`);const v=`${u.startGroup}${u.left}${u.join}${u.right}${u.endGroup}${u.result}`;return console.log(v),v},this.buildCoreQuery=t=>{const n=t.resultLimit,s=t.orderBy,r=t.sortDescending,re="from "+t.tableSet;let I="",C="",Q="";const $=this.buildNeutrinoClause(t.inputNeutrinos,t.noNeutrinos,t.outputNeutrinos),D=this.buildSpinClause(t),T=this.buildElementsClause(t);let h=[];$&&h.push($),T&&h.push(T),D&&h.push(D),h.length>0&&(I=h.join(" and ")),s&&(C=`order by ${s}`,!0===r&&(C+=" desc")),n&&(Q=`limit ${n}`),this.coreQuery=`${T} ${C} ${Q}`.trim().replace(/\s\s/g," "),this.fullQuery=`select * ${re} where ${I} ${C} ${Q}`},this.submit_coreQuery=t=>{const n=this.buildRequestForm(t);this.store.dispatch(Z.N.setReportParameters({payload:{url:"fusion",reactionType:j.k.Fusion,query:this.coreQuery,tables:3}})),this.store.dispatch(m.Nw.fetchAllResults({payload:n})),this.router.navigate(["/fusion/reports"])},this.forceReset=()=>{this.router.lastSuccessfulNavigation?.extractedUrl.queryParamMap.get("reset")&&(this.store.dispatch(m.Nw.reset()),this.router.navigate(["/fusion"]))},this.buildNeutrinoClause=(t,n,s)=>{let r=[],d="";return t&&r.push("neutrino = 'left'"),n&&r.push("neutrino = 'none'"),s&&r.push("neutrino = 'right'"),r.length>0&&r.length<3&&(d=`(${r.join(" or ")})`),d},this.combineElements=(t,n,s=!1)=>{const r=t.concat(n.filter(d=>t.indexOf(d)<0));return s?`('${r.join("','")}')`:r}}sql_changes(i){if(i){const t=i.coreQuery;new RegExp(/select\s+(.*?)\s+from\s+(.*?)\s+where\s+(.*?)\s+\order\sby\s+(.*?)\s+\limit\s+(.*?)/i).exec(t)}}form_changes(i){this.buildCoreQuery(i)}ngOnDestroy(){this.subscriptions.unsubscribe()}ngOnInit(){this.forceReset(),this.elements=this.store.select(Z.z.selectElements),this.sortFields=this.store.select(Z.z.selectReactionSortFields),this.headerService.buildPageHeader("fusion"),this.ready.next(!0)}buildRequestForm(i){let t=i[0].value,n=i[1],s=new Array;return this.coreQuery=n.get("coreQuery")?.value,s.push(new c.C({key:"doit",value:"execute_query"})),s.push(new c.C({key:"query",value:this.coreQuery})),s.push(new c.C({key:"table_name",value:t.tableSet})),t.inputNeutrinos&&s.push(new c.C({key:"sql_tables[]",value:"left"})),t.noNeutrinos&&s.push(new c.C({key:"sql_tables[]",value:"none"})),t.outputNeutrinos&&s.push(new c.C({key:"sql_tables[]",value:"right"})),s.push(new c.C({key:"nBorF1",value:t.leftNuclides.nuclearSpin})),s.push(new c.C({key:"aBorF1",value:t.leftNuclides.atomicSpin})),s.push(new c.C({key:"nBorF2",value:t.rightNuclides.nuclearSpin})),s.push(new c.C({key:"aBorF2",value:t.rightNuclides.atomicSpin})),s.push(new c.C({key:"nBorF",value:t.resultNuclides.nuclearSpin})),s.push(new c.C({key:"aBorF",value:t.resultNuclides.atomicSpin})),s}static#e=this.\u0275fac=function(t){return new(t||a)(e.Y36(N.d))};static#t=this.\u0275cmp=e.Xpm({type:a,selectors:[["mfmp-fusion-head"]],standalone:!0,features:[e._Bn([{provide:N.d}]),e.jDz],decls:3,vars:8,consts:[[3,"elements","sortFields","coreQuery","fullQuery","doit","formChanges","sqlChanges"]],template:function(t,n){1&t&&(e.TgZ(0,"mfmp-fusion-face",0),e.NdJ("doit",function(r){return n.submit_coreQuery(r)})("formChanges",function(r){return n.form_changes(r)})("sqlChanges",function(r){return n.sql_changes(r)}),e.ALo(1,"async"),e.ALo(2,"async"),e.qZA()),2&t&&e.Q6J("elements",e.lcZ(1,4,n.elements))("sortFields",e.lcZ(2,6,n.sortFields))("coreQuery",n.coreQuery)("fullQuery",n.fullQuery)},dependencies:[p.ez,p.Ov,A.JF,ne]})}return a})();var se=o(2678),L=o(2600),J=o(9783);const oe=[{path:"",component:ie,providers:[(0,F.oY)(m.zL),(0,w.y3)([m.Sz]),{provide:J.I,useClass:J.I}]},{path:"reports",component:se.a,providers:[(0,F.oY)(m.zL),(0,w.y3)([m.Sz]),{provide:L.K,useClass:L.K},{provide:b.o2,useValue:{appearance:"outline"}}]}]}}]);