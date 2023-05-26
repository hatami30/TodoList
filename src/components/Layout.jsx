/* eslint-disable react/no-unescaped-entities */
import { Link, Outlet, useLocation } from "react-router-dom";
import { actions } from "../features/todos/todosSlice";
import { useDispatch, useSelector } from "react-redux";

const Layout = () => {
  const location = useLocation();

  const userInput = useSelector((state) => state.todos.userInput);
  const dispatch = useDispatch();

  const handleCreateTodo = (e) => {
    e.preventDefault();
    dispatch(actions.createTodo());
  };

  const handleSetUserInput = (userInput) => {
    dispatch(actions.setUserInput({ userInput }));
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="max-w-2xl container mx-auto">
          <div className="row text-center p-5 text-gray-800 font-bold mb-12">
            <div className="col">
              <h1 className="text-5xl">What's the plan for today?</h1>
            </div>
          </div>

          <form
            className="flex gap-6 p-8 font-medium"
            onSubmit={handleCreateTodo}
          >
            <input
              type="text"
              value={userInput}
              onChange={(e) => handleSetUserInput(e.target.value)}
              placeholder="What to do"
              className="p-2 w-full border-neutral-300 border-solid border-2 rounded"
              autoFocus
            />
            <input type="submit" className="py-3 px-6 bg-violet-600 text-white font-semibold rounded-md shadow-md hover:bg-violet-800" value="Add" />
          </form>
          <nav>
            <ul className="flex gap-5 p-8">
              <li
                className={`bg-gray-500 hover:bg-gray-700 text-white font-semibold px-3 rounded-xl ${location.pathname === "/" ? "bg-teal-600" : ""
                  }`}
              >
                <Link to="/">ALL</Link>
              </li>
              <li
                className={`bg-gray-500 hover:bg-gray-700 text-white font-semibold px-3 rounded-xl ${location.pathname === "/active" ? "bg-teal-600" : ""
                  }`}
              >
                <Link to="/active">ACTIVE</Link>
              </li>
              <li
                className={`bg-gray-500 hover:bg-gray-700 text-white font-semibold px-3 rounded-xl ${location.pathname === "/completed" ? "bg-teal-600" : ""
                  }`}
              >
                <Link to="/completed">COMPLETED</Link>
              </li>
            </ul>
          </nav>
          <section className="p-2">
            <Outlet />
          </section>
        </div>
      </div>
    </>
  );
};

export default Layout;
