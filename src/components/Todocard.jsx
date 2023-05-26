import { useState, useRef, useEffect } from "react";
import { TbTrashXFilled } from 'react-icons/tb';
import { GoPencil } from 'react-icons/go';
import { MdCheckBox } from 'react-icons/md';
import { useDispatch } from "react-redux";
import { actions } from "../features/todos/todosSlice";

const TodoCard = ({ todo }) => {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [updatedContent, setUpdatedContent] = useState(todo.content);
  const inputRef = useRef(null);

  const handleToggle = (id) => {
    if (!editing) {
      dispatch(actions.toggleTodo({ id }));
    }
  };

  const handleRemove = (id) => {
    dispatch(actions.deleteTodo({ id }));
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = (id) => {
    dispatch(actions.editTodo({ id, content: updatedContent }));
    setEditing(false);
  };

  const handleKeyDown = (e, id) => {
    if (e.key === "Enter") {
      handleSave(id);
    }
  };

  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  return (
    <div className="flex justify-between p-4 border-2 rounded mb-4 items-center">
      <div className="flex gap-4 items-center">
        <input type="checkbox" name="completed" className="h-6 w-6" checked={todo.completed} onChange={() => handleToggle(todo.id)} />
        {!editing ? (
          <p style={{ textDecoration: todo.completed ? "line-through" : "none" }}>{todo.content}</p>
        ) : (
          <input type="text" value={updatedContent} onChange={(e) => setUpdatedContent(e.target.value)} className="border border-gray-300 rounded p-1" ref={inputRef} onKeyDown={(e) => handleKeyDown(e, todo.id)} />
        )}
      </div>
      {!todo.completed && (
        <div className="flex gap-2">
          {editing ? (
            <button className="btn bg-white hover:bg-violet-600" onClick={() => handleSave(todo.id)}>
              <MdCheckBox />
            </button>
          ) : (
            <button className="btn bg-white hover:bg-violet-600" onClick={handleEdit}>
              <GoPencil />
            </button>
          )}
          <button className="btn bg-white hover:bg-violet-600" onClick={() => handleRemove(todo.id)}>
            <TbTrashXFilled />
          </button>
        </div>
      )}
    </div>
  );
};

export default TodoCard;