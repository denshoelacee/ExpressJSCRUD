function sortTodos(todos) {
  return [...todos].sort((a, b) => {
    //  STATUS : INCOMPLETE
    if (a.status === "completed" && b.status !== "completed") return 1;
    // STATUS : COMPLETED
    if (a.status !== "completed" && b.status === "completed") return -1;

    //  DUE DATE SORTING
    const dateA = new Date(a.due_date);
    const dateB = new Date(b.due_date);

    return dateA - dateB;
  });
}
// used to sort todos in the dashboard based on day/month/year
export default sortTodos;