var incomeArr = [];
var expenseArr = [];
var total = 0;
var incTotal = 0;
var expTotal = 0;
var iCounter = 0;
var eCounter = 0;


class budget { //Budget Class
    addIncome(){
        let incomeNum = document.getElementById('incomeNum').value;
        let incomeDesc = document.getElementById('incomeDesc').value;
        if(incomeNum!=""&&incomeDesc!=""){
            let thisIncome = new income(incomeDesc, parseFloat(incomeNum), 'inc'+iCounter, iCounter);
            incomeArr.push(thisIncome);
            let incomeList = document.getElementById('incomeList')
            let listItem = document.createElement('li');
            listItem.textContent = thisIncome.incomeDesc + ": +$" + thisIncome.incomeNum;
            document.getElementById('incomeNum').value = "";
            document.getElementById('incomeDesc').value = "";
            document.getElementById('incomeWarning').innerText = "";

            let delBut = document.createElement('button'); //Delete Button
            delBut.onclick = function(){ 
                thisIncome.del(); 
            };
            delBut.innerText = "X";
            delBut.setAttribute('class','delBut');
            listItem.append(delBut);
            listItem.setAttribute('id','inc'+iCounter);
            incomeList.appendChild(listItem);

            iCounter++;

            console.log(incomeArr);
            this.calcTotals();
        }
        else{
            document.getElementById('incomeWarning').innerText = "Please Fill Out BOTH Amount and Description Boxes";
        }
    }
    
    addExpense(){
        let expenseNum = document.getElementById('expenseNum').value;
        let expenseDesc = document.getElementById('expenseDesc').value;
        if(expenseNum!=""&&expenseDesc!=""){
            let thisExpense = new expense(expenseDesc, parseFloat(expenseNum), 'exp'+eCounter, eCounter);
            expenseArr.push(thisExpense);
            let expenseList = document.getElementById('expenseList')
            let listItem = document.createElement('li');
            listItem.textContent = thisExpense.expenseDesc + ": -$" + thisExpense.expenseNum;
            document.getElementById('expenseNum').value = "";
            document.getElementById('expenseDesc').value = "";
            document.getElementById('expenseWarning').innerText = "";

            let delBut = document.createElement('button'); //Delete Button
            delBut.onclick = function(){ 
                thisExpense.del(); 
            };
            delBut.innerText = "X";
            delBut.setAttribute('class','delBut');
            listItem.append(delBut);
            listItem.setAttribute('id','exp'+eCounter);
            expenseList.appendChild(listItem);

            eCounter++;

            console.log(expenseArr);
            this.calcTotals();
        }
        else{
            document.getElementById('expenseWarning').innerText = "Please Fill Out BOTH Amount and Description Boxes";
        }
    }

    calcTotals(){ //Calculate and Display total Budget Amount 
        total = 0;
        incTotal = 0;
        expTotal = 0;
        for(let i = 0; i<incomeArr.length; i++){
            total+=incomeArr[i].incomeNum;
            incTotal+=incomeArr[i].incomeNum;
        }
        for(let i = 0; i<expenseArr.length; i++){
            total-=expenseArr[i].expenseNum;
            expTotal+=expenseArr[i].expenseNum;
        }
        total.toFixed(2); //Round to 2
        incTotal.toFixed(2);
        expTotal.toFixed(2);
        document.getElementById('budgetTotal').innerText = 'Budget Total: $'+total;
        document.getElementById('incTotal').innerText = 'Income Total: $'+incTotal;
        document.getElementById('expTotal').innerText = 'Expense Total: $'+expTotal;
    }
}

class income { //Income Class
    constructor (iDesc ,iNum, iId, iIndex){
        this.incomeDesc = iDesc;
        this.incomeNum = iNum;
        this.incomeId = iId;
        this.incomeIndex = iIndex;
    }

    del(){ //Delete Function
        // console.log("Deleting: "+this.incomeId+" at array index: "+this.incomeIndex)
        let inc = document.getElementById(this.incomeId)
        inc.remove();
        incomeArr.splice(this, 1);
        incTotal -= this.incomeNum;
        total -= this.incomeNum;
        document.getElementById('budgetTotal').innerText = 'Budget Total: $'+total;
        document.getElementById('incTotal').innerText = 'Income Total: $'+incTotal;
        console.log(incomeArr);
    }
}

class expense { //Expense Class
    constructor (eDesc, eNum, eId, eIndex){
        this.expenseDesc = eDesc;
        this.expenseNum = eNum;
        this.expenseId = eId;
        this.expenseIndex = eIndex;
    }

    del(){ //Delete Function
        let exp = document.getElementById(this.expenseId)
        exp.remove();
        expenseArr.splice(this, 1);
        expTotal -= this.expenseNum;
        total += this.expenseNum;
        document.getElementById('budgetTotal').innerText = 'Budget Total: $'+total;
        document.getElementById('expTotal').innerText = 'Expense Total: $'+expTotal;
        console.log(expenseArr);
    }
}

var budget1 = new budget();