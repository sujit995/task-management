"use client";
import { db } from "../../../firebase";
import { child, get, ref, remove, set } from "firebase/database";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

export default function ViewUpdateDeletePage({ params }) {
    const { push }  = useRouter();
  const [usersList, setUsersList] = useState([]);
  const [formData, setFormData] = useState({
    title: null,
    description: null,
    status: null,
    assigned_user: null,
    deadline: null,
  });

  const getUserList = () => {
    get(child(ref(db), `users`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          const data = snapshot.val();
          setUsersList(Object.values(data));
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getTaskDetails = () => {
    get(child(ref(db), `tasks/${params.id}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          const data = snapshot.val();
          setFormData(data);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    getUserList();
    getTaskDetails();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    set(ref(db, `tasks/${params.id}`), formData);
    window.alert("Updated Details"); 
    push('/');
  }

  const handleDelete = (e) => {
    e.preventDefault();
    remove(ref(db, `tasks/${params.id}`));
    console.log("Deleted Task");
    push('/');

  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputTitle1" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputTitle1"
            name="title"
            onChange={handleChange}
            value={formData.title}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputDescription" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="exampleInputDescription1"
            rows={6}
            name="description"
            onChange={handleChange}
            value={formData.description}
          ></textarea>
        </div>

        <div className="d-flex">
          <div className="mb-3 col-3 me-3">
            <label htmlFor="status" className="form-label">
              Status
            </label>
            <select
              name="status"
              className="form-select"
              aria-label="Default select example"
              onChange={handleChange}
              value={formData.status}
            >
              <option>Select Status</option>
              <option value="todo">Todo</option>
              <option value="in_progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>

          <div className="mb-3 col-3 me-3">
            <label htmlFor="assigned_user" className="form-label">
              Assigned User
            </label>
            <select
              name="assigned_user"
              className="form-select"
              aria-label="Default select example"
              onChange={handleChange}
              value={formData.assigned_user}
            >
              <option>Select User</option>
              {usersList.map((item) => {
                return (
                  <option key={item.id} value={item.id}>
                    {`${item.username} <${item.email}>`}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="mb-3 col-3 me-3">
            <label htmlFor="deadline" className="form-label">
              Deadline
            </label>
            <input
              onChange={handleChange}
              type="date"
              className="form-control"
              name="deadline"
              id="deadline"
              min={new Date().toISOString().split("T")[0]}
              value={formData.deadline}   
            />
          </div>
        </div>
        
        <div className='d-flex mt-3'>
          <button type="submit" className="btn btn-success">
            Update Task
          </button>
          <button className="btn btn-outline-danger mx-3" onClick={handleDelete}>
            Delete Task
          </button>
        </div>
      </form>
    </div>
  );
}
