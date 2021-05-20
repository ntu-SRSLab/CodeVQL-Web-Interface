<template>
    <table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">Method</th>
      <th scope="col">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>fqn()</td>
      <td>Returns the full path to the class</td>
    </tr>
    <tr>
      <td>getClosure()</td>
      <td>Returns the set of methods and types that it relates to</td>
    </tr>
  </tbody>
</table>
</template>

<script>
export default {
  name: "ContainmentMethodSummary"
};
</script>