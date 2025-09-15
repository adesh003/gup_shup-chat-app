const errorMiddleware = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Server Error';
  
    // console.error('Error:', err);
  
    res.status(statusCode).json({
      success: false,
      error: {
        message: message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
      },
    });
  };
  

  export default errorMiddleware