class StopWacth {
    constructor() {
        this.startBtn = document.querySelector(".menu > .menu_btn:nth-child(1)");
        this.pauseBtn = document.querySelector(".menu > .menu_btn:nth-child(2)");
        this.stopBtn = document.querySelector(".menu > .menu_btn:nth-child(3)");

        this.hour = document.querySelector(".time > .hour");
        this.min = document.querySelector(".time > .min");
        this.sec = document.querySelector(".time > .sec");
        this.time = 0;
        this.timerID = 0;
        this.num = 0;
        this.init();
    }

    init() {
        this.startBtn.addEventListener("click", this.startTimer);
        this.stopBtn.addEventListener("click", this.stopTimer.bind(this));
        this.pauseBtn.addEventListener("click", this.stoptime.bind(this));
    }

    startTimer = () => {
        this.stopTimer();
        this.startBtn.style.backgroundColor = "aqua";
        this.stopBtn.style.backgroundColor = "#fff";
        this.pauseBtn.style.backgroundColor = "#fff";
        this.time = 0;
        this.timerID = setInterval(()=> {
            this.time++;
            this.hour.innerHTML = ((Math.floor(this.time/3600))+"").zeroFormat();
            this.min.innerHTML = (((this.time % 3600 - this.time%60)/60 + "")).zeroFormat();
            this.sec.innerHTML = (this.time % 60 +"").zeroFormat();
        }, 10);
    }

    stopTimer(){
        this.startBtn.style.backgroundColor = "#fff";
        this.stopBtn.style.backgroundColor = "aqua";
        this.pauseBtn.style.backgroundColor = "#fff";
        clearInterval(this.timerID); //해당 아이디의 인터벌을 정지
        this.num =0;
    }

    stoptime(){
        if(this.num == 0){
            this.num = 1;
            clearInterval(this.timerID);
            this.startBtn.style.backgroundColor = "#fff";
            this.stopBtn.style.backgroundColor = "#fff";
            this.pauseBtn.style.backgroundColor = "aqua";
        }else {
            this.timerID = setInterval(()=> {
                this.time++;
                this.hour.innerHTML = ((Math.floor(this.time/3600))+"").zeroFormat();
                this.min.innerHTML = (((this.time % 3600 - this.time%60)/60 + "")).zeroFormat();
                this.sec.innerHTML = (this.time % 60 +"").zeroFormat();
            }, 10);
            this.num = 0;
            this.startBtn.style.backgroundColor = "aqua";
            this.stopBtn.style.backgroundColor = "#fff";
            this.pauseBtn.style.backgroundColor = "#fff";
        }
    }
}