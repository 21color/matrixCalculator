window.onload = () => {
	// help modal //
	const modalBox = document.querySelector('.modalBox');
	const circle = document.querySelector('.circle');
	const helpBtn = document.querySelector('#helpBtn');
	const matrixheader = document.querySelector('#matrixheader__title');

	matrixheader.style.transform = 'translateY(0rem)';
	modalBox.style.opacity = '1';
	circle.addEventListener('click', (e) => {
		modalBox.style.opacity = '0';
		modalBox.style.zIndex = '0';
	});
	helpBtn.addEventListener('click', (e) => {
		modalBox.style.opacity = '1';
		modalBox.style.zIndex = '10';
	});
	setTimeout(function () {
		scrollTo(0, 0);
	}, 100);

	//mouse wing wing~ //
	const myCircle = document.querySelector('#myCircle');

	colcc = () => {
		const colorplat = ['#3eecff', '#ff3d86', '#536dfe', '#3fffb2'];
		const randomcol = colorplat[Math.floor(Math.random() * colorplat.length)];
		myCircle.style.background = randomcol;
	};
	setInterval(colcc, 2000);

	document.addEventListener('mousemove', (e) => {
		const x = e.clientX;
		const y = e.clientY;
		myCircle.style.top = `${y}px`;
		myCircle.style.left = `${x}px`;
	});
};
// window onload시에 동적 추가된 element들이 내맘대로 동작하지 않을 수 있다. 주의주의!

// calculator class //
// data id , R, C //
class makeVal {
	constructor(specialId, numberR, numberC) {
		this.specialId = specialId;
		this.numberR = numberR;
		this.numberC = numberC;
	}

	// 박스 만들어주는 메소드 //
	makeofBox() {
		let arrayA = [];
		let arrayB = [];
		let i = 0;
		while (i < this.numberR) {
			arrayA.push([]);
			let j = 0;
			while (j < this.numberC) {
				arrayA[i][j] = 0;
				arrayB.push(
					`<input type="text" maxlength="4" id="${this.specialId}${i}__${j}"  class="boxinputBox" autocomplete="off"
          value="${arrayA[i][j]}"/>`
				);
				j++;
			}
			arrayB.push(`<br>`);
			i++;
		}
		return arrayB;
	}
	// 랜덤 돌릴때 실행될 메소드 //
	randomNumber() {
		let arrayA = [];
		let arrayB = [];
		let i = 0;
		while (i < this.numberR) {
			arrayA.push([]);
			let j = 0;
			while (j < this.numberC) {
				arrayA[i][j] = Math.floor(Math.random() * (999 - 1 + 1)) + 1;
				arrayB.push(`<input type="text" maxlength="4" id="${this.specialId}${i}__${j}" class="boxinputBox" autocomplete="off"
        value="${arrayA[i][j]}"/> `);
				j++;
			}
			arrayB.push(`<br>`);
			i++;
		}
		return arrayB;
	}

	// 차곡차곡 for A  //
	inputValueA() {
		let arrayA = [];
		let i = 0;
		while (i < this.numberR) {
			arrayA.push([]);
			let j = 0;
			while (j < this.numberC) {
				arrayA[i][j] = $('#' + this.specialId + i + '__' + j).val();
				j++;
			}
			i++;
		}
		return arrayA;
	}
	// 차곡차곡 for B //
	inputValueB() {
		let arrayB = [];
		let i = 0;
		while (i < this.numberR) {
			arrayB.push([]);
			let j = 0;
			while (j < this.numberC) {
				arrayB[i][j] = $('#' + this.specialId + i + '__' + j).val();
				j++;
			}
			i++;
		}
		return arrayB;
	}
	// plus 버튼 눌렀을때 //
	PlusValue(partAarray, partBarray) {
		let arrayA = [];
		let arrayB = [];
		let numberSum = 0;
		let i = 0;
		while (i < this.numberR) {
			arrayA.push([]);
			let j = 0;
			while (j < this.numberC) {
				numberSum += parseInt(partAarray[i][j]) + parseInt(partBarray[i][j]);
				arrayA[i][j] = myComma(numberSum);
				numberSum = 0;
				arrayB.push(`<div class="resultNumBox">${arrayA[i][j]}</div>`);
				j++;
			}
			arrayB.push(`<br>`);
			i++;
		}
		return arrayB;
	}
	// minus 버튼 눌렀을때 //
	MinusValue(partAarray, partBarray) {
		let arrayA = [];
		let arrayB = [];
		let numberSum = 0;
		let i = 0;
		while (i < this.numberR) {
			arrayA.push([]);
			let j = 0;
			while (j < this.numberC) {
				numberSum += parseInt(partAarray[i][j]) - parseInt(partBarray[i][j]);
				arrayA[i][j] = myComma(numberSum);
				numberSum = 0;
				arrayB.push(`<div class="resultNumBox">${arrayA[i][j]}</div>`);
				j++;
			}
			arrayB.push(`<br>`);
			i++;
		}
		return arrayB;
	}
	// 곱하기할때 //
	MultiValue(partAarray, partBarray) {
		let arrayA = [];
		let arrayB = [];
		let numberSum = 0;
		let i = 0;
		while (i < partAarray.length) {
			arrayA.push([]);
			let j = 0;
			while (j < partBarray[0].length) {
				let k = 0;
				while (k < partAarray[0].length) {
					numberSum += parseInt(partAarray[i][k]) * parseInt(partBarray[k][j]);
					k++;
				}
				arrayA[i][j] = myComma(numberSum);
				numberSum = 0;
				arrayB.push(`<div class="resultNumBox">${arrayA[i][j]}</div>`);
				j++;
			}
			i++;
			arrayB.push('<br>');
		}
		return arrayB;
	}
}

