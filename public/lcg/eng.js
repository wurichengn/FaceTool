/* Eng.js  v1.2.2 min
 * (c) 2017 ks
 * Released under the APACHE2.0 License
 */
var Eng;
(function(){var A=function(a,b,c){b=typeof(a);if(b=="string"){return 1}if(b=="boolean"){return 2}if(b=="number"){return 3}if(a instanceof Array){return 4}if(b=="object"){for(c in a){return 5}}if(JSON.stringify(a)=="{}"){return 5}return 0};var B=function(a,b,c,d,e,f,g,h,i,j,k,l){f=a.childNodes,g=f.length,i=0,l=d.n;if(e){h=a.getAttribute(U[4]);if(h){h=h.trim(),h?(d.n++,c[h]={$_N:d.n,$_P:-1},k=c[h],b.push([h,k,a]),c=c[h],l=0):0}}while(i<g){if(f[i].nodeType==1){h=f[i].getAttribute(U[4]),j=1;if(h){h=h.trim(),h?(d.n++,c[h]={$_N:d.n,$_P:l},k=c[h],b.push([h,k,f[i]]),B(f[i],b,k,d),j=0):0}j?B(f[i],b,c,d):0}i++}};var C=function(a,b,c){c=b.length;while(c--){if(a==b[c]){break}}return c};var D=function(a,b,c,d,e,f){d=[],e=a.length,f=0,c?0:c=e;while(b<c){d[f]=a[b],b++,f++}return d};var E=function(a,b,c,d,e,f,g,h){d=a.length,e=0,f="",g=".",c!=h?d=c:0;while(e<d){if(e==d-1){g=""}b?f+=a[e]:f+=(a[e]+g),e++}return f};var F={"$_a":1,"$_b":1,"$_c":1,"$_d":1,"$_e":1,"$_f":1,"$_g":1,"$_h":1,"$_i":1,"$_j":1,"$_k":1,"$_l":1,"$_m":1,"$_n":1,"$_o":1,"$_p":1};var G=function(a,b,c,d,e,f,g,h){for(g in b){h=b[g];if(h instanceof Array){a[g]=[],H(a[g],h,c,d,e,f)}else{if(!F[g]){a[g]={},G(a[g],h,c,d,e,f)}}}};var H=function(a,b,c,d,e,f,g,h,i,j,k){g=b.length;while(g--){i=b[g],a[g]={},a[g].$_a=i.$_a,a[g].$_b=i.$_b,a[g].$_d=c[i.$_c],a[g].$_h=c[i.$_i],a[g].$_e=c[i.$_g],a[g].$_f=i.$_f,a[g].$_j=c[i.$_k],a[g].$_l=c[i.$_m];if(i.$_p){j=i.$_p,h=j.length;while(h--){k=c[i.$_o],k.$_items=f,k.$_cache=f.$_cache,k.$_gData=f.$_gData,e.push(k);k[j[h][0]]=d[j[h][1]]}}for(h in i){if(!F[h]){a[h]={},G(a[h],i,c)}}}};var I=function(a,b,c,d,e,f,g,h,i){d=b.length,h=[];while(d--){c=b[d].length,e=0,f=0;while(e<c){if(a[e]==b[d][e]){f++}else{break}e++}h[d]=f}c=h.length,f=-1,e=0;while(c--){h[c]?(h[c]>e?(e=h[c],f=c):0):0}if(f==-1){return}b=D(a,h[f]-1),e=0,c=b.length,h=[],g=-1;while(e<c){d=b[e];if(d){b[e+1]!=i?h.push(b[e+1]):0,g++}else{break}e+=2}if(g!=-1){return{a:g,b:f,c:h}}};var J=function(a,b,c,d){if(!a){return}b=a.length,c=[];if(b){while(b--){d=a[b].name;if(!M[3].test(d)){c.push([a[b].name,a[b].value])}}return c}return 0};var K=function(a,b,c,d,e,f,g,h,i){h=0,i=0,b?0:(b={},c=[]),e=a.nodeName,b.a={},b.a.a=e,b.a.b=J(a.attributes),c.push(a),d=a.childNodes;if(d){e=d.length}else{return}b.b=[];while(i<e){f=d[i].nodeType,f===1?(b.b[h]={},K(d[i],b.b[h],c),h++):0,f===3?(g=d[i].textContent.trim(),g?(g=g.replace(M[1],""),b.b[h]=g,h++,c.push(d[i])):0):0,i++}return[b,c]};var L=function(a,b,c,d,e,f,g,h){f=a.b,e=a.a.a,g=document.createElement(e),e=a.a.b;if(e){h=e.length;while(h--){g.setAttribute(e[h][0],e[h][1])}}d?b.appendChild(g):c=[],c.push(g);if(!f){return}h=f.length,d=0;while(d<h){e=f[d],A(e)==1?(a=document.createTextNode(e),c.push(a),g.appendChild(a)):L(e,g,c,1),d++}return[g,c]};var M=[/(\{\{[^{}]+\}\})/,/(\{\{[^{}]+\}\})/g,/({{|}})/g,/^(e\-)/,/(\>\=|\<\=|\>|\<|\=\=\=|\=\=|\=)/,];var N=function(s){var a=[],L=s.length,i=0,c,t="",f=1,k,g,o,b;while(i<L){c=s[i];if(f&&c=="="){a.push(t),a.push(c),t="",f=0,k=1,i++;continue}if(k&&c=="?"){t=t.split(M[4]),o=t.length,b=0;while(b<o){a.push(t[b]),b++}t="",k=0,a.push(c),g=1,i++,o=i;continue}if(g&&c==")"&&s[i+1]==":"){a.push(s.slice(o+1,i)),a.push(":"),a.push(s.slice(i+3,-1));break}t+=c,i++;if(i==L){a.push(t)}}return a};var O={"=":0,"==":0,"===":0,">=":1,"<=":2,">":3,"<":4,};var P=function(a){var b=N(a),c=b.length,d=0,e=[];if(c>2){c=b.length,e.push(b[2].replace(M[2],"").trim());if(c==9){e.push(O[b[3]])}while(d<c){d%2||d==2?0:e.push(b[d].trim()),d++}return e}};var Q=function(a,b,c,d,e){d=[],b=a.split(";"),c=b.length;while(c--){e=P(b[c]);if(e){d.push(e)}}if(d.length){return d}};var R=function(a,b,c,d,e){d=a.getAttribute(U[3]);if(d){d=d.trim(),a.removeAttribute(U[3]);if(d){d=Q(d);if(d){e=d.length;while(e--){if(!b[d[e][0]]){b[d[e][0]]=[]}b[d[e][0]].push({$_e:c?null:a,$_g:c?C(a,c):null,$_f:D(d[e],0)})}}}}};var S=function(a,b,c,d){d=a.getAttribute(U[2]);if(d){d=d.trim(),a.removeAttribute(U[2]);if(d){if(!b[d]){b[d]=[]}b[d].push({$_h:c?null:a,$_i:c?C(a,c):null});return 0}}return 1};var T={"e-input":"$_j","e-change":"$_l","e-event":"$_n","$_j":"$_k","$_l":"$_m","$_n":"$_o"};var U=["e-id","e-base","e-html","e-attr","e-for","prototype"];var V=function(a,b,c,d,e,f,g,n,s,v,h,i,j,k,w,x,y,z){k=a.attributes,i=k.length;while(i--){n=k[i],s=n.name,h=T[s],w=0;if(h){v=n.value.trim(),a.removeAttribute(s);if(v){if(h=="$_n"){if(d==1){continue}y=[],w=1,z=v.split(";"),x=z.length;while(x--){y[x]=z[x].split(":")}}if((w&&c)||!w){if(!b[v]){b[v]=[]}j={},j[h]=c?null:a,j[T[h]]=c?C(a,c):null;w?j["$_p"]=y:null;b[v].push(j)}else{a.$_data=e,a.$_cache=f.$_cache,a.$_gData=f.$_gData,a.$_items=f,x=y.length;while(x--){a[y[x][0]]=g[y[x][1]]}}}}}};var W=function(a,b){b=document.createElement("div"),b.innerHTML=a.trim(),b=b.childNodes;return b[0]};var Z=function(a,b,c,d,e,f,g){b=this,b.p=1,b.q=-1,b.r={},b.s=[],b.t=[0,1,2,3],b.u=[],b.v=a.cache||{},b.w=[[]],b.x=a.data||{},b.y=a.event||{},b.N=a.relate,b.a(),b.z={$_id:a.id,$_relate:[],$_ajax:b.P,$_require:Z.g,$_newData:Z.e,$_addData:b.Q,$_gData:b.x,$_caller:0,$_setToSelf:b.A,$_setToGlobal:b.B,$_watcher:b.C,$_event:b.y,$_watcherFor:b.D,$_cache:b.v},Z.c(b.z),Z.a.push(b.x,b,a.id),b.L=1,b.M(),b.E={};d=0,e=a.showStage,f=a.created,g=a.g,h=a.template,c=[];b.O={};b.O.a=f;b.O.b=1;b.O.c=1;if(h){d=1,b.z.$_el=W(h),b.c(b.z.$_el,b.r,"",0,b.x)}if(a.el){if(A(a.el)==1){a.el=document.getElementById(a.el);if(d){if(!g||!g.css){a.el.appendChild(b.z.$_el)}}else{b.z.$_el=a.el,b.c(a.el,0,"",0,b.x)}}else{d?(!g||!g.css?a.el.appendChild(b.z.$_el):0):(b.z.$_el=a.el,b.c(a.el,0,"",0,b.x))}}if(a.watcher){b.b(a.watcher,1)}if(a.watcherFor){b.b(a.watcherFor)}if(b.x){b.f(b.x,c,1)}if(!a.x&&a.ajax){b.O.b=0,b.P(a.ajax,b.z)}c=null,b.L=0;if(g){if(g.css){new Z.g(g.css,0,function(){a.el.appendChild(b.z.$_el);if(e){e(b.z,b.v)}})}if(g.js){b.O.c=0;new Z.g(g.js,"js",function(){b.O.c=1;if(b.O.b&&f){f(b.z,b.v)}})}}if(b.O.c&&b.O.b&&f){f(b.z,b.v)}return b.x};Z.a=[],Z.b=1,Z.c=function(o,v){v=o.$_caller,Object.defineProperty(o,"$_caller",{set:function(s){v=s,Z.b=v?0:1},get:function(){return v}})};Z[U[5]].P=function(a,b){Z.d(a,b)};Z.init=function(o,a,b,c,d,e){e="$_sharedData";for(a in o){if(a==e){continue}b=window["$_"+a],c=o[a];if(b&&c){b(c)}}d=o[e];if(d){Z.f(d)}};Z.addStyle=function(a,b){if(!a){return}b=document.createElement("style"),b.innerText=a,document.head.appendChild(b)};Z.e=function(a){return JSON.parse(JSON.stringify(a))};Z.f=function(_a,_b,_c,_d){_b={m:localStorage,a:{},b:{},c:function(){var t=this,a=t.m.$_eng_cj_cache,b=t.m.$_eng_d_cache,c=[a,b],e,l=2;while(l--){e=c[l];if(e){try{e=JSON.parse(e),l?t.b=e:t.a=e}catch(e){}}}},d:function(){var t=this;t.m.$_eng_cj_cache=JSON.stringify(t.a),t.m.$_eng_d_cache=JSON.stringify(t.b)},e:function(){this.a={},this.b={}},f:function(a,b){var t=this;if(b){return t.b[a]}else{return t.a[a]}},g:function(a,b,c){var t=this;if(c){t.b[a]=b}else{t.a[a]=b}}};_c=function(e,c){if(!e){return}var a=e.split("="),b,i=1,l,f=1,d,h,v,g;b=a[0].split("."),l=b.length,e=b[0],g=Z.a.indexOf(e),g>0?d=Z.a[g-1].z.$_gData:d=0;if(!d){return}if(!c){l-=1}while(i<l){d=d[b[i]];if(!d){if(c){f=0;break}else{d[b[i]]={},d=d[b[i]]}}i++}if(f){if(c){_b.b["$"+e]?0:_b.b["$"+e]={},h=_b.b["$"+e],h[a[0]]=d}else{h=a[1].split(".")[0],v=_b.b["$"+h];if(v){d[b[l]]=v[a[1]]}}}};_d=function(i){var a=["<=>","=>","<?>","?>"],b=4,c,d,e,f,g,h;if(!i){a[1]="=",a[3]="?=",_b.c()}while(b--){c=_a[a[b]];if(c){c instanceof Array?0:c=[c],d=c.length;while(d--){e=c[d];if(b<2){g=Z.a.indexOf(e),g>0?h=Z.a[g-1].z.$_gData:h=0}if(i){b>1?_c(e,1):_b.g(e,h,1)}else{if(b>1){_c(e)}else{f=_b.f(e,1);if(f){if(h){for(g in f){h[g]=f[g]}}}}}}}}if(i){_b.d()}};_b.e(),_d();window.addEventListener("focus",function(){_d()});window.addEventListener("blur",function(){_b.e();_d(1)})};Z.d=function(o,z){var $=new XMLHttpRequest(),t,d,u,a,s,y,e,f;t=o.type||"get",t=t.toLowerCase(),d=o.dataType||"json",d=d.toLowerCase(),u=o.url||"/eng-data",a=o.async||true,s=o.data,f=JSON.stringify(s),$.open(t,u+(t!="post"?(s?("?"+f):""):""),a),$.setRequestHeader("Content-type","application/"+d),$.send(t=="post"?f:"");$.onreadystatechange=function(){if($.readyState==4){e=$.status;if(e==200||e==304){y=$.responseText;if(o.success){o.success(d=="json"?JSON.parse(y):y,z)}}else{if(o.error){o.error(e,z)}}}}};Z.g=function(h,j,i){var t=this,a=h instanceof Array,b,s=t.constructor,e;if(!h){return}t.i=i,a?t.b=h:(t.b=[],t.b.push(h)),t.c=t.b.length,t.g=0,t.k=document.getElementsByTagName("head")[0],j=="js"?(t.l="script",t.o="text/javascript",t.m="type",t.n="src"):(t.l="link",t.o="stylesheet",t.m="rel",t.n="href");if(!s.a){s.a=[]}t.e=s.a,e=t.e,e.push(t);if(e.length==1){t.p()}};Z.g[U[5]].p=function(){var t=this,f;f=document.createElement(t.l),f[t.m]=t.o,f[t.n]=t.b[t.g],t.k.appendChild(f);f.onload=function(){t.g++;if(t.g==t.c&&t.i){t.i(),t.e.splice(0,1);if(t.e[0]){t.e[0].p()}}else{t.p()}};f.onerror=function(){t.g++;if(t.g!=t.c){t.p()}else{t.i(),t.e.splice(0,1);if(t.e[0]){t.e[0].p()}}};f=0};Z.h=function(){window.addEventListener("storage",function(e){var a="$_eng_d_cache",b,c;if(e.key==a){b=e.newValue,c=localStorage;if(c[a]!=b){c[a]=b}}})};Z.h();Z[U[5]].M=function(a,b,c,d,e,f,g,h,i){a=this,b=a.N,d=Z.a;if(b){e=b.length;while(e--){c=b[e],f=d.indexOf(c);if(f>-1){b.splice(b.indexOf(c),1),b.length?0:a.N=0,g=a.z,h=g.$_id,i=d[f-1].z,g[c]=i,i[h]=g,f=g.$_relate.indexOf(c),f<0?g.$_relate.push(c):0,f=i.$_relate.indexOf(h),f<0?i.$_relate.push(h):0}}}if(!a.L){return}e=d.length;while(e--){e--,c=d[e],c!=a?c.M():0,e--}};Z[U[5]].a=function(){var a=this;a.A=function(b,c,d,e){d={},e=A(c)==1?W(c):c,a.c(e,d,"",1),a.f(b,[],0,d,b),d=null;return e};a.B=function(b,c,d,e,f,g,h,i,j,k){c=a.r,d=a.x,j=b.key,k=b.data,e=A(b.el),b.base?g=b.base.trim():g="";if(e==1){b.el=W(b.el)}if(g){i=0,f=g.split("."),h=f.length;while(i<h){c=c[f[i]],d=d[f[i]],i++}e=A(k);if(!a.t[e]){c[j]={},c=c[j],g+="."+j}f.push(j)}else{f=[j],g=j,c[j]={},c=c[j]}d[j]=k,a.c(b.el,c,g,2,k),a.i(d,j,D(f,0),g,5),a.f(d[j],f,2),c=null,d=null;return b.el};a.Q=function(b,c){c=[],a.x=b,a.z.$_gData=b,a.O.b=1,a.f(b,c,1);if(a.O.c&&a.O.a){a.O.a(a.z,a.v)}c=null};a.C=function(b){a.b(b,1)};a.D=function(b){a.b(b)}};Z[U[5]].b=function(a,b,c,d,e){d=this,b?(d.F?0:d.F={},d=d.F):(d.G?0:d.G={},d=d.G);for(b in a){c=a[b];if(c!==e){d[b.trim()]=c}}};Z[U[5]].c=function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s){if(!a){return}f=a.childNodes,g=f.length,r=this,!b?(b=r.d(a,r.r,c,d,e),c=b[1],e=b[2],b=b[0]):0;if(!g){return}i=0,q=b;while(i<g){a=f[i],a?j=a.nodeType:j=-1;if(j==3){h=a.nodeValue.trim(),k=h.split(M[1]),m=k.length;if(m>1){s=D(k,0),n=0,o=[],p=[];while(n<m){if(M[1].test(k[n])){o.push(n),l=k[n].replace(M[2],""),k[n]=l,s[n]="",p.push(l)}n++}a.nodeValue=E(s,1),m=p.length,n=0;while(n<m){if(!q[p[n]]){q[p[n]]=[]}q[p[n]].push({$_d:!r.H?a:null,$_c:r.H?C(a,r.I):null,$_a:o,$_b:k}),n++}}}else{if(j==1){l=r.d(a,q,c,d,e),r.p?r.c(a,l[0],l[1],d,l[2]):0}}i++}};Z[U[5]].d=function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x){x=this,g=1,j=1,x.p=1,f=a.getAttribute(U[1]);if(f){f=f.trim(),a.removeAttribute(U[1]);if(f){if(!x.H){e=x.o(c.split("."),f,0,0,d)}}c?(c+="."+f):c+=f,b[f]={},b=b[f],g=0}if(!d){f=a.getAttribute(U[4]);if(f&&g){f=f.trim();if(f){x.H=1,j=0,x.q++,x.w[x.q]=[],x.s[x.q]=[];if(c){x.w[x.q]=c.split(".")}k={},l=[],m={n:-1},n=B(a,l,k,m,1),h=l.length,i=0,w=x.w[x.q];while(i<h){m={},u=[],v=[],s=i,t=0,o=l[i][1],p=l[i][0],r=l[i][2],q=o.$_N;if(i==0){o.e=r.parentNode,o.e.removeChild(r)}s++;while(s<h){l[s][1].$_P==q?(l[s][1].d=t,t++,v.push(s)):0,s++}s=t;while(s--){n=l[v[s]][2].parentNode,n.removeChild(l[v[s]][2]),u.push(n)}k=K(r),x.I=k[1],R(r,m,x.I),x.p=S(r,m,x.I);if(x.p){x.c(r,m,"")}t?o.c=[]:0;while(t--){o.c.push(C(u[t],x.I))}o.b=k[0],o.a=m;w.push(p),i++}x.E[x.q]={},m=null,u=null,v=null,x.u[x.q]=l,l=null,x.H=0}}x.H?(R(a,b,x.I),x.p=S(a,b,x.I)):(R(a,b),x.p=S(a,b))}else{R(a,b),x.p=S(a,b)}x.H?V(a,b,x.I,d,e,x.z,x.y,x.x):V(a,b,0,d,e,x.z,x.y,x.x),f=a.getAttribute(U[0]);if(f&&j&&!x.H){f=f.trim(),a.removeAttribute(U[0]),f?x.z[f]=a:0}return[b,c,e]};Z[U[5]].e=function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,Z){b=this,c=I(a,b.w);if(!c){return}d=b.r,e=b.x,f=0,g=a.length,i=g-1,g==1?h=d:0;while(f<g){d[a[f]]?d=d[a[f]]:(d[a[f]]={},d=d[a[f]]),e=e[a[f]],f==g-2?h=d:0,f++}g=e.length,j=c.a,k=c.b;if(b.w[k].indexOf(a[a.length-1])==-1){return}n=c.c,m=b.u[k][j][1],o=m.a,p=m.b,q=m.c,l=m.d;if(j){g=j;while(g--){c=b.s[k][g];if(c){n[g]=c.indexOf(Number(n[g]))}}}c=b.u[k][j][0],w="$_"+k+j+c+E(n,1);if(b.G&&b.G[c]){s=b.G[c],t=[],x=a.join(".")+"."+(n.length?n.join(".")+".":""),f=0,g=e.length;while(f<g){Z=null,r={$_allow:1,$_data:e[f],$_forData:e,$_index:f,$_watcher:function(a){Z=a},$_pos:n.concat(f),$_gIndex:k,$_gData:b.x,$_gWatcher:b.C,$_items:b.z},s(r,b.v);if(Z){for(v in Z){y=x+f+"."+v,z=Z[v],c={},c[y]=z,b.C(c)}}r.$_allow?t.push(f):0,f++}}b.s[k][j]=t;if(!b.E[k][w]){b.E[k][w]={a:[],b:[],c:[],d:[]}}u=b.E[k][w].a,v=b.E[k][w].b,s=b.E[k][w].c,z=b.E[k][w].d,r=b.E[k][w].e;b.E[k][w].e=[],h[a[i]]={},d=h[a[i]];if(j){f=n.length,x="$_"+k+(j-1)+b.u[k][j-1][0]+E(n,1,f-1),c=b.E[k][x].c[n[f-1]][l],b.E[k][x].e.push([w,l])}else{c=m.e}a=q?q.length:0,n=1,f=0,g=t?t.length:e.length,k=v.length,g>=k?f=k:0,k>=g?(n=0,f=g,g=k):0;while(f<g){if(n){i=L(p),v.push(i[0]);if(a){h=a,j=[];while(h--){j.push(i[1][q[h]])}s.push(j)}r={},l=[],z.push(l),G(r,o,i[1],b.y,l,b.z,b.x),u.push(r),c.appendChild(i[0])}else{u.pop(),z.pop(),c.removeChild(v.pop()),s.pop()}f++}t?g=t.length:g=u.length;while(g--){k=z[g],h=k.length;while(h--){k[h].$_data=e[t?t[g]:g]}d[t?t[g]:g]=u[g]}return t};Z[U[5]].f=function(a,b,c,d,e,f,g,h,i){var j=A(a),k,l,m=b,n,o,p=0,q=-1,r,s=this;for(k in a){l=a[k],o=null,r=0;if(f&&k!=f[p]){continue}if(g){q++,h=q,i=f?f[p]:p}if(c){j=A(l)}b=D(m,0),b.push(k),n=E(b);if(j==4&&c==1){o=s.e(b),r=1}c?s.i(a,k,D(b,0),n,j,h,i):s.j(b,d,e),s.t[j]?0:s.f(l,b,c,d,e,o,r,h,i),p++}m=null,b=null};Z[U[5]].g=function(a,b,c,d,e){for(c in a){d=a[c],e=A(d),b&&b[c]!==undefined?a[c]=b[c]:(e<4?a[c]='':(e===5?this.g(d):a[c]=[]))}};Z[U[5]].h=function(a,b,c,d){for(b in a){c=a[b],d=A(c),d>3?(d===5?this.h(c):a[b]=[]):a[b]="";delete a[b]}};Z[U[5]].i=function(a,b,c,d,e,f,g,h,i,j,k,l,m,y,z){h=a[b],i=this,j=e,m=i.z;if(Z.b&&i.F&&i.F[d]){l=i.F[d];m.$_value=z,m.$_destroy=0,l(z,h,m,i.v),m.$_value==z?0:h=m.$_value,m.$_destroy?l=null:0}Object.defineProperty(a,b,{enumerable:1,configurable:1,set:function(s){if(i.F){y=i.F[d];if(y!==z){l=i.F[d]}}if(h!==s){j=A(s);if(Z.b&&l){m.$_value=z,m.$_destroy=0,l(h,s,m,i.v),m.$_value===z?0:s=m.$_value,m.$_destroy?l=null:0}if(e==5){j!=5?(s=="updata"?s=Z.e(h):s={}):0,i.g(h,s),i.f(h,c,1)}else{if(e==4){j!=4?(s=="updata"?s=Z.e(h):s=[]):0,k=D(c,0),i.h(h),h=s,i.f(h,k,1,0,0,i.e(k),1)}else{i.t[j]?(h=s,i.j(c,0,0,f,g)):0}}if(m.$_caller){m.$_caller=0}}},get:function(){return h}});i.t[j]?i.j(c,0,0,f,g):0;if(m.$_caller){m.$_caller=0}};Z[U[5]].j=function(a,b,c,d,e,f){f=this.k(a,b,c,d,e);if(f){this.l(f,a,c)}};Z[U[5]].k=function(a,b,c,d,e){if(!a){return}var f=a.length,g=this,h,i=0,j=b?b:g.r;while(i<f){if(!(j&&a)){return}j=j[a[i]];if(i==f-2){h=j}i++}if(j&&(j.$_index||j.$_value)){h=j}if(h){g.J=d,g.K=e;if(h.$_index){g.l(h.$_index,a,c)}if(h.$_value){g.l(h.$_value,a,c)}}return j};Z[U[5]].l=function(a,b,c){var d=a.length,e,f,g=this;while(d--){e=a[d];if(e.$_d){e.$_d.textContent=g.n(b,e.$_a,e.$_b,c)}if(e.$_e){g.m(e.$_e,b,e.$_f,c)}if(e.$_h){e.$_h.innerHTML=g.o(b,b[b.length-1],c)}if(e.$_j){f=g.o(b,b[b.length-1],c,1),e.$_j.value=f[0];e.$_j.oninput=function(){f[1][f[2]]=this.value}}if(e.$_l){f=g.o(b,b[b.length-1],c,1),e.$_l.value=f[0];e.$_l.onchange=function(){f[1][f[2]]=this.value}}}};Z[U[5]].m=function(a,b,c,d){var e=this.o(b,c[0],d),f=c[1],g,h,i,j=c.length,k,l,m=1;if(j==2){k=1,m=0,h=e}if(j==4){e?k=1:0,m=0,h=c[2],i=c[3]}if(j==6){f=c[2],g=c[1],m=0,g==0?(e==c[3]?k=1:0):0,g==1?(e>=c[3]?k=1:0):0,g==2?(e<=c[3]?k=1:0):0,g==3?(e>c[3]?k=1:0):0,g==4?(e<c[3]?k=1:0):0,h=c[4],i=c[5]}if(m){return}f?f=f.toLowerCase():0;if(f=="class"){l=" "}if(f=="style"){l=";"}j>2&&l?(e=a.getAttribute(f),e?(e=e.replace(l+i,"").replace(l+h,"").trim()):0,e?(e=e+l+(k?h:i)):(e=l+(k?h:i)),a.setAttribute(f,e)):a.setAttribute(f,k?h:i)};Z[U[5]].n=function(a,b,c,d,e,f,g,h){e=b.length,h=D(c,0);while(e--){f=c[b[e]],g=this.o(a,f,d),h[b[e]]=g}return E(h,1)};Z[U[5]].o=function(a,b,c,d,e,f,g,h,i,j){i=this,f=a.length,g=c?c:i.x,h=0,c=g;if(e){f++}if(b=="$_index"){return i.J}while(h<f){h!=f-1?g=g[a[h]]:g=g[b];if(g==j){break}if(h==f-2){c=g}h++}if(b=="$_value"){return c[i.K]}g==j?g="":0;if(d){return[g,c,b]}return g};Eng=Z}());

module.exports = Eng;