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
const AURA_RGB = {
  '정체성':      '200,148,122',  // 로즈베이지
  '커리어':      '205,172,88',   // 앰버골드
  '관계':        '172,138,180',  // 더스티모브
  '번아웃·회복': '128,148,178',  // 페일슬레이트
  '성장':        '152,172,118',  // 웜세이지
  '일·루틴':     '168,135,180',  // 소프트라벤더
  '회복':        '138,155,168',  // 쿨그레이
};

function getAuraRGB(category) {
  return AURA_RGB[category] || '150,140,130';
}

function getAuraGradient(category) {
  const rgb = getAuraRGB(category);
  return [
    `radial-gradient(ellipse 55% 48% at 50% 52%, rgba(${rgb},0.28) 0%, transparent 68%)`,
    `radial-gradient(ellipse 38% 34% at 42% 44%, rgba(${rgb},0.16) 0%, transparent 58%)`,
    `radial-gradient(ellipse 65% 56% at 55% 58%, rgba(${rgb},0.08) 0%, transparent 65%)`,
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
    0: '4개의 15분, 나만의 조합으로 채워보세요.',
    1: '첫 번째 시간이 열렸어요',
    2: '두 가지 결이 만나고 있어요',
    3: '마지막 한 자리가 기다려요',
    4: '당신만의 스바시가 완성됐어요 ✦',
  };
  return messages[count] || '';
}

