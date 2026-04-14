/* ============================================================
   15MIN — 스바시 이벤트 웹페이지
   app.js  |  Vanilla JS ES6+, 프레임워크 없음
   ============================================================ */

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxcxi0yqBvYvilnbmg1FDch3PQLgz_V_2bSmDlbEoCuP5cF5RQlH-JXrqMQBLT8u_Ws/exec';

/* ── 전역 state ─────────────────────────────────────────── */
const state = {
  selections: {
    1: null,
    2: null,
    3: null,
    4: null,
  },
  lectures: [],
  swipers: {},
  pendingReplace: null, // { timeSlot, newLectureId }
  signature: null,
  email: null,
  altOk: {
    1: true,
    2: true,
    3: true,
    4: true,
  },
};

/* ── 유틸 ────────────────────────────────────────────────── */
function hexToRgb(hex) {
  const h = hex.replace('#', '');
  return [
    parseInt(h.substring(0, 2), 16),
    parseInt(h.substring(2, 4), 16),
    parseInt(h.substring(4, 6), 16),
  ].join(',');
}

function isLightColor(hex) {
  const rgb = hexToRgb(hex).split(',').map(Number);
  return (0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]) / 255 > 0.6;
}

function getAuraGradient(hex) {
  const rgb = hexToRgb(hex);
  return [
    `radial-gradient(ellipse 55% 48% at 50% 52%, rgba(${rgb},0.22) 0%, transparent 68%)`,
    `radial-gradient(ellipse 38% 34% at 42% 44%, rgba(${rgb},0.14) 0%, transparent 58%)`,
    `radial-gradient(ellipse 65% 56% at 55% 58%, rgba(${rgb},0.07) 0%, transparent 65%)`,
  ].join(', ');
}

function getLectureById(id) {
  return state.lectures.find((l) => l.id === id) || null;
}

function getSelectedCount() {
  return Object.values(state.selections).filter(Boolean).length;
}

function getStatusMessage(count) {
  const messages = {
    0: '조향 노트에 어떤 15분들을 채울지,\n하나씩 골라보세요.',
    1: '첫 번째 15분이 담겼어요.',
    2: '두 가지 결이 만나고 있어요',
    3: '마지막 한 자리가 기다려요',
    4: '당신만의 스바시가 완성됐어요 ✦',
  };
  return messages[count] || '';
}

