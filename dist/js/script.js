'use strict';

var spanWords = function () {
    var TRANS_FROM = document.getElementById('from_text');
    var TRANS_TO = document.getElementById('to_text');
    var CHANGE_LANG = document.getElementById('change_lang');
    var SELECT_FROM = document.getElementById('from_lang');
    var SELECT_TO = document.getElementById('to_lang');
    var API_INFO = {
        key: 'trnsl.1.1.20180125T200236Z.1de9e5f4bbc8435d.df975111ac09c6de3edb42b82a1a68b2c1361c6a',
        apiLang: 'https://translate.yandex.net/api/v1.5/tr.json/getLangs',
        apiTrans: 'https://translate.yandex.net/api/v1.5/tr.json/translate'
    };

    function translateText() {
        var sourceText = TRANS_FROM.value;
        var sourceLang = SELECT_FROM.options[SELECT_FROM.selectedIndex].value;
        var targetLang = SELECT_TO.options[SELECT_TO.selectedIndex].value;
        var url = API_INFO.apiTrans + '?&key=' + API_INFO.key + '&text=' + sourceText + '&lang=' + sourceLang + '-' + targetLang + '&format=plain';
        fetch(url).then(function (resp) {
            return resp.json();
        }).then(function (data) {
            TRANS_TO.innerText = data.text[0];
            document.getElementsByClassName('alert')[0].innerHTML = '';
        }).catch(function (error) {
            document.getElementsByClassName('alert')[0].innerHTML = 'Введите коректные данные или перезагрузите страницу';
        });
    }

    function initSelects() {
        CHANGE_LANG.addEventListener('click', swapLang, false);
        cleanField();
        var autoLang = 'ru';
        var url = API_INFO.apiLang + '?&key=' + API_INFO.key + '&ui=' + autoLang;
        console.log(url);
        fetch(url).then(function (resp) {
            return resp.json();
        }).then(function (_ref) {
            var langs = _ref.langs;

            loadSelects(langs);
        }).catch(function (error) {
            alert('not found');
        });
    }

    function swapLang() {
        var a = document.querySelectorAll('#from_lang option');
        var b = document.querySelectorAll('#to_lang option');
        var A = SELECT_FROM.options[SELECT_FROM.selectedIndex];
        var B = SELECT_TO.options[SELECT_TO.selectedIndex];
        swapOption(a, B);
        swapOption(b, A);
    }

    function swapOption(mas, sel) {
        for (var i = 0; i < mas.length; ++i) {
            if (mas[i].value == sel.value) {
                mas[i].selected = true;
                break;
            }
        }
    }

    function cleanField() {
        var btn = document.createElement('span');
        btn.innerHTML = '<b>x</b>';
        document.getElementsByClassName('main')[0].insertBefore(btn, TRANS_FROM.nextSibling);
        btn.addEventListener('click', function () {
            TRANS_FROM.value = '';
            TRANS_TO.innerText = '';
        }, false);
    };

    function loadSelects(lang) {
        var selectOut = selectPrint.bind(lang);
        selectOut(SELECT_FROM);
        selectOut(SELECT_TO);
    }

    function selectPrint(select) {
        var out = '';
        for (var key in this) {
            out += '<option value="' + key + '">' + this[key] + '</option>';
        }
        select.innerHTML = out;
    }

    return {
        translate: function translate() {
            translateText();
        },
        selects: function selects() {
            initSelects();
        }
    };
}();

window.addEventListener('load', spanWords.selects, false);

document.getElementById('translate').addEventListener('click', spanWords.translate, false);