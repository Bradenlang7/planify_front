import plannrApi from "../plannr";

async function deleteAttendee(approvalId) {
  try {
    const response = await plannrApi.delete(`/api/approvals/${approvalId}`);

    return response;
  } catch (err) {
    console.error("Error deleting approval:", err);
  }
}

export default deleteAttendee;
