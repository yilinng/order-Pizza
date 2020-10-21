const itemList = document.querySelector('.productList');

const orderList = document.querySelector('#order');

const itemSelect = document.querySelector('#order tbody');

//price total
const priceTotal = document.querySelector('.priceTotal');

//delete item
itemSelect.addEventListener('click', (e) => {
	 if(e.target.classList.contains('deleteItem') === true){
        let li = e.target.parentElement.parentElement;
    
      	let elList = priceTotal.getElementsByTagName('div');	
     
      	Array.from(elList).forEach(function(eOne) {
      			//if table and totaltext  price are same
				if (eOne.children[0].textContent.indexOf(li.children[3].textContent) !== -1) {
					//console.log('same');
					eOne.remove();
					li.remove();

				}
			});
      	priceChange();
			
    
    }
    //orderlist is empty
    if (itemSelect.children.length === 0) {
			//console.log('no one');
			let emptyItem = document.createElement('div');
				emptyItem.setAttribute('class', 'spaceOrder w-auto h-40 bg-blue-500 pt-10 pb-20 py-20');
			let emptyText = document.createElement('span');
				emptyText.setAttribute('class', 'm-auto text-2xl text-white text-center');
			emptyText.textContent = 'shopping cart is empty';
			emptyItem.appendChild(emptyText);
			itemSelect.insertBefore(emptyItem, itemSelect.children[0]);

			document.querySelector('.total').textContent = 0;		


	}
});


//table add button

itemSelect.addEventListener('click', (e) => {
	 if(e.target.classList.contains('addBtn') === true){
        let liAdd = e.target.parentElement.children[1];
        let totalAdd = parseInt(liAdd.textContent) + 1;
        	liAdd.textContent = totalAdd;
        let priceTable = e.target.parentElement.parentElement.children[3];       
       
       
        let elList = priceTotal.getElementsByTagName('div');	
      
      	Array.from(elList).forEach(function(eOne) {
      			//if table and totaltext price are same
				if (eOne.children[0].textContent.indexOf(priceTable.textContent) !== -1) {
					//let unit same
					eOne.children[2].textContent = liAdd.textContent;

				}
			});
		priceChange();
    }
});

//table Cut button

itemSelect.addEventListener('click', (e) => {
	 if(e.target.classList.contains('cutBtn') === true){
        let liCut = e.target.parentElement.children[1];
        if (parseInt(liCut.textContent) >= 2){
        	let totalCut = parseInt(liCut.textContent) - 1;
        	liCut.textContent = totalCut;

        	 let priceTable = e.target.parentElement.parentElement.children[3];              
       
		        let elList = priceTotal.getElementsByTagName('div');	
		      
		      	Array.from(elList).forEach(function(eOne) {
		      			//if table and totaltext price are same
						if (eOne.children[0].textContent.indexOf(priceTable.textContent) !== -1) {
							//let unit same
							eOne.children[2].textContent = liCut.textContent;

						}
					});
		      	priceChange();

		        }
       
    }
});



//price sum together
function priceChange(){
	let elList = priceTotal.getElementsByTagName('div');
	let totalEnd = document.querySelector('.lastTotal');
	//console.log(totalEnd.children[0]);
	let totalAll = 0;	
	Array.from(elList).forEach(function(eOne) {
		if (eOne.children[0].textContent.indexOf('total$') === -1) {
			//console.log(eOne.children[0], eOne.children[2]);
			let eTwo = parseInt(eOne.children[0].textContent) * parseInt(eOne.children[2].textContent);
			totalAll += eTwo;
		}
		
	});
	//console.log(totalAll);
	document.querySelector('.total').textContent = totalAll;

}


Array.from(document.querySelectorAll('.order'));  
      //keys.forEach(key => key.addEventListener('transitionend', removeTransition));
      window.addEventListener("click",orderPick);

     //judgment if have the same product
	function orderPick(e){
   	
    	//target have the the key class
    	if (e.target.classList.contains('order') === true) {
    		
    		const orderThese  = orderList.getElementsByClassName('topicName');			

    			//console.log(orderThese.length);
    			//Orderlist is empty
    	if (orderThese.length === 0) {

    			console.log('order no item');
    			if (document.querySelector('.spaceOrder') === null) {

    				selectItem(e);

    				}
    				else
    				{

    				document.querySelector('.spaceOrder').remove();
    					selectItem(e);

    				} 				
    			

    	}

    	else
    	{

			selectItem(e);			

    	}		
	}				
		
   }

 function selectItem(e){
 			const orderThis =  orderList.childNodes[1].children[1];

			const targetThis =  e.target.parentElement.children[0]; 

			    if (orderThis.innerText.includes(targetThis.textContent)=== true) {

			    	//console.log('have the same one')
  				
    				//filter table have the same topic 
    				let elList = document.querySelectorAll("td");

    				/*

					 It is HTMLCollection and it does not have forEach method. You can convert it to the array first. For example in ES6:

					Array.from(parent.children).forEach(child => {
    					console.log(child)
						});
    				*/
						Array.from(elList).forEach(function(el) {
						    if (el.innerText.indexOf(targetThis.textContent) !== -1) {
						        // Do what you like with el
						        // The needle is case sensitive
						        let unitTable = el.parentElement.children[2].children[1];

						        let priceTable = el.parentElement.children[3];
						        //get data-id from table
						        let idTable = parseInt(el.parentElement.dataset.id);
			      				//get total data-id from priceText
						        let totalThis = priceTotal.children[idTable-1];

						        let unitTarget = e.target.parentElement.children[2];
    							
    							//plus together
    							let total = parseInt(unitTable.textContent) + parseInt(unitTarget.value);

    							unitTable.innerHTML= total;
    							//text unit same with table unit
    							totalThis.children[2].textContent = unitTable.textContent;
    							//text price same with table price
    							totalThis.children[0].textContent = priceTable.textContent;
						    }
					});
			    	priceChange();
			    }else{
			    	//console.log('have the diff one');
			    	orderItem (e);
			    	priceChange();
			    }

 }  

