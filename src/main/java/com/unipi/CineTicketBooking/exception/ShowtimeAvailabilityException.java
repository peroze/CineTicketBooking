package com.unipi.CineTicketBooking.exception;


import org.springframework.http.HttpStatus;

public class ShowtimeAvailabilityException extends RuntimeException {
    private HttpStatus httpStatus = HttpStatus.BAD_REQUEST;

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }

    /**
     * Constructs a new runtime exception with the specified detail message.
     * The cause is not initialized, and may subsequently be initialized by a
     * call to {@link #initCause}.
     * @param message the detail message. The detail message is saved for later retrieval by the {@link #getMessage()}
     *                method.
     */
    public ShowtimeAvailabilityException( String message) {
        super(message);
    }
}