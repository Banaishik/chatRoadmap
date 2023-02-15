import UI_ELEMENT from "./Ui-elemments.js"
import user from "./newMessage/NewMessage.js"
// import name from "./obj.js"
// import name from "./obj/obj.js"
// import user

let messages = []
let messageHistory = []
let lastMassge = []

console.log(user);

// function for working with the UI
let sendMessageInBack =  (value) => {
    const spanMessage = UI_ELEMENT.CHAT_WINDOW.TEMPLATE_MESSAGE.content.querySelector('span')

    try {
        if (value) {
           spanMessage.textContent = value
            let message = UI_ELEMENT.CHAT_WINDOW.TEMPLATE_MESSAGE.content.cloneNode(true)

            UI_ELEMENT.CHAT_WINDOW.OLD_WRAPPER.append(message)
            UI_ELEMENT.CHAT_WINDOW.MAIN_INPUT.value = ""
        } else {
            alert('похоже вы не ввели сообщение ')
        }        
    } catch (e) {
        alert(e)
    }
}

const writeMessage = (array) => {
    array.forEach(item => {
        sendMessageInBack(item.text)
    })
}

// function for working with the LocalStorage
const setDataInLocalStorage = () => {
    let value = UI_ELEMENT.SIGN_WINDOW.VALUE_INPUT_KOD.value  
    localStorage.setItem('chat_token', JSON.stringify(value))
}

// webSocket
const messageSendGet = async (value) => {

    let token = JSON.parse(localStorage.getItem('chat_token'))
    const socket = new WebSocket(`wss://edu.strada.one/websockets?${token}`)

    socket.onopen =  function(e) {
        alert('соединение установлено')
    }
        
    setTimeout(() => {
        socket.send(JSON.stringify({text : `${value}`}))

        socket.onmessage = function (event) {
            alert(event.data)
            messages.push(JSON.parse(event.data))
            console.log(messages);
            writeMessage(messages)

        }        
    }, 2000)
    
    socket.onerror = function(error) {
        alert(error);
    }
}

//functions for working with the server
async function kodRequest() {
    try {
        const emailValue = document.querySelector('.email_input').value

        let response = await fetch('https://edu.strada.one/api/user', {
            method : 'POST',
            headers: {
            'Content-Type' : 'application/json'
            } ,
            body : JSON.stringify({
                email : emailValue,
            }),
        })
    } catch(e) {
        alert(e)
    }
}    

