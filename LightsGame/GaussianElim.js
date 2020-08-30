function rref0(A) //my own attempts at implementing rref with modulus
{
    var rows = A.length;
    var columns = A[0].length;
    
    var lead = 0;
    for (var k = 0; k < rows; k++) {
        if (columns <= lead) return;
        
        var i = k;
        while (A[i][lead] === 0) {
            i++;
            if (rows === i) {
                i = k;
                lead++;
                if (columns === lead) return;
            }
        }
        var irow = A[i], krow = A[k];
        A[i] = krow, A[k] = irow;
         
        var val = A[k][lead];
        for (var j = 0; j < columns; j++) {
            A[k][j] /= val;
        }
         
        for (var i = 0; i < rows; i++) {
            if (i === k) continue;
            val = A[i][lead];
            for (var j = 0; j < columns; j++) {
                A[i][j] -= val * A[k][j];
            }
        }
        lead++;
    }
    return A;
}

function rref1(A, modulus)
{
    let rows = A.length;
    let columns = A[0].length;
    
    let numpivots = 0

    for(let j = 0; j<columns; j++)
    {
        if (numpivots >= rows)
            break
        let pivotrow = numpivots
        while(pivotrow < rows && get(pivotrow, j) == 0)
            pivotrow++
        if (pivotrow == rows)
            continue
        swapRows(numpivots, pivotrow)
        pivotrow = numpivots
        numpivots++
        
        multiplyRow(pivotrow, reciprocal(get(pivotrow, j)))

        for(let i = pivotrow+1; i < rows; i++){
            
            addRows(pivotrow, i, negate(get(i, j)))
        }
    }

    for(let i = numpivots-1; i>=0; i--)
    {
        pivotcol = 0
        while (pivotcol < columns && get(i, pivotcol) == 0)
            pivotcol++
        if (pivotcol == columns)
            continue
        for(let j = 0; j<i; j++)
            addRows(i, j, negate(get(j, pivotcol)))
    }

    function negate(abc)
    {
        if (abc < 0)
            return (abc%modulus)-modulus
        else 
            return abc%modulus
    }

    function get(row, column)
    {
        if(!(row >= 0 && row < rows && column >= 0 && column < columns))
            console.log("Row or column out of bounds.")
        return A[row][column]
    }

    function swapRows(row0, row1)
    {
        if(!(row0 >= 0 && row0 < rows && row1 >= 0 && row1 < rows))
            console.log("Row out of bounds.")
        let temp = A[row0]
        A[row0] = A[row1]
        A[row1] = temp
    }

    function multiplyRow(row, factor)
    {
        if(!(row >= 0 && row < rows))
            console.log("Row out of bounds.")
        let newRow = []
        A[row].forEach(val => newRow.push(val*factor%modulus))
        A[row] = newRow
    }

    function reciprocal(w)
    {
        let x = modulus
        let y = w
        if (y==0)
            throw('Cannot divide by 0.')
        let a = 0
        let b = 0
        while (y!=0)
        {
            let q = Math.floor(x/y)
            let r = x % y
            x = y
            y = r
            let temp = a
            a = b 
            b = temp - q * b
        }
        if (x==1)
            return a % modulus 
        else 
            throw('modulus not prime')
    }

    function addRows(srcrow, destrow, factor)
    {
        let newDestrow = []

        for(let i = 0; i<A[srcrow].length; i++)
        {
            srcval = A[srcrow][i]
            destval = A[destrow][i]

            newDestrow.push((destval+srcval*factor%modulus)%modulus)
        }
        A[destrow] = newDestrow
    }
}

function arraysEqual(a1,a2) 
{
   /* WARNING: arrays must not contain {objects} or behavior may be undefined */
   return JSON.stringify(a1)==JSON.stringify(a2);
}