/* ── 강연 데이터 ─────────────────────────────────────────── */
const LECTURES_DATA = [
  { id:'t1-a', timeSlot:1, date:'4/28', time:'12:37–12:57', category:'지쳤던 이야기',
    title:'한 번도 계획대로 온 적 없는\n커리어가 알려준 것', speaker:'김정훈', speakerBio:'그로스실',
    topNote:'두려움', topNotePercent:'20%', middleNote:'시도', middleNotePercent:'50%', baseNote:'주도성', baseNotePercent:'30%',
    scentNote:'팀스파르타에서의 한달,\n나는 절대\n적응할 수 없을 거라고 생각했다.',
    color:'#2C5147', recommendFor:["'틀리면 어쩌지'란 생각을 먼저 하는 분",'잘하고 싶은데 시작 전부터 위축되는 분','부러운 동료는 나와 다른 종족이라 느끼는 분'] },
  { id:'t1-b', timeSlot:1, date:'4/28', time:'12:37–12:57', category:'헤맸던 이야기',
    title:'저는 JYP 출신\n개발자입니다.', speaker:'문준호', speakerBio:'개발팀',
    topNote:'흘러감', topNotePercent:'40%', middleNote:'질문', middleNotePercent:'40%', baseNote:'방향', baseNotePercent:'20%',
    scentNote:'K-Pop이 좋아서 JYP에 들어갔다.\n분명 좋아하는 일이라 생각했다.',
    color:'#D4891A', recommendFor:['내가 하는 일의 이유를 생각한 적 없는 분','좋아서 선택했는데 이유가 흐릿해진 분','방향은 있는데 맞는 길인지 헷갈리는 분'] },
  { id:'t1-c', timeSlot:1, date:'4/28', time:'12:37–12:57', category:'겁났던 이야기',
    title:'도둑도\n빈손으론 도망 안 칩니다.', speaker:'최윤석', speakerBio:'AX교육팀',
    topNote:'불안', topNotePercent:'20%', middleNote:'도망', middleNotePercent:'50%', baseNote:'연결', baseNotePercent:'30%',
    scentNote:'영상으로 월 400을 벌었다.\n더이상 재밌지도, 잘 할 수 있을 것\n같지도 않아서 그만뒀다.\n그게 내 첫 번째 도망이었다.',
    color:'#C14460', recommendFor:['커리어 방향이 안 잡혀 막막한 분','지금 일이 맞는 선택인지 의심되는 분','나만 뒤처지는 것 같아 불안한 분'] },
  { id:'t2-a', timeSlot:2, date:'4/28', time:'13:04–13:24', category:'헤맸던 이야기',
    title:'트렌드에 치이고\nAI에 밀리는\n영상PD의 생존일기', slotTitle:'트렌드에 치이고 AI에 밀리는\n영상PD의 생존일기', speaker:'이연기', speakerBio:'브랜드콘텐츠팀',
    topNote:'무력감', topNotePercent:'50%', middleNote:'AI', middleNotePercent:'30%', baseNote:'도전', baseNotePercent:'20%',
    scentNote:'AI, 트렌드.\n노력한다고 따라잡을 수 있는 속도는\n이미 지났다는 핑계를 댔다.',
    color:'#C07040', recommendFor:['트렌드를 따라가야 한다는 압박을 느끼는 분','아직은 AI보단 검색이 편하신 분',"'준비되면 시작해야지'만 반복하는 분"] },
  { id:'t2-b', timeSlot:2, date:'4/28', time:'13:04–13:24', category:'겁났던 이야기',
    title:'이유도 모르고\n작아지고 있다면', speaker:'김지영', speakerBio:'CX팀',
    topNote:'위축', topNotePercent:'35%', middleNote:'소진', middleNotePercent:'40%', baseNote:'주도권', baseNotePercent:'25%',
    scentNote:'이유 있는 피곤함과\n이유 없는 피곤함을 분리하는 순간,\n내가 진짜\n신경 써야 할 것이 보였다.',
    color:'#921E20', recommendFor:['종일 누군가의 감정을 받아내다 퇴근하는 분','친절함이 만만함이 되어버리는 분','잘못이 없는데 자꾸 먼저 작아지는 분'] },
  { id:'t2-c', timeSlot:2, date:'4/28', time:'13:04–13:24', category:'지쳤던 이야기',
    title:'내 안의 작고 뾰족한 자아를\n다루는 방법', speaker:'이다희', speakerBio:'제품실',
    topNote:'커뮤니케이션', topNotePercent:'60%', middleNote:'퇴근길', middleNotePercent:'20%', baseNote:'회고', baseNotePercent:'20%',
    scentNote:'회사 일과의 8할이 대화인데,\n말은 할수록 어렵고\n마음을 무겁게 했다.',
    color:'#7F91AB', recommendFor:['바쁠수록 말이 거칠어지는 분','성숙하게 소통하고 싶은데 어려운 분','진심과 말이 다르게 닿아 고민인 분'] },
  { id:'t3-a', timeSlot:3, date:'4/29', time:'12:37–12:57', category:'겁났던 이야기',
    title:'AI로 10분 만에\n채용 랜딩을 뽑는\n리크루터가 되기까지', slotTitle:'AI로 10분 만에 채용 랜딩을 뽑는\n리크루터가 되기까지', speaker:'배승아', speakerBio:'피플팀',
    topNote:'FOMO', topNotePercent:'10%', middleNote:'AI', middleNotePercent:'30%', baseNote:'해냄', baseNotePercent:'60%',
    scentNote:'방법을 몰랐다.\n어디까지 되는지도 몰랐다.\n앱스스크립트 창을 열었다가,\n외계어만 보고 닫았다.',
    color:'#531229', recommendFor:['AI에게 뭘 시키면 좋을지 모르는 분','바이브코딩 해보라는데 뭘 할지 막막한 분','AI 사례는 봤는데 내 업무에 적용은 어려운 분'] },
  { id:'t3-b', timeSlot:3, date:'4/29', time:'12:37–12:57', category:'지쳤던 이야기',
    title:'입사 한 달, 아무도 나에게\n일을 주지 않았다.', speaker:'박승현', speakerBio:'경영지원본부',
    topNote:'확신', topNotePercent:'25%', middleNote:'대가', middleNotePercent:'50%', baseNote:'임계치', baseNotePercent:'25%',
    scentNote:'한 달이 지나고,\n새벽 4시 퇴근이 일상이 되었다.\n남들이 하는 "적당히"라는 말을\n평생 이해할 수 없겠다고 생각했다.',
    color:'#5E9E89', recommendFor:['몸의 신호를 의지로 버텨낸 적 있는 분','쉬면 불안하고 뒤처질 것 같은 분',"'적당히'가 게으른 핑계라 느끼는 분"] },
  { id:'t3-c', timeSlot:3, date:'4/29', time:'12:37–12:57', category:'헤맸던 이야기',
    title:'삼성, 마이크로소프트\n다 떠나고도 후회 없나고요?', speaker:'박영진', speakerBio:'AX솔루션팀',
    topNote:'커리어', topNotePercent:'50%', middleNote:'고민', middleNotePercent:'10%', baseNote:'기준', baseNotePercent:'40%',
    scentNote:'커리어를 선택할 때마다\n다들 날 말렸다.\n물어볼 사람도, 기준도 없었다.',
    color:'#8F7A3A', recommendFor:['이 일이 커리어가 될지 모르겠는 분','열심히는 하는데 맞는 방향인지 확신 없는 분','롤모델도 가이드도 없어 기준이 막막한 분'] },
  { id:'t4-a', timeSlot:4, date:'4/29', time:'13:04–13:24', category:'헤맸던 이야기',
    title:'전재산 18만원에서 시작한\n인생 재무제표', speaker:'박상준', speakerBio:'게임팀',
    topNote:'회피', topNotePercent:'25%', middleNote:'기록', middleNotePercent:'45%', baseNote:'기준', baseNotePercent:'30%',
    scentNote:'130만원짜리 숙소에서 전재산이 담긴\n통장 잔고를 확인했다.\n달랑 18만원이었다.',
    color:'#694124', recommendFor:['결혼·집·투자, 생각만 해도 아찔한 분','경제 유튜브를 봐도 내 기준을 모르겠는 분','현실 걱정은 커지는데 아직 대비는 못 한 분'] },
  { id:'t4-b', timeSlot:4, date:'4/29', time:'13:04–13:24', category:'지쳤던 이야기',
    title:'명랑한 오뚜기가 되겠다고\n결심한 이유', speaker:'나하나', speakerBio:'컬처팀',
    topNote:'회복탄력성', topNotePercent:'50%', middleNote:'육아', middleNotePercent:'25%', baseNote:'명랑함', baseNotePercent:'25%',
    scentNote:'집이 망했다는 소식을 듣고\n공원에서 하루종일 울었다.\n그러다 생각했다.\n망한 건 내가 아니지 않나..?',
    color:'#4E7A96', recommendFor:['요즘 버겁고 무거운 고민 중인 분','세상이 가끔 날 억까한다고 느끼는 분','어차피 할 일, 기왕이면 즐겁게 하고 싶은 분'] },
];

