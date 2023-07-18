"use strict";(self.webpackChunkv11=self.webpackChunkv11||[]).push([[807],{6807:(he,M,s)=>{s.r(M),s.d(M,{FISSION_ROUTES:()=>ae});var e=s(5879),c=s(6814),O=s(8675),o=s(6223),g=s(5195),q=s(5986),y=s(3305),b=s(1303),P=s(7394),V=s(3131);const _=r=>0===(r.get("nuclides")?.get("selectedElements")?.value||[]).length?{missingElements:!0}:null;var Q=s(5683),R=s(3176),L=s(8525),v=s(2202),Z=s(7466),U=s(2032),z=s(617),B=s(2296),j=s(7837);function D(r,m){if(1&r&&(e.TgZ(0,"p"),e._uU(1),e.qZA()),2&r){const i=e.oxw();e.xp6(1),e.Oqu(i.usageVerbiage)}}let H=(()=>{class r{constructor(){this.defaultLimit=10,this.minimum=0,this.maximum=1e3,this.step=.1,this.mevLimit=new e.vpe,this._limit=this.defaultLimit}get limit(){return this._limit}set limit(i){this._limit=i,this.mevLimit.emit(this._limit)}get limitText(){return this.limitVerbiage.replace("...",`${this.limit}`)}}return r.\u0275fac=function(i){return new(i||r)},r.\u0275cmp=e.Xpm({type:r,selectors:[["mfmp-mev-picker"]],inputs:{defaultLimit:"defaultLimit",minimum:"minimum",maximum:"maximum",step:"step",limitVerbiage:"limitVerbiage",usageVerbiage:"usageVerbiage"},outputs:{mevLimit:"mevLimit"},standalone:!0,features:[e.jDz],decls:8,vars:6,consts:[[1,"mev-picker"],[1,"mev-header"],[4,"ngIf"],[1,"mev-slider"],["showTickMarks","false","discrete","",3,"min","max","step"],["placeholder","thumb","matSliderThumb","",3,"ngModel","ngModelChange"]],template:function(i,t){1&i&&(e.TgZ(0,"div",0)(1,"div",1)(2,"p"),e._uU(3),e.qZA(),e.YNc(4,D,2,1,"p",2),e.qZA(),e.TgZ(5,"div",3)(6,"mat-slider",4)(7,"input",5),e.NdJ("ngModelChange",function(n){return t.limit=n}),e.qZA()()()()),2&i&&(e.xp6(3),e.hij("",t.limitText," "),e.xp6(1),e.Q6J("ngIf",t.usageVerbiage),e.xp6(2),e.Q6J("min",t.minimum)("max",t.maximum)("step",t.step),e.xp6(1),e.Q6J("ngModel",t.limit))},dependencies:[c.ez,c.O5,o.u5,o.Fj,o.JJ,o.On,v.KP,v.pH,v.$5],encapsulation:2}),r})();var G=s(8057),Y=s(3680);function X(r,m){if(1&r&&(e.TgZ(0,"mat-option",31),e._uU(1),e.qZA()),2&r){const i=m.$implicit;e.Q6J("value",i.code),e.xp6(1),e.hij(" ",i.code," ")}}const K=function(){return["/two-up"]},W=function(){return["/fusion"]};let ee=(()=>{class r{set coreQuery(i){this._coreQuery=i,this.sqlForm&&this.sqlForm.get("coreQuery")?.patchValue(i,{emitEvents:!1})}get coreQuery(){return this._coreQuery}set fullQuery(i){this._fullQuery=i,this.sqlForm&&this.sqlForm.get("fullQuery")?.patchValue(i,{emitEvents:!1})}get fullQuery(){return this._fullQuery}constructor(){this._coreQuery="",this._fullQuery="",this.doit=new e.vpe,this.fb=(0,e.f3M)(o.qu),this.router=(0,e.f3M)(b.F0),this.description='This program ("Fission.php") enables SQL commands to query the Fission tables created from Dr Parkhomov\'s spreadsheets.',this.tablesText="Select Fission data table from FissionAll (original: MeV > 0.0; 1,733 rows based on the 'Nuclides' table, 293 nuclides), or FissionAllNewPlus (MeV = +/- any; 8037 rows; based on the 'NuclidesPlus' table, 324 Nuclides)",this.initialCoreQuery=" order by MeV desc limit 1000",this.subscriptions=new P.w0,this.submittable=!1,this.sortBy="",this.sortOrder="",this.formChanges=new e.vpe,this.sqlChanges=new e.vpe,this.buildForm=()=>{this.sqlForm=this.fb.nonNullable.group({coreQuery:new o.NI(this.initialCoreQuery),fullQuery:new o.NI("")}),this.fissionForm=this.fb.nonNullable.group({tableSet:new o.NI("FissionAll",{nonNullable:!0}),resultLimit:new o.NI(1e3),mevLimit:new o.NI(0),orderBy:new o.NI("MeV"),sortDescending:new o.NI(!0),inputNeutrinos:new o.NI(!0),outputNeutrinos:new o.NI(!0),noNeutrinos:new o.NI(!0),nuclides:this.fb.nonNullable.group({selectedElements:new o.NI([]),nuclearSpin:new o.NI("bf"),atomicSpin:new o.NI("bf")}),output1:this.fb.nonNullable.group({selectedElements:new o.NI([]),nuclearSpin:new o.NI("bf"),atomicSpin:new o.NI("bf")}),output2:this.fb.nonNullable.group({selectedElements:new o.NI([]),nuclearSpin:new o.NI("bf"),atomicSpin:new o.NI("bf")})},{validators:_}),this.subscriptions.add(this.fissionForm.valueChanges.subscribe(i=>this.handleFissionFormChanges(i))),this.subscriptions.add(this.sqlForm.valueChanges.subscribe(i=>this.handleSqlFormChanges(i)))},this.resetForm=()=>{this.sqlForm.reset({coreQuery:this.initialCoreQuery,fullQuery:""}),this.fissionForm.reset({tableSet:"FissionAll",orderBy:"MeV",sortDescending:!0,resultLimit:1e3,mevLimit:0,inputNeutrinos:!0,outputNeutrinos:!0,noNeutrinos:!0,nuclides:{selectedElements:[],nuclearSpin:"bf",atomicSpin:"bf"},output1:{selectedElements:null,nuclearSpin:"bf",atomicSpin:"bf"},output2:{selectedElements:null,nuclearSpin:"bf",atomicSpin:"bf"}}),this.handleSqlFormChanges(this.sqlForm.value)},this.resetResults=()=>{},this.handleFissionFormChanges=i=>{console.log("form:",i),this.formChanges.emit(i),this.setSubmittable()},this.handleSqlFormChanges=i=>{this.sqlChanges.emit(i),this.setSubmittable()},this.getResultLimit=()=>this.fissionForm.get("resultLimit")?.value,this.setResultLimit=i=>{this.fissionForm.get("resultLimit")?.patchValue(i)},this.setMevLimit=i=>{this.fissionForm.get("mevLimit")?.patchValue(i)},this.setSubmittable=()=>{this.submittable=this.fissionForm.valid||!this.coreQuery.trimStart().startsWith("order")},this.buildResultElements=(i,t)=>{let l=this.combineElements(i,t);this.fissionForm.get("resultNuclides.selectedElements")?.patchValue(l,{onlySelf:!0,emitEvents:!1})},this.combineElements=(i,t,l=!1)=>{const n=i.concat(t.filter(a=>i.indexOf(a)<0));return l?`('${n.join("','")}')`:n},this.route=this.router.routerState.snapshot.url,this.sqlForm=this.fb.nonNullable.group({coreQuery:new o.NI(this.initialCoreQuery),fullQuery:new o.NI("")})}buildRequestForm(){this.doit.emit([this.fissionForm,this.sqlForm])}ngOnDestroy(){this.subscriptions.unsubscribe()}ngOnInit(){this.buildForm()}}return r.\u0275fac=function(i){return new(i||r)},r.\u0275cmp=e.Xpm({type:r,selectors:[["mfmp-fission-face"]],inputs:{elements:"elements",sortFields:"sortFields",coreQuery:"coreQuery",fullQuery:"fullQuery"},outputs:{doit:"doit",formChanges:"formChanges",sqlChanges:"sqlChanges"},standalone:!0,features:[e._Bn([],[y.ib]),e.jDz],decls:88,vars:39,consts:[["expanded","false"],[1,"header"],[3,"routerLink"],[3,"formGroup"],[1,"children","mat-elevation-z2"],[1,"start"],[1,"nuclides"],[3,"role","title","multiselect","formGroupName","caption","elementsList"],[1,"neutrinos"],["formControlName","inputNeutrinos","value","left"],["formControlName","noNeutrinos","value","none"],["formControlName","outputNeutrinos","value","right"],[1,"coreQuery"],[3,"caption","text"],[1,"sql"],["labelPosition","before","formControlName","tableSet","name","tableSet","value","fissionAll"],["value","FissionAll","selected",""],["value","FissionAllNewPlus"],["id","orderBy","formControlName","orderBy","value","orderBy","ngDefaultControl",""],["title","Order by","formControlName","orderBy"],[3,"value",4,"ngFor","ngForOf"],["title","when checked.","formControlName","sortDescending"],[1,"flexrow",3,"formGroup"],[1,"fullQuery"],["matInput","","formControlName","fullQuery","title","'full query'","value","fullQuery","rows","4"],["matInput","","formControlName","coreQuery","title","'core query'","value","coreQuery","rows","4"],[3,"defaultLimit","minimum","maximum","step","limitVerbiage","limitSize"],[3,"defaultLimit","minimum","maximum","step","limitVerbiage","mevLimit"],["align","end"],["type","button","mat-raised-button","",3,"click"],["type","button","mat-raised-button","","color","primary","tooltip","(submittable)? '' : 'Select an element to continue.'",3,"disabled","click"],[3,"value"]],template:function(i,t){1&i&&(e.TgZ(0,"mat-expansion-panel",0)(1,"mat-expansion-panel-header")(2,"p",1),e._uU(3),e.qZA()(),e.TgZ(4,"p"),e._uU(5," To make full use of this and the other database tables, a good grasp of SQL is essential. "),e.qZA(),e.TgZ(6,"p"),e._uU(7," But note that it, "),e.TgZ(8,"a",2),e._uU(9,"TwoToTwo"),e.qZA(),e._uU(10," and "),e.TgZ(11,"a",2),e._uU(12,"Fusion"),e.qZA(),e._uU(13," is each dedicated to querying only one of two tables. "),e.qZA(),e.TgZ(14,"p"),e._uU(15,' The "universal" program All Tables can accept full SQL commands that query any of the 12 "Parkhomov" tables, together with the "ElementProperties", "Nuclides", "RadioNuclides" and "Atomic Radii" tables as well. '),e.qZA(),e.TgZ(16,"p"),e._uU(17,' You may indicate which of the three neutrino conditions to include: "left" and/or "none" and/or "right". The default condition is include all three. '),e.qZA(),e.TgZ(18,"p"),e._uU(19," In all the above tables, except the Periodic, each atom, in either the input or the output, as well as its 'A' and 'Z' numbers now also has a 'nBorF' ('nuclear Boson or Fermion') and a 'aBorF' ('atomic Boson or Fermion') parameter associated with it. "),e.qZA(),e.TgZ(20,"p"),e._uU(21," An atom's nucleus is considered a Boson ('b') if its A number is even; if odd a Fermion ('f'). The atom itself is considered a Boson ('b') if its number of neutrons (A - Z) is even; if odd a Fermion ('f'). "),e.qZA(),e.TgZ(22,"p"),e._uU(23," These parameters can be used either passively, by observing the distributions of 'b' and 'f' in inputs and/or outputs, and/or actively, by selecting 'b only', 'f only' or 'either' in the boxes below. "),e.qZA(),e.TgZ(24,"p"),e._uU(25," NB: To avoid unnecessary duplication in the Fission tables, A1 is never greater than A2 in any row, i.e. A1 <= A2. This also applies implicitly, in that, if the ouput side of the Core Query only involves E1 and E2, only rows for which their associated mass numbers obey the rule that A1 <= A2 will be included in the results "),e.qZA(),e.TgZ(26,"p"),e._uU(27,' To protect the table, only SQL compatible "selection" queries can be allowed and you must enter only the CORE part of that query. '),e.qZA(),e.TgZ(28,"p"),e._uU(29,' Once you do this and click on the "Execute Query" button, the front part (here "select * from FissionAll where ") will be automatically prepended and the full query sent to the database. '),e.qZA(),e.TgZ(30,"p"),e._uU(31," Latest: All queries will now be limited to 1000 possible rows of results; any requested 'limit' greater than 1000 will be reset to 1000; to any core query not including any 'limit' command will be appended 'limit 1000'. "),e.qZA(),e.TgZ(32,"p"),e._uU(33," This Fission Core Query can refer to any and all of E, A, nBorF, Z or aBorF (the inputs), and to any and all of E1, A1, nBorF1, Z1, aBorF2, E2, A2, nBorF2, Z2 or aBorF2 (the outputs). "),e.qZA()(),e.TgZ(34,"form",3)(35,"div",4)(36,"h3",5),e._uU(37,"Select an element below to begin."),e.qZA(),e.TgZ(38,"div",6),e._UZ(39,"mfmp-nuclide-picker",7)(40,"mfmp-nuclide-picker",7)(41,"mfmp-nuclide-picker",7),e.qZA(),e.TgZ(42,"div",8)(43,"div")(44,"p"),e._uU(45," Tick neutrino contributions to be included (default is all three). "),e.qZA()(),e.TgZ(46,"div")(47,"mat-checkbox",9),e._uU(48," Left "),e.qZA(),e.TgZ(49,"mat-checkbox",10),e._uU(50," None "),e.qZA(),e.TgZ(51,"mat-checkbox",11),e._uU(52," Right "),e.qZA()()()(),e.TgZ(53,"mat-card",12)(54,"mat-card-content"),e._UZ(55,"mfmp-expandable-box",13),e.TgZ(56,"div",14)(57,"div")(58,"mat-radio-group",15)(59,"mat-radio-button",16),e._uU(60," FissionAll "),e.qZA(),e.TgZ(61,"mat-radio-button",17),e._uU(62," FissionAllNewPlus "),e.qZA()()(),e.TgZ(63,"div")(64,"mat-form-field",18)(65,"mat-label"),e._uU(66,"Order By:"),e.qZA(),e.TgZ(67,"mat-select",19),e.YNc(68,X,2,2,"mat-option",20),e.qZA()(),e.TgZ(69,"div")(70,"mat-checkbox",21),e._uU(71," Descending "),e.qZA()()()(),e.TgZ(72,"div",22)(73,"div",23)(74,"mat-label"),e._uU(75,"Full Query"),e.qZA(),e._UZ(76,"textarea",24),e.qZA(),e.TgZ(77,"div",12)(78,"mat-label"),e._uU(79,"Core Query"),e.qZA(),e._UZ(80,"textarea",25),e.qZA(),e.TgZ(81,"mfmp-resultsize-picker",26),e.NdJ("limitSize",function(n){return t.setResultLimit(n)}),e.qZA(),e.TgZ(82,"mfmp-mev-picker",27),e.NdJ("mevLimit",function(n){return t.setMevLimit(n)}),e.qZA()()(),e.TgZ(83,"mat-card-actions",28)(84,"button",29),e.NdJ("click",function(){return t.resetForm(),t.resetResults()}),e._uU(85," RESET "),e.qZA(),e.TgZ(86,"button",30),e.NdJ("click",function(){return t.buildRequestForm()}),e._uU(87," SUBMIT "),e.qZA()()()()),2&i&&(e.xp6(3),e.Oqu(t.description),e.xp6(5),e.Q6J("routerLink",e.DdM(37,K)),e.xp6(3),e.Q6J("routerLink",e.DdM(38,W)),e.xp6(23),e.Q6J("formGroup",t.fissionForm),e.xp6(5),e.Q6J("role","query")("title","Elements")("multiselect",!1)("formGroupName","nuclides")("caption","Elements")("elementsList",t.elements),e.xp6(1),e.Q6J("role","result")("title","Output 1")("multiselect",!1)("formGroupName","output1")("caption","Output 1")("elementsList",t.elements),e.xp6(1),e.Q6J("role","result")("title","Output 2")("multiselect",!1)("formGroupName","output2")("caption","Output 2")("elementsList",t.elements),e.xp6(14),e.Q6J("caption","Tables:")("text",t.tablesText),e.xp6(13),e.Q6J("ngForOf",t.sortFields),e.xp6(4),e.Q6J("formGroup",t.sqlForm),e.xp6(9),e.Q6J("defaultLimit",1e3)("minimum",0)("maximum",1e3)("step",50)("limitVerbiage","Limit results to ... rows."),e.xp6(1),e.Q6J("defaultLimit",10)("minimum",0)("maximum",100)("step",.1)("limitVerbiage","Limit to MeV greater then ..."),e.xp6(4),e.Q6J("disabled",!t.submittable))},dependencies:[c.ez,c.sg,B.ot,B.lW,g.QW,g.a8,g.hq,g.dn,q.p9,q.oG,y.To,y.ib,y.yz,Q.lN,Q.KE,Q.hX,R.N6,z.Ps,U.c,U.Nt,Z.Fk,Z.VQ,Z.U0,L.LD,L.gD,Y.ey,v.KP,V.g,o.UX,o._Y,o.Fj,o.JJ,o.JL,o.sg,o.u,o.x0,j.X,b.Bz,b.rH,H,G.t],styles:[".mat-expansion-panel-header.mat-expanded[_ngcontent-%COMP%], .mat-expansion-panel-header.mat-expanded[_ngcontent-%COMP%]:hover{background-color:#fafafa80}.mat-card-content[_ngcontent-%COMP%]{width:100%}mat-expansion-panel#blurb[_ngcontent-%COMP%]{margin-bottom:1ex}h3.start[_ngcontent-%COMP%]{margin-top:2ex;margin-left:2em;width:100%;font-weight:500}div.children[_ngcontent-%COMP%]{display:flex;flex-direction:column;background-color:transparent}div.children[_ngcontent-%COMP%]   div.nuclides[_ngcontent-%COMP%]{display:flex;flex-direction:row;align-items:stretch;justify-content:space-around;margin-bottom:1ex}div.neutrinos[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:center;align-items:baseline;margin-bottom:1ex}div.vl[_ngcontent-%COMP%]{border-left:1px solid darkgray;margin-top:1ex;margin-bottom:1ex}div.sql[_ngcontent-%COMP%]{width:100%;display:flex;flex-direction:row;justify-content:space-between}div.sql[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:last-child{display:flex;flex-direction:row}mat-card.coreQuery[_ngcontent-%COMP%]{background-color:transparent}mat-card.coreQuery[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{width:100%}div.fullQuery[_ngcontent-%COMP%]{display:none}div.coreQuery[_ngcontent-%COMP%]{padding:1em;display:flex;flex-direction:row;justify-content:stretch}div.coreQuery[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:first-child{display:block;flex:1}div.coreQuery[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:last-child{display:block;flex:4;border-radius:5px;border:1px solid #ccc;box-shadow:1px 1px 1px #999}mat-form-field#orderBy[_ngcontent-%COMP%]{flex-direction:row!important}div.flexrow[_ngcontent-%COMP%]{width:100%;display:flex;flex-direction:row;justify-content:stretch;align-items:baseline}div.flexrow[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{flex:1}.fill[_ngcontent-%COMP%]{margin:1em}span.resultLimitHeader[_ngcontent-%COMP%]{display:flex;flex-direction:row}span.resultLimitHeader[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{display:inline-block;flex:1;font-size:smaller}div.resultLimit[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:stretch}div.resultLimit[_ngcontent-%COMP%]   mat-slider[_ngcontent-%COMP%]{width:30%}p.header[_ngcontent-%COMP%]{text-overflow:ellipsis;padding-right:2em}"]}),r})();var x=s(4221),te=s(6475),N=s(902),h=s(9306),ie=s(9862),ne=s(5177),u=s(5220);let se=(()=>{class r{constructor(i){this.headerService=i,this.asyncPipe=(0,e.f3M)(c.Ov),this.store=(0,e.f3M)(x.yh),this.http=(0,e.f3M)(te.I),this.router=(0,e.f3M)(b.F0),this.coreQuery="",this.fullQuery="",this.route=this.router.routerState.root,this.ready=(0,e.tdS)(!1),this.subscriptions=new P.w0,this.submittable=!1,this.description='This program ("Fission.php") enables SQL commands to coreQuery the Fission tables originally created from Dr Parkhomov\'s spreadsheets.',this.buildCoreQuery=t=>{const l=t.resultLimit,n=t.mevLimit,a=t.orderBy,p=t.sortDescending,pe="from "+t.tableSet,I=this.buildNeutrinoClause(t.inputNeutrinos,t.noNeutrinos,t.outputNeutrinos),T=[],d=[];let C="",S="",J="",F="",w="",A="";"bf"!==t.nuclides.nuclearSpin&&d.push(`nBorF1 = '${t.nuclides.nuclearSpin}'`),"bf"!==t.nuclides.atomicSpin&&d.push(`aBorF1 = '${t.nuclides.atomicSpin}'`),"bf"!==t.output1.nuclearSpin&&d.push(`nBorF2 = '${t.output1.nuclearSpin}'`),"bf"!==t.output1.atomicSpin&&d.push(`aBorF2 = '${t.output1.atomicSpin}'`),"bf"!==t.output2.nuclearSpin&&d.push(`nBorF = '${t.output2.nuclearSpin}'`),"bf"!==t.output2.atomicSpin&&d.push(`aBorF = '${t.output2.atomicSpin}'`),d.length>0&&(S=d.join(" and "));const $=t.nuclides.selectedElements??[];$.length>0&&T.push(`E = '${$}'`),T.length>0&&(C=T.join(" and ")),n>0&&(A=`and MeV > ${n}`);let f=[];I&&f.push(I),C&&f.push(C),S&&f.push(S),f.length>0&&(J=f.join(" and ")),a&&(F=`order by ${a}`,!0===p&&(F+=" desc"),console.log("descending",p)),l&&(w=`limit ${l}`),this.coreQuery=`${C} ${A} ${F} ${w}`.trim().replace(/\s\s/g," "),this.fullQuery=`select * ${pe} where ${J} ${A} ${F} ${w}`},this.submit_coreQuery=t=>{const l=this.buildRequestForm(t);this.store.dispatch(N.QJ.setReportParameters({payload:{url:"fission",reactionType:ne.k.Fission,query:this.coreQuery}})),this.store.dispatch(h.HC.fetchAllResults({payload:l})),this.router.navigate(["/fission/reports"])},this.forceReset=()=>{this.router.lastSuccessfulNavigation?.extractedUrl.queryParamMap.get("reset")&&(this.store.dispatch(h.HC.reset()),this.router.navigate(["/fission"]))},this.buildNeutrinoClause=(t,l,n)=>{let a=[],p="";return t&&a.push("neutrino = 'left'"),l&&a.push("neutrino = 'none'"),n&&a.push("neutrino = 'right'"),a.length>0&&a.length<3&&(p=`(${a.join(" or ")})`),p},this.combineElements=(t,l,n=!1)=>{const a=t.concat(l.filter(p=>t.indexOf(p)<0));return n?`('${a.join("','")}')`:a}}sql_changes(i){if(console.log("form",i),i){const t=i.coreQuery,n=new RegExp(/select\s+(.*?)\s+from\s+(.*?)\s+where\s+(.*?)\s+\order\sby\s+(.*?)\s+\limit\s+(.*?)/i).exec(t);console.log("clauses",n)}}form_changes(i){this.buildCoreQuery(i)}ngOnDestroy(){this.subscriptions.unsubscribe()}ngOnInit(){this.forceReset(),this.elements=this.store.select(N.dS.selectElements),this.sortFields=this.store.select(N.dS.selectReactionSortFields),this.headerService.buildPageHeader("fission"),this.ready.set(!0)}buildRequestForm(i){let t=i[0].value,l=i[1],n=new Array;return this.coreQuery=l.get("coreQuery")?.value,n.push(new u.C({key:"doit",value:"execute_query"})),n.push(new u.C({key:"query",value:this.coreQuery})),n.push(new u.C({key:"table_name",value:t.tableSet})),t.inputNeutrinos&&n.push(new u.C({key:"sql_tables[]",value:"left"})),t.noNeutrinos&&n.push(new u.C({key:"sql_tables[]",value:"none"})),t.outputNeutrinos&&n.push(new u.C({key:"sql_tables[]",value:"right"})),n.push(new u.C({key:"nBorF1",value:t.nuclides.nuclearSpin})),n.push(new u.C({key:"aBorF1",value:t.nuclides.atomicSpin})),n.push(new u.C({key:"nBorF2",value:t.output1.nuclearSpin})),n.push(new u.C({key:"aBorF2",value:t.output1.atomicSpin})),n.push(new u.C({key:"nBorF",value:t.output2.nuclearSpin})),n.push(new u.C({key:"aBorF",value:t.output2.atomicSpin})),n}}return r.\u0275fac=function(i){return new(i||r)(e.Y36(O.d))},r.\u0275cmp=e.Xpm({type:r,selectors:[["mfmp-fission-head"]],standalone:!0,features:[e._Bn([c.Ov,{provide:O.d}]),e.jDz],decls:3,vars:8,consts:[[3,"elements","sortFields","coreQuery","fullQuery","doit","formChanges","sqlChanges"]],template:function(i,t){1&i&&(e.TgZ(0,"mfmp-fission-face",0),e.NdJ("doit",function(n){return t.submit_coreQuery(n)})("formChanges",function(n){return t.form_changes(n)})("sqlChanges",function(n){return t.sql_changes(n)}),e.ALo(1,"async"),e.ALo(2,"async"),e.qZA()),2&i&&e.Q6J("elements",e.lcZ(1,4,t.elements))("sortFields",e.lcZ(2,6,t.sortFields))("coreQuery",t.coreQuery)("fullQuery",t.fullQuery)},dependencies:[c.ez,c.Ov,ie.JF,ee]}),r})();var oe=s(566),E=s(7483),re=s(4364),le=s(2600),k=s(2200);const ae=[{path:"",component:se,providers:[(0,x.oY)(h.TO),(0,E.y3)([h.Sz]),{provide:k.z,useClass:k.z}]},{path:"reports",component:oe.a,providers:[(0,x.oY)(h.TO),(0,E.y3)([h.Sz]),{provide:le.K,useClass:re.L}]}]}}]);