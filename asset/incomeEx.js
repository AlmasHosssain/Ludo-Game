var budgetController=(function(){
	//some code
    
    var Income=function(id,description,value){
        this.id=id,
        this.description=description,
        this.value=value;
    }
    
     var Expenses=function(id,description,value){
        this.id=id,
        this.description=description,
        this.value=value,
        this.percentage=-1;
    }
     
     Expenses.prototype.calcPercentage=function(totalsIncome){
           
           if(totalsIncome>0){
             this.percentage=Math.round((this.value/totalsIncome)*100);
           }
           else{
            this.percentage=-1;
           }

        
     };
     Expenses.prototype.getPercentage=function(){
        return this.percentage;
     };
     
     
     
     var data={
         allitems:{
             exp:[],
             inc:[]
         },
         totalls:{
             exp:0,
             inc:0
         },
         budget:0,
         percentage:-1
     };
    
    var calculateTotals= function(type){
         
         var sum=0;
         
         data.allitems[type].forEach(function(curr){
             
             sum+=curr.value;
         });
         
         data.totalls[type]=sum;
     }
    
    return {
        
        addItem:function(type,des,val){
            var newitem,ID;
            
            //new ID
            if(data.allitems[type].length>0){
                ID=data.allitems[type][data.allitems[type].length -1].id+1;
            }else{
                ID=0;
            }
            
            
            if(type==='exp'){
                newitem=new Expenses(ID,des,val);
            }else if(type==='inc'){
                newitem=new Income(ID,des,val);
            }
            
            data.allitems[type].push(newitem);
            return newitem;
        },
        
        
        deleteItem: function(type,id){
            var ids,index;
            //ids=[1,2,3,4]
            
            ids=data.allitems[type].map(function(current){  //it convert new array 
                
                return current.id;
            });
            
          index=ids.indexOf(id);
            
            if(index !==-1){
                data.allitems[type].splice(index, 1); //extract null value
            }
        },
        
        calBudget: function(){
            
            //calulate th total income and expnses
              
            calculateTotals('exp');
            calculateTotals('inc');
            
            //calculate the budget: income-expenses
            
            data.budget=data.totalls.inc - data.totalls.exp;
            
            //claculate the percentage the we spend
            
            if(data.totalls.inc>0){
                data.percentage=Math.round((data.totalls.exp/data.totalls.inc)*100);
            }else{
                data.percentage=-1;
            }
            
        },

        calCulatePercentage: function(){

            data.allitems.exp.forEach(function(cr){
             
             cr.calcPercentage(data.totalls.inc);
            });

        },
        getPercentage:function(){
           var allPec=data.allitems.exp.map(function(cr){
             return cr.getPercentage();
           });
           return allPec;
        },
        
        getBudget: function(){
            
            return {
            budget: data.budget,
            toatalInc: data.totalls.inc,
            totalsExp: data.totalls.exp,
            percentage: data.percentage
            };
            
          
        },
        
        
        
        testing:function(){
            console.log(data);
        }
    };
    
})();

