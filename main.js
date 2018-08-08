var app = new Vue({
  el: '#app',
  data: {
    message: 'Введите размер матрицы',
    size_x: '4',
    size_y: '4',
    probability: '0.3',
    matrix: [],
    matrixClass: [],
    count_one: '0',
    table: [],
    colorCache: {},
  },
  methods: {
    createMatrix: function () {
      this.probability = 0;
      this.createMatrixRand();
    },
    createMatrixRand: function () {
      if ( (this.probability < 0) || (this.probability > 0.99) ) {
        alert('Вероятность должна быть от 0 до 0,99');
        return false;
      }

      if (this.matrix.length != 0) {
        let row = [this.probability, this.count_one, this.size_x + ' x ' + this.size_y];
        this.table.push(row);
        if (this.table.length > 10) this.table.shift();
      }

      let arr = new Array();
           for(let i=0; i<this.size_y; i++){
             arr[i] = new Array();
             for(let j=0; j<this.size_x; j++){
               if (Math.random()<= this.probability) {
                 // arr[i][j] = Math.round(Math.random());
                 arr[i][j] = 1;
               } else arr[i][j] = 0;
             }
           }
      this.matrix = arr;
    },

    change: function (i, j) {
      let arr = this.matrix.map(function(arr) {
        return arr.slice();
      });
      if (arr[i][j] == 0) arr[i][j] = 1;
      else arr[i][j] = 0;
      this.matrix = arr;
    },

    randomColor(i,j) {
      const r = () => Math.floor(256 * Math.random());
      id = this.matrixClass[i][j];
      if (!id) return  `rgb(255, 255, 255)`;
      return this.colorCache[id] || (this.colorCache[id] = `rgb(${r()}, ${r()}, ${r()})`);
    },

    classObject: function (i,j) {
      var result = [];
      if (this.matrixClass[i][j]) {
        result.push('domain' + this.matrixClass[i][j]);
      }
      return result;
    }
  },
  computed: {
  },
  watch: {
    'matrix'(newValue) {
      let numberBlock = 2;
      let arr2 = newValue.map(function(arr) {
        return arr.slice();
      });

      function isStartBlock(i, j, numberBlock) {
        if ( (j+1 < arr2[i].length) && ( arr2[i][j+1] == 1) )  {
          arr2[i][j+1] = numberBlock;
          isStartBlock(i, j+1, numberBlock);
        }
        if ( (i+1 < arr2.length) && ( arr2[i+1][j] == 1) )  {
          arr2[i+1][j] = numberBlock;
          isStartBlock(i+1, j, numberBlock);
        }

        if ( (j-1 >= 0) && ( arr2[i][j-1] == 1) )  {
          arr2[i][j-1] = numberBlock;
          isStartBlock(i, j-1, numberBlock);
        }
        if ( (i-1 >= 0) && ( arr2[i-1][j] == 1) )  {
          arr2[i-1][j] = numberBlock;
          isStartBlock(i-1, j, numberBlock);
        }

      }

      for(let i=0; i<arr2.length; i++){
       for(let j=0; j<arr2[i].length; j++){
        if (arr2[i][j] == 1) {
          arr2[i][j] = numberBlock;
          isStartBlock(i, j, numberBlock);
          numberBlock++;
        }
       }
      }
      this.count_one = numberBlock-2;
      this.matrixClass = arr2;
    }
  }
})
