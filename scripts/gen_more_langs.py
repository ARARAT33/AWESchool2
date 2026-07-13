#!/usr/bin/env python3
"""
Generate hand-curated translation files for top 30+ languages.
Each file has the same 137 keys as hy.ts.
"""

from pathlib import Path

OUT_DIR = Path("/home/z/my-project/src/lib/i18n/translations")
OUT_DIR.mkdir(parents=True, exist_ok=True)

# All keys (in order) — same as hy.ts / en.ts
KEYS = [
    "app.title","app.subtitle","welcome.title","welcome.name_placeholder","welcome.start",
    "welcome.new_user","welcome.restore","welcome.desc","welcome.restore_file","welcome.choose_avatar",
    "home.greeting","home.subtitle","subjects.core","subjects.science","subjects.language",
    "subjects.computer","subjects.advanced","lesson.listen","lesson.stop","lesson.next",
    "lesson.prev","lesson.start_exam","lesson.lessons","lesson.completed","lesson.hint",
    "lesson.explanation","exam.question","exam.check","exam.exit","exam.congrats",
    "exam.retry","exam.passed","exam.need_60","stats.lessons","stats.streak",
    "stats.points","stats.title","stats.achievements","stats.study_time","stats.favorites",
    "stats.bookmarks","settings.title","settings.theme","settings.theme_light","settings.theme_dark",
    "settings.theme_auto","settings.font_size","settings.font_small","settings.font_medium","settings.font_large",
    "settings.daily_goal","settings.language","settings.learning_mode","settings.tip","mode.school",
    "mode.university","mode.school_desc","mode.university_desc","guides.title","guides.how_to_use",
    "guides.start","guides.start_desc","guides.modes","guides.modes_desc","guides.listen",
    "guides.listen_desc","guides.share","guides.share_desc","guides.export","guides.export_desc",
    "guides.languages","guides.languages_desc","guides.achievements","guides.achievements_desc","guides.all_guides",
    "guides.main","guides.live_demo","guides.step","export","import",
    "profile.title","profile.share","search.placeholder","filter.all","filter.completed",
    "filter.available","filter.locked","filter.favorites","daily_goal","recently_viewed",
    "continue_learning","reset","share_data","back_to_subjects","my_achievements",
    "confirm_reset","daily_goal_done","daily_goal_remaining","university.book_title","university.chapter",
    "university.page","university.test","university.pass_threshold","university.next_chapter","footer.copyright",
    "footer.tagline","share.summary","share.completed_lessons","share.streak","share.points",
    "share.achievements","share.total_lessons","share.study_time","share.creating","share.copied",
    "share.button","tts.working","tts.engine","tts.test_voice","tts.select_voice",
    "tts.speed","tts.pitch","tts.volume","tts.info","file.export_title",
    "file.export_desc","file.import_desc","file.protected","file.warning","file.exported",
    "file.imported","file.invalid","file.read_error","lang.changed","lang.select",
    "lang.search","lang.no_results",
]
assert len(KEYS) == 137, f"expected 137 keys, got {len(KEYS)}"

# ---------------------------------------------------------------------------
# Translations — only the values, in the same order as KEYS
# Format: (lang_code, [137 values])
# ---------------------------------------------------------------------------

TRANSLATIONS = {}

# ---------------------------------------------------------------------------
# Italian (it)
# ---------------------------------------------------------------------------
TRANSLATIONS["it"] = [
    "Mondo della Conoscenza","AWESchool - Gioco Educativo","Benvenuto","Inserisci il tuo nome","Inizia ad imparare",
    "Nuova registrazione","Ho già un account — Ripristina","Piattaforma educativa interattiva: 200+ materie, 10.000+ lezioni, lettura vocale, esami.","Ripristina da file JSON","Scegli il tuo personaggio",
    "Benvenuto","Scegli una materia, impara le lezioni, supera gli esami","Materie principali","Scienze","Scienze umane",
    "Professioni informatiche","Tecnologie avanzate","Ascolta","Stop","Avanti",
    "Indietro","Inizia esame","lezioni","completate","Ottieni suggerimento",
    "Spiegazione","Domanda","Verifica","Esci","Congratulazioni",
    "Riprova","Hai superato l'esame con successo","Serve 60%+ per la lezione successiva","Lezioni completate","Giorni consecutivi",
    "Punti","Le mie statistiche","Traguardi","Studiato","Preferiti",
    "Segnalibri","Impostazioni","Tema","Chiaro","Scuro",
    "Auto","Dimensione carattere","Piccolo","Medio","Grande",
    "Obiettivo giornaliero","Lingua","Modalità di apprendimento predefinita","Il tema scuro è meglio per studiare di sera. Caratteri grandi per la vista.","Scuola",
    "Università","Lezioni facili, colorato e interattivo","Libro dettagliato, 100+ pagine, con test","Guide","Come usare il sito",
    "Come iniziare","Primi passi sul sito","Scuola e Università","Due modalità di apprendimento","Ascolta le lezioni",
    "Lettura vocale","Condividi statistiche","Invia i tuoi progressi agli amici","Esporta / Importa","Backup basato su file",
    "200+ lingue","Cambia lingua del sito","Traguardi","Gareggia con altri partecipanti","Tutte le guide",
    "Home","Demo dal vivo","Passo","ESPORTA","IMPORTA",
    "Il mio profilo","Condividi profilo","Cerca lezioni...","Tutti","Completati",
    "Disponibili","Bloccati","Preferiti","Obiettivo giornaliero","Visti di recente",
    "Continua ad imparare","Ricomincia","Condividi dati","Materie","I miei traguardi",
    "Sei sicuro di voler eliminare tutti i progressi?","🎉 Congratulazioni! L'obiettivo di oggi è raggiunto!","Mancano {n} lezioni all'obiettivo di oggi","Libro","Capitolo",
    "Pagina","Test","Soglia di superamento: 51%","Capitolo successivo","© AWESchool Tutti i diritti riservati",
    "Impara, gioca, cresci","Statistiche","Lezioni completate","Giorni consecutivi","Punti",
    "Traguardi","Lezioni totali","Tempo di studio","Creazione screenshot...","Statistiche copiate!",
    "Condividi statistiche","La voce funziona tramite Google TTS","Motore attuale","Prova voce","Seleziona voce",
    "Velocità","Tonalità","Volume","Il testo è letto da Google TTS (gratis)","Esportazione / importazione dati",
    "Scarica tutti i tuoi dati come file JSON firmato","Ripristina i tuoi dati da un file precedentemente esportato","I file sono firmati da AWESchool. I file falsificati saranno rifiutati.","L'importazione sostituirà i dati attuali.","Dati esportati (file firmato)",
    "Dati importati con successo dal file!","Formato file non valido","Lettura del file non riuscita","Lingua cambiata","Seleziona lingua",
    "Cerca lingua...","Nessun risultato trovato",
]