var UIcontroller=(function(){
//some code
//to get input

	var Domstring={
		DomInput:'.add_type',
		Domdescription:'.add_description',
		DomValue:'.add_value',
		Dom_btn:'.add_btn',
        incomeContainer:'.income_list',
        expensesContainer:'.expenses_list',
        budgetLabel:'.budget_value',
        incomeLablel:'.budget_income_value',
        expensesLabel:'.budget_expense_value',
        percentageLabel:'.budget_expense_percentage',
        container:'.container',
        expensesPercLabel:'.item__percentage'
	};
    
    return{
        getInput:function(){
            return{
            type:document.querySelector(Domstring.DomInput).value,
            description:document.querySelector(Domstring.Domdescription).value,
            value:parseFloat(document.querySelector(Domstring.DomValue).value)
            };
            
        },
        
        addListitem:function(obj,type){
            //1.string html
            var html,newhtml,element;
            if(type==='inc'){
                element=Domstring.incomeContainer;
                html='<div class="item clearfix" id="inc-%id%"> <div class="item_description">%description%</div><div class="right"><div class="item_value">%value%</div><div class="item_delete"><button class="item_delete_btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }else if(type==='exp'){
                element=Domstring.expensesContainer;
                html='<div class="item clearfix" id="exp-%id%"><div class="item_description">%description%</div><div class="right"><div class="item_value">%value%</div><div class="item__percentage">%45</div><div class="item_delete"><button class="item_delete_btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            
            //2.replace with actual element
            newhtml=html.replace('%id%',obj.id);
            newhtml=newhtml.replace('%description%',obj.description);
            newhtml=newhtml.replace('%value%',obj.value);
            //3.insert into DOM
            document.querySelector(element).insertAdjacentHTML('beforeend',newhtml);
        },
        
        
        deleteItemList: function(selectorID){
            var el;
            el=document.getElementById(selectorID);
            
            el.parentNode.removeChild(el);  // node.removeChild(node)
            
        },
        
        clearFields: function() {
        var fields,fieldsarr;
            fields = document.querySelectorAll(Domstring.Domdescription +', ' + Domstring.DomValue);
            
            fieldsarr = Array.prototype.slice.call(fields);
            console.log(fieldsarr);//it convert array object
            fieldsarr.forEach(function(current,index,array) {
                current.value = "";
            });
            
            fieldsarr[0].focus();
        },
        
        displayBudget:function(obj){
            document.querySelector(Domstring.budgetLabel).textContent=obj.budget;
            document.querySelector(Domstring.incomeLablel).textContent=obj.toatalInc;
            document.querySelector(Domstring.expensesLabel).textContent=obj.totalsExp;
            
            
          if(obj.percentage>0){
              document.querySelector(Domstring.percentageLabel).textContent=obj.percentage+'%';
          }else{
               document.querySelector(Domstring.percentageLabel).textContent='---';
          }
            
        },

        displayPercentage:function(percentages){


           var field=document.querySelector(Domstring.expensesPercLabel);
        },
        
        
        getDom:function(){
            return Domstring;
        }

};
})();


var controller=(function(ctrlbud,uictrl){
	//some codde
    
    
    var setEventController=function(){
        var Dom=uictrl.getDom();
        
        document.querySelector(Dom.Dom_btn).addEventListener('click',ctrlAddItem);
        document.addEventListener('keypress',function(event){
        if(event.keyCode===13 || event.which===13){
            ctrlAddItem();
        }
    });
        
        document.querySelector(Dom.container).addEventListener('click',ctrlDeleteItem);
    };
    
    
    var updateBudget= function(){
        //1.calculate the budget
        
        ctrlbud.calBudget();
        //2.return the budget
        var budget=ctrlbud.getBudget();
        
        
        //3.display the budget on the UI
        uictrl.displayBudget(budget);
    };
    
    
    
    var ctrlAddItem=function(){
        var input,newitem;
         input=uictrl.getInput();
        
        if(input.description !=='' && isNaN(input.description) && !isNaN(input.value) && input.value>0){
            
        newitem=ctrlbud.addItem(input.type,input.description,input.value); 
        uictrl.addListitem(newitem,input.type);
        
        //clear fields
        uictrl.clearFields();
            
            // calculate budget::::
            updateBudget();
            
            //4.update percentage
            
            updatePercentage();
        }
        
    };
    
    
    
    var ctrlDeleteItem=function(event){
        var itemID,splitID,type,ID;
        itemID=event.target.parentNode.parentNode.parentNode.id;
        if(itemID){
            //inc-1
            
            splitID=itemID.split('-');
            type=splitID[0];
            ID= parseInt(splitID[1]);
            
            //1.delte item from data Structure
            
            ctrlbud.deleteItem(type,ID);
            
            //2.delete item from UI
            
            uictrl.deleteItemList(itemID);
            
            //3.show the update budget and item
            
            updateBudget();
            
            //4.update percentage
            
            updatePercentage();
            
            
        }
    };
    
    var updatePercentage=function(){
        
        //1. calculate percentage
        ctrlbud.calCulatePercentage();
        //2. read percentage from budget
        var percentages=ctrlbud.getPercentage();
        //3. update the percentage with the new percentage
        console.log(percentages);
    };
    
    return{
        init:function(){
            uictrl.displayBudget({
            budget:0,
            toatalInc:0,
            totalsExp:0,
            percentage:-1
            });
            setEventController();
        }
    };
    
})(budgetController,UIcontroller);

controller.init();