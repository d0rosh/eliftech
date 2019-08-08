import React from 'react';
import { Button } from 'reactstrap';

function Item({ data, index, deleteHandler, editHandler }) {
  return (
    <tr>
      <th scope="row">{index + 1}</th>
      <td>{data.name}</td>
      <td>
        <Button onClick={editHandler(data)} color="info">
          Edit
        </Button>
      </td>
      <td>
        <Button onClick={deleteHandler(data._id)} color="danger">
          Delete
        </Button>
      </td>
    </tr>
  );
}

export default Item;