# ---------------------------------------------------------------------------
# Portuguese (pt)
# ---------------------------------------------------------------------------
TRANSLATIONS["pt"] = [
    "Mundo do Conhecimento","AWESchool - Jogo Educativo","Bem-vindo","Digite seu nome","Começar a aprender",
    "Novo registro","Já tenho conta — Restaurar","Plataforma educativa interativa: 200+ matérias, 10.000+ lições, leitura por voz, exames.","Restaurar de arquivo JSON","Escolha seu personagem",
    "Bem-vindo","Escolha uma matéria, aprenda lições, faça exames","Matérias principais","Ciências","Humanidades",
    "Profissões de informática","Tecnologias avançadas","Ouvir","Parar","Próximo",
    "Anterior","Iniciar exame","lições","concluídas","Obter dica",
    "Explicação","Pergunta","Verificar","Sair","Parabéns",
    "Tentar novamente","Você passou no exame com sucesso","Precisa de 60%+ para a próxima lição","Lições concluídas","Dias seguidos",
    "Pontos","Minhas estatísticas","Conquistas","Estudado","Favoritos",
    "Marcadores","Configurações","Tema","Claro","Escuro",
    "Auto","Tamanho da fonte","Pequeno","Médio","Grande",
    "Meta diária","Idioma","Modo de aprendizagem padrão","O tema escuro é melhor para estudar à noite. Fonte grande para a visão.","Escola",
    "Universidade","Lições fáceis, colorido e interativo","Livro detalhado, 100+ páginas, com testes","Guias","Como usar o site",
    "Como começar","Primeiros passos no site","Escola e Universidade","Dois modos de aprendizagem","Ouvir lições",
    "Leitura por voz","Compartilhar estatísticas","Envie seu progresso aos amigos","Exportar / Importar","Backup de dados em arquivo",
    "200+ idiomas","Mudar idioma do site","Conquistas","Compita com outros participantes","Todos os guias",
    "Início","Demonstração ao vivo","Passo","EXPORTAR","IMPORTAR",
    "Meu perfil","Compartilhar perfil","Pesquisar lições...","Todos","Concluídos",
    "Disponíveis","Bloqueados","Favoritos","Meta diária","Vistos recentemente",
    "Continuar aprendendo","Recomeçar","Compartilhar dados","Matérias","Minhas conquistas",
    "Tem certeza de que deseja apagar todo o progresso?","🎉 Parabéns! A meta de hoje foi atingida!","Faltam {n} lições para a meta de hoje","Livro","Capítulo",
    "Página","Teste","Nota mínima: 51%","Próximo capítulo","© AWESchool Todos os direitos reservados",
    "Aprenda, jogue, cresça","Estatísticas","Lições concluídas","Dias seguidos","Pontos",
    "Conquistas","Total de lições","Tempo de estudo","Criando captura de tela...","Estatísticas copiadas!",
    "Compartilhar estatísticas","A voz funciona via Google TTS","Motor atual","Testar voz","Selecionar voz",
    "Velocidade","Tom","Volume","O texto é lido pelo Google TTS (grátis)","Exportar / importar dados",
    "Baixe todos os seus dados como arquivo JSON assinado","Restaure seus dados de um arquivo exportado anteriormente","Os arquivos são assinados pela AWESchool. Arquivos falsificados serão rejeitados.","A importação substituirá os dados atuais.","Dados exportados (arquivo assinado)",
    "Dados importados com sucesso do arquivo!","Formato de arquivo inválido","Falha ao ler o arquivo","Idioma alterado","Selecionar idioma",
    "Pesquisar idioma...","Nenhum resultado encontrado",
]

# ---------------------------------------------------------------------------
# Chinese (zh)
# ---------------------------------------------------------------------------
TRANSLATIONS["zh"] = [
    "知识世界","AWESchool - 教育游戏","欢迎","输入您的名字","开始学习",
    "新注册","我已有账户 — 恢复","互动教育平台:200+学科,10,000+课程,语音朗读,考试。","从JSON文件恢复","选择你的角色",
    "欢迎","选择一个学科,学习课程,通过考试","主要学科","科学","人文学科",
    "计算机专业","先进技术","听","停止","下一个",
    "上一个","开始考试","课程","已完成","获取提示",
    "解释","问题","检查","退出","恭喜",
    "再试一次","您成功通过了考试","下一课需要60%+","已完成课程","连续天数",
    "积分","我的统计","成就","已学习","收藏",
    "书签","设置","主题","浅色","深色",
    "自动","字体大小","小","中","大",
    "每日目标","语言","默认学习模式","深色主题更适合晚上学习。大字体对视力好。","学校",
    "大学","简单课程,色彩丰富,互动性强","详细书籍,100+页,带测试","指南","如何使用网站",
    "如何开始","网站上的第一步","学校和大学","两种学习模式","听课程",
    "语音朗读","分享统计","把你的进度发给朋友","导出 / 导入","基于文件的数据备份",
    "200+语言","更改网站语言","成就","与其他参与者竞争","所有指南",
    "首页","现场演示","步骤","导出","导入",
    "我的个人资料","分享个人资料","搜索课程...","全部","已完成",
    "可用","已锁定","收藏","每日目标","最近查看",
    "继续学习","重新开始","分享数据","学科","我的成就",
    "您确定要删除所有进度吗?","🎉 恭喜!今日目标已达成!","距离今日目标还差{n}课","书","章",
    "页","测试","及格线:51%","下一章","© AWESchool 版权所有",
    "学习,游戏,成长","统计","已完成课程","连续天数","积分",
    "成就","总课程","学习时间","正在创建截图...","统计已复制!",
    "分享统计","语音通过Google TTS工作","当前引擎","测试语音","选择语音",
    "速度","音调","音量","文本由Google TTS朗读(免费)","数据导出 / 导入",
    "将所有数据下载为签名的JSON文件","从以前导出的文件恢复您的数据","文件由AWESchool签名。伪造文件将被拒绝。","导入将替换当前数据。","数据已导出(签名文件)",
    "数据已从文件成功导入!","文件格式无效","读取文件失败","语言已更改","选择语言",
    "搜索语言...","未找到结果",
]

