<script>
  import { onMount } from "svelte";
  import EditTodo from "./EditTodo.svelte";

  let todos = [];

  const deleteTodo = async (id) => {
    try {
      await fetch(`http://localhost:8080/todos/${id}`, {
        method: "DELETE",
      });
      todos = todos.filter((todo) => todo.todo_id !== id);
    } catch (error) {
      console.error(error)
    }
  };

  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:8080/todos");
      const jsonData = await response.json();
      todos = jsonData;
    } catch (error) {
      console.error(error);
    }
  };

  onMount(() => {
    getTodos();
  });
</script>

<table class="table table-hover text-center mt-5">
  <thead>
    <tr>
      <th>Description</th>
      <th>Edit</th>
      <th>Delete</th>
    </tr>
  </thead>
  <tbody>
    {#each todos as todo (todo.todo_id)}
      <tr>
        <td>{todo.description}</td>
        <td> <EditTodo {todo} /></td>
        <td
          ><button
            class="btn btn-danger"
            on:click={() => deleteTodo(todo.todo_id)}>Delete</button
          ></td
        >
      </tr>
    {/each}
  </tbody>
</table>
