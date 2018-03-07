//창 크기를 검사한다
var windowWidth = $(window).width();

//하위 카테고리 목록을 json 객체로 생성한다.
var jsonlist = {
    "item_1": {
        "href": ["#", "#", "#", "#", "#", "#", "#", "#", "/index.html"],
        "list_name": ["인사말", "학교연혁", "교훈/교육지표", "학교현황", "경영중점 및 역점사업", "교직원소개", "학교홍보", "학교위치", "홈으로"]
    },
    "item_2": {
        "href": ["#", "#", "#", "#", "#", "#", "/index.html"],
        "list_name": ["학사일정", "교육과정", "클러스터교육과정", "교육계획", "학교규정", "학교운영위원회", "홈으로"]
    },
    "item_3": {
        "href": ["#", "#", "#", "#", "#", "#", "#", "#", "/index.html"],
        "list_name": ["공지사항", "가정통신문", "소식지", "동영상", "학교급식", "행정실알림", "학교알리미", "학교평가", "홈으로"]
    },
    "item_4": {
        "href": ["#", "#", "#", "#", "#", "/index.html"],
        "list_name": ["학생회", "동아리", "스포츠클럽", "학교폭력신고", "학생증발급", "홈으로"]
    },
    "item_5": {
        "href": ["#", "#", "#", "#", "#", "#", "#", "/index.html"],
        "list_name": ["자유게시판", "학부모게시판", "성적민원게시판", "행정정보공개", "행정실알림", "민원관련게시판", "학교시설개방창구", "홈으로"]
    },
    "item_6": {
        "href": ["#", "#", "#", "#", "/index.html"],
        "list_name": ["대입정보", "진로정보", "학교생활상담", "보건소식", "홈으로"]
    },
    "item_7": {
        "href": ["#", "#", "#", "/index.html"],
        "list_name": ["독서논술방", "학습자료방", "방과후학교", "홈으로"]
    },
    "item_8": {
        "href": ["#", "#", "#", "/index.html"],
        "list_name": ["공지사항", "과제연구", "활동모습", "홈으로"]
    },
    "item_9": {
        "href": ["#", "#", "#", "/index.html"],
        "list_name": ["백운학사소개", "알림마당", "생활모습", "홈으로"]
    },
    "item_10": {
        "href": ["#", "#", "#", "#", "#", "#", "/index.html"],
        "list_name": ["예결산현황", "업무추진비", "물품 및 공사계약", "수익자부담경비", "검사결과", "기타", "홈으로"]
    }
}


$(document).ready(function() {
    //wheelmenu 오픈소스의 radius를 wheelbutton의 크기로 맞춘다
    var rad = parseInt($(".wheel-button").css('width'));
    //wheelmenu 오픈소스의 설정값이다. wheelmenu.js에서 자세히 볼 수 있다
    $(".wheel-button").wheelmenu({
        radius: rad
    });
    $('#wheel li').css({ display: 'block' });

    $(window).resize(function() {
        //원형 메뉴 화면 상태에서 화면의 크기가 변했을 경우 페이지가 다시 로드된다
        if (!$('body').hasClass('articled')) {
            $(location).attr('href', "index.html");
        }
    });
    //firstCategory로 카테고리에 이벤트를 달아준다
    for (i = 1; i <= 10; i++) {
        firstCategory(i);
    }
});

