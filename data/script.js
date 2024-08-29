var ctx_el;function _(e){return document.getElementById(e)}function hidectx(){_("ctx").style.display="none",ctx_el&&ctx_el.classList.remove("selitem"),ctx_el=void 0}function doesFontExist(e){var t=document.createElement("canvas"),n=t.getContext("2d"),o="abcdefghijklmnopqrstuvwxyz0123456789";n.font="72px monospace";var a=n.measureText(o).width;return n.font="72px '"+e+"', monospace",t=null,n.measureText(o).width!=a}function createEditor(e,t,n,o,a){function i(e){let t=/(?:\.([^.]+))?$/.exec(e)[1];if(void 0!==typeof t)switch(t){case"htm":case"html":return"html";case"js":return"javascript";case"cmd":case"json":case"jsonl":return"json";case"css":case"svg":case"xml":return t}return"plain_text"}void 0===n&&(n=i(t)),void 0===a&&(a="text/"+n);["basePath","modePath","themePath"].forEach((e=>{ace.config.set(e,"https://cdnjs.cloudflare.com/ajax/libs/ace/1.35.3")}));var c=ace.edit(e,{useWorker:!1,wrap:!0,indentedSoftWrap:!1,showPrintMargin:!1,highlightGutterLine:!0,useSoftTabs:0,tabSize:2});c.setFontSize(parseFloat(getComputedStyle(document.documentElement).fontSize)),c.setReadOnly(!0),c.getSession().setUndoManager(new ace.UndoManager),void 0===o&&(o=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"monokai":"textmate");var s=_("save"),l=_("undo"),r=_("redo"),d=_("cut"),m=_("copy"),u=_("paste"),p=_("font"),f=_("fontsize"),g="none"!==_(e).display;f.value=parseFloat(c.getFontSize()).toFixed(1),p.onchange=function(){c.setOption("fontFamily","'"+p.value+"',monospace")},f.onchange=function(){var e=parseFloat(f.value);!isNaN(e)&&e>=9&&e<=40&&c.setFontSize(e),f.value=parseFloat(c.getFontSize()).toFixed(1)};function h(){let e=!g||c.session.getSelection().isEmpty();d.disabled=e,m.disabled=e}function y(){let e=c.session.getUndoManager();s.disabled=!g||e.isClean(),l.disabled=!g||!e.hasUndo(),r.disabled=!g||!e.hasRedo()}function v(){if(void 0===t)return;const e=function(e){var t=e.getValue();try{var n=JSON.parse(t);return JSON.stringify(n)}catch(e){return t+""}}(c),n=new FormData;n.append("data",new Blob([e],{type:a}),t),fetch("/edit",{method:"POST",body:n}).then((e=>e.ok?e.text().then((e=>{console.log("Save OK /edit "+e)})):e.text().then((e=>{throw console.log("Save FAIL /edit"),new Error(e)})))).then((e=>{console.log(e),generateToast({message:"Saved "+t,background:"#ddd",color:"#000"})})).catch((e=>{console.warn("AbortError"===e.name?"Promise Aborted":"Promise Rejected"),alert(e)})).finally((()=>{y()}))}function x(){var e=c.getCopyText();if(window.clipboardData&&window.clipboardData.setData)return window.clipboardData.setData("Text",e);if(document.queryCommandSupported&&document.queryCommandSupported("copy")){c.focus();try{return document.execCommand("copy")}catch(t){return console.warn("Copy to clipboard failed.",t),prompt("Copy to clipboard: Ctrl+C, Enter",e)}}}function w(e){_("name").innerHTML=e;fetch(e).then((t=>t.ok?(console.log("OK "+e),t.text()):t.text().then((e=>{throw console.log("ERROR "+url),new Error(e)})))).then((e=>{try{var t=JSON.parse(e);c.setValue(JSON.stringify(t,null,4)),console.log("parse json OK")}catch(t){c.setValue(e),console.log("parse json FAIL")}null!==_("editor")&&(_("editor").style.display="block"),null!==_("preview")&&(_("preview").style.display="none"),g=!0,c.setReadOnly(!1),c.focus(),y()})).catch((e=>{console.log(e),alert(e),c.setReadOnly(!0)})).finally((()=>{c.resize(!0),c.scrollToLine(1,!0,!0,(function(){})),c.gotoLine(1,0,!0),c.clearSelection(),c.session.getUndoManager().reset()}))}return["Courier New","Monaco","Lucida Console","Monospace","ui-monospace","Roboto Mono","Inconsolata","IBM Plex Mono","Space Mono","PT Mono","Ubuntu Mono","Nanum Gothic Coding","Cousine","Fira Mono","Share Tech Mono","Courier Prime","Anonymous Pro","Cutive Mono","Overpass Mono","Fira Code","VT323","DM Mono","Oxygen Mono","Nova Mono","B612 Mono","Spline Sans Mono","Noto Sans Mono","Major Mono Display","Azeret Mono","Red Hat Mono","Syne Mono","Xanh Mono"].sort().forEach((function(e,t){if(doesFontExist(e)){var n=document.createElement("option");n.text=e,p.add(n)}})),null!==s&&null!==l&&null!==r&&c.on("input",y),c.session.selection.on("changeCursor",h),s.onclick=v,l.onclick=e=>{c.undo()&&c.focus()},r.onclick=e=>{c.redo()&&c.focus()},d.onclick=e=>{x()&&c.execCommand("cut")},m.onclick=e=>{x()&&c.execCommand("copy")},u.onclick=function(){try{navigator.clipboard.readText().then((e=>{c.execCommand("paste",e)})).catch((e=>{u.disabled=!0}))}catch{u.disabled=!0}},c.loadUrl=(e,o)=>{n=i(t=e+o),a="text/"+n,"plain"!==n&&c.getSession().setMode("ace/mode/"+n),w(e+o)},c.hide=()=>{g=!1,y(),h(),_("editor").style.display="none"},"plain"!==n&&c.getSession().setMode("ace/mode/"+n),c.setTheme("ace/theme/"+o),c.$blockScrolling=1/0,c.commands.addCommand({name:"save",bindKey:{win:"Ctrl-S",mac:"Command-S"},exec:v,readOnly:!1}),c.commands.addCommand({name:"undo",bindKey:{win:"Ctrl-Z",mac:"Command-Z"},exec:function(){c.undo()}}),c.commands.addCommand({name:"redo",bindKey:{win:"Ctrl-Y",mac:"Command-Y"},exec:function(){c.redo()}}),void 0!==t&&w(t),c.resize(),c}function uploadFileAsync(e,t,n,o,a,i){fetchData("/edit","POST",e).then((e=>{generateToast({message:"Upload "+n+"/"+o+" "+t+" done.",background:"#ddd",color:"#000"}),n==o&&listFiles(a,i)}))}function doUpload(e,t){const n=_("upload"),o=n.files.length;if(0!==o)for(let a=0;a<o;a++){let i=new FormData,c=t+n.files[a].name;i.append("data",n.files[a],c),console.log("Uploading "+c),uploadFileAsync(i,c,a+1,o,e,t)}}function isFolder(e){return e.children&&e.children.length>=0}function isText(e){if(isFolder(e))return!1;var t=/(?:\.([^.]+))?$/.exec(e.name)[1];if(void 0!==typeof t)switch(t){case"txt":case"cmd":case"json":case"jsonl":case"htm":case"html":case"js":case"c":case"cpp":case"css":case"svg":case"xml":return!0}return!1}function isImage(e){if(isFolder(e))return!1;var t=/(?:\.([^.]+))?$/.exec(e.name)[1];if(void 0!==typeof t)switch(t){case"bmp":case"png":case"jpg":case"gif":case"svg":return!0}return!1}function isAudio(e){if(isFolder(e))return!1;var t=/(?:\.([^.]+))?$/.exec(e.name)[1];if(void 0!==typeof t)switch(t){case"wav":case"mp3":case"aac":case"m4a":case"wma":return!0}return!1}function icon(e){if(isFolder(e))return"dir";if(isImage(e))return"image";if(isAudio(e))return"audio";var t=/(?:\.([^.]+))?$/.exec(e.name)[1];if(void 0!==typeof t)switch(t){case"cmd":case"css":case"json":case"jsonl":case"ttf":return t;case"zip":case"gz":return"zip";case"html":case"htm":return"html"}return"file"}function preview(e,t){if(isImage(e)){let n=t+e.name;const o=_("preview");o.innerHTML='<img src="'+n+"?a="+Date.now()+'"/>',o.style.display="block",ace.edit("editor").hide(),_("name").innerHTML=n}}function edit(e,t){isText(e)&&(ace.edit("editor").loadUrl(t,e.name),_("preview").style.display="none")}function url(e,t){console.log("click "+t+e.name),isImage(e)?preview(e,t):isText(e)&&edit(e,t)}async function fetchData(e,t,n,o){await fetch(e,{method:t,body:n}).then((n=>n.ok?(console.log(t+" OK "+e),n.text()):n.text().then((n=>{throw console.log(t+" FAIL "+e),new Error(n)})))).then((e=>{o&&o.remove(),console.log(e)})).catch((e=>{console.warn("AbortError"===e.name?"Promise Aborted":"Promise Rejected"),alert(e)})).finally((()=>{}))}function download(e,t){console.log("download "+t+e.name),document.getElementById("download-frame").src=t+e.name+"?download=true"}function remove(e,t,n){let o=t+e.name;isFolder(e)&&(o+="/"),console.log("remove "+o);const a=new FormData;a.append("path",o),fetchData("/edit","DELETE",a,n)}function create(e,t,n){var o=window.prompt("Create File in "+e,"");if(null==o||""==o||o.includes("/"))return;const a=new FormData;a.append("path",e+o),fetchData("/edit","PUT",a),fetch("/api/files/").then((e=>e.json())).then((o=>{t&&t.remove(),listFiles(n,e),console.log(o)}))}function upload(e,t){_("upload").onchange=()=>{doUpload(e,t)},_("upload").click()}function ctx(e,t,n,o){e.preventDefault(),ctx_el=o;let a,i=isFolder(t),c=_("ctx");c.style.display="block",a=c.getElementsByTagName("li")[0],a.onclick=i?function(){hidectx(),create(n+t.name+"/",o.children.item(1),o)}:function(){hidectx(),create(n,o.parentNode,o.parentNode.parentNode)},a.style.display=i?"block":"none",a=c.getElementsByTagName("li")[1],i&&(a.onclick=function(){hidectx(),upload(o,n+t.name+"/")}),a.style.display=i?"block":"none",a=c.getElementsByTagName("li")[2],a.onclick=function(){edit(t,n),hidectx()},a.style.display=isText(t)?"block":"none",a=c.getElementsByTagName("li")[3],a.onclick=function(){preview(t,n),hidectx()},a.style.display=isImage(t)?"block":"none",a=c.getElementsByTagName("li")[4],a.onclick=function(){download(t,n),hidectx()},a.style.display=i?"none":"block",a=c.getElementsByTagName("li")[5],a.onclick=function(){remove(t,n,o),hidectx()},a.style.display=n?"block":"none";var s=document.body.scrollTop?document.body.scrollTop:document.documentElement.scrollTop,l=document.body.scrollLeft?document.body.scrollLeft:document.documentElement.scrollLeft,r=e.clientX+l+10,d=e.clientY+s-20,m=(c.offsetWidth,c.offsetHeight),u=document.documentElement.clientHeight;d+m>u&&(d=u-m-20),c.style.left=r+"px",c.style.top=d+"px",o&&o.classList.add("selitem")}function drag(e,t,n){let o=n+t.name;isFolder(t)&&(o+="/"),e.dataTransfer.setData("text",o),console.log("drag start "+o)}function drop(e,t){let n=e.dataTransfer.getData("text");n.startsWith(t)||(e.preventDefault(),console.log("Move "+n+" to "+t))}function listFiles(e,t){return console.log("listFiles"),fetch("/api/files/?dir="+t).then((e=>e.json())).then((n=>{if(0==n.length)return!1;let o=e.getElementsByTagName("div")[0];o&&(o.onclick=n=>{i.remove(),o.onclick=()=>{listFiles(e,t)},n.stopPropagation()});let a=e.getElementsByTagName("ul");for(let e=0;e<a.length;e++)a[e].remove();const i=document.createElement("ul");for(var c in e.appendChild(i),n){const e=n[c],o=e.name,a=document.createElement("li");i.appendChild(a);const s=document.createElement("div");if(s.classList.add(isFolder(n[c])||isText(n[c])||isImage(n[c])?"item":"inact"),s.draggable=!0,s.ondragstart=n=>{drag(event,e,t)},a.appendChild(s),s.innerHTML='<span class="fi fa-'+icon(n[c])+'" title="'+o+'"></span><span>'+o+"</span>",isFolder(e)){let n=t+e.name+"/";s.classList.add("bold"),s.onclick=function(e){listFiles(a,n)},s.ondragover=e=>{e.preventDefault()},s.ondrop=e=>{drop(e,n)}}else(isText(e)||isImage(e)||isAudio(e))&&(s.onclick=function(n){url(e,t)});s.oncontextmenu=n=>{ctx(n,e,t,a)}}return e.scrollIntoView(),!0}))}function generateToast({message:e,background:t="#00214d",color:n="#fffffe",length:o="7000ms"}){_("toast").insertAdjacentHTML("afterbegin",`<p class="toast" \n    style="background-color: ${t};\n    color: ${n};\n    animation-duration: ${o}">\n    ${e}\n  </p>`);const a=_("toast").firstElementChild;a.addEventListener("animationend",(()=>a.remove()))}document.addEventListener("blur",(function(){hidectx()})),document.addEventListener("DOMContentLoaded",(function(){createEditor("editor",void 0,void 0,void 0);listFiles(_("tree"),"/"),_("tree").getElementsByTagName("div")[0].oncontextmenu=e=>{ctx(e,{name:"",children:[]},"",_("tree"))},_("load").onclick=function(e){const t=new FormData;t.append("load",""),fetchData("/edit","PUT",t)},_("init").onclick=function(e){const t=new FormData;t.append("init",""),fetchData("/edit","PUT",t)},_("home").onclick=function(e){window.location.href="/"},_("page").onchange=function(e){const t=new FormData;t.append("page",_("page").value),fetchData("/edit","PUT",t)}})),document.addEventListener("DOMContentLoaded",(function(){const e=document.getElementById("dragMe"),t=e.previousElementSibling,n=e.nextElementSibling;let o=0,a=0,i=0;const c=function(a){const c=a.clientX-o,s=(a.clientY,100*(i+c)/e.parentNode.getBoundingClientRect().width);t.style.width=`${s}%`,t.style.right=t.style.width,e.style.cursor="col-resize",document.body.style.cursor="col-resize",t.style.userSelect="none",t.style.pointerEvents="none",n.style.userSelect="none",n.style.pointerEvents="none",ace.edit("editor").resize()},s=function(){e.style.removeProperty("cursor"),document.body.style.removeProperty("cursor"),t.style.removeProperty("user-select"),t.style.removeProperty("pointer-events"),n.style.removeProperty("user-select"),n.style.removeProperty("pointer-events"),document.removeEventListener("mousemove",c),document.removeEventListener("mouseup",s)};e.addEventListener("mousedown",(function(e){o=e.clientX,a=e.clientY,i=t.getBoundingClientRect().width,document.addEventListener("mousemove",c),document.addEventListener("mouseup",s)})),e.addEventListener("dblclick",(()=>{var e=t.style.visibility="hidden"===t.style.visibility;t.style.visibility=e?"unset":"hidden",t.style.position=e?"unset":"absolute",ace.edit("editor").resize()}))}));