let getDataAboutMe = () => {
    try {
        let token = JSON.parse(localStorage.getItem('chat_token'))

        fetch ('https://edu.strada.one/api/user/me', {
            method : 'GET',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => console.log(data)) 

    } catch (e) {
        alert(e);
    }

}

async function changeName() {
try {
    let token = JSON.parse(localStorage.getItem('chat_token'))
    let newUserName = UI_ELEMENT.SETTING_WINDOW.CHANGE_NAME_INPUT.value

    let response = await fetch('https://edu.strada.one/api/user', {
        method: 'PATCH' ,
        headers : {
            'Content-Type' : 'application/json',
            'Access-Control-Allow-Origin' : '*',
            'Authorization' : `Bearer ${token}`
            
        },
        body : JSON.stringify({
            name : newUserName,
        }),
    })

    let result = await response.json()
    console.log(result);
    getDataAboutMe()
    
} catch(e) {
    alert(e)
}
}

let storyMessage = ''

const writeMessageScroll = () => {

    let twentyMessages = messageHistory.splice(0, 21)

    let blockMessage = twentyMessages.map(item => sendMessageInBack(item.text))

    UI_ELEMENT.CHAT_WINDOW.OLD_WRAPPER.append(...blockMessage)

    // if (topHeightWindow === 0) {
    //     let newArray = messageHistory.slice(0, 21)

    //     newArray.forEach(item => {
    //         lastMassge.push(item)
    //     })
    //     // отрисовка сообщений 
    //     newArray.forEach(item => {
    //         sendMessageInBack(item.text)
    //     })
//46:22
    // }  

    //  if (UI_ELEMENT.CHAT_WINDOW.OLD_WRAPPER.scrollTop === UI_ELEMENT.CHAT_WINDOW.OLD_WRAPPER.scrollHeight) {
    //     let index = lastMassge.length - 1
    //     let newLastElement =  lastMassge[index]
    //     let element = messageHistory.filter(item => item === newLastElement )
    //     // console.log(element);
    //     let newIndex = messageHistory.indexOf(element[0])
    //     let newArray = messageHistory.slice(0, newIndex + 20)

    //     if (newIndex === 300) {
    //         alert('Вся история загружена')
    //     }

    //     newArray.forEach(item => {
    //         sendMessageInBack(item.text)
    //     })
    // }
}

const trakingScrollTop = () => {
    const Yscroll = UI_ELEMENT.CHAT_WINDOW.OLD_WRAPPER.scrollHeight + UI_ELEMENT.CHAT_WINDOW.OLD_WRAPPER.scrollTop - UI_ELEMENT.CHAT_WINDOW.OLD_WRAPPER.clientHeight

    if (Yscroll === 19700) {
        if (messageHistory.length > 0) {
            writeMessageScroll()
        }
    }
}


let getStoryMessage = async () => {

    try {
        let token = JSON.parse(localStorage.getItem('chat_token'))

        await fetch ('https://edu.strada.one/api/messages/ ', {
            method : 'GET',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${token}`
            }
        })        

        .then(response => response.json())
        .then(data => storyMessage = data)
    } catch (e) {
        alert(e)
    }        

    console.log(storyMessage.messages);

    storyMessage.messages.forEach( messageItem => {
        sendMessageInBack(messageItem.text)
    });

    storyMessage.messages.forEach( messageItem => {
        messageHistory.push(messageItem)
    });

    // writeMessageScroll()
    // trakingScrollTop()

}

getStoryMessage()

// onsubmit
UI_ELEMENT.CHAT_WINDOW.MAIN_INPUT_FORM.onsubmit = (event) => {
    event.preventDefault()
    let value = UI_ELEMENT.CHAT_WINDOW.MAIN_INPUT.value
    // sendMessageInBack(value)
    messageSendGet(value)

} 
UI_ELEMENT.AUTHORIZATION_WINDOW.FORM_EMAIL_INPUT.onsubmit = (event) => {
    event.preventDefault()
    kodRequest(document.querySelector('.email_input').value)
}
UI_ELEMENT.SETTING_WINDOW.CHANGE_NAME_INPUT_FORM.onsubmit = (event) => {
    event.preventDefault()
    changeName()
}

// UI work
UI_ELEMENT.CHAT_WINDOW.BUTTON_SEND_MESSAGE.addEventListener('click', () => {
    let value = UI_ELEMENT.CHAT_WINDOW.MAIN_INPUT.value
    // sendMessageInBack(UI_ELEMENT.CHAT_WINDOW.MAIN_INPUT.value)
    messageSendGet(UI_ELEMENT.CHAT_WINDOW.MAIN_INPUT.value)
})

UI_ELEMENT.SIGN_WINDOW.CLOSE_WINDOW_AUTHORIZATION.addEventListener('click', () => {
    UI_ELEMENT.SIGN_WINDOW.SIGN_WRAPPER.style.display = "none"
    UI_ELEMENT.AUTHORIZATION_WINDOW.AUTHORIZATION_WINDOW_CHILD.style.display = "grid"
    
})

UI_ELEMENT.AUTHORIZATION_WINDOW.BUTTON_ENTRY_KOD.addEventListener('click', () => {
    UI_ELEMENT.AUTHORIZATION_WINDOW.AUTHORIZATION_WINDOW_CHILD.style.display = "none"
    UI_ELEMENT.SIGN_WINDOW.SIGN_WRAPPER.style.display = "grid"
})
 
UI_ELEMENT.AUTHORIZATION_WINDOW.ADD_KOD.addEventListener('click', (event) => {
    event.preventDefault()
    kodRequest(UI_ELEMENT.AUTHORIZATION_WINDOW.EMAIL_INPUT.value)
})

UI_ELEMENT.SIGN_WINDOW.ENTRY_BUTTON.addEventListener('click', (event) => {
    event.preventDefault()

    setDataInLocalStorage()

    UI_ELEMENT.SIGN_WINDOW.SIGN_WRAPPER.style.display = "none"
    UI_ELEMENT.CHAT_WINDOW.CHAT.style.display = "grid"
})

UI_ELEMENT.CHAT_WINDOW.BUTTON_SETTING.addEventListener('click', () => {
    UI_ELEMENT.CHAT_WINDOW.CHAT.style.display = "none"

    UI_ELEMENT.SETTING_WINDOW.MAIN_WINDOW.style.display = 'grid'
})

UI_ELEMENT.SETTING_WINDOW.EXIT_SETTING.addEventListener('click', () => {
    UI_ELEMENT.SETTING_WINDOW.MAIN_WINDOW.style.display = "none"

    UI_ELEMENT.CHAT_WINDOW.CHAT.style.display = "grid"
})

// UI_ELEMENT.CHAT_WINDOW.OLD_WRAPPER.addEventListener('scroll', (event) => {
//     // let topHeightWindow = UI_ELEMENT.CHAT_WINDOW.OLD_WRAPPER.scrollTop
//     // UI_ELEMENT.CHAT_WINDOW.OLD_WRAPPER.scrollTop = UI_ELEMENT.CHAT_WINDOW.OLD_WRAPPER.scrollHeight
// })
    