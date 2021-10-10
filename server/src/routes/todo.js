const express = require("express");
const client = require("../config/databaseConfig");

const todoRouter = express.Router();

// get all todos
todoRouter.get("/", async (_req, res) => {
  try {
    const allTodos = await client.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "500 error" });
  }
});

// get a todo
todoRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const intId = parseInt(id);
    if (!isNaN(intId)) {
      const todo = await client.query("SELECT * FROM todo WHERE todo_id = $1", [
        intId,
      ]);
      res.json(todo.rows);
    } else {
      res.json({ error: "id must be an integer" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "500 error" });
  }
});

// update a todo
todoRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const intId = parseInt(id);

    if (!isNaN(intId) && description) {
      await client.query(
        " UPDATE todo SET description = $1 WHERE todo_id = $2",
        [description, intId]
      );

      res.json("Sucessfully Updated!");
    } else {
      res.json({ error: "invalid input" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "500 error" });
  }
});

// delete a todo
todoRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const intId = parseInt(id);

    if (!isNaN(intId)) {
      await client.query("DELETE FROM todo WHERE todo_id = $1", [id]);
      res.json("Sucessfully Deleted");
    } else {
      res.json({ error: "Invalid input: id must be an integer" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "500 error" });
  }
});

// create a todo
todoRouter.post("/new", async (req, res) => {
  try {
    const { description } = req.body;
    if (description) {
      const newTodo = await client.query(
        "INSERT INTO todo (description) values($1) RETURNING *",
        [description]
      );
      res.json(newTodo.rows[0]);
    } else {
      res.json({
        error: "field cannot be empty",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "500 error" });
  }
});

module.exports = todoRouter;