/* ── 초기화 ──────────────────────────────────────────────── */
function loadLectures() {
  state.lectures = LECTURES_DATA;
  renderAll();
}

function renderAll() {
  renderTimeSections();
  renderBottomSheet();
  initSwipers();
}

/* ── 렌더링: 타임 섹션 ────────────────────────────────────── */
function renderTimeSections() {
  [1, 2, 3, 4].forEach((slot) => {
    const wrapper = document.getElementById(`swiper-wrapper-${slot}`);
    if (!wrapper) return;
    const slotLectures = state.lectures.filter((l) => l.timeSlot === slot);
    const selectedId = state.selections[slot];
    wrapper.innerHTML = slotLectures.map((l) => {
      let cardState = 'default';
      if (selectedId) {
        cardState = l.id === selectedId ? 'selected' : 'sibling';
      }
      return `<div class="swiper-slide">${renderCard(l, cardState)}</div>`;
    }).join('');
  });
}

function renderCard(lecture, cardState = 'default') {
  const selectedClass  = cardState === 'selected' ? ' card--selected' : '';
  const siblingClass   = cardState === 'sibling'  ? ' card--sibling'  : '';
  const auraGradient   = getAuraGradient(lecture.color);

  const noteRows = [
    { label: 'TOP',    value: lecture.topNote,    pct: lecture.topNotePercent },
    { label: 'MIDDLE', value: lecture.middleNote,  pct: lecture.middleNotePercent },
    { label: 'BASE',   value: lecture.baseNote,    pct: lecture.baseNotePercent },
  ].map(n => `
    <div class="card__note-row">
      <span class="card__note-label">${n.label}</span>
      <span class="card__note-value">${n.value}</span>
      <span class="card__note-pct">${n.pct}</span>
    </div>`).join('');

  // 날짜 포맷: "4/28" → "4월 28일 (화)"
  const dayNames = { '4/28': '4월 28일 (화)', '4/29': '4월 29일 (수)' };
  const dateFormatted = dayNames[lecture.date] || lecture.date;

  return `
    <div class="card${selectedClass}${siblingClass}"
         data-id="${lecture.id}"
         data-slot="${lecture.timeSlot}"
         role="button"
         tabindex="0"
         aria-label="${lecture.title} 강연 상세 보기">

      <div class="card__header">
        <span class="card__brand">Svashi · Vol. III</span>
        <img class="card__brand-logo" src="15min-logo.png" alt="15MIN">
      </div>

      <div class="card__aura">
        <div class="card__aura-blob" style="background:${auraGradient}"></div>
        <p class="card__hook">${lecture.title}</p>
      </div>

      <div class="card__bottom">
        <div class="card__sub-header">
          <span class="card__time-vol">Scent Note</span>
          <span class="card__cat">${lecture.category}</span>
        </div>
        <div class="card__rule"></div>
        <div class="card__footer">
          <div class="card__note-stack">${noteRows}</div>
          <div class="card__meta">
            <span class="card__time-date">${dateFormatted} ${lecture.timeSlot}타임</span>
            <span class="card__speaker-line">${lecture.speaker} <span class="card__speaker-bio">${lecture.speakerBio}</span></span>
          </div>
        </div>
      </div>

      <div class="card__check" aria-hidden="true">
        <svg viewBox="0 0 12 12" fill="none">
          <polyline points="2,6.5 5,9.5 10,3" stroke="#FAF7F3" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>`;
}

