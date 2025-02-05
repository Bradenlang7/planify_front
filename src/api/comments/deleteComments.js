import plannrApi from "../plannr";

async function deleteComments(commentId, planId) {
  try {
    const response = await plannrApi.delete(
      `/api/comments/${commentId}/${planId}`
    );

    return response;
  } catch (err) {
    console.error("Error deleting comment:", err);
  }
}

export default deleteComments;
