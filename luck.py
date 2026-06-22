import streamlit as st
import datetime
import random
import textwrap

st.set_page_config(page_title="프리미엄 사주 & 운세", page_icon="⚜️", layout="centered")

def render_html(html_str):
    """
    스트림릿 마크다운 렌더링 시, 들여쓰기로 인해 코드 블록(code block)으로
    잘못 인식되는 현상을 방지하기 위해 각 줄의 앞쪽 공백을 제거합니다.
    """
    clean_html = "\n".join([line.lstrip() for line in html_str.split("\n")])
    st.markdown(clean_html, unsafe_allow_html=True)

# --- Premium Luxury CSS ---
css_content = textwrap.dedent("""
    <style>
        /* 프리미엄 폰트: 명조체(Noto Serif KR)와 고딕체(Pretendard) */
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@300;400;600;700&display=swap');
        @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');
        
        * {
            font-family: 'Pretendard', -apple-system, sans-serif;
        }
        
        .serif {
            font-family: 'Noto Serif KR', serif !important;
        }
        
        .stApp {
            background-color: #FAFAFA;
            background-image: 
                radial-gradient(circle at 15% 50%, rgba(212, 175, 55, 0.03), transparent 25%),
                radial-gradient(circle at 85% 30%, rgba(212, 175, 55, 0.04), transparent 25%);
        }
        
        h1, h2, h3 {
            color: #1A1A1A;
            letter-spacing: -0.5px;
        }
        
        .stButton>button {
            background: linear-gradient(135deg, #D4AF37 0%, #AA7C11 100%);
            color: #FFFFFF !important;
            border-radius: 2px !important;
            border: none;
            padding: 16px 32px;
            font-size: 18px;
            font-weight: 600;
            font-family: 'Noto Serif KR', serif !important;
            letter-spacing: 2px;
            box-shadow: 0 10px 30px rgba(170, 124, 17, 0.2);
            transition: all 0.4s ease;
            text-transform: uppercase;
        }
        .stButton>button:hover {
            transform: translateY(-2px);
            box-shadow: 0 15px 40px rgba(170, 124, 17, 0.4);
            background: linear-gradient(135deg, #E6D070 0%, #947A26 100%);
        }
        
        /* ---------------------------------------------------- */
        /* 1. 상단 4개 메인 탭(라디오 버튼) 완벽한 가운데 정렬 적용 */
        /* ---------------------------------------------------- */
        div[data-testid="stRadio"] div[role="radiogroup"] label > div:first-child:not([data-testid="stMarkdownContainer"]) {
            display: none !important;
        }
        
        div[data-testid="stRadio"] {
            display: flex !important;
            justify-content: center !important; 
            width: 100% !important;
        }
        
        div[data-testid="stRadio"] > div {
            background: transparent !important;
            box-shadow: none !important;
            border: none !important;
            border-bottom: 1px solid rgba(212, 175, 55, 0.2) !important;
            border-radius: 0 !important;
            padding: 0 !important;
            gap: 0 !important;
            justify-content: center !important; 
            align-items: center !important;
            display: flex !important;
            margin: 0 auto 40px auto !important;
            flex-wrap: nowrap !important;
            width: 100% !important; 
        }
        
        div[data-testid="stRadio"] label {
            padding: 10px 15px !important;
            background: transparent !important;
            border-radius: 0 !important;
            border-bottom: 2px solid transparent !important;
            margin-bottom: -1px !important;
            transition: all 0.4s ease !important;
            cursor: pointer !important;
            white-space: nowrap !important;
            flex: 0 1 auto !important;
        }
        
        div[data-testid="stRadio"] label p {
            font-family: 'Noto Serif KR', serif !important;
            font-size: 15px !important;
            font-weight: 400 !important;
            color: #999999 !important;
            letter-spacing: 1px !important;
            transition: all 0.3s ease;
        }
        
        div[data-testid="stRadio"] label:has(input:checked) {
            border-bottom: 2px solid #D4AF37 !important;
        }
        div[data-testid="stRadio"] label:has(input:checked) p {
            color: #AA7C11 !important;
            font-weight: 700 !important;
        }
        
        div[data-testid="stRadio"] label:hover p {
            color: #D4AF37 !important;
        }
        
        /* ---------------------------------------------------- */
        /* 2. 두 번째 탭 안의 세부 탭들(st.tabs) 완벽한 가운데 정렬 */
        /* ---------------------------------------------------- */
        div[data-testid="stTabs"] *[role="tablist"] {
            justify-content: center !important; 
            display: flex !important;
            margin: 0 auto !important;
            width: max-content !important; /* 탭 리스트 너비를 자식 크기에 맞추고 가운데 정렬 */
        }
        
        div[data-testid="stTabs"] button[data-baseweb="tab"] {
            font-family: 'Noto Serif KR', serif !important;
            font-size: 16px !important;
            padding-top: 10px !important;
            padding-bottom: 10px !important;
            flex: 0 1 auto !important; 
            margin: 0 10px !important; /* 세부 탭 버튼들 사이의 간격 */
        }
        
        /* 카드 디자인 */
        .luxury-card {
            background: #FFFFFF;
            border-radius: 4px;
            padding: 40px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.03);
            border: 1px solid rgba(212, 175, 55, 0.1);
            margin-bottom: 30px;
            position: relative;
        }
        
        .luxury-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 60px;
            height: 3px;
            background: #D4AF37;
        }
        
        .luxury-header {
            text-align: center;
            margin-bottom: 40px;
        }
        .luxury-header-main {
            color: #1A1A1A;
            font-size: 28px;
            margin-bottom: 15px;
            font-weight: bold;
        }
        .luxury-header p {
            color: #AA7C11;
            font-size: 15px;
            letter-spacing: 2px;
            text-transform: uppercase;
        }
        
        /* 내용 가운데 정렬을 위해 text-align: center 적용 */
        .fortune-text {
            color: #444444;
            font-size: 17px;
            line-height: 1.8;
            font-weight: 300;
            text-align: center;
            word-break: keep-all;
            margin: 0 auto;
            max-width: 650px;
        }
        
        div[data-baseweb="input"] {
            border-radius: 0 !important;
            border: none !important;
            border-bottom: 1px solid #DDDDDD !important;
            background: transparent !important;
        }
        div[data-baseweb="input"]:focus-within {
            border-bottom: 1px solid #D4AF37 !important;
            box-shadow: none !important;
        }
        input {
            font-family: 'Pretendard', sans-serif !important;
            font-size: 16px !important;
            padding: 10px 0 !important;
        }
        
        /* 포춘 쿠키 애니메이션 */
        @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
            100% { transform: translateY(0px); }
        }
        @keyframes splitLeft {
            0% { transform: translateX(0) rotate(0deg); opacity: 1; }
            40% { transform: translateX(-30px) rotate(-15deg); opacity: 1; }
            100% { transform: translateX(-60px) rotate(-30deg); opacity: 0; }
        }
        @keyframes splitRight {
            0% { transform: translateX(0) rotate(0deg); opacity: 1; }
            40% { transform: translateX(30px) rotate(15deg); opacity: 1; }
            100% { transform: translateX(60px) rotate(30deg); opacity: 0; }
        }
        @keyframes revealMsg {
            0% { opacity: 0; transform: translateY(20px); }
            50% { opacity: 0; transform: translateY(20px); } /* 쿠키가 갈라질 때까지 대기 */
            100% { opacity: 1; transform: translateY(0); }
        }
        
        .cookie-left {
            clip-path: polygon(0 0, 50% 0, 50% 100%, 0 100%);
            animation: splitLeft 2.5s forwards ease-in-out;
        }
        .cookie-right {
            clip-path: polygon(50% 0, 100% 0, 100% 100%, 50% 100%);
            animation: splitRight 2.5s forwards ease-in-out;
        }
        .msg-reveal {
            animation: revealMsg 3s forwards ease-out;
        }
    </style>
""")
st.markdown(css_content, unsafe_allow_html=True)

