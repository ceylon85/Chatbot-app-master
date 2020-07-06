# mern-chatbot-app
# chatbot-app
Server 
1. Text Query Route

2. Event Query Route 

# 
`Client` 
## `Template` 생성   
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
# 
## `textQuery` func 생성
- 서버에 있는 Route에 request 를 보낸다
- axios 이용  `Axios.post('/api/dialogflow/textQuery’)`
- `index.js`에 엔드포인트를 /api/dialogflow 로 지정해놓았기에 주소에 textQuery 를 추가해준다.
- 서버에 필요한 정보를 아래의 변수에 담아주고 Axios에 넣어준다.
```JS
const textQueryVariables = {text}
Axios.post('/api/dialogflow/textQuery', textQueryVariables )
```
- 리퀘스트를 보낸다.
- 백엔드에서 받은 후 모든걸 처리하고 다시 프론트로 보내준다.
    res.send(result)   
# 
###  `async` 문법을 사용 
- 서버에서 `textQuery router` 가 `async await` 문법을 사용하고 있으므로
받을 때도 `async` 문법을 사용해야 한다.   

#### Issue

```JS
const response = await Axios.post('/api/dialogflow/textQuery', textQueryVariables )
```
`await` 이 에러가 난다.
```JS
const textQuery = async (text) =>
```
- await은 항상 async 안에 써줘야 한다.
```JS
const content = response.data.fulfillmentMessages[0]
conversation = {
           who: 'bot',
           content: content
       }
```

- response.data 속에는 모든 정보가 들어있고, 위 코드와 같이 받아주고 conversation 변수를 만들어준다. 
- 보내는 이는 user 가 아닌 bot 으로 변경한다. 
```JS
const content = response.data.fulfillmentMessages[0]
``` 
- content는 const 로 만들어놓은 content를 받는다.
  
### textQuery Function(Redux 미적용)
```JS
const textQuery = async (text) => {

    //1. 내가 보낸 메세지를 관리(입력한 것을 채팅창에 보여주기 위해)
    let conversation = {
        who: 'user', 
        content: {
            text: {
                text: text
            }
        }
    }
    const textQueryVariables = {
        text
    }
    //2. 챗봇이 보낸 메세지를 처리
    try{
        //textQuery Ro ute에 request를 보낸다.
       const response = await Axios.post('/api/dialogflow/textQuery', textQueryVariables )
       const content = response.data.fulfillmentMessages[0]
       conversation = {
           who: 'bot',
           content: content
       }
    } catch(error){
        conversation = {
            who: 'bot',
            content: {
                text: {
                    text: "에러가 발생했으니, 문제를 확인해주세요"
                }
            }
        }
    }
}
```

- 이 함수가 호출되면 conversation 변수들을 array 안에 넣어줘여 한다.
- 여기서는 redux를 사용해서 구현해본다.
# 
## `eventQuery` Func 생성
- textQuery Func 과 유사하게 작성
- 