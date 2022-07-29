export default class DOMUtil {
    constructor(){
        this.popup = document.querySelector("#popup");
        this.recordText = this.popup.querySelector(".record");
    }

    openPopup(record){
        this.popup.classList.add("active");
        this.recordText.innerText = record;
    }

    closePopup(){
        this.popup.classList.remove("active");
    }
}