//각 카테고리에 클릭 이벤트가 발생했을 시 실행할 코드를 프로그래밍한 함수이다
function firstCategory(i) {
    var liName = 'item_' + i;
    $('#' + liName + ' a').click(function() {
        //데스크탑 구현 영역
        if (windowWidth > 768) {
            //if문에서 'excuted'클래스를 가지고 있는지 검사한다. 가지고 있을 경우 홈으로 돌아가고, 없을 경우 if문 안의 코드를 실행한다.
            if (!$(this).hasClass('excuted')) {
                //'excuted'클래스를 추가한다
                $(this).addClass('excuted');
                $('#wheel').children().each(function() {
                        if ($(this).attr('id') != liName) {
                            $(this).fadeOut('slow', function() {
                                $('.wheel-button').fadeOut();
                            });
                        }
                    })
                    //중앙 버튼을 fadeOut한다
                $('.wheel-button').fadeOut('slow', function() {
                    $('#wheel').animate({ position: 'relative', top: '', left: '' });
                    //클릭된 태그를 왼쪽 상단으로 이동시킨다
                    $('#' + liName).animate({
                            top: parseInt($('#' + liName + ' a').css('height')) / 2,
                            left: parseInt($('#' + liName + ' a').css('width')) / 2
                        }, 'slow',
                        function() {
                            appendList(i, '#' + liName);
                            //글 목록과 글이 나타날 영역을 생성한다 
                            $('.article').css({ width: '65vw', height: '80vh', position: 'absolute', left: parseInt($('#' + liName + ' a').css('width')) * 1.5, 'margin': '10vw' });
                        });
                });
            } else {
                reload();
            }
            $('body').addClass('articled');
        }
        //모바일 구현 영역 
        else if (windowWidth <= 768) {
            //if문에서 'excuted'클래스를 가지고 있는지 검사한다. 가지고 있을 경우 홈으로 돌아가고,  없을 경우 if문 안의 코드를 실행한다.
            $('#wheel li').fadeOut(function() {
                //기존의 li들을 모두 제거한다
                $('#wheel li').remove();
                var item = 'item_' + i;
                //모든 item을 보이지 않게 처리한다
                $('.item').fadeOut();
                for (k = 0; k < eval('jsonlist.' + item + '.list_name').length; k++) {
                    //배열으로부터 하위 카테고리들을 불러와 li로 추가한다
                    $('#wheel').append('<li class="item"><a class="f_category">' + eval('jsonlist.' + item + '.list_name[k]') + '</a></li>');
                    $('.wheel').css({ visibility: 'visibie' });
                    $('#wheel' + ' li:last a').attr('href', eval('jsonlist.' + item + '.href[k]')).click(function() {
                        $('.main').fadeOut(function() {
                            $('.main').remove;
                            $('body').append('<div id="header"><a href="">백운고등학교</a></div><div class="article"></div>');
                            $('.article').css({ height: '92vh', padding: '5px' });
                            $('#header').css({ height: '8vh', 'font-size': '5vh', 'padding-top': '2vh', 'text-align': 'center', 'background-color': '#00000033' });
                            fadeInArticle(i, k);
                        });


                    })
                }
                //wheelmenu 오픈소스의 radius를 wheelbutton의 크기로 맞춘다
                $('.item').fadeIn('fast', function() {
                    $('.wheel').css({ visibility: 'hidden' });
                    $(".wheel-button").trigger('click');
                });
            });
        }
    });
}

function reload() {
    $(location).attr('href', "/index.html");
}

function secondCategory(f, s) {
    console.log(f + ' ' + s)
    var liName = 's_li_' + s;
    $('#' + liName).click(function() {
        fadeInArticle(f, s)
    });
}

function fadeInArticle(f, s) {
    var dir = '/c_' + f + '/' + s;
    $('.body').fadeOut();
    $.get(dir + '/meta.html', function(data) {
        $('.article').append(data);

        // $('.body link').attr('href', 'http://paekun.hs.kr' + $('.body link').attr('href'));
        $('.body a').each(function(s) {
            $(this).attr('href', '#');
        });
        for (var an = 1; an < $('#bbsWrap form div.bbsContent table tbody tr').length; an++) {
            $('#bbsWrap form div.bbsContent table tbody tr:nth-child(' + an + ') td:nth-child(3) a').click(function() {
                $('.body').fadeOut();
                $.get(dir + '/a' + an + '.html', function(data) {
                    $('.article').append('<div class="body">' + data + '</div>');
                });
            })
        }
        $('img').each(function(s) {
            $(this).attr('src', 'http://paekun.hs.kr' + $(this).attr('src'));
        });
    });


}
//selector의 하위에 list(하위카테고리)를 삽입한다
function appendList(n, selector) {
    item = 'item_' + n;
    var name = selector + ' ul';
    $(selector).append('<ul></ul>');
    $(name).attr('id', 'list_' + n).attr('class', 'list');
    for (i = 0; i < eval('jsonlist.' + item + '.list_name').length; i++) {
        $(name).append('<li class="s_category"><a>' + eval('jsonlist.' + item + '.list_name[i]') + '</a></li>');
        $(name + ' li:last').hide().fadeIn().attr('id', 's_li_' + (i + 1));
        $(name + ' li:last a').attr('href', eval('jsonlist.' + item + '.href[i]'));
        $('.list').css({
            top: parseInt($(selector + ' a').css('height')) * 2,
            float: 'left',
            'padding': 0
        })
        secondCategory(n, i + 1);
    }
}