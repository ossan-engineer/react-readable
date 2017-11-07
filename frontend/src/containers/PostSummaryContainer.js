import { connect } from 'react-redux';
import { voteAsync, commentsAsync } from '../modules/postSummary';
import PostSummary from '../components/PostSummary';
import {
  loadExistingData,
  editPostAsync,
} from '../routes/Posts/modules/postDetail';

const mapDispatchToProps = {
  voteAsync,
  commentsAsync,
  loadExistingData,
  editPostAsync,
};

const mapStateToProps = state => ({
  postSummary : state.postSummary,
});

export default connect(mapStateToProps, mapDispatchToProps)(PostSummary);
