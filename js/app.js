
// Estado
const state = { historia:null, indice:0, valor:50, desbloqueos: JSON.parse(localStorage.getItem('desbloqueos')||'{}'), valores: JSON.parse(localStorage.getItem('valores')||'{}') };


const STORIES = [
  {id:"h1", tema:"Desinformación y pensamiento crítico", titulo:"La Noticia que Encendió la Ciudad", docente:[
    "¿Cómo verificaste las fuentes?",
    "¿Qué consecuencias puede tener compartir sin evidencia?",
    "¿Qué harías para educar a tu comunidad sobre información responsable?"
  ], secuencia:[
    {tipo:"pagina", key:"intro", titulo:"Introducción", texto:"En la ciudad de Claridad, todos confían en lo que leen en redes."},
    {tipo:"pagina", key:"situacion", titulo:"Situación inicial", texto:"Un rumor sobre el cierre de escuelas se vuelve viral."},
    {tipo:"pagina", key:"conflicto", titulo:"Conflicto", texto:"¿Compartir sin verificar o investigar primero?"},
    {tipo:"decision", key:"decision", titulo:"Decide tu acción", opciones:[
      {id:"A", label:"Compartir la noticia", efecto:+10, goto:"finNeg"},
      {id:"B", label:"Verificar fuentes", efecto:+25, goto:"finPos"}
    ]},
    {tipo:"final", id:"finPos", key:"finPos", clase:"positivo", titulo:"Final positivo", texto:"La verificación evita el caos y se publica un desmentido.", moraleja:"Pensar antes de compartir evita conflictos."},
    {tipo:"final", id:"finNeg", key:"finNeg", clase:"negativo", titulo:"Final negativo", texto:"El rumor provoca protestas y desorden.", moraleja:"La prisa sin evidencia daña a todos."},
    {tipo:"final", id:"finRef", key:"finRef", clase:"reflexivo", titulo:"Final reflexivo", texto:"¿Por qué es importante evaluar fuentes?", moraleja:"La responsabilidad digital es ciudadanía."}
  ]},
  {id:"h2", tema:"Valores y conciencia ciudadana", titulo:"El Árbol del Parque", docente:["¿Qué valor te movió?","¿Cómo influye la participación vecinal?","¿Qué alternativas protegían el patrimonio?"], secuencia:[
    {tipo:"pagina", key:"intro", titulo:"Introducción", texto:"Un parque es el corazón de la comunidad."},
    {tipo:"pagina", key:"situacion", titulo:"Situación inicial", texto:"Obras nuevas amenazan un árbol centenario."},
    {tipo:"pagina", key:"conflicto", titulo:"Conflicto", texto:"¿Defender el árbol o ignorar la situación?"},
    {tipo:"decision", key:"decision", titulo:"Decide tu acción", opciones:[
      {id:"A", label:"Organizar campaña vecinal", efecto:+25, goto:"finPos"},
      {id:"B", label:"No hacer nada", efecto:+5, goto:"finNeg"}
    ]},
    {tipo:"final", id:"finPos", key:"finPos", clase:"positivo", titulo:"Final positivo", texto:"Se rediseña la obra y se conserva el árbol.", moraleja:"La acción ciudadana protege el entorno."},
    {tipo:"final", id:"finNeg", key:"finNeg", clase:"negativo", titulo:"Final negativo", texto:"El árbol es talado; se pierde un símbolo.", moraleja:"La indiferencia deja huellas."},
    {tipo:"final", id:"finRef", key:"finRef", clase:"reflexivo", titulo:"Final reflexivo", texto:"¿Qué significa cuidar lo que es de todos?", moraleja:"Cuidar el parque es cuidar la vida."}
  ]},
  {id:"h3", tema:"Respeto y diversidad de pensamiento", titulo:"El Juego de las Opiniones", docente:["¿Qué técnicas de escucha activa practicaron?","¿Cómo cambia el resultado con respeto?","¿Qué sesgos detectaste?"], secuencia:[
    {tipo:"pagina", key:"intro", titulo:"Introducción", texto:"Se organiza un debate sobre redes sociales."},
    {tipo:"pagina", key:"situacion", titulo:"Situación inicial", texto:"Dos grupos sostienen posturas opuestas."},
    {tipo:"pagina", key:"conflicto", titulo:"Conflicto", texto:"¿Dialogar o imponer ideas?"},
    {tipo:"decision", key:"decision", titulo:"Decide tu acción", opciones:[
      {id:"A", label:"Escuchar y argumentar con respeto", efecto:+25, goto:"finPos"},
      {id:"B", label:"Burlarse y descalificar", efecto:+5, goto:"finNeg"}
    ]},
    {tipo:"final", id:"finPos", key:"finPos", clase:"positivo", titulo:"Final positivo", texto:"El intercambio respetuoso produce acuerdos.", moraleja:"El respeto construye puentes."},
    {tipo:"final", id:"finNeg", key:"finNeg", clase:"negativo", titulo:"Final negativo", texto:"El debate se fractura.", moraleja:"La descalificación empobrece el pensamiento."},
    {tipo:"final", id:"finRef", key:"finRef", clase:"reflexivo", titulo:"Final reflexivo", texto:"¿Por qué es clave la empatía?", moraleja:"Pensar mejor implica escuchar mejor."}
  ]},
  {id:"h4", tema:"Empatía y solidaridad", titulo:"La Mochila Perdida", docente:["¿Cómo te sentirías si fueras el afectado?","¿Qué señales te ayudaron?","¿Qué impacto tiene la empatía?"], secuencia:[
    {tipo:"pagina", key:"intro", titulo:"Introducción", texto:"Un estudiante pierde su mochila."},
    {tipo:"pagina", key:"situacion", titulo:"Situación inicial", texto:"La encuentras en el patio."},
    {tipo:"pagina", key:"conflicto", titulo:"Conflicto", texto:"¿Devolver o aprovechar la situación?"},
    {tipo:"decision", key:"decision", titulo:"Decide tu acción", opciones:[
      {id:"A", label:"Devolver la mochila", efecto:+25, goto:"finPos"},
      {id:"B", label:"Quedarte con lo que hay dentro", efecto:+5, goto:"finNeg"}
    ]},
    {tipo:"final", id:"finPos", key:"finPos", clase:"positivo", titulo:"Final positivo", texto:"Ganas confianza y amistad.", moraleja:"La empatía fortalece la comunidad."},
    {tipo:"final", id:"finNeg", key:"finNeg", clase:"negativo", titulo:"Final negativo", texto:"Te descubren; pierdes credibilidad.", moraleja:"Aprovecharse rompe lazos."},
    {tipo:"final", id:"finRef", key:"finRef", clase:"reflexivo", titulo:"Final reflexivo", texto:"¿Qué harías si fueras tú?", moraleja:"Ponerse en el lugar del otro cambia decisiones."}
  ]},
  {id:"h5", tema:"Responsabilidad digital", titulo:"El Reto Viral", docente:["¿Qué riesgos evaluaste?","¿Cómo influye la presión social?","¿Qué estrategias promueven seguridad?"], secuencia:[
    {tipo:"pagina", key:"intro", titulo:"Introducción", texto:"Un reto peligroso circula en redes."},
    {tipo:"pagina", key:"situacion", titulo:"Situación inicial", texto:"Tus amigos quieren hacerlo por fama."},
    {tipo:"pagina", key:"conflicto", titulo:"Conflicto", texto:"¿Seguir la tendencia o advertir?"},
    {tipo:"decision", key:"decision", titulo:"Decide tu acción", opciones:[
      {id:"A", label:"Participar en el reto", efecto:+5, goto:"finNeg"},
      {id:"B", label:"Advertir sobre el peligro", efecto:+25, goto:"finPos"}
    ]},
    {tipo:"final", id:"finPos", key:"finPos", clase:"positivo", titulo:"Final positivo", texto:"Evitas accidentes y surge un reto seguro.", moraleja:"La responsabilidad digital salva vidas."},
    {tipo:"final", id:"finNeg", key:"finNeg", clase:"negativo", titulo:"Final negativo", texto:"Alguien resulta herido.", moraleja:"La popularidad no vale más que la seguridad."},
    {tipo:"final", id:"finRef", key:"finRef", clase:"reflexivo", titulo:"Final reflexivo", texto:"¿Cómo resistir la presión de grupo?", moraleja:"Influir bien también es liderazgo."}
  ]},
  {id:"h6", tema:"Cuidado del medio ambiente", titulo:"La Playa Invisible", docente:["¿Qué acciones propusiste?","¿Cómo motivar a la comunidad?","¿Qué indicadores muestran mejora?"], secuencia:[
    {tipo:"pagina", key:"intro", titulo:"Introducción", texto:"La basura amenaza la playa favorita."},
    {tipo:"pagina", key:"situacion", titulo:"Situación inicial", texto:"Encuentras desechos en la arena."},
    {tipo:"pagina", key:"conflicto", titulo:"Conflicto", texto:"¿Actuar o mirar hacia otro lado?"},
    {tipo:"decision", key:"decision", titulo:"Decide tu acción", opciones:[
      {id:"A", label:"Organizar limpieza", efecto:+25, goto:"finPos"},
      {id:"B", label:"Ignorar el problema", efecto:+5, goto:"finNeg"}
    ]},
    {tipo:"final", id:"finPos", key:"finPos", clase:"positivo", titulo:"Final positivo", texto:"La playa se recupera.", moraleja:"Cuidar el ambiente es cuidar la vida."},
    {tipo:"final", id:"finNeg", key:"finNeg", clase:"negativo", titulo:"Final negativo", texto:"La playa se cierra por contaminación.", moraleja:"La inacción también contamina."},
    {tipo:"final", id:"finRef", key:"finRef", clase:"reflexivo", titulo:"Final reflexivo", texto:"Diseña un plan de mantenimiento.", moraleja:"Hábitos pequeños, cambios grandes."}
  ]},
  {id:"h7", tema:"Honestidad y confianza", titulo:"El Examen Sorpresa", docente:["¿Qué pesa más: la nota o la honestidad?","¿Cómo reducir la tentación de copiar?","¿Qué hace el aula para promover integridad?"], secuencia:[
    {tipo:"pagina", key:"intro", titulo:"Introducción", texto:"Un examen inesperado pone a prueba la honestidad."},
    {tipo:"pagina", key:"situacion", titulo:"Situación inicial", texto:"Puedes copiar sin que te vean."},
    {tipo:"pagina", key:"conflicto", titulo:"Conflicto", texto:"¿Copiar o confiar en tu esfuerzo?"},
    {tipo:"decision", key:"decision", titulo:"Decide tu acción", opciones:[
      {id:"A", label:"Copiar", efecto:+5, goto:"finNeg"},
      {id:"B", label:"Resolver con lo que sabes", efecto:+25, goto:"finPos"}
    ]},
    {tipo:"final", id:"finPos", key:"finPos", clase:"positivo", titulo:"Final positivo", texto:"Aprendes de la experiencia.", moraleja:"La honestidad es base del éxito."},
    {tipo:"final", id:"finNeg", key:"finNeg", clase:"negativo", titulo:"Final negativo", texto:"Te descubren; se resiente la reputación.", moraleja:"El atajo compromete tu futuro."},
    {tipo:"final", id:"finRef", key:"finRef", clase:"reflexivo", titulo:"Final reflexivo", texto:"Diseña tu plan de estudio honesto.", moraleja:"La integridad también se entrena."}
  ]},
  {id:"h8", tema:"Inclusión y respeto a la diversidad", titulo:"El Equipo Imparable", docente:["¿Qué adaptaciones hicieron?","¿Cómo cambia el rendimiento con diversidad?","¿Qué aprendieron al incluir?"], secuencia:[
    {tipo:"pagina", key:"intro", titulo:"Introducción", texto:"Nuevo compañero con discapacidad quiere unirse al equipo."},
    {tipo:"pagina", key:"situacion", titulo:"Situación inicial", texto:"El grupo duda si aceptarlo por reglas rígidas."},
    {tipo:"pagina", key:"conflicto", titulo:"Conflicto", texto:"¿Incluir y adaptar o excluir?"},
    {tipo:"decision", key:"decision", titulo:"Decide tu acción", opciones:[
      {id:"A", label:"Adaptar el juego para incluirlo", efecto:+25, goto:"finPos"},
      {id:"B", label:"Negarse a cambiar reglas", efecto:+5, goto:"finNeg"}
    ]},
    {tipo:"final", id:"finPos", key:"finPos", clase:"positivo", titulo:"Final positivo", texto:"El equipo se fortalece con diversidad.", moraleja:"La inclusión enriquece a todos."},
    {tipo:"final", id:"finNeg", key:"finNeg", clase:"negativo", titulo:"Final negativo", texto:"Se pierde la oportunidad de aprender juntos.", moraleja:"Excluir limita el crecimiento."},
    {tipo:"final", id:"finRef", key:"finRef", clase:"reflexivo", titulo:"Final reflexivo", texto:"¿Qué significa ser un verdadero equipo?", moraleja:"Ganar también es incluir."}
  ]},
  {id:"h9", tema:"Uso responsable del dinero", titulo:"El Billete en la Calle", docente:["¿Qué opciones éticas consideraste?","¿Cómo afecta la decisión la confianza?","¿Cuándo donar y cómo elegir?"], secuencia:[
    {tipo:"pagina", key:"intro", titulo:"Introducción", texto:"Encuentras un billete en la calle."},
    {tipo:"pagina", key:"situacion", titulo:"Situación inicial", texto:"Nadie parece haberlo perdido."},
    {tipo:"pagina", key:"conflicto", titulo:"Conflicto", texto:"¿Quedártelo, devolverlo o donarlo?"},
    {tipo:"decision", key:"decision", titulo:"Decide tu acción", opciones:[
      {id:"A", label:"Guardarlo para ti", efecto:+5, goto:"finNeg"},
      {id:"B", label:"Buscar al dueño", efecto:+25, goto:"finPos"},
      {id:"C", label:"Donarlo a quien lo necesite", efecto:+20, goto:"finPos"}
    ]},
    {tipo:"final", id:"finPos", key:"finPos", clase:"positivo", titulo:"Final positivo", texto:"Actúas con ética y generosidad.", moraleja:"La honestidad genera confianza."},
    {tipo:"final", id:"finNeg", key:"finNeg", clase:"negativo", titulo:"Final negativo", texto:"Te descubren quedándotelo.", moraleja:"El beneficio propio sin ética pasa factura."},
    {tipo:"final", id:"finRef", key:"finRef", clase:"reflexivo", titulo:"Final reflexivo", texto:"Piensa qué harías si fuera tu dinero.", moraleja:"La ética guía el uso del dinero."}
  ]},
  {id:"h10", tema:"Solidaridad en emergencias", titulo:"La Tormenta que Cambió Todo", docente:["¿Cómo organizaste la ayuda?","¿Qué alianzas fueron clave?","¿Qué aprendizajes quedan?"], secuencia:[
    {tipo:"pagina", key:"intro", titulo:"Introducción", texto:"Una fuerte tormenta afecta a la comunidad."},
    {tipo:"pagina", key:"situacion", titulo:"Situación inicial", texto:"Algunos vecinos necesitan apoyo urgente."},
    {tipo:"pagina", key:"conflicto", titulo:"Conflicto", texto:"¿Ayudar o pensar solo en ti?"},
    {tipo:"decision", key:"decision", titulo:"Decide tu acción", opciones:[
      {id:"A", label:"Organizar ayuda con el barrio", efecto:+25, goto:"finPos"},
      {id:"B", label:"Ignorar la situación", efecto:+5, goto:"finNeg"}
    ]},
    {tipo:"final", id:"finPos", key:"finPos", clase:"positivo", titulo:"Final positivo", texto:"La comunidad se une y supera la crisis.", moraleja:"La unión hace la fuerza."},
    {tipo:"final", id:"finNeg", key:"finNeg", clase:"negativo", titulo:"Final negativo", texto:"El aislamiento agrava los problemas.", moraleja:"La omisión tiene costo."},
    {tipo:"final", id:"finRef", key:"finRef", clase:"reflexivo", titulo:"Final reflexivo", texto:"¿Qué significa solidaridad?", moraleja:"La comunidad se construye actuando."}
  ]},
  {id:"h11", tema:"Discriminación", titulo:"El Color del Equipo", docente:["¿Qué sesgos aparecieron?","¿Cómo los enfrentaron?","¿Qué ganó el equipo al incluir?"], secuencia:[
    {tipo:"pagina", key:"intro", titulo:"Introducción", texto:"Se forma un equipo para un concurso de ciencias."},
    {tipo:"pagina", key:"situacion", titulo:"Situación inicial", texto:"Todos están emocionados por participar."},
    {tipo:"pagina", key:"conflicto", titulo:"Conflicto", texto:"Excluyen a un compañero por su apariencia y forma de hablar."},
    {tipo:"decision", key:"decision", titulo:"Decide tu acción", opciones:[
      {id:"A", label:"Defender la inclusión", efecto:+25, goto:"finPos"},
      {id:"B", label:"Seguir la mayoría", efecto:+5, goto:"finNeg"}
    ]},
    {tipo:"final", id:"finPos", key:"finPos", clase:"positivo", titulo:"Final positivo", texto:"El equipo se fortalece con diversidad y gana." , moraleja:"La inclusión potencia el talento."},
    {tipo:"final", id:"finNeg", key:"finNeg", clase:"negativo", titulo:"Final negativo", texto:"El equipo falla por falta de cooperación." , moraleja:"La discriminación empobrece resultados."},
    {tipo:"final", id:"finRef", key:"finRef", clase:"reflexivo", titulo:"Final reflexivo", texto:"¿Cómo detectas y detienes sesgos?", moraleja:"La justicia comienza en el aula."}
  ]},
  {id:"h12", tema:"Acoso escolar", titulo:"El Silencio del Pasillo", docente:["¿Qué rol tiene el testigo?","¿Cómo denunciar con seguridad?","¿Qué acciones restauran la convivencia?"], secuencia:[
    {tipo:"pagina", key:"intro", titulo:"Introducción", texto:"En el pasillo circulan rumores y burlas."},
    {tipo:"pagina", key:"situacion", titulo:"Situación inicial", texto:"Un grupo se ríe; otros guardan silencio."},
    {tipo:"pagina", key:"conflicto", titulo:"Conflicto", texto:"¿Ignorar, unirse o denunciar?"},
    {tipo:"decision", key:"decision", titulo:"Decide tu acción", opciones:[
      {id:"A", label:"Denunciar y apoyar", efecto:+25, goto:"finPos"},
      {id:"B", label:"Unirse a las burlas", efecto:+5, goto:"finNeg"}
    ]},
    {tipo:"final", id:"finPos", key:"finPos", clase:"positivo", titulo:"Final positivo", texto:"Se detiene el acoso y se promueve respeto.", moraleja:"Romper el silencio salva dignidades."},
    {tipo:"final", id:"finNeg", key:"finNeg", clase:"negativo", titulo:"Final negativo", texto:"El afectado se aísla; el clima empeora.", moraleja:"La complicidad mantiene la violencia."},
    {tipo:"final", id:"finRef", key:"finRef", clase:"reflexivo", titulo:"Final reflexivo", texto:"¿Cómo proteger al denunciante?", moraleja:"Cuidar a quien cuida es esencial."}
  ]},
  {id:"h13", tema:"Acoso laboral", titulo:"La Reunión Difícil", docente:["¿Qué protocolos existen?","¿Cómo apoyar sin escalar el conflicto?","¿Qué cultura laboral desean?"], secuencia:[
    {tipo:"pagina", key:"intro", titulo:"Introducción", texto:"En una reunión, un compañero recibe comentarios ofensivos."},
    {tipo:"pagina", key:"situacion", titulo:"Situación inicial", texto:"El grupo duda si intervenir."},
    {tipo:"pagina", key:"conflicto", titulo:"Conflicto", texto:"¿Intervenir o callar?"},
    {tipo:"decision", key:"decision", titulo:"Decide tu acción", opciones:[
      {id:"A", label:"Intervenir y defender el respeto", efecto:+25, goto:"finPos"},
      {id:"B", label:"Callar para evitar problemas", efecto:+5, goto:"finNeg"}
    ]},
    {tipo:"final", id:"finPos", key:"finPos", clase:"positivo", titulo:"Final positivo", texto:"Se establece un ambiente sano y colaborativo.", moraleja:"El respeto sostiene la confianza."},
    {tipo:"final", id:"finNeg", key:"finNeg", clase:"negativo", titulo:"Final negativo", texto:"El acoso se normaliza; baja la productividad.", moraleja:"La omisión legitima el abuso."},
    {tipo:"final", id:"finRef", key:"finRef", clase:"reflexivo", titulo:"Final reflexivo", texto:"¿Qué harías en tu contexto laboral?", moraleja:"La cultura se define con actos cotidianos."}
  ]},
  {id:"h14", tema:"Armonía familiar", titulo:"La Cena Interrumpida", docente:["¿Qué acuerdos digitales propondrían?","¿Cómo practicar escucha en familia?","¿Qué ritual fortalecería la unión?"], secuencia:[
    {tipo:"pagina", key:"intro", titulo:"Introducción", texto:"La familia se reúne a cenar tras un día ocupado."},
    {tipo:"pagina", key:"situacion", titulo:"Situación inicial", texto:"Todos usan sus dispositivos durante la cena."},
    {tipo:"pagina", key:"conflicto", titulo:"Conflicto", texto:"¿Dialogar para recuperar la convivencia o evadir?"},
    {tipo:"decision", key:"decision", titulo:"Decide tu acción", opciones:[
      {id:"A", label:"Cena sin pantallas y conversación", efecto:+25, goto:"finPos"},
      {id:"B", label:"Ignorar y seguir con el dispositivo", efecto:+5, goto:"finNeg"}
    ]},
    {tipo:"final", id:"finPos", key:"finPos", clase:"positivo", titulo:"Final positivo", texto:"La familia comparte experiencias y fortalece lazos.", moraleja:"La comunicación sostiene la unión."},
    {tipo:"final", id:"finNeg", key:"finNeg", clase:"negativo", titulo:"Final negativo", texto:"Aumenta la distancia emocional.", moraleja:"La desconexión digital afecta el vínculo."},
    {tipo:"final", id:"finRef", key:"finRef", clase:"reflexivo", titulo:"Final reflexivo", texto:"Diseñen un ritual familiar semanal.", moraleja:"Los hábitos crean armonía."}
  ]}
];


