"use strict";(self.webpackChunkv11=self.webpackChunkv11||[]).push([[592],{9693:(m,l,n)=>{n.d(l,{s:()=>_});var r=n(9212),a=n(2655);let _=(()=>{class t{constructor(s,e){this._elementRef=s,this._router=e}ngOnInit(){console.log("htmldirective oninit")}ngOnChanges(){if(console.log("htmldirective onchanges"),this.html){this._uniqueId||=[...this._elementRef.nativeElement.attributes].find(e=>e.name.startsWith("_ngcontent-")).name,this._elementRef.nativeElement.innerHTML=this.html;const s=this._elementRef.nativeElement.querySelectorAll("*");for(const e of s)if(e.setAttribute(this._uniqueId,""),"A"===e.tagName){const o=e.href?.toLowerCase();o?.startsWith(location.origin.toLowerCase())&&e.addEventListener("click",i=>{this._router.navigate([o.substring(location.origin.length)]),i.preventDefault()})}}else this._elementRef.nativeElement.innerHTML=null}static#t=this.\u0275fac=function(e){return new(e||t)(r.Y36(r.SBq),r.Y36(a.F0))};static#e=this.\u0275dir=r.lG2({type:t,selectors:[["","mfmp-html",""]],inputs:{html:"html"},standalone:!0,features:[r.TTD]})}return t})()},2070:(m,l,n)=>{n.d(l,{O:()=>c});var r=n(6814),a=n(5940),_=n(5195),t=n(9212);let c=(()=>{class s{static#t=this.\u0275fac=function(i){return new(i||s)};static#e=this.\u0275cmp=t.Xpm({type:s,selectors:[["mfmp-progress-spinner"]],standalone:!0,features:[t.jDz],decls:2,vars:0,consts:[["mode","indeterminate",1,"progress-spinner"]],template:function(i,u){1&i&&(t.TgZ(0,"div"),t._UZ(1,"mat-progress-spinner",0),t.qZA())},dependencies:[r.ez,_.QW,a.Cq,a.Ou],styles:["div[_ngcontent-%COMP%]{width:100%}.progress-spinner[_ngcontent-%COMP%]{margin-top:3em;margin-left:auto;margin-right:auto}"]})}return s})()}}]);