// 콤마찍어주기!!! //
myComma = (numberSum) => {
	return numberSum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// popup pong pong... //
popupfnc = (innertext) => {
	const modalPop = document.querySelector('.modalPop');
	modalPop.style.visibility = 'visible';
	modalPop.style.opacity = '1';
	modalPop.innerHTML = `<div class="modalWrap">
			<h1>Warning</h1>
				${innertext}
			<span class="material-icons circle" id="mclose"> circle </span>
		</div>
			`;
	const mclose = document.querySelector('#mclose');
	mclose.addEventListener('click', () => {
		modalPop.style.visibility = 'hidden';
		modalPop.style.opacity = '0';
	});
};

// btn click!!! and keyup ------- > boom

$(document).on({
	click: (e) => {
		const regsom = /^[1-7]{1}$/;
		const regtest = regsom.test($('.Arow, .Acol, .Brow, .Bcol').val());
		const testNum = 7;
		switch (e.target.id) {
			case 'calculate':
				if (
					regsom.test($('.Arow').val()) &&
					regsom.test($('.Acol').val()) &&
					regsom.test($('.Brow').val()) &&
					regsom.test($('.Bcol').val())
				) {
					$('#shuffleBtn, #addBtn, #removeBtn, #multiBtn').css({
						visibility: 'visible',
						opacity: '1',
						marginLeft: '3.2rem',
					});
				} else if (testNum < $('.Arow, .Acol, .Borw, .Bcol').val()) {
					popupfnc(`<p>지정된 숫자만 입력해주세요.</p>
				<p>1부터 7까지의 숫자만 입력 가능합니다.</p>`);
				} else {
					popupfnc(`<p>행렬을 먼저 만들어주세요.</p>
				<p>행렬이 만들어진 후에 연산버튼이 활성화됩니다.</p>`);
				}
				break;
			// readom btn //
			case 'shuffleBtn':
				if (regtest) {
					PartA = new makeVal('boxAnum', $('.Arow').val(), $('.Acol').val());
					PartB = new makeVal('boxBnum', $('.Brow').val(), $('.Bcol').val());
					$('.Resultbox__Abox').html(PartA.randomNumber());
					$('.Resultbox__Bbox').html(PartB.randomNumber());
				}
				break;
			// reset btn //
			case 'refreshBtn':
				$('.Arow, .Acol, .Brow, .Bcol').val('');
				$('.Resultbox__Abox, .Resultbox__Bbox, .Resultbox__finalBox').html('');
				$('.Resultbox__finalBox').css('display', 'none');
				$('#shuffleBtn, #addBtn, #removeBtn, #multiBtn').css({
					visibility: 'hidden',
					opacity: '0',
					marginLeft: '-5.2rem',
				});
				break;
			// add btn //
			case 'addBtn':
				if ($('.Arow').val() == $('.Brow').val() && $('.Acol').val() == $('.Bcol').val() && regtest) {
					$('.Resultbox__finalBox').html('');
					$('.Resultbox__finalBox').css('display', 'block');
					$('html, body').animate({ scrollTop: '1000' }, 800);
					PartA = new makeVal('boxAnum', $('.Arow').val(), $('.Acol').val());
					PartB = new makeVal('boxBnum', $('.Brow').val(), $('.Bcol').val());
					Finalresult = new makeVal('resultNum', $('.Arow').val(), $('.Acol').val());
					$('.Resultbox__finalBox').html(Finalresult.PlusValue(PartA.inputValueA(), PartB.inputValueB()));
				} else {
					popupfnc(`<p>행렬을 다시 확인해주세요.</p>
				<p>A와 B의 행렬이 같아야 합니다.</p>`);
				}
				break;
			// multi btn //
			case 'multiBtn':
				if ($('.Acol').val() == $('.Brow').val() && regtest) {
					$('.Resultbox__finalBox').html('');
					$('.Resultbox__finalBox').css('display', 'block');
					$('html, body').animate({ scrollTop: '1000' }, 800);
					PartA = new makeVal('boxAnum', $('.Arow').val(), $('.Acol').val());
					PartB = new makeVal('boxBnum', $('.Brow').val(), $('.Bcol').val());
					Finalresult = new makeVal('resultNum', $('.Brow').val(), $('.Bcol').val());
					$('.Resultbox__finalBox').html(Finalresult.MultiValue(PartA.inputValueA(), PartB.inputValueB()));
				} else {
					popupfnc(`<p>행렬을 다시 확인해주세요.</p>
				<p>곱셈은 A의 열의 개수와 <br>
				B의 행의 개수가 같아야합니다.</p>`);
				}
				break;
			//minus btn //
			case 'removeBtn':
				if ($('.Arow').val() == $('.Brow').val() && $('.Acol').val() == $('.Bcol').val() && regtest) {
					$('.Resultbox__finalBox').html('');
					$('.Resultbox__finalBox').css('display', 'block');
					$('html, body').animate({ scrollTop: '1000' }, 800);
					PartA = new makeVal('boxAnum', $('.Arow').val(), $('.Acol').val());
					PartB = new makeVal('boxBnum', $('.Brow').val(), $('.Bcol').val());
					Finalresult = new makeVal('resultNum', $('.Arow').val(), $('.Acol').val());
					$('.Resultbox__finalBox').html(Finalresult.MinusValue(PartA.inputValueA(), PartB.inputValueB()));
				} else {
					popupfnc(`<p>행렬을 다시 확인해주세요.</p>
				<p>A와 B의 행렬이 같아야 합니다.</p>`);
				}
				break;
		}
	},
	keyup: (e) => {
		$(e.target).val(
			$(e.target)
				.val()
				.replace(/[^-0-9]/g, '')
		);
		switch (e.target.className) {
			case 'boxinputBox':
				$('.warningShow').css({ opacity: '1' });
				break;

			default:
				$('.warningShow').css({ opacity: '0' });
		}
	},
});
// input min //
$('.Arow, .Acol, .Brow, .Bcol').on('input', (e) => {
	PartA = new makeVal('boxAnum', $('.Arow').val(), $('.Acol').val());
	PartB = new makeVal('boxBnum', $('.Brow').val(), $('.Bcol').val());
	const regsom = /^[1-7]$/;
	let testNum = 7;
	if (testNum < $(e.target).val()) {
		popupfnc(`<p>지정된 숫자만 입력해주세요.</p>
			<p>1부터 7까지의 숫자만 입력 가능합니다.</p>`);
		$(e.target).val('');
		$('.Resultbox__finalBox').css('display', 'none');
		$('#shuffleBtn, #addBtn, #removeBtn, #multiBtn').css({ visibility: 'hidden', opacity: '0', marginLeft: '-5.2rem' });
	} else {
		switch (e.target.className) {
			case 'Arow':
			case 'Acol':
				$('.Resultbox__Abox').html(PartA.makeofBox());
				break;
			case 'Brow':
			case 'Bcol':
				$('.Resultbox__Bbox').html(PartB.makeofBox());
				break;
		}
	}
	if (
		regsom.test($('.Arow').val()) &&
		regsom.test($('.Acol').val()) &&
		regsom.test($('.Brow').val()) &&
		regsom.test($('.Bcol').val())
	) {
		$('.waring').css({ opacity: '0' });
	} else {
		$('.waring').css({ opacity: '1' });
		$('.waring').text('1부터 7까지의 숫자를 입력해주세요.');
	}
});