function orderItem (e){

	let item = e.target.parentElement;
		//item  = form
		let itemlist = item.children;
		//item.children[2].value = unit
		//item.children[1].textContent[0] = $
		let topicList = item.children[0];
		//topicList topic
		let unitList = item.children[2].value;
		//item.parentElement.children[0] = image
		let imageList = item.parentElement.children[0];
		let dollarSign = item.children[1].textContent;
		let pricePick = dollarSign.slice(1, 4);
	
	//pricePick = price like $200
		
	//console.log(orderList.getElementsByTagName('tr'));
	
	//create element
	let tr = document.createElement('tr');
	tr.setAttribute('data-id',	itemSelect.children.length+1);
	let tdImage = document.createElement('td');
	let img = document.createElement('img');
	let tdTopic = document.createElement('td');
	let tdUnit = document.createElement('td');
	let btnCut = document.createElement('button');
	let spanUnit = document.createElement('span');
	let btnAdd = document.createElement('button');
	let tdPrice = document.createElement('td');
	let tdEdit = document.createElement('td');
	let btndelete = document.createElement('button');

	//image
	tdImage.setAttribute('class','border px-0 xl:px-4 py-0 xl:py-2');
	img.setAttribute('class','w-auto xl:w-1/3 h-auto m-auto');
	img.src = imageList.src;
	tdTopic.setAttribute('class','border px-4 py-2 text-center');
	tdTopic.textContent = topicList.textContent;
	
	tr.appendChild(tdImage).appendChild(img);

	//unit 
	tdUnit.setAttribute('class','flex justify-evenly border p-8');
	btnCut.setAttribute('class','cutBtn bg-red-500 text-white w-6 h-6');
	btnCut.textContent = '-';
	spanUnit.textContent = unitList;
	btnAdd.setAttribute('class','addBtn bg-blue-500 text-white w-6 h-6');
	btnAdd.textContent = '+';
	tdUnit.appendChild(btnCut);
	tdUnit.insertBefore(spanUnit, tdUnit.childNodes[1]);
	tdUnit.insertBefore(btnAdd, tdUnit.childNodes[2]);
	
	//price
	tdPrice.setAttribute('class','border px-4 py-2 text-center');
	tdPrice.textContent = pricePick;
	
	//edit
	tdEdit.setAttribute('class','border px-4 py-2 text-center');
	btndelete.setAttribute('class','deleteItem bg-green-500 text-white w-8 h-8');
	btndelete.textContent = 'X';
	tdEdit.appendChild(btndelete);

	let addThis = orderList.getElementsByTagName('tr');

	let tableAdd = document.querySelector('tbody');

	tableAdd.insertBefore(tr, tableAdd.childNodes[addThis.length + 1]);
	tr.insertBefore(tdTopic, tr.childNodes[1]);
	tr.insertBefore(tdUnit, tr.childNodes[2]);
	tr.insertBefore(tdPrice, tr.childNodes[3]);
	tr.insertBefore(tdEdit, tr.childNodes[4]);

	//insert text Calculate 

	let textNewOne = document.createElement('div');
	textNewOne.setAttribute('class', 'm-auto');
	textNewOne.setAttribute('data-id', itemSelect.children.length);
	let textPrice = document.createElement('span');
	textPrice.setAttribute('class', 'priceChoose text-4xl text-blue-500');
	textPrice.textContent = pricePick;

	let textX = document.createElement('span');
	textX.setAttribute('class','text-4xl text-blue-500');
	textX.textContent = 'X';

	let textUnit = document.createElement('span');
	textUnit.setAttribute('class', 'unitChoose text-4xl text-blue-500 ml-2');
	textUnit.textContent = unitList;

	let textNB = priceTotal.querySelectorAll('.priceChoose').length;

	textNewOne.appendChild(textPrice);
	//total.length 
	
		priceTotal.insertBefore(textNewOne, priceTotal.children[textNB]);

	
	textNewOne.insertBefore(textX, textNewOne.children[1]);
	textNewOne.insertBefore(textUnit, textNewOne.children[2]);

}





