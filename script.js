var incomeArr = [];
var expenseArr = [];
var total = 0;


class budget { //Budget Class
    addIncome(){
        console.log('addIncome');
        let incomeNum = parseFloat(document.getElementById('incomeNum').value);
        let incomeDesc = document.getElementById('incomeDesc').value;
        let thisIncome = new income(incomeDesc, incomeNum);
        incomeArr.push(thisIncome);
        let incomeList = document.getElementById('incomeList')
        let listItem = document.createElement('li');
        listItem.textContent = thisIncome.incomeDesc + ": +$" + thisIncome.incomeNum;
        incomeList.appendChild(listItem);
        console.log(incomeArr);
        this.calcTotal();
    }
    
    addExpense(){
        let expenseNum = parseFloat(document.getElementById('expenseNum').value);
        let expenseDesc = document.getElementById('expenseDesc').value;
        let thisExpense = new expense(expenseDesc, expenseNum);
        expenseArr.push(thisExpense);
        let expenseList = document.getElementById('expenseList')
        let listItem = document.createElement('li');
        listItem.textContent = thisExpense.expenseDesc + ": -$" + thisExpense.expenseNum;
        expenseList.appendChild(listItem);
        console.log(expenseArr);
        this.calcTotal();
    }

    calcTotal(){ //Calculate and Display total Budget Amount 
        total = 0;
        for(let i = 0; i<incomeArr.length; i++){
            total+=incomeArr[i].incomeNum;
        }
        for(let i = 0; i<expenseArr.length; i++){
            total-=expenseArr[i].expenseNum;
        }
        document.getElementById('budgetTotal').innerText = 'Budget Total: $'+total;
    }
}

class income { //Income Class
    constructor (iDesc ,iNum){
        this.incomeDesc = iDesc;
        this.incomeNum = iNum;
    }
}

class expense { //Expense Class
    constructor (eDesc, eNum){
        this.expenseDesc = eDesc;
        this.expenseNum = eNum;
    }
}

var budget1 = new budget();