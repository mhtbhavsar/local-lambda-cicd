export const handler = async (event) => {
  // TODO implement
  const response = {
    statusCode: 200,
    body: JSON.stringify('testing deployment of Lambda using github CICD, aws from vscode 2!'),
  };
  return response;
};
