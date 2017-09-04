'use strict';
document.addEventListener("DOMContentLoaded", (ev) => {
	(()=>{
		let math = new MathMashine({
			min: 0,
			max: 10,
			octothorpe: ['+', '-']
		});
	})();
}, false);

function MathMashine(options){
	let that = this;
	this.max = options&&options.max ? options.max: 10;
	this.min =  options&&options.min ? options.min: 0;
	this.octothorpe = options&&options.octothorpe ? options.octothorpe: ['+', '-'];
	this.example;
	this.inputs;
	this.result=[];
	let examination = () => {
		that.input = Array.from(document.querySelectorAll('.result'));
		let width = Math.max(...that.result).toString();
		that.input.forEach((item, i) => {
		    item.onkeydown = (ev) => {
				if(ev.keyCode == 13){
					if(item.value == item.getAttribute('result')) {
						item.style.color = 'rgba(10, 242, 101, 0.4)';
						that.input[i + 1].focus();
					}

					else 
						item.style.color = 'rgba(242, 10, 10, 0.4)';
				}
			}
		item.style.width = width.length + 'ch';  
		});
		that.input[0].focus();
	}

	let gen = () => {
		for (var i = 0; i < that.example.length; i++) {
			that.setNums(that.example[i].children[0]);
			that.setNums(that.example[i].children[2]);
			that.setOctothorpe(that.example[i].children[1]);
			that.setResult(that.example[i]);
			that.example[i].children[3].textContent = ' = ';
			examination();
		}
	}

	function random(min, max) {
		var rand = min - 0.5 + Math.random() * (max - min + 1)
		rand = Math.round(rand);
		return rand;
	}

	function randomOctothorpe(arr) {
    	var operator = Math.floor(Math.random() * arr.length);
    	var operatorSign = arr[operator];
    	return operatorSign;
	}
	
	
	this.setNums = (el) => {
		el.textContent = random(that.min, that.max);
	}

	this.setOctothorpe = (el) => {
		el.textContent = randomOctothorpe(that.octothorpe);
	}

	this.setResult = (el, str) => {
		let result = eval(el.textContent);
		el.lastElementChild.setAttribute('result', result);
		that.result.push(result);
	};

	(this.draw = () => {
		let container = document.getElementById('section');

			let column = document.createElement('div');
				column.className = 'column';
			
			let drawingCells = "<div class='example'><span class='num' data-num=''></span><span class='operator'></span><span class='num' data-num=''></span><span class='operator equal'></span><input type='text' class='result' result=''></div>";
		
			let collection = '';
			for (let i = 5; i > 0; i--) {
				collection += drawingCells;
			}
			column.innerHTML = collection;
			container.appendChild(column);
			let clone = column.cloneNode(true);
			container.appendChild(clone);
			that.example = Array.from(document.querySelectorAll('.example'));
			gen();
			
	})();
}