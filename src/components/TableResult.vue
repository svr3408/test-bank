<template>
  <table>
    <caption class="table-caption">Таблица расчётов</caption>
      <thead>
        <tr>
        <th>Вероятность</th>
        <th>Количество доменов в матрице</th>
        <th>Количество ячеек в матрице (N*M)</th>
        </tr>
    </thead>
    <tbody>
      <tr v-for="row in table" :key="row.id">
        <td v-for="col in row" :key="col.id">{{col}}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    table: Array
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.table-caption {
  font-weight: 700;
  color: #959595;
  padding: 10px 0;
  text-align: center;
}

th {
    font-weight: bold;
  }

td, th {
    padding: 8px;
    vertical-align: top;
    border-top: 1px solid #ddd;
}
</style>