# ---------------------------------------------------------------------------
# Japanese (ja)
# ---------------------------------------------------------------------------
TRANSLATIONS["ja"] = [
    "知識の世界","AWESchool - 教育ゲーム","ようこそ","お名前を入力してください","学習を始める",
    "新規登録","既にアカウントがあります — 復元","インタラクティブ教育プラットフォーム:200以上の科目、10,000以上のレッスン、音声読み上げ、試験。","JSONファイルから復元","キャラクターを選んでください",
    "ようこそ","科目を選んで、レッスンを学び、試験に合格しよう","主要科目","科学","人文科学",
    "コンピュータ専門職","先端技術","聞く","停止","次へ",
    "前へ","試験開始","レッスン","完了","ヒントを得る",
    "説明","質問","確認","終了","おめでとう",
    "もう一度試す","試験に合格しました","次のレッスンには60%以上必要","完了したレッスン","連続日数",
    "ポイント","私の統計","実績","学習時間","お気に入り",
    "ブックマーク","設定","テーマ","ライト","ダーク",
    "自動","フォントサイズ","小","中","大",
    "1日の目標","言語","デフォルト学習モード","ダークテーマは夜の学習に適しています。視力のための大きなフォント。","学校",
    "大学","簡単なレッスン、カラフルでインタラクティブ","詳細な本、100ページ以上、テスト付き","ガイド","サイトの使い方",
    "始め方","サイトでの最初のステップ","学校と大学","2つの学習モード","レッスンを聞く",
    "音声読み上げ","統計を共有","進捗を友達に送る","エクスポート / インポート","ファイルベースのデータバックアップ",
    "200以上の言語","サイトの言語を変更","実績","他の参加者と競う","すべてのガイド",
    "ホーム","ライブデモ","ステップ","エクスポート","インポート",
    "マイプロフィール","プロフィールを共有","レッスンを検索...","すべて","完了",
    "利用可能","ロック済み","お気に入り","1日の目標","最近表示したもの",
    "学習を続ける","やり直す","データを共有","科目","私の実績",
    "すべての進捗を削除してもよろしいですか?","🎉 おめでとう!今日の目標達成!","今日の目標まであと{n}レッスン","本","章",
    "ページ","テスト","合格ライン:51%","次の章","© AWESchool All rights reserved",
    "学び、遊び、成長する","統計","完了したレッスン","連続日数","ポイント",
    "実績","合計レッスン","学習時間","スクリーンショットを作成中...","統計をコピーしました!",
    "統計を共有","音声はGoogle TTSで動作","現在のエンジン","音声をテスト","音声を選択",
    "速度","ピッチ","音量","テキストはGoogle TTSで読まれます(無料)","データのエクスポート / インポート",
    "すべてのデータを署名付きJSONファイルとしてダウンロード","以前にエクスポートしたファイルからデータを復元","ファイルはAWESchoolによって署名されています。偽造ファイルは拒否されます。","インポートは現在のデータを置き換えます。","データをエクスポートしました(署名付きファイル)",
    "ファイルからデータを正常にインポートしました!","無効なファイル形式","ファイルの読み取りに失敗しました","言語が変更されました","言語を選択",
    "言語を検索...","結果が見つかりません",
]

# ---------------------------------------------------------------------------
# Korean (ko)
# ---------------------------------------------------------------------------
TRANSLATIONS["ko"] = [
    "지식의 세계","AWESchool - 교육 게임","환영합니다","이름을 입력하세요","학습 시작",
    "신규 등록","이미 계정이 있습니다 — 복원","대화형 교육 플랫폼: 200개 이상의 과목, 10,000개 이상의 수업, 음성 읽기, 시험.","JSON 파일에서 복원","캐릭터를 선택하세요",
    "환영합니다","과목을 선택하고, 수업을 배우고, 시험을 통과하세요","주요 과목","과학","인문학",
    "컴퓨터 직업","첨단 기술","듣기","정지","다음",
    "이전","시험 시작","수업","완료됨","힌트 얻기",
    "설명","질문","확인","종료","축하합니다",
    "다시 시도","시험에 합격했습니다","다음 수업을 위해 60%+ 필요","완료된 수업","연속 일수",
    "포인트","내 통계","업적","학습함","즐겨찾기",
    "북마크","설정","테마","밝게","어둡게",
    "자동","글꼴 크기","작게","중간","크게",
    "일일 목표","언어","기본 학습 모드","어두운 테마는 야간 학습에 더 좋습니다. 시력을 위한 큰 글꼴.","학교",
    "대학","쉬운 수업, 다채롭고 대화형","상세한 책, 100페이지 이상, 테스트 포함","가이드","사이트 사용 방법",
    "시작하는 방법","사이트의 첫 단계","학교와 대학","두 가지 학습 모드","수업 듣기",
    "음성 읽기","통계 공유","진행 상황을 친구에게 보내기","내보내기 / 가져오기","파일 기반 데이터 백업",
    "200개 이상의 언어","사이트 언어 변경","업적","다른 참가자와 경쟁","모든 가이드",
    "홈","라이브 데모","단계","내보내기","가져오기",
    "내 프로필","프로필 공유","수업 검색...","전체","완료됨",
    "사용 가능","잠김","즐겨찾기","일일 목표","최근 본 항목",
    "학습 계속","다시 시작","데이터 공유","과목","내 업적",
    "모든 진행 상황을 삭제하시겠습니까?","🎉 축하합니다! 오늘의 목표 달성!","오늘의 목표까지 {n}수업 남음","책","챕터",
    "페이지","테스트","합격선: 51%","다음 챕터","© AWESchool 판권 소유",
    "배우고, 놀고, 성장하세요","통계","완료된 수업","연속 일수","포인트",
    "업적","총 수업","학습 시간","스크린샷 생성 중...","통계가 복사되었습니다!",
    "통계 공유","음성은 Google TTS로 작동","현재 엔진","음성 테스트","음성 선택",
    "속도","피치","볼륨","텍스트는 Google TTS로 읽힙니다(무료)","데이터 내보내기 / 가져오기",
    "모든 데이터를 서명된 JSON 파일로 다운로드","이전에 내보낸 파일에서 데이터 복원","파일은 AWESchool에 의해 서명됩니다. 위조된 파일은 거부됩니다.","가져오기는 현재 데이터를 대체합니다.","데이터 내보냄(서명된 파일)",
    "파일에서 데이터를 성공적으로 가져왔습니다!","잘못된 파일 형식","파일 읽기 실패","언어가 변경되었습니다","언어 선택",
    "언어 검색...","결과를 찾을 수 없습니다",
]