# --- Callbacks ---
def on_check_fortune():
    st.session_state.active_tab = "운세 분석"

def break_cookie():
    fortunes = [
        "지금 당신이 걷고 있는 이 길은, 비록 안개가 끼어 보이지 않을지라도 가장 완벽한 목적지로 향하는 지름길입니다. 스스로의 선택에 확신을 가지십시오.",
        "세상은 당신이 생각하는 것보다 훨씬 더 큰 무대를 당신을 위해 준비하고 있습니다. 작은 실패에 연연하지 말고 가슴을 펴고 당당히 나아가세요.",
        "때로는 잠시 멈춰 서서 지나온 발자취를 돌아보는 여유가 필요합니다. 당신의 진정한 가치는 속도가 아니라 올바른 방향성에 있습니다.",
        "수많은 우연이 겹쳐 만들어진 오늘의 인연을 소중히 여기십시오. 스쳐 지나가는 인연 속에 당신의 인생을 뒤바꿀 귀중한 열쇠가 숨어 있습니다.",
        "가장 어두운 밤이 지나야 가장 밝은 새벽이 오듯, 지금의 고단함은 곧 다가올 찬란한 영광을 위한 숭고한 밑거름이 될 것입니다."
    ]
    st.session_state.cookie_broken = True
    st.session_state.cookie_msg = random.choice(fortunes)

