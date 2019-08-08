import React from 'react';
import Item from './Item';
import { apiService } from './api.service';
import { InputGroup, InputGroupAddon, Input, Button, Table } from 'reactstrap';

class List extends React.Component {
  state = {
    inputValue: '',
    id: null,
    items: []
  };

  addItem = () => {
    const { id, inputValue } = this.state;
    if (!id) {
      apiService.addItem(inputValue).then(
        ({ data }) => {
          const items = [...this.state.items, data];

          this.setState({
            items
          });
        },
        err => console.log(err)
      );
    } else {
      apiService.editItem({ name: inputValue, id }).then(
        res => {
          this.updateList(id, inputValue);
        },
        err => console.log(err)
      );
    }

    this.setState({
      inputValue: '',
      id: null
    });
  };

  editItem = item => () => {
    this.setState({
      inputValue: item.name,
      id: item._id
    });
  };

  deleteItem = id => () => {
    const { items } = this.state;

    apiService.deleteItem(id).then(
      res => {
        this.setState({
          items: items.filter(item => item._id !== id)
        });
      },
      err => console.log(err)
    );
  };

  changeText = e => {
    this.setState({
      inputValue: e.target.value
    });
  };

  updateList = (_id, name) => {
    const { items } = this.state;

    this.setState({
      items: items.map(item => {
        if (item._id === _id) {
          return {
            name,
            _id
          };
        }
        return item;
      })
    });
  };

  render() {
    const { items, inputValue } = this.state;
    return (
      <React.Fragment>
        <InputGroup>
          <Input
            onChange={this.changeText}
            type="text"
            name="text"
            placeholder="Add new hotdog!"
            value={inputValue}
          />
          <InputGroupAddon addonType="append">
            <Button onClick={this.addItem}>Add new HotDog</Button>
          </InputGroupAddon>
        </InputGroup>

        <Table responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {items &&
              items.map((item, i) => {
                return (
                  <Item
                    data={item}
                    key={item._id}
                    index={i}
                    deleteHandler={this.deleteItem}
                    editHandler={this.editItem}
                  />
                );
              })}
          </tbody>
        </Table>
      </React.Fragment>
    );
  }

  componentDidMount() {
    apiService.getItems().then(
      res => {
        this.setState({
          items: res.data.items
        });
      },
      err => console.log(err)
    );
  }
}

export default List;
