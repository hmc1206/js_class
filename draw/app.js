window.onload = () => {
    const canvas = document.querySelector("#myCanvas");
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = 'rgba(255,0,0,0.5)';
    ctx.strokeStyle = 'rgba(0,0,255,0.8)';

    document.querySelector("#width").addEventListener("change", e => {
        ctx.lineWidth = e.target.value;
    })
    document.querySelector("#color").addEventListener("change", e => {
        ctx.strokeStyle = e.target.value;
    });

    document.querySelector("#down").addEventListener("click", e=> {
        let base64 = canvas.toDataURL();
        let aTag =document.createElement("a");
        aTag.download = "myArt.png";
        aTag.href = base64;
        aTag.click();
    })
    
    //ctx는 컨텍스트의 약자
    let isDown = false;
    let beforePoint = {x:0, y:0};
    ctx.fillStyle = 'rgba(255,0,0,0.5)';
    canvas.addEventListener("mousedown", e => {
      const {offsetX:x, offsetY:y} = e;
      isDown = true;
      beforePoint = {x,y};
      
    });
    canvas.addEventListener("mouseup", e => {
      const {offsetX:x, offsetY:y} = e;
      isDown =false;
      
    });
    canvas.addEventListener("mousemove", e => {
      const {offsetX:x, offsetY:y} = e;
      if(isDown){
          ctx.beginPath();
          ctx.moveTo(beforePoint.x, beforePoint.y);
          ctx.lineTo(x,y);
          ctx.stroke();
          beforePoint = {x,y};
      }
    });
  };