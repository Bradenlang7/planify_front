import planifyApi from "../planify";

async function deleteComments(commentId) {
  try {
    const response = await planifyApi.delete(`/api/comments/${commentId}`);

    return response;
  } catch (err) {
    console.error("Error deleting comment:", err);
  }
}

export default deleteComments;
