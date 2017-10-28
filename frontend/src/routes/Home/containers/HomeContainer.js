import { connect } from 'react-redux';
import { increment, doubleAsync } from '../modules/counter';
import { createPostAsync } from '../../../modules/createPost';
import Home from '../components/Home';

const mapDispatchToProps = {
  increment : () => increment(1),
  doubleAsync,
  createPostAsync,
};

const mapStateToProps = state => ({
  counter : state.counter,
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
