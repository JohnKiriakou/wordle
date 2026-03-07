(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const d of r.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&o(d)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();let f={5:[],6:[],7:[],8:[],9:[],10:[],11:[]},m="",l=5,a=0,i=0,y=!1,h=[];const w=6;async function B(){try{const n=await fetch("words.txt");if(!n.ok)throw new Error(`HTTP error! status: ${n.status}`);(await n.text()).split(/\r?\n/).map(o=>o.trim().toLowerCase()).filter(o=>o.length>=5&&o.length<=11).forEach(o=>{f[o.length]&&f[o.length].push(o)});for(let o=5;o<=11;o++)f[o].length===0&&(f[o]=["a".repeat(o)]);b()}catch(n){console.error("Failed to load wordlist",n),p("Failed to load wordlist.");for(let t=5;t<=11;t++)f[t].length===0&&(f[t]=["super".padEnd(t,"a")]);b()}}let c=null;function b(){const n=document.getElementById("length-select");l=parseInt(n.value);const t=f[l];if(m=t[Math.floor(Math.random()*t.length)],c&&!c.closed){const s=c.document.getElementById("cheat-word");s&&(s.textContent=m)}a=0,i=0,y=!1,h=Array(w).fill("").map(()=>Array(l).fill("")),T(),document.getElementById("play-again").classList.add("hidden"),$(),v()}function $(){const n=document.getElementById("board");n.innerHTML="";const t=`calc(min(10vh, 90vw / ${l}, 75px))`;n.style.gridTemplateColumns=`repeat(${l}, ${t})`,n.style.gridTemplateRows=`repeat(${w}, ${t})`,n.style.justifyContent="center",n.style.alignContent="center";const s=2,e=s-(l-5)*((s-1)/6);for(let r=0;r<w;r++)for(let d=0;d<l;d++){const u=document.createElement("div");u.className="tile",u.id=`tile-${r}-${d}`,u.style.fontSize=`${e}rem`,n.appendChild(u)}}const k=[["q","w","e","r","t","y","u","i","o","p"],["a","s","d","f","g","h","j","k","l"],["Enter","z","x","c","v","b","n","m","Backspace"]];function v(){const n=document.getElementById("keyboard");n.innerHTML="";for(let t of k){const s=document.createElement("div");s.className="keyboard-row";for(let o of t){const e=document.createElement("button");e.className="key",o==="Enter"||o==="Backspace"?(e.classList.add("large"),e.textContent=o==="Backspace"?"⌫":"Enter"):e.textContent=o,e.id=`key-${o.toLowerCase()}`,e.addEventListener("click",()=>L(o.toLowerCase())),s.appendChild(e)}n.appendChild(s)}}function L(n){if(!y){if(n==="backspace"){if(i>0){i--;const t=document.getElementById(`tile-${a}-${i}`);t.textContent="",t.dataset.state="",h[a][i]=""}}else if(n==="enter")i===l?I():p("Not enough letters");else if(/^[a-z]$/.test(n)&&i<l){const t=document.getElementById(`tile-${a}-${i}`);t.textContent=n,t.dataset.state="tbd",h[a][i]=n,i++}}}function I(){const n=h[a].join("");if(!f[l].includes(n)){p("Not in word list");return}const t=m.split(""),s=n.split(""),o=Array(l).fill("absent");for(let e=0;e<l;e++)s[e]===t[e]&&(o[e]="correct",t[e]=null,s[e]=null);for(let e=0;e<l;e++)if(s[e]!==null){const r=t.indexOf(s[e]);r>-1&&(o[e]="present",t[r]=null)}for(let e=0;e<l;e++){const r=h[a][e],d=document.getElementById(`tile-${a}-${e}`);d.dataset.state=o[e];const u=document.getElementById(`key-${r}`);if(u){const E=u.dataset.state;E!=="correct"&&(o[e]==="correct"||o[e]==="present"&&E!=="present"?u.dataset.state=o[e]:o[e]==="absent"&&E!=="present"&&(u.dataset.state="absent"))}}n===m?(p("Splendid!"),y=!0,C()):a===w-1?(p(`The word was ${m.toUpperCase()}`),y=!0,C()):(a++,i=0)}let x;function p(n){const t=document.getElementById("game-message");t.textContent=n,t.classList.remove("hidden"),clearTimeout(x),x=setTimeout(()=>{t.classList.add("hidden")},2e3)}function T(){document.getElementById("game-message").classList.add("hidden"),clearTimeout(x)}function C(){document.getElementById("play-again").classList.remove("hidden")}document.getElementById("play-again").addEventListener("click",()=>{b(),document.getElementById("play-again").blur()});let g="";document.addEventListener("keydown",n=>{if(n.ctrlKey||n.metaKey||n.altKey)return;const t=n.key.toLowerCase();g+=t,g.length>10&&(g=g.slice(-10)),g.endsWith("12346")&&(S(),g=""),(t==="enter"||t==="backspace"||/^[a-z]$/.test(t))&&L(t)});function S(){if(c&&!c.closed){c.focus();return}if(c=window.open("","_blank","width=300,height=200,left=500,top=300"),!c){alert("Popup blocked! The current word is: "+m);return}c.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>word</title>
      <style>
        body {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          margin: 0;
          font-family: sans-serif;
          background: #f0f0f0;
        }
        .word {
          font-size: 2rem;
          color: #538d4e;
          text-transform: uppercase;
          font-weight: bold;
          margin-bottom: 20px;
        }
        button {
          padding: 10px 20px;
          font-size: 1.2rem;
          cursor: pointer;
          border-radius: 5px;
          border: 1px solid #ccc;
          background: #fff;
        }
        button:hover { background: #e0e0e0; }
      </style>
    </head>
    <body>
      <div id="cheat-word" class="word">${m}</div>
      <button onclick="window.close()">Close</button>
    </body>
    </html>
  `),c.document.close()}document.getElementById("length-select").addEventListener("change",()=>{b(),document.getElementById("length-select").blur()});B();window.cheat=()=>console.log("The current word is:",m);
