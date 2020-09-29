package main.webapp.exception;

public class WebLabException extends RuntimeException {
    public WebLabException() {};
    public WebLabException(String message) {
        super(message);
    };
}
