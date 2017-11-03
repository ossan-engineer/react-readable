import { connect } from 'react-redux';
import {
  voteAsync,
  editPostAsync,
  removeCommentAsync,
  loadExistingData,
} from '../modules/comment';
import Comment from '../components/Comment';

const mapDispatchToProps = {
  voteAsync,
  editPostAsync,
  removeCommentAsync,
  loadExistingData,
};

const mapStateToProps = state => ({
  comment : state.comment,
  initialValues: state.comment,
});

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