/* ── 렌더링: 바텀시트 ────────────────────────────────────── */
function renderBottomSheet(animatingSlot = null) {
  const slotsEl = document.getElementById('sheetSlots');
  const statusEl = document.getElementById('sheetStatus');
  const btnComplete = document.getElementById('btnComplete');
  const sheetBadge = document.getElementById('sheetBadge');
  const sheetCount = document.getElementById('sheetCount');

  const count = getSelectedCount();
  const placeholderEl = document.getElementById('sheetPlaceholder');

  // 뱃지
  if (sheetBadge) sheetBadge.textContent = count;
  if (sheetCount) sheetCount.textContent = `${count} / 4`;

  // 노트 플레이스홀더: 항상 표시, 메시지만 업데이트
  if (placeholderEl) {
    const textEl = placeholderEl.querySelector('.sheet-placeholder__text');
    if (textEl) textEl.textContent = getStatusMessage(count);
  }

  // 상태 메시지 (플레이스홀더로 통합)
  if (statusEl) statusEl.textContent = '';

  // 버튼 상태
  const btnExplore = document.getElementById('btnExplore');
  if (btnComplete && btnExplore) {
    if (count >= 4) {
      // 4개 완성 → 탐색 숨기고 완성하기 승격
      btnExplore.classList.add('btn-explore--hidden');
      btnComplete.classList.remove('btn-complete-text--disabled');
      btnComplete.classList.add('btn-complete-text--promoted');
    } else if (count >= 1) {
      // 1~3개 → 둘 다 표시
      btnExplore.classList.remove('btn-explore--hidden');
      btnComplete.classList.remove('btn-complete-text--disabled');
      btnComplete.classList.remove('btn-complete-text--promoted');
    } else {
      // 0개 → 탐색만 표시, 완성 비활성
      btnExplore.classList.remove('btn-explore--hidden');
      btnComplete.classList.add('btn-complete-text--disabled');
      btnComplete.classList.remove('btn-complete-text--promoted');
    }
  }

  // 슬롯
  if (!slotsEl) return;
  slotsEl.innerHTML = [1, 2, 3, 4].map((slot) => {
    const selId = state.selections[slot];
    const slotDateMap = { 1: '4/28', 2: '4/28', 3: '4/29', 4: '4/29' };
    const slotLabel = `${slotDateMap[slot]} · ${slot}타임`;
    if (!selId) {
      return `
        <div class="slot slot--empty" data-slot="${slot}">
          <div class="slot__thumb"><span>${slot}</span></div>
          <div class="slot__inner">
            <span class="slot__time-label">${slotLabel}</span>
          </div>
        </div>`;
    }
    const lec = getLectureById(selId);
    if (!lec) return '';
    const coloredClass = slot === animatingSlot ? '' : 'slot__thumb--colored';
    const rgb = hexToRgb(lec.color);
    const slotColor = `rgba(${rgb},0.22)`;
    const slotColorStrong = lec.color;
    return `
      <div class="slot" data-slot="${slot}">
        <div class="slot__thumb ${coloredClass}" style="--slot-color:${slotColor};--slot-color-strong:${slotColorStrong}"><span>${slot}</span></div>
        <div class="slot__inner">
          <span class="slot__time-label">${slotLabel}</span>
          <p class="slot__title">${(lec.slotTitle || lec.title)}</p>
        </div>
        <button class="slot__remove" data-remove-slot="${slot}" aria-label="${lec.title} 제거">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" stroke-linecap="round"/>
            <line x1="6" y1="6" x2="18" y2="18" stroke-linecap="round"/>
          </svg>
        </button>
      </div>`;
  }).join('');
}

/* ── 렌더링: 모달 ────────────────────────────────────────── */
function renderModal(lectureId) {
  const lec = getLectureById(lectureId);
  if (!lec) return;

  const modal = document.getElementById('modal');
  if (!modal) return;

  const timeSlot = lec.timeSlot;
  const selectedId = state.selections[timeSlot];
  const isSelected = selectedId === lectureId;
  const hasOtherSelection = selectedId && selectedId !== lectureId;

  let btnClass = 'btn-pick';
  let btnText = '담기';
  if (isSelected) {
    btnClass = 'btn-pick btn-pick--selected';
    btnText = '이미 선택한 15분이에요';
  } else if (hasOtherSelection && getSelectedCount() === 4) {
    btnClass = 'btn-pick';
    btnText = '교체하기';
  }

  const lectureNo = String(state.lectures.indexOf(lec) + 1).padStart(2, '0');
  const recommendFor = lec.recommendFor || [];
  const fitSection = recommendFor.length > 0
    ? `<div class="modal__fit-area">
        <p class="modal__fit-label">이런 향이 맞는 분</p>
        <ul class="modal__fit-list">
          ${recommendFor.map(item => `<li class="modal__fit-item">${item}</li>`).join('')}
        </ul>
      </div>`
    : '';

  modal.innerHTML = `
    <div class="modal__inner">
      <div class="modal__frame">
        <div class="modal__label-top">
          <span class="modal__no">No.${lectureNo}</span>
          <span class="modal__cat-tag">${lec.category}</span>
          <button class="modal__close" id="modalClose" aria-label="모달 닫기">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" stroke-linecap="round" stroke-linejoin="round"/>
              <line x1="6" y1="6" x2="18" y2="18" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
        <div class="modal__desc-area">
          <p class="modal__desc">${lec.scentNote}</p>
        </div>
        ${fitSection}
        <div class="modal__perfumer-area">
          <span class="modal__perfumer-label">speaker</span>
          <span class="modal__speaker-name">${lec.speaker}</span>
          <span class="modal__speaker-bio">${lec.speakerBio}</span>
        </div>
      </div>
      <button class="${btnClass}" data-pick="${lectureId}">${btnText}</button>
    </div>`;
}

