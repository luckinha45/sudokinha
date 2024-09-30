import { Sudoku } from "./sudoku.js";

class Cell {
	public annot:Array<boolean>;
	constructor(public value:number, public isFixo:boolean) {
		this.annot = [false, false, false, false, false, false, false, false, false];
	}

	public toggleAnnot(n:number) {
		this.annot[n-1] = !this.annot[n-1];
	}

	public clearAnnots() {
		this.annot = new Array(9).fill(false);
	}
}

class Board {
	public cells: Cell[][];

	constructor() {
		this.cells = new Array(9);
		for (let i = 0; i < 9; i++) {
			this.cells[i] = new Array(9);
			for (let j = 0; j < 9; j++) {
				this.cells[i][j] = new Cell(0, true);
			}
		}

		this.fillCells();
		// this.addHoles();
	}

	public insertValue(i:number, j:number, newVal:number) {
		// limpa toda a anotação da célula e da um toggle no valor preenchido
		board.cells[slctI][slctJ].clearAnnots();
		board.cells[slctI][slctJ].value = board.cells[slctI][slctJ].value == newVal ? 0 : newVal;

		// limpa anotações desse valor em linha, colula e grid dessa célula
		// checa coluna
		for (let ix = 0; ix < 9; ix++) {
			if (ix == i) continue;
			this.cells[ix][j].annot[newVal-1] = false;
		}

		// checa linha
		for (let jx = 0; jx < 9; jx++) {
			if (jx == j) continue;
			this.cells[i][jx].annot[newVal - 1] = false;
		}

		// checa quadrante
		let qi = Math.floor(i / 3) * 3;
		let qj = Math.floor(j / 3) * 3;
		for (let ix = qi; ix < qi + 3; ix++) {
			for (let jx = qj; jx < qj + 3; jx++) {
				if (ix == i && jx == j) continue;
				this.cells[ix][jx].annot[newVal - 1] = false;
			}
		}
	}

	public toString():string {
		let str = "";
		for (let i = 0; i < 9; i++) {
			if (i%3 == 0) str += "|-------+-------+-------|\n";
			for (let j = 0; j < 9; j++) {
				if (j%3 == 0) str += "| ";
				str += this.cells[i][j].value + " ";
			}
			str += "|\n";
		}
		str += "|-------+-------+-------|";

		return str;
	}

	private fillCells() {
		let s = new Sudoku();
        s.generateSudoku(70);

        let campoStr = s.printSudoku();
        for (let n = 0; n < campoStr.length; n++) {
            let j = n%9;
            let i = Math.floor(n/9);
            
			let v = Number(campoStr.charAt(n));
            this.cells[i][j].value = v;
			this.cells[i][j].isFixo = v == 0 ? false : true;
        }
	}

	public checkSameQuad(i1:number, j1:number, i2:number, j2:number):boolean {
		// calculando quadrante da celula [i1,j1]
		let qi1 = Math.floor(i1 / 3);
		let qj1 = Math.floor(j1 / 3);
		let quad1 = (qi1*3) + qj1;

		// calculando quadrante da celula [i2,j2]
		let qi2 = Math.floor(i2 / 3);
		let qj2 = Math.floor(j2 / 3);
		let quad2 = (qi2 * 3) + qj2;
		
		return quad1 == quad2;
	}

	private checkValid(i:number, j:number):boolean {
		// checa coluna
		for (let ix = 0; ix < 9; ix++) {
			if (ix == i) continue;
			if (this.cells[ix][j].value == this.cells[i][j].value) return true;
		}

		// checa coluna
		for (let jx = 0; jx < 9; jx++) {
			if (jx == j) continue;
			if (this.cells[i][jx].value == this.cells[i][j].value) return true;
		}

		// checa quadrante
		let qi = Math.floor(i / 3)*3;
		let qj = Math.floor(j / 3)*3;
		for (let ix = qi; ix < qi+3; ix++) {
			for (let jx = qj; jx < qj+3; jx++) {
				if (ix == i && jx == j) continue;
				if (this.cells[ix][jx].value == this.cells[i][j].value) return true;
			}
		}

		return false
	}

	public checkComplete():boolean {
		for (let i = 0; i < 9; i++) {
			for (let j = 0; j < 9; j++) {
				if (this.cells[i][j].value == 0) return false;
			}
		}
		return true;
	}

