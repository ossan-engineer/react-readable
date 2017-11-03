import { connect } from 'react-redux';
import {
  voteAsync,
  commentsAsync,
  editPostAsync,
  loadExistingData,
} from '../modules/postDetail';
import PostDetail from '../components/PostDetail';

const mapDispatchToProps = {
  voteAsync,
  commentsAsync,
  editPostAsync,
  loadExistingData,
};

const mapStateToProps = state => ({
  postDetail : state.postDetail,
  initialValues: state.postDetail,
});

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
