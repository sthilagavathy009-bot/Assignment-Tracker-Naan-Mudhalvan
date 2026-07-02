import React, { useState } from "react";

function AssignmentTracker() {
  const [assignments, setAssignments] = useState([]);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [filterSubject, setFilterSubject] = useState("");

  // Add new assignment
  const addAssignment = () => {
    if (!title || !subject || !dueDate) return;
    const newAssignment = {
      id: Date.now(),
      title,
      subject,
      dueDate,
      status: "Pending",
    };
    setAssignments([...assignments, newAssignment]);
    setTitle("");
    setSubject("");
    setDueDate("");
  };

  // Update status
  const updateStatus = (id, status) => {
    setAssignments(
      assignments.map((a) =>
        a.id === id ? { ...a, status } : a
      )
    );
  };

  // Auto-mark late
  const markLateAssignments = () => {
    const today = new Date();
    setAssignments(
      assignments.map((a) => {
        if (new Date(a.dueDate) < today && a.status !== "Submitted") {
          return { ...a, status: "Late" };
        }
        return a;
      })
    );
  };

  // Dashboard summary
  const summary = {
    total: assignments.length,
    submitted: assignments.filter((a) => a.status === "Submitted").length,
    pending: assignments.filter((a) => a.status === "Pending").length,
    late: assignments.filter((a) => a.status === "Late").length,
  };

  // Filtered list
  const filteredAssignments = filterSubject
    ? assignments.filter((a) => a.subject === filterSubject)
    : assignments;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>College Assignment Submission Tracker</h2>

      {/* Add Assignment Form */}
      <div>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button onClick={addAssignment}>Add Assignment</button>
      </div>

      {/* Filter */}
      <div style={{ marginTop: "10px" }}>
        <label>Filter by Subject: </label>
        <input
          type="text"
          placeholder="Enter subject"
          value={filterSubject}
          onChange={(e) => setFilterSubject(e.target.value)}
        />
      </div>

      {/* Dashboard Summary */}
      <div style={{ marginTop: "20px" }}>
        <h3>Dashboard Summary</h3>
        <p>Total: {summary.total}</p>
        <p>Submitted: {summary.submitted}</p>
        <p>Pending: {summary.pending}</p>
        <p>Late: {summary.late}</p>
        <button onClick={markLateAssignments}>Update Late Status</button>
      </div>

      {/* Assignment List */}
      <div style={{ marginTop: "20px" }}>
        <h3>Assignments</h3>
        <table border="1" cellPadding="5">
          <thead>
            <tr>
              <th>Title</th>
              <th>Subject</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {filteredAssignments.map((a) => (
              <tr key={a.id}>
                <td>{a.title}</td>
                <td>{a.subject}</td>
                <td>{a.dueDate}</td>
                <td>{a.status}</td>
                <td>
                  <button onClick={() => updateStatus(a.id, "Submitted")}>
                    Submitted
                  </button>
                  <button onClick={() => updateStatus(a.id, "Pending")}>
                    Pending
                  </button>
                  <button onClick={() => updateStatus(a.id, "Late")}>
                    Late
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AssignmentTracker;