# ---------------------------------------------------------------------------
# Arabic (ar)
# ---------------------------------------------------------------------------
TRANSLATIONS["ar"] = [
    "عالم المعرفة","AWESchool - لعبة تعليمية","مرحباً","أدخل اسمك","ابدأ التعلم",
    "تسجيل جديد","لدي حساب بالفعل — استعادة","منصة تعليمية تفاعلية: 200+ مادة، 10,000+ درس، قراءة صوتية، امتحانات.","استعادة من ملف JSON","اختر شخصيتك",
    "مرحباً","اختر مادة، تعلم الدروس، اجتاز الامتحانات","المواد الأساسية","العلوم","العلوم الإنسانية",
    "المهن الحاسوبية","التقنيات المتقدمة","استمع","إيقاف","التالي",
    "السابق","ابدأ الامتحان","دروس","مكتمل","احصل على تلميح",
    "شرح","سؤال","تحقق","خروج","تهانينا",
    "حاول مرة أخرى","لقد نجحت في الامتحان","تحتاج إلى 60%+ للدرس التالي","الدروس المكتملة","أيام متتالية",
    "نقاط","إحصائياتي","الإنجازات","درست","المفضلة",
    "الإشارات المرجعية","الإعدادات","السمة","فاتح","داكن",
    "تلقائي","حجم الخط","صغير","متوسط","كبير",
    "الهدف اليومي","اللغة","وضع التعلم الافتراضي","السمة الداكنة أفضل للدراسة مساءً. خط كبير للرؤية.","مدرسة",
    "جامعة","دروس سهلة، ملونة وتفاعلية","كتاب مفصل، 100+ صفحة، مع اختبارات","أدلة","كيفية استخدام الموقع",
    "كيف تبدأ","الخطوات الأولى على الموقع","المدرسة والجامعة","وضعان للتعلم","استمع للدروس",
    "قراءة صوتية","مشاركة الإحصائيات","أرسل تقدمك للأصدقاء","تصدير / استيراد","نسخ احتياطي للبيانات قائم على الملفات",
    "200+ لغة","تغيير لغة الموقع","الإنجازات","تنافس مع المشاركين الآخرين","جميع الأدلة",
    "الرئيسية","عرض مباشر","خطوة","تصدير","استيراد",
    "ملفي الشخصي","مشاركة الملف الشخصي","بحث الدروس...","الكل","مكتمل",
    "متاح","مقفل","المفضلة","الهدف اليومي","عُرض مؤخراً",
    "متابعة التعلم","ابدأ من جديد","مشاركة البيانات","المواد","إنجازاتي",
    "هل أنت متأكد من حذف كل التقدم؟","🎉 تهانينا! تم تحقيق هدف اليوم!","بقي {n} دروس للوصول إلى هدف اليوم","كتاب","فصل",
    "صفحة","اختبار","حد النجاح: 51%","الفصل التالي","© AWESchool جميع الحقوق محفوظة",
    "تعلم، العب، انمُ","الإحصائيات","الدروس المكتملة","أيام متتالية","نقاط",
    "الإنجازات","إجمالي الدروس","وقت الدراسة","إنشاء لقطة شاشة...","تم نسخ الإحصائيات!",
    "مشاركة الإحصائيات","الصوت يعمل عبر Google TTS","المحرك الحالي","اختبار الصوت","اختر الصوت",
    "السرعة","الطبقة","مستوى الصوت","يُقرأ النص بواسطة Google TTS (مجاناً)","تصدير / استيراد البيانات",
    "حمّل جميع بياناتك كملف JSON موقّع","استعد بياناتك من ملف تم تصديره مسبقاً","الملفات موقعة من AWESchool. الملفات المزيفة سيتم رفضها.","الاستيراد سيستبدل البيانات الحالية.","تم تصدير البيانات (ملف موقّع)",
    "تم استيراد البيانات بنجاح من الملف!","صيغة ملف غير صالحة","فشل في قراءة الملف","تم تغيير اللغة","اختر اللغة",
    "بحث اللغة...","لم يتم العثور على نتائج",
]

