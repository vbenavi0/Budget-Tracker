var incomeArr = [];
var expenseArr = [];
var total = 0;
var incTotal = 0;
var expTotal = 0;
var iCounter = 0;
var eCounter = 0;

let USDollar = new Intl.NumberFormat('en-US', { //USD Formatter
    style: 'currency',
    currency: 'USD',
});

class budget { //Budget Class
    addIncome(){
        let incomeNum = document.getElementById('incomeNum').value;
        let incomeDesc = document.getElementById('incomeDesc').value;
        if(incomeNum!=""&&incomeDesc!=""){
            let thisIncome = new income(incomeDesc, parseFloat(incomeNum), 'inc'+iCounter);
            incomeArr.push(thisIncome);
            let incomeList = document.getElementById('incomeList')
            let listItem = document.createElement('li');
            listItem.textContent = thisIncome.incomeDesc + ": +" + USDollar.format(thisIncome.incomeNum);
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

            this.updateBar()
        }
        else{
            document.getElementById('incomeWarning').innerText = "Please Fill Out BOTH Amount and Description Boxes";
        }
    }
    
    addExpense(){
        let expenseNum = document.getElementById('expenseNum').value;
        let expenseDesc = document.getElementById('expenseDesc').value;
        if(expenseNum!=""&&expenseDesc!=""){
            let thisExpense = new expense(expenseDesc, parseFloat(expenseNum), 'exp'+eCounter);
            expenseArr.push(thisExpense);
            let expenseList = document.getElementById('expenseList')
            let listItem = document.createElement('li');
            listItem.textContent = thisExpense.expenseDesc + ": -" + USDollar.format(thisExpense.expenseNum);
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

            this.updateBar()
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
        document.getElementById('budgetTotal').innerText = 'Budget Total: ' + USDollar.format(total);
        document.getElementById('incTotal').innerText = 'Income Total: ' + USDollar.format(incTotal);
        document.getElementById('expTotal').innerText = 'Expense Total: ' + USDollar.format(expTotal);
    }

    updateBar(){ //Update Bar Graph
        let expPercent = expTotal/incTotal;
        console.log(expPercent);
        if(isNaN(expPercent)){ //If no income or expense
            document.getElementById("expBar").style.width = ('0%');
            document.getElementById("expBar").style.borderRadius = ('50px');
        }
        else if(expPercent === Infinity){ //If only no income
            document.getElementById("expBar").style.width = ('100%');
            document.getElementById("expBar").style.borderRadius = ('50px');
        }
        else if(expPercent >= 1){ //If expense if greater than income
            document.getElementById("expBar").style.width = ('100%');
            document.getElementById("expBar").style.borderRadius = ('50px');
        }
        else{ 
            document.getElementById("expBar").style.width = ((expPercent*100)+'%');
            document.getElementById("expBar").style.borderTopLeftRadius = ('0px');
            document.getElementById("expBar").style.borderBottomLeftRadius = ('0px');
        }
        document.getElementById('barNums').innerText = 'Income: ' + USDollar.format(incTotal) + ' / Expense: ' + USDollar.format(expTotal);
    }
}

class income extends budget{ //Income Class
    constructor (iDesc ,iNum, iId){
        super();
        this.incomeDesc = iDesc;
        this.incomeNum = iNum;
        this.incomeId = iId;
    }

    del(){ //Delete Function
        let inc = document.getElementById(this.incomeId)
        inc.remove();
        for(let i = 0; i<incomeArr.length; i++){
            if(incomeArr[i].incomeId === this.incomeId){
                incomeArr.splice(i, 1);
            }
        }
        console.log(incomeArr);

        this.calcTotals();

        this.updateBar();
    }
}

class expense extends budget{ //Expense Class
    constructor (eDesc, eNum, eId){
        super();
        this.expenseDesc = eDesc;
        this.expenseNum = eNum;
        this.expenseId = eId;
    }

    del(){ //Delete Function
        let exp = document.getElementById(this.expenseId)
        exp.remove();
        for(let i = 0; i<expenseArr.length; i++){
            if(expenseArr[i].expenseId === this.expenseId){
                expenseArr.splice(i, 1);
            }
        }
        console.log(expenseArr);

        this.calcTotals();
        
        this.updateBar();
    }
}

var budget1 = new budget();