def reset_cookie():
    st.session_state.cookie_broken = False
    st.session_state.cookie_msg = ""

# --- Session State Init ---
if 'active_tab' not in st.session_state:
    st.session_state.active_tab = "정보 입력"
if 'cookie_broken' not in st.session_state:
    st.session_state.cookie_broken = False
if 'cookie_msg' not in st.session_state:
    st.session_state.cookie_msg = ""

# --- Navigation ---
tabs = ["정보 입력", "운세 분석", "오늘의 별자리", "포춘 쿠키"]
selected_tab = st.radio("메뉴", tabs, horizontal=True, key="active_tab", label_visibility="collapsed")

# ================= TAB 1: 정보 입력 =================
if selected_tab == "정보 입력":
    render_html("""
        <div class="luxury-header" style="margin-top:20px;">
            <p class="serif">Destiny Analysis</p>
            <div class="luxury-header-main serif">정보 입력</div>
            <div style="color:#888; font-size:15px; margin-top:10px; font-weight:300;">당신의 정확한 사주 풀이를 위해 태어난 시간을 알려주십시오.</div>
        </div>
    """)
    
    st.write("")
    col1, col2 = st.columns(2)
    with col1:
        st.date_input("생년월일", min_value=datetime.date(1900, 1, 1), max_value=datetime.date.today(), key="birth_date")
    with col2:
        st.time_input("태어난 시간", key="birth_time")
        
    st.write("")
    st.write("")
    st.button("내 운명 확인하기", on_click=on_check_fortune, use_container_width=True)