const $ = sel => document.querySelector(sel);
function setView(id){ for(const sec of ['#view-home','#view-stories','#view-reader','#view-docente','#view-settings']){ const el = $(sec); if(!el) continue; el.classList.toggle('hidden', sec!==id); } }
function saveProgress(){ localStorage.setItem('desbloqueos', JSON.stringify(state.desbloqueos)); localStorage.setItem('valores', JSON.stringify(state.valores)); }
function renderStories(){ const grid = $('#storiesGrid'); grid.innerHTML=''; STORIES.forEach(s=>{ const card=document.createElement('div'); card.className='card'; const desbloqueados=state.desbloqueos[s.id]||{}; const badges=[]; if(desbloqueados.finPos) badges.push('<span class="badge">Final positivo ✓</span>'); if(desbloqueados.finNeg) badges.push('<span class="badge">Final negativo ✓</span>'); if(desbloqueados.finRef) badges.push('<span class="badge">Final reflexivo ✓</span>'); card.innerHTML=`<div class="title">${s.titulo}</div><div><strong>Tema:</strong> ${s.tema}</div><div>Finales desbloqueados: ${badges.join(' ')||'—'}</div><div class="toolbar"><button class="btn primary">Leer</button><button class="btn" data-id="${s.id}">Ver preguntas</button></div>`; card.querySelector('.btn.primary').addEventListener('click', ()=> startStory(s.id)); card.querySelector('[data-id]').addEventListener('click', ()=> showDocente(s.id)); grid.appendChild(card); }); }
function startStory(id){ const s=STORIES.find(x=>x.id===id); state.historia=s; state.valor=state.valores[id] ?? 50; state.indice=0; $('#storyHeader').innerHTML = `<div class="title">${s.titulo}</div><div>Tema: ${s.tema}</div>`; setView('#view-reader'); renderReader(); }
function valueColor(v){ if(v<40) return 'var(--value-low)'; if(v<70) return 'var(--value-mid)'; return 'var(--value-high)'; }
function renderReader(){ const s=state.historia; const total=s.secuencia.filter(x=>x.tipo!=='final').length; $('#progressText').textContent = `Página ${Math.min(state.indice+1,total)} / ${total}`; const val=Math.max(0,Math.min(100,state.valor)); const fill=$('#valueFill'); fill.style.width=`${val}%`; fill.style.background=valueColor(val); const book=$('#book'); book.innerHTML=''; const actual=s.secuencia[state.indice]; const pageA=document.createElement('div'); pageA.className='page current flip'; pageA.innerHTML=pageContent(actual,s.id); book.appendChild(pageA); const nextIdx=Math.min(state.indice+1,s.secuencia.length-1); const pageB=document.createElement('div'); pageB.className='page next flip'; pageB.innerHTML=pageContent(s.secuencia[nextIdx],s.id); book.appendChild(pageB); $('#prevPageBtn').disabled=(state.indice===0); const esFinal=actual.tipo==='final'; $('#nextPageBtn').textContent=esFinal?'Volver al inicio':'Siguiente ➡️'; $('#retryBtn').disabled=!esFinal; }
function imgPath(storyId,key){ return `assets/images/${storyId}_${key}.png`; }
function pageContent(item,storyId){ if(item.tipo==='pagina') return `<h2>${item.titulo}</h2><img src="${imgPath(storyId,item.key)}" alt="${item.titulo}"/><p>${item.texto}</p>`; if(item.tipo==='decision'){ const btns=item.opciones.map(op=>`<button class=\"btn\" data-choice=\"${op.id}\">${op.label}</button>`).join(' '); return `<h2>${item.titulo}</h2><img src="${imgPath(storyId,item.key)}" alt="${item.titulo}"/><p>Elige cómo avanzar en la historia. Tu decisión afecta el Indicador de Valores.</p><div class="choice-group">${btns}</div>`; } if(item.tipo==='final'){ return `<h2>${item.titulo} <span class="badge">${item.clase}</span></h2><img src="${imgPath(storyId,item.key)}" alt="${item.titulo}"/><p>${item.texto}</p><p><em>${item.moraleja}</em></p><div class="choice-group"><button class="btn primary" id="reiniciarBtn">Reiniciar historia</button></div>`; } return `<p>Contenido no disponible.</p>`; }
function flipForward(){ const current=document.querySelector('.page.current'); const next=document.querySelector('.page.next'); if(current && next){ current.style.transform='rotateY(-180deg)'; next.style.transform='rotateY(0deg)'; } }
$('#homeBtn').addEventListener('click', ()=> setView('#view-home'));
$('#storiesBtn').addEventListener('click', ()=> { renderStories(); setView('#view-stories'); });
$('#docenteBtn').addEventListener('click', ()=> setView('#view-docente'));
$('#settingsBtn').addEventListener('click', ()=> setView('#view-settings'));
$('#startExploring').addEventListener('click', ()=> { renderStories(); setView('#view-stories'); });
$('#prevPageBtn').addEventListener('click', ()=> { if(state.indice>0){ state.indice--; renderReader(); } });
$('#nextPageBtn').addEventListener('click', ()=> { const item=state.historia?.secuencia[state.indice]; if(!item) return; if(item.tipo==='final'){ renderStories(); setView('#view-stories'); return; } flipForward(); state.indice=Math.min(state.indice+1,state.historia.secuencia.length-1); setTimeout(()=>{ renderReader(); },300); });
document.addEventListener('click',(ev)=>{ const btn=ev.target.closest('[data-choice]'); if(btn){ const choiceId=btn.getAttribute('data-choice'); const item=state.historia.secuencia[state.indice]; const op=item.opciones.find(x=>x.id===choiceId); if(!op) return; state.valor=Math.max(0,Math.min(100,state.valor+op.efecto)); state.valores[state.historia.id]=state.valor; const finIdx=state.historia.secuencia.findIndex(x=>x.tipo==='final' && x.id===op.goto); if(finIdx>=0){ state.indice=finIdx; renderReader(); state.desbloqueos[state.historia.id]=state.desbloqueos[state.historia.id]||{}; state.desbloqueos[state.historia.id][op.goto]=true; saveProgress(); } } if(ev.target?.id==='reiniciarBtn') startStory(state.historia.id); });
function showDocente(storyId){ const s=STORIES.find(x=>x.id===storyId); if(!s) return; const list=s.docente.map(q=>`<li>${q}</li>`).join(''); document.querySelector('#docenteList').innerHTML = `<p><strong>${s.titulo}</strong> — Tema: ${s.tema}</p><ul>${list}</ul>`; setView('#view-docente'); }
let deferredPrompt; window.addEventListener('beforeinstallprompt',(e)=>{ e.preventDefault(); deferredPrompt=e; document.querySelector('#installBtn').disabled=false; });
document.querySelector('#installBtn').addEventListener('click', async ()=>{ if(deferredPrompt){ deferredPrompt.prompt(); await deferredPrompt.userChoice; deferredPrompt=null; } });
setView('#view-home');
