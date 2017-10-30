import { connect } from 'react-redux';
import { categoriesAsync } from '../modules/categoryTabs';
import CategoryTabs from '../components/CategoryTabs';

const mapDispatchToProps = {
  categoriesAsync,
};

const mapStateToProps = state => ({
  categoryTabs : state.categoryTabs,
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryTabs);
