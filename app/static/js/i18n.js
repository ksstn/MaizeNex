(() => {
    const STORAGE_KEY = 'maizenexLang';
    const translations = {
        tl: {
            'language.change': 'Palitan ang wika',
            'notification.toggle': 'Buksan ang mga abiso',
            'nav.home': 'Home',
            'nav.community': 'Komunidad',
            'nav.facts': 'Kaalaman',
            'nav.me': 'Ako',
            'home.weather.loading': 'Naglo-load ang panahon...',
            'home.history.title': 'Kasaysayan',
            'home.history.view_all': 'Tingnan Lahat',
            'home.history.item_1': 'Suri sa panahon - New York',
            'home.history.time_1': '2 oras ang nakalipas',
            'home.history.item_2': 'Suri sa panahon - London',
            'home.history.time_2': '1 araw ang nakalipas',
            'home.history.item_3': 'Suri sa panahon - Tokyo',
            'home.history.time_3': '3 araw ang nakalipas',
            'weather.error': 'Hindi makuha ang datos ng panahon.',
            'weather.condition.sunny': 'Maaraw',
            'weather.condition.cloudy': 'Maulap',
            'weather.condition.raining': 'Umuulan',
            'weather.wind': 'Hangin',
            'weather.humidity': 'Halumigmig',
            'scanner.instruction': 'Iposisyon ang dahon ng mais sa scanner frame',
            'scanner.result.title': 'Resulta ng Pagsusuri',
            'scanner.section.diagnosis': 'Diyagnosis',
            'scanner.section.severity': 'Pagtataya ng Tindi',
            'scanner.section.recommendation': 'Rekomendasyon',
            'scanner.section.solution': 'Solusyon',
            'scanner.action.scan_again': 'Mag-scan muli?',
            'scanner.action.close': 'Isara',
            'scanner.status.analyzing': 'Sinusuri ang sustansiya ng dahon...',
            'scanner.error.camera': 'Hindi ma-access ang camera. Pakisuri ang pahintulot.',
            'scanner.analysis.nitrogen.diagnosis': 'Natukoy ang kakulangan sa nitrogen',
            'scanner.analysis.nitrogen.severity': 'Katamtaman - May paninilaw sa gilid ng dahon',
            'scanner.analysis.nitrogen.recommendation': 'Maglagay agad ng patabang mayaman sa nitrogen',
            'scanner.analysis.nitrogen.solution': 'Gumamit ng urea (46-0-0) na 50kg/ha o ammonium nitrate. Diligan pagkatapos at obserbahan ang pagbabago sa loob ng 7-10 araw.',
            'scanner.analysis.healthy.diagnosis': 'Malusog ang dahon - sapat ang sustansiya',
            'scanner.analysis.healthy.severity': 'Wala - nasa maayos na kondisyon ang halaman',
            'scanner.analysis.healthy.recommendation': 'Ipagpatuloy ang kasalukuyang programa ng pataba',
            'scanner.analysis.healthy.solution': 'Panatilihin ang balanseng NPK na pataba. Magsagawa ng soil test tuwing 3 buwan.',
            'scanner.analysis.phosphorus.diagnosis': 'Natukoy ang kakulangan sa phosphorus',
            'scanner.analysis.phosphorus.severity': 'Bahagya hanggang katamtaman - may pagkaantala sa paglaki',
            'scanner.analysis.phosphorus.recommendation': 'Maglagay ng patabang may phosphorus',
            'scanner.analysis.phosphorus.solution': 'Gumamit ng triple superphosphate (0-46-0) na 40kg/ha. Ikalat sa paligid ng ugat at ihalo sa lupa.',
            'scanner.analysis.potassium.diagnosis': 'Natukoy ang kakulangan sa potassium',
            'scanner.analysis.potassium.severity': 'Katamtaman - may pangingitim sa gilid ng dahon',
            'scanner.analysis.potassium.recommendation': 'Maglagay ng patabang may potassium',
            'scanner.analysis.potassium.solution': 'Gumamit ng potassium chloride (0-0-60) na 30kg/ha bilang side dressing. Iwasan sa lupa na sensitibo sa chloride.',
            'scanner.analysis.magnesium.diagnosis': 'Natukoy ang kakulangan sa magnesium',
            'scanner.analysis.magnesium.severity': 'Bahagya - may pamumutla sa pagitan ng ugat ng dahon',
            'scanner.analysis.magnesium.recommendation': 'Maglagay ng magnesium supplement',
            'scanner.analysis.magnesium.solution': 'Gumamit ng Epsom salt (magnesium sulfate) foliar spray na 2% solusyon. Para sa lupa, gumamit ng dolomite lime na 100kg/ha.',
            'community.create_post': 'Gumawa ng post',
            'community.create_post_title': 'Gumawa ng Post',
            'community.create_post_subtitle': 'Ibahagi sa komunidad',
            'community.create_post_placeholder': 'Ibahagi ang update mo...',
            'community.create_post_add_photo': 'Magdagdag ng Larawan',
            'community.create_post_cancel': 'Kanselahin',
            'community.create_post_post': 'I-post',
            'community.seed.post_1': 'Ibinabahagi ko ang update sa paglago ng mais matapos gumamit ng patabang may nitrogen.',
            'community.seed.post_2': 'May tips ba sa maagang palatandaan ng kakulangan sa phosphorus?',
            'community.seed.comment_1': 'Ang ganda ng progreso!',
            'community.seed.comment_2': 'Mukhang malusog.',
            'community.seed.comment_3': 'Tingnan kung may pagkaantala sa paglaki.',
            'community.post.image_alt': 'Larawan ng post',
            'community.post.menu': 'Menu ng post',
            'community.post.edit': 'I-edit',
            'community.post.delete': 'Tanggalin',
            'community.post.likes': 'Like',
            'community.post.comments': 'Komento',
            'community.post.like': 'Like',
            'community.post.comment': 'Magkomento',
            'community.post.edit_prompt': 'I-edit ang post mo:',
            'community.post.you': 'Ikaw',
            'community.post.photo_only': 'Nagbahagi ng larawan.',
            'community.comment.placeholder': 'Sumulat ng komento...',
            'community.comments.more': 'Tingnan pa ({count})',
            'community.comments.less': 'Bawasan',
            'notification.header': 'Mga Abiso',
            'notification.empty': 'Wala pang abiso.',
            'notification.photo': '{author} nagbahagi ng update na larawan',
            'notification.thought': '{author} nagbahagi ng saloobin',
            'notification.post': '{author} nagbahagi ng post',
            'notification.like': '{author} nag-like sa post mo',
            'notification.comment': '{author} nagkomento sa post mo',
            'notification.someone': 'May isang tao',
            'notification.unavailable': 'Hindi na available ang post.',
            'time.just_now': 'Ngayon lang',
            'time.yesterday': 'Kahapon',
            'time.hours_ago': '{count} oras ang nakalipas',
            'time.days_ago': '{count} araw ang nakalipas',
            'index.welcome': 'Maligayang pagdating sa',
            'index.body': 'Isang mabilis at praktikal na katulong para sa pagsubaybay ng panahon at kalagayan ng dahon ng mais.',
            'index.start': 'I-tap para magsimula',
            'login.welcome': 'Maligayang pagdating sa',
            'login.title': 'MaizeNex',
            'login.heading': 'Mag-log in sa iyong Account',
            'login.email': 'Email Address',
            'login.password': 'Password',
            'login.remember': 'Tandaan ako',
            'login.forgot': 'Nakalimutan ang password?',
            'login.button': 'Mag-log in',
            'login.no_account': 'Wala ka pang account?',
            'login.signup': 'Mag-sign up',
            'create.welcome': 'Maligayang pagdating sa',
            'create.account': 'Gumawa ng Account',
            'create.full_name': 'Buong Pangalan',
            'create.first_name': 'Pangalan',
            'create.last_name': 'Apelyido',
            'create.email': 'Email Address',
            'create.contact': 'Numero ng Contact',
            'create.address': 'Tirahan',
            'create.barangay': 'Barangay',
            'create.city': 'Lungsod/Munisipyo',
            'create.street': 'Street Address, Building, at iba pa',
            'create.gender': 'Kasarian',
            'create.gender_select': 'Pumili ng Kasarian',
            'create.gender_male': 'Lalaki',
            'create.gender_female': 'Babae',
            'create.password': 'Password',
            'create.confirm_password': 'Kumpirmahin ang Password',
            'create.terms_label': 'Sumasang-ayon ako sa',
            'create.terms_link': 'mga termino at kundisyon',
            'create.terms_reminder': 'Paki-check ang kahon upang makapagpatuloy sa paggawa ng account.',
            'create.modal_title': 'Mga Termino at Kundisyon',
            'create.modal_body': 'Ito ay halimbawa lamang ng nilalaman para sa mga termino at kundisyon.',
            'create.button': 'Gumawa ng Account',
            'create.have_account': 'May account na ako',
            'create.sign_in': 'Mag-sign in'
        },
        en: {
            'language.change': 'Change language',
            'notification.toggle': 'Toggle notifications',
            'nav.home': 'Home',
            'nav.community': 'Comm',
            'nav.facts': 'Facts',
            'nav.me': 'Me',
            'home.weather.loading': 'Loading weather...',
            'home.history.title': 'History',
            'home.history.view_all': 'View All',
            'home.history.item_1': 'Weather check - New York',
            'home.history.time_1': '2 hours ago',
            'home.history.item_2': 'Weather check - London',
            'home.history.time_2': '1 day ago',
            'home.history.item_3': 'Weather check - Tokyo',
            'home.history.time_3': '3 days ago',
            'weather.error': 'Error fetching weather data.',
            'weather.condition.sunny': 'Sunny',
            'weather.condition.cloudy': 'Cloudy',
            'weather.condition.raining': 'Raining',
            'weather.wind': 'Wind',
            'weather.humidity': 'Humidity',
            'scanner.instruction': 'Position corn leaf within the scanner frame',
            'scanner.result.title': 'Analysis Result',
            'scanner.section.diagnosis': 'Diagnosis',
            'scanner.section.severity': 'Severity Assessment',
            'scanner.section.recommendation': 'Recommendation',
            'scanner.section.solution': 'Solution',
            'scanner.action.scan_again': 'Scan again?',
            'scanner.action.close': 'Close',
            'scanner.status.analyzing': 'Analyzing leaf nutrients...',
            'scanner.error.camera': 'Unable to access camera. Please check permissions.',
            'scanner.analysis.nitrogen.diagnosis': 'Nitrogen deficiency detected',
            'scanner.analysis.nitrogen.severity': 'Moderate - Leaf shows yellowing at edges',
            'scanner.analysis.nitrogen.recommendation': 'Apply nitrogen-rich fertilizer immediately',
            'scanner.analysis.nitrogen.solution': 'Use urea (46-0-0) at 50kg/ha or ammonium nitrate. Water thoroughly after application. Monitor improvement in 7-10 days.',
            'scanner.analysis.healthy.diagnosis': 'Healthy leaf - optimal nutrients',
            'scanner.analysis.healthy.severity': 'None - Plant is in excellent condition',
            'scanner.analysis.healthy.recommendation': 'Continue current fertilization program',
            'scanner.analysis.healthy.solution': 'Maintain balanced NPK fertilization. Regular soil testing recommended every 3 months.',
            'scanner.analysis.phosphorus.diagnosis': 'Phosphorus deficiency detected',
            'scanner.analysis.phosphorus.severity': 'Mild to Moderate - Stunted growth observed',
            'scanner.analysis.phosphorus.recommendation': 'Apply phosphorus fertilizer',
            'scanner.analysis.phosphorus.solution': 'Apply triple superphosphate (0-46-0) at 40kg/ha. Incorporate into soil around root zone. Best applied during planting.',
            'scanner.analysis.potassium.diagnosis': 'Potassium deficiency detected',
            'scanner.analysis.potassium.severity': 'Moderate - Leaf margins browning',
            'scanner.analysis.potassium.recommendation': 'Apply potassium-rich fertilizer',
            'scanner.analysis.potassium.solution': 'Use potassium chloride (0-0-60) at 30kg/ha. Apply as side dressing. Avoid chloride-sensitive soils.',
            'scanner.analysis.magnesium.diagnosis': 'Magnesium deficiency detected',
            'scanner.analysis.magnesium.severity': 'Mild - Interveinal chlorosis visible',
            'scanner.analysis.magnesium.recommendation': 'Apply magnesium supplement',
            'scanner.analysis.magnesium.solution': 'Apply Epsom salt (magnesium sulfate) foliar spray at 2% solution. For soil application, use dolomite lime at 100kg/ha.',
            'community.create_post': 'Create a post',
            'community.create_post_title': 'Create Post',
            'community.create_post_subtitle': 'Share to the community',
            'community.create_post_placeholder': 'Share your update...',
            'community.create_post_add_photo': 'Add Photo',
            'community.create_post_cancel': 'Cancel',
            'community.create_post_post': 'Post',
            'community.seed.post_1': 'Sharing my corn growth update after applying nitrogen-rich fertilizer.',
            'community.seed.post_2': 'Any tips for spotting early signs of phosphorus deficiency?',
            'community.seed.comment_1': 'Great progress!',
            'community.seed.comment_2': 'Looks healthy.',
            'community.seed.comment_3': 'Check for stunted growth.',
            'community.post.image_alt': 'Post image',
            'community.post.menu': 'Post menu',
            'community.post.edit': 'Edit',
            'community.post.delete': 'Delete',
            'community.post.likes': 'Likes',
            'community.post.comments': 'Comments',
            'community.post.like': 'Like',
            'community.post.comment': 'Comment',
            'community.post.edit_prompt': 'Edit your post:',
            'community.post.you': 'You',
            'community.post.photo_only': 'Shared a photo update.',
            'community.comment.placeholder': 'Write a comment...',
            'community.comments.more': 'See more ({count})',
            'community.comments.less': 'See less',
            'notification.header': 'Notifications',
            'notification.empty': 'No notifications yet.',
            'notification.photo': '{author} shared a photo update',
            'notification.thought': '{author} shared a thought',
            'notification.post': '{author} shared a post',
            'notification.like': '{author} liked your post',
            'notification.comment': '{author} commented on your post',
            'notification.someone': 'Someone',
            'notification.unavailable': 'This post is unavailable.',
            'time.just_now': 'Just now',
            'time.yesterday': 'Yesterday',
            'time.hours_ago': '{count} hours ago',
            'time.days_ago': '{count} days ago',
            'index.welcome': 'Welcome to',
            'index.body': 'A fast and practical helper for monitoring weather and corn leaf health.',
            'index.start': 'Tap to start',
            'login.welcome': 'Welcome to',
            'login.title': 'MaizeNex',
            'login.heading': 'Log In to your Account',
            'login.email': 'Email Address',
            'login.password': 'Password',
            'login.remember': 'Remember me',
            'login.forgot': 'Forgot password?',
            'login.button': 'Login',
            'login.no_account': "Don't have an account?",
            'login.signup': 'Sign up',
            'create.welcome': 'Welcome to',
            'create.account': 'Create Account',
            'create.full_name': 'Full Name',
            'create.first_name': 'First Name',
            'create.last_name': 'Last Name',
            'create.email': 'Email Address',
            'create.contact': 'Contact Number',
            'create.address': 'Home Address',
            'create.barangay': 'Barangay',
            'create.city': 'City/Municipality',
            'create.street': 'Street Address, Building, etc.',
            'create.gender': 'Gender',
            'create.gender_select': 'Select Gender',
            'create.gender_male': 'Male',
            'create.gender_female': 'Female',
            'create.password': 'Password',
            'create.confirm_password': 'Confirm Password',
            'create.terms_label': 'I agree to the',
            'create.terms_link': 'terms and conditions',
            'create.terms_reminder': 'Please check this box to agree with our terms and conditions before creating your account.',
            'create.modal_title': 'Terms and Conditions',
            'create.modal_body': 'This is placeholder content for the terms and conditions modal.',
            'create.button': 'Create Account',
            'create.have_account': 'I already have an account',
            'create.sign_in': 'Sign in'
        }
    };

    function getLanguage() {
        return localStorage.getItem(STORAGE_KEY) || 'tl';
    }

    function t(key) {
        const lang = getLanguage();
        return translations[lang]?.[key] || translations.en[key] || key;
    }

    function format(key, params) {
        let value = t(key);
        if (!params) return value;
        Object.keys(params).forEach((paramKey) => {
            const matcher = new RegExp(`\\{${paramKey}\\}`, 'g');
            value = value.replace(matcher, params[paramKey]);
        });
        return value;
    }

    function applyTranslations() {
        document.querySelectorAll('[data-i18n]').forEach((element) => {
            element.textContent = t(element.dataset.i18n);
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach((element) => {
            element.setAttribute('placeholder', t(element.dataset.i18nPlaceholder));
        });

        document.querySelectorAll('[data-i18n-alt]').forEach((element) => {
            element.setAttribute('alt', t(element.dataset.i18nAlt));
        });

        document.querySelectorAll('[data-i18n-title]').forEach((element) => {
            element.setAttribute('title', t(element.dataset.i18nTitle));
        });

        document.querySelectorAll('[data-i18n-aria-label]').forEach((element) => {
            element.setAttribute('aria-label', t(element.dataset.i18nAriaLabel));
        });
    }

    function setLanguage(lang) {
        if (!translations[lang]) return;
        localStorage.setItem(STORAGE_KEY, lang);
        document.documentElement.lang = lang;
        applyTranslations();
        document.dispatchEvent(new CustomEvent('languagechange', { detail: { lang } }));
    }

    document.addEventListener('click', (event) => {
        const langButton = event.target.closest('[data-lang]');
        if (!langButton) return;
        const selectedLang = langButton.getAttribute('data-lang');
        setLanguage(selectedLang);
    });

    document.addEventListener('DOMContentLoaded', () => {
        const initialLang = getLanguage();
        if (!translations[initialLang]) {
            setLanguage('tl');
            return;
        }
        document.documentElement.lang = initialLang;
        applyTranslations();
    });

    window.i18n = {
        t,
        format,
        setLanguage,
        getLanguage,
        applyTranslations
    };
})();
