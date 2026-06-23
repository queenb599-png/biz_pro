import streamlit as st
import streamlit.components.v1 as components
import os

# 페이지 기본 설정 (타이틀 및 레이아웃)
st.set_page_config(
    page_title="FestGO - 전국 축제 스탬프 투어 & 셔틀버스 예약",
    page_icon="🗺️",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# Streamlit의 기본 여백, 헤더, 푸터 숨기기 (모바일 앱 단독 화면처럼 보이도록 최적화)
st.markdown("""
<style>
    #MainMenu {visibility: hidden;}
    header {visibility: hidden;}
    footer {visibility: hidden;}
    .block-container {
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        max-width: 100%;
        display: flex;
        justify-content: center;
    }
    iframe {
        border: none;
        border-radius: 20px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    }
</style>
""", unsafe_allow_html=True)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

def load_app_files():
    try:
        with open(os.path.join(BASE_DIR, "festa.html"), "r", encoding="utf-8") as f:
            html_content = f.read()
            
        with open(os.path.join(BASE_DIR, "festa.css"), "r", encoding="utf-8") as f:
            css_content = f.read()

        with open(os.path.join(BASE_DIR, "festa.js"), "r", encoding="utf-8") as f:
            js_content = f.read()
            
        return html_content, css_content, js_content
    except FileNotFoundError as e:
        st.error(f"필요한 소스 파일을 찾을 수 없습니다. (festa.html, festa.css, festa.js 확인 필요): {e}")
        return None, None, None

html_content, css_content, js_content = load_app_files()

if html_content and css_content and js_content:
    # HTML 내에서 외부 파일 로드 링크를 인라인 스타일/스크립트로 변환
    html_content = html_content.replace('<link rel="stylesheet" href="festa.css">', f"<style>{css_content}</style>")
    html_content = html_content.replace('<script src="festa.js"></script>', f"<script>{js_content}</script>")

    # Streamlit HTML Component를 통해 렌더링 (모바일 화면 높이에 맞춤)
    components.html(html_content, height=880, scrolling=False)
else:
    st.info("festa.html, festa.css, festa.js 파일 작성을 대기 중입니다.")
