const errorMapping = (codeError) => {
    let message;
    switch (codeError) {
        case 400:
            message = "Bad Request: Please check your input and try again.";
            break;
        case 401:
            message = "Unauthorized: Please check your credentials and try again.";
            break;
        case 409:
            message = "Conflict: There was a conflict with your request. Please try again.";
            break;
        default:
            message = "Internal Server Error: Something went wrong on our end. Please try again later.";
            break;

    }
    return message;
}

export default errorMapping;