import $ from 'jquery';

export const scrollToBottom = (animate=true)=> {
    const chatMainSection = document.getElementById('chatMainSection'),
    endOfMessages = document.getElementById('endOfMessages');
    if(!animate){endOfMessages?.scrollIntoView()}
    else{
        $(chatMainSection)?.animate({
            scrollTop: endOfMessages?.offsetTop
        }, 500);
    }
}

export const scrollWithCondition = (justScroll=false)=> {
    if(justScroll){scrollToBottom(false);return;}
    const chatMainSection = document.getElementById('chatMainSection');
    if(chatMainSection?.scrollTop + chatMainSection?.clientHeight >= chatMainSection?.scrollHeight-200){
        scrollToBottom()
    }
}

export const notificationStatus = async()=> {
    if(navigator.permissions){
        const permission = await navigator.permissions.query({ name: 'notifications' });
        return permission.state;
    }
}