class GridGame
{
    constructor(){
        this.buttonSize = 0
        this.buttonSpace = 0
        this.topLeftX = 0
        this.topLeftY = 0

        this.gridLogic
        this.logicGrid = []
        this.logicGridProfile = []
        this.grid = []
        this.randomOriginal = []
        this.answer = []
        

        this.modulus = 0
    }

    init = (gridLogic, modulus, randomOriginal, answer) => {
        this.gridLogic = gridLogic
        this.logicGrid = gridLogic.grid
        this.logicGridProfile = gridLogic.logicGridProfile
        this.randomOriginal = randomOriginal
        this.answer = answer

        this.modulus = modulus

        this.buttonSize = 50
        this.buttonSpace = 20
        this.topLeftX = windowWidth/2 - (this.buttonSize + this.buttonSpace) * this.logicGrid.length/2  
        this.topLeftY = windowHeight/2 - (this.buttonSize + this.buttonSpace) * this.logicGrid.length/2  
        
        
        for (let i = 0; i < this.logicGrid.length; i++)
            this.grid[i] = new Array(this.logicGrid.length)
        this.initGrid()             
    }

    initGrid = () => {
        for (let row = 0; row < this.logicGrid.length; row++)
            for (let column = 0; column < this.logicGrid[row].length; column++)
                this.grid[row][column] = new Button(row, column, this.logicGrid[row][column], this.topLeftX, this.topLeftY, this.buttonSpace, this.buttonSize, this.modulus, this.randomOriginal[this.logicGrid[row][column]-1], this.answer[this.logicGrid[row][column]-1])    
    }

    update = (isMouseReleased) => {
        for (let row = 0; row < this.logicGrid.length; row++)
            for (let column = 0; column < this.logicGrid[row].length; column++){
                let button = this.grid[row][column]
                if(isMouseReleased){
                    let xDiff = mouseX - button.x 
                    let yDiff = mouseY - button.y
                    if(xDiff >= 0 && xDiff <= this.buttonSize && yDiff >= 0 && yDiff <= this.buttonSize){
                        let stateChangeCoords = this.gridLogic.getTypeofChange(button.row, button.column)
                        stateChangeCoords.forEach(coord => this.grid[coord[0]][coord[1]].changeState())
                        button.subtractAnswer()
                    }                        
                }
        } 
    }

    draw = (isDisplayState, isDisplayAnswer) => { 
        for (let row = 0; row < this.logicGrid.length; row++)
            for (let column = 0; column < this.logicGrid[row].length; column++){
                let button = this.grid[row][column]
                let proportion = button.state/(modulus-1)*255
                fill(proportion)
                rect(button.x, button.y, this.buttonSize, this.buttonSize)
                if(isDisplayState)
                    this.displayState(button, proportion)
                if(isDisplayAnswer)
                    this.displayAnswer(button, proportion )
        }
    }

    displayState = (button, proportion) => {
        fill(255-proportion+70)
        textSize(20)
        text(button.state, button.x+5, button.y+this.buttonSize-5)
    }
    displayAnswer = (button, proportion) => {
        fill(255-proportion+70)
        textSize(20)
        text(button.ans, button.x+35, button.y+this.buttonSize-30)
    }
}

class Button
{
    constructor(r, c, n, tpx, tpy, bSpace, bSize, mod, state, ans){
        this.row = r
        this.column = c
        this.x = tpx + c * (bSpace + bSize)
        this.y = tpy + r * (bSpace + bSize)
        this.number = n
        this.mod = mod
        this.state = state
        this.ans = ans
    }
    
    changeState = () => {
        this.state = (this.state+1) % this.mod
    }

    subtractAnswer = () => {
        if(this.ans > 0)
            this.ans--
        else
            this.ans+=(this.mod-1)
    }
}