	public render() {
		let el = document.querySelector('#board');
		if (el == null) return;

		let tbl = '<table class="tbl_board">';

		this.cells.forEach((row, i) => {
			tbl += '<tr class="tr_board">';

			row.forEach((cell, j) => {
				let style = '';
				if (j == 2 || j == 5){
					style += 'border-right:3px solid white;';
				}
				if (i == 2 || i == 5) {
					style += 'border-bottom:3px solid white;';
				}

				if (!cell.isFixo) {
					style += 'color:gray;';
				}

				if (cell.value != 0 && !cell.isFixo) {
					if (cell.value != 0) if (this.checkValid(i, j)) {
						style += 'color:red;';
					}
				}

				// coloração de células relevantes
				if (slctI != -1 && slctJ != -1) {
					// colore celula selecionada
					if (slctI == i && slctJ == j) {
						style +=  'background-color:rgb(0,0,255)';
					}
					// colore os mesmos numeros da celula celecionada
					else if (this.cells[slctI][slctJ].value == this.cells[i][j].value && this.cells[i][j].value != 0) {
						style +=  'background-color:rgb(50,50,255)';
					}
					// colore se [i,j] é afetado pela celula celecionada
					else if (slctI == i || slctJ == j || this.checkSameQuad(slctI, slctJ, i, j)) {
						style +=  'background-color:rgb(0,0,139)';
					}
				}

				if (cell.value != 0) {
					tbl += `<td class="td_board" style="${style}" onclick="slctCell(${i}, ${j});">${String(cell.value)}</td>`;
				}
				else if (this.cells[i][j].annot.indexOf(true) == -1) {
					tbl += `<td class="td_board" style="${style}" onclick="slctCell(${i}, ${j});"></td>`;
				}
				else {
					let tbl_annot = '<table class="tbl_annot">';
					this.cells[i][j].annot.forEach((an, n) => {
						if (n % 3 == 0) {
							tbl_annot += '<tr>';
						}

						tbl_annot += `<td class="tbl_annot_td">${an == true ? String(n+1) : ''}</td>`;

						if (n%3 == 2){
							tbl_annot += '</tr>'
						}
					});
					tbl_annot += '</table>'
					
					tbl += `<td class="td_board" style="${style}" onclick="slctCell(${i}, ${j});">` + tbl_annot + '</td>';
				}
				// tbl += `<td class="td_board" style="${style}" onclick="slctCell(${i}, ${j});">${cell.value == 0 ? '' : String(cell.value)}</td>`;
			});

			tbl += '</tr>';
		});

		tbl += '</table>';

		el.innerHTML = tbl;
	}
}

document.addEventListener('keydown', ev => {
	if ((slctI >= 0 && slctI <=8 ) && (slctJ >= 0 && slctJ <=8 )) {
		try {
			if (ev.key == 'ArrowUp' && slctI > 0) {
				slctI--;
			}
			else if (ev.key == 'ArrowDown' && slctI < 8) {
				slctI++;
			}
			else if (ev.key == 'ArrowLeft' && slctJ > 0) {
				slctJ--;
			}
			else if (ev.key == 'ArrowRight'  && slctJ < 8) {
				slctJ++;
			}
			else if (ev.key == 'Escape') {
				slctI = slctJ = -1;
			}
			else if (ev.key == 'Backspace' && !board.cells[slctI][slctJ].isFixo) {
				if (annotMode) {
					board.cells[slctI][slctJ].clearAnnots();
				}
				else {
					board.cells[slctI][slctJ].value = 0;
				}
			}
			else if (!Number.isNaN(+ev.key) && !board.cells[slctI][slctJ].isFixo) {
				let n = Number(ev.key)
				
				if (annotMode) {
					board.cells[slctI][slctJ].toggleAnnot(n);
				}
				else {
					board.insertValue(slctI, slctJ, n);
					// board.cells[slctI][slctJ].clearAnnots();
					// board.cells[slctI][slctJ].value = board.cells[slctI][slctJ].value == n ? 0 : n;
				}
			}

			board.render();

			if (board.checkComplete()){
				window.alert('Sudoku Concluído!');
				main();
			}
		} 
		catch (error) { }
	}
	console.log(slctI, slctJ)
})

function slctCell(i:number, j:number) {
	slctI = i;
	slctJ = j;
	console.log('slctCell', i, j);
	
	board.render();
}

(<any>window).slctCell = slctCell;

// globals
var board:Board;
var slctI:number = 0;
var slctJ:number = 0;
var annotMode:boolean;

document.querySelector('#btn_annot').addEventListener('click', ev => {
	if (annotMode) {
		document.querySelector('#spn_annot').innerHTML = 'Off';
	}
	else {
		document.querySelector('#spn_annot').innerHTML = 'On';
	}

	annotMode = !annotMode;
});

function main() {
	slctI = -1;
	slctJ = -1;	
	board = new Board();
	board.render();

	annotMode = false;
	document.querySelector('#spn_annot').innerHTML = 'Off';
}

main();

