export const handler = async (event) => {
  // TODO implement
  const response = {
    statusCode: 200,
    body: JSON.stringify({message : 'This is lambda function : demoLambda2'}),
  };
  return response;
};
