(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function r(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(e){if(e.ep)return;e.ep=!0;const s=r(e);fetch(e.href,s)}})();let u={5:[],6:[],7:[],8:[],9:[],10:[],11:[]},f="",l=5,c=0,i=0,h=!1,g=[];const y=6;async function C(){try{const t=await fetch("words.txt");if(!t.ok)throw new Error(`HTTP error! status: ${t.status}`);(await t.text()).split(/\r?\n/).map(o=>o.trim().toLowerCase()).filter(o=>o.length>=5&&o.length<=11).forEach(o=>{u[o.length]&&u[o.length].push(o)});for(let o=5;o<=11;o++)u[o].length===0&&(u[o]=["a".repeat(o)]);b()}catch(t){console.error("Failed to load wordlist",t),p("Failed to load wordlist.");for(let n=5;n<=11;n++)u[n].length===0&&(u[n]=["super".padEnd(n,"a")]);b()}}function b(){const t=document.getElementById("length-select");l=parseInt(t.value);const n=u[l];f=n[Math.floor(Math.random()*n.length)],c=0,i=0,h=!1,g=Array(y).fill("").map(()=>Array(l).fill("")),I(),document.getElementById("play-again").classList.add("hidden"),$(),k()}function $(){const t=document.getElementById("board");t.innerHTML="";const n=`calc(min(10vh, 90vw / ${l}, 75px))`;t.style.gridTemplateColumns=`repeat(${l}, ${n})`,t.style.gridTemplateRows=`repeat(${y}, ${n})`,t.style.justifyContent="center",t.style.alignContent="center";const r=2,e=r-(l-5)*((r-1)/6);for(let s=0;s<y;s++)for(let a=0;a<l;a++){const d=document.createElement("div");d.className="tile",d.id=`tile-${s}-${a}`,d.style.fontSize=`${e}rem`,t.appendChild(d)}}const B=[["q","w","e","r","t","y","u","i","o","p"],["a","s","d","f","g","h","j","k","l"],["Enter","z","x","c","v","b","n","m","Backspace"]];function k(){const t=document.getElementById("keyboard");t.innerHTML="";for(let n of B){const r=document.createElement("div");r.className="keyboard-row";for(let o of n){const e=document.createElement("button");e.className="key",o==="Enter"||o==="Backspace"?(e.classList.add("large"),e.textContent=o==="Backspace"?"⌫":"Enter"):e.textContent=o,e.id=`key-${o.toLowerCase()}`,e.addEventListener("click",()=>L(o.toLowerCase())),r.appendChild(e)}t.appendChild(r)}}function L(t){if(!h){if(t==="backspace"){if(i>0){i--;const n=document.getElementById(`tile-${c}-${i}`);n.textContent="",n.dataset.state="",g[c][i]=""}}else if(t==="enter")i===l?v():p("Not enough letters");else if(/^[a-z]$/.test(t)&&i<l){const n=document.getElementById(`tile-${c}-${i}`);n.textContent=t,n.dataset.state="tbd",g[c][i]=t,i++}}}function v(){const t=g[c].join("");if(!u[l].includes(t)){p("Not in word list");return}const n=f.split(""),r=t.split(""),o=Array(l).fill("absent");for(let e=0;e<l;e++)r[e]===n[e]&&(o[e]="correct",n[e]=null,r[e]=null);for(let e=0;e<l;e++)if(r[e]!==null){const s=n.indexOf(r[e]);s>-1&&(o[e]="present",n[s]=null)}for(let e=0;e<l;e++){const s=g[c][e],a=document.getElementById(`tile-${c}-${e}`);a.dataset.state=o[e];const d=document.getElementById(`key-${s}`);if(d){const w=d.dataset.state;w!=="correct"&&(o[e]==="correct"||o[e]==="present"&&w!=="present"?d.dataset.state=o[e]:o[e]==="absent"&&w!=="present"&&(d.dataset.state="absent"))}}t===f?(p("Splendid!"),h=!0,x()):c===y-1?(p(`The word was ${f.toUpperCase()}`),h=!0,x()):(c++,i=0)}let E;function p(t){const n=document.getElementById("game-message");n.textContent=t,n.classList.remove("hidden"),clearTimeout(E),E=setTimeout(()=>{n.classList.add("hidden")},2e3)}function I(){document.getElementById("game-message").classList.add("hidden"),clearTimeout(E)}function x(){document.getElementById("play-again").classList.remove("hidden")}document.getElementById("play-again").addEventListener("click",()=>{b(),document.getElementById("play-again").blur()});let m="";document.addEventListener("keydown",t=>{if(t.ctrlKey||t.metaKey||t.altKey)return;const n=t.key.toLowerCase();m+=n,m.length>10&&(m=m.slice(-10)),m.endsWith("12346")&&(T(),m=""),(n==="enter"||n==="backspace"||/^[a-z]$/.test(n))&&L(n)});function T(){const t=window.open("","_blank","width=300,height=200,left=500,top=300");if(!t){alert("Popup blocked! The current word is: "+f);return}t.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Cheat Code</title>
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
      <div class="word">${f}</div>
      <button onclick="window.close()">Close</button>
    </body>
    </html>
  `),t.document.close()}document.getElementById("length-select").addEventListener("change",()=>{b(),document.getElementById("length-select").blur()});C();window.cheat=()=>console.log("The current word is:",f);
