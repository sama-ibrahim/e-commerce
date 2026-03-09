 

const generateMessage = (entity: string) => ({
  notFound: `${entity} not Found`,
  alreadyExist: `${entity} already exists`,

  created: `${entity} created successfully`,
  updated: `${entity} updated successfully`,
  deleted: `${entity} deleted successfully`,

  FailToCreate: `Failed to create ${entity}`,
  FailToUpdate: `Failed to update ${entity}`,
  FailToDelete: `Failed to delete ${entity}`,
});

export const message = {
  Category: { ...generateMessage('Category') },
  Brand: { ...generateMessage('Brand') },
  Product: { ...generateMessage('Product') },
  Coupon: { ...generateMessage('Coupon') },
};
