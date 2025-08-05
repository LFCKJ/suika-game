import { Engine, Render, Runner, World,Bodies} from "matter-js"; // matter-js 게임 물리엔진 import

import {FRUITS} from "./fruits.js"; // fruits.js에서 FRUITS 객체 import
const engine = Engine.create(); // 엔진 생성

const render = Render.create({
  engine,
  element: document.body,
  options: {
    wireframes: true, // wireframes 옵션은 false로 설정하여 선만 보이지 않도록 함
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
  isStatic: true,
  isSensor: true, // 벽은 움직이지 않도록 설정
  render:{fillStyle:"#E6B143"}
});
World.add(world, [leftWall,rightWall, ground,topLine]); // 왼쪽,오른쪽, 땅,위 벽 추가


Render.run(render); // 렌더러 실행
Runner.run(engine); // 러너 실행



function addFruit(){
  const index = 7;
  const fruit = FRUITS[index]; // FRUITS 배열에서 인덱스 7의 과일 정보 가져오기
  const body = Bodies.circle(300, 10, fruit.radius,{
    index: index,
    isStatic: false, // 과일은 움직일 수 있도록 설정
    render:{
      sprite:{texture: `${fruit.name}.png`}
      }
    });
    World.add(world, body); // 월드에 과일 추가
  }
  addFruit(); // 과일 추가 함수 호출
