const UI_ELEMENT = {
    CHAT_WINDOW : {
        FROM_WRAPPER_CHAT : document.querySelector('.from_wrapper_message'),
        MAIN_INPUT : document.querySelector('.value_message'),
        MAIN_INPUT_FORM : document.querySelector('.from_main_input'),
        BUTTON_SEND_MESSAGE : document.querySelector('.send_message'),
        OLD_WRAPPER: document.querySelector('.wrapper_message'),
        TEMPLATE_MESSAGE : document.querySelector('#user_one'),    
        CHAT : document.querySelector('.wrapper_chat'),
        BUTTON_SETTING : document.querySelector('.button_settings')
    },

    AUTHORIZATION_WINDOW : {
        AUTHORIZATION_WINDOW_CHILD : document.querySelector('.authorization_wrapper'),
        BUTTON_ENTRY_KOD : document.querySelector('.enter_kod'),
        FORM_EMAIL_INPUT : document.querySelector('.from_email_input'),
        EMAIL_INPUT : document.querySelector('.email_input'),
        ADD_KOD : document.querySelector('.add_kod')
    },

    SIGN_WINDOW : {
        SIGN_WRAPPER : document.querySelector('.sign_wrapper'),
        CLOSE_WINDOW_AUTHORIZATION : document.querySelector('.close_sign'),
        VALUE_INPUT_KOD : document.querySelector('.enter_kod_input'),
        ENTRY_BUTTON : document.querySelector('.entry_button')
    },


    SETTING_WINDOW : {
        MAIN_WINDOW : document.querySelector('.wrapper_setting'),
        EXIT_SETTING : document.querySelector('.exit_setting'),
        CHANGE_NAME_INPUT : document.querySelector('.user_change_name'),
        CHANGE_NAME_INPUT_FORM : document.querySelector('.user_change_name_form')
    }

}

export default UI_ELEMENT