# ---------------------------------------------------------------------------
# Turkish (tr)
# ---------------------------------------------------------------------------
TRANSLATIONS["tr"] = [
    "Bilgi Dünyası","AWESchool - Eğitim Oyunu","Hoş geldiniz","Adınızı girin","Öğrenmeye başla",
    "Yeni kayıt","Hesabım var — Geri yükle","Etkileşimli eğitim platformu: 200+ ders, 10.000+ ders, sesli okuma, sınavlar.","JSON dosyasından geri yükle","Karakterini seç",
    "Hoş geldiniz","Bir ders seç, dersleri öğren, sınavları geç","Temel dersler","Bilimler","Beşeri bilimler",
    "Bilgisayar meslekleri","İleri teknolojiler","Dinle","Durdur","İleri",
    "Geri","Sınavı başlat","ders","tamamlandı","İpucu al",
    "Açıklama","Soru","Kontrol","Çıkış","Tebrikler",
    "Tekrar dene","Sınavı başarıyla geçtiniz","Sonraki ders için %60+ gerekli","Tamamlanan dersler","Üst üste gün",
    "Puanlar","İstatistiklerim","Başarılar","Çalışıldı","Favoriler",
    "Yer imleri","Ayarlar","Tema","Açık","Koyu",
    "Otomatik","Yazı tipi boyutu","Küçük","Orta","Büyük",
    "Günlük hedef","Dil","Varsayılan öğrenme modu","Koyu tema akşam çalışması için daha iyidir. Görme için büyük yazı tipi.","Okul",
    "Üniversite","Kolay dersler, renkli ve etkileşimli","Detaylı kitap, 100+ sayfa, testlerle","Rehberler","Site nasıl kullanılır",
    "Nasıl başlanır","Sitedeki ilk adımlar","Okul ve Üniversite","İki öğrenme modu","Dersleri dinle",
    "Sesli okuma","İstatistikleri paylaş","İlerlemeni arkadaşlarına gönder","Dışa / İçe aktar","Dosya tabanlı veri yedekleme",
    "200+ dil","Site dilini değiştir","Başarılar","Diğer katılımcılarla yarış","Tüm rehberler",
    "Ana sayfa","Canlı demo","Adım","DIŞA AKTAR","İÇE AKTAR",
    "Profilim","Profili paylaş","Dersleri ara...","Tümü","Tamamlanan",
    "Mevcut","Kilitli","Favoriler","Günlük hedef","Son görüntülenen",
    "Öğrenmeye devam et","Baştan başla","Verileri paylaş","Dersler","Başarılarım",
    "Tüm ilerlemeyi silmek istediğinizden emin misiniz?","🎉 Tebrikler! Bugünün hedefine ulaşıldı!","Bugünün hedefine ulaşmak için {n} ders kaldı","Kitap","Bölüm",
    "Sayfa","Test","Geçme eşiği: %51","Sonraki bölüm","© AWESchool Tüm hakları saklıdır",
    "Öğren, oyna, büyü","İstatistikler","Tamamlanan dersler","Üst üste gün","Puanlar",
    "Başarılar","Toplam dersler","Çalışma süresi","Ekran görüntüsü oluşturuluyor...","İstatistikler kopyalandı!",
    "İstatistikleri paylaş","Ses Google TTS ile çalışıyor","Mevcut motor","Sesi test et","Ses seç",
    "Hız","Perde","Ses seviyesi","Metin Google TTS tarafından okunur (ücretsiz)","Veri dışa / içe aktarma",
    "Tüm verilerinizi imzalı JSON dosyası olarak indirin","Verilerinizi daha önce dışa aktarılan bir dosyadan geri yükleyin","Dosyalar AWESchool tarafından imzalanır. Sahte dosyalar reddedilir.","İçe aktarma mevcut verileri değiştirecektir.","Veriler dışa aktarıldı (imzalı dosya)",
    "Veriler dosyadan başarıyla içe aktarıldı!","Geçersiz dosya biçimi","Dosya okunamadı","Dil değiştirildi","Dil seç",
    "Dil ara...","Sonuç bulunamadı",
]

# ---------------------------------------------------------------------------
# Persian (fa)
# ---------------------------------------------------------------------------
TRANSLATIONS["fa"] = [
    "دنیای دانش","AWESchool - بازی آموزشی","خوش آمدید","نام خود را وارد کنید","شروع یادگیری",
    "ثبت نام جدید","حساب کاربری دارم — بازیابی","پلتفرم آموزشی تعاملی: 200+ درس، 10,000+ جلسه، خواندن صوتی، امتحانات.","بازیابی از فایل JSON","شخصیت خود را انتخاب کنید",
    "خوش آمدید","یک درس انتخاب کنید، دروس را یاد بگیرید، امتحانات را بگذرانید","دروس اصلی","علوم","علوم انسانی",
    "مشاغل کامپیوتری","فناوری‌های پیشرفته","گوش دادن","توقف","بعدی",
    "قبلی","شروع امتحان","درس","تکمیل شد","راهنمایی گرفتن",
    "توضیح","سوال","بررسی","خروج","تبریک",
    "دوباره امتحان کنید","شما با موفقیت امتحان را گذراندید","برای درس بعدی 60%+ لازم است","دروس تکمیل شده","روزهای متوالی",
    "امتیازات","آمار من","دستاوردها","یاد گرفته","علاقه‌مندی‌ها",
    "نشانه‌ها","تنظیمات","تم","روشن","تیره",
    "خودکار","اندازه فونت","کوچک","متوسط","بزرگ",
    "هدف روزانه","زبان","حالت یادگیری پیش‌فرض","تم تیره برای مطالعه شبانه بهتر است. فونت بزرگ برای بینایی.","مدرسه",
    "دانشگاه","درس‌های آسان، رنگارنگ و تعاملی","کتاب تفصیلی، 100+ صفحه، با آزمون‌ها","راهنماها","نحوه استفاده از سایت",
    "نحوه شروع","اولین قدم‌ها در سایت","مدرسه و دانشگاه","دو حالت یادگیری","گوش دادن به دروس",
    "خواندن صوتی","اشتراک آمار","پیشرفت خود را برای دوستان بفرستید","صادرات / واردات","پشتیبان‌گیری داده‌های مبتنی بر فایل",
    "200+ زبان","تغییر زبان سایت","دستاوردها","با دیگران رقابت کنید","همه راهنماها",
    "خانه","دموی زنده","مرحله","صادرات","واردات",
    "نمایه من","اشتراک نمایه","جستجوی دروس...","همه","تکمیل شده",
    "در دسترس","قفل شده","علاقه‌مندی‌ها","هدف روزانه","اخیراً دیده شده",
    "ادامه یادگیری","شروع دوباره","اشتراک داده‌ها","دروس","دستاوردهای من",
    "آیا مطمئنید که می‌خواهید همه پیشرفت را حذف کنید؟","🎉 تبریک! هدف امروز محقق شد!","{n} درس تا هدف امروز باقی مانده است","کتاب","فصل",
    "صفحه","آزمون","آستانه قبولی: 51%","فصل بعدی","© AWESchool تمام حقوق محفوظ است",
    "یاد بگیر، بازی کن، رشد کن","آمار","درس‌های تکمیل شده","روزهای متوالی","امتیازات",
    "دستاوردها","کل دروس","زمان مطالعه","در حال ایجاد اسکرین‌شات...","آمار کپی شد!",
    "اشتراک آمار","صدا از طریق Google TTS کار می‌کند","موتور فعلی","تست صدا","انتخاب صدا",
    "سرعت","زیر و بم","حجم","متن توسط Google TTS خوانده می‌شود (رایگان)","صادرات / واردات داده‌ها",
    "همه داده‌های خود را به عنوان فایل JSON امضا شده دانلود کنید","داده‌های خود را از یک فایل صادر شده قبلی بازیابی کنید","فایل‌ها توسط AWESchool امضا شده‌اند. فایل‌های جعلی رد خواهند شد.","واردات داده‌های فعلی را جایگزین خواهد کرد.","داده‌ها صادر شدند (فایل امضا شده)",
    "داده‌ها با موفقیت از فایل وارد شدند!","فرمت فایل نامعتبر","خواندن فایل ناموفق بود","زبان تغییر کرد","انتخاب زبان",
    "جستجوی زبان...","نتیجه‌ای یافت نشد",
]

