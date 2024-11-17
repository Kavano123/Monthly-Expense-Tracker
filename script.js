document.addEventListener('DOMContentLoaded', function(){
    displayExpenses()
    
})

document.addEventListener('keydown', function(event){
    if(event.key==='Enter'){
        addItem()
    }
})
const salarydiv=document.getElementById('Salary')
const addBtn = document.getElementById('submit'); 
const delAllBtn = document.getElementById('deleteAll'); 
const tblBody = document.getElementById('tableData'); 
const totalSpend = document.getElementById('totalspend')


addBtn.onclick = function(){
    addItem()

}

delAllBtn.onclick=function(){
    const confirmExpense = confirm('Are you sure you would like to delete all expenses?'); 

   if(confirmExpense){
    localStorage.clear(); 
    tblBody.innerHTML=''
   }
}

function addItem(){
    const amountInput = document.getElementById('amount'); 
    const locationInput = document.getElementById('location'); 
    const comments = document.getElementById('comments'); 

        if(amountInput.value&&locationInput.value){
            let amountvalue=parseFloat(amountInput.value)
            if(isNaN(amountvalue)){
                alert('Please enter a valid number')
                amountInput.value='';
            }else{
                let currentTimeDate = new Date().toLocaleString(); 
        
                let newItem = {
                    time: currentTimeDate,
                    amount: amountvalue, 
                    location: locationInput.value,  
                    comment: comments.value
                }
            
                let newestItem = JSON.parse(localStorage.getItem('itemsObject')) || []; 
                newestItem.push(newItem);
            
                let itemString = JSON.stringify(newestItem)
                localStorage.setItem('itemsObject', itemString)
            
                tblBody.innerHTML = '';
            
                for(let i =0; i<newestItem.length; i++){
                    const expense = newestItem[i];
                    let tr = document.createElement('tr')
                    tr.innerHTML = `
                    <td>${expense.time}</td>
                    <td>${expense.amount}</td>
                    <td>${expense.location}</td>
                    <td>${expense.comment}</td>
                    <td><button id="deleteExpense" class="button" onclick=deleteExpense(${i})>🗑️</button></td>
                    `;
            
                    tblBody.appendChild(tr)
                    amountInput.value='';
                    locationInput.value='';
                    comments.value='';
                }
                
                }
            }else{
                alert('Fill in the required fields')
            }
        totalExpense()
}
    
    

    

function displayExpenses(){
    let newestItem = JSON.parse(localStorage.getItem('itemsObject')) || []; 


    tblBody.innerHTML = '';

    for(let i =0; i<newestItem.length; i++){
        const expense = newestItem[i];
        let tr = document.createElement('tr')
        tr.innerHTML = `
         <td>${expense.time}</td>
        <td>${expense.amount}</td>
        <td>${expense.location}</td>
        <td>${expense.comment}</td>
        <td><button id="deleteExpense" class="btn" onclick=deleteExpense(${i})>🗑️</button></td>
        `;

        tblBody.appendChild(tr)
}
    totalExpense()
}

function totalExpense() {
    let newestItems = JSON.parse(localStorage.getItem('itemsObject')) || [];
    let total = 0;


    for(let i = 0; i < newestItems.length; i++){
        total += newestItems[i].amount;
    }

    totalSpend.innerHTML = ''; 
    let p = document.createElement('p');
    p.textContent = `Your total expenses for the month are: R${total.toFixed(2)}`;

    totalSpend.appendChild(p);
}

function deleteExpense(index){
    let ConfirmDelete = confirm('Are you sure you want to delete this item?')

    if(ConfirmDelete){
        let newestItem = JSON.parse(localStorage.getItem('itemsObject')) || [];

        newestItem.splice(index,1); 
    
        let itemString = JSON.stringify(newestItem)
        localStorage.setItem('itemsObject', itemString)
    
        tblBody.innerHTML='';
    
        for(let i=0; i<newestItem.length; i++){
            const expense = newestItem[i];
            let tr = document.createElement('tr')
            tr.innerHTML = `
            <td>${expense.time}</td>
            <td>${expense.amount}</td>
            <td>${expense.location}</td>
            <td>${expense.comment}</td>
            <td><button id="deleteExpense" class="button" onclick=deleteExpense(${i})>🗑️</button></td>
            `;
    
            tblBody.appendChild(tr)
    }
        totalExpense()
    
    }

   
}

