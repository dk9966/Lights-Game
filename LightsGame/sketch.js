let gridLogic
let gridGame

let gridLength = 0
let modulus = 0
let initGridLength = 3
let initModulus = 3

let isMouseReleased 
let isDisplayState 
let isDisplayAnswer

let neolatinaFont
let tronlegacyFont

let gridLengthDD

function setup() 
{
   createCanvas(windowWidth, windowHeight)
   
   UI()

   gridLength = initGridLength
   modulus = initModulus
   init(gridLength, modulus)
}

function init(gridLength, modulus)
{
   gridLogic = new GridLogic()
   gridLogic.initLogic(gridLength, modulus)
   
   gridLogic.initRandomOriginal()
   gridLogic.addColumn(gridLogic.gridProfile, gridLogic.randomOriginal)
   
   let input = gridLogic.gridProfile
   console.table(input)
   //Gauss Jordan elimination code written by Ian Huang
   //code translated from https://www.nayuki.io/page/gauss-jordan-elimination-over-any-field
   //concept from this video https://youtu.be/oCHCD_-nhg4
   let p = new GaussJordan.PrimeField(modulus); 
   let m = new GaussJordan.Matrix(input.length, input[0].length, p);
    
   for (let i = 0; i < input.length; i++)
     for (let j = 0; j < input[i].length; j++) {
       m.set(i, j, input[i][j]);
     }
   
   const answer = m.reducedRowEchelonForm().map((row) => (row[row.length - 1] * 2) % modulus);
   

   gridGame = new GridGame()
   gridGame.init(gridLogic, modulus, gridLogic.randomOriginal, answer)
}

function draw() 
{
   background(0)
   art()

   gridGame.draw(isDisplayState, isDisplayAnswer)

   gridGame.update(isMouseReleased)
   isMouseReleased = false
}

function art()
{
   fill(255)
   textSize(120)
   text('Lights Out', 50, 130); 

   // textSize(40)
   // text('Grid Length', 330, 370);

   // textSize(40)
   // text('Modulus', 70, 370);

   textSize(40)
   text('Show State', 50, 320);

   textSize(40)
   text('Show Answer', 50, 450);

   if(isDisplayAnswer){
      textSize(15)
      text('Click until all numbers in the top right turn into 0!', 60, 540);
   }
}
   

function UI()
{
   // gridLengthDD = createSelect();
   // gridLengthDD.position(390, 400);
   // gridLengthDD.option(3);
   // gridLengthDD.option(4);
   // gridLengthDD.option(5);
   // gridLengthDD.option(6);
   // gridLengthDD.option(7);
   // gridLengthDD.selected(initGridLength);
   // gridLengthDD.changed(() => {
   //    gridLength = gridLengthDD.value()
   //    init(gridLength, modulus)
   // });

   // modDD = createSelect();
   // modDD.position(120, 400);
   // modDD.option(2);
   // modDD.option(3);
   // modDD.option(5);
   // modDD.option(7);
   // modDD.selected(initModulus);
   // modDD.changed(() => {
   //    modulus = modDD.value()
   //    init(gridLength, modulus)
   // });

   let stateDisplay = createCheckbox()
   stateDisplay.position(140, 350)
   stateDisplay.changed(() => {
      if(stateDisplay.checked())
         isDisplayState = true
      else 
         isDisplayState = false
   })

   let answerDisplay = createCheckbox()
   answerDisplay.position(140, 480)
   answerDisplay.changed(() => {
      if(answerDisplay.checked()){
         isDisplayAnswer = true
         
      }
      else 
         isDisplayAnswer = false
   })

   let resetButton = createButton('Reset System');
   resetButton.position(60, 200);
   resetButton.mousePressed(() => {
      init(gridLength, modulus)
   });
}

function mouseReleased()
{
   isMouseReleased = true
}

