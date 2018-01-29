const spanWords = (() => {
    const TRANS_FROM = document.getElementById('from_text');
    const TRANS_TO = document.getElementById('to_text');
    const CHANGE_LANG = document.getElementById('change_lang');
    const SELECT_FROM = document.getElementById('from_lang');
    const SELECT_TO = document.getElementById('to_lang');
    const API_INFO = {
        key : 'trnsl.1.1.20180125T200236Z.1de9e5f4bbc8435d.df975111ac09c6de3edb42b82a1a68b2c1361c6a',
        apiLang: 'https://translate.yandex.net/api/v1.5/tr.json/getLangs',
        apiTrans: 'https://translate.yandex.net/api/v1.5/tr.json/translate'
    }
    
    function translateText() {
        const sourceText = TRANS_FROM.value;
        const sourceLang = SELECT_FROM.options[SELECT_FROM.selectedIndex].value;
        const targetLang = SELECT_TO.options[SELECT_TO.selectedIndex].value;
        const url = API_INFO.apiTrans + '?'
                  + '&key=' + API_INFO.key
                  + '&text=' + sourceText
                  + '&lang=' + sourceLang + '-' + targetLang
                  + '&format=plain'
        fetch(url)
            .then((resp) => {
                return resp.json()
            })
            .then((data) => {
                TRANS_TO.innerText = data.text[0];
            }) 
            .catch(error => {
                alert('Введите коректные данные или перезагрузите страницу'); 
            });
    }
    
    function initSelects(){
        CHANGE_LANG.addEventListener('click', swapLang, false);
        cleanField();
        const autoLang = 'ru';
        const url = API_INFO.apiLang + '?' 
                + '&key=' + API_INFO.key 
                + '&ui=' + autoLang;
        fetch(url)
            .then((resp) => {
                return resp.json()
            })
            .then(({langs}) => {
                loadSelects(langs)
            })
            .catch(error => {
                alert('not found'); 
            });
    }
    
    function swapLang(){
        const a = document.querySelectorAll('#from_lang option');
        const b = document.querySelectorAll('#to_lang option');
        const A = SELECT_FROM.options[SELECT_FROM.selectedIndex];
        const B = SELECT_TO.options[SELECT_TO.selectedIndex];
        swapOption(a, B);
        swapOption(b, A);
        
    }
    
    function swapOption(mas, sel){
        for (var i = 0; i < mas.length; ++i) {
            if (mas[i].value == sel.value){
                mas[i].selected = true;
                break;
            }
        }
    }
    
    function cleanField(){
        let btn = document.createElement('span');
        btn.innerHTML = '<b>x</b>';
        document.getElementsByClassName('main')[0].insertBefore(btn, TRANS_FROM.nextSibling);
        btn.addEventListener('click', function() {
            TRANS_FROM.value = '';
        }, false);
    };
    
    function loadSelects(lang) {
        const selectOut = selectPrint.bind(lang);
        selectOut(SELECT_FROM);
        selectOut(SELECT_TO);
    }
    
    function selectPrint(select) {
        let out = "";
            for (var key in this){
                out += `<option value="${key}">${this[key]}</option>`;
            }
        select.innerHTML = out;
    }
    
    
    return {
        translate: function(){
            translateText();
        },
        selects: function() {
            initSelects();
        }
    }
})();

window.addEventListener('load', function() {
    spanWords.selects();
}, false)

document.getElementById('translate').addEventListener('click', function(){
    spanWords.translate();
}, false);