# ---------------------------------------------------------------------------
# Hindi (hi)
# ---------------------------------------------------------------------------
TRANSLATIONS["hi"] = [
    "ज्ञान की दुनिया","AWESchool - शैक्षिक खेल","स्वागत है","अपना नाम दर्ज करें","सीखना शुरू करें",
    "नया पंजीकरण","मेरे पास पहले से खाता है — पुनर्स्थापित करें","इंटरैक्टिव शैक्षिक प्लेटफ़ॉर्म: 200+ विषय, 10,000+ पाठ, आवाज़ पढ़ना, परीक्षा।","JSON फ़ाइल से पुनर्स्थापित करें","अपना चरित्र चुनें",
    "स्वागत है","एक विषय चुनें, पाठ सीखें, परीक्षा पास करें","मुख्य विषय","विज्ञान","मानविकी",
    "कंप्यूटर पेशे","उन्नत तकनीक","सुनें","रोकें","अगला",
    "पिछला","परीक्षा शुरू करें","पाठ","पूर्ण","संकेत प्राप्त करें",
    "व्याख्या","प्रश्न","जाँच करें","बाहर","बधाई हो",
    "पुनः प्रयास करें","आपने परीक्षा सफलतापूर्वक पास कर ली","अगले पाठ के लिए 60%+ आवश्यक","पूर्ण पाठ","लगातार दिन",
    "अंक","मेरे आँकड़े","उपलब्धियाँ","अध्ययन किया","पसंदीदा",
    "बुकमार्क","सेटिंग्स","थीम","हल्का","गहरा",
    "स्वचालित","फ़ॉन्ट आकार","छोटा","मध्यम","बड़ा",
    "दैनिक लक्ष्य","भाषा","डिफ़ॉल्ट सीखने का मोड","गहरा थीम शाम के अध्ययन के लिए बेहतर है। दृष्टि के लिए बड़ा फ़ॉन्ट।","स्कूल",
    "विश्वविद्यालय","आसान पाठ, रंगीन और इंटरैक्टिव","विस्तृत पुस्तक, 100+ पृष्ठ, परीक्षणों के साथ","गाइड","साइट का उपयोग कैसे करें",
    "कैसे शुरू करें","साइट पर पहले कदम","स्कूल और विश्वविद्यालय","दो सीखने के मोड","पाठ सुनें",
    "आवाज़ पढ़ना","आँकड़े साझा करें","अपनी प्रगति दोस्तों को भेजें","निर्यात / आयात","फ़ाइल आधारित डेटा बैकअप",
    "200+ भाषाएँ","साइट की भाषा बदलें","उपलब्धियाँ","अन्य प्रतिभागियों के साथ प्रतिस्पर्धा करें","सभी गाइड",
    "मुख्य","लाइव डेमो","चरण","निर्यात","आयात",
    "मेरी प्रोफ़ाइल","प्रोफ़ाइल साझा करें","पाठ खोजें...","सभी","पूर्ण",
    "उपलब्ध","बंद","पसंदीदा","दैनिक लक्ष्य","हाल ही में देखे गए",
    "सीखना जारी रखें","फिर से शुरू करें","डेटा साझा करें","विषय","मेरी उपलब्धियाँ",
    "क्या आप सुनिश्चित हैं कि सभी प्रगति को हटाना चाहते हैं?","🎉 बधाई हो! आज का लक्ष्य प्राप्त हो गया!","आज के लक्ष्य तक पहुँचने के लिए {n} पाठ शेष हैं","पुस्तक","अध्याय",
    "पृष्ठ","परीक्षण","उत्तीर्त सीमा: 51%","अगला अध्याय","© AWESchool सर्वाधिकार सुरक्षित",
    "सीखें, खेलें, बढ़ें","आँकड़े","पूर्ण पाठ","लगातार दिन","अंक",
    "उपलब्धियाँ","कुल पाठ","अध्ययन समय","स्क्रीनशॉट बना रहा है...","आँकड़े कॉपी हो गए!",
    "आँकड़े साझा करें","आवाज़ Google TTS के माध्यम से काम करती है","वर्तमान इंजन","आवाज़ परीक्षण","आवाज़ चुनें",
    "गति","पिच","वॉल्यूम","पाठ Google TTS द्वारा पढ़ा जाता है (मुफ़्त)","डेटा निर्यात / आयात",
    "अपना सभी डेटा हस्ताक्षरित JSON फ़ाइल के रूप में डाउनलोड करें","पहले निर्यात की गई फ़ाइल से अपना डेटा पुनर्स्थापित करें","फ़ाइलें AWESchool द्वारा हस्ताक्षरित हैं। जाली फ़ाइलें अस्वीकार कर दी जाएंगी।","आयात वर्तमान डेटा को प्रतिस्थापित करेगा।","डेटा निर्यात किया गया (हस्ताक्षरित फ़ाइल)",
    "फ़ाइल से डेटा सफलतापूर्वक आयात किया गया!","अमान्य फ़ाइल प्रारूप","फ़ाइल पढ़ने में विफल","भाषा बदली गई","भाषा चुनें",
    "भाषा खोजें...","कोई परिणाम नहीं मिला",
]

