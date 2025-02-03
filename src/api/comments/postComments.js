import plannrApi from "../plannr";

async function postComments(comment, planId) {
  try {
    const response = await plannrApi.post(`/api/comments`, {
      planId,
      content: comment,
    });

    return response;
  } catch (err) {
    console.error("Error fetching plan:", err);
  }
}

export default postComments;
