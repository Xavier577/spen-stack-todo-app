<script>
  let description = "";

  const onSubmitForm = async () => {
    try {
      if (description) {
        const body = { description };
        await fetch("http://localhost:8080/todos/new", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(body),
        });

        window.location = "/";
      }
    } catch (error) {
      console.error(error);
    }
  };
</script>

<div>
  <h1 class="text-center mt-5">SPEN Todo List</h1>
  <form class="d-flex mt-5 " on:submit|preventDefault={onSubmitForm}>
    <input type="text" class="form-control" bind:value={description} />
    <button class="btn btn-success ml-1"> Add </button>
  </form>
</div>
