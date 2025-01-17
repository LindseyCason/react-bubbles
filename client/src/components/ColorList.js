import React, { useState } from "react";
import axios from "axios";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  //^^ colors= colorList, updateColors=setColorList from bubbles page
  console.log("colors", colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
console.log("this is E", e)
    axiosWithAuth()
    .put(`/colors/${colors.id}`, colorToEdit) //where do we get the ID from? not index
    .then(res =>{
      console.log(res.data, "resdata inside put colorlist page");
      updateColors([...colors.filter(color => color.id !== res.data.id), res.data])
    //   updateColors([...colors.filter(e => e.id !== color.id), res.data]
    //   )
      // props.history.push(`colors/${colors.id}`);
    })

  };



  const add = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
    .post(`/colors/`, colorToEdit) //where do we get the ID from? not index
    .then(res =>{
      console.log(res.data, "resdata inside put colorlist page");
      updateColors([...colors.filter(color => color.id !== colors.id), res.data])
    //   updateColors([...colors.filter(e => e.id !== color.id), res.data]
    //   )
      // props.history.push(`colors/${colors.id}`);
    })

  };








  const deleteColor = color => {
    // make a delete request to delete this color
   
      axiosWithAuth()
      .delete(`/colors/${color.id}`) //this is color.id NOT COLORS
      .then(res => { updateColors([...colors.filter(color => color.id !== res.data)]);
        console.log("res inside delete", res);
    })
    .catch(error => console.log("err", error))

  };


  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
       



       {/* <form onSubmit={add}>
          <legend>ADD COLOR</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">ADD</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form> */}


       


      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
