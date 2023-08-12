"use strict";(self.webpackChunkv11=self.webpackChunkv11||[]).push([[486],{486:(H,g,a)=>{a.r(g),a.d(g,{ALL_TABLES_ROUTES:()=>X});var h={};a.r(h),a.d(h,{fetchAllResultsErrorAlert:()=>I,loadAllResultsEffect:()=>O,requestPageEffect:()=>Q,requesthAllResultsErrorAlert:()=>B});var u=a(7483),l=a(4221),d=a(8675),E=a(566),e=a(5879),v=a(4664),f=a(7398),b=a(6306),A=a(2096),T=a(9397);const o=(0,l.R7)({source:"AllTables API",events:{Reset:(0,l.uZ)(),"Request Page":(0,l.uZ)(),"Request Page Success":(0,l.Ky)(),"Request Page Failure":t=>({error:t}),"Load Results":(0,l.Ky)(),"Load Results Success":(0,l.Ky)(),"Load Results Failure":t=>({error:t})}});var q=a(2744),C=a(2401);class M extends C.C{constructor(s,n){super(s,n)}}var w=a(5281),U=a(6414),L=a(8045);let c=(()=>{var t;class s{constructor(){this.config=(0,e.f3M)(w._),this.crud=(0,e.f3M)(U.I),this.page="AllTables.php",this.getAllTablesPage=()=>this.crud.getPage(this.page),this.extractAllTablesQuery=r=>(new DOMParser).parseFromString(r,"text/html").body.querySelector("textarea").innerText,this.getAllTablesResults=r=>{const i=new FormData;i.append("doit","execute_query"),i.append("sql_start",r);const m=(0,L.Fj)(i);return this.crud.postPage(this.page,m)},this.extractAllTablesResults=r=>{const x=(new DOMParser).parseFromString(r,"text/html").body.querySelector("table.results").rows[0].cells[0].innerText;return new M(r,[x])}}}return(t=s).\u0275fac=function(r){return new(r||t)},t.\u0275prov=e.Yz7({token:t,factory:t.\u0275fac}),s})();const Q=(0,u.GW)((t=(0,e.f3M)(u.eX))=>{const s=(0,e.f3M)(c);return t.pipe((0,u.l4)(o.requestPage),(0,v.w)(()=>s.getAllTablesPage().pipe((0,f.U)(n=>s.extractAllTablesQuery(n)),(0,f.U)(n=>o.requestPageSuccess({payload:n})),(0,b.K)(n=>(0,A.of)(o.requestPageFailure({error:n}))))))},{functional:!0}),O=(0,u.GW)((t=(0,e.f3M)(u.eX))=>{const s=(0,e.f3M)(c);return t.pipe((0,u.l4)(o.loadResults),(0,v.w)(n=>s.getAllTablesResults(n.query).pipe((0,f.U)(r=>s.extractAllTablesResults(r)),(0,f.U)(r=>o.loadResultsSuccess({payload:r})),(0,b.K)(r=>(0,A.of)(o.loadResultsFailure({error:r}))))))},{functional:!0}),B=(0,u.GW)(()=>{const t=(0,e.f3M)(q.c);return(0,e.f3M)(u.eX).pipe((0,u.l4)(o.requestPageFailure),(0,T.b)(()=>t.showClientError("No results found.")))},{functional:!0,dispatch:!1}),I=(0,u.GW)(()=>{const t=(0,e.f3M)(q.c);return(0,e.f3M)(u.eX).pipe((0,u.l4)(o.loadResultsFailure),(0,T.b)(()=>t.showClientError("No results found.")))},{functional:!0,dispatch:!1}),R={query:"",loading:!1,ready:!1,error:null,results:[],rows:0},N=(0,l.Lq)(R,(0,l.on)(o.reset,()=>({...R})),(0,l.on)(o.requestPage,t=>({...t,query:"",loading:!0,ready:!1,error:null})),(0,l.on)(o.requestPageSuccess,(t,s)=>({...t,loading:!1,ready:!0,query:s.payload})),(0,l.on)(o.requestPageFailure,(t,s)=>({...t,loading:!1,ready:!1,error:s})),(0,l.on)(o.loadResults,(t,s)=>({...t,query:s.query,loading:!0,ready:!1,error:null,results:[],rows:0})),(0,l.on)(o.loadResultsSuccess,(t,s)=>({...t,ready:!0,loading:!1,results:s.payload.reactionResults,rows:s.payload.reactionRows})),(0,l.on)(o.loadResultsFailure,(t,s)=>({...t,loading:!1,error:s.error}))),p=(0,l.Tz)({name:"all-tables",reducer:N});var F=a(6814),P=a(1303),S=a(6223),Z=a(2296),y=a(5195);let z=(()=>{var t;class s{constructor(){this.fb=(0,e.f3M)(S.qu),this.sql=new e.vpe,this.buildForm=()=>{this.form=this.fb.group({query:["",[S.kI.required]]})}}set query(r){this.form&&this.form.get("query")?.patchValue(r,{emitEvents:!1})}get query(){return this.form.get("query")?.value}ngOnInit(){}runQuery(){this.sql.emit(this.query)}}return(t=s).\u0275fac=function(r){return new(r||t)},t.\u0275cmp=e.Xpm({type:t,selectors:[["mfmp-all-tables-face"]],inputs:{query:"query"},outputs:{sql:"sql"},standalone:!0,features:[e.jDz],decls:28,vars:0,consts:[[1,"text"],["rows","10","cols","100","placeholder","Enter your query here:"],["type","button","mat-raised-button","",3,"click"]],template:function(r,i){1&r&&(e.TgZ(0,"mat-card")(1,"mat-card-content")(2,"h3"),e._uU(3," AllTables: In this, any and all of the tables made available by Dr Parkhomov may be invoked by a single SQL command and the results listed. "),e.qZA(),e.TgZ(4,"p"),e._uU(5,' To make full use of this program\'s capabilities, a sound grasp of SQL is essential. Note that a "null" appearing anywhere in the source or results tables indicates either that the value is not known or is not applicable in the context '),e.qZA(),e.TgZ(6,"p"),e._uU(7,' This "universal" program can accept full SQL commands that query any of the 12 "Parkhomov" tables, together with the "ElementProperties", "Nuclides", "RadioNuclides" and "Atomic Radii" tables as well. '),e.qZA(),e.TgZ(8,"p"),e._uU(9," New Feature: In all the above tables except the Periodic, each atom, in either the input or the output, as well as its 'A' and 'Z' numbers now also has a 'nBorF' ('nuclear Boson or Fermion') and a 'aBorF' ('atomic Boson or Fermion') parameter associated with it. An atom's nucleus is considered a Boson if its A number is even; if odd a Fermion (thus nBorF = 'b' or 'f'). The atom itself is considered a Boson if its number of neutrons (A - Z) is even; if odd a Fermion (thus aBorF = 'b' or 'f'). "),e.qZA(),e.TgZ(10,"p"),e._uU(11," The above extra parameters can be used either passively by observing the distributions of 'b' and 'f' in inputs and/or outputs, and/or actively by including some or all of them in the SQL commands themselves. "),e.qZA(),e.TgZ(12,"p"),e._uU(13," To protect the tables, any query that includes any of the words below (whether in upper, lower or mixed case) will be disabled: 'alter', 'create', 'delete', 'drop', 'grant', 'insert', 'modify', 'open', 'password', 'privileges', 'protected', 'rename', 'revoke', 'root', 'set', 'show', 'trigger', 'truncate', 'update', 'use', and 'users'. "),e.qZA(),e.TgZ(14,"p"),e._uU(15," The left and right columns include details of some of the tables from which you may compose your (complete) SQL queries (but only one table need necessarily be used for any query) "),e.qZA(),e.TgZ(16,"p"),e._uU(17," Thus, at the top of the left column are details of the 'FusionAll', 'FissionAll', 'TwoToTwoAll' and 'AtomicRadii' tables while, at the top of the right column, are details of the 'ElementProperties' and the 'Nuclides' tables "),e.qZA(),e.TgZ(18,"p"),e._uU(19," Below are the results of any non-destructive query (but note that SQL syntax mistakes are easy to make, especially in the more complicated queries). Enter your full SQL Query below: (but clear any initial, place-holding or old one first) "),e.qZA(),e.TgZ(20,"h3"),e._uU(21," Enter your full SQL Query below: (but clear any initial, place-holding or old one first) "),e.qZA(),e.TgZ(22,"div",0)(23,"div"),e._UZ(24,"textarea",1),e.qZA(),e.TgZ(25,"div")(26,"button",2),e.NdJ("click",function(){return i.runQuery()}),e._uU(27," EXECUTE QUERY "),e.qZA()()()()())},dependencies:[F.ez,Z.ot,Z.lW,y.QW,y.a8,y.dn],styles:[".mat-mdc-card[_ngcontent-%COMP%]{background:transparent;height:100%}h3[_ngcontent-%COMP%]{text-align:center;font-weight:500}div.text[_ngcontent-%COMP%]{width:100%;display:flex;flex-direction:column;align-items:center}div.text[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:last-child{margin-top:1ex}"]}),s})();const X=[{path:"",component:(()=>{var t;class s{constructor(){this.store=(0,e.f3M)(l.yh),this.router=(0,e.f3M)(P.F0),this.activatedRoute=(0,e.f3M)(P.gz),this.headerService=(0,e.f3M)(d.d),this.query=this.store.selectSignal(p.selectQuery)}ngOnInit(){this.headerService.buildPageHeader("all-tables"),this.store.dispatch(o.requestPage())}submitForm(r){this.store.dispatch(o.loadResults({query:r})),this.router.navigate(["reports"],{relativeTo:this.activatedRoute})}}return(t=s).\u0275fac=function(r){return new(r||t)},t.\u0275cmp=e.Xpm({type:t,selectors:[["mfmp-all-tables"]],standalone:!0,features:[e.jDz],decls:1,vars:1,consts:[[3,"query"]],template:function(r,i){1&r&&e._UZ(0,"mfmp-all-tables-face",0),2&r&&e.Q6J("query",i.query())},dependencies:[F.ez,z],encapsulation:2}),s})(),providers:[(0,l.oY)(p),(0,u.y3)([h]),{provide:c,useClass:c},{provide:d.d,useClass:d.d}]},{path:"reports",component:E.a,providers:[(0,l.oY)(p),(0,u.y3)([h]),{provide:c,useClass:c},{provide:d.d,useClass:d.d}]}]}}]);