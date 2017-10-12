import { connect } from 'react-redux';
import { createPostAsync } from '../modules/createPost';
import CreatePost from '../components/CreatePost';

const mapDispatchToProps = {
  createPostAsync,
};

const mapStateToProps = state => ({
  createPost : state.createPost,
});

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);
