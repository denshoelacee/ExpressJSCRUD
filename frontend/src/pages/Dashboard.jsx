import React, { useEffect, useMemo, useState } from "react";
import { Calendar, CheckCircle, Clock, AlertCircle, Plus, Edit2, Trash2, View,
} from "lucide-react";
import Card from "../components/Card";
import sortTodos from "../utils/sort";
import Modal from "../components/Modal";
import { fetchTodosApi, addTodoApi, updateTodoApi, deleteTodoApi, markDoneApi,} from "../api/todoapi";
import Header from "../components/Header";
import DashboardLayout from "../layouts/DashboardLayout";

function Dashboard() {
    // TODO RESPONSE NORMALIZER
    const apiTodoResponse = (todo) => ({ ...todo, id: todo.todo_id });

    // EMPTY FORM VARIABLES
    const variables = {
        title: "",
        description: "",
        due_date: "",
        status: "",
    };

    const [form, setForm] = useState(variables);
    const [todos, setTodos] = useState([]);
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [loadingTodos, setLoadingTodos] = useState(true); 
    const [modal, setModal] = useState({ type: "", visible: false, todo: null });

    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    /** --------------------
     * EFFECT AUTO FETCH DATA
     * -------------------*/
    useEffect(() => {
        if (!token) {
        setError("No token, please login");
        return;
        }
        if (userData) setUser(JSON.parse(userData));
        fetchTodos();
    }, [token]);

    /** --------------------
     * API CALLS PASSING TO API TODOAPI.JS
     * -------------------*/
    const fetchTodos = async () => {
        setLoadingTodos(true);
        try {
        const res = await fetchTodosApi(token);
        setTodos(sortTodos(res.data.map(apiTodoResponse)));
        } catch {
        setError("Failed to fetch todos");
        } finally {
        setLoadingTodos(false);
        }
    };

    // ADD TODO
    const addTodo = async () => {
        const res = await addTodoApi(
        {
            title: form.title,
            description: form.description,
            due_date: form.due_date,
            user_id: user.id,
        },
        token
        );
        setTodos((prev) => sortTodos([...prev, apiTodoResponse(res.data)]));
        setMessage("Todo added successfully!");
    };

    // UPDATE
    const updateTodo = async () => {
        const res = await updateTodoApi(
        modal.todo.id,
        {
            title: form.title,
            description: form.description,
            due_date: form.due_date,
        },
        token
        );

        const updated = apiTodoResponse(res.data);
        setTodos((prev) =>
        sortTodos(prev.map((t) => (t.id === updated.id ? updated : t)))
        );
        setMessage("Todo updated successfully!");
    };

    // DELETE
    const deleteTodo = async (todo) => {
        if (!window.confirm("Are you sure you want to delete this todo?")) return;

        try {
        await deleteTodoApi(todo.todo_id, token);
        setTodos((prev) => prev.filter((t) => t.id !== todo.id));
        setMessage("Todo deleted successfully!");
        } catch {
        setError("Failed to delete todo");
        }
    };

    // MARK AS DONE
    const markDone = async (todo) => {
        try {
        const res = await markDoneApi(todo.todo_id, token);
        const updated = apiTodoResponse(res.data);

        setTodos((prev) =>
            sortTodos(prev.map((t) => (t.id === updated.id ? updated : t)))
        );

        setMessage("Todo marked as done!");
        } catch (err) {
        setError(err.response?.data?.error || "Failed to mark as done");
        }
    };
    /** --------------------
     * END OF API CALLS 
     * -------------------*/
    /** HANDLERS **/
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    // SUBMIT HANDLER FOR MODAL FORM
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) return setError("User info missing");

        setError("");
        setMessage("");
        setLoading(true);

        try {
        if (modal.type === "edit") await updateTodo();
        else await addTodo();
        closeModal();
        } catch (err) {
        setError(err.response?.data?.error || "Failed to save todo");
        } finally {
        setLoading(false);
        setForm(variables);
        }
    };

    const openModal = (type, todo = null) => {
        setModal({ type, visible: true, todo });
        if (todo) {
        setForm({
            title: todo.title,
            description: todo.description,
            due_date: todo.due_date,
            status: todo.status,
        });
        }
    };

    const closeModal = () => {
        setModal({ type: "", visible: false, todo: null });
        setForm(variables);
    };


    /** --------------------
     * FOR ANALYTICS STATS
     * -------------------*/
    const today = useMemo(() => {
        const d = new Date();
        d.setHours(0, 0, 0, 0);
        return d;
    }, []);

    // CALCULATE STATS FOR DASHBOARD
    const stats = useMemo(() => {
        const total = todos.length;

        const dueToday = todos.filter(
        (t) =>
            new Date(t.due_date).toDateString() === today.toDateString() &&
            t.status !== "completed"
        ).length;

        const upcoming = todos.filter(
        (t) => new Date(t.due_date) >= today && t.status !== "completed"
        ).length;

        const overdue = todos.filter(
        (t) => new Date(t.due_date) < today && t.status !== "completed"
        ).length;

        const completed = todos.filter(
        (t) => t.status === "completed"
        ).length;


        return [ 
            { icon: <Calendar />,value: total, title: "All Todos", color: "bg-blue-50 text-blue-600", bgColor: "bg-blue-200", },
            { icon: <CheckCircle />, value: dueToday, title: "Due Today", color: "bg-amber-50 text-amber-600", bgColor: "bg-amber-200", }, 
            { icon: <AlertCircle />, value: upcoming, title: "Upcoming Tasks", color: "bg-green-50 text-green-600", bgColor: "bg-green-200", }, 
            { icon: <Clock />, value: overdue, title: "Overdue", color: "bg-red-50 text-red-600", bgColor: "bg-red-200", },
            { icon: <CheckCircle />, value: completed, title: "Completed", color: "bg-emerald-50 text-emerald-600", bgColor: "bg-emerald-200",}
        ];
    }, [todos, today]);

    return (
        <DashboardLayout>
        {/* HEADER */}
        <div className="mb-8">
            <Header headerTitle={"Dashboard"} />
            {user && (
            <p className="text-gray-600 text-lg">
                Welcome back,{" "}
                <span className="font-semibold text-gray-800">{user.first_name}</span>
            </p>
            )}
        </div>

        {/* MESSAGES */}
        {error && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg flex items-start gap-3">
            <AlertCircle className="text-red-500 mt-0.5" size={20} />
            <p className="text-red-700">{error}</p>
            </div>
        )}
        {message && (
            <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-lg flex items-start gap-3">
            <CheckCircle className="text-green-500 mt-0.5" size={20} />
            <p className="text-green-700">{message}</p>
            </div>
        )}

        {/* ANALYTICS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            {loadingTodos
            ? Array(4)
                .fill(0)
                .map((_, i) => (
                    <div
                    key={i}
                    className="animate-pulse p-6 rounded-2xl bg-gray-100 h-28"
                    ></div>
                ))
            : stats.map((s) => (
                <Card
                    key={s.title}
                    icon={s.icon}
                    value={s.value}
                    title={s.title}
                    color={s.color}
                    bgColor={s.bgColor}
                />
                ))}
        </div>

        {/* TODO LIST */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex justify-between py-3">
            <h2 className="text-2xl font-bold text-gray-800">Your Tasks</h2>
            <button
                onClick={() => openModal("add")}
                className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 cursor-pointer text-white px-6 py-3 rounded-xl"
            >
                <Plus size={20} /> Add Todo
            </button>
            </div>

            <div className="space-y-4">
            {loadingTodos
                ? Array(3)
                    .fill(0)
                    .map((_, i) => (
                    <div
                        key={i}
                        className="animate-pulse border rounded-xl p-5 bg-gray-100 h-32"
                    ></div>
                    ))
                : todos.length === 0
                ? (
                <div className="text-center py-12">
                    <div className="inline-block p-4 bg-gray-100 rounded-full mb-4">
                    <Calendar className="text-gray-400" size={48} />
                    </div>
                    <p className="text-gray-500 text-lg">No todos yet. Start by adding one!</p>
                </div>
                )
                : todos.map((todo) => {
                    const dueDate = new Date(todo.due_date);
                    const isOverdue = dueDate < today;
                    const isDueToday = dueDate.toDateString() === today.toDateString();

                    return (
                    <div
                        key={todo.id}
                        className={`group border rounded-xl p-5 transition-all ${
                        todo.status === "completed"
                            ? "bg-green-50 line-through text-gray-400"
                            : isOverdue
                            ? "bg-red-50 border-red-200"
                            : isDueToday
                            ? "bg-amber-50 border-amber-200"
                            : "bg-gray-50 border-gray-200"
                        }`}
                    >
                        <div className="flex justify-between items-start">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                            {todo.status === "completed" ? (
                                <CheckCircle className="text-green-500" size={18} />
                            ) : isOverdue ? (
                                <AlertCircle className="text-red-500" size={18} />
                            ) : isDueToday ? (
                                <Clock className="text-amber-500" size={18} />
                            ) : (
                                <Calendar className="text-blue-500" size={18} />
                            )}
                            <h3 className="text-lg font-semibold text-gray-800">
                                {todo.title}
                            </h3>
                            </div>
                            <p className="text-gray-600 mb-3">{todo.description}</p>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Calendar size={16} />
                            <span>
                                {dueDate.toLocaleDateString("en-US", {
                                weekday: "short",
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                                })}
                            </span>
                            </div>
                        </div>

                        <div className="flex gap-2 opacity-0 group-hover:opacity-100">
                            {todo.status !== "completed" && (
                            <>
                                <button
                                onClick={() => markDone(todo)}
                                className="p-2 bg-green-100 text-green-600 rounded-lg cursor-pointer"
                                title="Mark as Done"
                                >
                                <CheckCircle size={18} />
                                </button>
                                <button
                                onClick={() => openModal("view", todo)}
                                className="p-2 bg-blue-100 text-blue-600 rounded-lg cursor-pointer"
                                title="View"
                                >
                                <View size={18} />
                                </button>
                                <button
                                onClick={() => openModal("edit", todo)}
                                className="p-2 bg-indigo-100 text-indigo-600 rounded-lg cursor-pointer"
                                title="Edit"
                                >
                                <Edit2 size={18} />
                                </button>
                                <button
                                onClick={() => deleteTodo(todo)}
                                className="p-2 bg-red-100 text-red-600 rounded-lg cursor-pointer"
                                title="Delete"
                                >
                                <Trash2 size={18} />
                                </button>
                            </>
                            )}
                            {todo.status === "completed" && (
                            <>
                                <button
                                onClick={() => openModal("view", todo)}
                                className="p-2 bg-blue-100 text-blue-600 rounded-lg cursor-pointer"
                                title="View"
                                >
                                <View size={18} />
                                </button>
                                <button
                                onClick={() => deleteTodo(todo)}
                                className="p-2 bg-red-100 text-red-600 rounded-lg cursor-pointer"
                                title="Delete"
                                >
                                <Trash2 size={18} />
                                </button>
                            </>
                            )}
                        </div>
                        </div>
                    </div>
                    );
                })}
            </div>
        </div>

        <Modal
            visible={modal.visible}
            type={modal.type}
            form={form}
            loading={loading}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onClose={closeModal}
        />
        </DashboardLayout>
    );
}

export default Dashboard;