/* ── 렌더링: 최종 확인 페이지 ───────────────────────────── */
function renderRecipePage() {
  const recipePage = document.getElementById('recipePage');
  if (!recipePage) return;

  const slots = [1, 2, 3, 4];
  const slotLabels = {
    1: '4/28 1타임',
    2: '4/28 2타임',
    3: '4/29 1타임',
    4: '4/29 2타임',
  };

  const recipeItems = slots.map((slot) => {
    const lec = getLectureById(state.selections[slot]);
    if (!lec) return '';
    const altChecked = state.altOk[slot] ? 'checked' : '';
    return `
      <li class="recipe-item" data-recipe-slot="${slot}">
        <span class="recipe-item__time">${slotLabels[slot]}</span>
        <p class="recipe-item__title">${lec.title}</p>
        <p class="recipe-item__speaker">${lec.speaker}</p>
        <div class="recipe-item__alt">
          <input type="checkbox" id="alt-${slot}" ${altChecked} data-alt-slot="${slot}" />
          <label class="recipe-alt-label" for="alt-${slot}">자리가 없으면 같은 타임 다른 강연으로 배정해주세요</label>
        </div>
      </li>`;
  }).join('');

  // 시그니처 강연 셀렉트 옵션
  const signatureOptions = slots.map((slot) => {
    const lec = getLectureById(state.selections[slot]);
    if (!lec) return '';
    const selected = state.signature === lec.id ? 'selected' : '';
    return `<option value="${lec.id}" ${selected}>${lec.title}</option>`;
  }).join('');

  recipePage.innerHTML = `
    <div class="recipe-page__inner">
      <button class="btn-back" id="btnBackRecipe" aria-label="뒤로가기">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
      </button>
      <h1 class="recipe-page__title">나의 스바시<br>레시피</h1>
      <p class="recipe-page__subtitle">
        나만의 조합을 마지막으로 확인해보세요.<br>
        가장 기대되는 강연을 시그니처로 고르면, 레시피가 완성돼요.
      </p>
      <ul class="recipe-list">${recipeItems}</ul>
      <div class="signature-section">
        <p class="signature-section__label">시그니처 강연</p>
        <select class="signature-select" id="signatureSelect">
          <option value="">가장 기대되는 강연을 골라주세요</option>
          ${signatureOptions}
        </select>
        <p class="signature-section__sub">선택한 강연의 배정 우선순위가 높아져요.</p>
      </div>
      <div class="recipe-page__footer">
        <button class="btn-finalize" id="btnFinalize" ${state.signature ? '' : 'disabled'}>이 레시피로 신청하기</button>
      </div>
    </div>`;

  // 이벤트 바인딩 (페이지 내부)
  const signatureSelect = document.getElementById('signatureSelect');
  if (signatureSelect) {
    signatureSelect.addEventListener('change', (e) => {
      state.signature = e.target.value || null;
      const btn = document.getElementById('btnFinalize');
      if (btn) btn.disabled = !state.signature;
    });
  }
}

/* ── 렌더링: 완료 페이지 ─────────────────────────────────── */
function renderDonePage() {
  const inner = document.querySelector('.done-page__inner');
  if (!inner) return;

  const slotDateMap = { 1: '4/28', 2: '4/28', 3: '4/29', 4: '4/29' };
  const slotLabelMap = { 1: '1타임', 2: '2타임', 3: '1타임', 4: '2타임' };

  const noteItems = [1, 2, 3, 4]
    .filter(slot => state.selections[slot])
    .map(slot => {
      const lec = getLectureById(state.selections[slot]);
      const isSignature = state.signature === lec.id;
      const sigClass = isSignature ? ' done-label__note--signature' : '';
      const sigMark  = isSignature ? '<span class="done-signature-mark">★</span>' : '';
      return `
        <li class="done-label__note${sigClass}">
          <span class="done-label__note-meta">${slotDateMap[slot]} · ${slotLabelMap[slot]}&nbsp;&nbsp;</span>
          <span class="done-label__note-title">${lec.title}</span>
          ${sigMark}
        </li>`;
    }).join('');

  const username = state.email
    ? state.email.split('@')[0].toUpperCase()
    : '—';

  inner.innerHTML = `
    <p class="done-eyebrow">Note Composition Complete</p>
    <div class="done-caption">
      <span class="done-caption__main">조향이 완성됐어요.</span>
      <span class="done-caption__sub">4월 28–29일, 스바시에서 만나요.</span>
    </div>
    <div class="done-label-wrap">
      <div class="done-label">
        <div class="done-label__brand">
          <span class="done-label__brand-name">15min · Svashi</span>
          <span class="done-label__brand-title">My Scent Note</span>
        </div>
        <div class="done-label__divider">
          <span class="done-label__divider-ornament">✦</span>
        </div>
        <ul class="done-label__notes">${noteItems}</ul>
        <div class="done-label__divider" style="margin-top:16px;margin-bottom:0;">
          <span class="done-label__divider-ornament">· · ·</span>
        </div>
        <div class="done-label__footer">
          <div class="done-label__owner">
            Composed by
            <span class="done-label__owner-name">${username}</span>
          </div>
          <div class="done-label__batch">
            Batch No. 2026–04<br>
            Svashi Vol. III
          </div>
        </div>
      </div>
    </div>
    <div class="done-notice">
      <p class="done-notice__main">선택한 15분들이 모두 신청되었어요.</p>
      <p class="done-notice__sub">배정 결과는 4월 27일(월)까지 안내드릴게요.</p>
    </div>`;
}

/* ── 인터랙션: 모달 열기/닫기 ────────────────────────────── */
function openModal(lectureId) {
  closeBottomSheet();
  renderModal(lectureId);
  const overlay = document.getElementById('modalOverlay');
  const modal = document.getElementById('modal');
  if (!overlay || !modal) return;
  overlay.classList.add('modal-overlay--active');
  modal.classList.add('modal--open');
}

