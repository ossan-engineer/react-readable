import { connect } from 'react-redux';
import { voteAsync } from '../modules/postSummary';
import PostSummary from '../components/PostSummary';

const mapDispatchToProps = {
  voteAsync,
};

const mapStateToProps = state => ({
  postSummary : state.post,
});

export default connect(mapStateToProps, mapDispatchToProps)(PostSummary);
