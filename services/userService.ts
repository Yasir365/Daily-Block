// ✅ Update user info (for edit modal)
export const updateUser = async (updatedUser: any) => {
  const res = await fetch(`/api/users/update`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedUser),
  });

  const data = await res.json();
  if (!res.ok || !data.success)
    throw new Error(data.message || "Failed to update user");

  return data;
};
