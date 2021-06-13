(this.webpackJsonpwebapp=this.webpackJsonpwebapp||[]).push([[3],{105:function(e,t){},112:function(e,t){},166:function(e,t,n){},167:function(e,t,n){"use strict";n.r(t);var c=n(5),r=n.n(c),a=n(80),s=n.n(a),i=n(52),o=n(50),l=n(20),u=n(27),d=n(36),j=n(7),b=function(e){var t=e.className,n=e.linkButton,c=Object(d.a)(e,["className","linkButton"]),r="".concat(n?"block link-button rounded-md ease-in-out text-white focus:outline-none":"block rounded-md ease-in-out text-white focus:outline-none"," ").concat(t||"");return n?Object(j.jsx)("a",Object(u.a)({className:r},c)):Object(j.jsx)("button",Object(u.a)({type:"button",className:r},c))},h=function(e){var t=e.children;return Object(j.jsx)("div",{className:"w-full bg-white shadow-md rounded-lg p-4",children:t})},O=function(e){var t=e.className,n=Object(d.a)(e,["className"]);return Object(j.jsx)("h1",Object(u.a)({className:"font-bold text-center ".concat(t)},n))},x=function(e){var t=e.className,n=Object(d.a)(e,["className"]);return Object(j.jsx)("p",Object(u.a)({className:"text-gray-400 text-center ".concat(t)},n))},m=n(14),f=function(){var e=Object(i.b)(),t=Object(c.useMemo)((function(){if(!e.ethereum)return{};var t=new m.ethers.providers.Web3Provider(e.ethereum),n=t.getSigner();return{provider:t,signer:n}}),[e.status]);return{provider:t.provider,signer:t.signer,wallet:e,chainId:e&&e.chainId,isConnected:Boolean(e&&"connected"===e.status)}},p=function(e){var t=e.className,n=Object(d.a)(e,["className"]);return Object(j.jsx)(x,Object(u.a)({className:"text-red-700 ".concat(t)},n))},v=function(){var e=f().wallet;return Object(j.jsxs)("div",{className:"container md:w-2/6 my-20",children:[Object(j.jsx)(O,{className:"text-xl mb-6",children:"Telegram Unlock Bot"}),Object(j.jsxs)(h,{children:[Object(j.jsx)(O,{children:"Get Started"}),Object(j.jsx)(x,{children:"Connect your wallet to get started."}),e.error?Object(j.jsx)(p,{children:e.error.message}):null,Object(j.jsx)(b,{onClick:function(){return e.connect()},children:"Connect Wallet"})]})]})},k=n(21),w=n(0),g=n.n(w),y=n(3),S=n(88),N={4:{provider:"https://rinkeby.infura.io/v3/86c1641a6ce84463aa05b081494336d8",unlockAddress:"0xd8c88be5e8eb88e38e6ff5ce186d764676012b0b"}},E=function(e){var t=e.className,n=e.children,r=e.lockAddress,a=e.afterPurchase,s=f(),i=s.provider,o=s.signer,l=Object(c.useState)(""),u=Object(k.a)(l,2),d=(u[0],u[1]),h=Object(c.useState)(!1),O=Object(k.a)(h,2),x=O[0],m=O[1],p=function(){var e=Object(y.a)(g.a.mark((function e(){var t;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return m(!0),d(null),e.prev=2,t=new S.a(N),e.next=6,t.connect(i,o);case 6:return e.next=8,t.purchaseKey({lockAddress:r});case 8:a&&a(),e.next=15;break;case 11:e.prev=11,e.t0=e.catch(2),console.error(e.t0),d("Something went wrong");case 15:return e.prev=15,m(!1),e.finish(15);case 18:case"end":return e.stop()}}),e,null,[[2,11,15,18]])})));return function(){return e.apply(this,arguments)}}();return Object(j.jsx)(b,{className:t||"py-1 px-3 text-sm md:min-w-0 my-0 mx-2",onClick:p,children:x?"Unlocking...":n||"Unlock"})},C=function(e){var t=f(),n=t.wallet,r=t.isConnected,a=t.chainId,s=Object(c.useState)(!0),i=Object(k.a)(s,2),o=i[0],l=i[1],u=Object(c.useState)(!0),d=Object(k.a)(u,2),j=d[0],b=d[1],h=Object(c.useState)(0),O=Object(k.a)(h,2),x=O[0],m=O[1];return Object(c.useEffect)((function(){r&&function(){var t=Object(y.a)(g.a.mark((function t(){var c,r;return g.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("/api/channels/".concat(a,"/").concat(e,"?walletAddress=").concat(n.account));case 2:return c=t.sent,t.next=5,c.json();case 5:r=t.sent,l(r.channel),b(!1);case 8:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}()()}),[r,n.account,a,x]),{channel:o,reload:function(){return m(Date.now())},loading:j}},A="Inactive",T="Expired",_="Active",D=function(e){var t=Object(c.useMemo)((function(){if(!e||!e.UserKeys||!e.UserKeys.length)return{status:A};var t=e.UserKeys[0];return new Date>=new Date(t.keyExpiresAt)?{status:T}:{status:_,inviteLink:t.inviteLink,keyExpiresAt:new Date(t.keyExpiresAt).toISOString()}}),[e]);return{status:t.status,inviteLink:t.inviteLink,keyExpiresAt:t.keyExpiresAt}},I=function(e){var t=e.match.params.channelId,n=Object(c.useState)(!1),r=Object(k.a)(n,2),a=r[0],s=r[1],i=C(t),o=i.channel,l=i.loading,u=i.reload,d=D(o),m=d.status,f=d.inviteLink,p=d.keyExpiresAt;if(Object(c.useEffect)((function(){a&&f&&(s(!1),window.open(f,"_blank"))}),[a,f]),l)return Object(j.jsx)(x,{className:"my-3",children:"Loading..."});if(!o)return Object(j.jsx)(x,{className:"my-3",children:"Invalid channel"});return Object(j.jsx)("div",{className:"container px-8 py-4",children:Object(j.jsxs)(h,{children:[Object(j.jsx)(O,{children:o.name}),Object(j.jsx)(x,{children:m===_?"You have an active subscription to the channel that expires on ".concat(new Date(p).toLocaleString(),"."):m===T?"Your subscription to the channel has expired. Renew it to gain access.":"Get an unlock key to gain access to the channel."}),Object(j.jsxs)("div",{className:"flex items-center justify-center",children:[m!==_?null:Object(j.jsx)(b,{linkButton:!0,className:"mx-2",href:f,target:"_blank",rel:"noopener noreferrer",children:"Join Channel"}),Object(j.jsx)(E,{className:"mx-2",lockAddress:o.lockContract,afterPurchase:function(){s(!0),u()},children:m===_?"Extend":m===T?"Renew":"Unlock"})]})]})})},L=function(){var e=f(),t=e.wallet,n=e.isConnected,r=Object(c.useState)(!0),a=Object(k.a)(r,2),s=a[0],i=a[1],o=Object(c.useState)(!0),l=Object(k.a)(o,2),u=l[0],d=l[1],j=Object(c.useState)(0),b=Object(k.a)(j,2),h=b[0],O=b[1];return Object(c.useEffect)((function(){n&&function(){var e=Object(y.a)(g.a.mark((function e(){var n,c;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/api/users/wallet-status?walletAddress=".concat(t.account));case 2:return n=e.sent,e.next=5,n.json();case 5:c=e.sent,i(c.walletLinked),d(!1);case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()()}),[n,t.account,h]),{linked:s,reload:function(){return O(Date.now())},loading:u}},U=function(){var e=f(),t=e.wallet,n=e.isConnected,r=e.chainId,a=Object(c.useState)(!0),s=Object(k.a)(a,2),i=s[0],o=s[1],l=Object(c.useState)(!0),u=Object(k.a)(l,2),d=u[0],j=u[1],b=Object(c.useState)(0),h=Object(k.a)(b,2),O=h[0],x=h[1];return Object(c.useEffect)((function(){n&&function(){var e=Object(y.a)(g.a.mark((function e(){var n,c;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/api/channels/".concat(r,"?walletAddress=").concat(t.account));case 2:return n=e.sent,e.next=5,n.json();case 5:c=e.sent,o(c.channels),j(!1);case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()()}),[n,t.account,r,O]),{channels:i,reload:function(){return x(Date.now())},loading:d}},R=function(e){var t=e.channel,n=e.reloadChannels,c=D(t),r=c.status,a=c.inviteLink,s=c.keyExpiresAt;return Object(j.jsxs)("tr",{children:[Object(j.jsx)("td",{children:t.name}),Object(j.jsx)("td",{children:r}),Object(j.jsx)("td",{children:r!==_?null:s}),Object(j.jsxs)("td",{children:[r!==_?null:Object(j.jsx)(b,{linkButton:!0,href:a,target:"_blank",rel:"noreferrer noopener",className:"py-1 px-3 text-sm md:min-w-0 my-0 mr-2 ml-0",children:"Join Channel"}),Object(j.jsx)(E,{lockAddress:t.lockContract,afterPurchase:n,children:r===_?"Extend":r===T?"Renew":"Unlock"})]})]})},B=function(){var e=U(),t=e.channels,n=e.loading,c=e.reload;return n?Object(j.jsx)(x,{className:"my-3",children:"Loading..."}):t.length?Object(j.jsx)("div",{className:"container",children:Object(j.jsxs)("table",{children:[Object(j.jsx)("thead",{children:Object(j.jsxs)("tr",{children:[Object(j.jsx)("td",{children:"Channel"}),Object(j.jsx)("td",{children:"Membership Status"}),Object(j.jsx)("td",{children:"Expiry Date"}),Object(j.jsx)("td",{children:"Actions"})]})}),Object(j.jsx)("tbody",{children:t.map((function(e){return Object(j.jsx)(R,{reloadChannels:c,channel:e},e.id)}))})]})}):Object(j.jsx)(x,{className:"my-3",children:"You have no active/expired unlock keys to any channel"})},K=n(86),P=function(e){var t=e.reloadStatus,n=f(),r=n.wallet,a=n.signer,s=Object(c.useState)(null),i=Object(k.a)(s,2),o=i[0],l=i[1],u=Object(c.useState)(null),d=Object(k.a)(u,2),m=d[0],v=d[1],w=Object(c.useState)(!1),S=Object(k.a)(w,2),N=S[0],E=S[1];Object(c.useEffect)((function(){if(o){var e=setInterval((function(){return t()}),3e3);return function(){clearInterval(e)}}}),[o]);var C=function(){var e=Object(y.a)(g.a.mark((function e(t){var n,c,s,i,o,u;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),v(null),l(null),E(!0),e.prev=4,e.next=7,a.signMessage("I want to use this wallet for Telegram Unlock Bot");case 7:return n=e.sent,e.next=10,fetch("/api/users/generate-link-code",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({walletAddress:r.account,sign:n})});case 10:return c=e.sent,e.next=13,c.json();case 13:s=e.sent,i=s.success,o=s.linkCode,u=s.errors,l(o),i||v(Object(K.get)(u,"0","Failed to link your account, try again")),e.next=25;break;case 21:e.prev=21,e.t0=e.catch(4),console.error(e.t0),4001===e.t0.code?v("Message wasn't signed."):v("Failed to link your account, try again");case 25:return e.prev=25,E(!1),e.finish(25);case 28:case"end":return e.stop()}}),e,null,[[4,21,25,28]])})));return function(t){return e.apply(this,arguments)}}();return Object(j.jsx)("div",{className:"container px-8 py-4",children:Object(j.jsxs)(h,{children:[Object(j.jsx)(O,{className:"mb-1",children:"Link your Telegram account"}),Object(j.jsxs)(x,{children:["Step ",o?2:1," of 2"]}),Object(j.jsx)(x,{className:"text-lg mt-3",children:o?"Send the following message to the Unlock Bot to complete verification":"Sign a message with your wallet to verify that you own the wallet."}),Object(j.jsxs)("form",{onSubmit:C,children:[Object(j.jsx)("div",{className:"flex items-center justify-center mb-2",children:o?Object(j.jsxs)(j.Fragment,{children:[Object(j.jsx)("input",{type:"text",placeholder:"Enter your Telegram username",value:"/start ".concat(o||""),disabled:!0,className:"inline-block mx-0 rounded-r-none focus:outline-none",required:!0}),Object(j.jsx)(b,{className:"m-0 py-2 px-2 rounded-l-none border min-w-0 border-blue-400",onClick:function(){var e="https://t.me/".concat(Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}).TELEGRAM_BOT_USERNAME||"UnlockDevBot","?start=").concat(encodeURIComponent(o));window.open(e,"_blank")},children:"Message bot"})]}):Object(j.jsx)(b,{type:"submit",className:"m-0 py-2 px-2 border min-w-0 border-blue-400",disabled:N,children:N?"Linking...":"Sign a message"})}),m?Object(j.jsx)(p,{children:m}):null]})]})})},F=function(){var e=L(),t=e.linked,n=e.loading,c=e.reload;return Object(j.jsx)(j.Fragment,{children:n?Object(j.jsx)(x,{className:"my-3",children:"Loading..."}):t?Object(j.jsx)(B,{}):Object(j.jsx)(P,{reloadStatus:c})})},M=function(e){var t=e.address;return t?Object(j.jsx)("div",{className:"rounded-2xl py-1 px-3 text-sm border border-gray-400",title:t,children:Object(j.jsxs)(x,{className:"mb-0",children:[t.substr(0,6),"...",t.substr(-4)]})}):null},W=function(){var e=f().wallet,t=Object(l.e)("/");return Object(j.jsxs)("div",{className:"container flex items-center py-5 border-b border-gray-200 mb-5 px-3",children:[!t||t.isExact?null:Object(j.jsx)(o.b,{to:"/",className:"mr-3",children:"\u2190"}),Object(j.jsx)(O,{className:"text-xl mb-0",children:"Telegram Unlock Bot"}),Object(j.jsxs)("div",{className:"ml-auto flex items-center",children:[Object(j.jsx)(M,{address:e.account}),Object(j.jsx)(b,{className:"bg-red-400 hover:bg-red-500 py-1 px-3 text-sm md:min-w-0 ml-3 mt-0 rounded-2xl",onClick:function(){return e.reset()},children:"Disconnect"})]})]})},H=(n(166),function(){return f().isConnected?Object(j.jsxs)(j.Fragment,{children:[Object(j.jsx)(W,{}),Object(j.jsx)(l.a,{path:"/channel/:channelId",component:I}),Object(j.jsx)(l.a,{path:"/",exact:!0,component:F})]}):Object(j.jsx)(v,{})}),J=function(){return Object(j.jsx)(i.a,{chainId:parseInt(Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}).NETWORK)||4,children:Object(j.jsx)(o.a,{children:Object(j.jsx)(H,{})})})};s.a.render(Object(j.jsx)(r.a.StrictMode,{children:Object(j.jsx)(J,{})}),document.getElementById("root"))}},[[167,4,7]]]);
//# sourceMappingURL=main.8bb2bc05.chunk.js.map