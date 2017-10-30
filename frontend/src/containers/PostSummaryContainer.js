import { connect } from 'react-redux';
import { voteAsync, commentsAsync } from '../modules/postSummary';
import PostSummary from '../components/PostSummary';

const mapDispatchToProps = {
  voteAsync,
  commentsAsync,
};

const mapStateToProps = state => ({
  postSummary : state.postSummary,
});

export default connect(mapStateToProps, mapDispatchToProps)(PostSummary);
