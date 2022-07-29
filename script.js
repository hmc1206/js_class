    window.onload = () => {
        const wrapperBox = document.querySelector(".content_wrapper");
        const tabBar = document.querySelector(".tab_bar");
        tabBar.addEventListener("click", (e) => {
            wrapperBox.style.left = e.target.dataset.px;
            document.querySelectorAll(".tab_menu").forEach(x => x.classList.remove("active"));
            e.target.classList.add("active");
        });

        const watchInfo = document.querySelectorAll(".watch>span");
        setInterval(()=> {
            let d = new Date();
            let {hour, min, sec} = d.getInfo();
            watchInfo[0].innerHTML = (hour+"").zeroFormat()+":";
            watchInfo[1].innerHTML = (min+"").zeroFormat()+":";
            watchInfo[2].innerHTML = (sec + "").zeroFormat();
        },1000);

        let stopWacth = new StopWacth();
        document.querySelector(".tab_bar >.tab_menu:nth-child(2)").click();


    };