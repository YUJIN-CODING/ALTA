"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[5134],{17611:function(e,n,t){t.d(n,{Z:function(){return l}});var r=t(72791),o=t(61889),i=t(68870),c=t(98426),s=t(37164),a=t(4618),u=t(80184);function l(e){var n=e.code,t=e.language,l=(0,r.useContext)(a.C),f=l.codeLine,x=l.setCodeLine;return(0,u.jsx)(o.ZP,{container:!0,direction:"column",spacing:5,sx:d,className:"codeBlock",children:(0,u.jsx)(i.Z,{children:(0,u.jsx)(c.Z,{language:t.toLowerCase(),style:s.Z,className:"highlighter",showLineNumbers:!0,wrapLines:!0,lineProps:function(e){return{id:"codeLine-".concat(e),style:{display:"block",background:f===e?"rgb(41,62,98)":"inherit"},onClick:function(){if(f!==e){x(e);var n=document.getElementById("outlined-multiline-static-comment");n&&n.scrollIntoView({behavior:"smooth"})}else x(0)}}},children:n})})})}var d={height:"33rem",overflowY:"scroll",width:"100%",margin:"0 auto",boxSizing:"content-box"}},25361:function(e,n,t){t.d(n,{Z:function(){return re}});var r=t(30168),o=t(16871),i=t(79958),c=t(68870),s=t(84395),a=t(59332),u=t(6488),l=t(24886),d=t(83281),f=t(45987),x=t(1413),p=t(15861),h=t(29439),g=t(87757),m=t.n(g),Z=t(72791),v=t(84697),b=t(65117),j=t(39124),C=t(43896),w=t(13400),k=t(20890),y=t(18128),B=t(27358),S=t(37405),T=t(5022),L=t(10703),I=t(36151),z=t(61889),F=t(29823),P=t(79436),N=t(40167),D=t(37765),R=t(80184);function M(e){var n=e.data,t=e.setOpen,r=(0,o.s0)(),i=function(){var e=(0,p.Z)(m().mark((function e(n){return m().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,D.X)();case 2:if(e.sent.status){e.next=4;break}r("/");case 4:return e.next=6,(0,P.ql)(Number(n.alertId));case 6:n.isChecked=!0;case 7:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}();return(0,R.jsx)(R.Fragment,{children:n.map((function(e){return(0,R.jsx)(T.Z,{onClick:function(){!function(e){e.isChecked||i(e),r("".concat(e.url)),t(!1)}(e)},children:(0,R.jsx)(c.Z,{sx:O,children:(0,R.jsxs)(L.Z,{style:Q,elevation:1,children:[(0,R.jsx)(I.Z,{startIcon:(0,R.jsx)(F.Z,{}),disableRipple:!0,sx:Y}),(0,R.jsx)(z.ZP,{container:!0,direction:"row",sx:X,children:(0,R.jsxs)(z.ZP,{item:!0,sx:e.isChecked?V:null,children:[(0,R.jsxs)(z.ZP,{sx:E,children:[(0,R.jsx)(c.Z,{children:(0,R.jsx)("h4",{children:e.senderNickName})}),(0,R.jsx)(k.Z,{sx:_,children:(0,N.$)(e.time)})]}),(0,R.jsx)(k.Z,{sx:W,children:e.content})]})})]})})},e.alertId)}))})}var O={position:"relative",marginBottom:3},Q={width:"100%",margin:"10px 0"},X={paddingLeft:2,paddingRight:6,paddingY:2},Y={color:"#212121",position:"absolute",right:"10px",top:"35px",padding:0,minWidth:"10px"},E={display:"flex",justifyContent:"space-between"},_={color:"gray",marginRight:"10px",marginTop:"17px"},V={color:"gray",textDecoration:"line-through",cursor:"default"},W={marginBottom:2},$=t(89641),q=["children","value","index"];function A(){var e=(0,o.s0)(),n=(0,Z.useContext)($.Nt),t=n.alertData,r=n.badgeCnt,i=n.setBadgeCnt,s=(0,Z.useState)(!1),a=(0,h.Z)(s,2),u=a[0],l=a[1],f=(0,Z.useState)(0),g=(0,h.Z)(f,2),T=g[0],L=g[1],I=(0,Z.useState)(!1),z=(0,h.Z)(I,2),F=z[0],N=z[1],O=(0,Z.useRef)(null),Q=t.filter((function(e){return!1===e.isChecked}));(0,Z.useEffect)((function(){N(!1),Q=t.filter((function(e){return!1===e.isChecked})),i(Q.length)}),[]),(0,Z.useEffect)((function(){i(Q.length)}),[Q]);var X=function(){var n=(0,p.Z)(m().mark((function n(){return m().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,(0,D.X)();case 2:if(n.sent.status){n.next=4;break}e("/");case 4:return N(!0),n.next=7,(0,P.jm)();case 7:l(!1),i(0),Q=t.filter((function(e){return!1===e.isChecked}));case 10:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}();return(0,R.jsxs)(c.Z,{children:[(0,R.jsx)(d.Z,{title:"\uc54c\ub9bc",children:(0,R.jsx)(v.Z,{badgeContent:r,anchorOrigin:{vertical:"bottom",horizontal:"right"},overlap:"circular",sx:H,children:(0,R.jsx)(y.Z,{ref:O,sx:{fontSize:"40px",cursor:"pointer"},id:"basic-button","aria-controls":u?"basic-menu":void 0,"aria-haspopup":"true","aria-expanded":u?"true":void 0,onClick:function(){return l(!u)}})})}),(0,R.jsxs)(b.Z,{id:"basic-menu",anchorEl:O.current,open:u,onClose:function(){return l(!u)},MenuListProps:{"aria-labelledby":"basic-button"},children:[(0,R.jsx)(c.Z,{sx:{borderBottom:1,borderColor:"divider"},children:(0,R.jsxs)(j.Z,{value:T,onChange:function(e,n){L(n)},"aria-label":"basic tabs example",children:[(0,R.jsx)(C.Z,(0,x.Z)({label:"\uc548\uc77d\uc740 \uc54c\ub9bc\ub9cc \ubcf4\uae30"},te(0))),(0,R.jsx)(C.Z,(0,x.Z)({label:"\uc804\uccb4 \uc54c\ub9bc \ubcf4\uae30"},te(1)))]})}),(0,R.jsxs)(c.Z,{sx:G,children:[(0,R.jsx)(ne,{value:T,index:0,children:r?(0,R.jsxs)(c.Z,{children:["\uc804\uccb4 \uc77d\uc74c",F?(0,R.jsx)(w.Z,{children:(0,R.jsx)(B.Z,{sx:K})}):(0,R.jsx)(w.Z,{onClick:X,children:(0,R.jsx)(S.Z,{sx:ee})}),(0,R.jsx)(M,{data:Q,setOpen:l})]}):(0,R.jsx)(k.Z,{sx:{color:"error.main",fontSize:"20px"},children:"\uc0c8\ub85c\uc6b4 \uc54c\ub9bc\uc774 \uc5c6\uc2b5\ub2c8\ub2e4"})}),(0,R.jsx)(ne,{value:T,index:1,children:(0,R.jsx)(M,{data:t,setOpen:l})})]})]})]})}var J,U,G={width:"35rem",display:"flex",height:"30rem"},H={"& .MuiBadge-badge":{color:"text.primary",backgroundColor:"secondary.main"}},K={color:"primary.main"},ee={color:"gray"};function ne(e){var n=e.children,t=e.value,r=e.index,o=(0,f.Z)(e,q);return(0,R.jsx)("div",(0,x.Z)((0,x.Z)({role:"tabpanel",hidden:t!==r,id:"simple-tabpanel-".concat(r),"aria-labelledby":"simple-tab-".concat(r)},o),{},{children:t===r&&(0,R.jsx)(c.Z,{sx:{p:3},children:n})}))}function te(e){return{id:"simple-tab-".concat(e),"aria-controls":"simple-tabpanel-".concat(e)}}function re(){var e=(0,o.s0)();return(0,R.jsx)(c.Z,{sx:oe,children:(0,R.jsxs)(s.Z,{sx:ie,children:[(0,R.jsx)(ce,{src:l,alt:""}),(0,R.jsxs)(c.Z,{sx:{display:"flex",alignItems:"center"},children:[(0,R.jsx)(se,{children:(0,R.jsx)(A,{})}),(0,R.jsx)(d.Z,{title:"\ub9c8\uc774 \ud398\uc774\uc9c0",children:(0,R.jsx)(se,{onClick:function(){return e("/mypage")},children:(0,R.jsx)(a.Z,{sx:{fontSize:"40px",cursor:"pointer"}})})}),(0,R.jsx)(d.Z,{title:"\ub85c\uadf8\uc544\uc6c3",children:(0,R.jsx)(se,{onClick:function(){localStorage.removeItem("jwt"),localStorage.removeItem("refresh"),localStorage.removeItem("userData"),e("/")},children:(0,R.jsx)(u.Z,{sx:{fontSize:"40px",cursor:"pointer"}})})})]})]})})}var oe={height:"55px"},ie={display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center",height:"55px",padding:"0 20px"},ce=i.Z.img(J||(J=(0,r.Z)(["\n  width: 100px;\n"]))),se=i.Z.button(U||(U=(0,r.Z)(["\n  all: unset;\n  display: flex;\n  align-items: center;\n  justify-content: space-around;\n  margin-left: 10px;\n"])))},29592:function(e,n,t){t.d(n,{Z:function(){return i}});t(72791);var r=t(68870),o=t(80184);function i(e){var n=e.header,t=e.contents;return(0,o.jsxs)(r.Z,{sx:c,children:[(0,o.jsx)(r.Z,{sx:s,children:n}),(0,o.jsx)(r.Z,{sx:a,children:t})]})}var c={display:"flex",flexDirection:"column",height:"100vh"},s={flex:"0 1 auto",width:"100%"},a={flex:"1 1 auto",overflowY:"scroll",scrollbarWidth:"none"}},83281:function(e,n,t){t.d(n,{Z:function(){return x}});var r=t(4942),o=t(1413),i=t(45987),c=t(97639),s=t(69293),a=t(37430),u=t(47630),l=t(80184),d=["className"],f=(0,u.ZP)((function(e){var n=e.className,t=(0,i.Z)(e,d);return(0,l.jsx)(c.Z,(0,o.Z)((0,o.Z)({},t),{},{arrow:!0,classes:{popper:n}}))}))((function(){var e;return e={},(0,r.Z)(e,"& .".concat(s.Z.arrow),{color:a.FT}),(0,r.Z)(e,"& .".concat(s.Z.tooltip),{backgroundColor:a.FT}),e}));function x(e){var n=e.children,t=e.title;return(0,l.jsx)(f,{title:t,children:n})}},4618:function(e,n,t){t.d(n,{C:function(){return x},Z:function(){return p}});var r=t(15861),o=t(29439),i=t(87757),c=t.n(i),s=t(72791),a=t(75709),u=t(37765),l=t(79436),d=t(80184),f={code:a.P9,setCode:function(){return null},reviews:[],setReviews:function(){return null},codeLine:0,setCodeLine:function(){return null},getCode:function(){return null},getReview:function(){return null},user:"",codeTree:[],setCodeTree:function(){return null},getCodeTree:function(){return null},isCompleted:!1,setIsCompleted:function(){return null}},x=s.createContext(f);function p(e){var n=e.children,t=(0,s.useState)(a.P9),i=(0,o.Z)(t,2),f=i[0],p=i[1],h=(0,s.useState)([]),g=(0,o.Z)(h,2),m=g[0],Z=g[1],v=(0,s.useState)(0),b=(0,o.Z)(v,2),j=b[0],C=b[1],w=(0,s.useState)([]),k=(0,o.Z)(w,2),y=k[0],B=k[1],S=(0,s.useState)(!1),T=(0,o.Z)(S,2),L=T[0],I=T[1],z=function(){var e=(0,r.Z)(c().mark((function e(n,t){var r;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,u.X)();case 2:if(e.sent.status){e.next=5;break}return e.abrupt("return",{status:-1,message:"login token error"});case 5:return e.prev=5,e.next=8,(0,l.YF)(n,t);case 8:return r=e.sent,p(r),e.abrupt("return",{status:1,message:"success get code data"});case 13:return e.prev=13,e.t0=e.catch(5),e.abrupt("return",{status:-2,message:"fail get code data"});case 16:case"end":return e.stop()}}),e,null,[[5,13]])})));return function(n,t){return e.apply(this,arguments)}}(),F=function(){var e=(0,r.Z)(c().mark((function e(n){var t,r;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,u.X)();case 2:if(e.sent.status){e.next=5;break}return e.abrupt("return",{status:-1,message:"login token error"});case 5:return e.prev=5,e.next=8,(0,l.oB)(n);case 8:return t=e.sent,r=L?t:t.filter((function(e){return!1===e.completed})),Z(r),e.abrupt("return",{status:1,message:"success get review data"});case 14:return e.prev=14,e.t0=e.catch(5),e.abrupt("return",{status:-2,message:"fail get review data"});case 17:case"end":return e.stop()}}),e,null,[[5,14]])})));return function(n){return e.apply(this,arguments)}}(),P=function(){var e=(0,r.Z)(c().mark((function e(n){var t;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,u.X)();case 2:if(e.sent.status){e.next=5;break}return e.abrupt("return",{status:-1,message:"login token error"});case 5:return e.prev=5,e.next=8,(0,l.Mg)(n);case 8:return t=e.sent,B(t),e.abrupt("return",{status:1,message:"success get code tree data"});case 13:return e.prev=13,e.t0=e.catch(5),e.abrupt("return",{status:-2,message:"fail get code tree data"});case 16:case"end":return e.stop()}}),e,null,[[5,13]])})));return function(n){return e.apply(this,arguments)}}(),N=localStorage.getItem("UserData"),D=N?JSON.parse(N).nickname:"",R={code:f,reviews:m,setCode:p,setReviews:Z,codeLine:j,setCodeLine:C,getCode:z,getReview:F,user:D,codeTree:y,setCodeTree:B,getCodeTree:P,isCompleted:L,setIsCompleted:I};return(0,d.jsx)(x.Provider,{value:R,children:n})}},37430:function(e,n,t){t.d(n,{FT:function(){return c},Lr:function(){return r},S_:function(){return i},VF:function(){return o},zQ:function(){return s}});var r="#6d9886",o="#d9cab3",i="#c99f9f",c="#212121",s="#f6f6f6"},40167:function(e,n,t){function r(e){var n=new Date,t=new Date(e),r=Math.floor((n.getTime()-t.getTime())/1e3/60);if(r<1)return"\ubc29\uae08 \uc804";if(r<60)return"".concat(r,"\ubd84 \uc804");var o=Math.floor(r/60);if(o<24)return"".concat(o,"\uc2dc\uac04 \uc804");var i=Math.floor(o/24);return i<7?"".concat(i,"\uc77c \uc804"):"".concat(t.getFullYear(),". ").concat(t.getMonth()+1,". ").concat(t.getDate())}t.d(n,{$:function(){return r}})},34390:function(e,n,t){t.d(n,{cl:function(){return u},Z1:function(){return f},s9:function(){return l},A8:function(){return d}});var r=t(15861),o=t(87757),i=t.n(o),c=t(21830),s=t.n(c),a=t(37430);function u(e,n,t){s().fire({title:e,text:n,showConfirmButton:!0,icon:"success",iconColor:a.Lr,confirmButtonColor:a.Lr,confirmButtonText:"\ud655\uc778",color:a.FT,background:a.zQ}).then((function(){t&&t()}))}function l(e,n,t){s().fire({title:e,text:n,icon:"error",iconColor:a.S_,color:a.FT,background:a.zQ,showConfirmButton:!0,confirmButtonColor:a.S_,confirmButtonText:"\ub3cc\uc544\uac00\uae30"}).then((function(){t&&t()}))}function d(e,n){s().fire({title:e,text:n,color:a.FT,iconColor:a.Lr,background:a.zQ,allowOutsideClick:!1,showCancelButton:!1,timerProgressBar:!0,didOpen:function(){var e=(0,r.Z)(i().mark((function e(){return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:s().showLoading();case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()})}function f(e,n,t,r,o){s().fire({title:e,text:n,icon:"warning",showCancelButton:!0,confirmButtonColor:a.Lr,confirmButtonText:"\ud655\uc778",cancelButtonColor:a.S_,color:a.FT,background:a.zQ}).then((function(e){e.isConfirmed&&s().fire({title:"".concat(t),text:"".concat(r),icon:"success",showConfirmButton:!0,confirmButtonColor:a.Lr,confirmButtonText:"\ud655\uc778",color:a.FT,background:a.zQ}).then((function(){o&&o()}))}))}},24886:function(e,n,t){e.exports=t.p+"static/media/logo.0df96c2bb9d1ccad030e.webp"}}]);
//# sourceMappingURL=5134.005b06fd.chunk.js.map