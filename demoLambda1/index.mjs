export const handler = async (event) => {
  // TODO implement
  const response = {
    statusCode: 200,
    body: JSON.stringify({message : 'testing deployment of Lambda using github CICD, aws from vscode!'}),
  };
  return response;
};
