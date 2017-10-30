import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Tabs, Tab } from 'material-ui/Tabs';

class CategoryTabs extends Component {
  componentDidMount() {
    this.props.categoriesAsync();
  }

  handleActive = (tab) => {
    this.props.history.push(`/category/${tab.props.value}`);
  };

  render() {
    const { activeCategory, categoryTabs } = this.props;

    return (
      <Tabs
        initialSelectedIndex={-1}
        value={activeCategory}
        tabItemContainerStyle={{
          backgroundColor: 'transparent',
        }}
      >
        {categoryTabs ? categoryTabs.categories.map(category => (
          <Tab
            label={<span style={{ color: 'rgba(0, 0, 0, 0.87)' }}>{category.name}</span>}
            key={category.name}
            onActive={this.handleActive}
            value={category.name}
          />
        )) : null}
      </Tabs>
    );
  }
}

export default withRouter(CategoryTabs);
