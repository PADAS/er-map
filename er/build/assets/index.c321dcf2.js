(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[,,function(e,t,A){},,,function(e,t,A){"use strict";(function(e){A.d(t,"a",(function(){return h}));var a=A(0),n=A.n(a),i=A(10),o=A(3),l=A.n(o),c=A(17),s=A(13),r=A(15),d=A(16),m=(A(26),A(27),A(14));let p;l.a.accessToken="pk.eyJ1IjoidmpvZWxtIiwiYSI6ImNra2hiZXNpMzA1bTcybnA3OXlycnN2ZjcifQ.gH6Nls61WTMVutUH57jMJQ";const g={},u=["#003744","#005B70","#219DB8","#05C1EA","#60E1FF","#2E8E96","#47C6B1","#91E8DA"],E=["#511913","#711E17","#961F1A","#DB2222","#E5632E","#E67931","#E69E39","#D2B541","#BFBD48"];window.GlobalMap=null;const h=Object(a.createContext)({});t.b=t=>{var[A,o]=Object(a.useState)([]),[w,b]=Object(a.useState)({}),[C,B]=Object(a.useState)({}),[Q,y]=Object(a.useState)(void 0);const[f,k]=Object(a.useState)([]),[v,G]=Object(a.useState)(!1),U=()=>{G(!v)};function S(){i.a.initialize("UA-128569083-10"),i.a.pageview(window.location.pathname+window.location.search),window.GlobalMap=new l.a.Map({container:"map-container",style:"mapbox://styles/vjoelm/cktdex96919t117p3rkq7c7yu/draft",center:p.map&&p.map.center?p.map.center:[-109.3666652,-27.1166662],zoom:p.map&&p.map.zoom?p.map.zoom:11,pitch:p.map&&p.map.pitch?p.map.pitch:75});var t=new l.a.NavigationControl({visualizePitch:!0});window.GlobalMap.addControl(t,"top-left"),window.GlobalMap.on("load",(function(){console.log(e.env.PUBLIC_URL),window.GlobalMap.loadImage(m.a,(e,t)=>{window.GlobalMap.addImage("subject-popup-box",t,{sdf:!0})});const t=`https://${p.server}/${p.public_name}/api/v1.0/subjects`;fetch(t).then(e=>{if(e.ok)return e;throw Error("Error in request:"+e.statusText)}).then(e=>e.json()).then(e=>{let t=0;e.data.data.map(e=>{void 0!==e.last_position&&(p.subjects&&p.subjects[e.id]&&p.subjects[e.id].name&&(e.name=p.subjects[e.id].name),async function(e){let t=null;t=p.subjects&&p.subjects[e.id]&&p.subjects[e.id].icon?p.subjects[e.id].icon:null!==e.common_name&&await async function(e){try{return 404!==(await fetch(e)).status}catch(e){return!1}}(`public/images/animal_icons/${e.common_name}.png`)?`public/images/animal_icons/${e.common_name}.png`:e.last_position.properties.image;!function(e,t){const A=p.map&&p.map.map_icon_size?p.map.map_icon_size:30;((e,t=30,A=null)=>new Promise((a,n)=>{let i=new Image;i.setAttribute("crossorigin","anonymous"),i.addEventListener("load",()=>{if(t&&A)i.width=t,i.height=A;else{const e=t||A,{naturalHeight:a,naturalWidth:n}=i,o=Math.max(a,n)||e,l=(Math.min(a,n)||e)/o;o===n?(i.width=e,i.height=e*l):(i.height=e,i.width=e*l)}a(i)},{once:!0}),i.onerror=t=>{console.log("image error",e,t),n("could not load image")},i.src=e}))(t,2*A,void 0).then(t=>{window.GlobalMap.addImage(e.subject_subtype+e.id,t),window.GlobalMap.addSource("point"+e.id,{type:"geojson",data:e.last_position});const A=!p.map||p.map.simplify_map_data?["interpolate",["linear"],["zoom"],1,.25,12,.5]:.5;window.GlobalMap.addLayer({id:"points"+e.id,type:"symbol",source:"point"+e.id,layout:{"icon-image":e.subject_subtype+e.id,"icon-size":A,"icon-anchor":"bottom","icon-allow-overlap":!0}});const a=!p.map||p.map.simplify_map_data?["step",["zoom"],1.1,10,1.1]:1.1,n=!p.map||p.map.simplify_map_data?["step",["zoom"],10,10,15]:15;window.GlobalMap.addLayer({id:"box"+e.id,type:"symbol",source:"point"+e.id,layout:{"icon-image":"subject-popup-box","icon-size":a,"icon-anchor":"top","icon-allow-overlap":!0,"icon-text-fit":"both","icon-text-fit-padding":[3,3,3,3],"text-anchor":"top","text-offset":[0,.5],"text-allow-overlap":!0,"text-field":e.name,"text-size":n},paint:{"text-color":"black","icon-color":"white","icon-opacity":.65}}),window.GlobalMap.on("click","points"+e.id,t=>{for(var A=t.features[0].geometry.coordinates.slice();Math.abs(t.lngLat.lng-A[0])>180;)A[0]+=t.lngLat.lng>A[0]?360:-360;k([...f,{geometry:t.features[0].geometry,properties:e}])}),window.GlobalMap.on("mouseenter","points"+e.id,()=>{window.GlobalMap.getCanvas().style.cursor="pointer"}),window.GlobalMap.on("mouseleave","points"+e.id,()=>{window.GlobalMap.getCanvas().style.cursor=""})}).catch(e=>{console.warn("imgElFromSrc error",e)})}(e,t)}(e).then());let A=E;p.color_scheme&&(A="earthtones"===p.color_scheme?E:"aquatic"===p.color_scheme?u:p.color_scheme),e.color=A[t%A.length],t++;const a=C;a[e.id]=e.color,B(a)});for(let t=0;t<e.data.data.length;t++){const A=e.data.data[t].id;e.data.data[t].display_story=p.subjects&&p.subjects[A]&&(p.subjects[A].pictures||p.subjects[A].detail_description)}o(e.data.data)}).catch(console.error)}))}function D(e){const t=e[0],A=e[1],a=window.GlobalMap.getLayer("LineString "+t);A?void 0===a?function(e){const t=`https://${p.server}/${p.public_name}/api/v1.0/subject/`+e+"/tracks";fetch(t).then(e=>{if(e.ok)return e;throw Error("Error in request:"+e.statusText)}).then(e=>e.json()).then(t=>{!function(e,t){window.GlobalMap.addSource(e.features[0].geometry.type+" "+e.features[0].properties.id,{type:"geojson",data:e}),window.GlobalMap.addLayer({id:e.features[0].geometry.type+" "+e.features[0].properties.id,type:"line",source:e.features[0].geometry.type+" "+e.features[0].properties.id,layout:{"line-join":"round","line-cap":"round"},paint:{"line-color":C[t],"line-width":4}})}(t.data,e)}).catch(console.error)}(t):window.GlobalMap.setLayoutProperty("LineString "+t,"visibility","visible"):window.GlobalMap.setLayoutProperty("LineString "+t,"visibility","none")}Object(a.useEffect)(()=>{let e=!0;return fetch(t.configFile,{headers:{"Content-Type":"application/json",Accept:"application/json"}}).then(e=>e.json()).then(t=>{e&&(p=t,S())}),function(){e=!1}},[]);const O=e=>{82!==e.keyCode&&18!==e.keyCode||(g[e.keyCode]="keydown"===e.type,g[82]&&g[18]&&T())},T=()=>{window.GlobalMap.flyTo({center:p.map&&p.map.center?p.map.center:[-109.3666652,-27.1166662],zoom:p.map&&p.map.zoom?p.map.zoom:11,pitch:p.map&&p.map.pitch?p.map.pitch:75,essential:!0,bearing:0})};return n.a.createElement(n.a.Fragment,null,n.a.createElement(h.Provider,{value:{displayTracks:D,setTracks:b,tracks:w}},n.a.createElement("div",{id:"map-container",onKeyDown:O,onKeyUp:O},n.a.createElement(d.a,null),n.a.createElement(r.a,{title:void 0!==p?p.map_title:null,subs:A,subjectData:p,onLocClick:e=>function(e){window.GlobalMap.flyTo({center:e,zoom:15,essential:!0})}(e),legendOpen:v,onLegendStateToggle:U,legSub:Q,onReturnClick:e=>y(e),onStoryClick:e=>y(e),tracks:w})),f.map(({properties:e,geometry:A})=>n.a.createElement(s.a,{key:e.id+"-popup",onClose:()=>{k(f.filter(({properties:{id:t}})=>t!==e.id))},coordinates:A.coordinates.slice()},n.a.createElement(h.Provider,{value:{displayTracks:D,setTracks:b,tracks:w}},n.a.createElement(c.a,{subject:e,subjectData:p.subjects[e.id],onStoryClick:e=>y(e),legendOpen:v,onLegendStateToggle:U,...t})))))," ")}}).call(this,A(12))},function(e,t,A){"use strict";t.a="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsSAAALEgHS3X78AAADPUlEQVRo3t2a33GbQBDGf2L8LqUC04HVQXAFoYPgCkxmAjxaeQQeQgfBHcgVGFdguYJIFRhV4DzcnnVSANkR/5xvRqOZPYS+725vb3dh8vLygokoDBzAA1xgyjiwBZZAHidpYQ5MtIAoDGZABnwdmu0R3AJ+nKTlqwAhXwAXxoUbsa0HJmwDDnBu2J4AJ07S8kwMmUF+KwrzgYnvIQoDT3hOhWsGeJMw+O4A9wZ5J07S1dCEa0TMUV6h9+alhdqwGv5YyQMIN98weRYq2gBsxuY2NSJy1P4EcC12y1EMTe4d0FynZ4ZxPTQrgCgMbFTk4TDmV3G1hiZ8QD4DfqOCyn0UBmvZuLUYjYAoDBbA9YH5HCjknBq3APaji4kpu0DzF85oGTJbthmOozDwgRmwipN0KbYclbZsOZ532XUD/7wCURjMozAoxG+1LQeegUdxCU3+J3AD5IY7zI0ZLtmFxiqs6gZOcSEX+AxcS+QwsUFlj8RJmgHfgB9I/iLXOMCnOEknslpZzf886VWrwikutET57TJO0rWQ9dg/2TFEHNrKw2tkdXx27vRQdb9WBMiszU6YgKp7LoCF1CRrPTGdCDCh/fpwVk8QUrz12rbCqAc8643bJ9oSUMr3TcWGHr8AyRAf+iTeqgAR4QCXb9l4oxQgIoo+yUMHqQRAFAYr1L5w24pMdegqmbNRp/SiS/JdCvDke/4hBUjuckl9itwaOtkDIqLomnynAjQkr1mg+pp52/fvoyLz6HBDH10BSdTm8imaGl9S3DioAkQ3YGcyvOxdQEUrjygM7uIkdXW3QAuS3qUuymc6/sdJ6nZBXKPWhYyO9WGt+iUKgxJ4RJWOntiXqKrrih7Cp0bTCrjUF9rafseudCzp4eB6jwC76Ydxkk76JluFpii0ahhr6iCMQ4Ccpk81w/7QxI8KEDioZ1IaG+Cqqc3RNxrDqGxMjyOtjSExpt7oyQLsocm8A69cLVRzFZS/fxRorluLXY5ybpyqo4Vw1M+MlxaQG+PZsSciA5Ofs98Ezi0pPHSonKKeiHhDk60g77Gfm93GSVroMOqjErALueCXtAkLhn/4Z1P9qoEP/8vLHiY+2us2fwBRITUH5ITlKAAAABJ0RVh0RVhJRjpPcmllbnRhdGlvbgAxhFjs7wAAAABJRU5ErkJggg=="},function(e,t,A){"use strict";t.a="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAADCElEQVRo3tWa0XWiQBiFPz2+awe6FcQOzHaQDmQriHtOgMewj8DDYgVqBUkJ2gFWsLGCaAXZB37WCSswzoCaew7nyMz8w73jcP9hoPPx8YEK33NHwAx4AIbcBnbAK5CEUfymVnRUAb7nBsDztdnW4FcYxcF/AnzPXQJTpeFBVL9pd90ORmSzoa+UrcIodv4J8D13BvwuU3kLODE7foZRnHQ892lANsq5wh9hFC+vTbhEhAMs5PQAjLqAo5Cf3yp5AOE2l9M+4HTJ5leO5NokNaByfOiR3SQA26JFnQvFgsfApFC9AVJOWOE5CKP4zffcLXAHjHocvX5vSTzgs4sVMZHj0ffcFRBYCMm5DrumpBXyD2QjOz0jbAqkEmsFKwHiCi989mhd9IEX6ePyAnzPHXO0NBsspK/LCiDL0k3BuC8jAfK3N7nQG5pOJdN/IKipP5AlnO9yzKXMps+T6J0bIPO1avRXwCyM4r1Stpa1TEK5Ww19zx2HUZy2KgC4r6jb5KvEIkSQIzljUhJ/T2bJ2jCZQoOKukAjvqrNQCPeWkAZtmEUr+saSZttUxdtUsC+pbYXE3AVmAhIS8onvucO6oKlTdlNnNbFNyFgXVE304ivarPWiLcTIHa4Kql+rsqoUle267Eq5A4tmOQBqF77L8Trk5yQTJsZ1Vs2gQkRo5tYHkTmFU2egXffc1Pfc1PgvYb83PThxsaFAurXN3dyVOGA4ehbCZDpYXxhdSBM5r61ABGRkO1bmmInfRijiUTmXCm2GQGyttkYhG501k6tCxA4F4ppR4CGrRZhbJutCBAE1NsqWNpmawLOsFUr22xNgIhIqLZVa9tsVYDAMay7DQEVttqIbbYuQOBolt2mgBO22phtFtEju+mGGGxp1CAge9GR/24SOdddx3Of1hyfUb+1NVJNQR6W/sjppsvnneHZtQlqQOX42gWWHDPoo+0LhzYh3B7l9AAsuycy6EI2Ym8Kwkl9oRKEUbyv+9RgjcFeTcMYk236ln9qUFD5NT/2UESM+EKf2/wF9xws7GUtg6UAAAASdEVYdEVYSUY6T3JpZW50YXRpb24AMYRY7O8AAAAASUVORK5CYII="},function(e,t,A){"use strict";t.a="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAUCAYAAAC9BQwsAAAABGdBTUEAALGPC/xhBQAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAADqADAAQAAAABAAAAFAAAAAC0aJTjAAAB+ElEQVQ4EYWTv08UURDHZ97tLbl9pxQ2VxiCiaGwlVhgDFAc2BhCjFcYDTH6L7B7xSVewSV3bE3oDhMaciRU/LCDhhDUGCMlCUgoICZgVG7xFzvOu/CW/XHKNTPv+53PvHnv3aLjOJ0A/ksgukUgFmu12hQiElzyQ2d8fIGARnUdIsxkrOyLcrnsa61dFICUDxtE8OyHd1JnUIT1eC4I8G1c9AnGPO/k1f9gYZodzxncj8NA8PS02ZxtNBqphMcCKrFUKt34/evnGhF1xYv4zHO3e+88KRQKZ2GvBSqhWCx2k3+2ynB3uEDlCDifkfIxj/5He8EFVKvVT0baHGBjV5s68q0/4rHnGDS0FoBKqFQqe2mzo5/fcUcX6MjwQ76wul4Ho2pBRdu2ryP4PDbcDOsqNwF7Jlx3O7KjLsrlckf8TMmb5gI/DVLVJUA+h3V4eLDEf8FB3egi4rppyo8J0HVd6XnN5X9AH1KGMcKNfQUGZ2Qhew7du9jhPEN8b1kyzzXH2muBNdu+ckS0AkB3tRFExHdCpIb4ub4EGieCu1w9Bv91O4if5Y3aKQ6pBgY/7DR/fH3hbirnUTYBxTA3/hr31FoQwoOkgRsZmR3ij7ot1AIRaCsK4vo1RLXTt6geXQkUxhiPtcbyZxRYt6S870xOfo+WJVd/AZPlrzpInkAiAAAAAElFTkSuQmCC"},function(e,t,A){"use strict";var a=A(0),n=A.n(a),i=A(5),o=(A(2),A(6));t.a=({subject:e})=>{const{displayTracks:t,setTracks:A,tracks:l}=Object(a.useContext)(i.a),c=!!l[e.id],s=c?"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsSAAALEgHS3X78AAADKUlEQVRo3t2a33HaQBDGf8f4HVKB1UHoIPKogNBBhBowqcCkglCBRu4Av1tjuQLjCgIVWFRwebg9c2gkYQf9I98Mw8yeEN93t7e3u5LSWuMiSpUPhMAMGDMM7IE1kMSBztwBZQVEqZoAK+BH32xP4B5YxIHO3wUI+Qz46ly4E9u2Z8Ie4APXju0V8ONA51diWDnk96Iw6Zn4EaJUhcJzLFxXQKjmj/jAk0PejwO96ZtwhYgpxivs3rwZYTasxWKo5AGE28IxhWr+SC6KdnGgvb5JfgRRqraYPbEfcViOrG9in4DlOr5yjNu+WQFEqfIwkYdizC/jOuqbcIH8CviDCSpPUaq2snErMRgBUaqWwG3BfA1kck4NWwDH0cXFGJPWlOKKhiGz5bnhOErVApgAmzjQa7ElmLRlz+m8y6sa+OcViFI1jVKVid9aWwK8AS/iEpb8b+AOSBx3mDoznGNSlypsqgbOcaEZ8A24lcjhYofJHokDvQJ+Ar+Q/EWu8YEvcaCVrNaq4n9e7aqV4RwXWmP8dh0HeitkQ45PdhwRRVtevEZWZ8HBnZ7L7teIAJm1yRkTUHbPJbCUmmRrJ6YVAS6sXxdn9Qwh2UevbSqMhsCb3bhdoikBuXzflWzo4QuQ4ue5S+KNChARPnDzkY03SAEiIuuSPLSQSgBEqdpg9sWsqchUhbaSOQ9zSi/bJN+mgFC+pxcpQHKXG6pT5MbQyh4QEVnb5FsVYCF5zRLT10yavn8XFVlIixv65ApIojaVT1bX+JLixscUILYBO5HhdecCSlp5RKl6iAM9s90CK0h6l7Yon9j4Hwd61gZxi0oXcjrWxVr1e5SqHHjBlI6h2NeYqmtOB+HTom4FZlQX2tb+wKF0zOng4PqMAK/uh3GgVddky1AXhTY1Y3UdhGEIkNP0tWJ40TfxkwIEPuaZlMUOmNe1ObpGbRiVjRlyorXRJ4bUGz1bgNc3mU/gnesI01wF4++XAst1P+KQo1w7p+pgIRztM+P1CEic8dWpJyI9k59y3ARORlJ42FA5xjwRCfsmW0I+5Dg3u48DnV38qwb/x8seLi7tdZu/8m87snP3e+oAAAASdEVYdEVYSUY6T3JpZW50YXRpb24AMYRY7O8AAAAASUVORK5CYII=":o.a;return n.a.createElement("img",{width:"24",height:"24",className:"hover",src:s,id:"subject-track-button",onClick:()=>{const a=[e.id,!c],n=Object.assign({},l);n[a[0]]=a[1],A(n),t(a)}})}},,,,function(e,t,A){"use strict";var a=A(0),n=A(4),i=A.n(n),o=A(3),l=A.n(o);t.a=({children:e,coordinates:t,onClose:A})=>{const n=Object(a.useRef)(new l.a.Popup({closeButton:!1}));return Object(a.useEffect)(()=>{const e=n.current;return e.addTo(window.GlobalMap),()=>e.remove()},[]),Object(a.useEffect)(()=>{n.current.setLngLat(t)},[n,t]),Object(a.useEffect)(()=>{const e=n.current;return e.on("close",A),()=>e.off("close",A)},[n,A]),Object(a.useEffect)(()=>{const t=document.createElement("div");i.a.render(e,t),n.current.setDOMContent(t)},[n,e]),null}},function(e,t,A){"use strict";t.a="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKEAAAAhCAYAAACx4ctuAAAACXBIWXMAABYlAAAWJQFJUiTwAAABX0lEQVR4nO3cUW3DMBDG8c9BUAYrg43BVgZhsEIohEIohEAYhEHoGHQMMgQ3nXeRuinJy1rfy/8n3UPTSJHsT65dKVfMTEtKKU+SvLaLNwHLRklnM3tfvctD+Lck7SVd/GuKukF5GI+SNrN5+/XhZ9U7M/DUncrD2C+GMAI4MgFUg9pfh7DuCUspm1gBH9jfoJHdtFfs4nknAojGhlj81JVS/OT7ygygMV/0esVKeGD0kaRmr4sDCZDh0X+SS5yEgCy7jqFHNkKIdIQQ6Qgh0hFCpCOESEcIkY4QIh0hRDpCiHSEEOkIIdIRQqQjhEjnIfxgGpDo0sULTkCGTzOrIRwYfiSp2Zte+fRX756ZCTT05e1lzGycDiaHuAi0cvQA1mdddWDY032AalTDWi+anlYg1J3rtNoQKYK4jQ0jk0Hdsvzc8TLXlWuxP2F0ZujpT4h/qP0JJb2Z2fxfgZK+AfxiRZ1/ZSIIAAAAAElFTkSuQmCC"},function(e,t,A){"use strict";var a=A(0),n=A.n(a),i=(A(2),A(9)),o=A(7);var l=({subject:e,handleOnLocButtonClicked:t})=>n.a.createElement(n.a.Fragment,null,n.a.createElement("img",{width:"24",height:"24",className:"hover",src:o.a,id:"subject-location-button",onClick:()=>{t(e.last_position.geometry.coordinates)}})),c=A(8);var s=({animal:e,configData:t,animalOnLocClicked:A,onNameClick:a,displayStory:o,tracks:s})=>{const r={backgroundColor:e.color},d=e.id+" animal";let m="hover",p="animal-name ",g={},u=e.name;u.length>15&&(u=u.substring(0,15)+"...");let E="";return void 0!==s&&s&&(E=" bold "),void 0!==t&&o||(m="default",p="",g={visibility:"hidden"}),n.a.createElement(n.a.Fragment,null,n.a.createElement("div",{className:"animal-legend-content",onClick:A=>{const n=document.getElementById(d),i=A.target;n.classList.contains("animal-name")&&"subject-track-button"!==i.id&&"subject-location-button"!==i.id&&(a([e,t.subjects[e.id]]),n.classList.toggle("animal-name"),n.classList.toggle("hover"))}},n.a.createElement("div",{id:"animal-color",style:r}),n.a.createElement("div",{className:"fit-content "+p+m,id:d}),n.a.createElement("div",{id:"animal-color"}),n.a.createElement("div",{className:"animal-name-bullet "+p+m,id:d},n.a.createElement("div",{id:"animal-bullet"},n.a.createElement("div",{style:r})),n.a.createElement("div",{className:"animal-name-style "+m+E,id:e.name.replace(" ","-")},u)),n.a.createElement("div",{id:"track-buttons",className:m},n.a.createElement(i.a,{subject:e,trackState:s}),n.a.createElement(l,{subject:e,handleOnLocButtonClicked:A})),n.a.createElement("img",{id:"story-button",className:m,style:g,width:"7px",height:"10px",src:c.a})))},r=A.p+"assets/LogoEarthRanger.69b6354b.png";t.a=({subs:e,subjectData:t,onLocClick:A,legSub:a,onReturnClick:i,onStoryClick:o,legendOpen:l,onLegendStateToggle:c,tracks:d,title:m})=>{const p=l?"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAQCAYAAAAbBi9cAAAABGdBTUEAALGPC/xhBQAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAEqADAAQAAAABAAAAEAAAAADDocMPAAABlklEQVQ4EYWRvU4CQRDHZ/YOj0St1FfQzvgAKidqJRAbJRZ8+BDWvoOxVQjGj8qoBGMUCIWFlYW9BNDOBE0stJAdZ5G5QCG7ze7Ob/6/G1jMxJc2Set9Qmw7CNl8sfYAfcvGpVV1JQBTQDTTIbhLx/15gWa3celVBPAmF5aNkYabTCK6KDUblz7lKifFl3cp8AyjuqOvszHfNzUbl5zKFauP3LyCAG0pdmVApe14NGrjkuH838qu+3P6B8pENCE1QPhCwkShVCvbeCAy4XRieZZ0p8L/1aTIEPAbFKwWirX7YVxJwOyFq8qT47jR/p9JQGHQsGvjAyLTzBNN8zZuzsFC+JDzf3xAlFqLbGhNZ/zkIQkC4KtyYcfch/FAlI75SQ6d8EyuSBChFQI3kr+oNWy8K8rEI1s8xXG/hKXNEfT8w1K5buPmw2jGBcRTfiknmASwEfKUf3Bebdq4ZBQ/716/hEEdlBsxEtNk44EIkD7lwqFn1/X8QrHckpqV9xoVqFCSBSVEdRT2vIXc5e1LIDEHG+81/wKifPxGh5n5xwAAAABJRU5ErkJggg==":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAQCAYAAAAbBi9cAAAABGdBTUEAALGPC/xhBQAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAEqADAAQAAAABAAAAEAAAAADDocMPAAABp0lEQVQ4EYWSPUsDQRCGd/YufttY2GqllbUW4h1nOo2FIJIiiWInttb+B3s1RhRREEk4FPz+AxLtUiQYSSH4iVYi2XH2yBynaDbN3s0z70Nm9kD885tLuCN1FFlA7AEplzYLF3vR1t8copCf0wl3FFEcCcQuXaOmx5x/1duMS4Z8Zqa8MVTimCW6jiQy8R+iuUnXRVU/omgnB+l8taWV0u/NeCiaT3ieEujTSB0soZFeSBLfKJxfm3iwo/SEG0fAPM3QHkoAnqUt4tnDy6KJ6wzoxQolTlBgG0sEwBNIazyXP7s1cc5IkqxEJXocy7I9LQmaTLxhknS3b2xtnN208IGwZuIsoj0s04Q1DtJVx5TC3dSEM6NrJs45Scu8iwnbARD3XKTrt0m+k550Z02cM8H1r/unlRZodSlcZaBl9O+2MwknaeI6E1w/hxemvb6vT3VJy+/nGt1gnb7y5JZ/td+Mhx+kDq4dnFdpKQ49VkIRogUCVk38h0g35wqn97bd6lK4HMoAP/j5P25xQ/Qslsrvw0OD+3Wlemn2mrBiizelygP3/MW/AWR1/8Soaz+XAAAAAElFTkSuQmCC";return n.a.createElement(n.a.Fragment,null,n.a.createElement("div",{id:"legend",className:l?"legend-open":"legend-close"},n.a.createElement("div",{id:"legend-open-button",onClick:()=>{c()}},n.a.createElement("img",{src:p})),void 0===a?n.a.createElement("div",{id:"legend-content"},n.a.createElement("div",{className:"title"},n.a.createElement("div",{id:"earthranger-logo"},n.a.createElement("a",{href:"https://earthranger.com/",rel:"noreferrer",target:"_blank",className:"earthranger-logo"},n.a.createElement("img",{src:r}))),n.a.createElement("div",{id:"tracker"},n.a.createElement("p",null,null!==m?m:"Animal Tracker"))),n.a.createElement("div",{id:"subs"},void 0===e?n.a.createElement("div",null):e.map(e=>n.a.createElement("div",{key:e.id,id:"subject-div"},n.a.createElement(s,{animal:e,configData:t,key:e.id,animalOnLocClicked:A,onNameClick:o,displayStory:e.display_story,tracks:d[e.id]}))))):n.a.createElement(n.a.Fragment,null,n.a.createElement("div",{id:"legend-content"},n.a.createElement("div",{className:"title"},n.a.createElement("div",{id:"earthranger-logo"},n.a.createElement("a",{href:"https://earthranger.com/",className:"earthranger-logo"},n.a.createElement("img",{src:r}))),n.a.createElement("div",{id:"tracker"},n.a.createElement("p",null,null!==m?m:"Animal Tracker"))),n.a.createElement("div",{onClick:()=>i(void 0),id:"return",className:"hover"},n.a.createElement("img",{width:"7px",height:"10px",src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAUCAYAAAC9BQwsAAAABGdBTUEAALGPC/xhBQAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAADqADAAQAAAABAAAAFAAAAAC0aJTjAAAB0klEQVQ4EY2TO0sDQRDHZ+4uJya+bQLWfgERRWxMoaAIFiJYCKKW1poUFhESiJevIIIoIinsfNtJLHyAWFiIkmAEbazMXUTNrTOHJ/fysc3uzPx/O//du0X4xxBCYDwen0UwhwHxGkBaxL+4ZDIpVYzyshAwZWsRYetXkKFXo7xiCpi0IZ4JLCvOhHNtddL1VQEw4czzWgCeSd4kx7lcTq7o+poA4YOoXFLVmhlfR4Yuzk/XqdO4d1NEvA+pNX2pVKrgOiPZU6jTBnUaC4CKKMmxTCZT5Nq31S9oMwgiXUEJqX02xOC3VYNuj+JRTroH3oVUNZZOp0vOvGV1YW6u/Q3EjbPAa7r2WwFSTNO0B2/NsmqGIOItcEzXXopGo89BNQtU1cgV7Z/3CYSIPT09btP5w96aBVLBlBVlhOBLrwAINgx9J5vNulx5P0cLiQ5J3OHbAPE4HI4MUZMy11wgJxKJRLNpVg8I7uTYPTDfijgY17QXH8hC2rWpYuj79Jy63CB1QjipDdcNBoIspvfXCGZ1n369bh8MuPEjyGLq3GDo+h59mB4XjBhs1Slamp+vfxZil+BeO892ZTv4aT7K59/6BwZyH9X3KP0RbWTxDGVl+hNiBbAwFIHlwQAAAABJRU5ErkJggg=="}),n.a.createElement("p",null,"Back")),n.a.createElement("div",{id:"animal-story"},n.a.createElement("div",{id:"subject-div"},n.a.createElement(s,{animal:a[0],key:a[0].id,animalOnLocClicked:A,tracks:d[a[0].id]})),a[1].pictures.map(e=>n.a.createElement("img",{className:"sub-image",key:e,src:e.path,height:200,width:200,alt:"picture"})),n.a.createElement("div",{id:"sub-content",className:"default",dangerouslySetInnerHTML:{__html:a[1].detail_description}}))))))}},function(e,t,A){"use strict";var a=A(0),n=A.n(a),i=(A(2),A.p+"assets/close-icon.1b11abc1.png"),o=A(7),l=A(6),c=A(8);t.a=()=>{const e="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAkCAYAAACNBsqdAAAABGdBTUEAALGPC/xhBQAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAFqADAAQAAAABAAAAJAAAAADkCPqGAAADJklEQVRIDaVWTYhSURTWp47OiGGi0Si0GytqJ2qLLCIqiNw00b5FEAVN2wkGalOrFkMUBEE/tOlnMVGTg5scSsy/RbVq4cZSKu1n+rHJ8afvvLyP5/O957vOheM595zvfO/cc6/vPrNJY4TD4c0IHe12u3HIlNls9kP/ha8KuwhZ8Hq9i4lEgnwDw6z0RKPRDa1WaxaJMyAaV8YV8zJwc4VC4a7Cb+ojBulUu91+AsKtSqDeHOT3bTbbiUwm84fhJOIe6SuQeliQR4N8GbkHisXiGuUJ9EPL71U6EilxgHQv1DWyaYjEnU7nPO/y/6cP/J4MhUK7RWLafZCeHYCM7rgkEuOHjtSw3ed5TAxVbxFAGufJMoIVBOEI9ThoBMyDwZ4FiXiSJ8kgdpKIpUNtMGkoDGd6lXr8YSiSH/BeAPsb/jz9DOKkVizow7ijTZyKJcHj8SwhdYU7XTvhWTab/SEkk8nfKP2GNo47coUyqBUmu90+TztJ9noGONJ4u70kDpE4nU5XYV9dD6lIJgizjEMkponD4bgM9Z0FRtCLuVzuBcuzMKNcLq8GAgGa72c+Dt21WCzHK5XKJ5YjVUwOnJB5qM8saFSjtw9Q7Ws5XqqYnKVSac3v93dgHpKDhthdEB+rVqtf5Li+iikwNjZ2G6pJtpEB0mXc0u+U2AFi3LRfAXqsBOrMb6nFBoh7oDtqYBXfL7zEHqn4TVY1J3zPId8gGxVx6j/1soYWkNzM5/MNBUacqlaMf08Dx2cXXibT0HuA3A7xxeNxG2KbIDtQ6WGn0/lUjZR80geLEoDbm+7CnSDwQXshvp7tQ6Vkj0NfwMZdVObSXKsVJtxb00iMgaAGXB3yEfO30GIbsJo6PnKKmKsOzYrlaJCbY7GYu9ls+vBAcQW96pNoS1mOZbZmxfg2OAXQaVo22uIFUR8W/p/o/0Fg+IiRSN/BdJ7rqJKdgprVaq253e661ncxq1i3FZFIJIg+BtBPaeN6LaDNpNt9Bq1YYWRy3bc8eYBskExAXUfF2xSxhy6X61wqlVIlJaxuxQRAryfQkjMw90EaeNg9VDn0Av4H/dAovs+Af60AAAAASUVORK5CYII=",t="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAkCAYAAACNBsqdAAAABGdBTUEAALGPC/xhBQAAAAZiS0dEAP8A/wD/oL2nkwAAAshJREFUSMetls1LVFEUwH/nzpQ5gZn5QIvaqS2CNrMQGSmlWtXG/oIKLYyyrUVkmyIqSqSiwaYP2vSxMMSQKAfRoEUtqlVbC4ne5Gejjm98p4VfmTM6T9/ZXO659/343XMu3CdkicY4JSmlTl2OqFAGbAdSAoPAJyN05O+kq62MVKbv5f/EmQ8UJJM0KzSh5LNyDIjhYqyWJyuCT/ZS5qTpVKUCb/GsMMSxW1VMLgOf7KXMcfigUOQROgsSeoNbOBgN4wCY+eM7aTrXCgVQZV96lDvzcwOQTHJ+DcfPBK8/HicCYBrjlCicXS90Ae5yBcCklLocuu+BTHVDP7uMuhzxDToXM9McNkC532BXKTcqlPoNFig1oouX2rdQpgzCD9+Nhe9G4IvvwsIXo0KHz9zpzSG6TdE2ugVGfSzD67ZKxsyNvSTFcN83X8PN2QHQjbQiTPlg+z5WQ/8COBZhUJS2dcsqzYvic5GXx1WEkTXbQlf7AfqWge9VMyzK9TVSFcOFJfb/ToosWoFfnsHK81gtn7OC527INa+2Yrj0f9os27eJR8C0B9veWC3fVgU/qGJIhFc5CxseZsqbjJuFxzlBhT/BAl5mWgtmSgYKiOsow6psXVpOXITfgA3YqrRHw0zkDI6Gmajvo1Id9uBimwA2kNi+n6EWwQVo+EgoNM7GbKcJZltwp6lAqECIpF2KUayBHqxjb7EQLGeE/DGhBbjsDawcFaUawUZJIPxE+SoGG8XWAIlggE9Z659Lk1SRxn4K02C5DpZAsSpWII830QgDnoyPv+OUKo0I1okeilWX7hVh3HU4BB7BCIPAK6MkMNhGsSWAHXCxN+wike2/OKdS1PdRPpNiBwYLd7ZpKBZCsSqTGwppioYzvz7BlcCkCalwF5fds8VesHmxJcC52+HsT9qqzWv4SCg9xmmUGpQJgacPDqz+AP8FnTL6N1rOb1gAAAASdEVYdEVYSUY6T3JpZW50YXRpb24AMYRY7O8AAAAASUVORK5CYII=",A=i,[s,r]=Object(a.useState)(e),d={marginBottom:"2px",marginTop:"0px"};return n.a.createElement("div",{id:"tips-container"},n.a.createElement("div",{id:"tips-button-container",className:"hover",onClick:()=>{document.getElementById("tips").classList.toggle("hidden"),r(s===e?t:e)}},n.a.createElement("img",{id:"help-button",src:s})),n.a.createElement("div",{id:"tips",className:"hidden"},n.a.createElement("div",null,n.a.createElement("h2",null,"Helpful Tips"),n.a.createElement("img",{id:"close-icon",src:A,onClick:()=>{r(s===e?t:e);document.getElementById("tips").classList.add("hidden")}})),n.a.createElement("div",{id:"actual-tips"},n.a.createElement("div",null,n.a.createElement("img",{width:"20",height:"40",style:{paddingLeft:"2px"},src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAABgCAYAAABbjPFwAAAACXBIWXMAABYlAAAWJQFJUiTwAAACl0lEQVR4nO2bP48pURTADzGFiT9R0ml8ARoVidoHkH217lX0oqd6nfqtL6DQUKhU9DQ6GrEJ4t8ImzPvkdl9dpd75+6ZeTm/RDK54c75jXvOvTMuz/l8hm63+2QYxq/j8RgBF+Dz+V40TfuZy+WePZ1O52m73f4OhUIQj8dB13VHG2w2G5hMJrBcLsHv9//wtNvtha7rkXQ6DZqmOSDErzEMA/r9Psq8eHHY4JV3S/AIxooxY+xebHD6sLnFJWav0wJ7FBaghgWoYQFqWOAzptMpjMdjlacAn4pOMfByuXwNPpFIQK1Wg1gsZvu5lHwD9Xr9zZXHY2xTgRKB1Wp1V5sdcBJTwwLUCJdRLJVYWQaDAazX6y/fPxwOIZVK/dOeyWSgVCoJl1hhAWudl6HX68FsNoNmsynUi/AQsnOGlenLMTmAQ1IEYQFcHtgF9vXtOYBrG0ziWzMsDon3iR0IBG5KB4NBM4lFERbAK/bR+qZYLJpVxwoG32g0hAP9CJ7IqGGBe8HJSgVKBLCyvMfOsmtFiQCWRWvAeCxTKj9DyT0xlljRtc2jcBJTwwLUsAA1LEANC1DDAtSwADXmcno+n8N+v3dV4JfHOabA4XCA3W5HHdNDYMxwEcBbwHA47JbYTbzeP6P/KhCJuGK73JXT6WQechWihgWoYQFqWIAaFqCGBahhAWpYgBoWoEbqRz7cIiP7+280GpXaECss0Gq1oFqtCp/YSqVSgXw+L/RZ4SFk505cmb6EBe7Z6PdIX9++Y8tuRPNAWKBQKNimINOXcBLj3odkMim9exGrkGgCg2wZzWaz5osSnompYQFqWIAaFqCGBahhAWpYgJr/47HKYrHAG1L7/+yrkEvMpsBoNHJV8H+JAQC8AmtL0hEeiMQ+AAAAAElFTkSuQmCC"}),n.a.createElement("p",{style:{marginTop:"10px"}},"Zoom map in/out")),n.a.createElement("div",null,n.a.createElement("img",{width:"24",style:{marginTop:"8px"},height:"24",src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAABYlAAAWJQFJUiTwAAABzklEQVRoge2aMY6CUBiEfw2SSKLJxo6O2lhxBGtPsGfwDt5hO+rdE1BbewJr7Cw3gcRCTNj87r7EEFTAGZCNkxAtfLyZb1SeD3thGGbSYVlqfTqdyng87lSKOI5lu93+BlDzk8mkfVc11O+c45xeAdrWK0DbogYIw/B8MGUxTx4EwflxsVjQ5qA1oOT3+/35YLZAC2Do55+jRQlg6BsxW6AEKCLOagEeIE/fiNUCPMAt0owWoAGu0TditAANUIYwugVYgHv0jdAtwAJUIYtsARKgLH0jZAuQAHWIolqALOZWqxXiNLUECeD7fvPO/9T5HzSQBpIkqTVuNBo9PDckwG63k+PxWGmMbdsym80enhvyFnJdt5ExRYIE0F09JVpW+lrUTiDsQ1yFKIq+IAOUbQFJX9Bfo2XIIukLOsC9FtD0hXEhu0UYTV8YAa61wKAvrKVEEWkGfWEFyLfAoi/MxdwlcRZ9YQYwLTDpC3t3mkneiBqgiTufrzs0bet/BDgcDu07qSjjuW9Z1ncURZKmaWfMq1f1rN6twWCwjOP4c7PZiOd54jjOE1i8LiWv5vXPHsPhcNnLskzW6/V7mqYfp9Pp7VmNX0rJK/j5fP71Azn1pJRMeAaXAAAAAElFTkSuQmCC"}),n.a.createElement("p",{style:d},"Return map orientation to original view")),n.a.createElement("div",null,n.a.createElement("img",{width:"24",height:"24",style:{marginTop:"6px"},src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAABYlAAAWJQFJUiTwAAACgUlEQVRoge1a0XHiMBB9ePJPOiAdQAeXVHDpIE4F4WZO8ueFT9sfcQdnV3B0EKcDUsFBBRcq4GaZJ7LDEDCHsXwZvx8s2VjvSavVaq3earWCRmTNNYAQwC2APtqBJYApgDxO0lIz2giIrLkEkAG4awnpj1AAGMdJ+gYngORF2VD9acG6uWfCVwDEKgaq7lXqRMQFKzJFfkmFuQeyHyKyJiTPPrnKddiz5ruoe1bkRdmsTeQdImtGtAo3N28CTliHcVvJC8htrKrCgN5GsGib2ewCOS546zZQw1FWf413OK79QDHx7W2OwYZrUMvrPKIT4BsXx7ZPX3zJ4swt6Ue+Yz0J4yS9PlV/ZQGRNY9cMwZb9d/iJM3wHghWEfXlXwlvo5KAyJqcQd6SwdScoyCjMcN7rwqxmyZd8kEB7Pm7fWEGe96Z1SiyRsyjdOamrlH3Sl9lBFyoEe5p/FldP/G3B0DEf42sKdgJL4wsa0MVL7S2+ThJp3uemajlvWAZzrzUCNYequwV4Ib9EOIkfVSrY86yhjO/ZgVok4msuTqhnbNFuVVM6NWROKGds8VZVSaxmMMvAA/iXWQnFCfpnNvQkfL7c7rRjPWN4OAIcPLes/gA4HdkjWQC/tD7OC/lfP+Q9xtBpYVMJh8XqnDLDZaKuPNSskF6U/exw4QmqAmyJ3a9NdnhPVoJLq4/0IXTLUAnwDc6Ab7RCfCNToBvdAJ8oxPgG59KwCmb9qax4Row5YG6E05nhuO6DNRWcMBPma0GOboE8zTYypZlVZNZPkBumWo6D3j2oGCFfPAr2zgS5KS/ERfC3WUlxszlDPnAT26c23zUYJ1o+xyHPTT+q+M2AP4C/3jyxbkD5gYAAAAASUVORK5CYII="}),n.a.createElement("p",{style:d},"Hold Ctrl / control key and drag with mouse to rotate view")),n.a.createElement("div",null,n.a.createElement("img",{width:"24",height:"24",src:o.a}),n.a.createElement("p",null,"Jump to a subject's location")),n.a.createElement("div",null,n.a.createElement("img",{width:"24",height:"24",src:l.a}),n.a.createElement("p",null,"Display a subject's track")),n.a.createElement("div",null,n.a.createElement("img",{width:"7",height:"10",style:{paddingLeft:"9px",paddingRight:"8px",marginTop:"5px"},src:c.a}),n.a.createElement("p",null,"Display a subject's story")))))}},function(e,t,A){"use strict";var a=A(0),n=A.n(a),i=(A(2),A(9));t.a=e=>{const t=e.subjectData,A=e.subject,{legendOpen:a,onLegendStateToggle:o}=e;let l,c="";void 0!==A.sex&&(c=A.sex.charAt(0).toUpperCase()+A.sex.slice(1)+" | "),l=null===A.common_name?A.subject_subtype.replace(/\b\w/g,e=>e.toUpperCase()):A.common_name.replace("_"," ").replace(/\b\w/g,e=>e.toUpperCase());let s=A.last_position.properties.DateTime;s=s.substring(0,10)+" "+s.substring(11,16);let r={display:"flex"};A.display_story||(r={display:"none"});return n.a.createElement("div",{id:"pop-up"},n.a.createElement("div",null,function(){if(void 0!==t&&void 0!==t.pictures&&t.pictures.length>0)return n.a.createElement("img",{className:"pop-up-image",src:t.pictures[0].path,alt:"picture"})}()),n.a.createElement("div",{id:"pop-up-header"},n.a.createElement("h3",null,A.name)),n.a.createElement("p",null,c,t&&t.age&&t.age+" |"," ",l),t&&t.fun_fact&&n.a.createElement("p",null,n.a.createElement("i",null,t.fun_fact)),n.a.createElement("div",{onClick:()=>{e.onStoryClick([A,t]),a||o()},className:"hover",style:r,id:"view-story-button"},n.a.createElement("p",null,"View my story"),n.a.createElement("img",{height:"10",id:"story",src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAUCAYAAAC9BQwsAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAABHElEQVQ4y4XTzSpFURjG8Z/tjDi4ChNmhiTk45hIkpKSxD0YmroBmaEoLsCJoYnkIwlD+Zwpn2eOwVmnjt3a2zN8nv7vWutpvQ2Vpc42LKMDe1jFjxwVV24UsIGJ4JXQhUV858EJhlPePNZDlgueRfw5bObBCRbwHMlmsYXGLPAefXiK5DPYjsG1q9Tghwg8jR0UYqAA9YchaU1htx5OP/4xnHwXgSdD21FQKKoPtxmFtWeB8JrRNDRngU0oYyCSHeFKuqkwrRyumtYlxoWvWH9iEfsZ0AUGwxP+lNOCA/RGoHMM4a3eTNAaoJ4IdKq6BO/pIMEauiPQCUbwEas2wVjEPw7QpwwluI5UXsKXHCWqu3eIF9UvNYqKf/QLiBM5G7WAndsAAAASdEVYdEVYSUY6T3JpZW50YXRpb24AMYRY7O8AAAAASUVORK5CYII="})),n.a.createElement("div",{id:"pop-up-buttons"},n.a.createElement("p",{id:"date"},s),n.a.createElement(i.a,{subject:A})))}},function(e,t,A){e.exports=A(19)},function(e,t,A){"use strict";A.r(t);var a=A(0),n=A.n(a),i=A(4),o=A(5);Object(i.render)(n.a.createElement(o.b,{configFile:"./public/config/config.json"}),document.getElementById("root"))},,,,,,,function(e,t,A){}],[[18,1,2]]]);