# mern-chatbot-app
# chatbot-app
Server 
1. Text Query Route

2. Event Query Route 

# 
`Client` 
1. `Template` 생성   
- 가장자리 template 와 input 박스 생성

어플실행 - npm run dev 
/package.json : concurrently dependency  이용

- Chatbot template 을 위한 폴더 생성
src/Chatbot/Chatbot.js 

- `onKeyPress` 이벤트 생성
```JS
if(!e.target.value) { 
retrun alert("먼저 무엇을 입력하고 엔터를 누르세요!") 
}
```

- 무언가를 입력했다면 그 값과 함께 textQuery Route에 request를 보낸다.
- textQuery() func 을 만들고 `e.target.value` 를 값을 넣는다.  
(textvalue를 `textQuery Route`에 보내줘야 하기에..)   
`dialogflow router`에서 `req.body.text`로 
보내진 값을 다시 dialogflow에 보내준다. 
 
- 그 이후에는 input 값을 다시 빈 값으로 만든다.
```JS
 e.target.value = “”;
 ```

 2. `textQuery` func 생성
- 서버에 있는 Route에 request 를 보낸다
