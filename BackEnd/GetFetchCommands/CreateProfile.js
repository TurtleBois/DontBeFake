import React, { useState } from "react";
import { useNavigate } from "react-router";
 
export function CreateProfile(profile) {
  const [form, setForm] = useState({
    name: "",
    position: "",
    level: "",
  });

  const navigate = useNavigate();
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }
  async function onSubmit(e) {
    e.preventDefault();
  
    // When a post request is sent to the create url, we'll add a new record to the database.
    const newPerson = { ...form };
  
    await fetch("http://localhost:5000/record/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPerson),
    })
    .catch(error => {
      window.alert(error);
      return;
    });

    setForm({ name: "", position: "", level: "" });
  }
  updateForm({ name: profile.name })
  updateForm({ position: profile.position })
  updateForm({ level: profile.level })
}