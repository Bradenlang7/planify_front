import plannrApi from "../plannr";

async function deleteComments(commentId) {
  try {
    const response = await plannrApi.delete(`/api/comments/${commentId}`);

    return response;
  } catch (err) {
    console.error("Error deleting comment:", err);
  }
}

export default deleteComments;
