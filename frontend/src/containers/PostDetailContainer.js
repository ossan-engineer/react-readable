import { connect } from 'react-redux';
import { voteAsync, commentsAsync } from '../modules/postDetail';
import PostDetail from '../components/PostDetail';

const mapDispatchToProps = {
  voteAsync,
  commentsAsync,
};

const mapStateToProps = state => ({
  postDetail : state.postDetail,
});

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
