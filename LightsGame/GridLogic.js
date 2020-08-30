function GridLogic(){
    
    this.gridLength = 0

    this.grid = []
    this.gridProfile = []

    this.randomOriginal = []
    this.modulus = 0

    this.initLogic = function (gridLength, modulus) //setup grid and gridprofile
    {
        this.gridLength = gridLength
        this.modulus = modulus

        this.grid = new Array(this.gridLength)
        this.gridProfile = new Array(Math.pow(this.gridLength, 2))

        for (let i = 0; i < this.gridLength; i++)
            this.grid[i] = new Array(this.gridLength)
        for (let i = 0; i < Math.pow(this.gridLength, 2); i++)
            this.gridProfile[i] = new Array(Math.pow(this.gridLength, 2))

        this.initGrid()
        this.initGridProfile()
    }

    this.initGrid = function ()
    {
        let count = 0
        for (let row = 0; row < this.gridLength; row++)
        {
            for (let column = 0; column < this.gridLength; column++)
            {
                count++
                this.grid[row][column] = count         
            }
        }
    }

    this.initGridProfile = function ()
    {
    for (let row = 0; row < this.gridLength; row++)
        for (let column = 0; column < this.gridLength; column++){
            let numberedPositions = this.getNumberedSwitchedStatePositions(row, column)
            let lightNum = this.grid[row][column]-1
            for (let i = 0; i<this.gridProfile.length; i++) //fill w/ 0s
                this.gridProfile[i][lightNum] = 0
            
            numberedPositions.forEach(numberedPosition => this.gridProfile[numberedPosition-1][lightNum] = 1) //put affected things into l^2 x l^2 
            //columns and rows swapped for gaussian elim calc later
        }
    }

    this.getNumberedSwitchedStatePositions = function (r,c)
    {
    let switchedStatePositions = []
    let numberedPositions = []

    switchedStatePositions = this.getTypeofChange(r, c)
    
    switchedStatePositions.forEach(coord => numberedPositions.push(this.grid[coord[0]][coord[1]]))

    return numberedPositions
    }

    this.getTypeofChange = function (r, c)
    {
        if (arraysEqual([r,c], [0,0]) || arraysEqual([r,c], [0,this.gridLength-1]) || arraysEqual([r,c], [this.gridLength-1,0]) || arraysEqual([r,c], [this.gridLength-1, this.gridLength-1]))
            return this.getCorner([r,c])
        
        else if(r == 0 || r == this.gridLength-1) //flat rows
            return this.getHorizontalSide([r,c])

        else if(c == 0 || c == this.gridLength-1) //straight rows
            return this.getVerticalSide([r,c])

        else
            return this.getMiddle([r,c])
    }

    this.getVerticalSide = function ([r,c])
    {
        let ssp = []
        ssp.push([r,c])
        for(let inc=-1; inc<=1; inc+=2)
            ssp.push([r+inc,c])
        return ssp
    }

    this.getHorizontalSide = function ([r,c])
    {
        let ssp = []
        ssp.push([r,c])
        for(let inc=-1; inc<=1; inc+=2)
            ssp.push([r,c+inc])
        return ssp
    }

    this.getMiddle = function ([r,c])
    {
        let ssp = []
        ssp.push([r,c])
        for(let inc=-1; inc<=1; inc+=2){
            ssp.push([r+inc,c])
            ssp.push([r,c+inc])
        }
        return ssp
    }

    this.getCorner = function ([r,c])
    {
        let ssp = []
        for(let rinc=-1; rinc<=1; rinc++)
            for(let cinc=-1; cinc<=1; cinc++){
                newR = r+rinc
                newC = c+cinc
                if(newR>=0 && newR<this.gridLength && newC>=0 && newC<this.gridLength){
                    ssp.push([newR, newC])
                }
            }
        return ssp
    }

    this.initRandomOriginal = function ()
    {
        for (let i = 0; i < Math.pow(this.gridLength, 2); i++)
        {
            this.randomOriginal.push(Math.floor(Math.random() * Math.floor(modulus)))
        }
    }

    this.addColumn = function (a, b)
    {
        for (let i = 0; i < a.length; i++)
            a[i].push(b[i])
        
    }
}