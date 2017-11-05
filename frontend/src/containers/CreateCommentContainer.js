import { connect } from 'react-redux';
import { createCommentAsync } from '../modules/createComment';
import CreateComment from '../components/CreateComment';

const mapDispatchToProps = {
  createCommentAsync,
};

const mapStateToProps = state => ({
  createComment: state.createComment,
  initialValues: state.createComment,
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateComment);
