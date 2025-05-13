// utils/apiResponse.js

export const successResponse = (res, message, data = null) => {
  return res.status(200).json({
    status: true,
    message,
    data,
  });
};

export const errorResponse = (res, message, error = null, statusCode = 500) => {
  return res.status(statusCode).json({
    status: false,
    message,
    error,
  });
};

export const notFoundResponse = (res, message) => {
  return res.status(404).json({
    status: false,
    message,
  });
};