# ---------------------------------------------------------------------------
# Ukrainian (uk)
# ---------------------------------------------------------------------------
TRANSLATIONS["uk"] = [
    "Світ Знань","AWESchool - Освітня Гра","Ласкаво просимо","Введіть ваше ім'я","Почати навчання",
    "Нова реєстрація","Вже маю акаунт — Відновити","Інтерактивна освітня платформа: 200+ предметів, 10 000+ уроків, читання голосом, іспити.","Відновити з JSON файлу","Обери свого персонажа",
    "Ласкаво просимо","Оберіть предмет, вивчайте уроки, складайте іспити","Основні предмети","Науки","Гуманітарні предмети",
    "Комп'ютерні професії","Передові технології","Слухати","Стоп","Далі",
    "Назад","Почати іспит","уроків","завершено","Отримати підказку",
    "Пояснення","Питання","Перевірити","Вихід","Вітаємо",
    "Спробуйте знову","Ви успішно склали іспит","Потрібно 60%+ для наступного уроку","Завершених уроків","Днів поспіль",
    "Очки","Моя статистика","Досягнення","Вивчено","Обране",
    "Закладки","Налаштування","Тема","Світла","Темна",
    "Авто","Розмір шрифту","Маленький","Середній","Великий",
    "Денна ціль","Мова","Основний режим навчання","Темна тема зручніша для вечірнього навчання. Великий шрифт для зору.","Шкільний",
    "Університетський","Легкі уроки, барвистий та інтерактивний","Детальна книга, 100+ сторінок, з тестами","Посібники","Як користуватися сайтом",
    "Як почати","Перші кроки на сайті","Шкільний та Університетський","Два режими навчання","Слухати уроки",
    "Читання голосом","Поділитися статистикою","Надішліть свій прогрес друзям","Експорт / Імпорт","Резервне копіювання даних у файл",
    "200+ мов","Змінити мову сайту","Досягнення","Змагайтеся з іншими учасниками","Всі посібники",
    "Головна","Жива демонстрація","Крок","ЕКСПОРТ","ІМПОРТ",
    "Мій профіль","Поділитися профілем","Пошук уроків...","Всі","Завершені",
    "Доступні","Заблоковані","Обране","Денна ціль","Нещодавно переглянуті",
    "Продовжити навчання","Почати заново","Поділитися даними","Предмети","Мої досягнення",
    "Ви впевнені, що хочете видалити весь прогрес?","🎉 Вітаємо! Денну ціль досягнуто!","Залишилось {n} уроків до цілі","Книга","Розділ",
    "Сторінка","Тест","Прохідний бал: 51%","Наступний розділ","© AWESchool Всі права захищені",
    "Вчися, грай, розвивайся","Статистика","Завершених уроків","Днів поспіль","Очки",
    "Досягнення","Всього уроків","Час навчання","Створюється скріншот...","Статистику скопійовано!",
    "Поділитися статистикою","Голос працює через Google TTS","Поточний рушій","Перевірити голос","Обрати голос",
    "Швидкість","Висота голосу","Гучність","Текст читається через Google TTS (безкоштовно)","Експорт / імпорт даних",
    "Завантажте всі свої дані як підписаний JSON файл","Відновіть свої дані з раніше експортованого файлу","Файли підписані AWESchool. Підроблені файли не приймаються.","Імпорт замінить поточні дані.","Дані експортовано (підписаний файл)",
    "Дані успішно імпортовано з файлу!","Невірний формат файлу","Не вдалося прочитати файл","Мову змінено","Обрати мову",
    "Пошук мови...","Результатів не знайдено",
]

# ---------------------------------------------------------------------------
# Polish (pl)
# ---------------------------------------------------------------------------
TRANSLATIONS["pl"] = [
    "Świat Wiedzy","AWESchool - Gra Edukacyjna","Witamy","Wpisz swoje imię","Rozpocznij naukę",
    "Nowa rejestracja","Mam już konto — Przywróć","Interaktywna platforma edukacyjna: 200+ przedmiotów, 10 000+ lekcji, czytanie głosowe, egzaminy.","Przywróć z pliku JSON","Wybierz swoją postać",
    "Witamy","Wybierz przedmiot, ucz się lekcji, zdawaj egzaminy","Główne przedmioty","Nauki","Przedmioty humanistyczne",
    "Zawody komputerowe","Zaawansowane technologie","Słuchaj","Stop","Następny",
    "Poprzedni","Rozpocznij egzamin","lekcji","ukończone","Uzyskaj podpowiedź",
    "Wyjaśnienie","Pytanie","Sprawdź","Wyjście","Gratulacje",
    "Spróbuj ponownie","Zdałeś egzamin pomyślnie","Potrzeba 60%+ do następnej lekcji","Ukończone lekcje","Dni z rzędu",
    "Punkty","Moje statystyki","Osiągnięcia","Nauczono się","Ulubione",
    "Zakładki","Ustawienia","Motyw","Jasny","Ciemny",
    "Auto","Rozmiar czcionki","Mały","Średni","Duży",
    "Dzienny cel","Język","Domyślny tryb nauki","Ciemny motyw jest lepszy do wieczornej nauki. Duża czcionka dla wzroku.","Szkoła",
    "Uniwersytet","Łatwe lekcje, kolorowe i interaktywne","Szczegółowa książka, 100+ stron, z testami","Przewodniki","Jak korzystać z serwisu",
    "Jak zacząć","Pierwsze kroki w serwisie","Szkoła i Uniwersytet","Dwa tryby nauki","Słuchaj lekcji",
    "Czytanie głosem","Udostępnij statystyki","Wyślij swój postęp znajomym","Eksport / Import","Kopia zapasowa oparta na plikach",
    "200+ języków","Zmień język serwisu","Osiągnięcia","Rywalizuj z innymi uczestnikami","Wszystkie przewodniki",
    "Strona główna","Pokaz na żywo","Krok","EKSPORT","IMPORT",
    "Mój profil","Udostępnij profil","Szukaj lekcji...","Wszystkie","Ukończone",
    "Dostępne","Zablokowane","Ulubione","Dzienny cel","Ostatnio oglądane",
    "Kontynuuj naukę","Zacznij od nowa","Udostępnij dane","Przedmioty","Moje osiągnięcia",
    "Czy na pewno chcesz usunąć cały postęp?","🎉 Gratulacje! Dzisiejszy cel osiągnięty!","Pozostało {n} lekcji do dzisiejszego celu","Książka","Rozdział",
    "Strona","Test","Próg zdawalności: 51%","Następny rozdział","© AWESchool Wszelkie prawa zastrzeżone",
    "Ucz się, graj, rozwijaj się","Statystyki","Ukończone lekcje","Dni z rzędu","Punkty",
    "Osiągnięcia","Razem lekcji","Czas nauki","Tworzenie zrzutu ekranu...","Statystyki skopiowane!",
    "Udostępnij statystyki","Głos działa przez Google TTS","Bieżący silnik","Przetestuj głos","Wybierz głos",
    "Prędkość","Wysokość","Głośność","Tekst jest czytany przez Google TTS (za darmo)","Eksport / import danych",
    "Pobierz wszystkie swoje dane jako podpisany plik JSON","Przywróć swoje dane z wcześniej wyeksportowanego pliku","Pliki są podpisane przez AWESchool. Sfałszowane pliki zostaną odrzucone.","Import zastąpi bieżące dane.","Dane wyeksportowane (podpisany plik)",
    "Dane pomyślnie zaimportowane z pliku!","Nieprawidłowy format pliku","Nie udało się odczytać pliku","Język zmieniony","Wybierz język",
    "Szukaj języka...","Nie znaleziono wyników",
]

