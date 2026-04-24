/* ============================================================
   스바시 — 배정 결과 페이지
   app.js  |  Vanilla JS ES6+
   ============================================================ */

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxcxi0yqBvYvilnbmg1FDch3PQLgz_V_2bSmDlbEoCuP5cF5RQlH-JXrqMQBLT8u_Ws/exec';

/* ── 구성원 데이터 (신청자만 필터링용) ──────────────────── */
const MEMBERS_DATA=[{n:'이범규',e:'bk.lee@teamsparta.co'},{n:'신지원',e:'jw.shin@teamsparta.co'},{n:'이형은',e:'he.lee@teamsparta.co'},{n:'김정훈',e:'jh.kim@teamsparta.co'},{n:'이동현',e:'dh.lee@teamsparta.co'},{n:'김서영',e:'sy.kim@teamsparta.co'},{n:'김현민',e:'hm.kim@teamsparta.co'},{n:'이창윤',e:'cy.lee@teamsparta.co'},{n:'최상언',e:'se.choi@teamsparta.co'},{n:'송현영',e:'hy.song@teamsparta.co'},{n:'양하은',e:'he.yang@teamsparta.co'},{n:'주은비',e:'eb.ju@teamsparta.co'},{n:'윤지용',e:'jy.yoon@teamsparta.co'},{n:'한현아',e:'ha.han@teamsparta.co'},{n:'이설희',e:'sh.lee@teamsparta.co'},{n:'윤정현',e:'jh.yun@teamsparta.co'},{n:'이다희',e:'dhee.lee@teamsparta.co'},{n:'이상우',e:'sw.lee@teamsparta.co'},{n:'곽진',e:'j.kwak@teamsparta.co'},{n:'이연기',e:'yk.lee@teamsparta.co'},{n:'김정현',e:'jhyeon.kim@teamsparta.co'},{n:'오성택',e:'st.oh@teamsparta.co'},{n:'차은서',e:'es.cha@teamsparta.co'},{n:'신해람',e:'hr.shin@teamsparta.co'},{n:'정유주',e:'yooju.jung@teamsparta.co'},{n:'이은비',e:'eb.lee@teamsparta.co'},{n:'최양임',e:'yy.choi@teamsparta.co'},{n:'이유나',e:'yn.lee@teamsparta.co'},{n:'이정우',e:'jw.lee@teamsparta.co'},{n:'손윤주',e:'yj.son@teamsparta.co'},{n:'허원영',e:'wy.heo@teamsparta.co'},{n:'이진호',e:'jh.lee@teamsparta.co'},{n:'최영준',e:'yj.choi@teamsparta.co'},{n:'채태림',e:'tr.chae@teamsparta.co'},{n:'박응수',e:'es.park@teamsparta.co'},{n:'김예진',e:'yejin.kim@teamsparta.co'},{n:'장여주',e:'yj.jang@teamsparta.co'},{n:'양기철',e:'gc.yang@teamsparta.co'},{n:'문수진',e:'sj.mun@teamsparta.co'},{n:'오유진',e:'yj.oh@teamsparta.co'},{n:'이강욱',e:'kw.lee@teamsparta.co'},{n:'장윤서',e:'ys.jang@teamsparta.co'},{n:'이효성',e:'hs.lee@teamsparta.co'},{n:'장희지',e:'hj.jang@teamsparta.co'},{n:'박혜란',e:'hr.park@teamsparta.co'},{n:'김효진',e:'hyoj.kim@teamsparta.co'},{n:'이정은',e:'jungeun.lee@teamsparta.co'},{n:'홍정기',e:'jk.hong@teamsparta.co'},{n:'최지희',e:'jh.choi@teamsparta.co'},{n:'신승준',e:'sj.shin@teamsparta.co'},{n:'배승아',e:'sa.bae@teamsparta.co'},{n:'노소영',e:'sy.no@teamsparta.co'},{n:'최인서',e:'is.choi@teamsparta.co'},{n:'김지영',e:'jy.kim@teamsparta.co'},{n:'김보경',e:'bk.kim@teamsparta.co'},{n:'이지연',e:'jiyeon.lee@teamsparta.co'},{n:'신종우',e:'jongwoo.shin@teamsparta.co'},{n:'채상엽',e:'sy.chae@teamsparta.co'},{n:'박지희',e:'jh.park@teamsparta.co'},{n:'홍준상',e:'js.hong@teamsparta.co'},{n:'태서경',e:'sk.tae@teamsparta.co'},{n:'장성진',e:'sj.jang@teamsparta.co'},{n:'한효승',e:'hs.han@teamsparta.co'},{n:'왕규원',e:'gw.wang@teamsparta.co'},{n:'방민석',e:'ms.bang@teamsparta.co'},{n:'박지영',e:'jiyoung.park@teamsparta.co'},{n:'황재경',e:'jk.hwang@teamsparta.co'},{n:'한승훈',e:'sh.han@teamsparta.co'},{n:'조수진',e:'sj.jo@teamsparta.co'},{n:'오민규',e:'mg.oh@teamsparta.co'},{n:'김어진',e:'eojin.kim@teamsparta.co'},{n:'최장범',e:'jb.choi@teamsparta.co'},{n:'위유리',e:'yr.wi@teamsparta.co'},{n:'서준택',e:'jt.seo@teamsparta.co'},{n:'김혜성',e:'hs.kim@teamsparta.co'},{n:'김지원',e:'jiwon.kim@teamsparta.co'},{n:'서영욱',e:'yw.seo@teamsparta.co'},{n:'정수정',e:'sj.jung@teamsparta.co'},{n:'조해나',e:'hn.cho@teamsparta.co'},{n:'안지민',e:'jm.an@teamsparta.co'},{n:'이은수',e:'es.lee@teamsparta.co'},{n:'한도윤',e:'dy.han@teamsparta.co'},{n:'홍진우',e:'jw.hong@teamsparta.co'},{n:'정민지',e:'mj.jeong@teamsparta.co'},{n:'신우진',e:'wj.shin@teamsparta.co'},{n:'윤여준',e:'yj.yoon@teamsparta.co'},{n:'배인호',e:'ih.bae@teamsparta.co'},{n:'김민중',e:'mj.kim@teamsparta.co'},{n:'백유진',e:'yj.baek@teamsparta.co'},{n:'장나윤',e:'ny.jang@teamsparta.co'},{n:'안혜경',e:'hk.an@teamsparta.co'},{n:'김지민',e:'jm.kim@teamsparta.co'},{n:'조성민',e:'sm.cho@teamsparta.co'},{n:'최웅준',e:'uj.choe@teamsparta.co'},{n:'단예진',e:'yj.dan@teamsparta.co'},{n:'최슬기',e:'sg.choi@teamsparta.co'},{n:'성윤제',e:'yj.sung@teamsparta.co'},{n:'이어진',e:'ej.lee@teamsparta.co'},{n:'박소희',e:'sohee.park@teamsparta.co'},{n:'류재욱',e:'jw.ryu@teamsparta.co'},{n:'이연수',e:'yeonsu.lee@teamsparta.co'},{n:'김용재',e:'yongjae.kim@teamsparta.co'},{n:'김선훈',e:'sunhoon.kim@teamsparta.co'},{n:'장수미',e:'sm.jang@teamsparta.co'},{n:'강지원',e:'jw.kang@teamsparta.co'},{n:'박상준',e:'sangjun.park@teamsparta.co'},{n:'금민석',e:'ms.keum@teamsparta.co'},{n:'엄형태',e:'ht.eom@teamsparta.co'},{n:'남희주',e:'hj.nam@teamsparta.co'},{n:'허양지',e:'yj.hur@teamsparta.co'},{n:'음준형',e:'jh.eum@teamsparta.co'},{n:'송여해',e:'yh.song@teamsparta.co'},{n:'한진희',e:'jh.han@teamsparta.co'},{n:'김사민',e:'samin.kim@teamsparta.co'},{n:'윤종성',e:'js.yun@teamsparta.co'},{n:'이지연',e:'lee.jy@teamsparta.co'},{n:'홍지혜',e:'jh.hong@teamsparta.co'},{n:'유정선',e:'jeongseon.yu@teamsparta.co'},{n:'박진영',e:'jinyoung.park@teamsparta.co'},{n:'이다은',e:'de.lee@teamsparta.co'},{n:'김동준',e:'dj.kim@teamsparta.co'},{n:'박승현',e:'seunghyun.park@teamsparta.co'},{n:'고은별',e:'eb.ko@teamsparta.co'},{n:'맹루디아',e:'ludia.maeng@teamsparta.co'},{n:'김겸준',e:'kj.kim@teamsparta.co'},{n:'권범준',e:'bj.kwon@teamsparta.co'},{n:'김수용',e:'sooyong.kim@teamsparta.co'},{n:'강형준',e:'hj.kang@teamsparta.co'},{n:'표정훈',e:'jeonghun.pyo@teamsparta.co'},{n:'진수인',e:'si.jin@teamsparta.co'},{n:'변서원',e:'sw.byun@teamsparta.co'},{n:'안수현',e:'sh.an@teamsparta.co'},{n:'임진현',e:'jh.im@teamsparta.co'},{n:'김현지',e:'hyunji.kim@teamsparta.co'},{n:'박민준',e:'mj.park@teamsparta.co'},{n:'박주희',e:'joohee.park@teamsparta.co'},{n:'최윤석',e:'yunseok.choi@teamsparta.co'},{n:'고효준',e:'hyojun.go@teamsparta.co'},{n:'정민호',e:'minho.jeong@teamsparta.co'},{n:'김초희',e:'chohui.kim@teamsparta.co'},{n:'황환서',e:'hwanseo.hwang@teamsparta.co'},{n:'주연진',e:'yeonjin.joo@teamsparta.co'},{n:'이은정',e:'eunjeong.lee@teamsparta.co'},{n:'이주원',e:'juwon.yi@teamsparta.co'},{n:'이종근',e:'jonggeun.lee@teamsparta.co'},{n:'서라은',e:'laeun.seo@teamsparta.co'},{n:'강지은',e:'je.kang@teamsparta.co'},{n:'윤진',e:'j.yoon@teamsparta.co'},{n:'김수영',e:'suyeong.kim@teamsparta.co'},{n:'한다원',e:'dw.han@teamsparta.co'},{n:'김혜민',e:'kim.hm@teamsparta.co'},{n:'윤진호',e:'jinho.yun@teamsparta.co'},{n:'한사랑',e:'sr.han@teamsparta.co'},{n:'최상일',e:'si.choi@teamsparta.co'},{n:'서현',e:'hyun.seo@teamsparta.co'},{n:'이선진',e:'sj.lee@teamsparta.co'},{n:'고우정',e:'uj.ko@teamsparta.co'},{n:'여송희',e:'sh.yeo@teamsparta.co'},{n:'권나현',e:'nh.kwon@teamsparta.co'},{n:'박세리',e:'sr.park@teamsparta.co'},{n:'조경은',e:'ke.jo@teamsparta.co'},{n:'고석환',e:'seokhwan.ko@teamsparta.co'},{n:'정혜인',e:'hi.jeong@teamsparta.co'},{n:'김지민',e:'jimin.kim@teamsparta.co'},{n:'최소연',e:'sy.choi@teamsparta.co'},{n:'황보승',e:'seung.hb@teamsparta.co'},{n:'장재영',e:'jy.jang@teamsparta.co'},{n:'김종진',e:'jj.kim@teamsparta.co'},{n:'김회남',e:'hn.kim@teamsparta.co'},{n:'김기래',e:'gr.kim@teamsparta.co'},{n:'권도현',e:'dh.kwon@teamsparta.co'},{n:'홍규진',e:'kj.hong@teamsparta.co'},{n:'이성종',e:'sungjong.lee@teamsparta.co'},{n:'전병준',e:'bj.jeon@teamsparta.co'},{n:'이승연',e:'seungyeon.lee@teamsparta.co'},{n:'안준걸',e:'jg.ahn@teamsparta.co'},{n:'주예림',e:'yr.ju@teamsparta.co'},{n:'문준호',e:'jh.moon@teamsparta.co'},{n:'임도윤',e:'dy.lim@teamsparta.co'},{n:'전채영',e:'cy.jeon@teamsparta.co'},{n:'이돈성',e:'ds.rhee@teamsparta.co'},{n:'박승완',e:'sw.park@teamsparta.co'},{n:'임현보',e:'hb.lim@teamsparta.co'},{n:'유수은',e:'se.yoo@teamsparta.co'},{n:'최지호',e:'jiho.choi@teamsparta.co'},{n:'유형진',e:'hyeongjin.yoo@teamsparta.co'},{n:'허준영',e:'joonyoung.heo@teamsparta.co'},{n:'박영진',e:'yj.park@teamsparta.co'},{n:'진종범',e:'jb.jin@teamsparta.co'},{n:'김재정',e:'jaejeong.kim@teamsparta.co'},{n:'편서윤',e:'sy.pyun@teamsparta.co'},{n:'나하나',e:'hana.na@teamsparta.co'},{n:'김민정',e:'minjeong.k@teamsparta.co'},{n:'최규홍',e:'gyuhong.choi@teamsparta.co'},{n:'신지아',e:'jiah.shin@teamsparta.co'},{n:'전상민',e:'sangmin.jeon@teamsparta.co'},{n:'김나승',e:'naseung.kim@teamsparta.co'},{n:'차병곤',e:'byunggon.cha@teamsparta.co'},{n:'박현우',e:'hyunwoo.park@teamsparta.co'},{n:'손형민',e:'hyeongmin.son@teamsparta.co'},{n:'임예슬',e:'yeseul.im@teamsparta.co'},{n:'차주원',e:'juwon.cha@teamsparta.co'},{n:'김은중',e:'eunjung.kim@teamsparta.co'},{n:'최정욱',e:'jeonguk.choi@teamsparta.co'}];

