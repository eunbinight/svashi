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
  altOk: {
    1: true,
    2: true,
    3: true,
    4: true,
  },
};

/* ── 유틸 ────────────────────────────────────────────────── */
function getCategoryModifier(categoryKey) {
  // categoryKey는 이미 공백·특수문자 제거된 값 (번아웃회복, 일루틴 등)
  return categoryKey;
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

/* ── 인라인 강연 데이터 ───────────────────────────────────── */
const LECTURES_DATA = [{"id":"t1-a","timeSlot":1,"date":"4/28","time":"12:37–12:57","category":"커리어","hookLine":"방향 없이 달려온 3년, 그 끝에 마주한 질문","title":"커리어 나침반 찾기","speaker":"김민준","speakerBio":"스파르타코딩클럽 PM, 5년차","scentNote":"처음엔 막막했다. 이력서도, 포트폴리오도, 아무것도 없던 시절. 그런데 어느 날 갑자기 깨달았다—내가 멈추지 않았던 이유를 비로소 알게 됐다.","recommendFor":["커리어 전환을 고민 중인 분","방향성 없이 바쁘게만 살아온 분"],"illustrationUrl":"","categoryKey":"커리어"},{"id":"t1-b","timeSlot":1,"date":"4/28","time":"12:37–12:57","category":"번아웃·회복","hookLine":"열심히 했는데 텅 빈 느낌이 드는 날","title":"다시 숨 쉬는 법","speaker":"이수현","speakerBio":"전 스타트업 디자이너, 번아웃 경험자","scentNote":"아무것도 하고 싶지 않은 아침이 있었다. 그게 게으름인 줄 알았다. 알고 보니 몸이 먼저 알고 있었다—나 지금 한계야, 라고.","recommendFor":["쉬어야 하는데 쉬지 못하는 분","에너지가 바닥났다고 느끼는 분"],"illustrationUrl":"","categoryKey":"번아웃회복"},{"id":"t1-c","timeSlot":1,"date":"4/28","time":"12:37–12:57","category":"관계","hookLine":"말하지 않아도 통할 거라 믿었던 그 사람","title":"말 못 한 마음의 무게","speaker":"박지연","speakerBio":"조직심리 컨설턴트, 前 HR 리더","scentNote":"침묵이 배려인 줄 알았다. 그런데 어느 순간 그 침묵이 벽이 됐다. 관계는 언제나 말 한마디 직전의 용기에서 시작된다.","recommendFor":["말하기 어려운 관계가 있는 분","조직 내 갈등을 경험 중인 분"],"illustrationUrl":"","categoryKey":"관계"},{"id":"t2-a","timeSlot":2,"date":"4/28","time":"14:10–14:30","category":"성장","hookLine":"틀려도 괜찮다는 말이 왜 이렇게 어렵지","title":"실패를 수집하는 사람들","speaker":"최동현","speakerBio":"스파르타 강사, 개발자 출신 교육자","scentNote":"제일 못했던 프로젝트를 이제는 가장 자주 꺼낸다. 그 실패가 나를 더 단단하게 만든 코드였다는 걸, 늦게야 알았다.","recommendFor":["실수가 두려운 분","완벽하지 않으면 시작을 못 하는 분"],"illustrationUrl":"","categoryKey":"성장"},{"id":"t2-b","timeSlot":2,"date":"4/28","time":"14:10–14:30","category":"일·루틴","hookLine":"투두리스트는 쌓이는데 나는 왜 멈춰 있지","title":"루틴이 아닌 리듬으로","speaker":"윤서아","speakerBio":"프리랜서 UX 디자이너, 생산성 블로거","scentNote":"매일 5시 기상, 물 한 잔, 저널링. 3주 만에 무너졌다. 루틴이 나를 위한 게 아니라 남에게 보여주기 위한 것이었다는 걸 그때 알았다.","recommendFor":["루틴을 만들고 싶지만 지속하지 못한 분","생산성 도구를 너무 많이 써봤지만 효과가 없었던 분"],"illustrationUrl":"","categoryKey":"일루틴"},{"id":"t2-c","timeSlot":2,"date":"4/28","time":"14:10–14:30","category":"정체성","hookLine":"나는 내가 뭘 좋아하는지 모른다","title":"좋아함의 언어","speaker":"강하린","speakerBio":"작가 겸 커리어 코치","scentNote":"20대에 좋아하는 것을 묻는 질문이 제일 무서웠다. 모른다고 하면 안 될 것 같았다. 그런데 모르는 게 사실 출발점이었다.","recommendFor":["자신이 뭘 원하는지 모르겠는 분","좋아하는 것과 잘하는 것 사이에서 고민 중인 분"],"illustrationUrl":"","categoryKey":"정체성"},{"id":"t3-a","timeSlot":3,"date":"4/29","time":"12:37–12:57","category":"번아웃·회복","hookLine":"열정이 사라졌을 때 가장 무서웠다","title":"열정 이후의 삶","speaker":"정우성","speakerBio":"전 스타트업 창업자, 현 명상 수련가","scentNote":"매일 24시간이 부족했던 사람이 어느 날 일어나지 못했다. 그 정지 버튼을 누른 건 내가 아니라 내 몸이었다. 회복은 포기가 아니다.","recommendFor":["예전만큼 일이 즐겁지 않은 분","한 번쯤 모든 걸 내려놓고 싶었던 분"],"illustrationUrl":"","categoryKey":"번아웃회복"},{"id":"t3-b","timeSlot":3,"date":"4/29","time":"12:37–12:57","category":"관계","hookLine":"좋은 동료가 되고 싶었는데 언제부터 피하게 됐지","title":"조직에서 나를 잃지 않는 법","speaker":"신예은","speakerBio":"리더십 코치, 스파르타 매니저 출신","scentNote":"팀에서 인정받을수록 나는 희미해졌다. 좋은 팀원이 되는 것과 나답게 있는 것, 이 둘이 충돌하는 순간이 반드시 온다.","recommendFor":["조직 안에서 자신을 잃는 느낌이 드는 분","관계 때문에 에너지가 빠지는 분"],"illustrationUrl":"","categoryKey":"관계"},{"id":"t3-c","timeSlot":3,"date":"4/29","time":"12:37–12:57","category":"성장","hookLine":"배움이 즐거웠던 때가 있었다, 언젠가","title":"다시 배우고 싶어지는 순간","speaker":"오지훈","speakerBio":"스파르타 튜터, 학습 설계 연구자","scentNote":"배움이 두려운 게 아니라, 틀리는 게 두려웠다. 그 차이를 아는 것만으로 내 공부 방식이 완전히 달라졌다.","recommendFor":["새로운 것을 배우고 싶지만 시작이 두려운 분","공부에 흥미를 잃은 지 오래된 분"],"illustrationUrl":"","categoryKey":"성장"},{"id":"t4-a","timeSlot":4,"date":"4/29","time":"14:10–14:30","category":"커리어","hookLine":"이직을 고민하는 게 아니라 도망치려는 거 아닐까","title":"도망과 선택의 차이","speaker":"한소희","speakerBio":"커리어 컨설턴트, 前 빅테크 PM","scentNote":"세 번 이직하고 나서야 알았다. 첫 번째는 도망이었고, 두 번째는 실험이었고, 세 번째가 비로소 선택이었다는 걸.","recommendFor":["이직을 반복해도 해결이 안 되는 것 같은 분","변화가 두렵지만 머무르는 것도 답답한 분"],"illustrationUrl":"","categoryKey":"커리어"},{"id":"t4-b","timeSlot":4,"date":"4/29","time":"14:10–14:30","category":"일·루틴","hookLine":"바쁜데 왜 아무것도 안 한 것 같지","title":"진짜 바쁨과 가짜 바쁨","speaker":"류재원","speakerBio":"전략기획 팀장, 시간관리 강연자","scentNote":"회의 4개, 슬랙 알림 수십 개, 퇴근 후 녹초. 그런데 정작 중요한 건 하나도 진행되지 않았다. 바쁨이 습관이 됐을 때 일어나는 일.","recommendFor":["늘 바쁜데 성과가 안 나는 느낌인 분","집중력이 예전 같지 않은 분"],"illustrationUrl":"","categoryKey":"일루틴"},{"id":"t4-c","timeSlot":4,"date":"4/29","time":"14:10–14:30","category":"정체성","hookLine":"남들 눈에 좋아 보이는 삶을 살고 있는데 왜 공허하지","title":"조명 밖의 나","speaker":"임채원","speakerBio":"소셜미디어 크리에이터, 전 마케터","scentNote":"좋아요가 쌓일수록 내 안의 목소리는 작아졌다. 외부의 인정이 내 존재 이유가 됐을 때, 아무것도 남지 않았다.","recommendFor":["타인의 시선에 많이 영향받는 분","진짜 나다움이 무엇인지 찾고 싶은 분"],"illustrationUrl":"","categoryKey":"정체성"}];

/* ── 초기화 ──────────────────────────────────────────────── */
async function loadLectures() {
  try {
    state.lectures = LECTURES_DATA;
    renderAll();
  } catch (err) {
    console.error('lectures.json 로드 실패:', err);
  }
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
  const selectedClass = cardState === 'selected' ? ' card--selected' : '';
  const siblingClass  = cardState === 'sibling'  ? ' card--sibling'  : '';
  const imgHtml = lecture.illustrationUrl
    ? `<img class="card__thumb" src="${lecture.illustrationUrl}" alt="${lecture.title}">`
    : `<div class="card__thumb"></div>`;

  return `
    <div class="card${selectedClass}${siblingClass}"
         data-id="${lecture.id}"
         data-slot="${lecture.timeSlot}"
         role="button"
         tabindex="0"
         aria-label="${lecture.title} 강연 상세 보기">
      ${imgHtml}
      <div class="card__check" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </div>
    </div>`;
}

/* ── 렌더링: 바텀시트 ────────────────────────────────────── */
function renderBottomSheet() {
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
          <div class="slot__thumb">${slot}</div>
          <div class="slot__inner">
            <span class="slot__time-label">${slotLabel}</span>
          </div>
        </div>`;
    }
    const lec = getLectureById(selId);
    if (!lec) return '';
    return `
      <div class="slot" data-slot="${slot}">
        <div class="slot__thumb">${slot}</div>
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

  const mod = getCategoryModifier(lec.categoryKey);
  const timeSlot = lec.timeSlot;
  const selectedId = state.selections[timeSlot];
  const isSelected = selectedId === lectureId;
  const hasOtherSelection = selectedId && selectedId !== lectureId;

  let btnClass = 'btn-pick';
  let btnText = '이 강연 담기';
  if (isSelected) {
    btnClass = 'btn-pick btn-pick--selected';
    btnText = '이미 담긴 강연이에요';
  } else if (hasOtherSelection && getSelectedCount() === 4) {
    // 4개 꽉 찬 경우: 같은 타임에 다른 게 담겼으므로 교체 가능하게
    btnClass = 'btn-pick';
    btnText = '이 강연으로 교체하기';
  }

  const recommendItems = lec.recommendFor
    .map((r) => `<li class="modal__recommend-item">${r}</li>`)
    .join('');

  modal.innerHTML = `
    <div class="modal__inner">
      <button class="modal__close" id="modalClose" aria-label="모달 닫기">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <line x1="18" y1="6" x2="6" y2="18" stroke-linecap="round" stroke-linejoin="round"/>
          <line x1="6" y1="6" x2="18" y2="18" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <span class="modal__category modal__category--${mod}">${lec.category}</span>
      <h2 class="modal__title">${lec.title}</h2>
      <p class="modal__scent-note">${lec.scentNote}</p>
      <div class="modal__divider"></div>
      <div class="modal__speaker-row">
        <div class="modal__speaker-info">
          <span class="modal__speaker-name">${lec.speaker}</span>
          <span class="modal__speaker-bio">${lec.speakerBio}</span>
        </div>
      </div>
      <div class="modal__recommend">
        <p class="modal__recommend-label">이런 분께 추천해요</p>
        <ul>${recommendItems}</ul>
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
      <h1 class="recipe-page__title">나의 스바시<br>레시피</h1>
      <p class="recipe-page__subtitle">
        아래 강연으로 신청할게요.<br>
        가장 기대되는 강연을 시그니처로 선택해주세요.
      </p>
      <ul class="recipe-list">${recipeItems}</ul>
      <div class="signature-section">
        <p class="signature-section__label">시그니처 강연</p>
        <select class="signature-select" id="signatureSelect">
          <option value="">가장 기대되는 강연을 골라주세요</option>
          ${signatureOptions}
        </select>
      </div>
    </div>
    <div class="recipe-page__footer">
      <button class="btn-finalize" id="btnFinalize">신청서 제출하기</button>
    </div>`;

  // 이벤트 바인딩 (페이지 내부)
  const signatureSelect = document.getElementById('signatureSelect');
  if (signatureSelect) {
    signatureSelect.addEventListener('change', (e) => {
      state.signature = e.target.value || null;
    });
  }
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
  renderBottomSheet();
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
  // 선택된 카드 엘리먼트 찾기
  const cardEl = document.querySelector(`.card[data-id="${lectureId}"]`);
  const sheetEl = document.getElementById('bottomSheet');
  if (!cardEl || !sheetEl) {
    // 애니메이션 없이 바텀시트만 열기
    openBottomSheet();
    return;
  }

  const cardRect = cardEl.getBoundingClientRect();
  const sheetRect = sheetEl.getBoundingClientRect();

  // 클론 생성
  const clone = cardEl.cloneNode(true);
  clone.style.cssText = `
    position: fixed;
    top: ${cardRect.top}px;
    left: ${cardRect.left}px;
    width: ${cardRect.width}px;
    height: ${cardRect.height}px;
    border-radius: 14px;
    overflow: hidden;
    pointer-events: none;
    z-index: 200;
    margin: 0;
  `;

  // CSS 변수로 목표 위치 설정
  const flyX = sheetRect.left + sheetRect.width / 2 - (cardRect.left + cardRect.width / 2);
  const flyY = sheetRect.top - cardRect.top;
  clone.style.setProperty('--fly-x', `${flyX}px`);
  clone.style.setProperty('--fly-y', `${flyY}px`);

  clone.classList.add('fly-to-sheet');
  document.body.appendChild(clone);

  clone.addEventListener('animationend', () => {
    clone.remove();
    openBottomSheet();
    // 슬롯 pop 애니메이션
    const slot = document.querySelector(`.slot[data-slot="${getLectureById(lectureId)?.timeSlot}"]`);
    if (slot) {
      slot.classList.add('slot--pop');
      slot.addEventListener('animationend', () => slot.classList.remove('slot--pop'), { once: true });
    }
  }, { once: true });
}

/* ── 최종 확인 페이지 열기 ───────────────────────────────── */
function openRecipePage() {
  renderRecipePage();
  const page = document.getElementById('recipePage');
  if (page) page.classList.add('recipe-page--active');
  closeBottomSheet();
}

/* ── 신청서 제출 ─────────────────────────────────────────── */
function handleFinalize() {
  openSignPage();
}

function openSignPage() {
  const page = document.getElementById('signPage');
  if (!page) return;
  page.classList.add('sign-page--active');
  setTimeout(() => {
    document.getElementById('signEmail')?.focus();
  }, 320);
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
      btn.textContent = '...';

      submitWithEmail(email)
        .then(() => {
          document.getElementById('donePage')?.classList.add('done-page--active');
        })
        .catch(() => {
          if (errorEl) errorEl.textContent = '잠시 후 다시 시도해주세요';
          btn.disabled = false;
          btn.textContent = '서명하기';
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
