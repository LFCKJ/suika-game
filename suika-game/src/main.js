import { Engine, Render, Runner, World,Bodies,Body, Events, Collision} from "matter-js"; // matter-js 게임 물리엔진 import

import {FRUITS} from "./fruits.js"; // fruits.js에서 FRUITS 객체 import
const engine = Engine.create(); // 엔진 생성
const runner = Runner.create();
const render = Render.create({
  engine,
  element: document.body,
  options: {
    wireframes: false, // wireframes 옵션은 false로 설정하여 선만 보이지 않도록 함
    background: "#F7F4C8",
    width: 620,
    height: 850,
  }
});

const world = engine.world;
const leftWall = Bodies.rectangle(15, 395, 30, 790,{ // 15 벽 위치 중앙 값 기준, 395 높이 중앙 값 기준, 30 벽 두께, 790 벽 높이
  isStatic: true, // 벽은 움직이지 않도록 설정
  render:{fillStyle:"#E6B143"}
});

const rightWall = Bodies.rectangle(605, 395, 30, 790,{ // 동일
  isStatic: true, // 벽은 움직이지 않도록 설정
  render:{fillStyle:"#E6B143"}
});

const ground = Bodies.rectangle(310,  820, 620, 60,{
  isStatic: true, // 벽은 움직이지 않도록 설정
  render:{fillStyle:"#E6B143"}
});

const topLine = Bodies.rectangle(310, 150, 620, 1,{
  name:"topLine",
  isStatic: true,
  isSensor: true, // 벽은 움직이지 않도록 설정
  render:{fillStyle:"#E6B143"}
});
World.add(world, [leftWall,rightWall, ground,topLine]); // 왼쪽,오른쪽, 땅,위 벽 추가


Render.run(render); // 렌더러 실행
Runner.run(runner, engine); // 러너 실행

let currentBody = null;
let currentFruit = null;

function addFruit(){
  const index = Math.floor(Math.random()*5); // 0부터 5까지의 랜덤한 인덱스 생성
  const fruit = FRUITS[index]; // FRUITS 배열에서 인덱스 7의 과일 정보 가져오기

  const body = Bodies.circle(300, 50, fruit.radius,{
    index: index,
    
    isSleeping: true,
    render:{
      sprite:{texture: `${fruit.name}.png`}
      },
      restitution: 0.5, // 과일이 바닥에 닿았을 때 튕겨나가는 정도 설정
    });
    currentBody = body; // 현재 과일의 물리 엔진 바디를 currentBody에 저장
    currentFruit = fruit; // 현재 과일 정보를 currentFruit에 저장

    World.add(world, body); // 월드에 과일 추가
  }

  window.onkeydown = (event) =>{
    if(disableAction) {
      return;
    }
    switch(event.code){
      case "KeyA":
        if(currentBody.position.x - currentFruit.radius > 30)
            Body.setPosition(currentBody,{
              x:currentBody.position.x - 10,
              y:currentBody.position.y,
            });
        break;

      case "KeyD":
        if(currentBody.position.x - currentFruit.radius < 590)
         Body.setPosition(currentBody,{
          x:currentBody.position.x + 10,
          y:currentBody.position.y,
        });
        break;

      case "KeyS":
         currentBody.isSleeping = false; // 과일이 바닥에 닿았을 때 튕겨나가는 정도 설정
         disableAction = true;
        setTimeout(()=>{
          addFruit(); // 새로운 과일 추가
          disableAction = false;
        },1000);
         
        break;

    }
  }

  Events.on(engine,"collisionStart",(event) =>{
    //충돌시작 시 로직 시작
    event.pairs.forEach((collision)=>{
      if(collision.bodyA.indx === collision.bodyB.index){
        const index = collision.bodyA.index; 

        if(index === FRUITS.length - 1){
          return;
        }

        World.remove(world, [collision.bodyA, collision.bodyB]);
        const newFruits = FRUITS[index+1];
        const newBody = Bodies.circle(
          collsion.collision.supports[0].x,
          collsion.collision.supports[0].y,
          newFruits.radius,
          {
            render:{
              sprite:{texture: `${newFruit.name}.png`}
              },
              index: index + 1,
          }
        );
        World.add(world, newBody);
      }
if(
  !disableAction && 
  (collsion.bodyA.name === "topLine" || collision.bodyB.name === "topLine")){
  alert("Game over");
}

    });
  });
  addFruit(); // 과일 추가 함수 호출