function closeModal() {
  const overlay = document.getElementById('modalOverlay');
  const modal = document.getElementById('modal');
  if (!overlay || !modal) return;
  overlay.classList.remove('modal-overlay--active');
  modal.classList.remove('modal--open');
  // 팝업도 닫기
  closeReplacePopup();
}

/* ── 인터랙션: 바텀시트 열기/닫기 ───────────────────────── */
function openBottomSheet() {
  const sheet = document.getElementById('bottomSheet');
  const backdrop = document.getElementById('sheetBackdrop');
  if (sheet) sheet.classList.add('bottom-sheet--open');
  if (backdrop) backdrop.classList.add('sheet-backdrop--active');
}

function closeBottomSheet() {
  const sheet = document.getElementById('bottomSheet');
  const backdrop = document.getElementById('sheetBackdrop');
  if (sheet) sheet.classList.remove('bottom-sheet--open');
  if (backdrop) backdrop.classList.remove('sheet-backdrop--active');
}

/* ── 인터랙션: 교체 팝업 ─────────────────────────────────── */
function openReplacePopup(timeSlot, newLectureId) {
  state.pendingReplace = { timeSlot, newLectureId };
  const popup = document.getElementById('replacePopup');
  if (!popup) return;

  const existingLec = getLectureById(state.selections[timeSlot]);
  const newLec = getLectureById(newLectureId);
  if (!existingLec || !newLec) return;

  popup.innerHTML = `
    <p class="replace-popup__text">
      <strong>${existingLec.title}</strong>을(를)<br>
      <strong>${newLec.title}</strong>으로 교체할까요?
    </p>
    <div class="replace-popup__actions">
      <button id="replaceCancel">취소</button>
      <button id="replaceConfirm">교체하기</button>
    </div>`;

  popup.classList.add('replace-popup--active');

  document.getElementById('replaceConfirm')?.addEventListener('click', confirmReplace);
  document.getElementById('replaceCancel')?.addEventListener('click', cancelReplace);
}

function closeReplacePopup() {
  const popup = document.getElementById('replacePopup');
  if (popup) popup.classList.remove('replace-popup--active');
  state.pendingReplace = null;
}

function confirmReplace() {
  if (!state.pendingReplace) return;
  const { timeSlot, newLectureId } = state.pendingReplace;
  state.selections[timeSlot] = newLectureId;
  closeReplacePopup();
  closeModal();
  renderTimeSections();
  renderBottomSheet();
  refreshSwipers();
  openBottomSheet();
}

function cancelReplace() {
  closeReplacePopup();
  // 모달은 유지 (A안)
}

/* ── 인터랙션: 담기 버튼 처리 ───────────────────────────── */
function handlePickClick(lectureId) {
  const lec = getLectureById(lectureId);
  if (!lec) return;

  const timeSlot = lec.timeSlot;
  const selectedId = state.selections[timeSlot];

  // 이미 선택된 강연 → 무시
  if (selectedId === lectureId) return;

  // 같은 타임에 다른 강연 선택됨 → 교체 팝업
  if (selectedId && selectedId !== lectureId) {
    openReplacePopup(timeSlot, lectureId);
    return;
  }

  // 4개 모두 담긴 상태 → 무시 (방어)
  if (getSelectedCount() === 4) return;

  // 정상 선택
  state.selections[timeSlot] = lectureId;
  closeModal();
  renderTimeSections();
  renderBottomSheet(timeSlot); // 새로 담기는 슬롯은 gray로 시작
  refreshSwipers();
  flyAnimation(lectureId);
}

/* ── 슬롯에서 강연 제거 ──────────────────────────────────── */
function removeFromSlot(timeSlot) {
  state.selections[timeSlot] = null;
  renderTimeSections();
  renderBottomSheet();
  refreshSwipers();
}

/* ── 담기 애니메이션 ─────────────────────────────────────── */
function flyAnimation(lectureId) {
  const lec = getLectureById(lectureId);
  openBottomSheet();

  if (!lec) return;

  // 바텀시트 transition(350ms) 끝난 후 물드는 애니메이션 시작
  setTimeout(() => {
    requestAnimationFrame(() => {
      const thumb = document.querySelector(`.slot[data-slot="${lec.timeSlot}"] .slot__thumb`);
      if (thumb) {
        // 블룸 시작. ::before가 opacity 0.28로 정착(forwards) — 텍스트 색 전환도 동시
        thumb.classList.add('slot__thumb--fill');
        thumb.classList.add('slot__thumb--colored');
        // 애니메이션 종료 시 ::before는 이미 opacity 0 → --fill 제거해도 시각 변화 없음
        thumb.addEventListener('animationend', () => {
          thumb.classList.remove('slot__thumb--fill');
        }, { once: true });
      }
    });
  }, 360);
}

/* ── 최종 확인 페이지 열기 ───────────────────────────────── */
function openRecipePage() {
  renderRecipePage();
  const page = document.getElementById('recipePage');
  if (page) page.classList.add('recipe-page--active');
  closeBottomSheet();
  history.pushState({ page: 'recipe' }, '');
}

function closeRecipePage() {
  document.getElementById('recipePage')?.classList.remove('recipe-page--active');
}

/* ── 이메일 자동완성 ────────────────────────────────────── */
let cachedMembers = null;