/* ── 배정 결과 데이터 (실제 데이터 — 2026-04-23 기준) ── */
const ASSIGNMENTS = {
  'bj.jeon@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'저는 JYP 출신\n개발자입니다.',location:'운동장' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'내 안의 작고 뾰족한 자아를\n다루는 방법',location:'거실' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'삼성, 마이크로소프트\n다 떠나고도 후회 없냐고요?',location:'거실' },
    { date:'4/29',timeSlot:4,time:'14:10',title:'전재산 18만원에서 시작한\n인생 재무제표',location:'창의관' }
  ],
  'bk.kim@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'한 번도 계획대로 온 적 없는\n커리어가 알려준 것',location:'거실' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'이유도 모르고\n작아지고 있다면',location:'창의관' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'입사 한 달,\n아무도 나에게 일을 주지 않았다.',location:'창의관' },
    { date:'4/29',timeSlot:4,time:'14:10',title:'전재산 18만원에서 시작한\n인생 재무제표',location:'창의관' }
  ],
  'byunggon.cha@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'도둑도\n빈손으론 도망 안 칩니다.',location:'창의관' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'내 안의 작고 뾰족한 자아를\n다루는 방법',location:'거실' },
    { date:'4/29',timeSlot:3,time:'13:04',title:'AI로 10분 만에 채용 랜딩을 뽑는\n리크루터가 되기까지',location:'운동장' }
  ],
  'chohui.kim@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'도둑도\n빈손으론 도망 안 칩니다.',location:'창의관' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'이유도 모르고\n작아지고 있다면',location:'창의관' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'삼성, 마이크로소프트\n다 떠나고도 후회 없냐고요?',location:'거실' },
    { date:'4/29',timeSlot:4,time:'13:04',title:'명랑한 오뚜기가 되겠다고\n결심한 이유',location:'거실' }
  ],
  'cy.jeon@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'도둑도\n빈손으론 도망 안 칩니다.',location:'창의관' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'내 안의 작고 뾰족한 자아를\n다루는 방법',location:'거실' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'입사 한 달,\n아무도 나에게 일을 주지 않았다.',location:'창의관' },
    { date:'4/29',timeSlot:4,time:'14:10',title:'전재산 18만원에서 시작한\n인생 재무제표',location:'창의관' }
  ],
  'cy.lee@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'한 번도 계획대로 온 적 없는\n커리어가 알려준 것',location:'거실' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'내 안의 작고 뾰족한 자아를\n다루는 방법',location:'거실' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'입사 한 달,\n아무도 나에게 일을 주지 않았다.',location:'창의관' },
    { date:'4/29',timeSlot:4,time:'14:10',title:'전재산 18만원에서 시작한\n인생 재무제표',location:'창의관' }
  ],
  'dh.lee@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'한 번도 계획대로 온 적 없는\n커리어가 알려준 것',location:'거실' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'삼성, 마이크로소프트\n다 떠나고도 후회 없냐고요?',location:'거실' },
    { date:'4/29',timeSlot:4,time:'14:10',title:'전재산 18만원에서 시작한\n인생 재무제표',location:'창의관' }
  ],
  'dhee.lee@teamsparta.co': [
    { date:'4/29',timeSlot:3,time:'12:37',title:'삼성, 마이크로소프트\n다 떠나고도 후회 없냐고요?',location:'거실' },
    { date:'4/29',timeSlot:4,time:'13:04',title:'명랑한 오뚜기가 되겠다고\n결심한 이유',location:'거실' }
  ],
  'ds.rhee@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'한 번도 계획대로 온 적 없는\n커리어가 알려준 것',location:'거실' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'트렌드에 치이고 AI에 밀리는\n영상PD의 생존일기',location:'운동장' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'삼성, 마이크로소프트\n다 떠나고도 후회 없냐고요?',location:'거실' },
    { date:'4/29',timeSlot:4,time:'14:10',title:'전재산 18만원에서 시작한\n인생 재무제표',location:'창의관' }
  ],
  'dw.han@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'도둑도\n빈손으론 도망 안 칩니다.',location:'창의관' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'트렌드에 치이고 AI에 밀리는\n영상PD의 생존일기',location:'운동장' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'삼성, 마이크로소프트\n다 떠나고도 후회 없냐고요?',location:'거실' },
    { date:'4/29',timeSlot:4,time:'13:04',title:'명랑한 오뚜기가 되겠다고\n결심한 이유',location:'거실' }
  ],
  'dy.han@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'저는 JYP 출신\n개발자입니다.',location:'운동장' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'트렌드에 치이고 AI에 밀리는\n영상PD의 생존일기',location:'운동장' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'입사 한 달,\n아무도 나에게 일을 주지 않았다.',location:'창의관' }
  ],
  'dy.lim@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'도둑도\n빈손으론 도망 안 칩니다.',location:'창의관' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'입사 한 달,\n아무도 나에게 일을 주지 않았다.',location:'창의관' }
  ],
  'eb.ko@teamsparta.co': [
    { date:'4/28',timeSlot:2,time:'13:04',title:'내 안의 작고 뾰족한 자아를\n다루는 방법',location:'거실' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'입사 한 달,\n아무도 나에게 일을 주지 않았다.',location:'창의관' },
    { date:'4/29',timeSlot:4,time:'14:10',title:'전재산 18만원에서 시작한\n인생 재무제표',location:'창의관' }
  ],
  'ej.lee@teamsparta.co': [
    { date:'4/28',timeSlot:2,time:'13:04',title:'이유도 모르고\n작아지고 있다면',location:'창의관' },
    { date:'4/29',timeSlot:3,time:'13:04',title:'AI로 10분 만에 채용 랜딩을 뽑는\n리크루터가 되기까지',location:'운동장' }
  ],
  'es.cha@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'한 번도 계획대로 온 적 없는\n커리어가 알려준 것',location:'거실' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'내 안의 작고 뾰족한 자아를\n다루는 방법',location:'거실' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'삼성, 마이크로소프트\n다 떠나고도 후회 없냐고요?',location:'거실' },
    { date:'4/29',timeSlot:4,time:'13:04',title:'명랑한 오뚜기가 되겠다고\n결심한 이유',location:'거실' }
  ],
  'es.lee@teamsparta.co': [
    { date:'4/28',timeSlot:2,time:'13:04',title:'이유도 모르고\n작아지고 있다면',location:'창의관' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'삼성, 마이크로소프트\n다 떠나고도 후회 없냐고요?',location:'거실' }
  ],
  'es.park@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'도둑도\n빈손으론 도망 안 칩니다.',location:'창의관' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'내 안의 작고 뾰족한 자아를\n다루는 방법',location:'거실' },
    { date:'4/29',timeSlot:3,time:'13:04',title:'AI로 10분 만에 채용 랜딩을 뽑는\n리크루터가 되기까지',location:'운동장' },
    { date:'4/29',timeSlot:4,time:'14:10',title:'전재산 18만원에서 시작한\n인생 재무제표',location:'창의관' }
  ],
  'gc.yang@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'저는 JYP 출신\n개발자입니다.',location:'운동장' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'트렌드에 치이고 AI에 밀리는\n영상PD의 생존일기',location:'운동장' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'삼성, 마이크로소프트\n다 떠나고도 후회 없냐고요?',location:'거실' },
    { date:'4/29',timeSlot:4,time:'14:10',title:'전재산 18만원에서 시작한\n인생 재무제표',location:'창의관' }
  ],
  'gr.kim@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'저는 JYP 출신\n개발자입니다.',location:'운동장' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'이유도 모르고\n작아지고 있다면',location:'창의관' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'삼성, 마이크로소프트\n다 떠나고도 후회 없냐고요?',location:'거실' },
    { date:'4/29',timeSlot:4,time:'13:04',title:'명랑한 오뚜기가 되겠다고\n결심한 이유',location:'거실' }
  ],
  'gw.wang@teamsparta.co': [
    { date:'4/29',timeSlot:4,time:'14:10',title:'전재산 18만원에서 시작한\n인생 재무제표',location:'창의관' }
  ],
  'gyuhong.choi@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'도둑도\n빈손으론 도망 안 칩니다.',location:'창의관' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'트렌드에 치이고 AI에 밀리는\n영상PD의 생존일기',location:'운동장' },
    { date:'4/29',timeSlot:3,time:'13:04',title:'AI로 10분 만에 채용 랜딩을 뽑는\n리크루터가 되기까지',location:'운동장' },
    { date:'4/29',timeSlot:4,time:'14:10',title:'전재산 18만원에서 시작한\n인생 재무제표',location:'창의관' }
  ],
  'hb.lim@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'한 번도 계획대로 온 적 없는\n커리어가 알려준 것',location:'거실' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'내 안의 작고 뾰족한 자아를\n다루는 방법',location:'거실' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'입사 한 달,\n아무도 나에게 일을 주지 않았다.',location:'창의관' }
  ],
  'he.yang@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'한 번도 계획대로 온 적 없는\n커리어가 알려준 것',location:'거실' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'삼성, 마이크로소프트\n다 떠나고도 후회 없냐고요?',location:'거실' }
  ],
  'hi.jeong@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'한 번도 계획대로 온 적 없는\n커리어가 알려준 것',location:'거실' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'이유도 모르고\n작아지고 있다면',location:'창의관' },
    { date:'4/29',timeSlot:3,time:'13:04',title:'AI로 10분 만에 채용 랜딩을 뽑는\n리크루터가 되기까지',location:'운동장' },
    { date:'4/29',timeSlot:4,time:'14:10',title:'전재산 18만원에서 시작한\n인생 재무제표',location:'창의관' }
  ],
  'hj.jang@teamsparta.co': [
    { date:'4/28',timeSlot:2,time:'13:04',title:'내 안의 작고 뾰족한 자아를\n다루는 방법',location:'거실' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'입사 한 달,\n아무도 나에게 일을 주지 않았다.',location:'창의관' }
  ],
  'hj.kang@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'도둑도\n빈손으론 도망 안 칩니다.',location:'창의관' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'트렌드에 치이고 AI에 밀리는\n영상PD의 생존일기',location:'운동장' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'삼성, 마이크로소프트\n다 떠나고도 후회 없냐고요?',location:'거실' },
    { date:'4/29',timeSlot:4,time:'14:10',title:'전재산 18만원에서 시작한\n인생 재무제표',location:'창의관' }
  ],
  'hk.an@teamsparta.co': [
    { date:'4/28',timeSlot:2,time:'13:04',title:'이유도 모르고\n작아지고 있다면',location:'창의관' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'삼성, 마이크로소프트\n다 떠나고도 후회 없냐고요?',location:'거실' }
  ],
  'hm.kim@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'한 번도 계획대로 온 적 없는\n커리어가 알려준 것',location:'거실' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'이유도 모르고\n작아지고 있다면',location:'창의관' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'삼성, 마이크로소프트\n다 떠나고도 후회 없냐고요?',location:'거실' },
    { date:'4/29',timeSlot:4,time:'14:10',title:'전재산 18만원에서 시작한\n인생 재무제표',location:'창의관' }
  ],
  'hn.cho@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'도둑도\n빈손으론 도망 안 칩니다.',location:'창의관' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'트렌드에 치이고 AI에 밀리는\n영상PD의 생존일기',location:'운동장' },
    { date:'4/29',timeSlot:3,time:'13:04',title:'AI로 10분 만에 채용 랜딩을 뽑는\n리크루터가 되기까지',location:'운동장' }
  ],
  'hn.kim@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'도둑도\n빈손으론 도망 안 칩니다.',location:'창의관' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'내 안의 작고 뾰족한 자아를\n다루는 방법',location:'거실' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'삼성, 마이크로소프트\n다 떠나고도 후회 없냐고요?',location:'거실' }
  ],
  'hr.park@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'저는 JYP 출신\n개발자입니다.',location:'운동장' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'내 안의 작고 뾰족한 자아를\n다루는 방법',location:'거실' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'입사 한 달,\n아무도 나에게 일을 주지 않았다.',location:'창의관' },
    { date:'4/29',timeSlot:4,time:'14:10',title:'전재산 18만원에서 시작한\n인생 재무제표',location:'창의관' }
  ],
  'hs.han@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'도둑도\n빈손으론 도망 안 칩니다.',location:'창의관' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'트렌드에 치이고 AI에 밀리는\n영상PD의 생존일기',location:'운동장' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'입사 한 달,\n아무도 나에게 일을 주지 않았다.',location:'창의관' },
    { date:'4/29',timeSlot:4,time:'14:10',title:'전재산 18만원에서 시작한\n인생 재무제표',location:'창의관' }
  ],
  'hs.kim@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'저는 JYP 출신\n개발자입니다.',location:'운동장' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'이유도 모르고\n작아지고 있다면',location:'창의관' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'삼성, 마이크로소프트\n다 떠나고도 후회 없냐고요?',location:'거실' },
    { date:'4/29',timeSlot:4,time:'13:04',title:'명랑한 오뚜기가 되겠다고\n결심한 이유',location:'거실' }
  ],
  'hwanseo.hwang@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'도둑도\n빈손으론 도망 안 칩니다.',location:'창의관' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'내 안의 작고 뾰족한 자아를\n다루는 방법',location:'거실' },
    { date:'4/29',timeSlot:3,time:'13:04',title:'AI로 10분 만에 채용 랜딩을 뽑는\n리크루터가 되기까지',location:'운동장' },
    { date:'4/29',timeSlot:4,time:'13:04',title:'명랑한 오뚜기가 되겠다고\n결심한 이유',location:'거실' }
  ],
  'hy.song@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'한 번도 계획대로 온 적 없는\n커리어가 알려준 것',location:'거실' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'이유도 모르고\n작아지고 있다면',location:'창의관' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'삼성, 마이크로소프트\n다 떠나고도 후회 없냐고요?',location:'거실' },
    { date:'4/29',timeSlot:4,time:'14:10',title:'전재산 18만원에서 시작한\n인생 재무제표',location:'창의관' }
  ],
  'hyeongjin.yoo@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'도둑도\n빈손으론 도망 안 칩니다.',location:'창의관' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'트렌드에 치이고 AI에 밀리는\n영상PD의 생존일기',location:'운동장' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'입사 한 달,\n아무도 나에게 일을 주지 않았다.',location:'창의관' },
    { date:'4/29',timeSlot:4,time:'14:10',title:'전재산 18만원에서 시작한\n인생 재무제표',location:'창의관' }
  ],
  'hyojun.go@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'도둑도\n빈손으론 도망 안 칩니다.',location:'창의관' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'내 안의 작고 뾰족한 자아를\n다루는 방법',location:'거실' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'삼성, 마이크로소프트\n다 떠나고도 후회 없냐고요?',location:'거실' },
    { date:'4/29',timeSlot:4,time:'13:04',title:'명랑한 오뚜기가 되겠다고\n결심한 이유',location:'거실' }
  ],
  'hyun.seo@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'저는 JYP 출신\n개발자입니다.',location:'운동장' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'트렌드에 치이고 AI에 밀리는\n영상PD의 생존일기',location:'운동장' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'입사 한 달,\n아무도 나에게 일을 주지 않았다.',location:'창의관' },
    { date:'4/29',timeSlot:4,time:'13:04',title:'명랑한 오뚜기가 되겠다고\n결심한 이유',location:'거실' }
  ],
  'hyunji.kim@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'도둑도\n빈손으론 도망 안 칩니다.',location:'창의관' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'이유도 모르고\n작아지고 있다면',location:'창의관' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'삼성, 마이크로소프트\n다 떠나고도 후회 없냐고요?',location:'거실' },
    { date:'4/29',timeSlot:4,time:'14:10',title:'전재산 18만원에서 시작한\n인생 재무제표',location:'창의관' }
  ],
  'is.choi@teamsparta.co': [
    { date:'4/29',timeSlot:4,time:'13:04',title:'명랑한 오뚜기가 되겠다고\n결심한 이유',location:'거실' }
  ],
  'j.kwak@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'한 번도 계획대로 온 적 없는\n커리어가 알려준 것',location:'거실' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'내 안의 작고 뾰족한 자아를\n다루는 방법',location:'거실' },
    { date:'4/29',timeSlot:3,time:'13:04',title:'AI로 10분 만에 채용 랜딩을 뽑는\n리크루터가 되기까지',location:'운동장' },
    { date:'4/29',timeSlot:4,time:'13:04',title:'명랑한 오뚜기가 되겠다고\n결심한 이유',location:'거실' }
  ],
  'j.yoon@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'한 번도 계획대로 온 적 없는\n커리어가 알려준 것',location:'거실' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'내 안의 작고 뾰족한 자아를\n다루는 방법',location:'거실' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'삼성, 마이크로소프트\n다 떠나고도 후회 없냐고요?',location:'거실' },
    { date:'4/29',timeSlot:4,time:'13:04',title:'명랑한 오뚜기가 되겠다고\n결심한 이유',location:'거실' }
  ],
  'jaejeong.kim@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'한 번도 계획대로 온 적 없는\n커리어가 알려준 것',location:'거실' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'이유도 모르고\n작아지고 있다면',location:'창의관' },
    { date:'4/29',timeSlot:3,time:'13:04',title:'AI로 10분 만에 채용 랜딩을 뽑는\n리크루터가 되기까지',location:'운동장' }
  ],
  'jb.choi@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'도둑도\n빈손으론 도망 안 칩니다.',location:'창의관' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'트렌드에 치이고 AI에 밀리는\n영상PD의 생존일기',location:'운동장' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'삼성, 마이크로소프트\n다 떠나고도 후회 없냐고요?',location:'거실' },
    { date:'4/29',timeSlot:4,time:'13:04',title:'명랑한 오뚜기가 되겠다고\n결심한 이유',location:'거실' }
  ],
  'jb.jin@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'한 번도 계획대로 온 적 없는\n커리어가 알려준 것',location:'거실' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'이유도 모르고\n작아지고 있다면',location:'창의관' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'입사 한 달,\n아무도 나에게 일을 주지 않았다.',location:'창의관' },
    { date:'4/29',timeSlot:4,time:'14:10',title:'전재산 18만원에서 시작한\n인생 재무제표',location:'창의관' }
  ],
  'je.kang@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'한 번도 계획대로 온 적 없는\n커리어가 알려준 것',location:'거실' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'내 안의 작고 뾰족한 자아를\n다루는 방법',location:'거실' },
    { date:'4/29',timeSlot:3,time:'13:04',title:'AI로 10분 만에 채용 랜딩을 뽑는\n리크루터가 되기까지',location:'운동장' },
    { date:'4/29',timeSlot:4,time:'13:04',title:'명랑한 오뚜기가 되겠다고\n결심한 이유',location:'거실' }
  ],
  'jeongseon.yu@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'한 번도 계획대로 온 적 없는\n커리어가 알려준 것',location:'거실' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'트렌드에 치이고 AI에 밀리는\n영상PD의 생존일기',location:'운동장' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'입사 한 달,\n아무도 나에게 일을 주지 않았다.',location:'창의관' },
    { date:'4/29',timeSlot:4,time:'13:04',title:'명랑한 오뚜기가 되겠다고\n결심한 이유',location:'거실' }
  ],
  'jh.choi@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'도둑도\n빈손으론 도망 안 칩니다.',location:'창의관' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'내 안의 작고 뾰족한 자아를\n다루는 방법',location:'거실' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'삼성, 마이크로소프트\n다 떠나고도 후회 없냐고요?',location:'거실' },
    { date:'4/29',timeSlot:4,time:'13:04',title:'명랑한 오뚜기가 되겠다고\n결심한 이유',location:'거실' }
  ],
  'jh.han@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'도둑도\n빈손으론 도망 안 칩니다.',location:'창의관' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'내 안의 작고 뾰족한 자아를\n다루는 방법',location:'거실' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'입사 한 달,\n아무도 나에게 일을 주지 않았다.',location:'창의관' },
    { date:'4/29',timeSlot:4,time:'14:10',title:'전재산 18만원에서 시작한\n인생 재무제표',location:'창의관' }
  ],
  'jh.hong@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'한 번도 계획대로 온 적 없는\n커리어가 알려준 것',location:'거실' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'이유도 모르고\n작아지고 있다면',location:'창의관' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'삼성, 마이크로소프트\n다 떠나고도 후회 없냐고요?',location:'거실' },
    { date:'4/29',timeSlot:4,time:'13:04',title:'명랑한 오뚜기가 되겠다고\n결심한 이유',location:'거실' }
  ],
  'jh.moon@teamsparta.co': [
    { date:'4/28',timeSlot:2,time:'13:04',title:'이유도 모르고\n작아지고 있다면',location:'창의관' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'삼성, 마이크로소프트\n다 떠나고도 후회 없냐고요?',location:'거실' },
    { date:'4/29',timeSlot:4,time:'13:04',title:'명랑한 오뚜기가 되겠다고\n결심한 이유',location:'거실' }
  ],
  'jh.park@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'도둑도\n빈손으론 도망 안 칩니다.',location:'창의관' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'내 안의 작고 뾰족한 자아를\n다루는 방법',location:'거실' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'삼성, 마이크로소프트\n다 떠나고도 후회 없냐고요?',location:'거실' },
    { date:'4/29',timeSlot:4,time:'13:04',title:'명랑한 오뚜기가 되겠다고\n결심한 이유',location:'거실' }
  ],
  'jh.yun@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'저는 JYP 출신\n개발자입니다.',location:'운동장' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'내 안의 작고 뾰족한 자아를\n다루는 방법',location:'거실' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'입사 한 달,\n아무도 나에게 일을 주지 않았다.',location:'창의관' },
    { date:'4/29',timeSlot:4,time:'13:04',title:'명랑한 오뚜기가 되겠다고\n결심한 이유',location:'거실' }
  ],
  'jhyeon.kim@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'저는 JYP 출신\n개발자입니다.',location:'운동장' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'트렌드에 치이고 AI에 밀리는\n영상PD의 생존일기',location:'운동장' },
    { date:'4/29',timeSlot:3,time:'13:04',title:'AI로 10분 만에 채용 랜딩을 뽑는\n리크루터가 되기까지',location:'운동장' },
    { date:'4/29',timeSlot:4,time:'14:10',title:'전재산 18만원에서 시작한\n인생 재무제표',location:'창의관' }
  ],
  'jiah.shin@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'한 번도 계획대로 온 적 없는\n커리어가 알려준 것',location:'거실' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'내 안의 작고 뾰족한 자아를\n다루는 방법',location:'거실' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'입사 한 달,\n아무도 나에게 일을 주지 않았다.',location:'창의관' },
    { date:'4/29',timeSlot:4,time:'13:04',title:'명랑한 오뚜기가 되겠다고\n결심한 이유',location:'거실' }
  ],
  'jiho.choi@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'저는 JYP 출신\n개발자입니다.',location:'운동장' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'이유도 모르고\n작아지고 있다면',location:'창의관' }
  ],
  'jimin.kim@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'저는 JYP 출신\n개발자입니다.',location:'운동장' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'이유도 모르고\n작아지고 있다면',location:'창의관' },
    { date:'4/29',timeSlot:3,time:'13:04',title:'AI로 10분 만에 채용 랜딩을 뽑는\n리크루터가 되기까지',location:'운동장' }
  ],
  'jinho.yun@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'한 번도 계획대로 온 적 없는\n커리어가 알려준 것',location:'거실' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'이유도 모르고\n작아지고 있다면',location:'창의관' },
    { date:'4/29',timeSlot:3,time:'13:04',title:'AI로 10분 만에 채용 랜딩을 뽑는\n리크루터가 되기까지',location:'운동장' },
    { date:'4/29',timeSlot:4,time:'13:04',title:'명랑한 오뚜기가 되겠다고\n결심한 이유',location:'거실' }
  ],
  'jinyoung.park@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'한 번도 계획대로 온 적 없는\n커리어가 알려준 것',location:'거실' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'이유도 모르고\n작아지고 있다면',location:'창의관' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'삼성, 마이크로소프트\n다 떠나고도 후회 없냐고요?',location:'거실' },
    { date:'4/29',timeSlot:4,time:'14:10',title:'전재산 18만원에서 시작한\n인생 재무제표',location:'창의관' }
  ],
  'jiwon.kim@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'도둑도\n빈손으론 도망 안 칩니다.',location:'창의관' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'이유도 모르고\n작아지고 있다면',location:'창의관' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'입사 한 달,\n아무도 나에게 일을 주지 않았다.',location:'창의관' },
    { date:'4/29',timeSlot:4,time:'14:10',title:'전재산 18만원에서 시작한\n인생 재무제표',location:'창의관' }
  ],
  'jk.hwang@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'도둑도\n빈손으론 도망 안 칩니다.',location:'창의관' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'이유도 모르고\n작아지고 있다면',location:'창의관' },
    { date:'4/29',timeSlot:3,time:'13:04',title:'AI로 10분 만에 채용 랜딩을 뽑는\n리크루터가 되기까지',location:'운동장' }
  ],
  'jm.an@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'한 번도 계획대로 온 적 없는\n커리어가 알려준 것',location:'거실' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'트렌드에 치이고 AI에 밀리는\n영상PD의 생존일기',location:'운동장' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'입사 한 달,\n아무도 나에게 일을 주지 않았다.',location:'창의관' },
    { date:'4/29',timeSlot:4,time:'13:04',title:'명랑한 오뚜기가 되겠다고\n결심한 이유',location:'거실' }
  ],
  'jm.kim@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'도둑도\n빈손으론 도망 안 칩니다.',location:'창의관' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'트렌드에 치이고 AI에 밀리는\n영상PD의 생존일기',location:'운동장' },
    { date:'4/29',timeSlot:3,time:'13:04',title:'AI로 10분 만에 채용 랜딩을 뽑는\n리크루터가 되기까지',location:'운동장' }
  ],
  'jongwoo.shin@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'한 번도 계획대로 온 적 없는\n커리어가 알려준 것',location:'거실' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'내 안의 작고 뾰족한 자아를\n다루는 방법',location:'거실' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'입사 한 달,\n아무도 나에게 일을 주지 않았다.',location:'창의관' },
    { date:'4/29',timeSlot:4,time:'13:04',title:'명랑한 오뚜기가 되겠다고\n결심한 이유',location:'거실' }
  ],
  'joohee.park@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'저는 JYP 출신\n개발자입니다.',location:'운동장' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'트렌드에 치이고 AI에 밀리는\n영상PD의 생존일기',location:'운동장' },
    { date:'4/29',timeSlot:3,time:'13:04',title:'AI로 10분 만에 채용 랜딩을 뽑는\n리크루터가 되기까지',location:'운동장' }
  ],
  'joonyoung.heo@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'저는 JYP 출신\n개발자입니다.',location:'운동장' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'이유도 모르고\n작아지고 있다면',location:'창의관' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'입사 한 달,\n아무도 나에게 일을 주지 않았다.',location:'창의관' }
  ],
  'js.hong@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'한 번도 계획대로 온 적 없는\n커리어가 알려준 것',location:'거실' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'내 안의 작고 뾰족한 자아를\n다루는 방법',location:'거실' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'입사 한 달,\n아무도 나에게 일을 주지 않았다.',location:'창의관' },
    { date:'4/29',timeSlot:4,time:'13:04',title:'명랑한 오뚜기가 되겠다고\n결심한 이유',location:'거실' }
  ],
  'js.yun@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'도둑도\n빈손으론 도망 안 칩니다.',location:'창의관' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'내 안의 작고 뾰족한 자아를\n다루는 방법',location:'거실' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'삼성, 마이크로소프트\n다 떠나고도 후회 없냐고요?',location:'거실' },
    { date:'4/29',timeSlot:4,time:'14:10',title:'전재산 18만원에서 시작한\n인생 재무제표',location:'창의관' }
  ],
  'jt.seo@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'저는 JYP 출신\n개발자입니다.',location:'운동장' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'내 안의 작고 뾰족한 자아를\n다루는 방법',location:'거실' }
  ],
  'jungeun.lee@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'저는 JYP 출신\n개발자입니다.',location:'운동장' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'이유도 모르고\n작아지고 있다면',location:'창의관' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'입사 한 달,\n아무도 나에게 일을 주지 않았다.',location:'창의관' },
    { date:'4/29',timeSlot:4,time:'13:04',title:'명랑한 오뚜기가 되겠다고\n결심한 이유',location:'거실' }
  ],
  'juwon.yi@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'한 번도 계획대로 온 적 없는\n커리어가 알려준 것',location:'거실' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'내 안의 작고 뾰족한 자아를\n다루는 방법',location:'거실' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'삼성, 마이크로소프트\n다 떠나고도 후회 없냐고요?',location:'거실' },
    { date:'4/29',timeSlot:4,time:'13:04',title:'명랑한 오뚜기가 되겠다고\n결심한 이유',location:'거실' }
  ],
  'jw.hong@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'한 번도 계획대로 온 적 없는\n커리어가 알려준 것',location:'거실' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'내 안의 작고 뾰족한 자아를\n다루는 방법',location:'거실' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'삼성, 마이크로소프트\n다 떠나고도 후회 없냐고요?',location:'거실' },
    { date:'4/29',timeSlot:4,time:'14:10',title:'전재산 18만원에서 시작한\n인생 재무제표',location:'창의관' }
  ],
  'jw.kang@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'도둑도\n빈손으론 도망 안 칩니다.',location:'창의관' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'내 안의 작고 뾰족한 자아를\n다루는 방법',location:'거실' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'입사 한 달,\n아무도 나에게 일을 주지 않았다.',location:'창의관' },
    { date:'4/29',timeSlot:4,time:'14:10',title:'전재산 18만원에서 시작한\n인생 재무제표',location:'창의관' }
  ],
  'jw.lee@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'도둑도\n빈손으론 도망 안 칩니다.',location:'창의관' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'이유도 모르고\n작아지고 있다면',location:'창의관' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'입사 한 달,\n아무도 나에게 일을 주지 않았다.',location:'창의관' },
    { date:'4/29',timeSlot:4,time:'14:10',title:'전재산 18만원에서 시작한\n인생 재무제표',location:'창의관' }
  ],
  'jw.shin@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'한 번도 계획대로 온 적 없는\n커리어가 알려준 것',location:'거실' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'내 안의 작고 뾰족한 자아를\n다루는 방법',location:'거실' },
    { date:'4/29',timeSlot:3,time:'13:04',title:'AI로 10분 만에 채용 랜딩을 뽑는\n리크루터가 되기까지',location:'운동장' },
    { date:'4/29',timeSlot:4,time:'13:04',title:'명랑한 오뚜기가 되겠다고\n결심한 이유',location:'거실' }
  ],
  'jy.jang@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'도둑도\n빈손으론 도망 안 칩니다.',location:'창의관' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'내 안의 작고 뾰족한 자아를\n다루는 방법',location:'거실' },
    { date:'4/29',timeSlot:3,time:'13:04',title:'AI로 10분 만에 채용 랜딩을 뽑는\n리크루터가 되기까지',location:'운동장' }
  ],
  'jy.kim@teamsparta.co': [
    { date:'4/29',timeSlot:4,time:'14:10',title:'전재산 18만원에서 시작한\n인생 재무제표',location:'창의관' }
  ],
  'jy.yoon@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'도둑도\n빈손으론 도망 안 칩니다.',location:'창의관' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'입사 한 달,\n아무도 나에게 일을 주지 않았다.',location:'창의관' },
    { date:'4/29',timeSlot:4,time:'14:10',title:'전재산 18만원에서 시작한\n인생 재무제표',location:'창의관' }
  ],
  'kim.hm@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'한 번도 계획대로 온 적 없는\n커리어가 알려준 것',location:'거실' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'트렌드에 치이고 AI에 밀리는\n영상PD의 생존일기',location:'운동장' },
    { date:'4/29',timeSlot:3,time:'13:04',title:'AI로 10분 만에 채용 랜딩을 뽑는\n리크루터가 되기까지',location:'운동장' },
    { date:'4/29',timeSlot:4,time:'14:10',title:'전재산 18만원에서 시작한\n인생 재무제표',location:'창의관' }
  ],
  'kj.hong@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'저는 JYP 출신\n개발자입니다.',location:'운동장' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'트렌드에 치이고 AI에 밀리는\n영상PD의 생존일기',location:'운동장' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'삼성, 마이크로소프트\n다 떠나고도 후회 없냐고요?',location:'거실' },
    { date:'4/29',timeSlot:4,time:'13:04',title:'명랑한 오뚜기가 되겠다고\n결심한 이유',location:'거실' }
  ],
  'kw.lee@teamsparta.co': [
    { date:'4/29',timeSlot:3,time:'12:37',title:'삼성, 마이크로소프트\n다 떠나고도 후회 없냐고요?',location:'거실' },
    { date:'4/29',timeSlot:4,time:'14:10',title:'전재산 18만원에서 시작한\n인생 재무제표',location:'창의관' }
  ],
  'lee.jy@teamsparta.co': [
    { date:'4/28',timeSlot:2,time:'13:04',title:'내 안의 작고 뾰족한 자아를\n다루는 방법',location:'거실' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'입사 한 달,\n아무도 나에게 일을 주지 않았다.',location:'창의관' },
    { date:'4/29',timeSlot:4,time:'13:04',title:'명랑한 오뚜기가 되겠다고\n결심한 이유',location:'거실' }
  ],
  'ludia.maeng@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'한 번도 계획대로 온 적 없는\n커리어가 알려준 것',location:'거실' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'트렌드에 치이고 AI에 밀리는\n영상PD의 생존일기',location:'운동장' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'입사 한 달,\n아무도 나에게 일을 주지 않았다.',location:'창의관' },
    { date:'4/29',timeSlot:4,time:'13:04',title:'명랑한 오뚜기가 되겠다고\n결심한 이유',location:'거실' }
  ],
  'mg.oh@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'저는 JYP 출신\n개발자입니다.',location:'운동장' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'내 안의 작고 뾰족한 자아를\n다루는 방법',location:'거실' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'입사 한 달,\n아무도 나에게 일을 주지 않았다.',location:'창의관' },
    { date:'4/29',timeSlot:4,time:'14:10',title:'전재산 18만원에서 시작한\n인생 재무제표',location:'창의관' }
  ],
  'minho.jeong@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'한 번도 계획대로 온 적 없는\n커리어가 알려준 것',location:'거실' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'내 안의 작고 뾰족한 자아를\n다루는 방법',location:'거실' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'입사 한 달,\n아무도 나에게 일을 주지 않았다.',location:'창의관' },
    { date:'4/29',timeSlot:4,time:'13:04',title:'명랑한 오뚜기가 되겠다고\n결심한 이유',location:'거실' }
  ],
  'minjeong.k@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'한 번도 계획대로 온 적 없는\n커리어가 알려준 것',location:'거실' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'트렌드에 치이고 AI에 밀리는\n영상PD의 생존일기',location:'운동장' }
  ],
  'mj.jeong@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'저는 JYP 출신\n개발자입니다.',location:'운동장' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'트렌드에 치이고 AI에 밀리는\n영상PD의 생존일기',location:'운동장' }
  ],
  'mj.kim@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'저는 JYP 출신\n개발자입니다.',location:'운동장' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'트렌드에 치이고 AI에 밀리는\n영상PD의 생존일기',location:'운동장' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'입사 한 달,\n아무도 나에게 일을 주지 않았다.',location:'창의관' },
    { date:'4/29',timeSlot:4,time:'14:10',title:'전재산 18만원에서 시작한\n인생 재무제표',location:'창의관' }
  ],
  'ms.bang@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'도둑도\n빈손으론 도망 안 칩니다.',location:'창의관' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'삼성, 마이크로소프트\n다 떠나고도 후회 없냐고요?',location:'거실' },
    { date:'4/29',timeSlot:4,time:'14:10',title:'전재산 18만원에서 시작한\n인생 재무제표',location:'창의관' }
  ],
  'ms.keum@teamsparta.co': [
    { date:'4/28',timeSlot:2,time:'13:04',title:'이유도 모르고\n작아지고 있다면',location:'창의관' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'삼성, 마이크로소프트\n다 떠나고도 후회 없냐고요?',location:'거실' }
  ],
  'naseung.kim@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'한 번도 계획대로 온 적 없는\n커리어가 알려준 것',location:'거실' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'이유도 모르고\n작아지고 있다면',location:'창의관' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'삼성, 마이크로소프트\n다 떠나고도 후회 없냐고요?',location:'거실' },
    { date:'4/29',timeSlot:4,time:'14:10',title:'전재산 18만원에서 시작한\n인생 재무제표',location:'창의관' }
  ],
  'sa.bae@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'저는 JYP 출신\n개발자입니다.',location:'운동장' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'내 안의 작고 뾰족한 자아를\n다루는 방법',location:'거실' },
    { date:'4/29',timeSlot:4,time:'14:10',title:'전재산 18만원에서 시작한\n인생 재무제표',location:'창의관' }
  ],
  'samin.kim@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'한 번도 계획대로 온 적 없는\n커리어가 알려준 것',location:'거실' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'트렌드에 치이고 AI에 밀리는\n영상PD의 생존일기',location:'운동장' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'삼성, 마이크로소프트\n다 떠나고도 후회 없냐고요?',location:'거실' },
    { date:'4/29',timeSlot:4,time:'13:04',title:'명랑한 오뚜기가 되겠다고\n결심한 이유',location:'거실' }
  ],
  'sangjun.park@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'한 번도 계획대로 온 적 없는\n커리어가 알려준 것',location:'거실' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'트렌드에 치이고 AI에 밀리는\n영상PD의 생존일기',location:'운동장' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'입사 한 달,\n아무도 나에게 일을 주지 않았다.',location:'창의관' }
  ],
  'sangmin.jeon@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'도둑도\n빈손으론 도망 안 칩니다.',location:'창의관' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'트렌드에 치이고 AI에 밀리는\n영상PD의 생존일기',location:'운동장' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'삼성, 마이크로소프트\n다 떠나고도 후회 없냐고요?',location:'거실' },
    { date:'4/29',timeSlot:4,time:'13:04',title:'명랑한 오뚜기가 되겠다고\n결심한 이유',location:'거실' }
  ],
  'se.choi@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'도둑도\n빈손으론 도망 안 칩니다.',location:'창의관' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'내 안의 작고 뾰족한 자아를\n다루는 방법',location:'거실' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'입사 한 달,\n아무도 나에게 일을 주지 않았다.',location:'창의관' },
    { date:'4/29',timeSlot:4,time:'13:04',title:'명랑한 오뚜기가 되겠다고\n결심한 이유',location:'거실' }
  ],
  'se.yoo@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'한 번도 계획대로 온 적 없는\n커리어가 알려준 것',location:'거실' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'내 안의 작고 뾰족한 자아를\n다루는 방법',location:'거실' },
    { date:'4/29',timeSlot:3,time:'13:04',title:'AI로 10분 만에 채용 랜딩을 뽑는\n리크루터가 되기까지',location:'운동장' },
    { date:'4/29',timeSlot:4,time:'13:04',title:'명랑한 오뚜기가 되겠다고\n결심한 이유',location:'거실' }
  ],
  'seokhwan.ko@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'도둑도\n빈손으론 도망 안 칩니다.',location:'창의관' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'삼성, 마이크로소프트\n다 떠나고도 후회 없냐고요?',location:'거실' }
  ],
  'seung.hb@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'도둑도\n빈손으론 도망 안 칩니다.',location:'창의관' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'트렌드에 치이고 AI에 밀리는\n영상PD의 생존일기',location:'운동장' },
    { date:'4/29',timeSlot:3,time:'13:04',title:'AI로 10분 만에 채용 랜딩을 뽑는\n리크루터가 되기까지',location:'운동장' },
    { date:'4/29',timeSlot:4,time:'14:10',title:'전재산 18만원에서 시작한\n인생 재무제표',location:'창의관' }
  ],
  'seungyeon.lee@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'한 번도 계획대로 온 적 없는\n커리어가 알려준 것',location:'거실' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'트렌드에 치이고 AI에 밀리는\n영상PD의 생존일기',location:'운동장' },
    { date:'4/29',timeSlot:4,time:'13:04',title:'명랑한 오뚜기가 되겠다고\n결심한 이유',location:'거실' }
  ],
  'sg.choi@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'한 번도 계획대로 온 적 없는\n커리어가 알려준 것',location:'거실' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'트렌드에 치이고 AI에 밀리는\n영상PD의 생존일기',location:'운동장' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'입사 한 달,\n아무도 나에게 일을 주지 않았다.',location:'창의관' },
    { date:'4/29',timeSlot:4,time:'13:04',title:'명랑한 오뚜기가 되겠다고\n결심한 이유',location:'거실' }
  ],
  'sh.an@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'한 번도 계획대로 온 적 없는\n커리어가 알려준 것',location:'거실' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'내 안의 작고 뾰족한 자아를\n다루는 방법',location:'거실' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'입사 한 달,\n아무도 나에게 일을 주지 않았다.',location:'창의관' },
    { date:'4/29',timeSlot:4,time:'13:04',title:'명랑한 오뚜기가 되겠다고\n결심한 이유',location:'거실' }
  ],
  'sh.han@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'한 번도 계획대로 온 적 없는\n커리어가 알려준 것',location:'거실' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'내 안의 작고 뾰족한 자아를\n다루는 방법',location:'거실' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'삼성, 마이크로소프트\n다 떠나고도 후회 없냐고요?',location:'거실' },
    { date:'4/29',timeSlot:4,time:'13:04',title:'명랑한 오뚜기가 되겠다고\n결심한 이유',location:'거실' }
  ],
  'sh.lee@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'저는 JYP 출신\n개발자입니다.',location:'운동장' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'내 안의 작고 뾰족한 자아를\n다루는 방법',location:'거실' },
    { date:'4/29',timeSlot:3,time:'13:04',title:'AI로 10분 만에 채용 랜딩을 뽑는\n리크루터가 되기까지',location:'운동장' },
    { date:'4/29',timeSlot:4,time:'14:10',title:'전재산 18만원에서 시작한\n인생 재무제표',location:'창의관' }
  ],
  'sh.yeo@teamsparta.co': [
    { date:'4/28',timeSlot:2,time:'13:04',title:'트렌드에 치이고 AI에 밀리는\n영상PD의 생존일기',location:'운동장' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'입사 한 달,\n아무도 나에게 일을 주지 않았다.',location:'창의관' },
    { date:'4/29',timeSlot:4,time:'13:04',title:'명랑한 오뚜기가 되겠다고\n결심한 이유',location:'거실' }
  ],
  'si.choi@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'도둑도\n빈손으론 도망 안 칩니다.',location:'창의관' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'이유도 모르고\n작아지고 있다면',location:'창의관' },
    { date:'4/29',timeSlot:3,time:'13:04',title:'AI로 10분 만에 채용 랜딩을 뽑는\n리크루터가 되기까지',location:'운동장' },
    { date:'4/29',timeSlot:4,time:'13:04',title:'명랑한 오뚜기가 되겠다고\n결심한 이유',location:'거실' }
  ],
  'si.jin@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'한 번도 계획대로 온 적 없는\n커리어가 알려준 것',location:'거실' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'트렌드에 치이고 AI에 밀리는\n영상PD의 생존일기',location:'운동장' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'입사 한 달,\n아무도 나에게 일을 주지 않았다.',location:'창의관' },
    { date:'4/29',timeSlot:4,time:'13:04',title:'명랑한 오뚜기가 되겠다고\n결심한 이유',location:'거실' }
  ],
  'sj.jang@teamsparta.co': [
    { date:'4/28',timeSlot:2,time:'13:04',title:'내 안의 작고 뾰족한 자아를\n다루는 방법',location:'거실' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'입사 한 달,\n아무도 나에게 일을 주지 않았다.',location:'창의관' },
    { date:'4/29',timeSlot:4,time:'13:04',title:'명랑한 오뚜기가 되겠다고\n결심한 이유',location:'거실' }
  ],
  'sj.jo@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'저는 JYP 출신\n개발자입니다.',location:'운동장' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'이유도 모르고\n작아지고 있다면',location:'창의관' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'입사 한 달,\n아무도 나에게 일을 주지 않았다.',location:'창의관' },
    { date:'4/29',timeSlot:4,time:'13:04',title:'명랑한 오뚜기가 되겠다고\n결심한 이유',location:'거실' }
  ],
  'sj.jung@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'도둑도\n빈손으론 도망 안 칩니다.',location:'창의관' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'이유도 모르고\n작아지고 있다면',location:'창의관' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'입사 한 달,\n아무도 나에게 일을 주지 않았다.',location:'창의관' },
    { date:'4/29',timeSlot:4,time:'14:10',title:'전재산 18만원에서 시작한\n인생 재무제표',location:'창의관' }
  ],
  'sj.lee@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'한 번도 계획대로 온 적 없는\n커리어가 알려준 것',location:'거실' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'이유도 모르고\n작아지고 있다면',location:'창의관' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'삼성, 마이크로소프트\n다 떠나고도 후회 없냐고요?',location:'거실' },
    { date:'4/29',timeSlot:4,time:'14:10',title:'전재산 18만원에서 시작한\n인생 재무제표',location:'창의관' }
  ],
  'sj.mun@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'한 번도 계획대로 온 적 없는\n커리어가 알려준 것',location:'거실' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'트렌드에 치이고 AI에 밀리는\n영상PD의 생존일기',location:'운동장' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'입사 한 달,\n아무도 나에게 일을 주지 않았다.',location:'창의관' },
    { date:'4/29',timeSlot:4,time:'13:04',title:'명랑한 오뚜기가 되겠다고\n결심한 이유',location:'거실' }
  ],
  'sj.shin@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'저는 JYP 출신\n개발자입니다.',location:'운동장' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'내 안의 작고 뾰족한 자아를\n다루는 방법',location:'거실' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'삼성, 마이크로소프트\n다 떠나고도 후회 없냐고요?',location:'거실' },
    { date:'4/29',timeSlot:4,time:'14:10',title:'전재산 18만원에서 시작한\n인생 재무제표',location:'창의관' }
  ],
  'sk.tae@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'한 번도 계획대로 온 적 없는\n커리어가 알려준 것',location:'거실' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'내 안의 작고 뾰족한 자아를\n다루는 방법',location:'거실' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'삼성, 마이크로소프트\n다 떠나고도 후회 없냐고요?',location:'거실' },
    { date:'4/29',timeSlot:4,time:'13:04',title:'명랑한 오뚜기가 되겠다고\n결심한 이유',location:'거실' }
  ],
  'sm.cho@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'한 번도 계획대로 온 적 없는\n커리어가 알려준 것',location:'거실' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'이유도 모르고\n작아지고 있다면',location:'창의관' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'입사 한 달,\n아무도 나에게 일을 주지 않았다.',location:'창의관' },
    { date:'4/29',timeSlot:4,time:'13:04',title:'명랑한 오뚜기가 되겠다고\n결심한 이유',location:'거실' }
  ],
  'sm.jang@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'도둑도\n빈손으론 도망 안 칩니다.',location:'창의관' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'내 안의 작고 뾰족한 자아를\n다루는 방법',location:'거실' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'삼성, 마이크로소프트\n다 떠나고도 후회 없냐고요?',location:'거실' },
    { date:'4/29',timeSlot:4,time:'13:04',title:'명랑한 오뚜기가 되겠다고\n결심한 이유',location:'거실' }
  ],
  'sohee.park@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'한 번도 계획대로 온 적 없는\n커리어가 알려준 것',location:'거실' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'트렌드에 치이고 AI에 밀리는\n영상PD의 생존일기',location:'운동장' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'입사 한 달,\n아무도 나에게 일을 주지 않았다.',location:'창의관' },
    { date:'4/29',timeSlot:4,time:'13:04',title:'명랑한 오뚜기가 되겠다고\n결심한 이유',location:'거실' }
  ],
  'sr.han@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'도둑도\n빈손으론 도망 안 칩니다.',location:'창의관' },
    { date:'4/29',timeSlot:3,time:'13:04',title:'AI로 10분 만에 채용 랜딩을 뽑는\n리크루터가 되기까지',location:'운동장' },
    { date:'4/29',timeSlot:4,time:'13:04',title:'명랑한 오뚜기가 되겠다고\n결심한 이유',location:'거실' }
  ],
  'sr.park@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'한 번도 계획대로 온 적 없는\n커리어가 알려준 것',location:'거실' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'이유도 모르고\n작아지고 있다면',location:'창의관' },
    { date:'4/29',timeSlot:3,time:'13:04',title:'AI로 10분 만에 채용 랜딩을 뽑는\n리크루터가 되기까지',location:'운동장' },
    { date:'4/29',timeSlot:4,time:'13:04',title:'명랑한 오뚜기가 되겠다고\n결심한 이유',location:'거실' }
  ],
  'st.oh@teamsparta.co': [
    { date:'4/29',timeSlot:3,time:'12:37',title:'삼성, 마이크로소프트\n다 떠나고도 후회 없냐고요?',location:'거실' }
  ],
  'sungjong.lee@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'저는 JYP 출신\n개발자입니다.',location:'운동장' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'이유도 모르고\n작아지고 있다면',location:'창의관' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'삼성, 마이크로소프트\n다 떠나고도 후회 없냐고요?',location:'거실' }
  ],
  'sunhoon.kim@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'도둑도\n빈손으론 도망 안 칩니다.',location:'창의관' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'트렌드에 치이고 AI에 밀리는\n영상PD의 생존일기',location:'운동장' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'삼성, 마이크로소프트\n다 떠나고도 후회 없냐고요?',location:'거실' }
  ],
  'suyeong.kim@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'한 번도 계획대로 온 적 없는\n커리어가 알려준 것',location:'거실' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'내 안의 작고 뾰족한 자아를\n다루는 방법',location:'거실' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'삼성, 마이크로소프트\n다 떠나고도 후회 없냐고요?',location:'거실' },
    { date:'4/29',timeSlot:4,time:'14:10',title:'전재산 18만원에서 시작한\n인생 재무제표',location:'창의관' }
  ],
  'sw.byun@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'한 번도 계획대로 온 적 없는\n커리어가 알려준 것',location:'거실' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'이유도 모르고\n작아지고 있다면',location:'창의관' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'삼성, 마이크로소프트\n다 떠나고도 후회 없냐고요?',location:'거실' },
    { date:'4/29',timeSlot:4,time:'14:10',title:'전재산 18만원에서 시작한\n인생 재무제표',location:'창의관' }
  ],
  'sw.park@teamsparta.co': [
    { date:'4/29',timeSlot:3,time:'12:37',title:'삼성, 마이크로소프트\n다 떠나고도 후회 없냐고요?',location:'거실' },
    { date:'4/29',timeSlot:4,time:'14:10',title:'전재산 18만원에서 시작한\n인생 재무제표',location:'창의관' }
  ],
  'sy.chae@teamsparta.co': [
    { date:'4/29',timeSlot:3,time:'12:37',title:'삼성, 마이크로소프트\n다 떠나고도 후회 없냐고요?',location:'거실' }
  ],
  'sy.choi@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'저는 JYP 출신\n개발자입니다.',location:'운동장' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'트렌드에 치이고 AI에 밀리는\n영상PD의 생존일기',location:'운동장' },
    { date:'4/29',timeSlot:3,time:'13:04',title:'AI로 10분 만에 채용 랜딩을 뽑는\n리크루터가 되기까지',location:'운동장' },
    { date:'4/29',timeSlot:4,time:'13:04',title:'명랑한 오뚜기가 되겠다고\n결심한 이유',location:'거실' }
  ],
  'sy.kim@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'저는 JYP 출신\n개발자입니다.',location:'운동장' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'트렌드에 치이고 AI에 밀리는\n영상PD의 생존일기',location:'운동장' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'입사 한 달,\n아무도 나에게 일을 주지 않았다.',location:'창의관' }
  ],
  'sy.pyun@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'한 번도 계획대로 온 적 없는\n커리어가 알려준 것',location:'거실' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'이유도 모르고\n작아지고 있다면',location:'창의관' },
    { date:'4/29',timeSlot:3,time:'13:04',title:'AI로 10분 만에 채용 랜딩을 뽑는\n리크루터가 되기까지',location:'운동장' },
    { date:'4/29',timeSlot:4,time:'13:04',title:'명랑한 오뚜기가 되겠다고\n결심한 이유',location:'거실' }
  ],
  'tr.chae@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'저는 JYP 출신\n개발자입니다.',location:'운동장' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'트렌드에 치이고 AI에 밀리는\n영상PD의 생존일기',location:'운동장' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'삼성, 마이크로소프트\n다 떠나고도 후회 없냐고요?',location:'거실' },
    { date:'4/29',timeSlot:4,time:'13:04',title:'명랑한 오뚜기가 되겠다고\n결심한 이유',location:'거실' }
  ],
  'uj.choe@teamsparta.co': [
    { date:'4/29',timeSlot:3,time:'12:37',title:'삼성, 마이크로소프트\n다 떠나고도 후회 없냐고요?',location:'거실' }
  ],
  'uj.ko@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'도둑도\n빈손으론 도망 안 칩니다.',location:'창의관' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'내 안의 작고 뾰족한 자아를\n다루는 방법',location:'거실' },
    { date:'4/29',timeSlot:3,time:'13:04',title:'AI로 10분 만에 채용 랜딩을 뽑는\n리크루터가 되기까지',location:'운동장' },
    { date:'4/29',timeSlot:4,time:'14:10',title:'전재산 18만원에서 시작한\n인생 재무제표',location:'창의관' }
  ],
  'wy.heo@teamsparta.co': [
    { date:'4/29',timeSlot:3,time:'12:37',title:'삼성, 마이크로소프트\n다 떠나고도 후회 없냐고요?',location:'거실' },
    { date:'4/29',timeSlot:4,time:'14:10',title:'전재산 18만원에서 시작한\n인생 재무제표',location:'창의관' }
  ],
  'yejin.kim@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'저는 JYP 출신\n개발자입니다.',location:'운동장' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'내 안의 작고 뾰족한 자아를\n다루는 방법',location:'거실' },
    { date:'4/29',timeSlot:3,time:'13:04',title:'AI로 10분 만에 채용 랜딩을 뽑는\n리크루터가 되기까지',location:'운동장' },
    { date:'4/29',timeSlot:4,time:'13:04',title:'명랑한 오뚜기가 되겠다고\n결심한 이유',location:'거실' }
  ],
  'yeonsu.lee@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'도둑도\n빈손으론 도망 안 칩니다.',location:'창의관' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'내 안의 작고 뾰족한 자아를\n다루는 방법',location:'거실' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'삼성, 마이크로소프트\n다 떠나고도 후회 없냐고요?',location:'거실' },
    { date:'4/29',timeSlot:4,time:'14:10',title:'전재산 18만원에서 시작한\n인생 재무제표',location:'창의관' }
  ],
  'yh.song@teamsparta.co': [
    { date:'4/28',timeSlot:2,time:'13:04',title:'이유도 모르고\n작아지고 있다면',location:'창의관' },
    { date:'4/29',timeSlot:4,time:'14:10',title:'전재산 18만원에서 시작한\n인생 재무제표',location:'창의관' }
  ],
  'yj.baek@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'한 번도 계획대로 온 적 없는\n커리어가 알려준 것',location:'거실' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'내 안의 작고 뾰족한 자아를\n다루는 방법',location:'거실' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'입사 한 달,\n아무도 나에게 일을 주지 않았다.',location:'창의관' },
    { date:'4/29',timeSlot:4,time:'13:04',title:'명랑한 오뚜기가 되겠다고\n결심한 이유',location:'거실' }
  ],
  'yj.choi@teamsparta.co': [
    { date:'4/29',timeSlot:3,time:'12:37',title:'입사 한 달,\n아무도 나에게 일을 주지 않았다.',location:'창의관' }
  ],
  'yj.dan@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'도둑도\n빈손으론 도망 안 칩니다.',location:'창의관' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'내 안의 작고 뾰족한 자아를\n다루는 방법',location:'거실' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'삼성, 마이크로소프트\n다 떠나고도 후회 없냐고요?',location:'거실' },
    { date:'4/29',timeSlot:4,time:'14:10',title:'전재산 18만원에서 시작한\n인생 재무제표',location:'창의관' }
  ],
  'yj.jang@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'저는 JYP 출신\n개발자입니다.',location:'운동장' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'입사 한 달,\n아무도 나에게 일을 주지 않았다.',location:'창의관' },
    { date:'4/29',timeSlot:4,time:'13:04',title:'명랑한 오뚜기가 되겠다고\n결심한 이유',location:'거실' }
  ],
  'yj.jeong@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'한 번도 계획대로 온 적 없는\n커리어가 알려준 것',location:'거실' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'내 안의 작고 뾰족한 자아를\n다루는 방법',location:'거실' }
  ],
  'yj.oh@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'저는 JYP 출신\n개발자입니다.',location:'운동장' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'삼성, 마이크로소프트\n다 떠나고도 후회 없냐고요?',location:'거실' }
  ],
  'yj.sung@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'도둑도\n빈손으론 도망 안 칩니다.',location:'창의관' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'이유도 모르고\n작아지고 있다면',location:'창의관' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'입사 한 달,\n아무도 나에게 일을 주지 않았다.',location:'창의관' }
  ],
  'yj.yoon@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'도둑도\n빈손으론 도망 안 칩니다.',location:'창의관' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'트렌드에 치이고 AI에 밀리는\n영상PD의 생존일기',location:'운동장' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'삼성, 마이크로소프트\n다 떠나고도 후회 없냐고요?',location:'거실' },
    { date:'4/29',timeSlot:4,time:'13:04',title:'명랑한 오뚜기가 되겠다고\n결심한 이유',location:'거실' }
  ],
  'yk.lee@teamsparta.co': [
    { date:'4/29',timeSlot:3,time:'12:37',title:'입사 한 달,\n아무도 나에게 일을 주지 않았다.',location:'창의관' },
    { date:'4/29',timeSlot:4,time:'13:04',title:'명랑한 오뚜기가 되겠다고\n결심한 이유',location:'거실' }
  ],
  'yn.lee@teamsparta.co': [
    { date:'4/28',timeSlot:2,time:'13:04',title:'이유도 모르고\n작아지고 있다면',location:'창의관' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'삼성, 마이크로소프트\n다 떠나고도 후회 없냐고요?',location:'거실' },
    { date:'4/29',timeSlot:4,time:'13:04',title:'명랑한 오뚜기가 되겠다고\n결심한 이유',location:'거실' }
  ],
  'yongjae.kim@teamsparta.co': [
    { date:'4/29',timeSlot:3,time:'12:37',title:'삼성, 마이크로소프트\n다 떠나고도 후회 없냐고요?',location:'거실' }
  ],
  'yooju.jung@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'도둑도\n빈손으론 도망 안 칩니다.',location:'창의관' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'트렌드에 치이고 AI에 밀리는\n영상PD의 생존일기',location:'운동장' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'삼성, 마이크로소프트\n다 떠나고도 후회 없냐고요?',location:'거실' },
    { date:'4/29',timeSlot:4,time:'13:04',title:'명랑한 오뚜기가 되겠다고\n결심한 이유',location:'거실' }
  ],
  'yr.ju@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'저는 JYP 출신\n개발자입니다.',location:'운동장' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'이유도 모르고\n작아지고 있다면',location:'창의관' },
    { date:'4/29',timeSlot:3,time:'13:04',title:'AI로 10분 만에 채용 랜딩을 뽑는\n리크루터가 되기까지',location:'운동장' },
    { date:'4/29',timeSlot:4,time:'13:04',title:'명랑한 오뚜기가 되겠다고\n결심한 이유',location:'거실' }
  ],
  'ys.jang@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'한 번도 계획대로 온 적 없는\n커리어가 알려준 것',location:'거실' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'내 안의 작고 뾰족한 자아를\n다루는 방법',location:'거실' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'입사 한 달,\n아무도 나에게 일을 주지 않았다.',location:'창의관' },
    { date:'4/29',timeSlot:4,time:'13:04',title:'명랑한 오뚜기가 되겠다고\n결심한 이유',location:'거실' }
  ],
  'yy.choi@teamsparta.co': [
    { date:'4/28',timeSlot:1,time:'12:37',title:'저는 JYP 출신\n개발자입니다.',location:'운동장' },
    { date:'4/28',timeSlot:2,time:'13:04',title:'내 안의 작고 뾰족한 자아를\n다루는 방법',location:'거실' },
    { date:'4/29',timeSlot:3,time:'12:37',title:'삼성, 마이크로소프트\n다 떠나고도 후회 없냐고요?',location:'거실' },
    { date:'4/29',timeSlot:4,time:'13:04',title:'명랑한 오뚜기가 되겠다고\n결심한 이유',location:'거실' }
  ],
};