# ================= TAB 2: 운세 분석 =================
elif selected_tab == "운세 분석":
    if 'birth_date' not in st.session_state:
        st.warning("먼저 '정보 입력' 탭에서 생년월일과 시간을 입력해주세요.")
    else:
        seed_str = str(st.session_state.birth_date) + str(st.session_state.birth_time)
        random.seed(seed_str)
        
        overall_list = [
            "당신의 사주에 흐르는 기운은 마치 조용히 새벽을 깨우는 아사달의 햇살과 같습니다. 오랫동안 웅크려 있던 에너지가 서서히 제자리를 찾아가며, 삶의 전반에 걸쳐 평온과 안정이 찾아오는 시기입니다. 겉보기에는 큰 변화가 없어 보일지라도, 내면의 깊은 곳에서는 당신을 더 높은 곳으로 이끌기 위한 견고한 기반이 다져지고 있습니다. 이번 시기에는 주변의 작은 인연들도 소중히 여기며 긍정적인 마음을 유지하는 것이 중요합니다. 우연히 마주친 기회가 당신의 삶을 윤택하게 만드는 중요한 열쇠가 될 수 있으니, 자신을 믿고 여유로운 태도로 일상을 맞이하시길 바랍니다.",
            "마치 큰 바다가 모든 강물을 품어내듯, 지금 당신의 운세는 넓고 깊은 포용력을 발휘할 때 가장 큰 빛을 발합니다. 그동안 얽혀있던 복잡한 문제들이 서서히 실타래 풀리듯 해결될 기미가 보이며, 귀인의 도움이 예상치 못한 곳에서 찾아올 수 있습니다. 지금은 성급하게 결과를 얻으려 하기보다는, 주변 사람들과의 화합을 도모하고 스스로의 마음을 다스리는 데 집중해야 할 때입니다. 긍정적인 에너지가 주변으로 퍼져나가며 결국 당신에게 더 큰 복으로 돌아오게 될 것입니다. 당신이 품은 원대한 꿈을 향해 묵묵히 걸어가십시오.",
            "강한 바람에도 꺾이지 않는 대나무처럼, 당신의 현재 운세는 놀라운 회복력과 내면의 강인함을 보여주고 있습니다. 일시적인 어려움이나 정체가 있을 수 있으나, 이는 더 큰 도약을 위한 숨 고르기일 뿐입니다. 그동안 당신이 쏟은 노력과 정성이 천천히 흙 속에서 싹을 틔울 준비를 마쳤습니다. 새로운 변화를 두려워하지 말고, 오히려 기꺼이 맞이하는 용기가 필요합니다. 마음의 소리에 귀를 기울이고 당신만의 고유한 리듬을 되찾는다면, 조만간 상상 이상의 큰 성취와 만족감을 느끼게 될 것입니다."
        ]
        
        future_list = [
            "다가오는 미래는 당신에게 눈부신 황금빛 결실을 약속하고 있습니다. 특히 재물과 직업적인 측면에서 뚜렷한 상승 곡선을 그리게 될 것이며, 예전에는 감히 도전하지 못했던 새로운 영역에서 당신의 진가를 인정받게 됩니다. 다만, 너무 많은 기회가 한꺼번에 쏟아질 수 있으니 옥석을 가려내는 지혜가 필요합니다. 신중한 선택과 결단력이 뒷받침된다면, 이 시기에 쌓아 올린 성취는 앞으로 10년의 삶을 지탱해 줄 든든한 반석이 될 것입니다. 당신 앞의 찬란한 미래를 기대하셔도 좋습니다.",
            "앞으로의 시간은 당신의 인생에서 가장 풍요롭고 다채로운 장이 펼쳐지는 시기가 될 것입니다. 새로운 인연들이 당신의 삶에 활력을 불어넣고, 예상치 못한 장소에서 운명적인 만남이나 귀중한 기회를 얻게 됩니다. 그동안 혼자서 감당해왔던 무게를 덜어줄 조력자가 나타나며, 당신의 재능이 세상의 주목을 받게 될 것입니다. 실패를 두려워하지 말고 당신의 직관을 믿고 나아가십시오. 머지않아 당신의 이름이 명예롭게 빛나고 많은 이들의 부러움을 사는 순간이 반드시 찾아올 것입니다.",
            "조용히 내리던 비가 그치고 마침내 무지개가 떠오르는 형상입니다. 과거의 고생과 눈물이 찬란한 보상으로 뒤바뀌는 전환점을 맞이하게 됩니다. 다가오는 날들에는 당신의 노력을 헛되이 하지 않는 하늘의 섭리가 작용하여, 오랫동안 바래왔던 간절한 소망이 하나둘 현실로 이루어지게 됩니다. 뜻하지 않은 횡재수나 승진, 혹은 명예의 상승이 기다리고 있으니 언제나 겸손함을 잃지 말고 주변과 나누는 미덕을 베푸십시오. 그로 인해 당신의 앞길은 더욱 탄탄대로가 될 것입니다."
        ]
        
        job_list = [
            "당신은 타고난 직관력과 예술적 감성을 지니고 있어, 무에서 유를 창조해내는 분야에서 압도적인 재능을 발휘합니다. 남들이 보지 못하는 미세한 아름다움을 캐치하고 이를 세상에 표현하는 데 탁월하며, 기획, 디자인, 문학, 예술 혹은 트렌드를 선도하는 크리에이티브 디렉터와 같은 직업이 당신의 영혼을 가장 빛나게 합니다. 얽매인 틀보다는 자유로운 환경에서 당신의 능력이 200% 발휘될 수 있으며, 결국 당신만의 고유한 브랜드나 철학을 세상에 널리 알리게 될 운명입니다.",
            "사물의 본질을 꿰뚫어 보는 날카로운 분석력과 흔들림 없는 논리를 타고난 당신은, 복잡한 문제를 해결하고 체계를 잡아가는 분야의 스페셜리스트입니다. 금융, IT 개발, 연구직, 법조계 혹은 고도의 전략이 필요한 컨설팅 분야에서 그 누구도 대체할 수 없는 핵심 인재로 성장할 수 있습니다. 겉으로는 차갑고 이성적으로 보일 수 있으나, 내면에 품고 있는 완벽을 향한 뜨거운 열정이 당신을 업계 최고의 권위자로 만들어 줄 것입니다. 당신의 치밀함이 곧 최고의 무기입니다.",
            "당신은 사람의 마음을 어루만지고 이끌어가는 타고난 카리스마와 따뜻한 리더십을 동시에 지니고 있습니다. 교육, 상담, 심리, 인사 관리, 혹은 많은 대중을 상대로 하는 비즈니스 분야에서 큰 성공을 거둘 수 있습니다. 사람들은 당신의 말에 깊은 신뢰를 느끼며, 당신을 중심으로 자연스럽게 네트워크가 형성됩니다. 누군가의 삶에 긍정적인 영향을 미치고 그들의 잠재력을 끌어내주는 역할을 할 때, 당신 자신 또한 가장 큰 성취감과 금전적인 부를 함께 거머쥐게 될 것입니다."
        ]
        
        overall_fortune = random.choice(overall_list)
        future_fortune = random.choice(future_list)
        job_fortune = random.choice(job_list)
        
        render_html("""
            <div class="luxury-header" style="margin-top:20px;">
                <p class="serif">Destiny Report</p>
                <div class="luxury-header-main serif">운세 분석</div>
            </div>
        """)
        
        # 세부 탭들
        sub_tabs = st.tabs(["✨ 운세 총평", "🚀 미래 전망", "💼 타고난 재능과 직업"])
        
        with sub_tabs[0]:
            render_html(f'<div class="luxury-card" style="margin-top:20px; text-align:center;"><p class="fortune-text">{overall_fortune}</p></div>')
        with sub_tabs[1]:
            render_html(f'<div class="luxury-card" style="margin-top:20px; text-align:center;"><p class="fortune-text">{future_fortune}</p></div>')
        with sub_tabs[2]:
            render_html(f'<div class="luxury-card" style="margin-top:20px; text-align:center;"><p class="fortune-text">{job_fortune}</p></div>')
            
        random.seed()