/* ── 강연 데이터 ─────────────────────────────────────────── */
const LECTURES_DATA = [
  { id:'t1-a', timeSlot:1, date:'4/28', time:'12:37–12:57', category:'커리어',      title:"커리어에서 '프로'가 되고 싶다면",           speaker:'김지현', speakerBio:'스타트업 기획자 · 9년차',        scentNotes:['이직','생존','전략'],      scentNote:'9번 옮기면서 발견한 건,\n버티는 법이 아니라 고르는 법이었다.',                                        illustrationUrl:'', recommendFor:['방향을 직접 고르고 싶은 분','이직이 두렵지만 움직이고 싶은 분','오래 버텨온 방식이 맞는지 의심되는 분'] },
  { id:'t1-b', timeSlot:1, date:'4/28', time:'12:37–12:57', category:'번아웃·회복', title:'800km를 걸으면 뭔가 달라질까요',             speaker:'박준영', speakerBio:'개발자 · 산티아고 완주',            scentNotes:['걷기','고요','위로'],       scentNote:'다 내려놓고 걷기 시작했더니,\n왜 달리고 있었는지가 보였다.',                                              illustrationUrl:'', recommendFor:['지쳐서 멈추고 싶은 분','아무것도 안 하는 시간이 필요한 분','몸이 먼저 신호를 보내고 있는 분'] },
  { id:'t1-c', timeSlot:1, date:'4/28', time:'12:37–12:57', category:'관계',        title:'결혼 전 반드시 짚고 넘어가야 하는 것들',    speaker:'이수민', speakerBio:'디자이너 · 기혼 2년차',            scentNotes:['관계','선택','현실'],       scentNote:'일도 사랑도 놓치고 싶지 않아서,\n둘 다 붙잡는 방법을 찾았다.',                                             illustrationUrl:'', recommendFor:['관계에서 현실적인 이야기를 듣고 싶은 분','결혼이나 파트너십을 진지하게 고민 중인 분','둘이 함께 성장하는 방식을 찾는 분'] },
  { id:'t2-a', timeSlot:2, date:'4/28', time:'14:10–14:30', category:'정체성',      title:'좋아하는 일이랑 잘 하는 일, 뭘 해야 할까요', speaker:'최다은', speakerBio:'개발자 → 미술 유학생',             scentNotes:['재능','용기','전환'],       scentNote:'공대생이 미술을 배워 독일에 갔다.\n정답을 찾아서가 아니라, 해보고 싶어서.',                                   illustrationUrl:'', recommendFor:['재능과 흥미 사이에서 고민 중인 분','전공과 다른 길을 걷고 싶은 분','정답 없이 해보고 싶은 분'] },
  { id:'t2-b', timeSlot:2, date:'4/28', time:'14:10–14:30', category:'번아웃·회복', title:'내 현실이 마음에 안 든다면',                speaker:'정유진', speakerBio:'PM · 요가 4년차',                 scentNotes:['몸','현실','받아들임'],     scentNote:'요가를 시작한 건 몸 때문이었는데,\n일하는 방식이 바뀌었다.',                                                 illustrationUrl:'', recommendFor:['일과 몸의 균형을 찾고 있는 분','번아웃이 아닌 다른 접근을 원하는 분','현실을 받아들이는 법을 배우고 싶은 분'] },
  { id:'t2-c', timeSlot:2, date:'4/28', time:'14:10–14:30', category:'번아웃·회복', title:'사진 백만 장을 찍으면 번아웃이 낫는다고요',  speaker:'한승호', speakerBio:'회계사 → 스타트업 9년차',          scentNotes:['번아웃','셔터','회복'],     scentNote:'회계법인 4년, 스타트업 9년.\n무너지지 않은 게 아니라, 일어서는 법을 배웠다.',                                illustrationUrl:'', recommendFor:['번아웃을 겪어본 분','일 외의 무언가로 회복한 경험이 궁금한 분','오래 버텨온 자신에게 공감이 필요한 분'] },
  { id:'t3-a', timeSlot:3, date:'4/29', time:'12:37–12:57', category:'성장',        title:'창업 과정에서 만난 3가지 우연',             speaker:'오민준', speakerBio:'창업자 · 3회차',                  scentNotes:['우연','기회','용기'],       scentNote:"'우연'이라고 부르기엔\n너무 자주 왔다.",                                                                    illustrationUrl:'', recommendFor:['기회를 알아보는 눈을 기르고 싶은 분','창업이나 새로운 시작을 준비 중인 분','우연이 필연이 되는 경험이 궁금한 분'] },
  { id:'t3-b', timeSlot:3, date:'4/29', time:'12:37–12:57', category:'일·루틴',     title:'당신의 취미는 무엇인가요',                  speaker:'서지우', speakerBio:'영상 PD · 뮤지컬 마니아',          scentNotes:['집착','취미','삶의 밀도'], scentNote:'월 80만원을 뮤지컬에 쓴다.\n낭비인지 투자인지는, 들으면 판단해봐.',                                         illustrationUrl:'', recommendFor:['삶의 밀도를 높이고 싶은 분','취미에 진심인 사람의 이야기가 궁금한 분','일 외의 시간을 어떻게 쓸지 고민 중인 분'] },
  { id:'t3-c', timeSlot:3, date:'4/29', time:'12:37–12:57', category:'성장',        title:'배움이 즐거웠던 때가 있었다, 언젠가',       speaker:'임채원', speakerBio:'스파르타 튜터 · 학습 연구자',      scentNotes:['두려움','틀림','전환'],     scentNote:'배움이 두려운 게 아니라, 틀리는 게 두려웠다.\n그 차이를 아는 것만으로 공부 방식이 달라졌다.',                  illustrationUrl:'', recommendFor:['공부가 두렵게 느껴지는 분','배움의 방식을 바꾸고 싶은 분','틀리는 것에 예민한 분'] },
  { id:'t4-a', timeSlot:4, date:'4/29', time:'14:10–14:30', category:'커리어',      title:'이직을 고민하는 건지, 도망치려는 건지',    speaker:'강태양', speakerBio:'커리어 컨설턴트 · 前 빅테크 PM',  scentNotes:['이직','도망','선택'],       scentNote:'세 번 이직하고 나서야 알았다.\n첫 번째는 도망이었고, 세 번째가 비로소 선택이었다는 걸.',                      illustrationUrl:'', recommendFor:['이직과 도망 사이에서 헷갈리는 분','커리어 방향을 객관적으로 점검하고 싶은 분','더 나은 선택을 하고 싶은 분'] },
  { id:'t4-b', timeSlot:4, date:'4/29', time:'14:10–14:30', category:'일·루틴',     title:'바쁜데 왜 아무것도 안 한 것 같지',          speaker:'윤소희', speakerBio:'전략기획 팀장 · 시간관리 강연자', scentNotes:['바쁨','집중','루틴'],       scentNote:'회의 4개, 슬랙 수십 개, 퇴근 후 녹초.\n정작 중요한 건 하나도 진행되지 않았다.',                              illustrationUrl:'', recommendFor:['바쁘지만 성과가 없는 느낌인 분','루틴과 집중의 차이를 알고 싶은 분','회의와 업무 사이에서 지친 분'] },
  { id:'t4-c', timeSlot:4, date:'4/29', time:'14:10–14:30', category:'정체성',      title:'남들 눈에 좋아 보이는 삶인데 왜 공허하지',  speaker:'문하린', speakerBio:'소셜미디어 크리에이터 · 전 마케터', scentNotes:['인정','공허','나다움'],     scentNote:'좋아요가 쌓일수록 내 안의 목소리는 작아졌다.\n외부의 인정이 존재 이유가 됐을 때, 아무것도 남지 않았다.',     illustrationUrl:'', recommendFor:['외부 인정에 의존하는 패턴이 있는 분','공허함의 원인을 찾고 싶은 분','나다움을 정의하고 싶은 분'] },
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
  const auraGradient   = getAuraGradient(lecture.category);
  const notes          = lecture.scentNotes || [];
  const noteLabels     = ['Top', 'Heart', 'Base'];
  const notePcts       = ['43%', '35%', '22%'];

  const noteRows = notes.slice(0, 3).map((n, i) => `
    <div class="card__note-row">
      <span class="card__note-label">${noteLabels[i]}</span>
      <span class="card__note-value">${n}</span>
      <span class="card__note-pct">${notePcts[i]}</span>
    </div>`).join('');

  return `
    <div class="card${selectedClass}${siblingClass}"
         data-id="${lecture.id}"
         data-slot="${lecture.timeSlot}"
         role="button"
         tabindex="0"
         aria-label="${lecture.title} 강연 상세 보기">

      <div class="card__header">
        <span class="card__brand">Svashi · Vol. III</span>
        <span class="card__cat">${lecture.category}</span>
      </div>

      <div class="card__aura">
        <div class="card__aura-blob" style="background:${auraGradient}"></div>
        <img class="card__aura-logo" src="스바시로고.png" alt="">
        <p class="card__hook">${lecture.title}</p>
      </div>

      <div class="card__bottom">
        <div class="card__rule"></div>
        <div class="card__footer">
          <div class="card__note-stack">${noteRows}</div>
          <div class="card__time">
            <span class="card__time-date">${lecture.date} · ${lecture.timeSlot}타임</span>
            <span class="card__time-range">${lecture.time}</span>
            <span class="card__time-vol">Scent Note</span>
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

  // 완료 버튼
  if (btnComplete) {
    if (count >= 1) {
      btnComplete.classList.remove('btn-complete--disabled');
    } else {
      btnComplete.classList.add('btn-complete--disabled');
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
    const slotColor = `rgb(${getAuraRGB(lec.category)})`;
    return `
      <div class="slot" data-slot="${slot}">
        <div class="slot__thumb ${coloredClass}" style="--slot-color:${slotColor}"><span>${slot}</span></div>
        <div class="slot__inner">
          <span class="slot__time-label">${slotLabel}</span>
          <p class="slot__title">${lec.title}</p>
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
  const notes = (lec.scentNotes || []).join(' · ');
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
          <div class="modal__label-right">
            <span class="modal__cat-tag">${lec.category}</span>
            <button class="modal__close" id="modalClose" aria-label="모달 닫기">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" stroke-linecap="round" stroke-linejoin="round"/>
                <line x1="6" y1="6" x2="18" y2="18" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
        <div class="modal__main">
          <h2 class="modal__hook">${lec.title}</h2>
          <p class="modal__notes">${notes}</p>
        </div>
        <div class="modal__desc-area">
          <p class="modal__desc">${lec.scentNote}</p>
        </div>
        ${fitSection}
        <div class="modal__perfumer-area">
          <div class="modal__perfumer-row">
            <span class="modal__perfumer-label">조향사</span>
            <span class="modal__speaker-name">${lec.speaker}</span>
          </div>
          <p class="modal__speaker-bio">${lec.speakerBio}</p>
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
          <label class="recipe-alt-label" for="alt-${slot}">다른 강연으로 대치 가능</label>
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
    <div class="done-caption">
      <span class="done-caption__main">조향이 완성됐어요.</span>
      <span class="done-caption__sub">4월 28–29일, 스바시에서 만나요.</span>
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
        thumb.classList.add('slot__thumb--fill');
        thumb.addEventListener('animationend', () => {
          thumb.classList.add('slot__thumb--colored');
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

/* ── 신청서 제출 ─────────────────────────────────────────── */
function handleFinalize() {
  openSignPage();
}

function openSignPage() {
  const page = document.getElementById('signPage');
  if (!page) return;
  page.classList.add('sign-page--active');
  history.pushState({ page: 'sign' }, '');
  setTimeout(() => {
    document.getElementById('signEmail')?.focus();
  }, 320);
}

function closeSignPage() {
  document.getElementById('signPage')?.classList.remove('sign-page--active');
}

async function submitWithEmail(email) {
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

  const res = await fetch(APPS_SCRIPT_URL, {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error('network_error');
  const result = await res.json();
  if (!result.success) throw new Error(result.error || 'submit_failed');
  return result;
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
  document.addEventListener('click', (e) => {
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

    // 완료 버튼
    if (e.target.closest('#btnComplete')) {
      if (!e.target.closest('.btn-complete--disabled')) {
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

      // 즉시 완료 화면으로 전환 (Optimistic UI)
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

      // 백그라운드에서 실제 제출
      submitWithEmail(email).catch(() => {
        console.error('[svashi] 서명 제출 실패 — email:', email);
      });
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
}
