// A reusable function to handle response and it's status
export const sendResponse = {
  success: (res, data) => {
    return res.status(200).json({
      success: true,
      data,
    });
  },

  error: (res, data) => {
    return res.status(400).json({
      success: false,
      data,
    });
  },

  serverError: (res) => {
    return res.status(500).json({
      success: false,
      data: { message: "something went wrong" },
    });
  },
};
