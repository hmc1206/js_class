let cities = {
    Seoul: "대한민국",
    Busan: "대한민국",
    Berlin: "독일",
    Paris:"프랑스",
    Lyon: '프랑스',
}

let list = Object.keys(cities);

// let reverseData = list.reduce((r,x) => {
//     r[cities[x]] = [...(r[cities[x]] || []), x];
//     return r;
// }, {})

let reverseData = list.reduce((r,x) => (r[cities[x]] = [...(r[cities[x]] || []),x],r), {})
console.log(reverseData);

let arr = [
    {id:1, name:"최선한", grade:5, score:70, age:42, group:'teacher'},
    {id:2, name:"최은유", grade:4, score:50, age:30, group:'student'},
    {id:3, name:"최은호", grade:6, score:90, age:15, group:'student'},
    {id:4, name:"최은솔", grade:1, score:100, age:22, group:'tutor'},
    {id:5, name:"최은혁", grade:2, score:75, age:20, group:'tutor'},
  ];
//   let map = arr.map(x => ({...x, adult: x.age >= 20}))
//     .reduce((r,x) => {
//       if(x.adult) {
//           r.adult++;
//       }else {
//           r.kid++;
//       }
//       return r;
//   }, {adult:0, kid:0})
//   console.log(map);
//   let rr = arr.reduce((r,x) => {
//     let ages = Math.floor(x.age/10)*10;
//     r[ages] = (r[ages] || 0) +1;
//     return r;
//   }, {})
//   console.log(rr);
//   let result = {};
//   for(let i =0; i<arr.length; i++){
//     let ages = Math.floor(arr[i].age/10)*10;
//     if(result[ages] === undefined) {
//         result[ages] = 1;
//     }else {
//         result[ages]++;
//     }
//   }
  
  // 첫번째 : 결과
  // 두번째 : 원소
  // 세번째 : 인덱스
  // let result = arr.filter(x => x.grade >= 4).reduce( (r, x) => r + x.score , 0);
  
  // console.log(result);
  
  
  window.onload = () => {
    const list = document.querySelector(".list");
  
    refreshList(arr);
  
    const nameText = document.querySelector("#nameText");
    nameText.addEventListener("keydown", e => {
      if(e.keyCode === 13){
        document.querySelector("#search").click();
      }
    });
  
    document.querySelector("#search").addEventListener("click", e => {
      let name = nameText.value; //사용자가 입력한 이름을 가져오고
      
      //let data = arr.filter(x => x.name.includes(name));
      let reg = new RegExp(`.*${name}.*`, 'g');
      let data = arr.filter(x => x.name.match(reg));
      refreshList(data);
    });
  
    function refreshList(data)
    {
      list.innerHTML = "";
      data.forEach(x => {
        const div = document.createElement("div");
        div.innerHTML = 
          `<li class="human">
            ${x.name} : ${x.grade} 학년, ${x.score}점
          </li>`;
        list.appendChild(div.firstChild);
      });
    }
    // string includes
    // string match ( /exp/ )
  };
  
  // let sum = 0;
  // arr.forEach(function(x){
  //   sum += x.score;
  // });
  // console.log(sum);
  
  // mapping 
  //학년이 4학년 이상인 사람만 골라내세요.
  //let newArr = arr.filter( x => x.grade >= 4 );
  
  // let newArr = arr.map(x => {
  //   x.result = x.score >= 90 ? "합" : "불";
  //   return x;
  // });
  
  //console.log(newArr);
  