# ================= TAB 3: 오하아사 =================
elif selected_tab == "오늘의 별자리":
    today = datetime.date.today()
    
    render_html(f"""
        <div class="luxury-header" style="margin-top:20px;">
            <p class="serif">Daily Horoscope</p>
            <div class="luxury-header-main serif">오늘의 별자리</div>
            <div style="color:#888; font-size:14px; font-weight:300;">{today.strftime('%Y. %m. %d')} 기준</div>
        </div>
    """)
    
    zodiacs = ["물병자리", "물고기자리", "양자리", "황소자리", "쌍둥이자리", "게자리", "사자자리", "처녀자리", "천칭자리", "전갈자리", "사수자리", "염소자리"]
    random.seed(today.toordinal())
    
    shuffled_zodiacs = zodiacs.copy()
    random.shuffle(shuffled_zodiacs)
    
    colors = ["피치 핑크", "크림 옐로우", "미드나잇 블루", "민트 그린", "라벤더", "코랄", "화이트", "로즈 골드", "실버", "버건디", "오션 블루", "베이지"]
    items = ["텀블러", "에어팟", "다이어리", "향수", "선글라스", "은반지", "만년필", "머그컵", "도서", "안경", "핸드크림", "카드지갑"]
    
    def get_lucky_info():
        return random.choice(colors), random.choice(items)

    st.markdown('<div style="text-align:center; color:#AA7C11; font-size:24px; font-weight:600; margin-bottom:30px; font-family:\'Noto Serif KR\', serif;">Top 3 Zodiac Signs</div>', unsafe_allow_html=True)
    
    col1, col2, col3 = st.columns(3)
    c1, i1 = get_lucky_info()
    c2, i2 = get_lucky_info()
    c3, i3 = get_lucky_info()
    
    with col1:
        render_html(f"""
            <div style="background: #FFFFFF; padding: 30px 20px; border-radius: 4px; text-align: center; border: 1px solid #EAEAEA; box-shadow: 0 10px 20px rgba(0,0,0,0.02);">
                <div style="font-family:'Noto Serif KR', serif; font-size: 16px; color: #999; margin-bottom:10px;">2nd Place</div>
                <div class="serif" style="margin: 0 0 20px 0; font-size:22px; color:#1A1A1A; font-weight:bold;">{shuffled_zodiacs[1]}</div>
                <p style="margin:0; font-size:14px; color:#666; font-weight:300;">행운의 색상: <b>{c2}</b><br>행운의 아이템: <b>{i2}</b></p>
            </div>
        """)
        
    with col2: 
        render_html(f"""
            <div style="background: #FFFFFF; padding: 40px 20px; border-radius: 4px; text-align: center; border: 1px solid rgba(212, 175, 55, 0.5); box-shadow: 0 15px 30px rgba(212, 175, 55, 0.1); transform: translateY(-10px);">
                <div style="font-family:'Noto Serif KR', serif; font-size: 18px; color: #D4AF37; margin-bottom:10px; font-weight:600;">1st Place ✦</div>
                <div class="serif" style="margin: 0 0 20px 0; font-size:26px; color:#1A1A1A; font-weight:bold;">{shuffled_zodiacs[0]}</div>
                <p style="margin:0; font-size:14px; color:#666; font-weight:300;">행운의 색상: <b>{c1}</b><br>행운의 아이템: <b>{i1}</b></p>
            </div>
        """)
        
    with col3:
        render_html(f"""
            <div style="background: #FFFFFF; padding: 30px 20px; border-radius: 4px; text-align: center; border: 1px solid #EAEAEA; box-shadow: 0 10px 20px rgba(0,0,0,0.02);">
                <div style="font-family:'Noto Serif KR', serif; font-size: 16px; color: #999; margin-bottom:10px;">3rd Place</div>
                <div class="serif" style="margin: 0 0 20px 0; font-size:22px; color:#1A1A1A; font-weight:bold;">{shuffled_zodiacs[2]}</div>
                <p style="margin:0; font-size:14px; color:#666; font-weight:300;">행운의 색상: <b>{c3}</b><br>행운의 아이템: <b>{i3}</b></p>
            </div>
        """)

    st.write("")
    st.write("")
    
    st.markdown('<div class="luxury-card" style="padding: 30px;">', unsafe_allow_html=True)
    
    for i in range(3, 12):
        zodiac = shuffled_zodiacs[i]
        rank = i + 1
        c, item = get_lucky_info()
        
        border_style = "border-bottom: 1px solid #F0F0F0;" if i < 11 else ""
        text_color = "#999999" if rank == 12 else "#444444"
        
        render_html(f"""
            <div style="padding: 15px 10px; {border_style} display: flex; justify-content: space-between; align-items: center;">
                <div style="font-weight: 500; font-size: 17px; color: {text_color};"><span style="display:inline-block; width:40px; font-family:'Noto Serif KR', serif; color:#AA7C11;">{rank}.</span> {zodiac}</div>
                <div style="font-size: 15px; color: #777; font-weight:300;">컬러: <b style="color:#444;">{c}</b> &nbsp;&nbsp;|&nbsp;&nbsp; 아이템: <b style="color:#444;">{item}</b></div>
            </div>
        """)
        
    st.markdown("</div>", unsafe_allow_html=True)
    random.seed()

