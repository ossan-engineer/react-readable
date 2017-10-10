import { connect } from 'react-redux';
import { increment, doubleAsync } from '../modules/counter';
import Home from '../components/Home';

const mapDispatchToProps = {
  increment : () => increment(1),
  doubleAsync,
};

const mapStateToProps = state => ({
  counter : state.counter,
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
