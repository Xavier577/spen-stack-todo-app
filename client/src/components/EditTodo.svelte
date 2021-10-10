<script>
  export let todo;
  let description = todo.description;

  const resetToDefault = () => {
    description = todo.description;
  };

  const updateDescription = async () => {
    try {
      if (description) {
        const body = { description };
        const response = await fetch(
          `http://localhost:8080/todos/${todo.todo_id}`,
          {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(body),
          }
        );

        console.log(response);

        window.location = "/";
      }
    } catch (err) {
      console.error(err);
    }
  };
</script>

<div class="container">
  <!-- Button to Open the Modal -->
  <button
    type="button"
    class="btn btn-primary"
    data-toggle="modal"
    data-target={`#id${todo.todo_id}`}
  >
    Edit
  </button>

  <!-- The Modal -->
  <div class="modal fade" id={`id${todo.todo_id}`}>
    <div class="modal-dialog">
      <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="modal-title">Edit Todo</h4>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            on:click={resetToDefault}>&times;</button
          >
        </div>

        <!-- Modal body -->
        <div class="modal-body">
          <input
            type="text"
            class="form-control"
            bind:value={description}
            name=""
            id=""
          />
        </div>

        <!-- Modal footer -->
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-primary"
            data-dismiss="modal"
            on:click|preventDefault={updateDescription}>Edit</button
          >
          <button
            type="button"
            class="btn btn-danger"
            data-dismiss="modal"
            on:click={resetToDefault}>Close</button
          >
        </div>
      </div>
    </div>
  </div>
</div>