/* ── 유틸 ────────────────────────────────────────────────── */
/* slotLabelMap 제거 — date + time만 표시 */

function getAssignedDates(assignments) {
  const dates = [...new Set(assignments.map(a => a.date))];
  dates.sort();
  if (dates.length === 2) return `4월 28–29일`;
  const d = dates[0];
  const day = d.split('/')[1];
  return `4월 ${day}일`;
}

function getMemberByEmail(email) {
  return MEMBERS_DATA.find(m => m.e.trim() === email.trim());
}

/* ── 조회 로그 (비동기) ─────────────────────────────────── */
function logView(email) {
  try {
    const url = APPS_SCRIPT_URL + '?action=resultLog&email=' + encodeURIComponent(email);
    fetch(url, { mode: 'no-cors' });
  } catch (e) {
    // 로그 실패는 무시
  }
}

/* ── 결과 렌더링 ─────────────────────────────────────────── */
let currentMemberName = '';

function renderResult(email, assignments) {
  const inner = document.getElementById('resultInner');
  if (!inner) return;

  const member = getMemberByEmail(email);
  currentMemberName = member ? member.n : '';
  const username = email.split('@')[0].toUpperCase();
  const dateStr = getAssignedDates(assignments);

  const noteItems = assignments
    .sort((a, b) => a.timeSlot - b.timeSlot)
    .map(a => {
      const titleHtml = a.title.replace(/\n/g, '<br>');
      return `
        <li class="result__note">
          <div class="result__note-left">
            <span class="result__note-location">${a.location}</span>
            <span class="result__note-meta">${a.date} · ${a.time}</span>
          </div>
          <div class="result__note-right">
            <span class="result__note-title">${titleHtml}</span>
          </div>
        </li>`;
    }).join('');

  inner.innerHTML = `
    <p class="result__eyebrow">Scent Confirmed</p>
    <div class="result__caption">
      <span class="result__caption-main">내가 고른 15분이 준비됐어요.</span>
      <span class="result__caption-sub">이번만 만날 수 있는 조합이니, 꼭 만나러 오세요 :)</span>
    </div>
    <div class="result__label-wrap" id="scentNoteCard">
      <div class="result__label">
        <div class="result__label-brand">
          <span class="result__label-brand-name">15min · Svashi</span>
          <span class="result__label-brand-title">My Scent Note</span>
        </div>
        <div class="result__divider">
          <span class="result__divider-ornament">✦</span>
        </div>
        <ul class="result__notes">${noteItems}</ul>
        <div class="result__divider" style="margin-top:16px;margin-bottom:0;">
          <span class="result__divider-ornament">· · ·</span>
        </div>
        <div class="result__label-footer">
          <div class="result__label-owner">
            Composed by
            <span class="result__label-owner-name">${username}</span>
          </div>
          <div class="result__label-batch">
            Batch No. 2026–04<br>
            Svashi Vol. III
          </div>
        </div>
      </div>
    </div>
    <button class="result__download-link" id="downloadBtn">내 노트 저장하기</button>`;

  // 이미지 저장 버튼
  document.getElementById('downloadBtn')?.addEventListener('click', handleDownload);
}

