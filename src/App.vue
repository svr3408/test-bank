<template>
  <div id="app">
    <Input title="Количество столбцов" v-bind:value="size_x" @input="val => size_x = val"/>
    <Input title="Количество сток" v-bind:value="size_y" @input="val => size_y = val"/>
    <br>

    <button class="btn" @click="createMatrix">Заполнить матрицу нулями</button>
    <button class="btn" @click="createMatrixRand">Заполнить матрицу автоматически</button><br>
    <label>Вероятности использования единицы
      <input type="number" maxlength="2" min="0.01" max="0.99" size="3" step="0.01" v-model="probability">
    </label>
    <br><br>
    <table v-if="matrix.length > 0">
      <caption class="table-caption">Матрица</caption>
      <tbody>
        <tr v-for="(row, indexi) in matrix" :key="indexi">
          <td v-for="(col, indexj) in row" :key="indexj">
            <button v-bind:style="{ backgroundColor: color( indexi, indexj ) }" v-on:click="change(indexi, indexj)">
              {{col}}
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div> Количество доменов: {{ count_one }}</div>

    <TableResult v-bind:table="table"/>
  </div>
</template>

<script>
import TableResult from './components/TableResult.vue'
import Input from './components/Input.vue'

export default {
  name: 'app',
  data() {
    return {
      message: 'hello',
      size_x: '10',
      size_y: '10',
      probability: '0.3',
      matrix: [],
      matrixClass: [],
      count_one: '0',
      table: [],
      colors: [],
    }
  },
  methods: {
    createMatrix: function () {
      this.probability = 0;
      this.createMatrixRand();
    },
    createMatrixRand: function () {
      this.colors = {};
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
    color: function ( i, j ) {
      if (this.matrixClass[i][j]) {
        let domain = this.matrixClass[i][j];

        if ( ! this.colors[domain] ) {
          this.colors[domain] = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
        }
        return this.colors[domain];
      }
      return '';
    },
  },
  watch: {
    matrix(newValue) {
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
  },
  components: {
    TableResult,
    Input
  }
}
</script>

<style>
#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  text-align: center;
}

.btn {
  margin: 15px;
}

table {
  margin: 0 auto;
}
</style>
