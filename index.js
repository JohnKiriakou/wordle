(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const f of s.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&o(f)}).observe(document,{childList:!0,subtree:!0});function r(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(e){if(e.ep)return;e.ep=!0;const s=r(e);fetch(e.href,s)}})();let m={5:[],6:[],7:[],8:[],9:[],10:[],11:[]},u="",i=5,a=0,d=0,w=!1,y=[];const b=6;async function B(){try{const t=await fetch("words.txt");if(!t.ok)throw new Error(`HTTP error! status: ${t.status}`);(await t.text()).split(/\r?\n/).map(o=>o.trim().toLowerCase()).filter(o=>o.length>=5&&o.length<=11).forEach(o=>{m[o.length]&&m[o.length].push(o)});for(let o=5;o<=11;o++)m[o].length===0&&(m[o]=["a".repeat(o)]);x()}catch(t){console.error("Failed to load wordlist",t),h("Failed to load wordlist.");for(let n=5;n<=11;n++)m[n].length===0&&(m[n]=["super".padEnd(n,"a")]);x()}}let l=null;window.forcedNextWord="";window.setForcedNextWord=t=>{window.forcedNextWord=t.trim().toLowerCase()};function x(){const t=document.getElementById("length-select");i=parseInt(t.value);const n=m[i];if(window.forcedNextWord){if(u=window.forcedNextWord,i=u.length,i>=5&&i<=11&&(t.value=i.toString()),window.forcedNextWord="",l&&!l.closed){const r=l.document.getElementById("next-word-input");r&&(r.value="")}}else u=n[Math.floor(Math.random()*n.length)];if(l&&!l.closed){const r=l.document.getElementById("cheat-word");r&&(r.textContent=u)}a=0,d=0,w=!1,y=Array(b).fill("").map(()=>Array(i).fill("")),N(),document.getElementById("play-again").classList.add("hidden"),C(),I()}function C(){const t=document.getElementById("board");t.innerHTML="";const n=`calc(min(10vh, 90vw / ${i}, 75px))`;t.style.gridTemplateColumns=`repeat(${i}, ${n})`,t.style.gridTemplateRows=`repeat(${b}, ${n})`,t.style.justifyContent="center",t.style.alignContent="center";const r=2,e=r-(i-5)*((r-1)/6);for(let s=0;s<b;s++)for(let f=0;f<i;f++){const c=document.createElement("div");c.className="tile",c.id=`tile-${s}-${f}`,c.style.fontSize=`${e}rem`,t.appendChild(c)}}const $=[["q","w","e","r","t","y","u","i","o","p"],["a","s","d","f","g","h","j","k","l"],["Enter","z","x","c","v","b","n","m","Backspace"]];function I(){const t=document.getElementById("keyboard");t.innerHTML="";for(let n of $){const r=document.createElement("div");r.className="keyboard-row";for(let o of n){const e=document.createElement("button");e.className="key",o==="Enter"||o==="Backspace"?(e.classList.add("large"),e.textContent=o==="Backspace"?"⌫":"Enter"):e.textContent=o,e.id=`key-${o.toLowerCase()}`,e.addEventListener("click",()=>L(o.toLowerCase())),r.appendChild(e)}t.appendChild(r)}}function L(t){if(!w){if(t==="backspace"){if(d>0){d--;const n=document.getElementById(`tile-${a}-${d}`);n.textContent="",n.dataset.state="",y[a][d]=""}}else if(t==="enter")d===i?k():h("Not enough letters");else if(/^[a-z]$/.test(t)&&d<i){const n=document.getElementById(`tile-${a}-${d}`);n.textContent=t,n.dataset.state="tbd",y[a][d]=t,d++}}}function k(){const t=y[a].join("");if(!m[i].includes(t)){h("Not in word list");return}const n=u.split(""),r=t.split(""),o=Array(i).fill("absent");for(let e=0;e<i;e++)r[e]===n[e]&&(o[e]="correct",n[e]=null,r[e]=null);for(let e=0;e<i;e++)if(r[e]!==null){const s=n.indexOf(r[e]);s>-1?(o[e]="present",n[s]=null):Math.random()<.1&&(o[e]="wrong")}for(let e=0;e<i;e++){const s=y[a][e],f=document.getElementById(`tile-${a}-${e}`);f.dataset.state=o[e];const c=document.getElementById(`key-${s}`);if(c){const g=c.dataset.state;g!=="correct"&&(o[e]==="correct"||o[e]==="present"&&g!=="present"?c.dataset.state=o[e]:o[e]==="absent"&&g!=="present"&&g!=="wrong"?c.dataset.state="absent":o[e]==="wrong"&&g!=="present"&&(c.dataset.state="wrong"))}}t===u?(h("Splendid!"),w=!0,v()):a===b-1?(h(`The word was ${u.toUpperCase()}`),w=!0,v()):(a++,d=0)}let E;function h(t){const n=document.getElementById("game-message");n.textContent=t,n.classList.remove("hidden"),clearTimeout(E),E=setTimeout(()=>{n.classList.add("hidden")},2e3)}function N(){document.getElementById("game-message").classList.add("hidden"),clearTimeout(E)}function v(){document.getElementById("play-again").classList.remove("hidden")}document.getElementById("play-again").addEventListener("click",()=>{x(),document.getElementById("play-again").blur()});let p="";document.addEventListener("keydown",t=>{if(t.ctrlKey||t.metaKey||t.altKey)return;const n=t.key.toLowerCase();p+=n,p.length>10&&(p=p.slice(-10)),p.endsWith("12346")&&(T(),p=""),(n==="enter"||n==="backspace"||/^[a-z]$/.test(n))&&L(n)});function T(){if(l&&!l.closed){l.focus();return}if(l=window.open("","_blank","width=300,height=200,left=500,top=300"),!l){alert("Popup blocked! The current word is: "+u);return}l.document.write(`
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
      <div id="cheat-word" class="word">${u}</div>
      <div style="margin-bottom: 20px; text-align: center;">
        <label for="next-word-input" style="font-size: 1rem;">Next Round Word:</label><br>
        <input type="text" id="next-word-input" oninput="window.opener.setForcedNextWord(this.value)" placeholder="type here..." style="margin-top: 10px; padding: 5px; font-size: 1rem; width: 150px; text-align: center;">
      </div>
      <button onclick="window.close()">Close</button>
    </body>
    </html>
  `),l.document.close()}document.getElementById("length-select").addEventListener("change",()=>{x(),document.getElementById("length-select").blur()});B();window.cheat=()=>console.log("The current word is:",u);