/* ── 이미지 다운로드 (html2canvas) ───────────────────────── */
async function handleDownload() {
  const card = document.getElementById('scentNoteCard');
  if (!card) return;

  const btn = document.getElementById('downloadBtn');
  if (btn) btn.textContent = '저장 준비 중...';

  try {
    await document.fonts.ready;

    // 애니메이션 opacity 제거 — html2canvas가 캡처할 수 있도록
    const animatedEls = card.querySelectorAll('*');
    animatedEls.forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    card.style.opacity = '1';
    card.style.transform = 'none';

    const canvas = await html2canvas(card, {
      backgroundColor: '#FAF7F3',
      scale: 2,
      useCORS: true,
      logging: false,
    });

    const link = document.createElement('a');
    link.download = (currentMemberName || 'my') + '님이 고른 15분.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  } catch (e) {
    console.error('이미지 저장 실패:', e);
  } finally {
    if (btn) btn.textContent = '내 노트 저장하기';
  }
}

/* ── 조회 화면 → 결과 화면 전환 ─────────────────────────── */
function showResult(email) {
  const assignments = ASSIGNMENTS[email];
  if (!assignments) return;

  // URL 파라미터 추가
  const url = new URL(window.location);
  url.searchParams.set('e', email);
  history.replaceState(null, '', url);

  // 조회 로그
  logView(email);

  // 화면 전환
  const lookup = document.getElementById('lookup');
  const result = document.getElementById('result');

  lookup.style.transition = 'opacity 300ms var(--ease-out-smooth)';
  lookup.style.opacity = '0';

  setTimeout(() => {
    lookup.style.display = 'none';
    result.style.display = 'flex';
    renderResult(email, assignments);
  }, 300);
}