# ================= TAB 4: 포춘 쿠키 =================
elif selected_tab == "포춘 쿠키":
    render_html("""
        <div class="luxury-header" style="margin-top:20px;">
            <p class="serif">Fortune Cookie</p>
            <div class="luxury-header-main serif">포춘 쿠키</div>
        </div>
    """)
    
    col1, col2, col3 = st.columns([1,2,1])
    with col2:
        if not st.session_state.cookie_broken:
            render_html("""
                <div style="text-align: center; padding: 50px 0; animation: float 4s ease-in-out infinite;">
                    <span style="font-size: 130px; filter: drop-shadow(0 20px 30px rgba(212, 175, 55, 0.2)); line-height: 1;">🥠</span>
                </div>
            """)
            st.button("메시지 확인하기", on_click=break_cookie, use_container_width=True)
        else:
            render_html(f"""
                <div style="position: relative; width: 130px; height: 130px; margin: 0 auto; margin-top: 30px;">
                    <div class="cookie-left" style="font-size: 130px; position: absolute; left: 0; top: 0; line-height: 1;">🥠</div>
                    <div class="cookie-right" style="font-size: 130px; position: absolute; left: 0; top: 0; line-height: 1;">🥠</div>
                </div>
                
                <div class="msg-reveal">
                    <div class="luxury-card" style="padding: 40px; text-align: center; margin-bottom: 30px; border-top: 3px solid #D4AF37;">
                        <p class="serif" style="font-size: 20px; color: #1A1A1A; line-height: 2.0; word-break: keep-all;">
                            "{st.session_state.cookie_msg}"
                        </p>
                    </div>
                </div>
            """)
            st.write("")
            st.button("새로운 메시지 받기", on_click=reset_cookie, use_container_width=True)
