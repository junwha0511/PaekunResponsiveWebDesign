import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.alert import Alert
import os

chromeOptions = webdriver.ChromeOptions()
prefs = {"profile.managed_default_content_settings.images":2,"download.prompt_for_download": False}
chromeOptions.add_experimental_option("prefs",prefs)

# Chrome의 경우 | 아까 받은 chromedriver의 위치를 지정해준다.
driver = webdriver.Chrome('C:/chromedriver',chrome_options=chromeOptions)

driver.implicitly_wait(2)
# url에 접근한다.
driver.get('http://www.paekun.hs.kr/main.php?master=member&act=exec&mode=login&member_sid=1&ret_url=')
driver.implicitly_wait(2)
Alert(driver).accept()
#하나하나 들어간다
directory='C:/'
for n in range(1,12):
    #first 카테고리의 링크의 페이지로 접속한다.
    if n<10:
        driver.get('http://www.paekun.hs.kr/main.php?menugrp=0'+str(n)+'0100&master=html&act=page')
    else: 
        driver.get('http://www.paekun.hs.kr/main.php?menugrp='+str(n)+'0100&master=html&act=page')
    driver.implicitly_wait(2)
    #디렉토리를 생성한다
    firstD=directory+'c_'+str(n)
    if not os.path.exists(firstD):
        os.makedirs(firstD)
    #페이지의 소스를 가져온다
    html=driver.page_source
    soup=BeautifulSoup(html, 'html.parser')
    li=soup.select('#wg_leftmenu > div > ul > li > a')
    secondNum=0
    for a in li:
        secondNum+=1
        #second 디렉토리를 생성한다
        secondD=firstD+'/'+str(secondNum)
        if not os.path.exists(secondD):
            os.makedirs(secondD)
        #second 카테고리로 접속시킨다
        driver.get('http://www.paekun.hs.kr/'+a.get('href'))
        driver.implicitly_wait(4)
        #페이지의 소스를 가져온다
        htm=driver.page_source
        #글 목록을 파싱한다
        msoup=BeautifulSoup(htm,'html.parser')
        title = msoup.select('#bbsWrap > form > div.bbsContent > table > tbody > tr > td > a')
        table = msoup.select('#condata > div > div.body')
        thirdD = secondD.replace(' ','')
        fileHeader = open(thirdD+'/meta.html',mode='w',encoding='utf8')
        fileHeader.write(str(table).replace('[','').replace(']',''))
        fileHeader.close

        num=0;
        
        for t in title:
            num+=1
            aNumber='a'+str(num)
            #글 제목으로 html 파일을 생성한다
            fw = open(thirdD+'/'+aNumber+'.html', mode='w', encoding='utf8')
            #글로 접속한다
            driver.get('http://www.paekun.hs.kr/'+t.get('href'))
            driver.implicitly_wait(2)
            ht=driver.page_source
            asoup=BeautifulSoup(ht,'html.parser')
            article = asoup.select('#bbsWrap')
            #파일로 출력한다
            for fileInput in article:
                fw.write(str(fileInput).replace('[','').replace(']',''))
            fw.close
        