async function fetchMembers() {
  if (cachedMembers) return cachedMembers;
  try {
    const res = await fetch(APPS_SCRIPT_URL + '?action=members');
    if (!res.ok) return null;
    const data = await res.json();
    if (data.members) {
      cachedMembers = data.members;
      // fetch 완료 시 이미 입력 중이면 바로 suggestions 표시
      const input = document.getElementById('signEmail');
      if (input && input.value.trim()) {
        renderSuggestions(input.value.trim());
      }
      return cachedMembers;
    }
  } catch (e) {
    console.warn('[svashi] 구성원 목록 로딩 실패 — 직접 입력 모드');
  }
  return null;
}

function renderSuggestions(query) {
  const list = document.getElementById('signSuggestions');
  if (!list || !cachedMembers) return;

  if (!query || query.length < 1) {
    list.classList.remove('sign-page__suggestions--open');
    list.innerHTML = '';
    return;
  }

  const q = query.toLowerCase();
  const filtered = cachedMembers.filter(m =>
    m.name.toLowerCase().includes(q) || m.email.toLowerCase().includes(q)
  ).slice(0, 6);

  if (filtered.length === 0) {
    list.classList.remove('sign-page__suggestions--open');
    list.innerHTML = '';
    return;
  }

  list.innerHTML = filtered.map(m => `
    <li class="sign-page__suggestion" data-email="${m.email}">
      <span class="sign-page__suggestion-name">${m.name.replace(/[A-Z]$/, '')}</span>
      <span class="sign-page__suggestion-email">${m.email}</span>
    </li>`).join('');
  list.classList.add('sign-page__suggestions--open');
}

/* ── 신청서 제출 ─────────────────────────────────────────── */
function handleFinalize() {
  openSignPage();
}

function openSignPage() {
  const page = document.getElementById('signPage');
  if (!page) return;
  page.classList.add('sign-page--active');
  history.pushState({ page: 'sign' }, '');
  // 구성원 목록 미리 로딩
  fetchMembers();
  setTimeout(() => {
    document.getElementById('signEmail')?.focus();
  }, 320);
}

function closeSignPage() {
  document.getElementById('signPage')?.classList.remove('sign-page--active');
}

async function submitWithEmail(email, maxRetries = 3) {
  const payload = {
    email,
    t1: state.selections[1]
      ? { name: getLectureById(state.selections[1])?.title, replaceable: state.altOk[1] }
      : null,
    t2: state.selections[2]
      ? { name: getLectureById(state.selections[2])?.title, replaceable: state.altOk[2] }
      : null,
    t3: state.selections[3]
      ? { name: getLectureById(state.selections[3])?.title, replaceable: state.altOk[3] }
      : null,
    t4: state.selections[4]
      ? { name: getLectureById(state.selections[4])?.title, replaceable: state.altOk[4] }
      : null,
    signature: state.signature ? getLectureById(state.signature)?.title : '',
    count: getSelectedCount(),
  };

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      const res = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!res.ok) throw new Error('network_error');
      const result = await res.json();
      if (!result.success) throw new Error(result.error || 'submit_failed');
      return result;
    } catch (err) {
      if (attempt === maxRetries) throw err;
      const baseDelay = 1000 * Math.pow(2, attempt);
      const jitter = Math.random() * 1000;
      await new Promise((r) => setTimeout(r, baseDelay + jitter));
    }
  }
}

/* ── Swiper 초기화 & 갱신 ────────────────────────────────── */
function initSwipers() {
  [1, 2, 3, 4].forEach((slot) => {
    if (state.swipers[slot]) {
      state.swipers[slot].destroy(true, true);
    }
    state.swipers[slot] = new Swiper(`.swiper-t${slot}`, {
      slidesPerView: 'auto',
      spaceBetween: 12,
      centeredSlides: false,
      grabCursor: true,
    });
  });
}

function refreshSwipers() {
  [1, 2, 3, 4].forEach((slot) => {
    if (state.swipers[slot]) {
      state.swipers[slot].update();
    }
  });
}

