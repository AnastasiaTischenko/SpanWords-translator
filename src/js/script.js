const spanWords = (() => {
    const TRANS_FROM = document.getElementById('from_text');
    const TRANS_TO = document.getElementById('to_text');
    const API_INFO = {
        key : 'trnsl.1.1.20180125T200236Z.1de9e5f4bbc8435d.df975111ac09c6de3edb42b82a1a68b2c1361c6a',
        apiLang: 'https://translate.yandex.net/api/v1.5/tr.json/getLangs',
        apiTrans: 'https://translate.yandex.net/api/v1.5/tr.json/translate'
    }
    
    function translateText() {
        const sourceText = TRANS_FROM.value;
        const sourceLang = document.getElementById("from_lang").options[document.getElementById("from_lang").selectedIndex].value;
        const targetLang = document.getElementById("to_lang").options[document.getElementById("to_lang").selectedIndex].value;
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
    }
    
    function initSelects(){
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
    }
    
    function loadSelects(lang) {
        const selectFrom = document.getElementById('from_lang');
        const selectTo = document.getElementById('to_lang');
        const selectOut = selectPrint.bind(lang);
        selectOut(selectFrom);
        selectOut(selectTo);
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