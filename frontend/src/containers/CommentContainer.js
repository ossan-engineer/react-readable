import { connect } from 'react-redux';
import {
  voteAsync,
  editCommentAsync,
  removeCommentAsync,
  loadExistingData,
} from '../modules/comment';
import Comment from '../components/Comment';

const mapDispatchToProps = {
  voteAsync,
  editCommentAsync,
  removeCommentAsync,
  loadExistingData,
};

const mapStateToProps = state => ({
  comment : state.comment,
  initialValues: state.comment,
});

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
