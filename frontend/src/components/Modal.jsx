import React from "react";
import { X } from "lucide-react";

function Modal({ visible, type, form, loading, onChange, onSubmit, onClose,
}) {
  if (!visible) return null;

  const isView = type === "view";

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h3 className="text-2xl font-bold text-gray-800">
            {type === "edit"
              ? "Edit Todo"
              : type === "view"
              ? "View Todo"
              : "Add Todo"}
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition cursor-pointer"
          >
            <X size={22} />
          </button>
        </div>

        <form onSubmit={onSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              name="title"
              value={form.title}
              onChange={onChange}
              disabled={isView}
              required
              className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={onChange}
              disabled={isView}
              rows={3}
              className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Due Date
            </label>
            <input
              type="date"
              name="due_date"
              value={form.due_date}
              onChange={onChange}
              disabled={isView}
              required
              min={new Date().toISOString().split("T")[0]} // Prevent past dates
              className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {isView && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                  form.status === "completed"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {form.status}
              </span>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            {!isView && (
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 cursor-pointer rounded-xl transition disabled:opacity-50"
              >
                {loading
                  ? "Saving..."
                  : type === "edit"
                  ? "Update Todo"
                  : "Add Todo"}
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition cursor-pointer"
            >
              {isView ? "Close" : "Cancel"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modal;
