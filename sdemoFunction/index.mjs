export const handler = async (event) => {
    // TODO implement
    console.log("hello");
    const response = {
      statusCode: 200,
      body: JSON.stringify('Hello from Github deployed Lambda 001!'),
    };
    return response;
  };
  
