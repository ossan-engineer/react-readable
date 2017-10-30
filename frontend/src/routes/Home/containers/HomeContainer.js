import { connect } from 'react-redux';
import { createPostAsync } from '../../../modules/createPost';
import Home from '../components/Home';

const mapDispatchToProps = {
  createPostAsync,
};

const mapStateToProps = state => ({
  // counter : state.counter,
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
