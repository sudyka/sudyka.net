(this["webpackJsonpsudyka.net"]=this["webpackJsonpsudyka.net"]||[]).push([[0],{17:function(e,s,t){},63:function(e,s,t){"use strict";t.r(s);var c=t(0),l=t.n(c),a=t(23),i=t.n(a),j=(t(17),t(18)),r=t(8),b=t.p+"static/media/logo.6ce24c58.svg",n=t(1),d=function(e){return Object(n.jsx)("footer",{className:"footer",children:Object(n.jsx)("small",{children:Object(n.jsxs)("nobr",{children:["\xa0\xa9 2021 Jack Sudyka. All Rights Reserved. | Powered by",Object(n.jsx)("img",{src:b,className:"react-logo",alt:"logo"}),Object(n.jsx)("a",{className:"react-link",href:"https://reactjs.org",target:"_blank",rel:"noopener noreferrer",children:"React"})]})})})},o=t(71),x=t(72),O=t(70),h=function(e){var s=e.directory;return Object(n.jsx)("header",{className:"header",children:Object(n.jsxs)(o.a,{bg:"dark",expand:"lg",sticky:"top",variant:"dark",children:[Object(n.jsx)(o.a.Brand,{children:Object(n.jsxs)(j.b,{className:"brand",to:"/",children:["\xa0Sudyka:\\",s,">",Object(n.jsx)("span",{className:"cursor"})]})}),Object(n.jsx)(o.a.Toggle,{"aria-controls":"navbar"}),Object(n.jsx)(o.a.Collapse,{id:"navbar",children:Object(n.jsxs)(x.a,{className:"mr-auto",children:[Object(n.jsxs)(O.a,{menuVariant:"dark",title:"5e Materials",children:[Object(n.jsx)(O.a.Item,{as:j.b,to:"/5e/subclasses",children:"Subclasses"}),Object(n.jsx)(O.a.Item,{as:j.b,to:"/5e/spells",children:"Spells"}),Object(n.jsx)(O.a.Divider,{}),Object(n.jsx)(O.a.Item,{as:j.b,to:"/5e/monsters",children:"Monsters"})]}),Object(n.jsx)(x.a.Link,{as:j.b,className:"link",to:"/about",children:"About"}),Object(n.jsx)(x.a.Link,{as:j.b,className:"link",to:"/tech",children:"Tech"})]})})]})})},u=function(e){return Object(n.jsxs)("div",{className:"app",children:[Object(n.jsx)(h,{directory:"about\\"}),Object(n.jsx)("main",{className:"body",children:Object(n.jsx)("p",{children:"Hello World!"})}),Object(n.jsx)(d,{})]})},m=function(e){return Object(n.jsxs)("div",{className:"app",children:[Object(n.jsx)(h,{directory:""}),Object(n.jsx)("main",{className:"body",children:Object(n.jsx)("p",{children:"Hello World!"})}),Object(n.jsx)(d,{})]})},g=function(e){return Object(n.jsxs)("div",{className:"app",children:[Object(n.jsx)(h,{directory:"5e\\monsters\\"}),Object(n.jsx)("main",{className:"body",children:Object(n.jsx)("p",{children:"Hello Monsters!"})}),Object(n.jsx)(d,{})]})},p=function(e){return Object(n.jsxs)("div",{className:"app",children:[Object(n.jsx)(h,{directory:"5e\\spells\\"}),Object(n.jsx)("main",{className:"body",children:Object(n.jsx)("p",{children:"Hello World!"})}),Object(n.jsx)(d,{})]})},f=t(21),v=t(68),S=t(69),y=t(73),k=function(e){var s=e.abilities,t=e.subclass;return Object(n.jsx)(n.Fragment,{children:s.map((function(e){return Object(n.jsxs)(n.Fragment,{children:[Object(n.jsxs)(y.a,{bg:"dark",border:t.theme,style:{width:"90%"},children:[Object(n.jsxs)(y.a.Header,{children:["Level ",e.level,": ",e.title]}),Object(n.jsx)(y.a.Body,{children:Object(n.jsx)(y.a.Text,{children:e.text})})]}),Object(n.jsx)("br",{})]})}))})},N=t(48),w=function(e){var s=e.title,t=e.subclasses,l=Object(c.useState)(!1),a=Object(f.a)(l,2),i=a[0],r=a[1];return Object(n.jsxs)(n.Fragment,{children:[Object(n.jsx)(N.a,{active:i,disabled:!t||0===t.length,className:"class",onClick:function(){return r(!i)},size:"lg",variant:"dark",children:s}),i&&t.map((function(e){return Object(n.jsx)(N.a,{as:j.b,className:"subclass",variant:"outline-"+e.theme,to:"#"+e.slug,children:e.title})}))]})},A=function(e){var s=Object(c.useState)(null),t=Object(f.a)(s,2),l=t[0],a=t[1],i=Object(c.useState)([]),j=Object(f.a)(i,2),r=j[0],b=j[1];return Object(n.jsxs)("div",{className:"app",children:[Object(n.jsx)(h,{directory:"5e\\subclasses\\"}),Object(n.jsx)("main",{className:"body",children:Object(n.jsxs)(v.a,{children:[Object(n.jsxs)(S.a,{xs:"3",children:[Object(n.jsx)(w,{selectAbilities:b,selectSubclass:a,title:"Artificer",subclasses:[]}),Object(n.jsx)(w,{selectAbilities:b,selectSubclass:a,title:"Barbarian",subclasses:[]}),Object(n.jsx)(w,{selectAbilities:b,selectSubclass:a,title:"Bard",subclasses:[{title:"College of Snakeoil",slug:"college-of-snakeoil",theme:"weird-west"}]}),Object(n.jsx)(w,{selectAbilities:b,selectSubclass:a,title:"Cleric",subclasses:[]}),Object(n.jsx)(w,{selectAbilities:b,selectSubclass:a,title:"Druid",subclasses:[{title:"Circle of the Sun",slug:"circle-of-the-sun",theme:"weird-west"}]}),Object(n.jsx)(w,{selectAbilities:b,selectSubclass:a,title:"Fighter",subclasses:[]}),Object(n.jsx)(w,{selectAbilities:b,selectSubclass:a,title:"Monk",subclasses:[{title:"Way of the Brave",slug:"way-of-the-brave",theme:"weird-west"}]}),Object(n.jsx)(w,{selectAbilities:b,selectSubclass:a,title:"Paladin",subclasses:[{title:"Oath of the Badge",slug:"oath-of-the-badge",theme:"weird-west"}]}),Object(n.jsx)(w,{selectAbilities:b,selectSubclass:a,title:"Ranger",subclasses:[]}),Object(n.jsx)(w,{selectAbilities:b,selectSubclass:a,title:"Rogue",subclasses:[{title:"Detective",slug:"detective",theme:"noir"},{title:"Gambler",slug:"gambler",theme:"weird-west"}]}),Object(n.jsx)(w,{selectAbilities:b,selectSubclass:a,title:"Sorcerer",subclasses:[]}),Object(n.jsx)(w,{selectAbilities:b,selectSubclass:a,title:"Warlock",subclasses:[]}),Object(n.jsx)(w,{title:"Wizard",subclasses:[{title:"School of Spellslinging",slug:"school-of-spellslinging",theme:"weird-west"}]})]}),Object(n.jsx)(S.a,{xs:"9",children:l?Object(n.jsx)(k,{abilities:r,subclass:l}):Object(n.jsxs)(n.Fragment,{children:[Object(n.jsx)(y.a,{bg:"dark",border:"light",style:{width:"90%"},children:Object(n.jsx)(y.a.Body,{children:Object(n.jsx)(y.a.Text,{children:"Select a subclass on the left to see it's unique abilities."})})}),Object(n.jsx)("br",{})]})})]})}),Object(n.jsx)(d,{})]})},B=function(e){return Object(n.jsxs)("div",{className:"app",children:[Object(n.jsx)(h,{directory:"tech\\"}),Object(n.jsx)("main",{className:"body",children:Object(n.jsx)("p",{children:"Hello World!"})}),Object(n.jsx)(d,{})]})},F=function(e){return Object(n.jsx)(j.a,{children:Object(n.jsxs)(r.c,{children:[Object(n.jsx)(r.a,{exact:!0,path:"/",children:Object(n.jsx)(m,{})}),Object(n.jsx)(r.a,{exact:!0,path:"/5e/monsters",children:Object(n.jsx)(g,{})}),Object(n.jsx)(r.a,{exact:!0,path:"/5e/spells",children:Object(n.jsx)(p,{})}),Object(n.jsx)(r.a,{path:"/5e/subclasses",children:Object(n.jsx)(A,{})}),Object(n.jsx)(r.a,{exact:!0,path:"/about",children:Object(n.jsx)(u,{})}),Object(n.jsx)(r.a,{exact:!0,path:"/tech",children:Object(n.jsx)(B,{})})]})})},C=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,74)).then((function(s){var t=s.getCLS,c=s.getFID,l=s.getFCP,a=s.getLCP,i=s.getTTFB;t(e),c(e),l(e),a(e),i(e)}))};i.a.render(Object(n.jsx)(l.a.StrictMode,{children:Object(n.jsx)(F,{})}),document.getElementById("root")),C()}},[[63,1,2]]]);
//# sourceMappingURL=main.8542fe92.chunk.js.map