# ---------------------------------------------------------------------------
# Dutch (nl)
# ---------------------------------------------------------------------------
TRANSLATIONS["nl"] = [
    "Wereld van Kennis","AWESchool - Educatief Spel","Welkom","Voer je naam in","Begin met leren",
    "Nieuwe registratie","Ik heb al een account — Herstellen","Interactief educatief platform: 200+ vakken, 10.000+ lessen, voorlezen, examens.","Herstellen vanuit JSON-bestand","Kies je personage",
    "Welkom","Kies een vak, leer lessen, sla examens af","Hoofdvakken","Wetenschappen","Geesteswetenschappen",
    "Computerberoepen","Geavanceerde technologieën","Luister","Stop","Volgende",
    "Vorige","Examen starten","lessen","voltooid","Hint krijgen",
    "Uitleg","Vraag","Controleren","Afsluiten","Gefeliciteerd",
    "Probeer opnieuw","Je bent geslaagd voor het examen","60%+ nodig voor de volgende les","Voltooide lessen","Aaneengesloten dagen",
    "Punten","Mijn statistieken","Prestaties","Gestudeerd","Favorieten",
    "Bladwijzers","Instellingen","Thema","Licht","Donker",
    "Auto","Lettergrootte","Klein","Gemiddeld","Groot",
    "Dagelijks doel","Taal","Standaardleermodus","Donker thema is beter voor avondstudie. Groot lettertype voor het zicht.","School",
    "Universiteit","Eenvoudige lessen, kleurrijk en interactief","Gedetailleerd boek, 100+ pagina's, met tests","Handleidingen","De site gebruiken",
    "Hoe te beginnen","Eerste stappen op de site","School en Universiteit","Twee leermodi","Naar lessen luisteren",
    "Voorlezen","Statistieken delen","Stuur je voortgang naar vrienden","Exporteren / Importeren","Bestandsgebaseerde gegevensback-up",
    "200+ talen","Sitetaal wijzigen","Prestaties","Concureer met andere deelnemers","Alle handleidingen",
    "Home","Live demo","Stap","EXPORTEREN","IMPORTEREN",
    "Mijn profiel","Profiel delen","Lessen zoeken...","Alle","Voltooid",
    "Beschikbaar","Vergrendeld","Favorieten","Dagelijks doel","Onlangs bekeken",
    "Doorgaan met leren","Opnieuw beginnen","Gegevens delen","Vakken","Mijn prestaties",
    "Weet je zeker dat je alle voortgang wilt verwijderen?","🎉 Gefeliciteerd! Het doel van vandaag is bereikt!","Nog {n} lessen tot het doel van vandaag","Boek","Hoofdstuk",
    "Pagina","Test","Slagingsdrempel: 51%","Volgend hoofdstuk","© AWESchool Alle rechten voorbehouden",
    "Leer, speel, groei","Statistieken","Voltooide lessen","Aaneengesloten dagen","Punten",
    "Prestaties","Totaal lessen","Leertijd","Schermafbeelding maken...","Statistieken gekopieerd!",
    "Statistieken delen","Stem werkt via Google TTS","Huidige engine","Stem testen","Stem selecteren",
    "Snelheid","Toonhoogte","Volume","Tekst wordt voorgelezen door Google TTS (gratis)","Gegevens exporteren / importeren",
    "Download al je gegevens als een ondertekend JSON-bestand","Herstel je gegevens vanuit een eerder geëxporteerd bestand","Bestanden zijn ondertekend door AWESchool. Vervalste bestanden worden geweigerd.","Importeren vervangt huidige gegevens.","Gegevens geëxporteerd (ondertekend bestand)",
    "Gegevens succesvol geïmporteerd uit bestand!","Ongeldig bestandsformaat","Bestand lezen mislukt","Taal gewijzigd","Taal selecteren",
    "Taal zoeken...","Geen resultaten gevonden",
]

# ---------------------------------------------------------------------------
# Generate the .ts files
# ---------------------------------------------------------------------------

def quote(s: str) -> str:
    s = s.replace("\\", "\\\\").replace("'", "\\'")
    return f"'{s}'"

for code, values in TRANSLATIONS.items():
    assert len(values) == len(KEYS), f"{code}: expected {len(KEYS)} values, got {len(values)}"
    lines = []
    lines.append(f"// {code} - UI translations (hand-curated)")
    lines.append("")
    lines.append(f"export const {code}: Record<string, string> = {{")
    for k, v in zip(KEYS, values):
        lines.append(f"  {quote(k)}: {quote(v)},")
    lines.append("}")
    lines.append("")
    (OUT_DIR / f"{code}.ts").write_text("\n".join(lines), encoding="utf-8")
    print(f"  ✓ {code}.ts ({len(values)} keys)")

print(f"\n✓ Generated {len(TRANSLATIONS)} hand-curated translation files")