/* ── 이벤트 바인딩 ───────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  loadLectures();
  bindEvents();
});

function bindEvents() {
  // ── 브라우저/앱 뒤로가기
  window.addEventListener('popstate', () => {
    if (document.getElementById('signPage')?.classList.contains('sign-page--active')) {
      closeSignPage();
    } else if (document.getElementById('recipePage')?.classList.contains('recipe-page--active')) {
      closeRecipePage();
    }
  });

  // ── 카드 클릭 (이벤트 위임)
  document.addEventListener('click', async (e) => {
    // 바텀시트 peek 클릭 → 열기
    const sheet = document.getElementById('bottomSheet');
    if (e.target.closest('#bottomSheetHandle') || e.target.closest('.bottom-sheet__header')) {
      if (sheet && !sheet.classList.contains('bottom-sheet--open')) {
        openBottomSheet();
        return;
      }
    }

    // 카드 클릭 → 모달 열기
    const card = e.target.closest('.card');
    if (card) {
      const id = card.dataset.id;
      const slot = parseInt(card.dataset.slot, 10);
      // 이미 선택된 카드 클릭 → 선택 해제
      if (slot && state.selections[slot] === id) {
        removeFromSlot(slot);
        return;
      }
      if (id) openModal(id);
      return;
    }

    // 담기 버튼 클릭
    const pickBtn = e.target.closest('[data-pick]');
    if (pickBtn) {
      const id = pickBtn.dataset.pick;
      if (id) handlePickClick(id);
      return;
    }

    // 슬롯 제거 버튼
    const removeBtn = e.target.closest('[data-remove-slot]');
    if (removeBtn) {
      const slot = parseInt(removeBtn.dataset.removeSlot, 10);
      if (slot) removeFromSlot(slot);
      return;
    }

    // 모달 닫기 버튼
    if (e.target.closest('#modalClose')) {
      closeModal();
      return;
    }

    // 모달 오버레이 클릭
    if (e.target === document.getElementById('modalOverlay')) {
      closeModal();
      return;
    }

    // 시트 백드롭 클릭 → 시트 닫기
    if (e.target.id === 'sheetBackdrop') {
      closeBottomSheet();
      return;
    }

    // 시트 트리거 클릭
    if (e.target.closest('#sheetTrigger')) {
      openBottomSheet();
      return;
    }

    // 탐색 버튼 → 바텀시트 닫고 다음 빈 타임으로 스크롤
    if (e.target.closest('#btnExplore')) {
      closeBottomSheet();
      const nextEmpty = [1,2,3,4].find(s => !state.selections[s]);
      if (nextEmpty) {
        const section = document.querySelector(`.time-section[data-slot="${nextEmpty}"]`);
        if (section) {
          setTimeout(() => {
            section.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 360);
        }
      }
      return;
    }

    // 완료 버튼
    if (e.target.closest('#btnComplete')) {
      if (!e.target.closest('.btn-complete-text--disabled')) {
        openRecipePage();
      }
      return;
    }

    // 뒤로가기 버튼
    if (e.target.closest('#btnBackRecipe') || e.target.closest('#btnBackSign')) {
      history.back();
      return;
    }

    // 신청서 제출 버튼
    if (e.target.closest('#btnFinalize')) {
      handleFinalize();
      return;
    }

    // 자동완성 항목 클릭
    const suggestion = e.target.closest('.sign-page__suggestion');
    if (suggestion) {
      const email = suggestion.dataset.email;
      const input = document.getElementById('signEmail');
      const list = document.getElementById('signSuggestions');
      if (input) input.value = email;
      if (list) {
        list.classList.remove('sign-page__suggestions--open');
        list.innerHTML = '';
      }
      return;
    }

    // 서명하기 버튼
    if (e.target.closest('#btnSign')) {
      const btn = document.getElementById('btnSign');
      const input = document.getElementById('signEmail');
      const errorEl = document.getElementById('signError');
      const email = input?.value.trim() ?? '';

      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        if (errorEl) errorEl.textContent = '올바른 이메일 형식을 입력해주세요';
        input?.focus();
        return;
      }

      if (errorEl) errorEl.textContent = '';
      btn.disabled = true;
      state.email = email;

      // 제출 진행 — 로딩 상태 표시
      btn.textContent = '제출 중…';

      try {
        await submitWithEmail(email);

        // 성공 시 완료 화면 전환
        const signPage = document.getElementById('signPage');
        const donePage = document.getElementById('donePage');
        signPage?.classList.add('sign-page--exit');
        setTimeout(() => {
          renderDonePage();
          setTimeout(() => {
            requestAnimationFrame(() => {
              donePage?.classList.add('done-page--active');
            });
          }, 200);
        }, 100);
      } catch (err) {
        console.error('[svashi] 서명 제출 실패 — email:', email, err);
        btn.disabled = false;
        btn.textContent = '서명하기';
        if (errorEl) errorEl.textContent = '제출에 실패했어요. 다시 시도해주세요.';
      }
      return;
    }

    // 대치 체크박스
    const altCheck = e.target.closest('[data-alt-slot]');
    if (altCheck && altCheck.type === 'checkbox') {
      const slot = parseInt(altCheck.dataset.altSlot, 10);
      if (slot) state.altOk[slot] = altCheck.checked;
      return;
    }
  });

  // ── 키보드 접근성: Enter/Space로 카드 활성화
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      const card = e.target.closest('.card');
      if (card) {
        e.preventDefault();
        const id = card.dataset.id;
        if (id) openModal(id);
      }
    }
    if (e.key === 'Escape') {
      closeModal();
      closeBottomSheet();
    }
  });

  // ── 바텀시트 핸들 스와이프 다운으로 닫기
  const handle = document.getElementById('bottomSheetHandle');
  if (handle) {
    let startY = 0;
    handle.addEventListener('touchstart', (e) => {
      startY = e.touches[0].clientY;
    }, { passive: true });
    handle.addEventListener('touchend', (e) => {
      const deltaY = e.changedTouches[0].clientY - startY;
      if (deltaY > 60) closeBottomSheet();
    }, { passive: true });
  }

  // ── 이메일 자동완성 입력 이벤트
  document.addEventListener('input', (e) => {
    if (e.target.id === 'signEmail') {
      renderSuggestions(e.target.value.trim());
    }
  });

  // 입력창 외부 클릭 시 드롭다운 닫기
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.sign-page__input-wrap')) {
      const list = document.getElementById('signSuggestions');
      if (list) {
        list.classList.remove('sign-page__suggestions--open');
        list.innerHTML = '';
      }
    }
  }, true);
}
