export default {
    toast (msg = '', time = 1500) {
        var toast = document.createElement('div');
        toast.className = 'toast toast-show';
        toast.innerText = msg;
        document.body.appendChild(toast);
        toast.style.display = 'block';
        toast.style.margin = `-${toast.offsetHeight / 2}px 0 0 -${toast.offsetWidth / 2}px`;
        var timer = setTimeout(() => {
            toast.class = 'toast toast-hide';
            clearTimeout(timer);
            var timer2 =  setTimeout(() => {
                document.body.removeChild(toast);
                clearTimeout(timer2);
            }, 200);
        }, time);
    },
}