/* ── 자동완성 ────────────────────────────────────────────── */
function renderSuggestions(query) {
  const list = document.getElementById('lookupSuggestions');
  const emptyMsg = document.getElementById('lookupEmpty');
  if (!list) return;

  emptyMsg.style.display = 'none';

  if (!query || query.length < 1) {
    list.classList.remove('lookup__suggestions--open');
    list.innerHTML = '';
    return;
  }

  const q = query.toLowerCase();
  // 신청자(ASSIGNMENTS에 있는 사람)만 필터링
  const assignedEmails = new Set(Object.keys(ASSIGNMENTS));
  const filtered = MEMBERS_DATA
    .filter(m => assignedEmails.has(m.e.trim()))
    .filter(m => m.n.toLowerCase().includes(q) || m.e.toLowerCase().includes(q))
    .slice(0, 6);

  if (filtered.length === 0) {
    list.innerHTML = '';
    list.classList.remove('lookup__suggestions--open');
    emptyMsg.style.display = 'block';
    return;
  }

  list.innerHTML = filtered.map(m => `
    <li class="lookup__suggestion" data-email="${m.e.trim()}">
      <span class="lookup__suggestion-name">${m.n}</span>
      <span class="lookup__suggestion-email">${m.e.trim()}</span>
    </li>`).join('');
  list.classList.add('lookup__suggestions--open');
}

/* ── 이벤트 바인딩 ───────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('lookupInput');
  const list = document.getElementById('lookupSuggestions');

  // URL 파라미터로 자동 조회
  const params = new URLSearchParams(window.location.search);
  const emailParam = params.get('e');
  if (emailParam && ASSIGNMENTS[emailParam]) {
    showResult(emailParam);
    return;
  }

  // 입력 이벤트
  input?.addEventListener('input', (e) => {
    renderSuggestions(e.target.value.trim());
  });

  // 드롭다운 선택
  list?.addEventListener('click', (e) => {
    const item = e.target.closest('.lookup__suggestion');
    if (!item) return;
    const email = item.dataset.email;
    if (!email) return;

    input.value = '';
    list.classList.remove('lookup__suggestions--open');
    list.innerHTML = '';

    showResult(email);
  });

  // 바깥 클릭 시 드롭다운 닫기
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.lookup__input-wrap')) {
      list?.classList.remove('lookup__suggestions--open');
    }
  });

  // ESC 키로 드롭다운 닫기
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      list?.classList.remove('lookup__suggestions--open');
    }
  });

  // 포커스
  setTimeout(() => { input?.focus(); }, 300);
});
