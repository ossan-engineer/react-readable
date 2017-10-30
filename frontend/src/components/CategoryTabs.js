import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Tabs, Tab } from 'material-ui/Tabs';
import api from '../utils/api';

class CategoryTabs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
    }
  }

  componentDidMount() {
    api.get('categories').then((res) => {
      console.log(res.data);
      this.setState({
        categories: res.data.categories,
      });
    });
  }

  handleActive = (tab) => {
    this.props.history.push(`/category/${tab.props.value}`);
  };

  render() {
    const { category } = this.props;

    return (
      <Tabs
        initialSelectedIndex={-1}
        value={category}
        tabItemContainerStyle={{
          backgroundColor: 'transparent',
        }}
      >
        {this.state.categories.map(category => (
          <Tab
            label={<span style={{ color: 'rgba(0, 0, 0, 0.87)' }}>{category.name}</span>}
            key={category.name}
            onActive={this.handleActive}
            value={category.name}
          />
        ))}
      </Tabs>
    );
  }
}

export default withRouter(CategoryTabs);
